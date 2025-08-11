<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> PLANILLA CONTROL MENSUAL DE ACTIVIDADES POR CURSO</h5>
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
              <b-col lg="9">
                <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                  <b-form-select id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="listarCursosSede(),cursosConsultados=null"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="3" class="mt-2">
                <b-button class="small mx-1 mt-4" variant="success" @click="seleccionarCursos()" :disabled="idSede!=null ? false : true">Seleccionar Cursos</b-button>
              </b-col>
            </b-row>
            <b-row v-if="cursosConsultados">
              <b-col lg="12"><hr></b-col>
              <b-col lg="3">
                <b-card bg-variant="light" text-variant="">
                  <b-card-text>
                    <!--
                    <b-row>
                      <b-col lg="12">
                        <b-form-group>
                          <h5>Columnas Adicionales:</h5>
                          <b-row class="m-1">
                            <b-col lg="12">
                              <b-form-select id="numCol" ref="numCol" v-model="numeroColumnas" :options="comboNumeroColumnas"></b-form-select>
                            </b-col>
                          </b-row>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    -->
                    <b-row>
                      <b-col lg="12">
                        <b-form-group>
                          <h5>Área para las Columnas:</h5>
                          <b-row class="m-1">
                            <b-col lg="12">
                              <b-form-select id="porcentajeArea" ref="porcentajeArea" v-model="porcentajeArea" :options="comboPorcentajeArea"></b-form-select>
                            </b-col>
                          </b-row>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col lg="12">
                        <b-form-group>
                          <h5>Retirados:</h5>
                          <b-form-checkbox id="estRetirados" ref="estRetirados" class="ml-4 m-3" v-model="retirados" name="check-button" switch>
                            <span class="ml-2">Listar estudiantes retirados</span>
                          </b-form-checkbox>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-col>
              <b-col lg="9">
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
                            <div v-for="(curso, index) in cursosSeleccionados" :key="curso.idCurso" class="bloque-curso">
                              <div class="encabezado">
                                <p>SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA<br><b>{{$store.state.nombreInstitucion}}</b><br>TUNJA - BOYACÁ<br>PLANILLA CONTROL MENSUAL DE ACTIVIDADES<br></p>
                              </div>
                              <table class="tabla-estudiantes">
                                <thead>
                                  <tr>
                                    <th>Sede: <b>{{ curso.sede }}</b></th>
                                    <th>Curso: <b>{{ curso.curso }}</b></th>
                                    <th>Jornada: <b>{{ curso.jornada }}</b></th>
                                    <th>Año: <b>{{ $store.state.aLectivo }}</b></th>
                                  </tr>
                                  <tr>
                                    <th>Actividad:</th>
                                    <th colspan="2">Responsable:</th>
                                    <th>Mes:</th>
                                  </tr>
                                </thead>
                              </table>
                              <table class="tabla-estudiantes" style="margin-top: -20px">
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>Estudiante</th>
                                    <th v-for="(colum,j) in numeroColumnas" :key="colum" :style="'width: ' + porcentajeArea/numeroColumnas + '%; text-align: center;'">{{j + 1}}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="(est, i) in estudiantesPorCurso(curso.idCurso)" :key="i">
                                    <td>{{ i + 1 }}</td>
                                    <td><span v-if="est.estadoActual == 2" style="color: #9C2007">[R] {{ est.estudiante }}</span><span v-else>{{ est.estudiante }}</span></td>
                                    <td v-for="colum in numeroColumnas" :key="colum"></td>
                                  </tr>
                                </tbody>
                              </table>
                              <p style="text-align: right; margin-top: -20px; font-size: 11px;" class="text-muted"><i>{{ fechaImpresion }}</i></p>
                              <div v-if="index < cursosSeleccionados.length - 1" class="page-break"></div>
                            </div>
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
    <b-modal ref="modalSeleccionarCursos" size="xl" scrollable hide-footer title="Seleccionar Cursos" ok-only>
      <div class="mx-3">
        <div>
          <vue-good-table ref="cursitos" :columns="encabColumnasCursos" :rows="listaCursos" styleClass="vgt-table condensed bordered striped" :line-numbers="true" :search-options="{enabled: true,placeholder: 'Filtrar cursos...'}"
            :select-options="{enabled: true,selectionText: 'cursos seleccionados',clearSelectionText: 'Limpiar',}">
            <template #selected-row-actions>
              <button class="small btn btn-success" @click="procesarListasCursos()">Seleccionar >></button>
            </template>
            <div slot="emptystate">
              <h5 class="text-danger ml-5">No existen Cursos en la Sede</h5>
            </div>
          </vue-good-table>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'
  import * as XLSX from 'xlsx'

  export default {
    name: 'formatoactividadmensual',
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
        comboNumeroColumnas: [],
        numeroColumnas: null,
        porcentajeArea: null,
        comboPorcentajeArea: [],
        idSede: null,
        comboSedes: [],
        nombreSede: null,
        cursosConsultados: false,
        listaCursos: [],
        encabColumnasCursos: [
          { label: 'Grado-Curso', field: 'curso' },
          { label: 'Jornada', field: 'jornada' },
          //{ label: '', field: 'id', sortable: false }
        ],
        cursosSeleccionados: [],
        fechaImpresion: null,
        retirados: false,
      }
    },
    methods: {
      estudiantesPorCurso(idCurso) {
        //return this.dataConsultada.filter(e => e.idCurso === idCurso)
        return this.dataConsultada.filter(e =>
          e.idCurso == idCurso &&
          (!this.retirados ? e.estadoActual == 1 : true)
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
                font-size: 11px;
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
        const ventana = window.open('Planillas por Curso', '_blank')
        ventana.document.write(`
          <html>
            <head><title>Planilla de Estudiantes</title>${estilos}</head>
            <body">${contenido}</body>
          </html>
        `)
        ventana.document.close()
        ventana.print()
      },
      procesarListasCursos() {
        this.cursosConsultados = true
        this.cursosSeleccionados = this.$refs.cursitos.selectedRows
        this.$refs['modalSeleccionarCursos'].hide()
      },
      seleccionarCursos() {
        this.$refs['modalSeleccionarCursos'].show()
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
        const libro = XLSX.utils.book_new()
        this.cursosSeleccionados.forEach(curso => {
          const estudiantes = this.estudiantesPorCurso(curso.idCurso)
          const datos = estudiantes.map((e, i) => {
            const fila = { '#': i + 1, Estudiante: e.estudiante }
            return fila
          })
          const hoja = XLSX.utils.json_to_sheet(datos)
          XLSX.utils.book_append_sheet(libro, hoja, curso.curso.slice(0, 31))
        })
        XLSX.writeFile(libro, 'Planilla Estudiantes Curso.xlsx')
      },
      listarCursosSede() {
        this.nombreSede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
        this.listaCursos = []
        this.$store.state.datosCursos.forEach(element => {
          if (element.id_sede == this.idSede) {
            this.listaCursos.push({ idCurso: element.id, curso: element.nomenclatura.toUpperCase(), jornada: element.jornada, sede: element.sede })
          }
        })
        //console.log(JSON.stringify(this.listaCursos))
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
      this.btnCargando = true
      this.dataConsultada = this.$store.state.datosDataEstudiantes
      this.datosSeccion = this.$store.state.datosSecciones[this.$store.state.idSeccion - 1]
      this.fechaImpresion = 'Fecha: ' + new Date().toLocaleString()
      this.ocuparComboSedes()
      this.comboNumeroColumnas = [
        {'value': 0, 'text': 'Sin columnas adicionales'},
        {'value': 1, 'text': '1 columna'},
        {'value': 2, 'text': '2 columnas'},
        {'value': 3, 'text': '3 columnas'},
        {'value': 4, 'text': '4 columnas'},
        {'value': 5, 'text': '5 columnas'},
        {'value': 6, 'text': '6 columnas'},
        {'value': 7, 'text': '7 columnas'},
        {'value': 8, 'text': '8 columnas'},
        {'value': 9, 'text': '9 columnas'},
        {'value': 10, 'text': '10 columnas'},
        {'value': 11, 'text': '11 columnas'},
        {'value': 12, 'text': '12 columnas'},
        {'value': 13, 'text': '13 columnas'},
        {'value': 14, 'text': '14 columnas'},
        {'value': 15, 'text': '15 columnas'},
      ]
      this.comboPorcentajeArea = [
        {'value': 10, 'text': '10%'},
        {'value': 20, 'text': '20%'},
        {'value': 30, 'text': '30%'},
        {'value': 40, 'text': '40%'},
        {'value': 50, 'text': '50%'},
        {'value': 60, 'text': '60%'},
        {'value': 70, 'text': '70%'},
        {'value': 80, 'text': '80%'},
      ]
      this.porcentajeArea = 60
      this.numeroColumnas = 31
      setTimeout(()=>{
        this.btnCargando = false
      },100)
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
