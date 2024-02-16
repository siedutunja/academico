<template>
  <div>
    <CRow>
      <CCol>
        <b-row>
          <b-col lg="3" md="6">
            <b-form-group label="Código Dane*" label-for="dane">
              <b-form-input id="dane" ref="dane" v-model="infoColegio.dane" disabled></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="3" md="6">
            <b-form-group label="Número Nit*" label-for="nit">
              <b-form-input id="nit" ref="nit" v-model="$v.infoColegio.nit.$model" :state="validateState('nit')" aria-describedby="feedNit" autocomplete="off" maxlength="15" @keydown="soloNit"></b-form-input>
              <b-form-invalid-feedback id="feedNit">El número Nit debe contener mínimo 10 caracteres.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3" md="6">
            <b-form-group label="Sector*" label-for="sector">
              <b-form-select  id="sector" ref="sector" v-model="$v.infoColegio.id_sector.$model" :options="comboSectores" :state="validateState('id_sector')" aria-describedby="feedSector"></b-form-select>
              <b-form-invalid-feedback id="feedSector">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3" md="6">
            <b-form-group label="Zona*" label-for="zona">
              <b-form-select  id="zona" ref="zona" v-model="$v.infoColegio.id_zona.$model" :options="comboZonas" :state="validateState('id_zona')" aria-describedby="feedZona"></b-form-select>
              <b-form-invalid-feedback id="feedZona">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="12" md="12">
            <b-form-group label="Nombre de la Institución*" label-for="cole">
              <b-form-input id="cole" ref="cole" v-model.trim="$v.infoColegio.institucion.$model" :state="validateState('institucion')" aria-describedby="feedNombre" autocomplete="off" maxlength="100"></b-form-input>
              <b-form-invalid-feedback id="feedNombre" >Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="6" md="12">
            <b-form-group label="Nombre Corto*" label-for="nemo">
              <b-form-input id="nemo" ref="nemo" v-model.trim="$v.infoColegio.nemo.$model" :state="validateState('nemo')" aria-describedby="feedNemo" autocomplete="off" maxlength="30"></b-form-input>
              <b-form-invalid-feedback id="feedNemo">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="6" md="12">
            <b-form-group label="Municipio*" label-for="muni">
              <b-form-select  id="muni" ref="muni" v-model="$v.infoColegio.id_municipio.$model" :options="comboMunicipios" :state="validateState('id_municipio')" aria-describedby="feedMuni" disabled></b-form-select>
              <b-form-invalid-feedback id="feedMuni">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="6" md="12">
            <b-form-group label="Dirección*" label-for="dir">
              <b-form-input id="dir" ref="dir" v-model.trim="$v.infoColegio.direccion.$model" :state="validateState('direccion')" aria-describedby="feedDir" autocomplete="off" maxlength="100"></b-form-input>
              <b-form-invalid-feedback id="feedDir">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="6" md="12">
            <b-form-group label="Barrio/Vereda*" label-for="barrio">
              <b-form-input id="barrio" ref="barrio" v-model.trim="$v.infoColegio.barrio.$model" :state="validateState('barrio')" aria-describedby="feedBarrio" autocomplete="off" maxlength="50"></b-form-input>
              <b-form-invalid-feedback id="feedBarrio">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3" md="6">
            <b-form-group label="Teléfono Principal*" label-for="tel1">
              <b-form-input id="tel1" ref="tel1" v-model.trim="$v.infoColegio.telefono1.$model" :state="validateState('telefono1')" aria-describedby="feedTel1" autocomplete="off" maxlength="10" @keydown="soloNumeros"></b-form-input>
              <b-form-invalid-feedback id="feedTel1">El número debe contener 10 dígitos.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3" md="6">
            <b-form-group label="Teléfono Opcional" label-for="tel2">
              <b-form-input id="tel2" ref="tel2" v-model.trim="$v.infoColegio.telefono2.$model" :state="validateState('telefono2')" aria-describedby="feedTel2" autocomplete="off" maxlength="10" @keydown="soloNumeros"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="6" md="12">
            <b-form-group label="Correo Electrónico*" label-for="correo">
              <b-form-input id="correo" ref="correo" v-model.trim="$v.infoColegio.correo.$model" :state="validateState('correo')" aria-describedby="feedCorreo" autocomplete="off" maxlength="50"></b-form-input>
              <b-form-invalid-feedback id="feedCorreo">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <!--
          <b-col lg="3" md="6">
            <b-form-group label="Latitud" label-for="lat">
              <b-form-input id="lat" ref="lat" v-model.trim="$v.infoColegio.latitud.$model" :state="validateState('latitud')" aria-describedby="feedLat" autocomplete="off" maxlength="50" @keydown="soloCoordenadas"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="3" md="6">
            <b-form-group label="Longitud" label-for="lon">
              <b-form-input id="lon" ref="lon" v-model.trim="$v.infoColegio.longitud.$model" :state="validateState('longitud')" aria-describedby="feedLon" autocomplete="off" maxlength="50" @keydown="soloCoordenadas"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="6" md="12">
            <b-form-group label="Estado*" label-for="estado">
              <b-form-select  id="estado" ref="estado" v-model="$v.infoColegio.estado.$model" :options="comboEstados" :state="validateState('estado')" aria-describedby="feedEstado"></b-form-select>
              <b-form-invalid-feedback id="feedEstado">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="12" md="12">
            <b-form-group label="Mapa" label-for="mapa">
              <b-form-input id="mapa" ref="mapa" v-model.trim="infoColegio.mapa" autocomplete="off"></b-form-input>
            </b-form-group>
          </b-col>
          -->
          <b-col lg="12"><hr></b-col>
          <b-col lg="12">
            <div class="float-right small text-medium-emphasis">* Campo requerido</div>
            <b-button class="small" variant="success" @click="validarDatosColegio">Actualizar Datos de la Institución Educativa</b-button>
            <b-button class="small mx-3" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
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
        datosColegio: Object
    },
    components: {
    },
    data () {
      return {
        infoColegio: {
          id: null,
          dane: null,
          nit: null,
          institucion: null,
          id_tipo_institucion: null,
          nemo: null,
          direccion: null,
          barrio: null,
          id_municipio: null,
          telefono1: null,
          telefono2: null,
          id_sector: null,
          id_zona: null,
          correo: null,
          estado: null,
          latitud: null,
          longitud: null,
          mapa: null,
          escudo: null
        },
        comboMunicipios: [],
        comboSectores: [],
        comboZonas: [],
        comboEstados: []
      }
    },
    validations: {
      infoColegio: {
        nit: { required, minLength: minLength(10) },
        institucion: { required, minLength: minLength(10) },
        nemo: { required, minLength: minLength(10) },
        direccion: { required, minLength: minLength(5) },
        barrio: { required, minLength: minLength(5) },
        id_municipio: { required },
        telefono1: { required, minLength: minLength(10) },
        telefono2: { minLength: minLength(0) },
        id_sector: { required },
        id_zona: { required },
        correo: { required, minLength: minLength(5) },
        latitud: { minLength: minLength(0) },
        longitud: { minLength: minLength(0) },
        estado: { required }
      }
    },
    methods: {
      cancelarFormulario() {
        this.$emit("retorno", 0)
      },
      validarDatosColegio() {
        this.$v.infoColegio.$touch()
        if (this.$v.infoColegio.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          this.$bvModal.msgBoxConfirm('¿Esta seguro de actualizar los datos del Colegio?', {
            title: 'Actualizar Datos del Colegio',
            size: '',
            buttonSize: '',
            okVariant: 'success',
            okTitle: 'Si, Actualizar Datos del Colegio',
            cancelTitle: 'Cancelar',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          })
          .then(value => {
            if (value) {
              this.actualizarColegio()
            }
          })
        }
        return true
      },
      async actualizarColegio() {
        this.infoColegio.institucion = this.infoColegio.institucion.toUpperCase()
        this.infoColegio.nemo = this.infoColegio.nemo.toUpperCase()
        this.infoColegio.barrio = this.infoColegio.barrio.toUpperCase()
        if (this.infoColegio.telefono2 == '' || this.infoColegio.telefono2 == null) {
          this.infoColegio.telefono2 = null
        }
        this.infoColegio.correo = this.infoColegio.correo.toLowerCase()
        if (this.infoColegio.latitud == '' || this.infoColegio.latitud == null) {
          this.infoColegio.latitud = null
        }
        if (this.infoColegio.longitud == '' || this.infoColegio.longitud == null) {
          this.infoColegio.longitud = null
        }
        await axios
        .put(CONFIG.ROOT_PATH + 'colegios', JSON.stringify(this.infoColegio), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Colegio')
          } else{
            this.$emit("retorno", 1)
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Colegio. Intente más tarde. ' + err)
        })
      },
      async ocuparComboSectores() {
        this.comboSectores = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listasectores')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Sectores')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboSectores.push({ 'value': element.id, 'text': element.sector.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Sectores. Intente más tarde. ' + err)
        })
      },
      async ocuparComboZonas() {
        this.comboZonas = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listazonas')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Zonas')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboZonas.push({ 'value': element.id, 'text': element.zona.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Zonas. Intente más tarde. ' + err)
        })
      },
      async ocuparComboEstados() {
        this.comboEstados = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listaestadosinstituciones')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Estados Instituciones')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboEstados.push({ 'value': element.id, 'text': element.estado.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Estados Instituciones. Intente más tarde. ' + err)
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
      validateState(name) {
        const { $dirty, $error } = this.$v.infoColegio[name]
        return $dirty ? !$error : null
      },
      soloNumeros(e) {
          let key = window.Event ? e.which : e.keyCode
          if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key == 8) || (key == 9) || (key == 37) || (key == 39))) {
              e.preventDefault()
          }
      },
      soloNit(e) {
          let key = window.Event ? e.which : e.keyCode
          if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key == 8) || (key == 9) || (key == 37) || (key == 39) || (key == 109) || (key == 110) || (key == 189) || (key == 190))) {
              e.preventDefault()
          }
      },
      soloCoordenadas(e) {
          let key = window.Event ? e.which : e.keyCode
          if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key == 8) || (key == 9) || (key == 37) || (key == 39) || (key == 109) || (key == 110) || (key == 189) || (key == 190))) {
              e.preventDefault()
          }
      },
      consultaColegio() {
        this.infoColegio.id = this.datosColegio.id
        this.infoColegio.dane = this.datosColegio.dane
        this.infoColegio.nit = this.datosColegio.nit
        this.infoColegio.id_tipo_institucion = this.datosColegio.id_tipo_institucion
        this.infoColegio.institucion = this.datosColegio.institucion
        this.infoColegio.nemo = this.datosColegio.nemo
        this.infoColegio.direccion = this.datosColegio.direccion
        this.infoColegio.barrio = this.datosColegio.barrio
        this.infoColegio.id_municipio = this.datosColegio.id_municipio
        this.infoColegio.fecha_nacimiento = this.datosColegio.fecha_nacimiento
        this.infoColegio.telefono1 = this.datosColegio.telefono1
        this.infoColegio.telefono2 = this.datosColegio.telefono2
        this.infoColegio.id_sector = this.datosColegio.id_sector
        this.infoColegio.id_zona = this.datosColegio.id_zona
        this.infoColegio.correo = this.datosColegio.correo
        this.infoColegio.estado = this.datosColegio.estado
        this.infoColegio.latitud = this.datosColegio.latitud
        this.infoColegio.longitud = this.datosColegio.longitud
        this.infoColegio.mapa = this.datosColegio.mapa
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.consultaColegio()
      this.ocuparComboMunicipios()
      this.ocuparComboSectores()
      this.ocuparComboZonas()
      this.ocuparComboEstados()
    },
    computed: {
    }
  }
</script>
