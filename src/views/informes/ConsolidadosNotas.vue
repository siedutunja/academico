<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> INFORMES CONSOLIDADOS DE EVALUACIONES</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="8">
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
                  <div v-if="idNivel == 1">
                    <vue-good-table ref="table" :columns="encabColumnasAsigPree" :rows="listaMatriculados" styleClass="vgt-table condensed bordered striped" :lineNumbers="true">
                      <div slot="emptystate">
                        <h5 class="text-danger ml-5">No existen estudiantes matriculados</h5>
                      </div>
                    </vue-good-table>
                    <b-row>
                      <b-col lg="12">
                        <b-button class="small mx-1 mt-3" variant="primary" @click="imprimirConsolidado">Imprimir Consolidado</b-button>
                        <vue-excel-xlsx class="small mx-1 mt-3 btn btn-outline-primary" :data="listaMatriculados" :columns="encabColumnasAsigPree" :file-name="'ConsolidadoNotas-' + new Date().toLocaleDateString()" :file-type="'xlsx'" :sheet-name="'Consolidado'">
                          Exportar Consolidado Evaluaciones a Excel
                        </vue-excel-xlsx>
                      </b-col>
                    </b-row>
                  </div>
                  <div v-else>
                    <vue-good-table ref="table" :columns="encabColumnasAsig" :rows="listaMatriculados" styleClass="vgt-table condensed bordered striped" :lineNumbers="true">
                      <div slot="emptystate">
                        <h5 class="text-danger ml-5">No existen estudiantes matriculados</h5>
                      </div>
                    </vue-good-table>
                    <b-row>
                      <b-col lg="12">
                        <b-button class="small mx-1 mt-3" variant="primary" @click="imprimirConsolidado">Imprimir Consolidado</b-button>
                        <vue-excel-xlsx class="small mx-1 mt-3 btn btn-outline-primary" :data="listaMatriculados" :columns="encabColumnasAsig" :file-name="'ConsolidadoNotas-' + new Date().toLocaleDateString()" :file-type="'xlsx'" :sheet-name="'Consolidado'">
                          Exportar Consolidado Evaluaciones a Excel
                        </vue-excel-xlsx>
                      </b-col>
                    </b-row>
                  </div>
                </div>
              </b-col>
              <!-- **************** CONSOLIDADO ASIGNATURAS RECUPERACIONES ************** -->
              <b-col lg="12" v-if="idInforme == 2">
                <div v-if="btnCargando">
                  <div class="text-center m-5 text-primary">
                    <b-spinner style="width: 3rem; height: 3rem;" label="Spinner"></b-spinner>
                    <br><strong>Cargando planilla...</strong>
                  </div>
                </div>
                <div v-else>
                  <div v-if="idNivel == 1">
                    <vue-good-table ref="table" :columns="encabColumnasAsigPree" :rows="listaMatriculados" styleClass="vgt-table condensed bordered striped" :lineNumbers="true">
                      <div slot="emptystate">
                        <h5 class="text-danger ml-5">No existen estudiantes matriculados</h5>
                      </div>
                    </vue-good-table>
                    <b-row>
                      <b-col lg="12">
                        <b-button class="small mx-1 mt-3" variant="primary" @click="imprimirConsolidado">Imprimir Consolidado</b-button>
                        <vue-excel-xlsx class="small mx-1 mt-3 btn btn-outline-primary" :data="listaMatriculados" :columns="encabColumnasAsigPree" :file-name="'ConsolidadoNotas-' + new Date().toLocaleDateString()" :file-type="'xlsx'" :sheet-name="'Consolidado'">
                          Exportar Consolidado Evaluaciones a Excel
                        </vue-excel-xlsx>
                      </b-col>
                    </b-row>
                  </div>
                  <div v-else>
                    <vue-good-table ref="table" :columns="encabColumnasAsig" :rows="listaMatriculados" styleClass="vgt-table condensed bordered striped" :lineNumbers="true">
                      <div slot="emptystate">
                        <h5 class="text-danger ml-5">No existen estudiantes matriculados</h5>
                      </div>
                    </vue-good-table>
                    <b-row>
                      <b-col lg="12">
                        <b-button class="small mx-1 mt-3" variant="primary" @click="imprimirConsolidado">Imprimir Consolidado</b-button>
                        <vue-excel-xlsx class="small mx-1 mt-3 btn btn-outline-primary" :data="listaMatriculados" :columns="encabColumnasAsig" :file-name="'ConsolidadoNotas-' + new Date().toLocaleDateString()" :file-type="'xlsx'" :sheet-name="'Consolidado'">
                          Exportar Consolidado Evaluaciones a Excel
                        </vue-excel-xlsx>
                      </b-col>
                    </b-row>
                  </div>
                </div>
              </b-col>
              <!-- **************** CONSOLIDADO ASIGNATURAS ACUMULADO ************** -->
              <b-col lg="12" v-if="idInforme == 3">
                <div v-if="btnCargando">
                  <div class="text-center m-5 text-primary">
                    <b-spinner style="width: 3rem; height: 3rem;" label="Spinner"></b-spinner>
                    <br><strong>Cargando planilla...</strong>
                  </div>
                </div>
                <div v-else>
                  <div v-if="idNivel == 1">
                    <vue-good-table ref="table" :columns="encabColumnasAsigPree" :rows="listaMatriculados" styleClass="vgt-table condensed bordered striped" :lineNumbers="true">
                      <div slot="emptystate">
                        <h5 class="text-danger ml-5">No existen estudiantes matriculados</h5>
                      </div>
                    </vue-good-table>
                    <b-row>
                      <b-col lg="12">
                        <b-button class="small mx-1 mt-3" variant="primary" @click="imprimirConsolidado">Imprimir Consolidado</b-button>
                        <vue-excel-xlsx class="small mx-1 mt-3 btn btn-outline-primary" :data="listaMatriculados" :columns="encabColumnasAsigPree" :file-name="'ConsolidadoNotas-' + new Date().toLocaleDateString()" :file-type="'xlsx'" :sheet-name="'Consolidado'">
                          Exportar Consolidado Evaluaciones a Excel
                        </vue-excel-xlsx>
                      </b-col>
                    </b-row>
                  </div>
                  <div v-else>
                    <vue-good-table ref="table" :columns="encabColumnasAsig" :rows="listaMatriculados" styleClass="vgt-table condensed bordered striped" :lineNumbers="true">
                      <div slot="emptystate">
                        <h5 class="text-danger ml-5">No existen estudiantes matriculados</h5>
                      </div>
                    </vue-good-table>
                    <b-row>
                      <b-col lg="12">
                        <b-button class="small mx-1 mt-3" variant="primary" @click="imprimirConsolidado">Imprimir Consolidado</b-button>
                        <vue-excel-xlsx class="small mx-1 mt-3 btn btn-outline-primary" :data="listaMatriculados" :columns="encabColumnasAsig" :file-name="'ConsolidadoNotas-' + new Date().toLocaleDateString()" :file-type="'xlsx'" :sheet-name="'Consolidado'">
                          Exportar Consolidado Evaluaciones a Excel
                        </vue-excel-xlsx>
                      </b-col>
                    </b-row>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Informes consolidados de evaluaciones por curso.</em>
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
    name: 'consolidadosnotas',
    components: {
      VueGoodTable
    },
    data () {
      return {
        idInforme: null,
        comboInformes: [
          { 'value': 1, 'text': 'CONSOLIDADO DE EVALUACIONES POR ASIGNATURA - POR PERIODO'},
          { 'value': 2, 'text': 'CONSOLIDADO DE EVALUACIONES POR ASIGNATURA - POR PERIODO CON RECUPERACIONES'},
          { 'value': 3, 'text': 'CONSOLIDADO DE EVALUACIONES POR ASIGNATURA - ACUMULADO'},
          { 'value': 4, 'text': 'CONSOLIDADO DE EVALUACIONES POR AREA'},
        ],
        comboSedes: [],
        idSede: null,
        comboCursosSede: [],
        idCurso: null,
        listaMatriculados: [],
        encabColumnasAsig: [],
        encabColumnasAsigPree: [],
        encabColumnasAreas: [],
        listaAsignaturasCurso: [],
        idPeriodo: 1,
        comboPeriodos: [],
        nombreSede: null,
        nombreCurso: null,
        btnCargando: true,
        idNivel: null,
        datosOriginales: []
      }
    },
    methods: {
      imprimirConsolidado() {
        // Crear una nueva ventana para imprimir
        const printWindow = window.open("Consolidados", "_blank");
        // Obtener el contenido HTML de la tabla
        const tableHtml = this.$refs.table.$el.querySelector("table").outerHTML;
        let fecha = 'Fecha: ' + new Date().toLocaleString()
        let tituloInforme = ''
        if (this.idInforme == 1) {
          tituloInforme = 'CONSOLIDADO DE EVALUACIONES POR ASIGNATURA - POR PERIODO'
        } else if (this.idInforme == 2) {
          tituloInforme = 'CONSOLIDADO DE EVALUACIONES POR ASIGNATURA - POR PERIODO CON RECUPERACIONES'
        } else if (this.idInforme == 3) {
          tituloInforme = 'CONSOLIDADO DE EVALUACIONES POR ASIGNATURA - ACUMULADO'
        } else if (this.idInforme == 4) {
          tituloInforme = 'CONSOLIDADO DE EVALUACIONES POR AREA'
        } else {
          tituloInforme = '-'
        }
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
              <p style="text-align: center; font-size: 10px;">SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA<br><b>${this.$store.state.nombreInstitucion}</b><br>TUNJA - BOYACÁ<br>${tituloInforme}<br>Sede: ${this.nombreSede} | Curso: ${this.nombreCurso} | Año Lectivo ${this.$store.state.aLectivo} | Periodo: ${this.idPeriodo}</p>
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
          this.consultarConsolidadoAsignaturasRecup()
        } else if (this.idInforme == 3) {
          this.consultarConsolidadoAsignaturasAcum()
        } else if (this.idInforme == 4) {
          this.consultarConsolidadoAreas()
        }
      },
      async consultarConsolidadoAreas() {
      },
      async consultarConsolidadoAsignaturas() {
        this.btnCargando = true
        this.nombreSede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
        if (this.idCurso != null) { 
          this.nombreCurso = document.getElementById('cursos')[document.getElementById('cursos').selectedIndex].text
          this.listaAsignaturasCurso = []
          this.$store.state.datosCursos.forEach(element => {
            if (element.id == this.idCurso) {
              this.idNivel = element.id_nivel
            }
          })
          if (this.idNivel == 1) {
            this.datosOriginales = []
            await axios
            .get(CONFIG.ROOT_PATH + 'resumenes/consolidado/periodo', {params: {idCurso: this.idCurso, periodo: this.idPeriodo}})
            .then(response => {
              if (response.data.error){
                this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consolidado Asignaturas Periodo Pree')
              } else{
                if (response.data.datos != 0) {
                  this.datosOriginales = response.data.datos
                  this.encabColumnasAsigPree = this.columnasAsigPree
                  this.listaMatriculados = this.pivotedRowsAsigPree
                }
              }
            })
            .catch(err => {
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consolidado Asignaturas Periodo Pree. Intente más tarde.' + err)
            })
          } else {
            this.datosOriginales = []
            await axios
            .get(CONFIG.ROOT_PATH + 'resumenes/consolidado/periodo', {params: {idCurso: this.idCurso, periodo: this.idPeriodo}})
            .then(response => {
              if (response.data.error){
                this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consolidado Asignaturas Periodo')
              } else{
                if (response.data.datos != 0) {
                  this.datosOriginales = response.data.datos
                  this.encabColumnasAsig = this.columnasAsig
                  this.listaMatriculados = this.pivotedRowsAsig
                }
              }
            })
            .catch(err => {
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consolidado Asignaturas Periodo. Intente más tarde.' + err)
            })
          }
        }
        this.btnCargando = false
      },
      async consultarConsolidadoAsignaturasRecup() {
        this.btnCargando = true
        this.nombreSede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
        if (this.idCurso != null) { 
          this.nombreCurso = document.getElementById('cursos')[document.getElementById('cursos').selectedIndex].text
          this.listaAsignaturasCurso = []
          this.$store.state.datosCursos.forEach(element => {
            if (element.id == this.idCurso) {
              this.idNivel = element.id_nivel
            }
          })
          if (this.idNivel == 1) {
            this.datosOriginales = []
            await axios
            .get(CONFIG.ROOT_PATH + 'resumenes/consolidado/periodo', {params: {idCurso: this.idCurso, periodo: this.idPeriodo}})
            .then(response => {
              if (response.data.error){
                this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consolidado Asignaturas Periodo Pree')
              } else{
                if (response.data.datos != 0) {
                  this.datosOriginales = response.data.datos
                  this.encabColumnasAsigPree = this.columnasAsigPree
                  this.listaMatriculados = this.pivotedRowsAsigPree
                }
              }
            })
            .catch(err => {
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consolidado Asignaturas Periodo Pree. Intente más tarde.' + err)
            })
          } else {
            this.datosOriginales = []
            await axios
            .get(CONFIG.ROOT_PATH + 'resumenes/consolidado/periodo', {params: {idCurso: this.idCurso, periodo: this.idPeriodo}})
            .then(response => {
              if (response.data.error){
                this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consolidado Asignaturas Periodo')
              } else{
                if (response.data.datos != 0) {
                  this.datosOriginales = response.data.datos
                  this.encabColumnasAsig = this.columnasAsig
                  this.listaMatriculados = this.pivotedRowsAsigRecup
                }
              }
            })
            .catch(err => {
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consolidado Asignaturas Periodo. Intente más tarde.' + err)
            })
          }
        }
        this.btnCargando = false
      },
      async consultarConsolidadoAsignaturasAcum() {
        this.btnCargando = true
        this.nombreSede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
        if (this.idCurso != null) { 
          this.nombreCurso = document.getElementById('cursos')[document.getElementById('cursos').selectedIndex].text
          this.listaAsignaturasCurso = []
          this.$store.state.datosCursos.forEach(element => {
            if (element.id == this.idCurso) {
              this.idNivel = element.id_nivel
            }
          })
          if (this.idNivel == 1) {
            this.datosOriginales = []
            await axios
            .get(CONFIG.ROOT_PATH + 'resumenes/consolidado/periodo/acumulado', {params: {idCurso: this.idCurso, periodo: this.idPeriodo}})
            .then(response => {
              if (response.data.error){
                this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consolidado Asignaturas Periodo Pree')
              } else{
                if (response.data.datos != 0) {
                  this.datosOriginales = response.data.datos
                  this.encabColumnasAsigPree = this.columnasAsigPree
                  this.listaMatriculados = this.pivotedRowsAsigPreeAcumulado
                }
              }
            })
            .catch(err => {
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consolidado Asignaturas Periodo Pree. Intente más tarde.' + err)
            })
          } else {
            this.datosOriginales = []
            await axios
            .get(CONFIG.ROOT_PATH + 'resumenes/consolidado/periodo/acumulado', {params: {idCurso: this.idCurso, periodo: this.idPeriodo}})
            .then(response => {
              if (response.data.error){
                this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consolidado Asignaturas Periodo')
              } else{
                if (response.data.datos != 0) {
                  this.datosOriginales = response.data.datos
                  this.encabColumnasAsig = this.columnasAsig
                  this.listaMatriculados = this.pivotedRowsAsigAcumulado
                }
              }
            })
            .catch(err => {
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consolidado Asignaturas Periodo. Intente más tarde.' + err)
            })
          }
        }
        this.btnCargando = false
      },
      pivotPorEstudianteAsigPree(data) {
        //console.log(JSON.stringify(data))
        const estudiantes = {}
        const totales = {}
        totales['TOTALES'] = { estudiante: 'TOTALES' }
        totales['TOTALES']['auJ'] = 0
        totales['TOTALES']['auS'] = 0
        let auJ,auS = 0
        data.forEach(row => {
          const nombre = row.estudiante
          if (!estudiantes[nombre]) {
            auJ = auS = 0
            estudiantes[nombre] = { estudiante: nombre }
          }
          if (row.orden == 99) {
            estudiantes[nombre][row.asignatura] = row.definitivacompor != 0 ? row.definitivacompor : null // Definitiva Comportamiento
          } else {
            estudiantes[nombre][row.asignatura] = row.definitivapree != 0 ? row.definitivapree : null // Definitiva Pree
          }
          if (row.definitivapree != 0) {
            auJ += row.ausJ
            totales['TOTALES']['auJ'] += row.ausJ
            auS += row.ausS
            totales['TOTALES']['auS'] += row.ausS
          }
          estudiantes[nombre]['auJ'] = auJ
          estudiantes[nombre]['auS'] = auS
        })
        estudiantes['TOTALES'] = totales['TOTALES']
        return Object.values(estudiantes)
      },
      pivotPorEstudianteAsigPreeAcumulado(data) {
        //console.log(JSON.stringify(data))
        const estudiantes = {}
        const totales = {}
        totales['TOTALES'] = { estudiante: 'TOTALES' }
        totales['TOTALES']['auJ'] = 0
        totales['TOTALES']['auS'] = 0
        let auJ,auS = 0
        data.forEach(row => {
          const nombre = row.estudiante
          if (!estudiantes[nombre]) {
            auJ = auS = 0
            estudiantes[nombre] = { estudiante: nombre }
          }
          if (row.orden == 99) {
            estudiantes[nombre][row.asignatura] = row.historial_compor != 0 ? row.historial_compor : null // Definitiva Comportamiento
          } else {
            estudiantes[nombre][row.asignatura] = row.historial_pree != 0 ? row.historial_pree : null // Definitiva Pree
          }
          if (row.definitivapree != 0) {
            auJ += row.ausJ
            totales['TOTALES']['auJ'] += row.ausJ
            auS += row.ausS
            totales['TOTALES']['auS'] += row.ausS
          }
          estudiantes[nombre]['auJ'] = auJ
          estudiantes[nombre]['auS'] = auS
        })
        estudiantes['TOTALES'] = totales['TOTALES']
        return Object.values(estudiantes)
      },
      pivotPorEstudianteAsig(data) {
        //console.log(JSON.stringify(data))
        const estudiantes = {}
        const totales = {}
        totales['TOTALES'] = { estudiante: 'TOTALES' }
        totales['TOTALES']['promedio'] = ''
        totales['TOTALES']['bajos'] = 0
        totales['TOTALES']['basicos'] = 0
        totales['TOTALES']['altos'] = 0
        totales['TOTALES']['superiores'] = 0
        totales['TOTALES']['auJ'] = 0
        totales['TOTALES']['auS'] = 0
        let bajos,basicos,altos,superiores,promedio,cont,suma,auJ,auS = 0
        data.forEach(row => {
          const nombre = row.estudiante
          if (!estudiantes[nombre]) {
            bajos = basicos = altos = superiores = promedio = cont = suma = auJ = auS = 0
            estudiantes[nombre] = { estudiante: nombre }
          }
          if (row.orden == 99) {
            estudiantes[nombre][row.asignatura] = row.definitivacompor != 0 ? row.definitivacompor : null // Definitiva Comportamiento
          } else {
            estudiantes[nombre][row.asignatura] = row.definitiva > 0 ? row.definitiva.toFixed(1) : null // Final sin recuperaciones
          }
          let minBaj,maxBaj,minBas,maxBas,minAlt,maxAlt,minSup,maxSup = 0     
          if (row.id_tipo == 2) {
            minBaj = this.$store.state.datosSecciones[0].minBajT
            maxBaj = this.$store.state.datosSecciones[0].maxBajT
            minBas = this.$store.state.datosSecciones[0].minBasT
            maxBas = this.$store.state.datosSecciones[0].maxBasT
            minAlt = this.$store.state.datosSecciones[0].minAltT
            maxAlt = this.$store.state.datosSecciones[0].maxAltT
            minSup = this.$store.state.datosSecciones[0].minSupT
            maxSup = this.$store.state.datosSecciones[0].maxSupT
          } else {
            minBaj = this.$store.state.datosSecciones[0].minBaj
            maxBaj = this.$store.state.datosSecciones[0].maxBaj
            minBas = this.$store.state.datosSecciones[0].minBas
            maxBas = this.$store.state.datosSecciones[0].maxBas
            minAlt = this.$store.state.datosSecciones[0].minAlt
            maxAlt = this.$store.state.datosSecciones[0].maxAlt
            minSup = this.$store.state.datosSecciones[0].minSup
            maxSup = this.$store.state.datosSecciones[0].maxSup
          }
          if (totales['TOTALES'][row.asignatura] === undefined) {
            totales['TOTALES'][row.asignatura] = 0
          }
          if (row.definitiva > 0 && row.definitiva < minBas) {
            bajos++
            totales['TOTALES']['bajos']++
            totales['TOTALES'][row.asignatura]++
          } else if (row.definitiva >= minBas && row.definitiva < minAlt) {
            basicos++
            totales['TOTALES']['basicos']++
          } else if (row.definitiva >= minAlt && row.definitiva < minSup) {
            altos++
            totales['TOTALES']['altos']++
          } else if (row.definitiva >= minSup && row.definitiva <= maxSup) {
            superiores++
            totales['TOTALES']['superiores']++
          }
          if (row.definitiva > 0) {
            cont++
            suma += row.definitiva
            auJ += row.ausJ
            totales['TOTALES']['auJ'] += row.ausJ
            auS += row.ausS
            totales['TOTALES']['auS'] += row.ausS
          }
          promedio = cont ? this.redondear(suma / cont).toFixed(1) : null
          estudiantes[nombre]['promedio'] = promedio
          estudiantes[nombre]['bajos'] = bajos
          estudiantes[nombre]['basicos'] = basicos
          estudiantes[nombre]['altos'] = altos
          estudiantes[nombre]['superiores'] = superiores
          estudiantes[nombre]['auJ'] = auJ
          estudiantes[nombre]['auS'] = auS
        })
        estudiantes['TOTALES'] = totales['TOTALES']
        return Object.values(estudiantes)
      },
      pivotPorEstudianteAsigRecup(data) {
        //console.log(JSON.stringify(data))
        const estudiantes = {}
        const totales = {}
        totales['TOTALES'] = { estudiante: 'TOTALES' }
        totales['TOTALES']['promedio'] = ''
        totales['TOTALES']['bajos'] = 0
        totales['TOTALES']['basicos'] = 0
        totales['TOTALES']['altos'] = 0
        totales['TOTALES']['superiores'] = 0
        totales['TOTALES']['auJ'] = 0
        totales['TOTALES']['auS'] = 0
        let bajos,basicos,altos,superiores,promedio,cont,suma,auJ,auS = 0
        data.forEach(row => {
          const nombre = row.estudiante
          if (!estudiantes[nombre]) {
            bajos = basicos = altos = superiores = promedio = cont = suma = auJ = auS = 0
            estudiantes[nombre] = { estudiante: nombre }
          }
          if (row.orden == 99) {
            estudiantes[nombre][row.asignatura] = row.definitivacompor != 0 ? row.definitivacompor : null // Definitiva Comportamiento
          } else {
            estudiantes[nombre][row.asignatura] = row.final > 0 ? row.final.toFixed(1) : null // Final con recuperaciones
          }
          let minBaj,maxBaj,minBas,maxBas,minAlt,maxAlt,minSup,maxSup = 0     
          if (row.id_tipo == 2) {
            minBaj = this.$store.state.datosSecciones[0].minBajT
            maxBaj = this.$store.state.datosSecciones[0].maxBajT
            minBas = this.$store.state.datosSecciones[0].minBasT
            maxBas = this.$store.state.datosSecciones[0].maxBasT
            minAlt = this.$store.state.datosSecciones[0].minAltT
            maxAlt = this.$store.state.datosSecciones[0].maxAltT
            minSup = this.$store.state.datosSecciones[0].minSupT
            maxSup = this.$store.state.datosSecciones[0].maxSupT
          } else {
            minBaj = this.$store.state.datosSecciones[0].minBaj
            maxBaj = this.$store.state.datosSecciones[0].maxBaj
            minBas = this.$store.state.datosSecciones[0].minBas
            maxBas = this.$store.state.datosSecciones[0].maxBas
            minAlt = this.$store.state.datosSecciones[0].minAlt
            maxAlt = this.$store.state.datosSecciones[0].maxAlt
            minSup = this.$store.state.datosSecciones[0].minSup
            maxSup = this.$store.state.datosSecciones[0].maxSup
          }
          if (totales['TOTALES'][row.asignatura] === undefined) {
            totales['TOTALES'][row.asignatura] = 0
          }
          if (row.final > 0 && row.final < minBas) {
            bajos++
            totales['TOTALES']['bajos']++
            totales['TOTALES'][row.asignatura]++
          } else if (row.final >= minBas && row.final < minAlt) {
            basicos++
            totales['TOTALES']['basicos']++
          } else if (row.final >= minAlt && row.final < minSup) {
            altos++
            totales['TOTALES']['altos']++
          } else if (row.final >= minSup && row.final <= maxSup) {
            superiores++
            totales['TOTALES']['superiores']++
          }
          if (row.final > 0) {
            cont++
            suma += row.final
            auJ += row.ausJ
            totales['TOTALES']['auJ'] += row.ausJ
            auS += row.ausS
            totales['TOTALES']['auS'] += row.ausS
          }
          promedio = cont ? this.redondear(suma / cont).toFixed(1) : null
          estudiantes[nombre]['promedio'] = promedio
          estudiantes[nombre]['bajos'] = bajos
          estudiantes[nombre]['basicos'] = basicos
          estudiantes[nombre]['altos'] = altos
          estudiantes[nombre]['superiores'] = superiores
          estudiantes[nombre]['auJ'] = auJ
          estudiantes[nombre]['auS'] = auS
        })
        estudiantes['TOTALES'] = totales['TOTALES']
        return Object.values(estudiantes)
      },
      pivotPorEstudianteAsigAcumulado(data) {
        //console.log(JSON.stringify(data))
        const estudiantes = {}
        const totales = {}
        totales['TOTALES'] = { estudiante: 'TOTALES' }
        totales['TOTALES']['promedio'] = ''
        totales['TOTALES']['bajos'] = 0
        totales['TOTALES']['basicos'] = 0
        totales['TOTALES']['altos'] = 0
        totales['TOTALES']['superiores'] = 0
        totales['TOTALES']['auJ'] = 0
        totales['TOTALES']['auS'] = 0
        let bajos,basicos,altos,superiores,promedio,cont,suma,auJ,auS = 0
        data.forEach(row => {
          const nombre = row.estudiante
          if (!estudiantes[nombre]) {
            bajos = basicos = altos = superiores = promedio = cont = suma = auJ = auS = 0
            estudiantes[nombre] = { estudiante: nombre }
          }
          if (estudiantes[nombre][row.asignatura] === undefined) {
            estudiantes[nombre][row.asignatura] = '|'
          }
          if (row.orden == 99) {
            estudiantes[nombre][row.asignatura] = row.historial_compor != 0 ? row.historial_compor : null // Definitiva Comportamiento
          } else {
            estudiantes[nombre][row.asignatura] = row.historial + '=' + (row.ponderado > 0 ? row.ponderado.toFixed(1) : '0.0') // Final con recuperaciones
          }
          let minBaj,maxBaj,minBas,maxBas,minAlt,maxAlt,minSup,maxSup = 0     
          if (row.id_tipo == 2) {
            minBaj = this.$store.state.datosSecciones[0].minBajT
            maxBaj = this.$store.state.datosSecciones[0].maxBajT
            minBas = this.$store.state.datosSecciones[0].minBasT
            maxBas = this.$store.state.datosSecciones[0].maxBasT
            minAlt = this.$store.state.datosSecciones[0].minAltT
            maxAlt = this.$store.state.datosSecciones[0].maxAltT
            minSup = this.$store.state.datosSecciones[0].minSupT
            maxSup = this.$store.state.datosSecciones[0].maxSupT
          } else {
            minBaj = this.$store.state.datosSecciones[0].minBaj
            maxBaj = this.$store.state.datosSecciones[0].maxBaj
            minBas = this.$store.state.datosSecciones[0].minBas
            maxBas = this.$store.state.datosSecciones[0].maxBas
            minAlt = this.$store.state.datosSecciones[0].minAlt
            maxAlt = this.$store.state.datosSecciones[0].maxAlt
            minSup = this.$store.state.datosSecciones[0].minSup
            maxSup = this.$store.state.datosSecciones[0].maxSup
          }
          if (totales['TOTALES'][row.asignatura] === undefined) {
            totales['TOTALES'][row.asignatura] = 0
          }
          if (row.ponderado > 0 && row.ponderado < minBas) {
            bajos++
            totales['TOTALES']['bajos']++
            totales['TOTALES'][row.asignatura]++
          } else if (row.ponderado >= minBas && row.ponderado < minAlt) {
            basicos++
            totales['TOTALES']['basicos']++
          } else if (row.ponderado >= minAlt && row.ponderado < minSup) {
            altos++
            totales['TOTALES']['altos']++
          } else if (row.ponderado >= minSup && row.ponderado <= maxSup) {
            superiores++
            totales['TOTALES']['superiores']++
          }
          if (row.ponderado > 0) {
            cont++
            suma += row.ponderado
            auJ += row.ausJ
            totales['TOTALES']['auJ'] += row.ausJ
            auS += row.ausS
            totales['TOTALES']['auS'] += row.ausS
          }
          promedio = cont ? this.redondear(suma / cont).toFixed(1) : null
          estudiantes[nombre]['promedio'] = promedio
          estudiantes[nombre]['bajos'] = bajos
          estudiantes[nombre]['basicos'] = basicos
          estudiantes[nombre]['altos'] = altos
          estudiantes[nombre]['superiores'] = superiores
          estudiantes[nombre]['auJ'] = auJ
          estudiantes[nombre]['auS'] = auS
        })
        estudiantes['TOTALES'] = totales['TOTALES']
        return Object.values(estudiantes)
      },
      generarColumnasDesdeAsignaturasPree(data) {
        const asignaturas = [...new Set(data.map(item => item.asignatura))];
        return [
          { label: 'Estudiante', field: 'estudiante', sortable: false },
          ...asignaturas.map(a => ({
            label: a,
            field: a,
            type: 'number',
            sortable: false
          })),
          { label: 'AJ', field: 'auJ', type: 'number', sortable: false },
          { label: 'AS', field: 'auS', type: 'number', sortable: false },
        ];
      },
      generarColumnasDesdeAsignaturas(data) {
        const asignaturas = [...new Set(data.map(item => item.asignatura))];
        return [
          { label: 'Estudiante', field: 'estudiante', sortable: false },
          ...asignaturas.map(a => ({
            label: a,
            field: a,
            type: 'number',
            sortable: false
          })),
          { label: 'Prom', field: 'promedio', type: 'number', sortable: false },
          { label: 'Baj', field: 'bajos', type: 'number', sortable: false },
          { label: 'Bas', field: 'basicos', type: 'number', sortable: false },
          { label: 'Alt', field: 'altos', type: 'number', sortable: false },
          { label: 'Sup', field: 'superiores', type: 'number', sortable: false },
          { label: 'AJ', field: 'auJ', type: 'number', sortable: false },
          { label: 'AS', field: 'auS', type: 'number', sortable: false },
        ];
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
      pivotedRowsAsig() {
        return this.pivotPorEstudianteAsig(this.datosOriginales)
      },
      pivotedRowsAsigRecup() {
        return this.pivotPorEstudianteAsigRecup(this.datosOriginales)
      },
      pivotedRowsAsigAcumulado() {
        return this.pivotPorEstudianteAsigAcumulado(this.datosOriginales)
      },
      pivotedRowsAsigPree() {
        return this.pivotPorEstudianteAsigPree(this.datosOriginales)
      },
      pivotedRowsAsigPreeAcumulado() {
        return this.pivotPorEstudianteAsigPreeAcumulado(this.datosOriginales)
      },
      columnasAsig() {
        return this.generarColumnasDesdeAsignaturas(this.datosOriginales)
      },
      columnasAsigPree() {
        return this.generarColumnasDesdeAsignaturasPree(this.datosOriginales)
      },
    },
    beforeMount() {
      this.ocuparComboPeriodos()
      this.ocuparComboSedes()
      //console.log(JSON.stringify(this.$store.state.datosSecciones))
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
