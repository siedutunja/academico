<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> INFORME CONSOLIDADO DE AUSENCIAS POR PERIODO</h5>
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
              <!-- **************** CONSOLIDADO AUSENCIAS ASIGNATURAS ************** -->
              <b-col lg="12" v-if="idInforme == 1">
                <div v-if="btnCargando">
                  <div class="text-center m-5 text-primary">
                    <b-spinner style="width: 3rem; height: 3rem;" label="Spinner"></b-spinner>
                    <br><strong>Cargando planilla...</strong>
                  </div>
                </div>
                <div v-else>
                  <vue-good-table ref="table" :columns="encabColumnas" :rows="listaMatriculados" styleClass="vgt-table condensed bordered striped">
                    <div slot="emptystate">
                      <h5 class="text-danger ml-5">No existen estudiantes matriculados</h5>
                    </div>
                  </vue-good-table>
                  <b-row>
                    <b-col lg="12">
                      <b-button class="small mx-1 mt-3" variant="primary" @click="imprimirConsolidado">Imprimir Consolidado</b-button>
                      <vue-excel-xlsx class="small mx-1 mt-3 btn btn-outline-primary" :data="listaMatriculados" :columns="encabColumnas" :file-name="'ConsolidadoAusencias-' + new Date().toLocaleDateString()" :file-type="'xlsx'" :sheet-name="'Ausencias'">
                        Exportar Consolidado Ausencias a Excel
                      </vue-excel-xlsx>
                    </b-col>
                  </b-row>
                </div>
              </b-col>
              <!-- **************** CONSOLIDADO AUSENCIAS AREAS ************** -->
              <b-col lg="12" v-if="idInforme == 2">
                <div v-if="btnCargando">
                  <div class="text-center m-5 text-primary">
                    <b-spinner style="width: 3rem; height: 3rem;" label="Spinner"></b-spinner>
                    <br><strong>Cargando planilla...</strong>
                  </div>
                </div>
                <div v-else>
                  <vue-good-table ref="table" :columns="encabColumnasAreas" :rows="listaMatriculados" styleClass="vgt-table condensed bordered striped">
                    <div slot="emptystate">
                      <h5 class="text-danger ml-5">No existen estudiantes matriculados</h5>
                    </div>
                  </vue-good-table>
                  <b-row>
                    <b-col lg="12">
                      <b-button class="small mx-1 mt-3" variant="primary" @click="imprimirConsolidado">Imprimir Consolidado</b-button>
                      <vue-excel-xlsx class="small mx-1 mt-3 btn btn-outline-primary" :data="listaMatriculados" :columns="encabColumnasAreas" :file-name="'ConsolidadoAusencias-' + new Date().toLocaleDateString()" :file-type="'xlsx'" :sheet-name="'Ausencias'">
                        Exportar Consolidado Ausencias a Excel
                      </vue-excel-xlsx>
                    </b-col>
                  </b-row>
                </div>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Informes consolidados por curso.</em>
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
    name: 'consolidadoscurso',
    components: {
      VueGoodTable
    },
    data () {
      return {
        idInforme: null,
        comboInformes: [
          { 'value': 1, 'text': 'CONSOLIDADO DE AUSENCIAS POR ASIGNATURA'},
          //{ 'value': 2, 'text': 'CONSOLIDADO DE AUSENCIAS POR AREA'},
        ],
        comboSedes: [],
        idSede: null,
        comboCursosSede: [],
        idCurso: null,
        listaMatriculados: [],
        encabColumnas: [],
        encabColumnasAreas: [],
        listaAsignaturasCurso: [],
        idPeriodo: 1,
        comboPeriodos: [],
        nombreSede: null,
        nombreCurso: null,
        btnCargando: true,
        idNivel: null,
        listaTotalesAsignaturas: [],
        listaAreasAsignaturasCurso: []
      }
    },
    methods: {
      imprimirConsolidado() {
        // Crear una nueva ventana para imprimir
        const printWindow = window.open("Ausencias", "_blank");
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
              font-size: 12px;
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
              <title>Consolidados</title>
              ${style}
            </head>
            <body>
              <p style="text-align: center; font-size: 10px;">SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA<br><b>${this.$store.state.nombreInstitucion}</b><br>TUNJA - BOYACÁ<br>CONSOLIDADO DE EVALUACIONES POR PERIODO - AÑO LECTIVO ${this.$store.state.aLectivo}<br>Sede: ${this.nombreSede} | Curso: ${this.nombreCurso} | Periodo: ${this.idPeriodo}</p>
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
          this.consultarConsolidadoAsignaturas()
        } else if (this.idInforme == 2) {
          this.consultarConsolidadoAreas()
        }
      },
      async consultarConsolidadoAreas() {
        this.nombreSede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
        this.nombreCurso = document.getElementById('cursos')[document.getElementById('cursos').selectedIndex].text
        this.$store.state.datosCursos.forEach(element => {
          if (element.id == this.idCurso) {
            this.idNivel = element.id_nivel
          }
        })
        this.listaAreasAsignaturasCurso = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/asignacioncursoareas', {params: {idCurso: this.idCurso, idInstitucion: this.$store.state.idInstitucion, vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista asignaturas curso')
            this.btnCargando = false
          } else{
            if (response.data.datos != 0) {
              this.listaAreasAsignaturasCurso = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista asignación docentes curso. Intente más tarde.' + err)
          this.btnCargando = false
        })
        if (this.idNivel == 1) {
          this.listaAsignaturasCurso = []
          await axios
          .get(CONFIG.ROOT_PATH + 'academico/asignacioncurso', {params: {idCurso: this.idCurso, idInstitucion: this.$store.state.idInstitucion}})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista asignaturas curso')
              this.btnCargando = false
            } else{
              if (response.data.datos != 0) {
                this.listaAsignaturasCurso = response.data.datos
              }
            }
            //console.log(JSON.stringify(this.listaAsignaturasCurso))
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista asignación docentes curso. Intente más tarde.' + err)
            this.btnCargando = false
          })
          this.encabColumnasAreas = []
          this.encabColumnasAreas.push({label: 'Estudiante', field: 'estudiante', sortable: false})
          this.listaAsignaturasCurso.forEach(element => {
            this.encabColumnasAreas.push({label: element.nemo, field: element.nemo, sortable: false, tdClass: 'text-center'})
          })
          this.listaMatriculados = []
          await axios
          .get(CONFIG.ROOT_PATH + 'academico/estudiantes/curso/consolidadoasignaturas', {params: {idCurso: this.idCurso, periodo: this.idPeriodo}})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - consolidado asignaturas curso')
              this.btnCargando = false
            } else{
              if (response.data.datos != 0) {
                //console.log(JSON.stringify(response.data.datos))
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
                  //console.log(JSON.stringify(datosEstudiante))
                })
              }
              setTimeout(()=>{
                this.btnCargando = false
              },100)
            }
            //console.log(JSON.stringify(this.listaMatriculados))
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: consolidado asignaturas curso. Intente más tarde.' + err)
            this.btnCargando = false
          })
        } else {
          let bajosArea = {}
          bajosArea.estudiante = 'Total Desempeño Bajo'
          this.encabColumnasAreas = []
          this.encabColumnasAreas.push({label: 'Estudiante', field: 'estudiante', sortable: false})
          this.encabColumnasAreas.push({label: '#', field: 'orden', sortable: false})
          this.listaAreasAsignaturasCurso.forEach(elementAr => {
            this.encabColumnasAreas.push({label: elementAr.nemoArea, field: elementAr.nemoArea, sortable: false, tdClass: 'text-center'})
            if ((elementAr.asignaturas).length > 1) {
              elementAr.asignaturas.forEach(elementAs => {
                this.encabColumnasAreas.push({label: elementAs.nemo, field: elementAs.nemo, sortable: false, tdClass: 'text-center'})
                bajosArea[elementAs.nemo] = 0
              })
              bajosArea[elementAr.nemoArea] = 0
            } else {
              bajosArea[elementAr.nemoArea] = 0
            }
          })
          this.encabColumnasAreas.push({label: '#', field: 'orden', sortable: false})
          this.encabColumnasAreas.push({label: 'BJ', field: 'bajE', sortable: false, tdClass: 'text-center'})
          this.encabColumnasAreas.push({label: 'BS', field: 'basE', sortable: false, tdClass: 'text-center'})
          this.encabColumnasAreas.push({label: 'AL', field: 'altE', sortable: false, tdClass: 'text-center'})
          this.encabColumnasAreas.push({label: 'SU', field: 'supE', sortable: false, tdClass: 'text-center'})
          this.encabColumnasAreas.push({label: 'PRO', field: 'promedioAsignatura', sortable: false, tdClass: 'text-center'})
          this.encabColumnasAreas.push({label: 'PTO', field: 'puesto', sortable: false, tdClass: 'text-center'})
          this.encabColumnasAreas.push({label: 'AJ', field: 'ausJ', sortable: false, tdClass: 'text-center'})
          this.encabColumnasAreas.push({label: 'AS', field: 'ausS', sortable: false, tdClass: 'text-center'})

          this.listaMatriculados = []
          let totalBajos = 0
          let listaPuestos = []
          let numOrden = 1
          await axios
          .get(CONFIG.ROOT_PATH + 'academico/estudiantes/curso/consolidadoasignaturas', {params: {idCurso: this.idCurso, periodo: this.idPeriodo}})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - consolidado asignaturas curso')
              this.btnCargando = false
            } else{
              if (response.data.datos != 0) {
                //console.log(JSON.stringify(response.data.datos))
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
                  datosEstudiante.orden = numOrden
                  datosEstudiante.id = element.id
                  this.listaAreasAsignaturasCurso.forEach(elementAr => {
                    if ((elementAr.asignaturas).length > 1) {
                      let sumaPromArea = 0
                      elementAr.asignaturas.forEach(elementAs => {
                        let indice = element.notas.findIndex(nota => nota.id_asignatura_curso === elementAs.idAsignaturaCurso)
                        if (indice >= 0) {
                          if (isNaN(element.notas[indice].definitiva) || element.notas[indice].definitiva === null || element.notas[indice].definitiva <= 0 || element.notas[indice].definitiva > this.$store.state.datosSecciones[0].maxSup) {
                            datosEstudiante[elementAs.nemo] = ''
                          } else {
                            datosEstudiante[elementAs.nemo] = Number(element.notas[indice].definitiva).toFixed(1)
                            sumaPromArea += (element.notas[indice].definitiva * elementAs.porcentaje) / 100
                            if (element.notas[indice].definitiva > 0 && element.notas[indice].definitiva < this.$store.state.datosSecciones[0].minBas) {
                              bajE++
                              bajosArea[elementAs.nemo]++
                              totalBajos++
                            } else if (element.notas[indice].definitiva >= this.$store.state.datosSecciones[0].minBas && element.notas[indice].definitiva < this.$store.state.datosSecciones[0].minAlt) {
                              basE++
                            } else if (element.notas[indice].definitiva >= this.$store.state.datosSecciones[0].minAlt && element.notas[indice].definitiva < this.$store.state.datosSecciones[0].minSup) {
                              altE++
                            } else if (element.notas[indice].definitiva >= this.$store.state.datosSecciones[0].minSup && element.notas[indice].definitiva <= this.$store.state.datosSecciones[0].maxSup) {
                              supE++
                            }
                            sumaAsignaturas += element.notas[indice].definitiva
                            ausJ += Number(element.notas[indice].ausJ)
                            ausS += Number(element.notas[indice].ausS)
                            contAsignaturas++
                          }
                        }
                      })
                      datosEstudiante[elementAr.nemoArea] = this.redondear(sumaPromArea).toFixed(1)
                      if (datosEstudiante[elementAr.nemoArea] > 0 && datosEstudiante[elementAr.nemoArea] < this.$store.state.datosSecciones[0].minBas) {
                        bajosArea[elementAr.nemoArea]++
                      }
                    } else {
                      let indice = element.notas.findIndex(nota => nota.id_area === elementAr.idArea)
                      if (indice >= 0) {
                        if (element.notas[indice].orden == 99) {
                          if ( this.$store.state.datosSecciones[0].tipoValComp == 0) {
                            datosEstudiante[elementAr.nemoArea] = element.notas[indice].definitivacompor
                          } else {
                            if (isNaN(element.notas[indice].definitiva) || element.notas[indice].definitiva === null || element.notas[indice].definitiva <= 0 || element.notas[indice].definitiva > this.$store.state.datosSecciones[0].maxSup) {
                              datosEstudiante[elementAr.nemoArea] = ''
                            } else {
                              datosEstudiante[elementAr.nemoArea] = Number(element.notas[indice].definitiva).toFixed(1)
                            }
                          }
                        } else {
                          if (isNaN(element.notas[indice].definitiva) || element.notas[indice].definitiva === null || element.notas[indice].definitiva <= 0 || element.notas[indice].definitiva > this.$store.state.datosSecciones[0].maxSup) {
                            datosEstudiante[elementAr.nemoArea] = ''
                          } else {
                            datosEstudiante[elementAr.nemoArea] = Number(element.notas[indice].definitiva).toFixed(1)
                            if (element.notas[indice].definitiva > 0 && element.notas[indice].definitiva < this.$store.state.datosSecciones[0].minBas) {
                              bajE++
                              bajosArea[elementAr.nemoArea]++
                              totalBajos++
                            } else if (element.notas[indice].definitiva >= this.$store.state.datosSecciones[0].minBas && element.notas[indice].definitiva < this.$store.state.datosSecciones[0].minAlt) {
                              basE++
                            } else if (element.notas[indice].definitiva >= this.$store.state.datosSecciones[0].minAlt && element.notas[indice].definitiva < this.$store.state.datosSecciones[0].minSup) {
                              altE++
                            } else if (element.notas[indice].definitiva >= this.$store.state.datosSecciones[0].minSup && element.notas[indice].definitiva <= this.$store.state.datosSecciones[0].maxSup) {
                              supE++
                            }
                            sumaAsignaturas += element.notas[indice].definitiva
                            ausJ += Number(element.notas[indice].ausJ)
                            ausS += Number(element.notas[indice].ausS)
                            contAsignaturas++
                          }
                        }
                      }
                    }
                  })
                  if (contAsignaturas > 0) {
                    datosEstudiante.promedioAsignatura = Number(sumaAsignaturas / contAsignaturas).toFixed(1)
                    listaPuestos.push({'id': element.id, 'promedio': sumaAsignaturas / contAsignaturas})
                    datosEstudiante.bajE = bajE
                    datosEstudiante.basE = basE
                    datosEstudiante.altE = altE
                    datosEstudiante.supE = supE
                    datosEstudiante.ausJ = ausJ
                    datosEstudiante.ausS = ausS
                    datosEstudiante.puesto = ''
                  } else {
                    datosEstudiante.promedioAsignatura = ''
                    listaPuestos.push({'id': element.id, 'promedio': 0})
                  }
                  this.listaMatriculados.push(JSON.parse(JSON.stringify(datosEstudiante)))
                  //console.log(JSON.stringify(datosEstudiante))
                  numOrden++
                })
                listaPuestos.sort(((a, b) => b.promedio - a.promedio));
                //console.log(JSON.stringify(listaPuestos))
                let numPuesto = 1
                listaPuestos.forEach(element2 => {
                  this.listaMatriculados.forEach(element => {
                    if (element.id == element2.id) {
                      element.puesto = numPuesto
                      numPuesto++
                    }
                  })
                })
                bajosArea.bajE = 99
                this.listaMatriculados.push(JSON.parse(JSON.stringify(bajosArea)))
                setTimeout(()=>{
                  this.btnCargando = false
                },100)
              } else {
                this.btnCargando = false
              }
            }
            //console.log(JSON.stringify(this.listaMatriculados))
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: consolidado areas curso. Intente más tarde.' + err)
            this.btnCargando = false
          })
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
              this.btnCargando = false
            } else{
              if (response.data.datos != 0) {
                this.listaAsignaturasCurso = response.data.datos
              }
            }
            //console.log(JSON.stringify(this.listaAsignaturasCurso))
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista asignación docentes curso. Intente más tarde.' + err)
            this.btnCargando = false
          })
            let fallasAsignatura = {}
            fallasAsignatura.estudiante = 'Total Ausencias Sin Justificar'
            this.encabColumnas = []
            this.encabColumnas.push({label: 'Estudiante', field: 'estudiante', sortable: false})
            this.encabColumnas.push({label: '#', field: 'orden', sortable: false})
            this.listaAsignaturasCurso.forEach(element => {
              this.encabColumnas.push({label: element.nemo, field: element.nemo, sortable: false, tdClass: 'text-center'})
              fallasAsignatura[element.nemo] = 0
            })
            this.encabColumnas.push({label: '#', field: 'orden', sortable: false})
            this.encabColumnas.push({label: 'AJ', field: 'ausJ', sortable: false, tdClass: 'text-center'})
            this.encabColumnas.push({label: 'AS', field: 'ausS', sortable: false, tdClass: 'text-center'})
            this.listaMatriculados = []
            let numOrden = 1
            await axios
            .get(CONFIG.ROOT_PATH + 'academico/estudiantes/curso/consolidadoasignaturas', {params: {idCurso: this.idCurso, periodo: this.idPeriodo}})
            .then(response => {
              if (response.data.error){
                this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - consolidado asignaturas curso')
                this.btnCargando = false
              } else{
                if (response.data.datos != 0) {
                  //console.log(JSON.stringify(response.data.datos))
                  response.data.datos.forEach(element => {         
                    let ausJ = 0
                    let ausS = 0
                    let datosEstudiante = {}
                    datosEstudiante.estudiante = element.estudiante
                    datosEstudiante.orden = numOrden
                    datosEstudiante.id = element.id
                    element.notas.forEach(element2 => {
                      let verJ = '-'
                      let verS = '-'
                      if (element2.ausJ!=null)
                        verJ = element2.ausJ
                      if (element2.ausS!=null)
                        verS = element2.ausS
                      datosEstudiante[element2.nemo] = verJ + ' | ' + verS
                      fallasAsignatura[element2.nemo] += element2.ausS
                      ausJ += Number(element2.ausJ)
                      ausS += Number(element2.ausS)
                    })
                    datosEstudiante.ausJ = ausJ
                    datosEstudiante.ausS = ausS
                    this.listaMatriculados.push(JSON.parse(JSON.stringify(datosEstudiante)))
                    //console.log(JSON.stringify(datosEstudiante))
                    numOrden++
                  })
                  this.listaMatriculados.push(JSON.parse(JSON.stringify(fallasAsignatura)))
                  setTimeout(()=>{
                    this.btnCargando = false
                  },100)
                } else {
                  this.btnCargando = false
                }
              }
              //console.log(JSON.stringify(this.listaMatriculados))
            })
            .catch(err => {
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: consolidado asignaturas curso. Intente más tarde.' + err)
              this.btnCargando = false
            })
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
        //console.log(JSON.stringify(this.$store.state.datosCursos))
      },
      async ocuparComboPeriodos() {
        this.comboPeriodos = []
        this.$store.state.datosTablas.periodos.forEach(element => {
          this.comboPeriodos.push({ 'value': element.id, 'text': element.periodo.toUpperCase() })
        })
      },
      redondear(num) {
        var m = Number((Math.abs(num) * 10).toPrecision(15))
        return Math.round(m) / 10 * Math.sign(num);
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
