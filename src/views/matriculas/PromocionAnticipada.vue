<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> PROMOCIÓN ANTICIPADA</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="4">
                <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idCurso=null,idMatricula=null,ocuparComboCursosSede()"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="2">
                <b-form-group label="Seleccione el Curso:" label-for="cursos" class="etiqueta">
                  <b-form-select  id="cursos" ref="cursos" v-model="idCurso" :options="comboCursosSede" @change="idMatricula=null,consultarMatriculados()" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="Seleccione el Estudiante:" label-for="estudiante" class="etiqueta">
                  <b-form-select  id="estudiante" ref="estudiante" v-model="idMatricula" :options="comboEstudiantes" @change="seleccionarEstudiante()" :disabled="idCurso!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mt-2" v-if="idMatricula!=null">
              <b-col lg="12"><hr></b-col>
              <b-col lg="12">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Datos para la Promoción Anticipada del Estudiante</h5>
                  </template>
                  <b-card-text>
                    <b-row>
                      <b-col lg="9">
                        <b-form-group label="Acta de Promoción:*" label-for="acta" class="etiqueta">
                          <b-form-input id="acta" ref="acta" v-model.trim="$v.datosPromo.acta.$model" :state="validateStateP('acta')" aria-describedby="feedActa" autocomplete="off"></b-form-input>
                          <b-form-invalid-feedback id="feedActa">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3">
                        <b-form-group label="Fecha Acta:*" label-for="fecha" class="etiqueta">
                          <b-form-input type="date" id="fecha" ref="fecha" v-model="$v.datosPromo.fecha_acta.$model" :state="validateStateP('fecha_acta')" aria-describedby="feedFecha"></b-form-input>
                          <b-form-invalid-feedback id="feedFecha">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="12">
                        <b-alert show>
                          <b-row>
                            <b-col lg="12"><h6>Sede y Curso al que se Promueve el Estudiante</h6></b-col>
                            <b-col lg="12"><hr></b-col>
                            <b-col lg="6">
                              <b-form-group label="Sede Promoción:" label-for="sedesP" class="etiqueta">
                                <b-form-select  id="sedesP" ref="sedesP" v-model="$v.datosPromo.id_sede.$model" :options="comboSedesPromo" @change="datosPromo.id_curso=null,ocuparComboCursosSedePromo()" :state="validateStateP('id_sede')" aria-describedby="feedsedesP"></b-form-select>
                                <b-form-invalid-feedback id="feedsedesP">Campo requerido.</b-form-invalid-feedback>
                              </b-form-group>
                            </b-col>
                            <b-col lg="4">
                              <b-form-group label="Curso Promoción:" label-for="cursosP" class="etiqueta">
                                <b-form-select  id="cursosP" ref="cursosP" v-model="$v.datosPromo.id_curso.$model" :options="comboCursosSedePromo" @change="seleccionarGradoCurso()" :state="validateStateP('id_curso')" aria-describedby="feedcursosP" :disabled="datosPromo.id_sede!=null ? false : true"></b-form-select>
                                <b-form-invalid-feedback id="feedcursosP">Campo requerido.</b-form-invalid-feedback>
                              </b-form-group>
                            </b-col>
                          </b-row>
                        </b-alert>
                      </b-col>
                    </b-row>
                  </b-card-text>
                  <template #footer>
                    <b-button class="small mx-1 mt-2" variant="primary" @click="confirmarPromo">Promocionar Estudiante</b-button>
                    <b-button class="small mx-1 mt-2" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
                  </template>
                </b-card>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Seleccione el Curso y el Estudiante al que desea promover anticipadamente.</em>
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
  import { validationMixin } from "vuelidate";
  import { required, minLength } from "vuelidate/lib/validators";
  import { uuid } from 'vue-uuid'

  export default {
    name: 'promocionanticipada',
    mixins: [validationMixin],
    components: {
    },
    data () {
      return {
        comboSedes: [],
        comboSedesPromo: [],
        idSede: null,
        comboCursosSede: [],
        comboCursosSedePromo: [],
        idCurso: null,
        comboEstudiantes: [],
        idMatricula: null,
        listaEstudiantes: [],
        datosPromo: {
          idMatriculaPromo: null,
          id: null,
          id_institucion: null,
          id_estudiante: null,
          vigencia: null,
          id_sede: null,
          id_grado: null,
          id_curso: null,
          id_especialidad: null,
          id_metodologia: null,
          id_modalidad: null,
          id_nuevo: null,
          procedencia: null,
          id_repitente: null,
          id_ruta: null,
          obs_matricula: null,
          id_diversa: null,
          id_estado_actual: null,
          id_estado_final: null,
          firma_estudiante: null,
          firma_acudiente: null,
          acta: null,
          fecha_acta: null,
          obs_final: null
        },
      }
    },
    validations: {
      datosPromo: {
        acta: { required },
        fecha_acta: { required },
        id_sede: { required },
        id_curso: { required },
      }
    },
    methods: {
      async confirmarPromo() {
        this.$v.datosPromo.$touch()
        if (this.$v.datosPromo.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          let titulo = 'Promocionar Anticipadamente'
          let pregunta = '¿Esta seguro de promocionar al Estudiante?'
          this.$bvModal.msgBoxConfirm(pregunta, {
            headerBgVariant: 'primary',
            headerTextVariant: 'light',
            bodyBgVariant: 'light',
            bodyBgClass: 'text-center',
            title: titulo,
            size: '',
            buttonSize: 'sm',
            okVariant: 'primary',
            okTitle: 'Si, ' + titulo,
            cancelVariant: 'danger',
            cancelTitle: 'Cancelar',
            footerClass: 'p-2',
            bodyClass: 'p-5',
            hideHeaderClose: false,
            centered: true
          })
          .then(value => {
            if (value) {
              this.guardarPromo()
            }
          })
        }
        return true
      },
      async guardarPromo() {
        this.datosPromo.obs_final = 'Promoción Anticipada: ' + this.datosPromo.acta + ' del ' + this.datosPromo.fecha_acta
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/matriculas/promocionanticipada', JSON.stringify(this.datosPromo), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Promoción Anticipada')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'La Promoción Anticipada se han realizado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Promoción Anticipada. Intente más tarde. ' + err)
        })
        this.idSede = null
        this.idCurso = null
        this.idMatricula = null
      },
      seleccionarGradoCurso() {
        let indice = this.$store.state.datosCursos.findIndex(curso => curso.id === this.datosPromo.id_curso)
        this.datosPromo.id_grado = this.$store.state.datosCursos[indice].id_grado_sede
      },
      seleccionarEstudiante() {
        let indice = this.listaEstudiantes.findIndex(promo => promo.id === this.idMatricula)
        this.datosPromo.id = this.listaEstudiantes[indice].id
        this.datosPromo.idMatriculaPromo = uuid.v1()
        this.datosPromo.id_institucion = this.listaEstudiantes[indice].id_institucion
        this.datosPromo.id_estudiante = this.listaEstudiantes[indice].id_estudiante
        this.datosPromo.vigencia = this.listaEstudiantes[indice].vigencia
        this.datosPromo.id_sede = null
        this.datosPromo.id_grado = null
        this.datosPromo.id_curso = null
        this.datosPromo.id_especialidad = null
        this.datosPromo.id_metodologia = null
        this.datosPromo.id_modalidad = 1
        this.datosPromo.id_nuevo = 'N'
        this.datosPromo.procedencia = this.listaEstudiantes[indice].procedencia
        this.datosPromo.id_repitente = 'N'
        this.datosPromo.id_ruta = this.listaEstudiantes[indice].id_ruta
        this.datosPromo.obs_matricula = 'Promovido Anticipadamente'
        this.datosPromo.id_diversa = this.listaEstudiantes[indice].id_diversa
        this.datosPromo.id_estado_actual = 1
        this.datosPromo.id_estado_final = null
        this.datosPromo.firma_estudiante = this.listaEstudiantes[indice].firma_estudiante
        this.datosPromo.firma_acudiente = this.listaEstudiantes[indice].firma_acudiente
        this.datosPromo.acta = null
        this.datosPromo.fecha_acta = null
        this.datosPromo.obs_final = null
      },
      async consultarMatriculados() {
        this.comboEstudiantes = []
        this.listaEstudiantes = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/matriculas/promo', {params: {idCurso: this.idCurso}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Promoción Anticipada')
          } else{
            if (response.data.datos != 0) {
              this.listaEstudiantes = response.data.datos
              this.listaEstudiantes.forEach(element => {
                this.comboEstudiantes.push({ 'value': element.id, 'text': element.estudiante })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Promoción Anticipada. Intente más tarde.' + err)
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
      async ocuparComboCursosSedePromo() {
        this.comboCursosSedePromo = []
        this.$store.state.datosCursos.forEach(element => {
          if (element.id_sede == this.datosPromo.id_sede) {
            this.comboCursosSedePromo.push({ 'value': element.id, 'text': element.nomenclatura.toUpperCase() })
          }
        })
      },
      async ocuparComboSedes() {
        this.comboSedes = []
        this.comboSedesPromo = []
        this.$store.state.datosSedes.forEach(element => {
          this.comboSedes.push({ 'value': element.id, 'text': element.sede.toUpperCase() })
          this.comboSedesPromo.push({ 'value': element.id, 'text': element.sede.toUpperCase() })
        })
      },
      validateStateP(name) {
        const { $dirty, $error } = this.$v.datosPromo[name]
        return $dirty ? !$error : null
      },
      cancelarFormulario() {
        this.$router.push('/')
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      if(this.$store.state.idRol == 1 || this.$store.state.idRol == 12) {
        this.ocuparComboSedes()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>