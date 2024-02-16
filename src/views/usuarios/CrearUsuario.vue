<template>
  <div>
    <CRow>
      <CCol>
        <b-row>
          <b-col lg="3" md="6">
            <b-form-group label="Primer Apellido*" label-for="ape1">
              <b-form-input id="ape1" ref="ape1" v-model.trim="$v.formF.apellido1.$model" :state="validateStateF('apellido1')" aria-describedby="feedApe1" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
              <b-form-invalid-feedback id="feedApe1" >Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3" md="6">
            <b-form-group label="Segundo Apellido" label-for="ape2">
              <b-form-input id="ape2" ref="ape2" v-model.trim="$v.formF.apellido2.$model" :state="validateStateF('apellido2')" aria-describedby="feedApe2" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
              <b-form-invalid-feedback id="feedApe2">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3" md="6">
            <b-form-group label="Primer Nombre*" label-for="nom1">
              <b-form-input id="nom1" ref="nom1" v-model.trim="$v.formF.nombre1.$model" :state="validateStateF('nombre1')" aria-describedby="feedNom1" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
              <b-form-invalid-feedback id="feedNom1">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3" md="6">
            <b-form-group label="Segundo Nombre" label-for="nom2">
              <b-form-input id="nom2" ref="nom2" v-model.trim="$v.formF.nombre2.$model" :state="validateStateF('nombre2')" aria-describedby="feedNom2" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
              <b-form-invalid-feedback id="feedNom2">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3" md="6">
            <b-form-group label="Número de Documento*" label-for="doc">
              <b-form-input id="doc" ref="doc" v-model="$v.formF.documento.$model" :state="validateStateF('documento')" aria-describedby="feedDoc" autocomplete="off" maxlength="20" disabled></b-form-input>
              <b-form-invalid-feedback id="feedDoc">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3" md="6">
            <b-form-group label="Tipo Documento*" label-for="tipoDoc">
              <b-form-select  id="tipoDoc" ref="tipoDoc" v-model="$v.formF.idTipoDoc.$model" :options="comboTiposDoc" :state="validateStateF('idTipoDoc')" aria-describedby="feedTipoDoc"></b-form-select>
              <b-form-invalid-feedback id="feedTipoDoc">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="6" md="12">
            <b-form-group label="Municipio de Expedición del Documento*" label-for="muniDoc">
              <b-form-select  id="muniDoc" ref="muniDoc" v-model="$v.formF.idMuniDoc.$model" :options="comboMunicipios" :state="validateStateF('idMuniDoc')" aria-describedby="feedMuniDoc"></b-form-select>
              <b-form-invalid-feedback id="feedMuniDoc">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="6" md="12">
            <b-form-group label="Fecha de Nacimiento*" label-for="fechaN">
              <b-form-input id="fechaN" ref="fechaN" type="date" v-model.trim="$v.formF.fechaNace.$model" :state="validateStateF('fechaNace')" aria-describedby="feedFechaN"></b-form-input>
              <b-form-invalid-feedback id="feedFechaN" >Campo requerido.</b-form-invalid-feedback>            
            </b-form-group>
          </b-col>
          <b-col lg="3" md="6">
            <b-form-group label="Género*" label-for="genero">
              <b-form-select  id="genero" ref="genero" v-model="$v.formF.idGenero.$model" :options="comboGeneros" :state="validateStateF('idGenero')" aria-describedby="feedGenero"></b-form-select>
              <b-form-invalid-feedback id="feedGenero">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3" md="6">
            <b-form-group label="Grupo y Factor RH*" label-for="rh">
              <b-form-select  id="rh" ref="rh" v-model="$v.formF.idRh.$model" :options="comboRhs" :state="validateStateF('idRh')" aria-describedby="feedRh"></b-form-select>
              <b-form-invalid-feedback id="feedRh">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="6" md="12">
            <b-form-group label="Dirección de Residencia*" label-for="dir">
              <b-form-input id="dir" ref="dir" v-model.trim="$v.formF.direccion.$model" :state="validateStateF('direccion')" aria-describedby="feedDir" autocomplete="off" maxlength="100"></b-form-input>
              <b-form-invalid-feedback id="feedDir" >Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="6" md="12">
            <b-form-group label="Municipio de Residencia*" label-for="muniRes">
              <b-form-select  id="muniRes" ref="muniRes" v-model="$v.formF.idMuniRes.$model" :options="comboMunicipios" :state="validateStateF('idMuniRes')" aria-describedby="feedMuniRes"></b-form-select>
              <b-form-invalid-feedback id="feedMuniRes">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3" md="6">
            <b-form-group label="Teléfono Principal*" label-for="tel1">
              <b-form-input id="tel1" ref="tel1" v-model.trim="$v.formF.telefono1.$model" :state="validateStateF('telefono1')" aria-describedby="feedTel1" autocomplete="off" maxlength="10" @keydown="soloNumeros"></b-form-input>
              <b-form-invalid-feedback id="feedTel1" >El número debe contener 10 dígitos.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3" md="6">
            <b-form-group label="Teléfono Opcional" label-for="tel2">
              <b-form-input id="tel2" ref="tel2" v-model.trim="$v.formF.telefono2.$model" :state="validateStateF('telefono2')" aria-describedby="feedTel2" autocomplete="off" maxlength="10" @keydown="soloNumeros"></b-form-input>
              <b-form-invalid-feedback id="feedTel2" >El número debe contener 10 dígitos.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="6" md="12">
            <b-form-group label="Correo Electrónico*" label-for="correo">
              <b-form-input id="correo" ref="correo" v-model.trim="$v.formF.correo.$model" :state="validateStateF('correo')" aria-describedby="feedCorreo" autocomplete="off" maxlength="50"></b-form-input>
              <b-form-invalid-feedback id="feedCorreo" >Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="6" md="12">
            <b-form-group label="Cargo*" label-for="cargo">
              <b-form-input id="cargo" ref="cargo" v-model.trim="$v.formF.cargo.$model" :state="validateStateF('cargo')" aria-describedby="feedCargo" autocomplete="off" maxlength="50"></b-form-input>
              <b-form-invalid-feedback id="feedCargo" >Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="6" md="12">
            <b-form-group label="Dependencia*" label-for="dependencia">
              <b-form-select  id="dependencia" ref="dependencia" v-model="$v.formF.idDependencia.$model" :options="comboDependencias" :state="validateStateF('idDependencia')" aria-describedby="feedDependencia"></b-form-select>
              <b-form-invalid-feedback id="feedDependencia">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="6" md="12">
            <b-form-group label="Rol*" label-for="rol">
              <b-form-select  id="rol" ref="rol" v-model="$v.formF.idRol.$model" :options="comboRoles" :state="validateStateF('idRol')" aria-describedby="feedRol"></b-form-select>
              <b-form-invalid-feedback id="feedRol">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="6" md="12">
            <b-form-group label="Fecha de Vigencia*" label-for="fechaV">
              <b-form-input id="fechaV" ref="fechaV" type="date" v-model.trim="$v.formF.fechaVigencia.$model" :state="validateStateF('fechaVigencia')" aria-describedby="feedFechaV"></b-form-input>
              <b-form-invalid-feedback id="feedFechaV" >Campo requerido.</b-form-invalid-feedback>            
            </b-form-group>
          </b-col>
          <b-col lg="12"><hr></b-col>
          <b-col lg="12">
            <div class="float-right small text-medium-emphasis">* Campo requerido</div>
            <b-button class="small" variant="success" @click="validarDatosUsuario">Crear Usuario</b-button>
            <b-button class="small mx-4" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
          </b-col>
        </b-row>
      </CCol>
    </CRow>
  </div>
</template>

<script>
  import axios from "axios"
  import { validationMixin } from "vuelidate";
  import { required, minLength } from "vuelidate/lib/validators";
  import * as CONFIG from '@/assets/config.js'
  import { uuid } from 'vue-uuid'

  export default {
    name: 'CrearUsuario',
    mixins: [validationMixin],
    props: {
        datosUsuario: Object
    },
    data () {
      return {
        formF: {
          idUsuario: null,
          idPersona: null,
          idPermisos: null,
          documento: null,
          idTipoDoc: null,
          idMuniDoc: null,
          nombre1: null,
          nombre2: null,
          apellido1: null,
          apellido2: null,
          fechaNace: null,
          fechaVigencia: null,
          idGenero: null,
          idRh: null,
          direccion: null,
          idMuniRes: null,
          telefono1: null,
          telefono2: null,
          correo: null,
          cargo: null,
          idDependencia: null,
          idRol: null,
          estado: 1,
          usuario: null,
          clave: null,
          idEntorno: 2,
          idInstitucion: null
        },
        comboMunicipios: [],
        comboTiposDoc: [],
        comboGeneros: [],
        comboRhs: [],
        comboDependencias: [],
        comboRoles: [],
        nombres: '',
        apellidos: ''
      }
    },
    validations: {
      formF: {
        documento: { required, minLength: minLength(7) },
        idTipoDoc: { required },
        idMuniDoc: { required },
        nombre1: { required },
        nombre2: { minLength: minLength(0) },
        apellido1: { required },
        apellido2: { minLength: minLength(0) },
        fechaNace: { required },
        fechaVigencia: { required },
        idGenero: { required },
        idRh: { required },
        direccion: { required },
        idMuniRes: { required },
        telefono1: { required, minLength: minLength(10) },
        telefono2: { minLength: minLength(0) },
        correo: { required, minLength: minLength(5) },
        cargo: { required },
        idDependencia: { required },
        idRol: { required }
      }
    },
    methods: {
      cancelarFormulario() {
        this.$emit("retorno", 0)
      },
      validarDatosUsuario() {
        this.$v.formF.$touch()
        if (this.$v.formF.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          this.$bvModal.msgBoxConfirm('¿Esta seguro de crear el usuario?', {
            title: 'Crear Usuario',
            size: '',
            buttonSize: '',
            okVariant: 'success',
            okTitle: 'Si, Crear Usuario',
            cancelTitle: 'Cancelar',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          })
          .then(value => {
            if (value) {
              this.guardarNuevoUsuario()
            }
          })
        }
        return true
      },
      async guardarNuevoUsuario() {
        let caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        let nuevaCadena = ''
        this.formF.idUsuario = uuid.v1()
        this.formF.apellido1 = this.formF.apellido1.toUpperCase()
        this.apellidos = this.formF.apellido1
        if (this.formF.apellido2 == '' || this.formF.apellido2 == null) {
          this.formF.apellido2 = null
        } else {
          this.formF.apellido2 = this.formF.apellido2.toUpperCase()
          this.apellidos += " " + this.formF.apellido2
        }
        this.formF.nombre1 = this.formF.nombre1.toUpperCase()
        this.nombres = this.formF.nombre1
        if (this.formF.nombre2 == '' || this.formF.nombre2 == null) {
          this.formF.nombre2 = null
        } else {
          this.formF.nombre2 = this.formF.nombre2.toUpperCase()
          this.nombres += " " + this.formF.nombre2
        }
        this.formF.documento = this.formF.documento.toUpperCase()
        if (this.formF.telefono2 == '' || this.formF.telefono2 == null) {
          this.formF.telefono2 == null
        }
        this.formF.correo = this.formF.correo.toLowerCase()
        if (this.formF.cargo == '' || this.formF.cargo == null) {
          this.formF.cargo == null
        } else {
          this.formF.cargo = this.formF.cargo.toUpperCase()
        }
        var i = 0
        for ( i = 0; i < 10; i++ ) {
          nuevaCadena += caracteres.charAt(Math.floor(Math.random() * caracteres.length))
        }
        this.formF.usuario = nuevaCadena
        nuevaCadena = ''
        for ( i = 0; i < 10; i++ ) {
          nuevaCadena += caracteres.charAt(Math.floor(Math.random() * caracteres.length))
        }
        this.formF.clave = nuevaCadena
        this.formF.idEntorno = 2
        this.formF.idInstitucion = this.$store.state.idInstitucion
        this.formF.idPermisos = uuid.v1()
        await axios
        .post(CONFIG.ROOT_PATH + 'personas/persona', JSON.stringify(this.formF), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Crear Persona')
          } else{
            this.enviarCorreo()
            this.$emit("retorno", 1)
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Crear Persona. Intente más tarde. ' + err)
        })
      },
      async enviarCorreo() {
        let datosCorreo = {}
        datosCorreo.id = this.formF.idUsuario
        datosCorreo.nombres = this.nombres
        datosCorreo.apellidos = this.apellidos
        datosCorreo.documento = this.formF.documento
        datosCorreo.usuario = this.formF.usuario
        datosCorreo.clave = this.formF.clave
        datosCorreo.correo = this.formF.correo
        await axios
        .post(CONFIG.ROOT_PATH + 'correos/nuevousuario', JSON.stringify(datosCorreo), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Correo Nuevo usuario')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Correo Nuevo usuario. Intente más tarde. ' + err)
        })
      },
      validateStateF(name) {
        const { $dirty, $error } = this.$v.formF[name]
        return $dirty ? !$error : null
      },
      async ocuparComboMunicipios() {
        this.comboMunicipios = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listamunicipios')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Municipios')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboMunicipios.push({ 'value': element.id, 'text': element.municipio.toUpperCase() + ' - ' + element.departamento.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Municipios. Intente más tarde. ' + err)
        })
      },
      async ocuparComboTiposDoc() {
        this.comboTiposDoc = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listatiposdocumentos')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Tipos Documento')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboTiposDoc.push({ 'value': element.id, 'text': element.documento.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Tipos Documento. Intente más tarde. ' + err)
        })
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
      async ocuparComboGeneros() {
        this.comboGeneros = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listageneros')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Generos')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboGeneros.push({ 'value': element.id, 'text': element.genero.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Generos. Intente más tarde. ' + err)
        })
      },
      async ocuparComboRhs() {
        this.comboRhs = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listarhs')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Rhs')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboRhs.push({ 'value': element.id, 'text': element.rh.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Rhs. Intente más tarde. ' + err)
        })
      },
      consultaUsuario() {
        this.formF.idPersona = this.datosUsuario.idPersona
        this.formF.documento = this.datosUsuario.documento
      },
      soloLetras(e) {
        let key = window.Event ? e.which : e.keyCode
        if (!((key >= 65 && key <= 90) || (key >= 97 && key <= 122) || (key == 193) || (key == 201) || (key == 205) || (key == 211) || (key == 218) || (key == 225) || (key == 233) || (key == 237) || (key == 243) || (key == 250) || (key == 192) || (key == 32) || (key == 8) || (key == 9) || (key == 37) || (key == 39))) {
            e.preventDefault()
        }
      },
      soloNumeros(e) {
        let key = window.Event ? e.which : e.keyCode
        if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key == 8) || (key == 9) || (key == 37) || (key == 39))) {
            e.preventDefault()
        }
      },
      iniciarVista() {
        if(this.$store.state.idRol == 5) {
          this.consultaUsuario()
          this.ocuparComboMunicipios()
          this.ocuparComboTiposDoc()
          this.ocuparComboDependencias()
          this.ocuparComboRoles()
          this.ocuparComboGeneros()
          this.ocuparComboRhs()
        } else {
          this.$router.push('/restringida')
        }
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.iniciarVista()
    }
  }
</script>
