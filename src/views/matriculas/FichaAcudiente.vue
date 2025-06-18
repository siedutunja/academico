<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> DATOS DEL ACUDIENTE</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="3" md="6">
                <b-form-group label="Número de Documento*" label-for="doc" class="etiqueta">
                  <b-input-group>
                    <b-form-input id="doc" ref="doc" v-model="$v.infoAcudiente.documento.$model" :state="validateStateD('documento')" aria-describedby="feedDoc" autocomplete="off" maxlength="50" @keydown="soloNumerosLetras" @blur="buscarDocumentoAcudiente()"></b-form-input>
                    <b-input-group-append>
                      <b-button variant="primary" @click="buscarDocumentoAcudiente()">Buscar</b-button>
                    </b-input-group-append>
                    <b-form-invalid-feedback id="feedDoc">Campo requerido.</b-form-invalid-feedback>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Tipo Documento*" label-for="tipoDoc" class="etiqueta">
                  <b-form-select  id="tipoDoc" ref="tipoDoc" v-model="$v.infoAcudiente.id_tipo_documento.$model" :options="comboTiposDoc" :state="validateStateD('id_tipo_documento')" aria-describedby="feedTipoDoc"></b-form-select>
                  <b-form-invalid-feedback id="feedTipoDoc">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Municipio de Expedición del Documento*" label-for="muniDoc" class="etiqueta">
                  <b-form-select  id="muniDoc" ref="muniDoc" v-model="$v.infoAcudiente.id_municipio_documento.$model" :options="comboMunicipios" :state="validateStateD('id_municipio_documento')" aria-describedby="feedMuniDoc"></b-form-select>
                  <b-form-invalid-feedback id="feedMuniDoc">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Primer Apellido*" label-for="ape1" class="etiqueta">
                  <b-form-input id="ape1" ref="ape1" v-model.trim="$v.infoAcudiente.apellido1.$model" :state="validateStateD('apellido1')" aria-describedby="feedApe1" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                  <b-form-invalid-feedback id="feedApe1" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Segundo Apellido" label-for="ape2" class="etiqueta">
                  <b-form-input id="ape2" ref="ape2" v-model.trim="$v.infoAcudiente.apellido2.$model" :state="validateStateD('apellido2')" aria-describedby="feedApe2" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                  <b-form-invalid-feedback id="feedApe2">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Primer Nombre*" label-for="nom1" class="etiqueta">
                  <b-form-input id="nom1" ref="nom1" v-model.trim="$v.infoAcudiente.nombre1.$model" :state="validateStateD('nombre1')" aria-describedby="feedNom1" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                  <b-form-invalid-feedback id="feedNom1">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Segundo Nombre" label-for="nom2" class="etiqueta">
                  <b-form-input id="nom2" ref="nom2" v-model.trim="$v.infoAcudiente.nombre2.$model" :state="validateStateD('nombre2')" aria-describedby="feedNom2" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                  <b-form-invalid-feedback id="feedNom2">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Fecha de Nacimiento*" label-for="fechaN" class="etiqueta">
                  <b-form-input id="fechaN" ref="fechaN" type="date" v-model.trim="$v.infoAcudiente.fecha_nacimiento.$model" :state="validateStateD('fecha_nacimiento')" aria-describedby="feedFechaN"></b-form-input>
                  <b-form-invalid-feedback id="feedFechaN" >Campo requerido.</b-form-invalid-feedback>            
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Nacionalidad*" label-for="nacional" class="etiqueta">
                  <b-form-select  id="nacional" ref="nacional" v-model="$v.infoAcudiente.id_nacionalidad.$model" :options="comboPaises" :state="validateStateD('id_nacionalidad')" aria-describedby="feedNal" @change="habilitaMunicipioNace"></b-form-select>
                  <b-form-invalid-feedback id="feedNal">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="6">
                <b-form-group label="Municipio de Nacimiento*" label-for="muniNace" class="etiqueta">
                  <b-form-select  id="muniNace" ref="muniNace" v-model="$v.infoAcudiente.id_municipio_nacimiento.$model" :options="comboMunicipios" :state="validateStateD('id_municipio_nacimiento')" aria-describedby="feedMuniNaceA" :disabled="deshabMunNace"></b-form-select>
                  <b-form-invalid-feedback id="feedMuniNace">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Dirección de Residencia*" label-for="dir" class="etiqueta">
                  <b-form-input id="dir" ref="dir" v-model.trim="$v.infoAcudiente.direccion.$model" :state="validateStateD('direccion')" aria-describedby="feedDir" autocomplete="off" maxlength="100"></b-form-input>
                  <b-form-invalid-feedback id="feedDir" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Municipio de Residencia*" label-for="muniRes" class="etiqueta">
                  <b-form-select  id="muniRes" ref="muniRes" v-model="$v.infoAcudiente.id_municipio_direccion.$model" :options="comboMunicipios" :state="validateStateD('id_municipio_direccion')" aria-describedby="feedMuniRes"></b-form-select>
                  <b-form-invalid-feedback id="feedMuniRes">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Teléfono Principal*" label-for="tel1" class="etiqueta">
                  <b-form-input id="tel1" ref="tel1" v-model.trim="$v.infoAcudiente.telefono1.$model" :state="validateStateD('telefono1')" aria-describedby="feedTel1" autocomplete="off" maxlength="15" @keydown="soloNumeros"></b-form-input>
                  <b-form-invalid-feedback id="feedTel1" >El número debe contener 10 dígitos.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Teléfono Opcional" label-for="tel2" class="etiqueta">
                  <b-form-input id="tel2" ref="tel2" v-model.trim="$v.infoAcudiente.telefono2.$model" :state="validateStateD('telefono2')" aria-describedby="feedTel2" autocomplete="off" maxlength="15" @keydown="soloNumeros"></b-form-input>
                  <b-form-invalid-feedback id="feedTel2" >El número debe contener 10 dígitos.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Correo Electrónico*" label-for="correo" class="etiqueta">
                  <b-form-input id="correo" ref="correo" v-model.trim="$v.infoAcudiente.correo.$model" :state="validateStateD('correo')" aria-describedby="feedCorreo" autocomplete="off" maxlength="100"></b-form-input>
                  <b-form-invalid-feedback id="feedCorreo" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="6">
                <b-form-group label="Ocupación Laboral" label-for="ocupacion" class="etiqueta">
                  <b-form-input id="ocupacion" ref="ocupacion" v-model.trim="infoAcudiente.ocupacion" aria-describedby="feedOcupacion" autocomplete="on" maxlength="100"></b-form-input>
                  <b-form-invalid-feedback id="feedOcupacion" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="12" md="12">
                <b-alert variant="success" show>
                  <b-form-group label="Parentesco con el Estudiante*" label-for="parentesco" class="etiqueta">
                    <b-form-select  id="parentesco" ref="parentesco" v-model="$v.infoAcudiente.id_parentesco.$model" :options="comboParentescos" :state="validateStateD('id_parentesco')" aria-describedby="feedParent"></b-form-select>
                    <b-form-invalid-feedback id="feedParent">Campo requerido.</b-form-invalid-feedback>
                  </b-form-group>
                </b-alert>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <div class="float-right text-medium-emphasis text-info">* Campo requerido</div>
            <div>
              <b-button class="small" variant="primary" @click="validarDatosFormulario">Actualizar Datos del Acudiente</b-button>
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
    name: 'fichaacudiente',
    mixins: [validationMixin],
    props: {
      datosAcudiente: Object
    },
    components: {},
    data () {
      return {
        infoAcudiente: {
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
          idAcudiente: null,
          idEstudiante: null,
          id_parentesco: null
        },
        comboTiposDoc: [],
        comboMunicipios: [],
        comboGeneros: [],
        comboPaises: [],
        comboParentescos: [],
        acudienteExiste: true,
        deshabMunNace: false
      }
    },
    validations: {
      infoAcudiente: {
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
        correo: { required, minLength: minLength(5) },
        id_parentesco: { required }
      }
    },
    methods: {
      habilitaMunicipioNace() {
        if (this.infoAcudiente.id_nacionalidad == '170') {
          this.infoAcudiente.id_municipio_nacimiento = null
          this.deshabMunNace = false
        } else {
          this.infoAcudiente.id_municipio_nacimiento = '00000'
          this.deshabMunNace = true
        }
      },
      async buscarDocumentoAcudiente() {
        this.acudienteExiste = false
        this.deshabMunNace = false
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/matriculas/buscardocumentopersona', { params: { documento: this.infoAcudiente.documento }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Buscar documento persona')
          } else{
            if (response.data.datos != 0) {
              this.infoAcudiente.idAcudiente = response.data.datos.id
              this.infoAcudiente.apellido1 = response.data.datos.apellido1
              this.infoAcudiente.apellido2 = response.data.datos.apellido2
              this.infoAcudiente.nombre1 = response.data.datos.nombre1
              this.infoAcudiente.nombre2 = response.data.datos.nombre2
              this.infoAcudiente.documento = response.data.datos.documento
              this.infoAcudiente.id_tipo_documento = response.data.datos.id_tipo_documento
              this.infoAcudiente.id_municipio_documento = response.data.datos.id_municipio_documento
              if (response.data.datos.fecha_nacimiento!=null) {
                this.infoAcudiente.fecha_nacimiento = response.data.datos.fecha_nacimiento.substr(0,10)
              } else {
                this.infoAcudiente.fecha_nacimiento = null
              }
              this.infoAcudiente.id_nacionalidad = response.data.datos.id_nacionalidad
              this.infoAcudiente.id_municipio_nacimiento = response.data.datos.id_municipio_nacimiento
              this.infoAcudiente.id_genero = response.data.datos.id_genero
              this.infoAcudiente.id_rh = response.data.datos.id_rh
              this.infoAcudiente.id_estrato = response.data.datos.id_estrato
              this.infoAcudiente.id_sisben = response.data.datos.id_sisben
              this.infoAcudiente.id_eps = response.data.datos.id_eps
              this.infoAcudiente.direccion = response.data.datos.direccion
              this.infoAcudiente.id_municipio_direccion = response.data.datos.id_municipio_direccion
              this.infoAcudiente.barrio = response.data.datos.barrio
              this.infoAcudiente.id_zona = response.data.datos.id_zona
              this.infoAcudiente.telefono1 = response.data.datos.telefono1
              this.infoAcudiente.telefono2 = response.data.datos.telefono2
              this.infoAcudiente.correo = response.data.datos.correo
              this.infoAcudiente.ocupacion = response.data.datos.ocupacion
              this.infoAcudiente.idEstudiante = this.datosAcudiente.idEstudiante
              this.infoAcudiente.id_parentesco = null
              this.acudienteExiste = true
            } else {
              this.infoAcudiente.idAcudiente = uuid.v1()
              this.infoAcudiente.id_tipo_documento = 1
              this.infoAcudiente.id_municipio_documento = '15001'
              this.infoAcudiente.nombre1 = null
              this.infoAcudiente.nombre2 = null
              this.infoAcudiente.apellido1 = null
              this.infoAcudiente.apellido2 = null
              this.infoAcudiente.fecha_nacimiento = null
              this.infoAcudiente.id_municipio_nacimiento = '15001'
              this.infoAcudiente.id_nacionalidad = '170'
              this.infoAcudiente.direccion = null
              this.infoAcudiente.id_municipio_direccion = '15001'
              this.infoAcudiente.telefono1 = null
              this.infoAcudiente.telefono2 = null
              this.infoAcudiente.correo = null
              this.infoAcudiente.ocupacion = null
              this.infoAcudiente.idEstudiante = this.datosAcudiente.idEstudiante
              this.infoAcudiente.id_parentesco = null
              this.acudienteExiste = false
            }
            if (this.infoAcudiente.id_nacionalidad != '170') {
              this.infoAcudiente.id_municipio_nacimiento = '00000'
              this.deshabMunNace = true
            }
          }
        })
        .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Buscar documento persona. Intente más tarde. ' + err)
        })
      },
      validarDatosFormulario() {
        this.$v.infoAcudiente.$touch()
        if (this.$v.infoAcudiente.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          let titulo = 'Actualizar Datos del Acudiente'
          let pregunta = '¿Esta seguro de Actualizar los Datos del Acudiente?'
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
              this.guardarDatosAcudiente()
            }
          })
        }
        return true
      },
      async guardarDatosAcudiente() {
        this.infoAcudiente.apellido1 = this.infoAcudiente.apellido1.toUpperCase()
        if (this.infoAcudiente.apellido2 == '' || this.infoAcudiente.apellido2 == null) {
          this.infoAcudiente.apellido2 = null
        } else {
          this.infoAcudiente.apellido2 = this.infoAcudiente.apellido2.toUpperCase()
        }
        this.infoAcudiente.nombre1 = this.infoAcudiente.nombre1.toUpperCase()
        if (this.infoAcudiente.nombre2 == '' || this.infoAcudiente.nombre2 == null) {
          this.infoAcudiente.nombre2 = null
        } else {
          this.infoAcudiente.nombre2 = this.infoAcudiente.nombre2.toUpperCase()
        }
        if (this.infoAcudiente.telefono2 == '' || this.infoAcudiente.telefono2 == null) {
          this.infoAcudiente.telefono2 == null
        }
        if (this.infoAcudiente.ocupacion == '' || this.infoAcudiente.ocupacion == null) {
          this.infoAcudiente.ocupacion = null
        } else {
          this.infoAcudiente.ocupacion = this.infoAcudiente.ocupacion.toUpperCase()
        }
        this.infoAcudiente.correo = this.infoAcudiente.correo.toLowerCase()
        this.infoAcudiente.acudienteExiste = this.acudienteExiste
        console.log(JSON.stringify(this.infoAcudiente))
        await axios
        .post(CONFIG.ROOT_PATH + 'academico/acudiente', JSON.stringify(this.infoAcudiente), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Acudiente')
          } else{
            this.$emit("retorno", 1)
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Acudiente. Intente más tarde. ' + err)
        })
      },
      async consultaDatosAcudienteId() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/acudientes', { params: { idAcudiente: this.datosAcudiente.idAcudiente }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Datos acudiente')
          } else{
            if (response.data.datos != 0) {
              this.infoAcudiente = response.data.datos
              if (this.infoAcudiente.fecha_nacimiento != null && this.infoAcudiente.fecha_nacimiento != '') {
                this.infoAcudiente.fecha_nacimiento = this.infoAcudiente.fecha_nacimiento.substr(0,10)
              }
              this.acudienteExiste = true
            } else {
              this.infoAcudiente.documento = null
              this.infoAcudiente.id_tipo_documento = 1
              this.infoAcudiente.id_municipio_documento = '15001'
              this.infoAcudiente.nombre1 = null
              this.infoAcudiente.nombre2 = null
              this.infoAcudiente.apellido1 = null
              this.infoAcudiente.apellido2 = null
              this.infoAcudiente.fecha_nacimiento = null
              this.infoAcudiente.id_municipio_nacimiento = '15001'
              this.infoAcudiente.id_nacionalidad = '170'
              this.infoAcudiente.direccion = null
              this.infoAcudiente.id_municipio_direccion = '15001'
              this.infoAcudiente.telefono1 = null
              this.infoAcudiente.telefono2 = null
              this.infoAcudiente.correo = null
              this.infoAcudiente.ocupacion = null
              this.acudienteExiste = false
            }
            this.infoAcudiente.idAcudiente = this.datosAcudiente.idAcudiente
            this.infoAcudiente.idEstudiante = this.datosAcudiente.idEstudiante
            this.infoAcudiente.id_parentesco = this.datosAcudiente.idParentesco
            if (this.infoAcudiente.id_nacionalidad != '170') {
              this.infoAcudiente.id_municipio_nacimiento = '00000'
              this.deshabMunNace = true
            }
          }
        })
        .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Datos acudiente. Intente más tarde. ' + err)
        })
      },
      ocuparCombos() {
        this.comboGeneros = []
        this.$store.state.datosTablas.generos.forEach(element => {
          this.comboGeneros.push({ 'value': element.id, 'text': element.genero.toUpperCase() })
        })
        this.comboTiposDoc = []
        this.$store.state.datosTablas.tiposdocumentos.forEach(element => {
          this.comboTiposDoc.push({ 'value': element.id, 'text': element.tipodocumento.toUpperCase() })
        })
        this.comboMunicipios = []
        this.$store.state.datosTablas.municipios.forEach(element => {
          this.comboMunicipios.push({ 'value': element.id, 'text': element.municipio.toUpperCase() + ' - ' + element.departamento.toUpperCase() })
        })
        this.comboPaises = []
        this.$store.state.datosTablas.paises.forEach(element => {
          this.comboPaises.push({ 'value': element.id, 'text': element.pais.toUpperCase() })
        })
        this.comboParentescos = []
        this.$store.state.datosTablas.parentescos.forEach(element => {
          this.comboParentescos.push({ 'value': element.id, 'text': element.parentesco.toUpperCase() })
        })
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
        const { $dirty, $error } = this.$v.infoAcudiente[name]
        return $dirty ? !$error : null
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.consultaDatosAcudienteId()
      this.ocuparCombos()
    }
  }
</script>