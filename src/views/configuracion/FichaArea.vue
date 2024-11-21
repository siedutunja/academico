<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> DATOS DEL AREA</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="10" md="9">
                <b-form-group label="Descripción del area*" label-for="area" class="etiqueta">
                  <b-form-input id="area" ref="area" v-model.trim="$v.infoArea.area.$model" :state="validateStateA('area')" aria-describedby="feedArea" autocomplete="off" maxlength="255" :disabled="$store.state.idRol==1 ? false : true"></b-form-input>
                  <b-form-invalid-feedback id="feedArea" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="2" md="3">
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
              <div v-if="infoArea.editarArea">Actualizar Datos del Area</div>
              <div v-else>Crear Area</div>
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
          idArea: null,
          area: null,
          id_institucion: null,
          vigencia: null,
          orden: null,
          editarArea: null
        }
      }
    },
    validations: {
      infoArea: {
        area: { required, minLength: minLength(4) },
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
          let titulo = this.infoArea.editarArea ? 'Actualizar Datos del Area' : 'Crear Area'
          let pregunta = this.infoArea.editarArea ? '¿Esta seguro de Actualizar los Datos del Area?' : '¿Esta seguro de Crear el Area?'
          this.$bvModal.msgBoxConfirm(pregunta, {
            title: titulo,
            size: '',
            buttonSize: 'sm',
            okVariant: 'success',
            okTitle: 'Si, ' + titulo,
            cancelVariant: 'danger',
            cancelTitle: 'Cancelar',
            footerClass: 'p-2',
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
        if (this.infoArea.editarArea) {
          await axios
          .put(CONFIG.ROOT_PATH + 'academico/areas', JSON.stringify(this.infoArea), { headers: {"Content-Type": "application/json; charset=utf-8" }})
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