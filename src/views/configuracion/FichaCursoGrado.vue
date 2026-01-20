<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> DATOS DEL CURSO [{{infoCurso.idCursoGrado}}]</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6" md="12">
                <b-form-group label="Descripción del curso*" label-for="nomenclatura" class="etiqueta">
                  <b-form-input id="nomenclatura" ref="nomenclatura" v-model.trim="$v.infoCurso.nomenclatura.$model" :state="validateStateC('nomenclatura')" aria-describedby="feedCurso" autocomplete="off" maxlength="100"></b-form-input>
                  <b-form-invalid-feedback id="feedCurso" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Jornada*" label-for="jornada" class="etiqueta">
                  <b-form-select  id="jornada" ref="jornada" v-model="$v.infoCurso.id_jornada.$model" :options="comboJornadas" :state="validateStateC('id_jornada')" aria-describedby="feedJornada"></b-form-select>
                  <b-form-invalid-feedback id="feedJornada">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Director del Curso*" label-for="docente" class="etiqueta">
                  <b-form-select  id="docente" ref="docente" v-model="$v.infoCurso.id_director.$model" :options="comboDocentes" :state="validateStateC('id_director')" aria-describedby="feedDoc"></b-form-select>
                  <b-form-invalid-feedback id="feedDoc">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Estado del Curso*" label-for="estado" class="etiqueta">
                  <b-form-select  id="estado" ref="estado" v-model="$v.infoCurso.estado.$model" :options="comboEstados" :state="validateStateC('estado')" aria-describedby="feedEstado"></b-form-select>
                  <b-form-invalid-feedback id="feedEstado">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <div class="float-right text-medium-emphasis text-info">* Campo requerido</div>
            <b-button class="small mx-1 mt-2" variant="primary" @click="validarDatosFormulario">
              <div v-if="infoCurso.editarCurso">Actualizar Datos del Curso</div>
              <div v-else>Guardar el Nuevo Curso</div>
            </b-button>
            <b-button class="small mx-1 mt-2" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
          </template>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import { validationMixin } from "vuelidate";
  import { required, minLength } from "vuelidate/lib/validators";

  export default {
    name: 'fichacursogrado',
    mixins: [validationMixin],
    props: {
      datosCursoGrado: Object
    },
    components: {},
    data () {
      return {
        infoCurso: {
          idCursoGrado: null,
          nomenclatura: null,
          curso: null,
          id_grado_sede: null,
          id_jornada: null,
          id_director: null,
          estado: null,
          editarCurso: true
        },
        comboJornadas: [],
        comboDocentes: [],
        comboEstados: []
      }
    },
    validations: {
      infoCurso: {
        nomenclatura: { required, minLength: minLength(4) },
        id_jornada: { required },
        id_director: { required },
        estado: { required }
      }
    },
    methods: {
      validarDatosFormulario() {
        this.$v.infoCurso.$touch()
        if (this.$v.infoCurso.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          let titulo = this.infoCurso.editarCurso ? 'Actualizar Datos del Curso' : 'Crear Curso'
          let pregunta = this.infoCurso.editarCurso ? '¿Esta seguro de Actualizar los Datos del Curso?' : '¿Esta seguro de Crear el Curso?'
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
            cancelVariant: '',
            cancelTitle: 'Cancelar',
            footerClass: 'p-2',
            bodyClass: 'p-5',
            hideHeaderClose: false,
            centered: true
          })
          .then(value => {
            if (value) {
              this.guardarDatosCursoGrado()
            }
          })
        }
        return true
      },
      async guardarDatosCursoGrado() {
        this.infoCurso.nomenclatura = this.infoCurso.nomenclatura.toUpperCase()
        if (this.infoCurso.estado == 0) {
          this.infoCurso.id_director = '99999'
        }
        if (this.infoCurso.editarCurso) {
          await axios
          .put(CONFIG.ROOT_PATH + 'academico/curso', JSON.stringify(this.infoCurso), { headers: {"Content-Type": "application/json; charset=utf-8" }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Curso')
            } else{
              this.$emit("retorno", 2)
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Curso. Intente más tarde. ' + err)
          })
        } else {
          await axios
          .post(CONFIG.ROOT_PATH + 'academico/curso', JSON.stringify(this.infoCurso), { headers: {"Content-Type": "application/json; charset=utf-8" }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Crear Curso')
            } else{
              this.$emit("retorno", 1)
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Crear Curso. Intente más tarde. ' + err)
          })
        }
      },
      consultaInfoCurso() {
        this.infoCurso = this.datosCursoGrado
      },
      cancelarFormulario() {
        this.$emit("retorno", 0)
      },
      async ocuparCombos() {
        this.comboDocentes = []
        this.$store.state.datosDocentes.forEach(element => {
          this.comboDocentes.push({ 'value': element.id, 'text': element.docente.toUpperCase() })
        })
        this.comboDocentes.push({ 'value': '99999', 'text': ' --- SIN ASIGNAR ---' })
        this.comboEstados = []
        this.$store.state.datosTablas.estados.forEach(element => {
          this.comboEstados.push({ 'value': element.id, 'text': element.estado.toUpperCase() })
        })
        this.comboJornadas = []
        this.$store.state.datosTablas.jornadas.forEach(element => {
          this.comboJornadas.push({ 'value': element.id, 'text': element.jornada.toUpperCase() })
        })
      },
      validateStateC(name) {
        const { $dirty, $error } = this.$v.infoCurso[name]
        return $dirty ? !$error : null
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.consultaInfoCurso()
      this.ocuparCombos()
    }
  }
</script>