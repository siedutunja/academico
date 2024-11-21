<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> DATOS DEL PADRE</h5>
          </template>
          <b-card-text>
            <b-row v-if="!documentoValido">
              <b-col lg="3" md="6">
                <b-form-group label="Número de Documento*" label-for="docV" class="etiqueta">
                  <b-form-input id="docV" ref="docV" v-model.trim="nuevoDocumento" autocomplete="off" maxlength="20" @keydown="soloNumeros"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row v-else>
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
                <b-form-group label="Número de Documento*" label-for="doc" class="etiqueta">
                  <b-form-input id="doc" ref="doc" v-model="infoPapa.documento" aria-describedby="feedDoc" autocomplete="off" maxlength="20" @keydown="soloNumeros" :disabled="papaExiste ? false : true"></b-form-input>
                  <b-form-invalid-feedback id="feedDoc">Campo requerido.</b-form-invalid-feedback>
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
                <b-form-group label="Nacionalidad*" label-for="nacional" class="etiqueta">
                  <b-form-select  id="nacional" ref="nacional" v-model="$v.infoPapa.id_nacionalidad.$model" :options="comboPaises" :state="validateStateD('id_nacionalidad')" aria-describedby="feedNal"></b-form-select>
                  <b-form-invalid-feedback id="feedNal">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Fecha de Nacimiento*" label-for="fechaN" class="etiqueta">
                  <b-form-input id="fechaN" ref="fechaN" type="date" v-model.trim="$v.infoPapa.fecha_nacimiento.$model" :state="validateStateD('fecha_nacimiento')" aria-describedby="feedFechaN"></b-form-input>
                  <b-form-invalid-feedback id="feedFechaN" >Campo requerido.</b-form-invalid-feedback>            
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Género*" label-for="genero" class="etiqueta">
                  <b-form-select  id="genero" ref="genero" v-model="$v.infoPapa.id_genero.$model" :options="comboGeneros" :state="validateStateD('id_genero')" aria-describedby="feedGenero"></b-form-select>
                  <b-form-invalid-feedback id="feedGenero">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Grupo y Factor RH*" label-for="rh" class="etiqueta">
                  <b-form-select  id="rh" ref="rh" v-model="$v.infoPapa.id_rh.$model" :options="comboRhs" :state="validateStateD('id_rh')" aria-describedby="feedRh"></b-form-select>
                  <b-form-invalid-feedback id="feedRh">Campo requerido.</b-form-invalid-feedback>
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
                  <b-form-input id="correo" ref="correo" v-model.trim="$v.infoPapa.correo.$model" :state="validateStateD('correo')" aria-describedby="feedCorreo" autocomplete="off" maxlength="50"></b-form-input>
                  <b-form-invalid-feedback id="feedCorreo" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Cabeza Familia*" label-for="cabeza" class="etiqueta">
                  <b-form-select  id="cabeza" ref="cabeza" v-model="$v.infoPapa.id_cabeza.$model" :options="comboCabeza" :state="validateStateD('id_cabeza')" aria-describedby="feedCabeza"></b-form-select>
                  <b-form-invalid-feedback id="feedCabeza">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Familias Acción*" label-for="familias" class="etiqueta">
                  <b-form-select  id="familias" ref="familias" v-model="$v.infoPapa.id_familias.$model" :options="comboFamilias" :state="validateStateD('id_familias')" aria-describedby="feedFamilias"></b-form-select>
                  <b-form-invalid-feedback id="feedFamilias">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Escolaridad*" label-for="escolar" class="etiqueta">
                  <b-form-select  id="escolar" ref="escolar" v-model="$v.infoPapa.id_escolaridad.$model" :options="comboEscolaridades" :state="validateStateD('id_escolaridad')" aria-describedby="feedEscolar"></b-form-select>
                  <b-form-invalid-feedback id="feedEscolar">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Actividad*" label-for="actividad" class="etiqueta">
                  <b-form-select  id="actividad" ref="actividad" v-model="$v.infoPapa.id_actividad.$model" :options="comboLabores" :state="validateStateD('id_actividad')" aria-describedby="feedActiv"></b-form-select>
                  <b-form-invalid-feedback id="feedActiv">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <div class="float-right text-medium-emphasis text-info">* Campo requerido</div>
            <div v-if="!documentoValido">
              <b-button class="small" variant="success" @click="validarDocumento">Validar Documento</b-button>
              <b-button class="small ml-3" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
            </div>
            <div v-else>
              <b-button class="small" variant="primary" @click="validarDatosFormulario">
                <div v-if="infoPapa.editarPapa">Actualizar Datos del Padre</div>
                <div v-else>Guardar y Asociar el Padre a la Matricula</div>
              </b-button>
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
          idPapa: null,
          idEstudiante: null,
          documento: null,
          id_tipo_documento: null,
          id_municipio_documento: null,
          id_nacionalidad: null,
          nombre1: null,
          nombre2: null,
          apellido1: null,
          apellido2: null,
          id_genero: null,
          fecha_nacimiento: null,
          id_rh: null,
          id_cabeza: null,
          id_familias: null,
          direccion: null,
          id_municipio_direccion: null,
          telefono1: null,
          telefono2: null,
          correo: null,
          id_escolaridad: null,
          id_actividad: null,
          editarPapa: false
        },
        comboTiposDoc: [],
        comboMunicipios: [],
        comboGeneros: [],
        comboRhs: [],
        comboPaises: [],
        comboCabeza: [{'value': 0, 'text': 'NO'},{'value': 1, 'text': 'SI'}],
        comboFamilias: [{'value': 0, 'text': 'NO'},{'value': 1, 'text': 'SI'}],
        comboLabores: [],
        comboEscolaridades: [],
        nuevoDocumento: null,
        documentoValido: false,
        papaExiste: true,
      }
    },
    validations: {
      infoPapa: {
        documento: { minLength: minLength(7) },
        id_tipo_documento: { required },
        id_municipio_documento: { required },
        id_nacionalidad: { required },
        nombre1: { required },
        nombre2: { minLength: minLength(0) },
        apellido1: { required },
        apellido2: { minLength: minLength(0) },
        id_genero: { required },
        fecha_nacimiento: { required },
        id_rh: { required },
        id_cabeza: { required },
        id_familias: { required },
        direccion: { required },
        id_municipio_direccion: { required },
        telefono1: { required, minLength: minLength(10) },
        telefono2: { minLength: minLength(0) },
        correo: { required, minLength: minLength(5) },
        id_escolaridad: { required },
        id_actividad: { required }
      }
    },
    methods: {
      async validarDocumento() {
        let cadena = new String(this.nuevoDocumento)
        if (cadena.length > 6) {
          await axios
          .get(CONFIG.ROOT_PATH + 'academico/papas/documento', { params: { documento: this.nuevoDocumento }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Validar documento padre')
            } else{
              if (response.data.datos != 0) {
                this.infoPapa = response.data.datos
                if (this.infoPapa.fecha_nacimiento != null && this.infoPapa.fecha_nacimiento != '') {
                  this.infoPapa.fecha_nacimiento = this.infoPapa.fecha_nacimiento.substr(0,10)
                }
                this.papaExiste = true
                this.infoPapa.papaExiste = this.papaExiste
                this.infoPapa.idEstudiante = this.datosPapa.idEstudiante
              } else {
                this.papaExiste = false
                this.infoPapa.documento = this.nuevoDocumento
                this.infoPapa.papaExiste = this.papaExiste
                this.infoPapa.idEstudiante = this.datosPapa.idEstudiante
                this.infoPapa.id_tipo_documento = 1
                this.infoPapa.id_municipio_documento = '15001'
                this.infoPapa.id_nacionalidad = '170'
                this.infoPapa.id_rh = 0
                this.infoPapa.id_cabeza = 0
                this.infoPapa.id_familias = 0
                this.infoPapa.id_municipio_direccion = '15001'
                this.infoPapa.id_escolaridad = 1
                this.infoPapa.id_actividad = 2
              }
              this.documentoValido = true
            }
          })
          .catch(err => {
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Validar documento padre. Intente más tarde. ' + err)
          })
        } else {
          this.nuevoDocumento = ''
          this.$refs.docV.focus()
          this.documentoValido = false
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'El documento debe contener mínimo 7 dígitos.')
        }
      },
      validarDatosFormulario() {
        this.$v.infoPapa.$touch()
        if (this.$v.infoPapa.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          let titulo = this.infoPapa.editarPapa ? 'Actualizar Datos del Padre' : 'Guardar y Asociar Padre'
          let pregunta = this.infoPapa.editarPapa ? '¿Esta seguro de Actualizar los Datos del Padre?' : '¿Esta seguro de Guardar y Asociar el Padre a la Matricula?'
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
        this.infoPapa.correo = this.infoPapa.correo.toLowerCase()
        this.infoPapa.papaExiste = this.papaExiste
        if (!this.papaExiste) {
          this.infoPapa.idPapa = uuid.v1()
        }
        await axios
        .post(CONFIG.ROOT_PATH + 'academico/papas', JSON.stringify(this.infoPapa), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Crear Padre')
          } else{
            this.$emit("retorno", 1)
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Crear Padre. Intente más tarde. ' + err)
        })
      },
      consultaDatosPapa() {
        if (this.datosPapa.editarPapa) {
          this.infoPapa = this.datosPapa
          this.documentoValido = true
          this.papaExiste = true
        }
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
      cancelarFormulario() {
        this.$emit("retorno", 0)
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
      async ocuparComboPaises() {
        this.comboPaises = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listapaises')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Paises')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboPaises.push({ 'value': element.id, 'text': element.pais.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Paises. Intente más tarde. ' + err)
        })
      },
      async ocuparComboLabores() {
        this.comboLabores = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listalabores')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Labores')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboLabores.push({ 'value': element.id, 'text': element.labor.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Labores. Intente más tarde. ' + err)
        })
      },
      async ocuparComboEscolaridades() {
        this.comboEscolaridades = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listaescolaridades')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Escolaridades')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboEscolaridades.push({ 'value': element.id, 'text': element.escolaridad.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Escolaridades. Intente más tarde. ' + err)
        })
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
      this.consultaDatosPapa()
      this.ocuparComboTiposDoc()
      this.ocuparComboMunicipios()
      this.ocuparComboGeneros()
      this.ocuparComboRhs()
      this.ocuparComboPaises()
      this.ocuparComboLabores()
      this.ocuparComboEscolaridades()
    }
  }
</script>