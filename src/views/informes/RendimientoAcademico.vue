<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> INFORME RENDIMIENTO ACADÉMICO POR CURSO</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Seleccione Informe:" label-for="datos" class="etiqueta">
                  <b-form-select  id="datos" ref="datos" v-model="idInforme" :options="comboInformes" @change="idPeriodo=null,idSede=null,idCurso=null"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row v-if="idInforme != null">
              <b-col lg="2">
                <b-form-group label="Periodo:" label-for="periodo" class="etiqueta">
                  <b-form-select id="periodo" ref="periodo" v-model="idPeriodo" :options="comboPeriodos" @change="idSede=null"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idCurso=null,ocuparComboCursosSede()" :disabled="idPeriodo!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="Seleccione el Curso:" label-for="cursos" class="etiqueta">
                  <b-form-select id="cursos" ref="cursos" v-model="idCurso" :options="comboCursosSede" @change="consultarMatriculados()" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mt-2" v-if="idCurso!=null">
              <b-col lg="12"><hr></b-col>
              <!-- **************** CONSOLIDADO ASIGNATURAS ************** -->
              <b-col lg="12" v-if="idInforme == 1">
                <div v-if="btnCargando">
                  <div class="text-center m-5 text-primary">
                    <b-spinner style="width: 3rem; height: 3rem;" label="Spinner"></b-spinner>
                    <br><strong>Cargando planilla...</strong>
                  </div>
                </div>
                <div v-else>
                  <!--
                  <vue-good-table ref="table" :columns="encabColumnas" :rows="listaMatriculados" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                    <div slot="emptystate">
                      <h5 class="text-danger ml-5">No existen estudiantes matriculados</h5>
                    </div>
                  </vue-good-table>
                  <b-row>
                    <b-col lg="12">
                      <b-button class="small mx-1 mt-3" variant="primary" @click="imprimirConsolidado">Imprimir Consolidado</b-button>
                      <vue-excel-xlsx class="small mx-1 mt-3 btn btn-outline-primary" :data="listaMatriculados" :columns="encabColumnas" :file-name="'ConsolidadoNotas-' + new Date().toLocaleDateString()" :file-type="'xlsx'" :sheet-name="'Consolidado'">
                        Exportar Consolidado Evaluaciones a Excel
                      </vue-excel-xlsx>
                    </b-col>
                  </b-row>
                  <b-row class="mt-4"><b-col lg="12"><hr></b-col></b-row>
                  <b-row>
                    <b-col lg="12">
                      <h4>Resumen Consolidado por Criterio</h4>
                    </b-col>
                  </b-row>
                  -->
                  <vue-good-table ref="table2" :columns="encabColumnas2" :rows="listaTotalesAsignaturas" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                    <div slot="emptystate">
                      <h5 class="text-danger ml-5">-</h5>
                    </div>
                  </vue-good-table>
                  <b-row>
                    <b-col lg="12">
                      <b-button class="small mx-1 mt-3" variant="primary" @click="imprimirConsolidado">Imprimir Consolidado</b-button>
                      <!--
                      <vue-excel-xlsx class="small mx-1 mt-3 btn btn-outline-primary" :data="listaMatriculados" :columns="encabColumnas" :file-name="'ConsolidadoNotas-' + new Date().toLocaleDateString()" :file-type="'xlsx'" :sheet-name="'Consolidado'">
                        Exportar Consolidado Evaluaciones a Excel
                      </vue-excel-xlsx>
                      -->
                      <vue-excel-xlsx class="small mx-1 mt-3 btn btn-outline-primary" :data="listaTotalesAsignaturas" :columns="encabColumnas2" :file-name="'ConsolidadoResumen-' + new Date().toLocaleDateString()" :file-type="'xlsx'" :sheet-name="'ConsolidadoResumen'">
                        Exportar Resumen a Excel
                      </vue-excel-xlsx>
                    </b-col>
                  </b-row>
                </div>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Informes rendimiento académico por curso.</em>
          </template>
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

  export default {
    name: 'rendimientoacademico',
    components: {
      VueGoodTable
    },
    data () {
      return {
        idInforme: null,
        comboInformes: [
          { 'value': 1, 'text': 'RENDIMIENTO ACADÉMICO POR CURSO'},
        ],
        comboSedes: [],
        idSede: null,
        comboCursosSede: [],
        idCurso: null,
        listaMatriculados: [],
        encabColumnas: [],
        listaAsignaturasCurso: [],
        idPeriodo: 1,
        comboPeriodos: [],
        nombreSede: null,
        nombreCurso: null,
        btnCargando: true,
        idNivel: null,
        encabColumnas2: [],
        listaTotalesAsignaturas: []
      }
    },
    methods: {
      imprimirConsolidado() {
        // Crear una nueva ventana para imprimir
        const printWindow = window.open("Consolidado", "_blank");

        // Obtener el contenido HTML de la tabla
        //const tableHtml = this.$refs.table.$el.querySelector("table").outerHTML;
        const tableHtml2 = this.$refs.table2.$el.querySelector("table2").outerHTML;

        // Estilos básicos para la impresión
        const style = `
          <style>
            @media all {
              div.saltopagina{
                display: none;
              }
            }
            @media print{
              div.saltopagina{
                display:block; 
                page-break-before:always;
              }
            }	
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 10px 0;
              font-size: 14px;
              text-align: left;
            }
            table, th, td {
              border: 1px solid black;
            }
            th, td {
              padding-left: 5px;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        `;

        // Insertar el contenido HTML y los estilos en la nueva ventana
        printWindow.document.write(`
          <html>
            <head>
              <title>Consolidado por Curso</title>
              ${style}
            </head>
            <body>
              <p style="text-align: center;">${this.$store.state.nombreInstitucion}<br>INFORMES CONSOLIDADOS POR CURSO - AÑO LECTIVO ${this.$store.state.aLectivo}<br>Sede: ${this.nombreSede} | Curso: ${this.nombreCurso}</p>
              ${tableHtml}
              <div class="saltopagina"></div>
              <p style="text-align: center;">${this.$store.state.nombreInstitucion}<br>INFORMES CONSOLIDADOS POR CURSO - AÑO LECTIVO ${this.$store.state.aLectivo}<br>Sede: ${this.nombreSede} | Curso: ${this.nombreCurso}</p>
              ${tableHtml2}
            </body>
          </html>
        `);

        // Iniciar la impresión y cerrar la ventana
        //printWindow.document.close();
        printWindow.print();
      },
      consultarMatriculados() {
        this.btnCargando = true
        if (this.idInforme == 1) {
          this.consultarConsolidadoAsignaturas()
        }
      },
      async consultarConsolidadoAsignaturas() {
        this.nombreSede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
        if (this.idCurso != null) { 
          this.nombreCurso = document.getElementById('cursos')[document.getElementById('cursos').selectedIndex].text
          this.listaAsignaturasCurso = []
          this.$store.state.datosCursos.forEach(element => {
            if (element.id == this.idCurso) {
              this.idNivel = element.id_nivel
            }
          })
          await axios
          .get(CONFIG.ROOT_PATH + 'academico/asignacioncurso', {params: {idCurso: this.idCurso, idInstitucion: this.$store.state.idInstitucion}})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista asignaturas curso')
            } else{
              if (response.data.datos != 0) {
                this.listaAsignaturasCurso = response.data.datos
              }
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista asignación docentes curso. Intente más tarde.' + err)
          })
          if (this.idNivel == 1) {
            this.encabColumnas = []
            this.encabColumnas.push({label: 'Estudiante', field: 'estudiante', sortable: false})
            this.listaAsignaturasCurso.forEach(element => {
              this.encabColumnas.push({label: element.nemo, field: element.nemo, sortable: false, tdClass: 'text-center'})
            })
            this.listaMatriculados = []
            await axios
            .get(CONFIG.ROOT_PATH + 'academico/estudiantes/curso/consolidadoasignaturas', {params: {idCurso: this.idCurso, periodo: this.idPeriodo}})
            .then(response => {
              if (response.data.error){
                this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - consolidado asignaturas curso')
              } else{
                if (response.data.datos != 0) {
                  let datosEstudiante = {}
                  response.data.datos.forEach(element => {         
                    datosEstudiante.estudiante = element.estudiante
                    element.notas.forEach(element2 => {
                      if (element2.orden == 99) {
                        if ( this.$store.state.datosSecciones[0].tipoValComp == 0) {
                          datosEstudiante[element2.nemo] = element2.definitivacompor
                        } else {
                          datosEstudiante[element2.nemo] = Number(element2.definitiva).toFixed(1) == 0 ? '' : Number(element2.definitiva).toFixed(1)
                        }
                      } else {
                        datosEstudiante[element2.nemo] = element2.definitivapree
                      }
                    })
                    this.listaMatriculados.push(JSON.parse(JSON.stringify(datosEstudiante)))
                  })
                }
                setTimeout(()=>{
                  this.btnCargando = false
                },100)
              }
            })
            .catch(err => {
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: consolidado asignaturas curso. Intente más tarde.' + err)
            })
          } else {
            let bajosAsignatura = {}
            bajosAsignatura.estudiante = 'Total Desempeño Bajo'
            this.encabColumnas = []
            this.encabColumnas.push({label: 'Estudiante', field: 'estudiante', sortable: false})
            this.listaAsignaturasCurso.forEach(element => {
              this.encabColumnas.push({label: element.nemo, field: element.nemo, sortable: false, tdClass: 'text-center'})
              bajosAsignatura[element.nemo] = 0
            })
            this.encabColumnas.push({label: 'BAJ', field: 'bajE', sortable: false, tdClass: 'text-center'})
            this.encabColumnas.push({label: 'BAS', field: 'basE', sortable: false, tdClass: 'text-center'})
            this.encabColumnas.push({label: 'ALT', field: 'altE', sortable: false, tdClass: 'text-center'})
            this.encabColumnas.push({label: 'SUP', field: 'supE', sortable: false, tdClass: 'text-center'})
            this.encabColumnas.push({label: 'Prom', field: 'promedioAsignatura', sortable: false, tdClass: 'text-center'})
            this.encabColumnas.push({label: 'AJ', field: 'ausJ', sortable: false, tdClass: 'text-center'})
            this.encabColumnas.push({label: 'AS', field: 'ausS', sortable: false, tdClass: 'text-center'})
            this.encabColumnas.push({label: 'PST', field: 'puesto', sortable: false, tdClass: 'text-center'})
            this.listaMatriculados = []
            let totalBajos = 0
            let listaPuestos = []
            await axios
            .get(CONFIG.ROOT_PATH + 'academico/estudiantes/curso/consolidadoasignaturas', {params: {idCurso: this.idCurso, periodo: this.idPeriodo}})
            .then(response => {
              if (response.data.error){
                this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - consolidado asignaturas curso')
              } else{
                if (response.data.datos != 0) {
                  response.data.datos.forEach(element => {         
                    let contAsignaturas = 0
                    let sumaAsignaturas = 0
                    let bajE = 0
                    let basE = 0
                    let altE = 0
                    let supE = 0
                    let ausJ = 0
                    let ausS = 0
                    let datosEstudiante = {}
                    datosEstudiante.estudiante = element.estudiante
                    datosEstudiante.id = element.id
                    element.notas.forEach(element2 => {
                      if (element2.orden == 99) {
                        if ( this.$store.state.datosSecciones[0].tipoValComp == 0) {
                          datosEstudiante[element2.nemo] = element2.definitivacompor
                        } else {
                          if (isNaN(element2.definitiva) || element2.definitiva === null) {
                            datosEstudiante[element2.nemo] = ''
                          } else {
                            datosEstudiante[element2.nemo] = Number(element2.definitiva).toFixed(1)
                          }
                        }
                      } else {
                        if (isNaN(element2.definitiva) || element2.definitiva === null || element2.definitiva <= 0 || element2.definitiva > this.$store.state.datosSecciones[0].maxSup) {
                          datosEstudiante[element2.nemo] = null
                        } else {
                          if (element2.recuperacion > element2.definitiva) {
                            element2.definitiva = element2.recuperacion
                            datosEstudiante[element2.nemo] = '[' + Number(element2.recuperacion).toFixed(1) + ']'
                          } else {
                            datosEstudiante[element2.nemo] = Number(element2.definitiva).toFixed(1)
                          }
                          datosEstudiante[element2.nemo] = Number(element2.definitiva).toFixed(1)
                          if (element2.definitiva >= 0 && element2.definitiva < this.$store.state.datosSecciones[0].minBas) {
                            bajE++
                            bajosAsignatura[element2.nemo]++
                            totalBajos++
                          } else if (element2.definitiva >= this.$store.state.datosSecciones[0].minBas && element2.definitiva < this.$store.state.datosSecciones[0].minAlt) {
                            basE++
                          } else if (element2.definitiva >= this.$store.state.datosSecciones[0].minAlt && element2.definitiva < this.$store.state.datosSecciones[0].minSup) {
                            altE++
                          } else if (element2.definitiva >= this.$store.state.datosSecciones[0].minSup && element2.definitiva <= this.$store.state.datosSecciones[0].maxSup) {
                            supE++
                          }
                          sumaAsignaturas += element2.definitiva
                          ausJ += Number(element2.ausJ)
                          ausS += Number(element2.ausS)
                          contAsignaturas++
                        }
                      }
                    })
                    if (contAsignaturas > 0) {
                      datosEstudiante.promedioAsignatura = Number(sumaAsignaturas / contAsignaturas).toFixed(1)
                      //sumaPromedios += Number(sumaAsignaturas / contAsignaturas).toFixed(1)
                      datosEstudiante.bajE = bajE
                      datosEstudiante.basE = basE
                      datosEstudiante.altE = altE
                      datosEstudiante.supE = supE
                      datosEstudiante.ausJ = ausJ
                      datosEstudiante.ausS = ausS
                      datosEstudiante.puesto = ''
                    } else {
                      datosEstudiante.promedioAsignatura = Number(0).toFixed(1)
                    }
                    this.listaMatriculados.push(JSON.parse(JSON.stringify(datosEstudiante)))
                    listaPuestos.push({'id': element.id, 'promedio': datosEstudiante.promedioAsignatura})
                  })
                  listaPuestos.sort(((a, b) => b.promedio - a.promedio));

                  let numPuesto = 1
                  listaPuestos.forEach(element2 => {
                    this.listaMatriculados.forEach(element => {
                      if (element.id == element2.id) {
                        element.puesto = numPuesto
                        numPuesto++
                      }
                    })
                  })

                  bajosAsignatura.bajE = totalBajos
                  this.listaMatriculados.push(JSON.parse(JSON.stringify(bajosAsignatura)))

                  let datosAsignatura = {}
                  this.listaTotalesAsignaturas = []
                  this.listaAsignaturasCurso.forEach(element => {
                    //if (element.orden != 99) {
                      datosAsignatura.asignatura = element.asignatura + " (" + element.nemo + ")"
                      datosAsignatura.bajA = 0
                      datosAsignatura.basA = 0
                      datosAsignatura.altA = 0
                      datosAsignatura.supA = 0
                      datosAsignatura.porcBajA = 0
                      datosAsignatura.porcBasA = 0
                      datosAsignatura.porcAltA = 0
                      datosAsignatura.porcSupA = 0
                      datosAsignatura.totalA = 0
                      response.data.datos.forEach(element2 => {
                        element2.notas.forEach(element3 => {
                          if (element3.id_asignatura_curso == element.idAsignaturaCurso) {
                            if (!isNaN(element3.definitiva) && element3.definitiva !== null && element3.definitiva > 0 && element3.definitiva <= this.$store.state.datosSecciones[0].maxSup) {
                              if (element3.definitiva >= 0 && element3.definitiva < this.$store.state.datosSecciones[0].minBas) {
                                datosAsignatura.bajA++
                              } else if (element3.definitiva >= this.$store.state.datosSecciones[0].minBas && element3.definitiva < this.$store.state.datosSecciones[0].minAlt) {
                                datosAsignatura.basA++
                              } else if (element3.definitiva >= this.$store.state.datosSecciones[0].minAlt && element3.definitiva < this.$store.state.datosSecciones[0].minSup) {
                                datosAsignatura.altA++
                              } else if (element3.definitiva >= this.$store.state.datosSecciones[0].minSup && element3.definitiva <= this.$store.state.datosSecciones[0].maxSup) {
                                datosAsignatura.supA++
                              }
                            }                         
                          }
                        })
                      })
                      datosAsignatura.totalA = datosAsignatura.bajA + datosAsignatura.basA + datosAsignatura.altA + datosAsignatura.supA
                      datosAsignatura.porcBajA = Number(datosAsignatura.bajA / datosAsignatura.totalA * 100).toFixed(1) > 0 ? Number(datosAsignatura.bajA / datosAsignatura.totalA * 100).toFixed(1) : ''
                      datosAsignatura.porcBasA = Number(datosAsignatura.basA / datosAsignatura.totalA * 100).toFixed(1) > 0 ? Number(datosAsignatura.basA / datosAsignatura.totalA * 100).toFixed(1) : ''
                      datosAsignatura.porcAltA = Number(datosAsignatura.altA / datosAsignatura.totalA * 100).toFixed(1) > 0 ? Number(datosAsignatura.altA / datosAsignatura.totalA * 100).toFixed(1) : ''
                      datosAsignatura.porcSupA = Number(datosAsignatura.supA / datosAsignatura.totalA * 100).toFixed(1) > 0 ? Number(datosAsignatura.supA / datosAsignatura.totalA * 100).toFixed(1) : ''
                      this.listaTotalesAsignaturas.push(JSON.parse(JSON.stringify(datosAsignatura)))
                    //}
                  })
                }
                setTimeout(()=>{
                  this.btnCargando = false
                },100)
              }
            })
            .catch(err => {
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: consolidado asignaturas curso. Intente más tarde.' + err)
            })
            this.encabColumnas2 = []
            this.encabColumnas2.push({label: 'Asignatura', field: 'asignatura', sortable: false})
            this.encabColumnas2.push({label: 'Bajo', field: 'bajA', sortable: false})
            this.encabColumnas2.push({label: '%', field: 'porcBajA', sortable: false})
            this.encabColumnas2.push({label: 'Basico', field: 'basA', sortable: false})
            this.encabColumnas2.push({label: '%', field: 'porcBasA', sortable: false})
            this.encabColumnas2.push({label: 'Alto', field: 'altA', sortable: false})
            this.encabColumnas2.push({label: '%', field: 'porcAltA', sortable: false})
            this.encabColumnas2.push({label: 'Superior', field: 'supA', sortable: false})
            this.encabColumnas2.push({label: '%', field: 'porcSupA', sortable: false})
            this.encabColumnas2.push({label: 'Total', field: 'totalA', sortable: false})
          }
        }
      },
      async ocuparComboSedes() {
        this.comboSedes = []
        this.$store.state.datosSedes.forEach(element => {
          this.comboSedes.push({ 'value': element.id, 'text': element.sede.toUpperCase() })
        })
      },
      async ocuparComboCursosSede() {
        this.comboCursosSede = []
        this.$store.state.datosCursos.forEach(element => {
          if (element.id_sede == this.idSede) {
            this.comboCursosSede.push({ 'value': element.id, 'text': element.nomenclatura.toUpperCase() })
          }
        })
      },
      async ocuparComboPeriodos() {
        this.comboPeriodos = []
        this.$store.state.datosTablas.periodos.forEach(element => {
          this.comboPeriodos.push({ 'value': element.id, 'text': element.periodo.toUpperCase() })
        })
      },
      cancelarFormulario() {
        this.$router.push('/')
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    computed: {
    },
    beforeMount() {
      this.ocuparComboPeriodos()
      this.ocuparComboSedes()
    }
  }
</script>

<style>
  .condensed thead th{
    padding-left:.1em;
    padding-right:.1em;
    font-size: 12px;
    text-align: center;
    /*writing-mode: vertical-lr;
    text-orientation: upright;*/
  }
  .condensed tbody{
    padding-left:.1em;
    padding-right:.1em;
    font-size: 12px;
    text-align: center;
    height: 10px;
  }
  .condensed input{
    padding-left:.1em;
    padding-right:.1em;
    padding-top:.1em;
    padding-bottom:.1em;
    height: 18px;
    font-size: 12px;
    text-align: center;
  }
</style>
