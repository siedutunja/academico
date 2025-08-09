<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> DIRECTORES DE CURSO</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <b-card>
                  <b-card-text>
                    <b-row>
                      <b-col lg="12">
                        <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                          <b-form-select id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="cargarDirectoresCursosSede()"></b-form-select>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-col>
              <b-col lg="12" v-if="idSede != null">
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
                    <b-row v-if="!btnCargando">
                      <b-col lg="12">
                        <div class="informe-directores">
                          <div ref="contenido">
                            <table class="tabla-directores">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Grado-Curso</th>
                                  <th>Jornada</th>
                                  <th>Director de Curso</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(fila, index) in dataConsultada" :key="index">
                                  <td>{{ index + 1 }}</td>
                                  <td>{{ fila.curso }}</td>
                                  <td>{{ fila.jornada }}</td>
                                  <td>{{ fila.docente }}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </b-col>
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
  import * as XLSX from 'xlsx'

  export default {
    name: 'directorescurso',
    props: {
    },
    components: {
    },
    data () {
      return {
        idSede: null,
        comboSedes: [],
        dataConsultada: [],
        btnCargando: false,
      }
    },
    methods: {
      async cargarDirectoresCursosSede() {
        this.btnCargando = true
        this.dataConsultada = []
        await axios
        .get(CONFIG.ROOT_PATH + 'docentes/directores/cursos', { params: { idSede: this.idSede }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Directores Cursos')
            this.btnCargando = false
          } else{
            if (response.data.datos != 0) {
              this.dataConsultada = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Directores Cursos. Intente más tarde.' + err)
          this.btnCargando = false
        })
        //console.log(JSON.stringify(this.dataConsultada))
        this.btnCargando = false
      },
      imprimir() {
        let fecha = 'Fecha: ' + new Date().toLocaleString()
        let tituloInforme = 'DIRECTORES DE CURSO'
        const contenido = this.$refs.contenido.innerHTML
        const estilos = `
          <style>
            .informe-directores {
              font-family: 'Segoe UI', sans-serif;
              margin: 5px;
            }
            .tabla-directores {
              width: 100%;
              border-collapse: collapse;
              font-size: 13px;
            }
            .tabla-directores th,
            .tabla-directores td {
              border: 1px solid #ccc;
              padding: 3px;
              text-align: left;
            }
            .tabla-directores thead {
              background-color: #eef5ff;
            }
            @media print {
              body {
                font-family: 'Segoe UI', sans-serif;
                margin: 5px;
                color: #000;
              }
              h3 {
                font-size: 18px;
                margin-bottom: 15px;
                color: #003366;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                font-size: 13px;
              }
              th, td {
                border: 1px solid #999;
                padding: 3px;
                text-align: left;
              }
              thead {
                background-color: #f0f4fa;
              }
            }
          </style>
        `
        const ventana = window.open('', '_blank')
        ventana.document.write(`
          <html>
            <head><title>Directores de Curso</title>${estilos}</head>
            <body>
              <p style="text-align: center; font-size: 12px;">SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA<br><b>${this.$store.state.nombreInstitucion}</b><br>TUNJA - BOYACÁ<br>${tituloInforme}<br>Año Lectivo ${this.$store.state.aLectivo}</p>
              ${contenido}
              <div style="text-align: right; font-size: 12px;"><i>${fecha}</i></div>
            </body>
          </html>
        `)
        ventana.document.close()
        ventana.print()
      },
      exportarAExcel() {
        const datos = this.dataConsultada.map(d => ({
          Curso: d.curso,
          Jornada: d.jornada,
          Docente: d.docente
        }))
        const hoja = XLSX.utils.json_to_sheet(datos)
        const libro = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(libro, hoja, 'Directores')
        XLSX.writeFile(libro, 'DirectoresCurso.xlsx')
      },
      async ocuparComboSedes() {
        this.comboSedes = []
        this.$store.state.datosSedes.forEach(element => {
          this.comboSedes.push({ 'value': element.id, 'text': element.sede.toUpperCase() })
        })
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
      //console.log(JSON.stringify(this.listaDocentes))
      //console.log(this.$refs.profes.selectedRows)
    }
  }
</script>
<style scoped>
  .informe-directores {
    font-family: Arial, sans-serif;
    margin: 5px;
  }
  .tabla-directores {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  .tabla-directores th,
  .tabla-directores td {
    border: 1px solid #ccc;
    padding: 6px;
    text-align: left;
  }
  .tabla-directores thead {
    background-color: #eef5ff;
  }
</style>
