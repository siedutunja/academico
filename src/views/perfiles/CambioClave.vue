<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="shield-shaded" aria-hidden="true"></b-icon> CAMBIAR CONTRASEÑA</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6" md="12">
                <b-form-group label="Contraseña Actual*" label-for="claveActual" class="etiqueta">
                  <b-form-input id="claveActual" ref="claveActual" v-model.trim="$v.datosClave.claveActual.$model" :state="validateStateC('claveActual')" aria-describedby="claveA" autocomplete="off" maxlength="20"></b-form-input>
                  <b-form-invalid-feedback id="claveA" >Digita la contraseña actual.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Nueva Contraseña*" label-for="claveNueva" class="etiqueta">
                  <b-form-input id="claveNueva" ref="claveNueva" v-model.trim="$v.datosClave.claveNueva.$model" :state="validateStateC('claveNueva')" aria-describedby="claveN" autocomplete="off" maxlength="20"></b-form-input>
                  <b-form-invalid-feedback id="claveN" >La contraseña debe contener mínimo 10 caracteres.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <div class="float-right text-medium-emphasis text-info">* Campo requerido</div>
            <b-button class="small mx-1 mt-2" variant="primary" @click="validarClaves">Actualizar Contraseña</b-button>
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
    name: 'cambioclave',
    mixins: [validationMixin],
    components: {},
    data () {
      return {
        datosClave: {
          idUsuario: null,
          claveActual: null,
          claveNueva: null
        }
      }
    },
    validations: {
      datosClave: {
        claveActual: { required },
        claveNueva: { required, minLength: minLength(10) }
      }
    },
    methods: {
      validarClaves() {
        this.$v.datosClave.$touch()
        if (this.$v.datosClave.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          this.$bvModal.msgBoxConfirm('¿Esta seguro de actualizar la contraseña del usuario?', {
            title: 'Actualizar Contraseña del Usuario',
            size: '',
            buttonSize: '',
            okVariant: 'primary',
            okTitle: 'Si, Actualizar Contraseña',
            cancelTitle: 'Cancelar',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          })
          .then(value => {
            if (value) {
              this.actualizarClave()
            }
          })
        }
        return true
      },
      async actualizarClave() {
        this.datosClave.idUsuario = this.$store.state.idUsuario
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/perfil/clave', JSON.stringify(this.datosClave), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Clave Usuario')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'La contraseña del usuario de ha actualizado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Clave Usuario. Intente más tarde. ' + err)
        })
      },
      cancelarFormulario() {
        this.$router.push('/inicio')
      },
      validateStateC(name) {
        const { $dirty, $error } = this.$v.datosClave[name]
        return $dirty ? !$error : null
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
    }
  }
</script>