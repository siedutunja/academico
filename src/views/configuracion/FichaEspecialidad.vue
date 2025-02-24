<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card header-bg-variant="secondary">
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> DATOS DE LA ESPECIALIDAD</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6" md="12">
                <b-form-group label="Nombre de la Especialidad*" label-for="especialidad" class="etiqueta">
                  <b-form-input id="especialidad" ref="especialidad" v-model.trim="$v.infoEspecialidad.especialidad.$model" :state="validateStateS('especialidad')" aria-describedby="feedEspecialidad" autocomplete="off" maxlength="255"></b-form-input>
                  <b-form-invalid-feedback id="feedEspecialidad" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Tipo*" label-for="tipo" class="etiqueta">
                  <b-form-select  id="tipo" ref="tipo" v-model="$v.infoEspecialidad.id_tipo.$model" :options="comboTipos" :state="validateStateS('id_tipo')" aria-describedby="feedTipo"></b-form-select>
                  <b-form-invalid-feedback id="feedTipo">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Estado*" label-for="estado" class="etiqueta">
                  <b-form-select  id="estado" ref="estado" v-model="$v.infoEspecialidad.estado.$model" :options="comboEstados" :state="validateStateS('estado')" aria-describedby="feedEstado"></b-form-select>
                  <b-form-invalid-feedback id="feedEstado">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <div class="float-right text-medium-emphasis text-info">* Campo requerido</div>
            <b-button class="small mx-1 mt-2" variant="primary" @click="validarDatosFormulario">
              <div v-if="infoEspecialidad.editarEspecialidad">Actualizar Datos de la Especialidad</div>
              <div v-else>Guardar la Nueva Especialidad</div>
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
    name: 'fichaespecialidad',
    mixins: [validationMixin],
    props: {
      datosEspecialidad: Object
    },
    components: {},
    data () {
      return {
        infoEspecialidad: {
          id: null,
          id_institucion: null,
          especialidad: null,
          id_tipo: null,
          estado: null,
          editarEspecialidad: true
        },
        comboEstados: [],
        comboTipos: [
          { 'value': 1, 'text': 'ACADÉMICA'},
          { 'value': 2, 'text': 'TÉCNICA'}
        ]
      }
    },
    validations: {
      infoEspecialidad: {
        especialidad: { required, minLength: minLength(4) },
        id_tipo: { required },
        estado: { required }
      }
    },
    methods: {
      validarDatosFormulario() {
        this.$v.infoEspecialidad.$touch()
        if (this.$v.infoEspecialidad.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          let titulo = this.infoEspecialidad.editarEspecialidad ? 'Actualizar datos de la Especialidad' : 'Crear Especialidad'
          let pregunta = this.infoEspecialidad.editarEspecialidad ? '¿Esta seguro de actualizar los datos de la Especialidad?' : '¿Esta seguro de crear la Especialidad?'
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
              this.guardarDatosEspecialidad()
            }
          })
        }
        return true
      },
      async guardarDatosEspecialidad() {
        this.infoEspecialidad.especialidad = this.infoEspecialidad.especialidad.toUpperCase()
        if (this.infoEspecialidad.editarEspecialidad) {
          await axios
          .put(CONFIG.ROOT_PATH + 'academico/especialidad', JSON.stringify(this.infoEspecialidad), { headers: {"Content-Type": "application/json; charset=utf-8" }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Especialidad')
            } else{
              this.$emit("retorno", 2)
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Especialidad. Intente más tarde. ' + err)
          })
        } else {
          await axios
          .post(CONFIG.ROOT_PATH + 'academico/especialidad', JSON.stringify(this.infoEspecialidad), { headers: {"Content-Type": "application/json; charset=utf-8" }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Crear Especialidad')
            } else{
              this.$emit("retorno", 1)
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Crear Especialidad. Intente más tarde. ' + err)
          })
        }
        this.cargarDatosEspecialidads()
      },
      async cargarDatosEspecialidads() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/cargueespecialidades', {params: {idInstitucion: this.$store.state.idInstitucion}})
        .then(response => {
          if (response.data.error){
            alert(response.data.mensaje + ' - Consulta datos Especialidades')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
          } else {
            this.$store.commit('set', ['datosEspecialidades', response.data.datos])
          }
        })
        .catch(err => {
          alert('Algo salio mal y no se pudo realizar: Consulta datos Especialidades. Intente más tarde. ' + err)
          location.replace(CONFIG.ROOT_WEBSITE)
        })
      },
      consultaInfoEspecialidad() {
        this.infoEspecialidad = this.datosEspecialidad
      },
      soloNumeros(e) {
        let key = window.Event ? e.which : e.keyCode
        if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key == 8) || (key == 9) || (key == 37) || (key == 39))) {
            e.preventDefault()
        }
      },
      cancelarFormulario() {
        this.$emit("retorno", 0)
      },
      async ocuparCombos() {
        this.comboEstados = []
        this.$store.state.datosTablas.estados.forEach(element => {
          this.comboEstados.push({ 'value': element.id, 'text': element.estado.toUpperCase() })
        })
      },
      validateStateS(name) {
        const { $dirty, $error } = this.$v.infoEspecialidad[name]
        return $dirty ? !$error : null
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.consultaInfoEspecialidad()
      this.ocuparCombos()
    }
  }
</script>