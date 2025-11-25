<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> LISTA DE ESTUDIANTES POR EPS</h5>
          </template>
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
              <b-col lg="6">
                <b-form-group label="Seleccione la EPS:" label-for="eps" class="etiqueta">
                  <b-form-select id="eps" ref="eps" v-model="idEps" :options="comboEps"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row v-if="idEps">
              <b-col lg="12"><hr></b-col>
              <b-col lg="12">
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
                        <div style="margin-bottom: 1rem">
                          <b-button class="small mx-1 mt-3" variant="primary" @click="imprimir">Imprimir</b-button>
                          <b-button class="small mx-1 mt-3" variant="outline-primary" @click="exportarAExcel">Exportar a Excel</b-button>
                        </div>
                        <div><hr></div>
                        <div class="informe-estudiantes">
                          <div ref="contenido">
                            <div class="encabezado">
                              <p>SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA<br><b>{{$store.state.nombreInstitucion}}</b><br>TUNJA - BOYACÁ<br>ESTUDIANTES POR EPS - AÑO LECTIVO {{$store.state.aLectivo}}<br></p>
                            </div>
                            <table class="tabla-estudiantes">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Estudiante</th>
                                  <th>Documento</th>
                                  <th>Grado-Curso</th>
                                  <th>Eps</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(est, i) in estudiantesAgrupados()" :key="i">
                                  <td>{{ i + 1 }}</td>
                                  <td><span v-if="est.estadoActual == 2" style="color: #9C2007">[R] {{ est.estudiante }}</span><span v-else>{{ est.estudiante }}</span></td>
                                  <td>{{ est.documento }}</td>
                                  <td>{{ est.curso }}</td>
                                  <td>{{ est.eps }}</td>
                                </tr>
                              </tbody>
                            </table>
                            <p style="text-align: right; margin-top: -20px; font-size: 11px;" class="text-muted"><i>{{ fechaImpresion }}</i></p>
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
    name: 'eps',
    props: {
    },
    components: {
      VueGoodTable
    },
    data () {
      return {
        dataConsultada: [],
        btnCargando: false,
        datosSeccion: {},
        idEps: null,
        comboEps : [],
        fechaImpresion: null,
      }
    },
    methods: {
      estudiantesAgrupados() {
        //return this.dataConsultada.filter(e => e.idCurso === idCurso)
        return this.dataConsultada.filter(e =>
          e.idEps === this.idEps
        )
      },
      imprimir() {
        const contenido = this.$refs.contenido.innerHTML
        const estilos = `
          <style>
            .encabezado {
              text-align: center;
              font-size: 13px;
            }
            .informe-estudiantes {
              font-family: 'Segoe UI', sans-serif;
              margin: 5px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              font-size: 13px;
              margin-bottom: 20px;
            }
            th, td {
              border: 1px solid #999;
              padding: 3px;
              text-align: left;
            }
            thead {
              background-color: #f0f4fa;
            }
            @media print {
              .page-break {
                page-break-after: always;
              }
              body {
                font-family: 'Segoe UI', sans-serif;
                margin: 5px;
                color: #000;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                font-size: 12px;
                margin-bottom: 20px;
              }
              th, td {
                border: 1px solid #000;
                padding: 2px;
                text-align: left;
              }
              thead {
                background-color: #f0f4fa;
              }
            }
          </style>
        `
        const ventana = window.open('Lista por EPS', '_blank')
        ventana.document.write(`
          <html>
            <head><title>Lista por EPS</title>${estilos}</head>
            <body">${contenido}</body>
          </html>
        `)
        ventana.document.close()
        ventana.print()
      },
      calcularEdad(fecha) {
        var hoy = new Date()
        var cumpleanos = new Date(fecha)
        var edad = hoy.getFullYear() - cumpleanos.getFullYear()
        var m = hoy.getMonth() - cumpleanos.getMonth()
        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--
        }
        return edad
      },
      exportarAExcel() {
        const tabla = document.querySelector('table')
        const wb = XLSX.utils.table_to_book(tabla)
        XLSX.writeFile(wb, 'EstudiantesPorEPS.xlsx')
      },
      async ocuparComboEspecial() {
        this.comboEps = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/eps')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta datos especialidades')
            this.btnCargando = false
          } else {
            if(response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboEps.push({ 'value': element.id, 'text': element.eps.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta datos especialidades. Intente más tarde. ' + err)
          this.btnCargando = false
        })
      },
      async cargarDataEstudiantes() {
        this.btnCargando = true
        this.dataConsultada = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/data/estudiantes/eps', { params: { idInstitucion: this.$store.state.idInstitucion, vigencia: this.$store.state.aLectivo }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista estudiantes agrupados')
            this.btnCargando = false
          } else{
            if(response.data.datos != 0) {
              this.dataConsultada = response.data.datos
            }
            this.btnCargando = false
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista estudiantes agrupados. Intente más tarde.' + err)
          this.btnCargando = false
        })
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    computed: {
    },
    beforeMount() {
      this.cargarDataEstudiantes()
      this.datosSeccion = this.$store.state.datosSecciones[this.$store.state.idSeccion - 1]
      this.fechaImpresion = 'Fecha: ' + new Date().toLocaleString()
      this.ocuparComboEspecial()
    }
  }
</script>
<style scoped>
  .encabezado {
    text-align: center;
    font-size: 13px;
  }
  .informe-estudiantes {
    font-family: 'Segoe UI', sans-serif;
    margin: 5px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    margin-bottom: 20px;
  }
  th, td {
    border: 1px solid #999;
    padding: 3px;
    text-align: left;
  }
  thead {
    background-color: #f0f4fa;
  }
  .page-break {
    page-break-after: always;
  }
</style>
