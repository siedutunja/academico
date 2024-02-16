<template>
  <div>
    <CRow>
      <CCol>
        <b-row>  
          <b-col lg="12" md="12">
            <b-form-group label="Fecha de Vigencia del Usuario*" label-for="fechaV">
              <b-form-input id="fechaV" ref="fechaV" type="date" v-model.trim="$v.infoPerfilUsuario.vigencia.$model" :state="validateState('vigencia')" aria-describedby="feedFechaV"></b-form-input>
              <b-form-invalid-feedback id="feedFechaV" >Campo requerido.</b-form-invalid-feedback>            
            </b-form-group>
          </b-col>
          <b-col lg="12" md="12">
            <b-form-group label="Rol*" label-for="rol">
              <b-form-select  id="rol" ref="rol" v-model="$v.infoPerfilUsuario.id_rol.$model" :options="comboRoles" :state="validateState('id_rol')" aria-describedby="feedRol"></b-form-select>
              <b-form-invalid-feedback id="feedRol">Seleccione el rol</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="12" md="12">
            <b-form-group label="Dependencia*" label-for="dependencia">
              <b-form-select  id="dependencia" ref="dependencia" v-model="$v.infoPerfilUsuario.id_dependencia.$model" :options="comboDependencias" :state="validateState('id_dependencia')" aria-describedby="feedDependencia"></b-form-select>
              <b-form-invalid-feedback id="feedDependencia">Seleccione la dependencia</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="12" md="12"><hr></b-col>
          <b-col lg="12" md="12">
            <div class="float-right small text-medium-emphasis">* Campo requerido</div>
            <b-button class="small" variant="success" @click="validarDatosPerfilUsuario">Actualizar Datos del Perfil del Usuario</b-button>
            <b-button class="small mx-4" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
          </b-col>
        </b-row>
      </CCol>
    </CRow>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import { validationMixin } from "vuelidate";
  import { required } from "vuelidate/lib/validators";

  export default {
    name: 'EditarPerfilUsuario',
    mixins: [validationMixin],
    props: {
        datosPerfilUsuario: Object
    },
    components: {
    },
    data () {
      return {
        infoPerfilUsuario: {
          id: null,
          id_rol: null,
          id_dependencia: null,
          vigencia: null
        },
        comboRoles: [],
        comboDependencias: []
      }
    },
    validations: {
      infoPerfilUsuario: {
        id_rol: { required },
        id_dependencia: { required },
        vigencia: { required }
      }
    },
    methods: {
      cancelarFormulario() {
        this.$emit("retorno", 0)
      },
      validarDatosPerfilUsuario() {
        this.$v.infoPerfilUsuario.$touch()
        if (this.$v.infoPerfilUsuario.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          this.$bvModal.msgBoxConfirm('¿Esta seguro de actualizar los datos del perfil del usuario?', {
            title: 'Actualizar Perfil del Usuario',
            size: '',
            buttonSize: '',
            okVariant: 'success',
            okTitle: 'Si, Actualizar Perfil del Usuario',
            cancelTitle: 'Cancelar',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          })
          .then(value => {
            if (value) {
              this.actualizarPerfilUsuario()
            }
          })
        }
        return true
      },
      async actualizarPerfilUsuario() {
        await axios
        .put(CONFIG.ROOT_PATH + 'usuarios/perfil', JSON.stringify(this.infoPerfilUsuario), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Perfil del Usuario')
          } else{
            this.$emit("retorno", 1)
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Perfil del Usuario. Intente más tarde. ' + err)
        })
      },
      async consultaPerfilUsuario() {
        this.infoPerfilUsuario.id = this.datosPerfilUsuario.idUsuario
        this.infoPerfilUsuario.id_rol = this.datosPerfilUsuario.id_rol
        this.infoPerfilUsuario.id_dependencia = this.datosPerfilUsuario.id_dependencia
        this.infoPerfilUsuario.vigencia = this.datosPerfilUsuario.vigencia.substr(0,10)
      },
      async ocuparComboDependencias() {
        this.comboDependencias = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listadependencias', { params: { idEntorno: 2 }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Dependencias')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboDependencias.push({ 'value': element.id, 'text': element.dependencia.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Dependencias. Intente más tarde. ' + err)
        })
      },
      async ocuparComboRoles() {
        this.comboRoles = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listaroles', { params: { idEntorno: 2 }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Roles')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboRoles.push({ 'value': element.id, 'text': element.rol.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Roles. Intente más tarde. ' + err)
        })
      },
      validateState(name) {
        const { $dirty, $error } = this.$v.infoPerfilUsuario[name]
        return $dirty ? !$error : null
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.ocuparComboRoles()
      this.ocuparComboDependencias()
      this.consultaPerfilUsuario()
    },
    computed: {
    }
  }
</script>
