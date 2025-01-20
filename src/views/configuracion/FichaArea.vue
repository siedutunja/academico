<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> DATOS DEL ÁREA</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12" md="12">
                <b-form-group label="Descripción del area*" label-for="area" class="etiqueta">
                  <b-form-input id="area" ref="area" v-model.trim="$v.infoArea.area.$model" :state="validateStateA('area')" aria-describedby="feedArea" autocomplete="off" maxlength="100"></b-form-input>
                  <b-form-invalid-feedback id="feedArea" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Nemotécnico*" label-for="nemo" class="etiqueta">
                  <b-form-input id="nemo" ref="nemo" v-model.trim="$v.infoArea.nemo.$model" :state="validateStateA('nemo')" aria-describedby="feedNemo" autocomplete="off" maxlength="5"></b-form-input>
                  <b-form-invalid-feedback id="feedNemo" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Orden*" label-for="orden" class="etiqueta">
                  <b-form-input id="orden" ref="orden" v-model.trim="$v.infoArea.orden.$model" :state="validateStateA('orden')" aria-describedby="feedOrden" autocomplete="off" maxlength="3" @keydown="soloNumeros"></b-form-input>
                  <b-form-invalid-feedback id="feedOrden" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <div class="float-right text-medium-emphasis text-info">* Campo requerido</div>
            <b-button class="small" variant="primary" @click="validarDatosFormulario">
              <div v-if="infoArea.editarArea">Actualizar Datos del Área</div>
              <div v-else>Crear Área</div>
            </b-button>
            <b-button class="small ml-3" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
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
    name: 'fichaarea',
    mixins: [validationMixin],
    props: {
      datosArea: Object
    },
    components: {},
    data () {
      return {
        infoArea: {
          id: null,
          area: null,
          id_institucion: null,
          vigencia: null,
          nemo: null,
          orden: null,
          editarArea: null
        }
      }
    },
    validations: {
      infoArea: {
        area: { required, minLength: minLength(4) },
        nemo: { required },
        orden: { required }
      }
    },
    methods: {
      validarDatosFormulario() {
        this.$v.infoArea.$touch()
        if (this.$v.infoArea.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          let titulo = this.infoArea.editarArea ? 'Actualizar Datos del Área' : 'Crear Área'
          let pregunta = this.infoArea.editarArea ? '¿Esta seguro de actualizar los datos del Área?' : '¿Esta seguro de crear el Área?'
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
              this.guardarArea()
            }
          })
        }
        return true
      },
      async guardarArea() {
        this.infoArea.area = this.infoArea.area.toUpperCase()
        this.infoArea.nemo = this.infoArea.nemo.toUpperCase()
        if (this.infoArea.editarArea) {
          await axios
          .put(CONFIG.ROOT_PATH + 'academico/areas', JSON.stringify(this.infoArea), { headers: {"Content-Type": "application/json; charset=utf-8" }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Area')
            } else{
              this.$emit("retorno", 2)
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Area. Intente más tarde. ' + err)
          })
        } else {
          await axios
          .post(CONFIG.ROOT_PATH + 'academico/areas', JSON.stringify(this.infoArea), { headers: {"Content-Type": "application/json; charset=utf-8" }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Crear Area')
            } else{
              this.$emit("retorno", 1)
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Crear Area. Intente más tarde. ' + err)
          })
        }
        this.cargarDatosAreas()
      },
      async cargarDatosAreas() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/cargueareas', {params: {idInstitucion: this.$store.state.idInstitucion, vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            alert(response.data.mensaje + ' - Consulta datos Areas')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
          } else {
            if(response.data.datos != 0) {
              this.$store.commit('set', ['datosAreas', response.data.datos])
            } else {
              this.$store.commit('set', ['datosAreas', []])
            }
          }
        })
        .catch(err => {
          alert('Algo salio mal y no se pudo realizar: Consulta datos Areas. Intente más tarde. ' + err)
          location.replace(CONFIG.ROOT_WEBSITE)
        })
      },
      consultaInfoArea() {
        this.infoArea = this.datosArea
      },
      cancelarFormulario() {
        this.$emit("retorno", 0)
      },
      soloNumeros(e) {
        let key = window.Event ? e.which : e.keyCode
        if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key == 8) || (key == 9) || (key == 37) || (key == 39))) {
            e.preventDefault()
        }
      },
      validateStateA(name) {
        const { $dirty, $error } = this.$v.infoArea[name]
        return $dirty ? !$error : null
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.consultaInfoArea()
    }
  }
</script>