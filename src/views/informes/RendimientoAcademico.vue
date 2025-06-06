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
            <b-row v-if="idInforme == 1">
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
            <b-row v-if="idInforme == 2">
              <b-col lg="2">
                <b-form-group label="Periodo:" label-for="periodo" class="etiqueta">
                  <b-form-select id="periodo" ref="periodo" v-model="idPeriodo" :options="comboPeriodos" @change="idSede=null"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idGrado=null,ocuparComboGradosSede()" :disabled="idPeriodo!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="Seleccione el Grado:" label-for="grados" class="etiqueta">
                  <b-form-select id="grados" ref="grados" v-model="idGrado" :options="comboGradosSede" @change="consultarMatriculados()" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mt-2" v-if="idCurso!=null || idGrado!=null">
              <b-col lg="12"><hr></b-col>
              <!-- **************** CONSOLIDADO ASIGNATURAS ************** -->
              <b-col lg="12" v-if="idInforme == 1 || idInforme == 2">
                <div v-if="btnCargando">
                  <div class="text-center m-5 text-primary">
                    <b-spinner style="width: 3rem; height: 3rem;" label="Spinner"></b-spinner>
                    <br><strong>Cargando planilla...</strong>
                  </div>
                </div>
                <div v-else>
                  <vue-good-table ref="table" :columns="encabColumnas2" :rows="listaTotalesAsignaturas" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                    <div slot="emptystate">
                      <h5 class="text-danger ml-5">-</h5>
                    </div>
                  </vue-good-table>
                  <b-row>
                    <b-col lg="12">
                      <b-button class="small mx-1 mt-3" variant="primary" @click="idInforme == 1 ? imprimirConsolidadoCurso() : imprimirConsolidadoGrado()">Imprimir Consolidado</b-button>
                      <vue-excel-xlsx class="small mx-1 mt-3 btn btn-outline-primary" :data="listaTotalesAsignaturas" :columns="encabColumnas2" :file-name="idInforme == 1 ? 'Rendimiento-' + nombreCurso + '-' + new Date().toLocaleDateString() : 'Rendimiento-' + nombreGrado + '-' + new Date().toLocaleDateString()" :file-type="'xlsx'" :sheet-name="'Rendimiento'">
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
          { 'value': 2, 'text': 'RENDIMIENTO ACADÉMICO POR GRADO'},
        ],
        comboSedes: [],
        idSede: null,
        comboCursosSede: [],
        idCurso: null,
        comboGradosSede: [],
        idGrado: null,
        listaMatriculados: [],
        listaAsignaturasCurso: [],
        listaAsignaturasGrado: [],
        idPeriodo: 1,
        comboPeriodos: [],
        nombreSede: null,
        nombreCurso: null,
        nombreGrado: null,
        btnCargando: true,
        idNivel: null,
        encabColumnas2: [],
        listaTotalesAsignaturas: []
      }
    },
    methods: {
      imprimirConsolidadoCurso() {
        // Crear una nueva ventana para imprimir
        const printWindow = window.open("consolidado", "_blank");
        // Obtener el contenido HTML de la tabla
        const tableHtml = this.$refs.table.$el.querySelector("table").outerHTML;
        let fecha = 'Fecha: ' + new Date().toLocaleString()
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
              <title>Rendimiento por Curso</title>
              ${style}
            </head>
            <body>
              <p style="text-align: center;">${this.$store.state.nombreInstitucion}<br>INFORME RENDIMIENTO ACADÉMICO POR CURSO - AÑO LECTIVO ${this.$store.state.aLectivo}<br>Sede: ${this.nombreSede} | Curso: ${this.nombreCurso}</p>
              ${tableHtml}
              <div style="text-align: right;"><i>${fecha}</i></div>
            </body>
          </html>
        `);

        // Iniciar la impresión y cerrar la ventana
        //printWindow.document.close();
        printWindow.print();
      },
      imprimirConsolidadoGrado() {
        // Crear una nueva ventana para imprimir
        const printWindow = window.open("consolidado", "_blank");
        // Obtener el contenido HTML de la tabla
        const tableHtml = this.$refs.table.$el.querySelector("table").outerHTML;
        let fecha = 'Fecha: ' + new Date().toLocaleString()
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
              <title>Rendimiento por Grado</title>
              ${style}
            </head>
            <body>
              <p style="text-align: center;">${this.$store.state.nombreInstitucion}<br>INFORME RENDIMIENTO ACADÉMICO POR GRADO - AÑO LECTIVO ${this.$store.state.aLectivo}<br>Sede: ${this.nombreSede} | Grado: ${this.nombreGrado}</p>
              ${tableHtml}
              <div style="text-align: right;"><i>${fecha}</i></div>
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
          this.consultarConsolidadoAsignaturasCurso()
        }
        if (this.idInforme == 2) {
          this.consultarConsolidadoAsignaturasGrado()
        }
      },
      async consultarConsolidadoAsignaturasGrado() {
        this.listaTotalesAsignaturas = []
        this.idNivel = null
        this.nombreSede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
        if (this.idGrado != null) {
          this.nombreGrado = document.getElementById('grados')[document.getElementById('grados').selectedIndex].text
        }
        this.listaAsignaturasGrado = []
        this.$store.state.datosGrados.forEach(element => {
          if (element.id == this.idGrado) {
            this.idNivel = element.id_nivel
          }
        })
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/asignaciongrado', {params: {idGrado: this.idGrado, idInstitucion: this.$store.state.idInstitucion}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista asignaturas grado')
          } else{
            if (response.data.datos != 0) {
              this.listaAsignaturasGrado = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista asignación docentes grado. Intente más tarde.' + err)
        })
        //console.log(JSON.stringify(this.listaAsignaturasGrado))
        if (this.idNivel == 1) {
          this.mensajeEmergente('warning',CONFIG.TITULO_MSG,'El informe de ' + this.nombreCurso + ' esta en construcción...')
          this.btnCargando = false
        } else {
          this.listaMatriculados = []
          await axios
          .get(CONFIG.ROOT_PATH + 'academico/rendimiento/grado', {params: {idGrado: this.idGrado, periodo: this.idPeriodo}})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - consolidado asignaturas grado')
            } else{
              if (response.data.datos != 0) {
                let datosAsignatura = {}
                let subListaTotalesAsignaturas = []
                this.listaTotalesAsignaturas = []
                this.listaAsignaturasGrado.forEach(element => {
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
                          if (!isNaN(element3.definitiva) && element3.definitiva !== null && element3.definitiva > 0 && element3.definitiva <= element.maxSup) {
                            if (element3.recuperacion > element3.definitiva) {
                              element3.definitiva = element3.recuperacion
                            }
                            if (element.id_tipo == 1) {
                              if (element3.definitiva > 0 && element3.definitiva < element.minBas) {
                                datosAsignatura.bajA++
                              } else if (element3.definitiva >= element.minBas && element3.definitiva < element.minAlt) {
                                datosAsignatura.basA++
                              } else if (element3.definitiva >= element.minAlt && element3.definitiva < element.minSup) {
                                datosAsignatura.altA++
                              } else if (element3.definitiva >= element.minSup && element3.definitiva <= element.maxSup) {
                                datosAsignatura.supA++
                              }
                            } else if (element.id_tipo == 2) {
                              if (element3.definitiva > 0 && element3.definitiva < element.minBasT) {
                                datosAsignatura.bajA++
                              } else if (element3.definitiva >= element.minBasT && element3.definitiva < element.minAltT) {
                                datosAsignatura.basA++
                              } else if (element3.definitiva >= element.minAltT && element3.definitiva < element.minSupT) {
                                datosAsignatura.altA++
                              } else if (element3.definitiva >= element.minSupT && element3.definitiva <= element.maxSupT) {
                                datosAsignatura.supA++
                              }
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
                    subListaTotalesAsignaturas.push(JSON.parse(JSON.stringify(datosAsignatura)))
                    //this.listaTotalesAsignaturas.push(JSON.parse(JSON.stringify(datosAsignatura)))
                  //}
                })
                const data = subListaTotalesAsignaturas
                const resultado = data.reduce((acc, item) => {
                  const { asignatura, bajA, basA, altA, supA, totalA } = item;
                  if (!acc[asignatura]) {
                      acc[asignatura] = { asignatura, bajA: 0, basA: 0, altA: 0, supA: 0, totalA: 0 };
                  }
                  acc[asignatura].bajA += bajA || 0;
                  acc[asignatura].basA += basA || 0;
                  acc[asignatura].altA += altA || 0;
                  acc[asignatura].supA += supA || 0;
                  acc[asignatura].totalA += totalA || 0;
                  return acc;
                }, {});
                // Calcular porcentajes
                Object.values(resultado).forEach(item => {
                  const { bajA, basA, altA, supA, totalA } = item;
                  if (totalA > 0) { // Evitar divisiones por cero
                    item.porcBajA = ((bajA / totalA) * 100).toFixed(1);
                    item.porcBasA = ((basA / totalA) * 100).toFixed(1);
                    item.porcAltA = ((altA / totalA) * 100).toFixed(1);
                    item.porcSupA = ((supA / totalA) * 100).toFixed(1);
                  }
                });
                const resultadoFinal = Object.values(resultado);
                //console.log(resultadoFinal);
                //console.log(JSON.stringify(this.listaTotalesAsignaturas))
                this.listaTotalesAsignaturas = resultadoFinal
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
      },
      async consultarConsolidadoAsignaturasCurso() {
        this.listaTotalesAsignaturas = []
        this.idNivel = null
        this.nombreSede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
        if (this.idCurso != null) {
          this.nombreCurso = document.getElementById('cursos')[document.getElementById('cursos').selectedIndex].text
        }
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
          this.mensajeEmergente('warning',CONFIG.TITULO_MSG,'El informe de ' + this.nombreCurso + ' esta en construcción...')
          this.btnCargando = false
        } else {
          this.listaMatriculados = []
          await axios
          .get(CONFIG.ROOT_PATH + 'academico/rendimiento/curso', {params: {idCurso: this.idCurso, periodo: this.idPeriodo}})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - consolidado asignaturas curso')
            } else{
              if (response.data.datos != 0) {
                let datosAsignatura = {}
                this.listaTotalesAsignaturas = []
                //console.log(JSON.stringify(this.listaAsignaturasCurso))
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
                          if (!isNaN(element3.definitiva) && element3.definitiva !== null && element3.definitiva > 0 && element3.definitiva <= element.maxSup) {
                            if (element3.recuperacion > element3.definitiva) {
                              element3.definitiva = element3.recuperacion
                            }
                            if (element.id_tipo == 1) {
                              if (element3.definitiva > 0 && element3.definitiva < element.minBas) {
                                datosAsignatura.bajA++
                              } else if (element3.definitiva >= element.minBas && element3.definitiva < element.minAlt) {
                                datosAsignatura.basA++
                              } else if (element3.definitiva >= element.minAlt && element3.definitiva < element.minSup) {
                                datosAsignatura.altA++
                              } else if (element3.definitiva >= element.minSup && element3.definitiva <= element.maxSup) {
                                datosAsignatura.supA++
                              }
                            } else if (element.id_tipo == 2) {
                              if (element3.definitiva > 0 && element3.definitiva < element.minBasT) {
                                datosAsignatura.bajA++
                              } else if (element3.definitiva >= element.minBasT && element3.definitiva < element.minAltT) {
                                datosAsignatura.basA++
                              } else if (element3.definitiva >= element.minAltT && element3.definitiva < element.minSupT) {
                                datosAsignatura.altA++
                              } else if (element3.definitiva >= element.minSupT && element3.definitiva <= element.maxSupT) {
                                datosAsignatura.supA++
                              }
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
      },
      async ocuparComboSedes() {
        this.comboSedes = []
        this.$store.state.datosSedes.forEach(element => {
          this.comboSedes.push({ 'value': element.id, 'text': element.sede.toUpperCase() })
        })
      },
      async ocuparComboGradosSede() {
        this.comboGradosSede = []
        this.$store.state.datosGrados.forEach(element => {
          if (element.id_sede == this.idSede) {
            this.comboGradosSede.push({ 'value': element.id, 'text': element.grado.toUpperCase() })
          }
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
