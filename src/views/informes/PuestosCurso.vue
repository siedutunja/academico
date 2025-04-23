<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> PUESTOS DE ESTUDIANTES POR CURSO Y PERIODO</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="2">
                <b-form-group label="Periodo:" label-for="periodo" class="etiqueta">
                  <b-form-select id="periodo" ref="periodo" v-model="idPeriodo" :options="comboPeriodos" @change="idCurso=null,idSede=null"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idCurso=null,ocuparComboCursosSede()" :disabled="idPeriodo!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="Seleccione el Curso:" label-for="cursos" class="etiqueta">
                  <b-form-select id="cursos" ref="cursos" v-model="idCurso" :options="comboCursosSede" @change="consultarPuestos()" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mt-2" v-if="idCurso!=null">
              <b-col lg="12"><hr></b-col>
              <!-- **************** LISTA CURSO ************** -->
              <b-col lg="12">
                <div v-if="btnCargando">
                  <div class="text-center m-5 text-primary">
                    <b-spinner style="width: 3rem; height: 3rem;" label="Spinner"></b-spinner>
                    <br><strong>Cargando planilla...</strong>
                  </div>
                </div>
                <div v-else>
                  <vue-good-table ref="table" :columns="encabColumnas" :rows="listaEstudiantesCurso" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                    <div slot="emptystate">
                      <h5 class="text-danger ml-5">No existen estudiantes matriculados</h5>
                    </div>
                  </vue-good-table>
                  <b-row>
                    <b-col lg="12">
                      <b-button class="small mx-1 mt-3" variant="primary" @click="imprimirConsolidado">Imprimir Informe</b-button>
                      <vue-excel-xlsx class="small mx-1 mt-3 btn btn-outline-primary" :data="listaEstudiantesCurso" :columns="encabColumnas" :file-name="'PuestosCurso-' + new Date().toLocaleDateString()" :file-type="'xlsx'" :sheet-name="'PuestosCurso'">
                        Exportar Informe a Excel
                      </vue-excel-xlsx>
                    </b-col>
                  </b-row>
                </div>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Lista de estudiantes por puesto en el curso y por periodo.</em>
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
    name: 'puestoscurso',
    components: {
      VueGoodTable
    },
    data () {
      return {
        comboSedes: [],
        idSede: null,
        comboCursosSede: [],
        idCurso: null,
        comboPeriodos: [],
        idPeriodo: null,
        listaEstudiantesCurso: [],
        encabColumnas: [
          { label: 'Apellidos y Nombres del Estudiante', field: 'estudiante', sortable: false },
          { label: 'Promedio General', field: 'promedio', sortable: false, tdClass: this.tdClassFuncE },
        ],
        btnCargando: false,
        nombreSede: null,
        nombreCurso: null,
        nombrePeriodo: null,
        jornada: null,
        director: null,
        idNivel: null,
        puesto: '',
        listaPuestos: []
      }
    },
    methods: {
      imprimirConsolidado() {
        this.nombreSede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
        this.nombreCurso = document.getElementById('cursos')[document.getElementById('cursos').selectedIndex].text
        this.nombrePeriodo = document.getElementById('periodo')[document.getElementById('periodo').selectedIndex].text
        // Crear una nueva ventana para imprimir
        const printWindow = window.open("Puestos", "_blank");
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
              <title>Puestos</title>
              ${style}
            </head>
            <body>
              <p style="text-align: center; font-size: 12px;">SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA<br><b>${this.$store.state.nombreInstitucion}</b><br>TUNJA - BOYACÁ<br>PUESTOS DE ESTUDIANTES POR CURSO Y PERIODO - AÑO LECTIVO ${this.$store.state.aLectivo}<br>Sede: ${this.nombreSede} | Curso: ${this.nombreCurso} | Periodo: ${this.nombrePeriodo}</p>
              ${tableHtml}
              <div style="text-align: right;"><i>${fecha}</i></div>
            </body>
          </html>
        `);

        // Iniciar la impresión y cerrar la ventana
        //printWindow.document.close();
        printWindow.print();
      },
      async consultarPuestos() {
        this.btnCargando = true
        this.$store.state.datosCursos.forEach(element => {
          if (element.id == this.idCurso) {
            this.idNivel = element.id_nivel
          }
        })
        this.listaAreasAsignaturasCurso = []
        this.listaEstudiantesCurso = []
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
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista asignaturas curso. Intente más tarde.' + err)
          this.btnCargando = false
        })
        if (this.idNivel == 1) {
          this.listaMatriculados = []
          this.listaPuestos = []
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
                          if (isNaN(element.notas[indice].definitiva) || element.notas[indice].definitiva === null || element.notas[indice].definitiva < 0 || element.notas[indice].definitiva > this.$store.state.datosSecciones[0].maxSup) {
                            datosEstudiante[elementAs.nemo] = ''
                          } else {
                            if (element.notas[indice].recuperacion > element.notas[indice].definitiva) {
                              element.notas[indice].definitiva = element.notas[indice].recuperacion
                              datosEstudiante[elementAs.nemo] = '[' + Number(element.notas[indice].recuperacion).toFixed(1) + ']'
                            } else {
                              datosEstudiante[elementAs.nemo] = Number(element.notas[indice].definitiva).toFixed(1)
                            }
                            sumaPromArea += (element.notas[indice].definitiva * elementAs.porcentaje) / 100
                            sumaAsignaturas += element.notas[indice].definitiva
                            contAsignaturas++
                          }
                        }
                      })
                      datosEstudiante[elementAr.nemoArea] = this.redondear(sumaPromArea).toFixed(1)
                    } else {
                      let indice = element.notas.findIndex(nota => nota.id_area === elementAr.idArea)
                      if (indice >= 0) {
                        if (element.notas[indice].orden == 99) {
                          if ( this.$store.state.datosSecciones[0].tipoValComp == 0) {
                            datosEstudiante[elementAr.nemoArea] = element.notas[indice].definitivacompor
                          } else {
                            if (isNaN(element.notas[indice].definitiva) || element.notas[indice].definitiva === null || element.notas[indice].definitiva < 0 || element.notas[indice].definitiva > this.$store.state.datosSecciones[0].maxSup) {
                              datosEstudiante[elementAr.nemoArea] = ''
                            } else {
                              datosEstudiante[elementAr.nemoArea] = Number(element.notas[indice].definitiva).toFixed(1)
                            }
                          }
                        } else {
                          if (isNaN(element.notas[indice].definitiva) || element.notas[indice].definitiva === null || element.notas[indice].definitiva < 0 || element.notas[indice].definitiva > this.$store.state.datosSecciones[0].maxSup) {
                            datosEstudiante[elementAr.nemoArea] = ''
                          } else {
                            if (element.notas[indice].recuperacion > element.notas[indice].definitiva) {
                              element.notas[indice].definitiva = element.notas[indice].recuperacion
                            }
                            sumaAsignaturas += element.notas[indice].definitiva
                            contAsignaturas++
                          }
                        }
                      }
                    }
                  })
                  /*
                  if (contAsignaturas > 0) {
                    datosEstudiante.promedioAsignatura = Number(sumaAsignaturas / contAsignaturas).toFixed(1)
                    this.listaPuestos.push({'id': element.id, 'promedio': sumaAsignaturas / contAsignaturas})
                  } else {
                    datosEstudiante.promedioAsignatura = Number(0).toFixed(1)
                    this.listaPuestos.push({'id': element.id, 'promedio': 0})
                  }
                  */
                  datosEstudiante.promedioAsignatura = ''
                  this.listaMatriculados.push(JSON.parse(JSON.stringify(datosEstudiante)))
                  //console.log(JSON.stringify(datosEstudiante))
                  numOrden++
                })
                this.listaPuestos.sort(((a, b) => b.promedio - a.promedio))
                //console.log(JSON.stringify(this.listaPuestos))
                this.consultaListaCurso()
              } else {
                this.btnCargando = false
              }
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: consolidado areas curso. Intente más tarde.' + err)
            this.btnCargando = false
          })
        } else {
          await axios
          .get(CONFIG.ROOT_PATH + 'academico/estudiantes/curso/consolidadoasignaturas', {params: {idCurso: this.idCurso, periodo: this.idPeriodo}})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - consolidado asignaturas curso')
              this.btnCargando = false
            } else{
              if (response.data.datos != 0) {
                response.data.datos.forEach(element => {         
                  let contAsignaturas = 0
                  let sumaAsignaturas = 0
                  let datosEstudiante = {}
                  datosEstudiante.estudiante = element.estudiante
                  datosEstudiante.id = element.id
                  this.listaAreasAsignaturasCurso.forEach(elementAr => {
                    if ((elementAr.asignaturas).length > 1) {
                      elementAr.asignaturas.forEach(elementAs => {
                        let indice = element.notas.findIndex(nota => nota.id_asignatura_curso === elementAs.idAsignaturaCurso)
                        if (indice >= 0) {
                          if (isNaN(element.notas[indice].definitiva) || element.notas[indice].definitiva === null || element.notas[indice].definitiva <= 0 || element.notas[indice].definitiva > this.$store.state.datosSecciones[0].maxSup) {
                            
                          } else {
                            if (element.notas[indice].recuperacion > element.notas[indice].definitiva) {
                              element.notas[indice].definitiva = element.notas[indice].recuperacion
                            }
                            sumaAsignaturas += element.notas[indice].definitiva
                            contAsignaturas++
                          }
                        }
                      })
                    } else {
                      let indice = element.notas.findIndex(nota => nota.id_area === elementAr.idArea)
                      if (indice >= 0) {
                        if (element.notas[indice].orden == 99) {
                        } else {
                          if (isNaN(element.notas[indice].definitiva) || element.notas[indice].definitiva === null || element.notas[indice].definitiva <= 0 || element.notas[indice].definitiva > this.$store.state.datosSecciones[0].maxSup) {
                          } else {
                            if (element.notas[indice].recuperacion > element.notas[indice].definitiva) {
                              element.notas[indice].definitiva = element.notas[indice].recuperacion
                            }
                            sumaAsignaturas += element.notas[indice].definitiva
                            contAsignaturas++
                          }
                        }
                      }
                    }
                  })
                  if (contAsignaturas > 0) {
                    datosEstudiante.promedio = (sumaAsignaturas / contAsignaturas).toFixed(3)
                  } else {
                    datosEstudiante.promedio = 0
                  }
                  this.listaEstudiantesCurso.push(JSON.parse(JSON.stringify(datosEstudiante)))
                })
                this.listaEstudiantesCurso.sort(((a, b) => b.promedio - a.promedio))
                //console.log(JSON.stringify(this.listaEstudiantesCurso))
                //this.consultaListaCurso()
                this.btnCargando = false
              } else {
                this.btnCargando = false
              }
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: consolidado areas curso. Intente más tarde.' + err)
            this.btnCargando = false
          })
        }
      },      
      async consultaListaCurso() { // para eliminar esta función
        this.btnCargando = true
        //this.consultarPuestos()
        this.$store.state.datosCursos.forEach(element => {
          if (element.id == this.idCurso) {
            this.jornada = element.jornada
            this.director = element.docente
            this.idNivel = element.id_nivel
            //console.log(element)
          }
        })
        this.listaEstudiantesCurso = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/listacurso/reportes', { params: { idCurso: this.idCurso }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Lista Curso')
            this.btnCargando = false
          } else{
            if (response.data.datos != 0) {
              this.listaEstudiantesCurso = response.data.datos
              let numPuesto = 1
              //console.log(JSON.stringify(this.listaPuestos))
              this.listaPuestos.forEach(element2 => {
                this.listaEstudiantesCurso.forEach(element => {
                  if (element.idMatricula == element2.id) {
                    element.puesto = numPuesto
                    if (element2.promedio > 0)
                      element.promedio = element2.promedio.toFixed(2)
                    else
                      element.promedio = 0
                    numPuesto++
                  }
                })
              })
              this.listaEstudiantesCurso.sort(((a, b) => b.puesto - a.puesto))
              //console.log(JSON.stringify(this.listaEstudiantesCurso))
            }
            this.btnCargando = false
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Lista Curso. Intente más tarde.' + err)
          this.btnCargando = false
        })
      },
      tdClassFuncE(row) {
        return 'text-center'
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
<!--
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
-->