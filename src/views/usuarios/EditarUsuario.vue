<template>
  <div>
    <CRow>
      <CCol>
        <b-row>  
          <b-col lg="3" md="6">
            <b-form-group label="Primer Apellido*" label-for="ape1">
              <b-form-input id="ape1" ref="ape1" v-model.trim="$v.infoFuncionario.apellido1.$model" :state="validateStateF('apellido1')" aria-describedby="feedApe1" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
              <b-form-invalid-feedback id="feedApe1" >Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3" md="6">
            <b-form-group label="Segundo Apellido" label-for="ape2">
              <b-form-input id="ape2" ref="ape2" v-model.trim="$v.infoFuncionario.apellido2.$model" :state="validateStateF('apellido2')" aria-describedby="feedApe2" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
              <b-form-invalid-feedback id="feedApe2">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3" md="6">
            <b-form-group label="Primer Nombre*" label-for="nom1">
              <b-form-input id="nom1" ref="nom1" v-model.trim="$v.infoFuncionario.nombre1.$model" :state="validateStateF('nombre1')" aria-describedby="feedNom1" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
              <b-form-invalid-feedback id="feedNom1">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3" md="6">
            <b-form-group label="Segundo Nombre" label-for="nom2">
              <b-form-input id="nom2" ref="nom2" v-model.trim="$v.infoFuncionario.nombre2.$model" :state="validateStateF('nombre2')" aria-describedby="feedNom2" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
              <b-form-invalid-feedback id="feedNom2">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3" md="6">
            <b-form-group label="Número de Documento*" label-for="doc">
              <b-form-input id="doc" ref="doc" v-model="$v.infoFuncionario.documento.$model" :state="validateStateF('documento')" aria-describedby="feedDoc" autocomplete="off" maxlength="20" disabled></b-form-input>
              <b-form-invalid-feedback id="feedDoc">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3" md="6">
            <b-form-group label="Tipo Documento*" label-for="tipoDoc">
              <b-form-select  id="tipoDoc" ref="tipoDoc" v-model="$v.infoFuncionario.id_tipo_documento.$model" :options="comboTiposDoc" :state="validateStateF('id_tipo_documento')" aria-describedby="feedTipoDoc"></b-form-select>
              <b-form-invalid-feedback id="feedTipoDoc">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="6" md="12">
            <b-form-group label="Municipio de Expedición del Documento*" label-for="muniDoc">
              <b-form-select  id="muniDoc" ref="muniDoc" v-model="$v.infoFuncionario.id_municipio_documento.$model" :options="comboMunicipios" :state="validateStateF('id_municipio_documento')" aria-describedby="feedMuniDoc"></b-form-select>
              <b-form-invalid-feedback id="feedMuniDoc">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="6" md="12">
            <b-form-group label="Fecha de Nacimiento*" label-for="fechaN">
              <b-form-input id="fechaN" ref="fechaN" type="date" v-model.trim="$v.infoFuncionario.fecha_nacimiento.$model" :state="validateStateF('fecha_nacimiento')" aria-describedby="feedFechaN"></b-form-input>
              <b-form-invalid-feedback id="feedFechaN" >Campo requerido.</b-form-invalid-feedback>            
            </b-form-group>
          </b-col>
          <b-col lg="3" md="6">
            <b-form-group label="Género*" label-for="genero">
              <b-form-select  id="genero" ref="genero" v-model="$v.infoFuncionario.id_genero.$model" :options="comboGeneros" :state="validateStateF('id_genero')" aria-describedby="feedGenero"></b-form-select>
              <b-form-invalid-feedback id="feedGenero">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3" md="6">
            <b-form-group label="Grupo y Factor RH*" label-for="rh">
              <b-form-select  id="rh" ref="rh" v-model="$v.infoFuncionario.id_rh.$model" :options="comboRhs" :state="validateStateF('id_rh')" aria-describedby="feedRh"></b-form-select>
              <b-form-invalid-feedback id="feedRh">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="6" md="12">
            <b-form-group label="Dirección de Residencia*" label-for="dir">
              <b-form-input id="dir" ref="dir" v-model.trim="$v.infoFuncionario.direccion.$model" :state="validateStateF('direccion')" aria-describedby="feedDir" autocomplete="off" maxlength="100"></b-form-input>
              <b-form-invalid-feedback id="feedDir" >Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="6" md="12">
            <b-form-group label="Municipio de Residencia*" label-for="muniRes">
              <b-form-select  id="muniRes" ref="muniRes" v-model="$v.infoFuncionario.id_municipio_direccion.$model" :options="comboMunicipios" :state="validateStateF('id_municipio_direccion')" aria-describedby="feedMuniRes"></b-form-select>
              <b-form-invalid-feedback id="feedMuniRes">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3" md="6">
            <b-form-group label="Teléfono Principal*" label-for="tel1">
              <b-form-input id="tel1" ref="tel1" v-model.trim="$v.infoFuncionario.telefono1.$model" :state="validateStateF('telefono1')" aria-describedby="feedTel1" autocomplete="off" maxlength="10" @keydown="soloNumeros"></b-form-input>
              <b-form-invalid-feedback id="feedTel1" >El número debe contener 10 dígitos.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3" md="6">
            <b-form-group label="Teléfono Opcional" label-for="tel2">
              <b-form-input id="tel2" ref="tel2" v-model.trim="$v.infoFuncionario.telefono2.$model" :state="validateStateF('telefono2')" aria-describedby="feedTel2" autocomplete="off" maxlength="10" @keydown="soloNumeros"></b-form-input>
              <b-form-invalid-feedback id="feedTel2" >El número debe contener 10 dígitos.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="6" md="12">
            <b-form-group label="Correo Electrónico*" label-for="correo">
              <b-form-input id="correo" ref="correo" v-model.trim="$v.infoFuncionario.correo.$model" :state="validateStateF('correo')" aria-describedby="feedCorreo" autocomplete="off" maxlength="50"></b-form-input>
              <b-form-invalid-feedback id="feedCorreo" >Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="6" md="12">
            <b-form-group label="Cargo*" label-for="cargo">
              <b-form-input id="cargo" ref="cargo" v-model.trim="$v.infoFuncionario.cargo.$model" :state="validateStateF('cargo')" aria-describedby="feedCargo" autocomplete="off" maxlength="50"></b-form-input>
              <b-form-invalid-feedback id="feedCargo" >Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="12" md="12"><hr></b-col>
          <b-col lg="12" md="12">
            <div class="float-right small text-medium-emphasis">* Campo requerido</div>
            <b-button class="small" variant="success" @click="validarDatosFuncionario">Actualizar Datos del Usuario</b-button>
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
  import { required, minLength } from "vuelidate/lib/validators";

  export default {
    name: 'EditarUsuario',
    mixins: [validationMixin],
    props: {
        datosFuncionario: Object
    },
    components: {
    },
    data () {
      return {
        infoFuncionario: {
          id: null,
          documento: null,
          id_tipo_documento: null,
          id_municipio_documento: null,
          nombre1: null,
          nombre2: null,
          apellido1: null,
          apellido2: null,
          fecha_nacimiento: null,
          id_genero: null,
          id_rh: null,
          direccion: null,
          id_municipio_direccion: null,
          telefono1: null,
          telefono2: null,
          correo: null,
          cargo: null,
          estado: null,
        },
        comboMunicipios: [],
        comboTiposDoc: [],
        comboGeneros: [],
        comboRhs: []
      }
    },
    validations: {
      infoFuncionario: {
        documento: { required },
        id_tipo_documento: { required },
        id_municipio_documento: { required },
        nombre1: { required },
        nombre2: { minLength: minLength(0) },
        apellido1: { required },
        apellido2: { minLength: minLength(0) },
        fecha_nacimiento: { required },
        id_genero: { required },
        id_rh: { required },
        direccion: { required },
        id_municipio_direccion: { required },
        telefono1: { required, minLength: minLength(10) },
        telefono2: { minLength: minLength(0) },
        correo: { required, minLength: minLength(5) },
        cargo: { required }
      }
    },
    methods: {
      cancelarFormulario() {
        this.$emit("retorno", 0)
      },
      validarDatosFuncionario() {
        this.$v.infoFuncionario.$touch()
        if (this.$v.infoFuncionario.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          this.$bvModal.msgBoxConfirm('¿Esta seguro de actualizar los datos del usuario?', {
            title: 'Actualizar Datos del Usuario',
            size: '',
            buttonSize: '',
            okVariant: 'success',
            okTitle: 'Si, Actualizar Datos del Usuario',
            cancelTitle: 'Cancelar',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          })
          .then(value => {
            if (value) {
              this.actualizarFuncionario()
            }
          })
        }
        return true
      },
      async actualizarFuncionario() {
        this.infoFuncionario.apellido1 = this.infoFuncionario.apellido1.toUpperCase()
        if (this.infoFuncionario.apellido2 == '' || this.infoFuncionario.apellido2 == null) {
          this.infoFuncionario.apellido2 = null
        } else {
          this.infoFuncionario.apellido2 = this.infoFuncionario.apellido2.toUpperCase()
        }
        this.infoFuncionario.nombre1 = this.infoFuncionario.nombre1.toUpperCase()
        if (this.infoFuncionario.nombre2 == '' || this.infoFuncionario.nombre2 == null) {
          this.infoFuncionario.nombre2 = null
        } else {
          this.infoFuncionario.nombre2 = this.infoFuncionario.nombre2.toUpperCase()
        }
        if (this.infoFuncionario.telefono2 == '' || this.infoFuncionario.telefono2 == null) {
          this.infoFuncionario.telefono2 == null
        }
        this.infoFuncionario.correo = this.infoFuncionario.correo.toLowerCase()
        this.infoFuncionario.cargo = this.infoFuncionario.cargo.toUpperCase()
        await axios
        .put(CONFIG.ROOT_PATH + 'personas/persona', JSON.stringify(this.infoFuncionario), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Funcionario')
          } else{
            this.$emit("retorno", 1)
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Funcionario. Intente más tarde. ' + err)
        })
      },
      consultaFuncionario() {
        this.infoFuncionario.id = this.datosFuncionario.idPersona
        this.infoFuncionario.documento = this.datosFuncionario.documento
        this.infoFuncionario.id_tipo_documento = this.datosFuncionario.id_tipo_documento
        this.infoFuncionario.id_municipio_documento = this.datosFuncionario.id_municipio_documento
        this.infoFuncionario.nombre1 = this.datosFuncionario.nombre1
        this.infoFuncionario.nombre2 = this.datosFuncionario.nombre2
        this.infoFuncionario.apellido1 = this.datosFuncionario.apellido1
        this.infoFuncionario.apellido2 = this.datosFuncionario.apellido2
        this.infoFuncionario.fecha_nacimiento = this.datosFuncionario.fecha_nacimiento
        if (this.datosFuncionario.fecha_nacimiento != null) {
          this.infoFuncionario.fecha_nacimiento = this.datosFuncionario.fecha_nacimiento.substr(0,10)
        }
        this.infoFuncionario.id_genero = this.datosFuncionario.id_genero
        this.infoFuncionario.id_rh = this.datosFuncionario.id_rh
        this.infoFuncionario.direccion = this.datosFuncionario.direccion
        this.infoFuncionario.id_municipio_direccion = this.datosFuncionario.id_municipio_direccion
        this.infoFuncionario.telefono1 = this.datosFuncionario.telefono1
        this.infoFuncionario.telefono2 = this.datosFuncionario.telefono2
        this.infoFuncionario.correo = this.datosFuncionario.correo
        this.infoFuncionario.cargo = this.datosFuncionario.cargo
        this.infoFuncionario.estado = this.datosFuncionario.estado
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
      validateStateF(name) {
        const { $dirty, $error } = this.$v.infoFuncionario[name]
        return $dirty ? !$error : null
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
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.consultaFuncionario()
      this.ocuparComboTiposDoc()
      this.ocuparComboMunicipios()
      this.ocuparComboGeneros()
      this.ocuparComboRhs()
    },
    computed: {
    }
  }
</script>
