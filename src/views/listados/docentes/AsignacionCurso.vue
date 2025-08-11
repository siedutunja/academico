<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> ASIGNACIÓN ACADÉMICA POR CURSO</h5>
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
                        <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                          <b-form-select id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="listarCursosSede()"></b-form-select>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row class="mt-2" v-if="idSede!=null">
                      <b-col lg="12">
                        <vue-good-table ref="cursitos" :columns="encabColumnasCursos" :rows="listaCursos" styleClass="vgt-table condensed bordered striped" :line-numbers="true" :search-options="{enabled: true,placeholder: 'Filtrar cursos...'}"
                          :select-options="{enabled: true,selectionText: 'cursos seleccionados',clearSelectionText: 'Limpiar',}">
                          <template #selected-row-actions>
                            <button class="small btn btn-success" @click="imprimirAsignacionCursos()">Consultar >></button>
                          </template>
                          <div slot="emptystate">
                            <h5 class="text-danger ml-5">No existen Cursos en la Sede</h5>
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
                    <b-row v-if="!cursosConsultados">
                      <b-col>
                        <h5>Seleccione los cursos y oprima el botón Consultar para ver la Asignación Académica de los cursos.</h5>
                      </b-col>
                    </b-row>
                    <b-row v-if="cursosConsultados">
                      <b-col lg="12">
                        <div style="margin-bottom: 1rem">
                          <b-button class="small mx-1 mt-3" variant="primary" @click="imprimir">Imprimir</b-button>
                          <b-button class="small mx-1 mt-3" variant="outline-primary" @click="exportarAExcel">Exportar a Excel</b-button>
                        </div>
                      </b-col>
                    </b-row>
                    <b-row v-if="cursosConsultados">
                      <b-col>
                        <div class="informe-asignacion-cursos">
                          <div ref="contenido">
                            <div v-for="curso in cursosSeleccionados" :key="curso.idCurso" class="bloque-curso">
                              <table class="tabla-asignacion">
                                <thead>
                                  <tr>
                                    <th colspan="3" style="text-align: center;">Grado-Curso: {{ curso.curso }}</th>
                                  </tr>
                                  <tr>
                                    <th>Asignatura</th>
                                    <th>IH</th>
                                    <th>Docente</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="(fila, i) in asignacionesCurso(curso.curso)" :key="i">
                                    <td>{{ fila.asignatura }}</td>
                                    <td>{{ fila.ih }}</td>
                                    <td>{{ fila.docente }}</td>
                                  </tr>
                                  <tr class="fila-total">
                                    <td><strong>Total Intensidad Horaria</strong></td>
                                    <td><strong>{{ totalIH(curso.curso) }}</strong></td>
                                    <td style="text-align: right;" class="text-muted"><i>{{ fechaImpresion }}</i></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </b-col>
                    </b-row>
                    <b-row v-if="cursosConsultados">
                      <b-col lg="12">
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
    name: 'asignacioncurso',
    props: {
    },
    components: {
      VueGoodTable,
    },
    data () {
      return {
        idSede: null,
        comboSedes: [],
        encabColumnasCursos: [
          { label: 'Grado-Curso', field: 'curso' },
          //{ label: '', field: 'id', sortable: false }
        ],
        listaCursos: [],
        cursosSeleccionados: [],
        dataConsultada: [],
        btnCargando: false,
        cursosConsultados: false,
        fechaImpresion: null,
      }
    },
    methods: {
      asignacionesCurso(nombreCurso) {
        return this.dataConsultada.filter(d => d.curso === nombreCurso)
      },
      totalIH(nombreCurso) {
        return this.asignacionesCurso(nombreCurso).reduce((a, b) => a + (b.ih || 0), 0)
      },
      imprimirAsignacionCursos() {
        this.cursosConsultados = true
        this.cursosSeleccionados = this.$refs.cursitos.selectedRows
      },
      listarCursosSede() {
        this.cursosConsultados = false
        this.listaCursos = []
        this.$store.state.datosCursos.forEach(element => {
          if (element.id_sede == this.idSede) {
            this.listaCursos.push({ idCurso: element.id, curso: element.nomenclatura.toUpperCase() })
          }
        })
        //console.log(JSON.stringify(this.listaCursos))
      },
      async ocuparComboSedes() {
        this.comboSedes = []
        this.$store.state.datosSedes.forEach(element => {
          this.comboSedes.push({ 'value': element.id, 'text': element.sede.toUpperCase() })
        })
        this.cargarAsignacionCursos()
      },
      async cargarAsignacionCursos() {
        this.btnCargando = true
        this.dataConsultada = []
        await axios
        .get(CONFIG.ROOT_PATH + 'docentes/asignacionacademica/cursos', { params: { idInstitucion: this.$store.state.idInstitucion, vigencia: this.$store.state.aLectivo }})
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
        let tituloInforme = 'ASIGNACIÓN ACADÉMICA POR CURSO'
        const contenido = this.$refs.contenido.innerHTML
        const estilos = `
          <style>
            body {
              font-family: 'Segoe UI', sans-serif;
              margin: 20px;
            }
            .informe-asignacion-cursos {
              font-family: Arial, sans-serif;
              margin: 1px;
            }
            .tabla-asignacion {
              width: 100%;
              border-collapse: collapse;
              font-size: 13px;
              margin-top: 20px;
            }
            .tabla-asignacion th,
            .tabla-asignacion td {
              border: 1px solid #000;
              padding: 3px;
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
                border: 1px solid #000;
                padding: 4px;
                text-align: left;
              }
              thead {
                margin-top: 20px;
                background-color: #f0f4fa;
              }
            }
          </style>
        `
        const ventana = window.open('AsignacionCurso', '_blank')
        ventana.document.write(`
          <html>
            <head>
              <title>Asignación Curso</title>
              ${estilos}
            </head>
            <body class="container">
              <p style="text-align: center; font-size: 12px;">SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA<br><b>${this.$store.state.nombreInstitucion}</b><br>TUNJA - BOYACÁ<br>${tituloInforme}<br>Año Lectivo ${this.$store.state.aLectivo}</p>
              ${contenido}
            </body>
          </html>
        `)
        ventana.document.close()
        ventana.print()
        this.cursosConsultados = false
      },
      exportarAExcel() {
        const libro = XLSX.utils.book_new()
        this.cursosSeleccionados.forEach(curso => {
          const asignaciones = this.asignacionesCurso(curso.curso)
          const datos = asignaciones.map((d, i) => ({
            Asignatura: d.asignatura,
            'Intensidad Horaria': d.ih,
            Docente: d.docente
          }))
          const totalIH = datos.reduce((a, b) => a + (b['Intensidad Horaria'] || 0), 0)
          datos.push({ Asignatura: 'Total IH', 'Intensidad Horaria': totalIH, Docente: '' })

          const hoja = XLSX.utils.json_to_sheet(datos)
          XLSX.utils.book_append_sheet(libro, hoja, curso.curso.slice(0, 31))
        })
        XLSX.writeFile(libro, 'AsignacionCursos.xlsx')
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    computed: {
    },
    beforeMount() {
      this.datosSeccion = this.$store.state.datosSecciones[this.$store.state.idSeccion - 1]
      this.ocuparComboSedes()
      this.fechaImpresion = 'Fecha: ' + new Date().toLocaleString()

      //console.log(JSON.stringify(this.listaDocentes))
      //console.log(this.$refs.profes.selectedRows)
    }
  }
</script>
<style scoped>
  .informe-asignacion-cursos {
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
