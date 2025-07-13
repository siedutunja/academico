<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> PLANILLA DE HABILITACIONES FINALES</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="3">
                <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idCurso=null,idAsignatura=null,ocuparComboCursosSede()"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Seleccione el Curso:" label-for="cursos" class="etiqueta">
                  <b-form-select  id="cursos" ref="cursos" v-model="idCurso" :options="comboCursosSede" @change="idAsignatura=null,ocuparAsignaturasCurso()" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="Seleccione la Asignatura:" label-for="asig" class="etiqueta">
                  <b-form-select  id="asig" ref="asig" v-model="idAsignatura" :options="comboAsignaturasCurso" @change="consultarEstudiantes()" :disabled="idCurso!=null ? false : true"></b-form-select>
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
                        <vue-good-table ref="table" :columns="encabColumnas" :rows="planillaAsignatura" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                          <!--
                          <template slot="table-row" slot-scope="props">
                            <input v-model="row.habilitacion" type="number" step="0.01" min="1" max="5">
                            <input v-model="row.fechaHabilitacion" type="date">
                          </template>
                          -->
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
                        <h6>Esta planilla no tiene habilitaciones.</h6>
                      </b-col>
                    </b-row>
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-card-text>
          <template #footer>
            <em>Actualización de Habilitaciones.</em>
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
    name: 'habilitaciones',
    components: {
      VueGoodTable,
    },
    data () {
      return {
        idSede: null,
        comboSedes: [],
        idCurso: null,
        comboCursosSede: [],
        idAsignatura: null,
        comboAsignaturasCurso: [],
        listaAsignaturasCurso: [],
        encabColumnas: [
          { label: 'Estudiante', field: 'estudiante' },
          { label: 'Documento', field: 'documento' },
          { label: 'Nota Final Año', field: 'notaFinalAño' },
          { label: 'Habilitación', field: 'habilitacion', editable: true },
          { label: 'Fecha Habilitación', field: 'fechaHabilitacion', editable: true }
        ],


        planillita: 1,
        btnCargando: false,
        cambioActivo: false,
        botonGuardando: false,

        listaAreasAsignaturas: [],
        datosRaw: [],
        datosSeccion: {},
      }
    },
    methods: {
    async guardarPlanilla() {
      await axios
        .put(CONFIG.ROOT_PATH + 'academico/habilitaciones/planilla', JSON.stringify(this.notasPlanilla), { headers: {"Content-Type": "application/json; charset=utf-8" }})
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
      async consultarEstudiantes() {
        this.btnCargando = true
        if (this.idCurso != null) { 
          this.$store.state.datosCursos.forEach(element => {
            if (element.id == this.idCurso) {
              this.idNivel = element.id_nivel
            }
          })
          this.listaAreasAsignaturas = []
          await axios
          .get(CONFIG.ROOT_PATH + 'consolidados/areasasignaturas/curso', {params: {idCurso: this.idCurso}})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista areas-asignaturas curso')
              this.btnCargando = false
            } else{
              if (response.data.datos != 0) {
                this.listaAreasAsignaturas = response.data.datos
                //console.log(JSON.stringify(this.listaAreasAsignaturas))
              }
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista areas-asignaturas curso. Intente más tarde.' + err)
            this.btnCargando = false
          })
          this.datosRaw = []
          await axios
          .get(CONFIG.ROOT_PATH + 'consolidados/asignaturas/curso/periodo', {params: {idCurso: this.idCurso, periodo: 2}}) // OJO CON EL PERIODO
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consolidados asignaturas curso periodo')
              this.btnCargando = false
            } else{
              if (response.data.datos != 0) {
                this.datosRaw = response.data.datos
              }
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consolidados asignaturas curso periodo. Intente más tarde.' + err)
            this.btnCargando = false
          })
        console.log(JSON.stringify(this.datosRaw))
        }
        //console.log(JSON.stringify(this.listaAreasAsignaturas))
        this.btnCargando = false
      },
      estudiantesNotas() {
        const mapa = {}
        this.datosRaw.forEach(row => {
          const { estudiante, area, asignatura, definitiva, recuperacion, orden, definitivacompor, definitivapree, idTipoEspecialidad, ausJ, ausS } = row
          if (!mapa[estudiante]) mapa[estudiante] = { ausJ: 0, ausS: 0 }
          if (!mapa[estudiante][area]) mapa[estudiante][area] = {}
          let notaFinal = 0
          if (orden === 99) {
            if (this.datosSeccion.tipoValComp == 1) {
              notaFinal = definitiva
            } else {
              notaFinal = definitivacompor != null && definitivacompor != 0 && definitivacompor != '' ? definitivacompor : ''
            }
          } else {
            if (this.idNivel == 1) {
              notaFinal = definitivapree != null && definitivapree != 0 && definitivapree != '' ? definitivapree : ''
            } else {
              if (definitiva > 0)
                notaFinal = recuperacion > definitiva ? recuperacion : definitiva
              else
                notaFinal = ''
            }
          }
          mapa[estudiante][area][asignatura] = {
            nota: notaFinal,
            fueRecuperada: recuperacion > definitiva,
            original: definitiva,
            recuperacion,
            idTipoEspecialidad
          }
          mapa[estudiante].ausJ += ausJ || 0
          mapa[estudiante].ausS += ausS || 0
        })
        return mapa
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
          //console.log(JSON.stringify(this.idCurso))
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
        this.ocuparComboSedes()
        this.datosSeccion = this.$store.state.datosSecciones[this.$store.state.idSeccion - 1]
      } else {
        this.$router.push('/restringida')
      }
    },
    computed: {
      planillaAsignatura() {
        const asignaturaFiltrada = this.listaAreasAsignaturas.find(a => a.idAsignaturaCurso === this.idAsignatura && a.orden !== 99)
        if (!asignaturaFiltrada) return []
        //console.log(asignaturaFiltrada)

        return Object.values(this.estudiantesNotas)
          .map(est => {
            const datos = est.areas?.[asignaturaFiltrada.area]?.asignaturas?.[this.idAsignatura]
            //console.log(est)
            if (!datos) return null

            const periodos = Object.values(datos.periodos || {}).filter(n => typeof n === 'number')
            const promedioDefinitiva = periodos.length > 0
              ? (periodos.reduce((sum, n) => sum + n, 0) / periodos.length).toFixed(2)
              : '0.00'

            return {
              estudiante: est.nombre || est.documento,
              documento: est.documento,
              notaFinalAño: promedioDefinitiva,
              habilitacion: '',
              fechaHabilitacion: ''
            }
          })
          .filter(Boolean)
      }
    }
  }
</script>