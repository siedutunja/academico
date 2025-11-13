<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> PLANILLA DE RECUPERACIONES POR PERIODO</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="2">
                <b-form-group label="Seleccione el Periodo:" label-for="periodo" class="etiqueta">
                  <b-form-select id="periodo" ref="periodo" v-model="idPeriodo" :options="comboPeriodos" @change="idSede=null,idCurso=null,idAsignatura=null"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idCurso=null,idAsignatura=null,ocuparComboCursosSede()" :disabled="idPeriodo!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Seleccione el Curso:" label-for="cursos" class="etiqueta">
                  <b-form-select  id="cursos" ref="cursos" v-model="idCurso" :options="comboCursosSede" @change="idAsignatura=null,ocuparAsignaturasCurso()" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="Seleccione la Asignatura:" label-for="asig" class="etiqueta">
                  <b-form-select  id="asig" ref="asig" v-model="idAsignatura" :options="comboAsignaturasCurso" @change="consultaListaCurso()" :disabled="idCurso!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <div v-if="idAsignatura!=null">
              <b-row><b-col lg="12"><hr></b-col></b-row>
              <b-row>
                <b-col>
                  <div v-if="btnCargando">
                    <div class="text-center m-5 text-primary">
                      <b-spinner style="width: 3rem; height: 3rem;" label="Spinner"></b-spinner>
                      <br><strong>Cargando planilla...</strong>
                    </div>
                  </div>
                  <div v-else>
                    <b-row v-if="planillita == 1" class="mt-2">
                      <b-col>
                        <vue-good-table ref="table" :columns="encabColumnas" :rows="notasPlanilla" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                          <template slot="table-row" slot-scope="props">
                            <span v-if="props.column.field == 'estudiante'">
                              <span>{{props.row.estudiante}}</span>
                            </span>
                            <span v-if="props.column.field == 'diversa'">
                              <span>{{props.row.diversa}}</span>
                            </span>
                            <span v-if="props.column.field == 'definitiva'">
                              <span><b>{{props.row.definitiva > 0 ? props.row.definitiva.toFixed(1) : ''}}</b></span>
                            </span>
                            <span v-if="props.column.field == 'recuperacion'">
                              <b-form-input v-model="props.row.recuperacion" @blur="actualizarItemNota(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'recuperacion'),soloDecimales($event)" :ref="'recuperacion-' + props.row.originalIndex" :disabled="props.row.definitiva>0 ? false : true"></b-form-input>
                            </span>
                            <span v-if="props.column.field == 'fecharecupera'">
                              <b-form-input type="date" v-model="props.row.fecharecupera" @blur="actualizarItemFecha(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'fecharecupera'),soloDecimales($event)" :ref="'fecharecupera-' + props.row.originalIndex" :disabled="props.row.definitiva>0 ? false : true"></b-form-input>
                            </span>
                          </template>
                          <div slot="emptystate">
                            <h5 class="text-danger ml-5">No existen estudiantes en la planilla</h5>
                          </div>
                        </vue-good-table>
                      </b-col>
                      <b-col lg="12">
                        <b-alert v-if="cambioActivo==true" variant="danger" show><b>Advertencia: </b>La planilla se ha modificado, se recomienda guardar la planilla.</b-alert>
                      </b-col>
                      <b-col v-if="!botonGuardando">
                        <b-button class="small mx-1 mt-4" variant="success" @click="botonGuardando=true,guardarPlanilla()" :disabled="!cambioActivo">Guardar Planilla de Recuperaciones</b-button>
                      </b-col>
                      <b-col v-else>
                        <b-button class="mx-1 mt-4" variant="primary" disabled>
                          <b-spinner small type="grow"></b-spinner>
                          Guardando la planilla...
                        </b-button>
                      </b-col>
                    </b-row>
                    <b-row v-else class="mt-2">
                      <b-col>
                        <h6>Esta planilla no tiene recuperaciones.</h6>
                      </b-col>
                    </b-row>
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-card-text>
          <template #footer>
            <em>Actualización de Recuperaciones por Periodo.</em>
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
    name: 'recuperacionesperiodo',
    components: {
      VueGoodTable,
    },
    data () {
      return {
        idPeriodo: null,
        comboPeriodos: [],
        idSede: null,
        comboSedes: [],
        idCurso: null,
        comboCursosSede: [],
        idAsignatura: null,
        comboAsignaturasCurso: [],
        listaAsignaturasCurso: [],
        planillita: 0,
        configuracionPlanilla: {},
        btnCargando: false,
        cambioActivo: false,
        notasPlanilla: [],
        encabColumnas: [],
        botonGuardando: false,
      }
    },
    methods: {
   async guardarPlanilla() {
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/recuperaciones/planilla', JSON.stringify(this.notasPlanilla), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Planilla Recuperaciones')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'La planilla de recuperaciones se ha guardado satisfactoriamente.')
            this.botonGuardando = false
            this.cambioActivo = false
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Planilla Recuperaciones. Intente más tarde. ' + err)
        })
      },
      actualizarItemNota(item) {
        let notaMinima = 0
        let notaMaxima = 99
        if (this.configuracionPlanilla.id_tipo == 1) {
          notaMinima = this.configuracionPlanilla.minBaj
          notaMaxima = this.configuracionPlanilla.maxSup
        } else if (this.configuracionPlanilla.id_tipo == 2) {
          notaMinima = this.configuracionPlanilla.minBajT
          notaMaxima = this.configuracionPlanilla.maxSupT
        }
        let indice = this.notasPlanilla.findIndex(asigna => asigna.idMatricula === item.idMatricula)
        if (item.recuperacion == '' || item.recuperacion == null || item.recuperacion == 0) {
          this.notasPlanilla[indice].recuperacion = null
          item.recuperacion = null
        } else  {
          if (item.recuperacion >= notaMinima && item.recuperacion <= notaMaxima) {
            this.notasPlanilla[indice].recuperacion = item.recuperacion
          } else {
            this.notasPlanilla[indice].recuperacion = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La recuperación (nota): ' + item.recuperacion  + ' no es válida.')
            item.recuperacion = null
          }
        }
        let definitivaFinal = this.notasPlanilla[indice].definitiva
        if (this.notasPlanilla[indice].recuperacion > this.notasPlanilla[indice].definitiva) {
          definitivaFinal = this.notasPlanilla[indice].recuperacion
        }
        if (this.configuracionPlanilla.id_tipo == 1) {
          if (definitivaFinal >= this.configuracionPlanilla.minBaj && definitivaFinal < this.configuracionPlanilla.minBas) {
            this.notasPlanilla[indice].concepto = 'BAJO'
          } else if (definitivaFinal >= this.configuracionPlanilla.minBas && definitivaFinal < this.configuracionPlanilla.minAlt) {
            this.notasPlanilla[indice].concepto = 'BASICO'
          } else if (definitivaFinal >= this.configuracionPlanilla.minAlt && definitivaFinal < this.configuracionPlanilla.minSup) {
            this.notasPlanilla[indice].concepto = 'ALTO'
          } else if (definitivaFinal >= this.configuracionPlanilla.minSup && definitivaFinal <= this.configuracionPlanilla.maxSup) {
            this.notasPlanilla[indice].concepto = 'SUPERIOR'
          } else {
            this.notasPlanilla[indice].concepto = null
          }
        } else if (this.configuracionPlanilla.id_tipo == 2) {
          if (definitivaFinal >= this.configuracionPlanilla.minBajT && definitivaFinal < this.configuracionPlanilla.minBasT) {
            this.notasPlanilla[indice].concepto = 'BAJO'
          } else if (definitivaFinal >= this.configuracionPlanilla.minBasT && definitivaFinal < this.configuracionPlanilla.minAltT) {
            this.notasPlanilla[indice].concepto = 'BASICO'
          } else if (definitivaFinal >= this.configuracionPlanilla.minAltT && definitivaFinal < this.configuracionPlanilla.minSupT) {
            this.notasPlanilla[indice].concepto = 'ALTO'
          } else if (definitivaFinal >= this.configuracionPlanilla.minSupT && definitivaFinal <= this.configuracionPlanilla.maxSupT) {
            this.notasPlanilla[indice].concepto = 'SUPERIOR'
          } else {
            this.notasPlanilla[indice].concepto = null
          }
        }
      },
      actualizarItemFecha(item) {
        let indice = this.notasPlanilla.findIndex(asigna => asigna.idMatricula === item.idMatricula)
        if (item.fecharecupera == '' || item.fecharecupera == null || item.fecharecupera == 0) {
          this.notasPlanilla[indice].fecharecupera = null
          item.fecharecupera = null
        } else  {
          this.notasPlanilla[indice].fecharecupera = item.fecharecupera
        }
      },
      consultaListaCurso() {
        this.planillita = 0
        let orden = 0
        let nivel = 0
        this.configuracionPlanilla = {}
        this.listaAsignaturasCurso.forEach(element => {
          if (element.idAsignaturaCurso == this.idAsignatura) {
            orden = element.orden
            nivel = element.id_nivel
            this.configuracionPlanilla = element
          }
        })
        //console.log(JSON.stringify(this.configuracionPlanilla))
        if (orden == 99) {
          this.planillita = 5
          // Planilla de comportamiento, no tiene recuperaciones
          //this.cargarNotasPeriodoComportamiento()
        } else {
          if (nivel > 1 && nivel < 7) {
            this.planillita = 1
            this.cargarRecuperacionesPeriodo()
          } else if (nivel == 1) {
            this.planillita = 2
            // Planilla de preescolar, no tiene recuperaciones
          } else {
            this.mensajeEmergente('info',CONFIG.TITULO_MSG,'Lo sentimos, debe seleccionar una asignatura para consultar las valoraciones.')
          }
        }
      },
      async cargarRecuperacionesPeriodo() {
        this.btnCargando = true
        this.notasPlanilla = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/recuperaciones/planilla', {params: {idCurso: this.idCurso, idPeriodo: this.idPeriodo, idPlanilla: this.idAsignatura, idTipoEsp: this.configuracionPlanilla.id_tipo, idEspecialidad: this.configuracionPlanilla.id_especialidad, vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Recuperaciones periodo')
            this.btnCargando = false
            this.cambioActivo = false
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                element.id_asignatura_curso = this.idAsignatura
                element.periodo = this.idPeriodo
                element.concepto = null
              })
              this.notasPlanilla = response.data.datos
              //console.log(JSON.stringify(this.notasPlanilla))
              setTimeout(()=>{
                this.construirPlanillaNotas()
                this.btnCargando = false
                this.cambioActivo = false
              },500)
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Recuperaciones periodo. Intente más tarde.' + err)
          this.btnCargando = false
          this.cambioActivo = false
        })
      },
      async construirPlanillaNotas() {
        if (this.planillita == 1) {
          this.encabColumnas = [
            { label: 'Apellidos y Nombres Estudiante', width: '50%', field: 'estudiante', sortable: false },
            { label: '', field: 'diversa', sortable: false, tdClass: this.tdClassFuncDiversa },
            { label: 'Definitiva', field: 'definitiva', width: '10%', tdClass: 'text-center', sortable: false },
            { label: 'Recuperación', field: 'recuperacion', width: '10%', sortable: false },
            { label: 'Fecha Recuperación', field: 'fecharecupera', sortable: false },
          ]
        }
      },
      async ocuparAsignaturasCurso() {
        this.comboAsignaturasCurso = []
        this.listaAsignaturasCurso = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/asignacioncurso', {params: {idCurso: this.idCurso, idInstitucion: this.$store.state.idInstitucion}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista asignaturas curso')
          } else{
            if (response.data.datos != 0) {
              this.listaAsignaturasCurso = response.data.datos
              this.listaAsignaturasCurso.forEach(element => {
                this.comboAsignaturasCurso.push({ 'value': element.idAsignaturaCurso, 'text': element.asignatura.toUpperCase() })
              })
            }
          }
          //console.log(JSON.stringify(this.listaAsignaturasCurso))
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista asignación docentes curso. Intente más tarde.' + err)
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
      async ocuparComboSedes() {
        this.comboSedes = []
        this.$store.state.datosSedes.forEach(element => {
          this.comboSedes.push({ 'value': element.id, 'text': element.sede.toUpperCase() })
        })
      },
      async ocuparComboPeriodos() {
        this.comboPeriodos = []
        this.$store.state.periodos.forEach(element => {
          this.comboPeriodos.push({ 'value': element.id, 'text': element.periodo.toUpperCase() })
        })
      },
      handleKeyNavigation(event, i, col) {
        if (event.key === "ArrowDown") {
          const nextInput = this.$refs[`${col}-${i + 1}`]
          if (nextInput) nextInput.focus()
        } else if (event.key === "ArrowUp") {
          const previousInput = this.$refs[`${col}-${i - 1}`]
          if (previousInput) previousInput.focus()
        }
      },
      soloNumeros(e) {
        let key = window.Event ? e.which : e.keyCode
        if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key == 8) || (key == 9) || (key == 37) || (key == 39))) {
            e.preventDefault()
        }
      },
      soloDecimales(e) {
        let key = window.Event ? e.which : e.keyCode
        if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key == 8) || (key == 9) || (key == 37) || (key == 39) || (key == 110) || (key == 189) || (key == 190))) {
            e.preventDefault()
        }
      },
      tdClassFuncDiversa(fila) {
        if (fila.id_diversa == 'S') {
          return 'text-center alert alert-warning'
        }
      },
      cambioPlanilla() {
        this.cambioActivo = true
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      if(this.$store.state.idRol == 1 || this.$store.state.idRol == 12 || this.$store.state.perActNotas == 1) {
        this.ocuparComboPeriodos()
        this.ocuparComboSedes()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>