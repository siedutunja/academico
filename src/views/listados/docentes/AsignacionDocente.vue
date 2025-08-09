<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> ASIGNACIÓN ACADÉMICA POR DOCENTES</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="5">
                <b-card>
                  <b-card-text>
                    <b-row>
                      <b-col lg="12">
                        <div v-if="btnCargando">
                          <div class="text-center m-5 text-primary">
                            <b-spinner style="width: 3rem; height: 3rem;" label="Spinner"></b-spinner>
                            <br><strong>Cargando informe...</strong>
                          </div>
                        </div>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col lg="12">
                        <vue-good-table ref="profes" :columns="encabColumnasDocentes" :rows="listaDocentes" styleClass="vgt-table condensed bordered striped" :line-numbers="true" :search-options="{enabled: true,placeholder: 'Filtrar docentes...'}"
                          :select-options="{enabled: true,selectionText: 'Docentes seleccionados',clearSelectionText: 'Limpiar',}">
                          <template #selected-row-actions>
                            <button class="small btn btn-success" @click="consultarAsignacionDocentes()">Consultar >></button>
                          </template>
                          <div slot="emptystate">
                            <h5 class="text-danger ml-5">No existen Docentes</h5>
                          </div>
                        </vue-good-table>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-col>
              <b-col lg="7">
                <b-card>
                  <b-card-text>
                    <b-row v-if="!docentesConsultados">
                      <b-col>
                        <h5>Seleccione los docentes y oprima el botón Consultar para ver la Asignación Académica de los docentes.</h5>
                      </b-col>
                    </b-row>
                    <b-row v-if="docentesConsultados">
                      <b-col lg="12">
                        <div style="margin-bottom: 1rem">
                          <b-button class="small mx-1 mt-3" variant="primary" @click="imprimir">Imprimir</b-button>
                          <b-button class="small mx-1 mt-3" variant="outline-primary" @click="exportarAExcel">Exportar a Excel</b-button>
                        </div>
                        <div><hr></div>
                        <div class="informe-asignacion">
                          <div v-for="docente in docentesSeleccionados" :key="docente.idDocente" class="bloque-docente">
                            <h3>Docente: {{ docente.docente }}</h3>
                            <table class="tabla-asignacion">
                              <thead>
                                <tr>
                                  <th>Curso</th>
                                  <th>Jornada</th>
                                  <th>Asignatura</th>
                                  <th>IH</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(asig, index) in asignacionesDocente(docente.idDocente)" :key="index">
                                  <td>{{ asig.curso }}</td>
                                  <td>{{ asig.jornada }}</td>
                                  <td>{{ asig.asignatura }}</td>
                                  <td>{{ asig.ih }}</td>
                                </tr>
                                <tr class="fila-total">
                                  <td colspan="3"><strong>Total IH</strong></td>
                                  <td><strong>{{ totalIH(docente.idDocente) }}</strong></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div><hr></div>
                        <div style="margin-bottom: 1rem">
                          <b-button class="small mx-1 mt-3" variant="primary" @click="imprimir">Imprimir</b-button>
                          <b-button class="small mx-1 mt-3" variant="outline-primary" @click="exportarAExcel">Exportar a Excel</b-button>
                        </div>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'
  import * as XLSX from 'xlsx'

  export default {
    name: 'asignaciondocente',
    props: {
    },
    components: {
      VueGoodTable,
    },
    data () {
      return {
        encabColumnasDocentes: [
          { label: 'Docente', field: 'docente' },
          //{ label: '', field: 'id', sortable: false }
        ],
        listaDocentes: [],
        docentesSeleccionados: [],
        dataConsultada: [],
        btnCargando: false,
        docentesConsultados: false,
      }
    },
    methods: {
      asignacionesDocente(idDocente) {
        return this.dataConsultada.filter(d => d.idDocente === idDocente)
      },
      totalIH(idDocente) {
        return this.asignacionesDocente(idDocente).reduce((a, b) => a + (b.ih || 0), 0)
      },
      async consultarAsignacionDocentes() {
        this.docentesConsultados = true
        this.docentesSeleccionados = this.$refs.profes.selectedRows
      },
      async cargarAsignacionDocentes() {
        this.btnCargando = true
        this.dataConsultada = []
        await axios
        .get(CONFIG.ROOT_PATH + 'docentes/asignacionacademica/docentes', { params: { idInstitucion: this.$store.state.idInstitucion, vigencia: this.$store.state.aLectivo }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Asignación Docentes')
            this.btnCargando = false
          } else{
            if (response.data.datos != 0) {
              this.dataConsultada = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Asignación Docentes. Intente más tarde.' + err)
          this.btnCargando = false
        })
        //console.log(JSON.stringify(this.dataConsultada))
        this.btnCargando = false
      },
      imprimir() {
        let fecha = 'Fecha: ' + new Date().toLocaleString()
        let tituloInforme = 'ASIGNACIÓN ACADÉMICA POR DOCENTE'
        const estilos = `
          <style>
            body {
              font-family: 'Segoe UI', sans-serif;
              margin: 20px;
            }
            .informe-asignacion {
              font-family: Arial, sans-serif;
              margin: 1px;
            }
            .tabla-asignacion {
              width: 100%;
              border-collapse: collapse;
              font-size: 13px;
            }
            .tabla-asignacion th,
            .tabla-asignacion td {
              border: 1px solid #ccc;
              padding: 6px;
              text-align: left;
            }
            .tabla-asignacion thead {
              background-color: #eef5ff;
            }
            .fila-total {
              background-color: #f0f8ff;
              font-weight: bold;
            }
            @media print {
              .page-break {
                page-break-after: always;
              }
              body {
                font-family: 'Segoe UI', sans-serif;
                margin: 20px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 2px;
                font-size: 13px;
              }
              th, td {
                border: 1px solid #999;
                padding: 4px;
                text-align: left;
              }
              thead {
                background-color: #f0f4fa;
              }
            }
          </style>
        `
        const bloques = this.docentesSeleccionados.map((docente, i) => {
          const filas = this.asignacionesDocente(docente.idDocente).map(asig => `
            <tr>
              <td>${asig.curso}</td>
              <td>${asig.jornada}</td>
              <td>${asig.asignatura}</td>
              <td>${asig.ih}</td>
            </tr>
          `).join('')
          return `
            <div>
              <p style="text-align: center; font-size: 12px;">SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA<br><b>${this.$store.state.nombreInstitucion}</b><br>TUNJA - BOYACÁ<br>${tituloInforme}<br>Docente: ${docente.docente} | Año Lectivo ${this.$store.state.aLectivo}</p>
              <table class="tabla-asignacion">
                <thead>
                  <tr><th>Grado-Curso</th><th>Jornada</th><th>Asignatura Asignada</th><th>IH</th></tr>
                </thead>
                <tbody>
                  ${filas}
                  <tr class="fila-total">
                    <td colspan="3"><strong>Total Intensidad Horaria Asignada</strong></td>
                    <td><strong>${this.totalIH(docente.idDocente)}</strong></td>
                  </tr>
                </tbody>
              </table>
              <div style="text-align: right; font-size: 12px;"><i>${fecha}</i></div>
            </div>
            ${i < this.docentesSeleccionados.length - 1 ? '<div class="page-break"></div>' : ''}
          `
        }).join('')

        const ventana = window.open('AsignacionDocente', '_blank')
        ventana.document.write(`
          <html>
            <head>
              <title>Asignación Docente</title>
              ${estilos}
            </head>
            <body class="container">
              ${bloques}
            </body>
          </html>
        `)
        ventana.document.close()
        ventana.print()
        this.docentesConsultados = false
      },
      exportarAExcel() {
        const hojas = {}
        this.docentesSeleccionados.forEach(docente => {
          const asignaciones = this.dataConsultada.filter(
            d => d.idDocente === docente.idDocente
          )
          const datos = asignaciones.map((d, i) => ({
            Curso: d.curso,
            Jornada: d.jornada,
            Asignatura: d.asignatura,
            IH: d.ih
          }))
          // Agrega fila de total
          const totalIH = datos.reduce((a, b) => a + (b.IH || 0), 0)
          datos.push({ Curso: '', Jornada: '', Asignatura: 'Total IH', IH: totalIH })
          hojas[docente.docente] = datos
        })
        const libro = XLSX.utils.book_new()
        Object.entries(hojas).forEach(([nombreHoja, datos]) => {
          const hoja = XLSX.utils.json_to_sheet(datos)
          XLSX.utils.book_append_sheet(libro, hoja, nombreHoja.slice(0, 31)) // Excel permite 31 caracteres
        })
        XLSX.writeFile(libro, 'AsignacionDocentes.xlsx')
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    computed: {
    },
    beforeMount() {
      this.cargarAsignacionDocentes()
      this.$store.state.datosDocentes.forEach(element => {
        this.listaDocentes.push({idDocente: element.id, docente: element.docente})
      });
      this.datosSeccion = this.$store.state.datosSecciones[this.$store.state.idSeccion - 1]
      //console.log(JSON.stringify(this.listaDocentes))
      //console.log(this.$refs.profes.selectedRows)
    }
  }
</script>
<style scoped>
  .informe-asignacion {
    font-family: Arial, sans-serif;
    margin: 1px;
  }
  .bloque-docente {
    margin-bottom: 40px;
  }
  .bloque-docente h3 {
    margin-bottom: 10px;
    font-size: 16px;
    color: #003366;
  }
  .tabla-asignacion {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  .tabla-asignacion th,
  .tabla-asignacion td {
    border: 1px solid #ccc;
    padding: 6px;
    text-align: left;
  }
  .tabla-asignacion thead {
    background-color: #eef5ff;
  }
  .fila-total {
    background-color: #f0f8ff;
    font-weight: bold;
  }
</style>
