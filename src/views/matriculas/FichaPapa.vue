<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> DATOS DEL PAPÁ</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <div v-if="btnCargando">
                  <div class="text-center m-5 text-primary">
                    <b-spinner style="width: 3rem; height: 3rem;" label="Spinner"></b-spinner>
                    <br><strong>Cargando informe...</strong>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row v-if="!btnCargando">
              <b-col lg="3" md="6">
                <b-form-group label="Número de Documento*" label-for="doc" class="etiqueta">
                  <b-input-group>
                    <b-form-input id="doc" ref="doc" v-model="$v.infoPapa.documento.$model" :state="validateStateD('documento')" aria-describedby="feedDoc" autocomplete="off" maxlength="50" @keydown="soloNumerosLetras" @blur="buscarDocumentoPapa()"></b-form-input>
                    <b-input-group-append>
                      <b-button variant="primary" @click="buscarDocumentoPapa()">Buscar</b-button>
                    </b-input-group-append>
                    <b-form-invalid-feedback id="feedDoc">Campo requerido.</b-form-invalid-feedback>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Tipo Documento*" label-for="tipoDoc" class="etiqueta">
                  <b-form-select  id="tipoDoc" ref="tipoDoc" v-model="$v.infoPapa.id_tipo_documento.$model" :options="comboTiposDoc" :state="validateStateD('id_tipo_documento')" aria-describedby="feedTipoDoc"></b-form-select>
                  <b-form-invalid-feedback id="feedTipoDoc">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Municipio de Expedición del Documento*" label-for="muniDoc" class="etiqueta">
                  <b-form-select  id="muniDoc" ref="muniDoc" v-model="$v.infoPapa.id_municipio_documento.$model" :options="comboMunicipios" :state="validateStateD('id_municipio_documento')" aria-describedby="feedMuniDoc"></b-form-select>
                  <b-form-invalid-feedback id="feedMuniDoc">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Primer Apellido*" label-for="ape1" class="etiqueta">
                  <b-form-input id="ape1" ref="ape1" v-model.trim="$v.infoPapa.apellido1.$model" :state="validateStateD('apellido1')" aria-describedby="feedApe1" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                  <b-form-invalid-feedback id="feedApe1" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Segundo Apellido" label-for="ape2" class="etiqueta">
                  <b-form-input id="ape2" ref="ape2" v-model.trim="$v.infoPapa.apellido2.$model" :state="validateStateD('apellido2')" aria-describedby="feedApe2" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                  <b-form-invalid-feedback id="feedApe2">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Primer Nombre*" label-for="nom1" class="etiqueta">
                  <b-form-input id="nom1" ref="nom1" v-model.trim="$v.infoPapa.nombre1.$model" :state="validateStateD('nombre1')" aria-describedby="feedNom1" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                  <b-form-invalid-feedback id="feedNom1">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Segundo Nombre" label-for="nom2" class="etiqueta">
                  <b-form-input id="nom2" ref="nom2" v-model.trim="$v.infoPapa.nombre2.$model" :state="validateStateD('nombre2')" aria-describedby="feedNom2" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                  <b-form-invalid-feedback id="feedNom2">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Fecha de Nacimiento*" label-for="fechaN" class="etiqueta">
                  <b-form-input id="fechaN" ref="fechaN" type="date" v-model.trim="$v.infoPapa.fecha_nacimiento.$model" :state="validateStateD('fecha_nacimiento')" aria-describedby="feedFechaN"></b-form-input>
                  <b-form-invalid-feedback id="feedFechaN" >Campo requerido.</b-form-invalid-feedback>            
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Nacionalidad*" label-for="nacional" class="etiqueta">
                  <b-form-select  id="nacional" ref="nacional" v-model="$v.infoPapa.id_nacionalidad.$model" :options="comboPaises" :state="validateStateD('id_nacionalidad')" aria-describedby="feedNal" @change="habilitaMunicipioNace"></b-form-select>
                  <b-form-invalid-feedback id="feedNal">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="6">
                <b-form-group label="Municipio de Nacimiento*" label-for="muniNace" class="etiqueta">
                  <b-form-select  id="muniNace" ref="muniNace" v-model="$v.infoPapa.id_municipio_nacimiento.$model" :options="comboMunicipios" :state="validateStateD('id_municipio_nacimiento')" aria-describedby="feedMuniNaceA" :disabled="deshabMunNace"></b-form-select>
                  <b-form-invalid-feedback id="feedMuniNace">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Dirección de Residencia*" label-for="dir" class="etiqueta">
                  <b-form-input id="dir" ref="dir" v-model.trim="$v.infoPapa.direccion.$model" :state="validateStateD('direccion')" aria-describedby="feedDir" autocomplete="off" maxlength="100"></b-form-input>
                  <b-form-invalid-feedback id="feedDir" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Municipio de Residencia*" label-for="muniRes" class="etiqueta">
                  <b-form-select  id="muniRes" ref="muniRes" v-model="$v.infoPapa.id_municipio_direccion.$model" :options="comboMunicipios" :state="validateStateD('id_municipio_direccion')" aria-describedby="feedMuniRes"></b-form-select>
                  <b-form-invalid-feedback id="feedMuniRes">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Teléfono Principal*" label-for="tel1" class="etiqueta">
                  <b-form-input id="tel1" ref="tel1" v-model.trim="$v.infoPapa.telefono1.$model" :state="validateStateD('telefono1')" aria-describedby="feedTel1" autocomplete="off" maxlength="15" @keydown="soloNumeros"></b-form-input>
                  <b-form-invalid-feedback id="feedTel1" >El número debe contener 10 dígitos.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Teléfono Opcional" label-for="tel2" class="etiqueta">
                  <b-form-input id="tel2" ref="tel2" v-model.trim="$v.infoPapa.telefono2.$model" :state="validateStateD('telefono2')" aria-describedby="feedTel2" autocomplete="off" maxlength="15" @keydown="soloNumeros"></b-form-input>
                  <b-form-invalid-feedback id="feedTel2" >El número debe contener 10 dígitos.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Correo Electrónico*" label-for="correo" class="etiqueta">
                  <b-form-input id="correo" ref="correo" v-model.trim="$v.infoPapa.correo.$model" :state="validateStateD('correo')" aria-describedby="feedCorreo" autocomplete="off" maxlength="100"></b-form-input>
                  <b-form-invalid-feedback id="feedCorreo" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="6">
                <b-form-group label="Ocupación Laboral" label-for="ocupacion" class="etiqueta">
                  <b-form-input id="ocupacion" ref="ocupacion" v-model.trim="infoPapa.ocupacion" aria-describedby="feedOcupacion" autocomplete="on" maxlength="100"></b-form-input>
                  <b-form-invalid-feedback id="feedOcupacion" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <div class="float-right text-medium-emphasis text-info">* Campo requerido</div>
            <div>
              <b-button class="small" variant="primary" @click="validarDatosFormulario">Actualizar Datos del Papá</b-button>
              <b-button class="small ml-3" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
            </div>
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
  import { uuid } from 'vue-uuid'

  export default {
    name: 'fichapapa',
    mixins: [validationMixin],
    props: {
      datosPapa: Object
    },
    components: {},
    data () {
      return {
        infoPapa: {
          documento: null,
          id_tipo_documento: null,
          id_municipio_documento: null,
          nombre1: null,
          nombre2: null,
          apellido1: null,
          apellido2: null,
          fecha_nacimiento: null,
          id_municipio_nacimiento: null,
          id_nacionalidad: null,
          direccion: null,
          id_municipio_direccion: null,
          telefono1: null,
          telefono2: null,
          correo: null,
          ocupacion: null,
          idPapa: null,
          idEstudiante: null
        },
        btnCargando: false,
        comboTiposDoc: [],
        comboMunicipios: [],
        comboGeneros: [],
        comboPaises: [],
        papaExiste: true,
        deshabMunNace: false
      }
    },
    validations: {
      infoPapa: {
        documento: { minLength: minLength(6) },
        id_tipo_documento: { required },
        id_municipio_documento: { required },
        id_nacionalidad: { required },
        id_municipio_nacimiento: { required },
        nombre1: { required },
        nombre2: { minLength: minLength(0) },
        apellido1: { required },
        apellido2: { minLength: minLength(0) },
        fecha_nacimiento: { required },
        direccion: { required },
        id_municipio_direccion: { required },
        telefono1: { required, minLength: minLength(10) },
        telefono2: { minLength: minLength(0) },
        correo: { required, minLength: minLength(5) }
      }
    },
    methods: {
      habilitaMunicipioNace() {
        if (this.infoPapa.id_nacionalidad == '170') {
          this.infoPapa.id_municipio_nacimiento = null
          this.deshabMunNace = false
        } else {
          this.infoPapa.id_municipio_nacimiento='00000'
          this.deshabMunNace = true
        }
      },
      async buscarDocumentoPapa() {
        this.papaExiste = false
        this.deshabMunNace = false
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/matriculas/buscardocumentopersona', { params: { documento: this.infoPapa.documento }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Buscar documento persona')
          } else{
            if (response.data.datos != 0) {
              this.infoPapa.idPapa = response.data.datos.id
              this.infoPapa.apellido1 = response.data.datos.apellido1
              this.infoPapa.apellido2 = response.data.datos.apellido2
              this.infoPapa.nombre1 = response.data.datos.nombre1
              this.infoPapa.nombre2 = response.data.datos.nombre2
              this.infoPapa.documento = response.data.datos.documento
              this.infoPapa.id_tipo_documento = response.data.datos.id_tipo_documento
              this.infoPapa.id_municipio_documento = response.data.datos.id_municipio_documento
              if (response.data.datos.fecha_nacimiento!=null) {
                this.infoPapa.fecha_nacimiento = response.data.datos.fecha_nacimiento.substr(0,10)
              } else {
                this.infoPapa.fecha_nacimiento = null
              }
              this.infoPapa.id_nacionalidad = response.data.datos.id_nacionalidad
              this.infoPapa.id_municipio_nacimiento = response.data.datos.id_municipio_nacimiento
              this.infoPapa.direccion = response.data.datos.direccion
              this.infoPapa.id_municipio_direccion = response.data.datos.id_municipio_direccion
              this.infoPapa.telefono1 = response.data.datos.telefono1
              this.infoPapa.telefono2 = response.data.datos.telefono2
              this.infoPapa.correo = response.data.datos.correo
              this.infoPapa.ocupacion = response.data.datos.ocupacion
              this.infoPapa.idEstudiante = this.datosPapa.idEstudiante
              this.papaExiste = true
            } else {
              this.infoPapa.idPapa = uuid.v1()
              this.infoPapa.id_tipo_documento = 1
              this.infoPapa.id_municipio_documento = '15001'
              this.infoPapa.nombre1 = null
              this.infoPapa.nombre2 = null
              this.infoPapa.apellido1 = null
              this.infoPapa.apellido2 = null
              this.infoPapa.fecha_nacimiento = null
              this.infoPapa.id_municipio_nacimiento = '15001'
              this.infoPapa.id_nacionalidad = '170'
              this.infoPapa.direccion = null
              this.infoPapa.id_municipio_direccion = '15001'
              this.infoPapa.telefono1 = null
              this.infoPapa.telefono2 = null
              this.infoPapa.correo = null
              this.infoPapa.ocupacion = null
              this.infoPapa.idEstudiante = this.datosPapa.idEstudiante
              this.papaExiste = false
            }
            if (this.infoPapa.id_nacionalidad != '170') {
              this.infoPapa.id_municipio_nacimiento = '00000'
              this.deshabMunNace = true
            }
          }
        })
        .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Buscar documento persona. Intente más tarde. ' + err)
        })
      },
      validarDatosFormulario() {
        this.$v.infoPapa.$touch()
        if (this.$v.infoPapa.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          let titulo = 'Actualizar Datos del Papá'
          let pregunta = '¿Esta seguro de Actualizar los Datos del Papá?'
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
              this.guardarDatosPapa()
            }
          })
        }
        return true
      },
      async guardarDatosPapa() {
        this.infoPapa.apellido1 = this.infoPapa.apellido1.toUpperCase()
        if (this.infoPapa.apellido2 == '' || this.infoPapa.apellido2 == null) {
          this.infoPapa.apellido2 = null
        } else {
          this.infoPapa.apellido2 = this.infoPapa.apellido2.toUpperCase()
        }
        this.infoPapa.nombre1 = this.infoPapa.nombre1.toUpperCase()
        if (this.infoPapa.nombre2 == '' || this.infoPapa.nombre2 == null) {
          this.infoPapa.nombre2 = null
        } else {
          this.infoPapa.nombre2 = this.infoPapa.nombre2.toUpperCase()
        }
        if (this.infoPapa.telefono2 == '' || this.infoPapa.telefono2 == null) {
          this.infoPapa.telefono2 == null
        }
        if (this.infoPapa.ocupacion == '' || this.infoPapa.ocupacion == null) {
          this.infoPapa.ocupacion = null
        } else {
          this.infoPapa.ocupacion = this.infoPapa.ocupacion.toUpperCase()
        }
        this.infoPapa.correo = this.infoPapa.correo.toLowerCase()
        this.infoPapa.papaExiste = this.papaExiste
        await axios
        .post(CONFIG.ROOT_PATH + 'academico/papa', JSON.stringify(this.infoPapa), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Papá')
          } else{
            this.$emit("retorno", 1)
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Papá. Intente más tarde. ' + err)
        })
      },
      async consultaDatosPapaId() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/papas', { params: { idPapa: this.datosPapa.idPapa }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Datos Papá')
          } else{
            if (response.data.datos != 0) {
              this.infoPapa = response.data.datos
              if (this.infoPapa.fecha_nacimiento != null && this.infoPapa.fecha_nacimiento != '') {
                this.infoPapa.fecha_nacimiento = this.infoPapa.fecha_nacimiento.substr(0,10)
              }
              this.papaExiste = true
            } else {
              this.infoPapa.documento = null
              this.infoPapa.id_tipo_documento = 1
              this.infoPapa.id_municipio_documento = '15001'
              this.infoPapa.nombre1 = null
              this.infoPapa.nombre2 = null
              this.infoPapa.apellido1 = null
              this.infoPapa.apellido2 = null
              this.infoPapa.fecha_nacimiento = null
              this.infoPapa.id_municipio_nacimiento = '15001'
              this.infoPapa.id_nacionalidad = '170'
              this.infoPapa.direccion = null
              this.infoPapa.id_municipio_direccion = '15001'
              this.infoPapa.telefono1 = null
              this.infoPapa.telefono2 = null
              this.infoPapa.correo = null
              this.infoPapa.ocupacion = null
              this.papaExiste = false
            }
            this.infoPapa.idPapa = this.datosPapa.idPapa
            this.infoPapa.idEstudiante = this.datosPapa.idEstudiante
            if (this.infoPapa.id_nacionalidad != '170') {
              this.infoPapa.id_municipio_nacimiento = '00000'
              this.deshabMunNace = true
            }
          }
        })
        .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Datos Papá. Intente más tarde. ' + err)
        })
      },
      async cargarCatalogos() {
        this.btnCargando = true
        this.comboGeneros = [{'value': 'F', 'text': 'FEMENINO'}, {'value': 'M', 'text': 'MASCULINO'}]
        this.comboTiposDoc = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/tiposdocumentos')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta datos tiposdocumentos')
            this.btnCargando = false
          } else {
            if(response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboTiposDoc.push({ 'value': element.id, 'text': element.tipodocumento.toUpperCase() })
              })
              console.log('tiposdocumentos cargadas...')
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta datos tiposdocumentos. Intente más tarde. ' + err)
          this.btnCargando = false
        })
        this.comboMunicipios = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/municipios')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta datos municipios')
            this.btnCargando = false
          } else {
            if(response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboMunicipios.push({ 'value': element.id, 'text': element.municipio.toUpperCase() + ' - ' + element.departamento.toUpperCase() })
              })
              console.log('municipios cargadas...')
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta datos municipios. Intente más tarde. ' + err)
          this.btnCargando = false
        })
        this.comboPaises = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/paises') 
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta datos paises')
            this.btnCargando = false
          } else {
            if(response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboPaises.push({ 'value': element.id, 'text': element.pais.toUpperCase() })
              })
              console.log('paises cargadas...')
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta datos paises. Intente más tarde. ' + err)
          this.btnCargando = false
        })
        this.btnCargando = false
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
      soloNumerosLetras(e) {
        let key = window.Event ? e.which : e.keyCode
        if (!((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 96 && key <= 122) || (key == 193) || (key == 201) || (key == 205) || (key == 211) || (key == 218) || (key == 225) || (key == 233) || (key == 237) || (key == 243) || (key == 250) || (key == 192) || (key == 32) || (key == 8) || (key == 9) || (key == 37) || (key == 39))) {
            e.preventDefault()
        }
      },
      cancelarFormulario() {
        this.$emit("retorno", 0)
      },
      validateStateD(name) {
        const { $dirty, $error } = this.$v.infoPapa[name]
        return $dirty ? !$error : null
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.cargarCatalogos()
      this.consultaDatosPapaId()
    }
  }
</script>