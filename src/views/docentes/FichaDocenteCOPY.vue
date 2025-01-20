<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> DATOS DEL DOCENTE</h5>
          </template>
          <b-card-text>
            <b-row v-if="!documentoValido">
              <b-col lg="3" md="6" v-if="!docenteVinculado">
                <b-form-group label="Número de Documento*" label-for="docV" class="etiqueta">
                  <b-form-input id="docV" ref="docV" v-model.trim="nuevoDocumento" autocomplete="off" maxlength="20" @keydown="soloNumeros"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="12" v-else class="text-center">
                <h5 class="mt-5 mb-3">El docente {{ infoDocente.docente }} con número de documento {{ infoDocente.documento }}</h5>
                <h4 class="text-info">SE ENCUENTRA VINCULADO</h4>
                <h5 class="mt-3 mb-5">en la IEO {{ ieVinculada }}</h5>
                <p>Para desvincular el Docente debe comunicarse con la Institución Educativa y solicitar la desvinculación.</p>
              </b-col>
            </b-row>
            <b-row v-else>
              <b-col lg="3" md="6">
                <b-form-group label="Primer Apellido*" label-for="ape1" class="etiqueta">
                  <b-form-input id="ape1" ref="ape1" v-model.trim="$v.infoDocente.apellido1.$model" :state="validateStateD('apellido1')" aria-describedby="feedApe1" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                  <b-form-invalid-feedback id="feedApe1" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Segundo Apellido" label-for="ape2" class="etiqueta">
                  <b-form-input id="ape2" ref="ape2" v-model.trim="$v.infoDocente.apellido2.$model" :state="validateStateD('apellido2')" aria-describedby="feedApe2" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                  <b-form-invalid-feedback id="feedApe2">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Primer Nombre*" label-for="nom1" class="etiqueta">
                  <b-form-input id="nom1" ref="nom1" v-model.trim="$v.infoDocente.nombre1.$model" :state="validateStateD('nombre1')" aria-describedby="feedNom1" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                  <b-form-invalid-feedback id="feedNom1">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Segundo Nombre" label-for="nom2" class="etiqueta">
                  <b-form-input id="nom2" ref="nom2" v-model.trim="$v.infoDocente.nombre2.$model" :state="validateStateD('nombre2')" aria-describedby="feedNom2" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                  <b-form-invalid-feedback id="feedNom2">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Número de Documento*" label-for="doc" class="etiqueta">
                  <b-form-input id="doc" ref="doc" v-model="infoDocente.documento" aria-describedby="feedDoc" autocomplete="off" maxlength="20" disabled @keydown="soloNumeros"></b-form-input>
                  <b-form-invalid-feedback id="feedDoc">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Tipo Documento*" label-for="tipoDoc" class="etiqueta">
                  <b-form-select  id="tipoDoc" ref="tipoDoc" v-model="$v.infoDocente.id_tipo_documento.$model" :options="comboTiposDoc" :state="validateStateD('id_tipo_documento')" aria-describedby="feedTipoDoc"></b-form-select>
                  <b-form-invalid-feedback id="feedTipoDoc">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Municipio de Expedición del Documento*" label-for="muniDoc" class="etiqueta">
                  <b-form-select  id="muniDoc" ref="muniDoc" v-model="$v.infoDocente.id_municipio_documento.$model" :options="comboMunicipios" :state="validateStateD('id_municipio_documento')" aria-describedby="feedMuniDoc"></b-form-select>
                  <b-form-invalid-feedback id="feedMuniDoc">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Fecha de Nacimiento*" label-for="fechaN" class="etiqueta">
                  <b-form-input id="fechaN" ref="fechaN" type="date" v-model.trim="$v.infoDocente.fecha_nacimiento.$model" :state="validateStateD('fecha_nacimiento')" aria-describedby="feedFechaN"></b-form-input>
                  <b-form-invalid-feedback id="feedFechaN" >Campo requerido.</b-form-invalid-feedback>            
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Género*" label-for="genero" class="etiqueta">
                  <b-form-select  id="genero" ref="genero" v-model="$v.infoDocente.id_genero.$model" :options="comboGeneros" :state="validateStateD('id_genero')" aria-describedby="feedGenero"></b-form-select>
                  <b-form-invalid-feedback id="feedGenero">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Grupo y Factor RH*" label-for="rh" class="etiqueta">
                  <b-form-select  id="rh" ref="rh" v-model="$v.infoDocente.id_rh.$model" :options="comboRhs" :state="validateStateD('id_rh')" aria-describedby="feedRh"></b-form-select>
                  <b-form-invalid-feedback id="feedRh">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Dirección de Residencia*" label-for="dir" class="etiqueta">
                  <b-form-input id="dir" ref="dir" v-model.trim="$v.infoDocente.direccion.$model" :state="validateStateD('direccion')" aria-describedby="feedDir" autocomplete="off" maxlength="100"></b-form-input>
                  <b-form-invalid-feedback id="feedDir" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Municipio de Residencia*" label-for="muniRes" class="etiqueta">
                  <b-form-select  id="muniRes" ref="muniRes" v-model="$v.infoDocente.id_municipio_direccion.$model" :options="comboMunicipios" :state="validateStateD('id_municipio_direccion')" aria-describedby="feedMuniRes"></b-form-select>
                  <b-form-invalid-feedback id="feedMuniRes">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Teléfono Principal*" label-for="tel1" class="etiqueta">
                  <b-form-input id="tel1" ref="tel1" v-model.trim="$v.infoDocente.telefono1.$model" :state="validateStateD('telefono1')" aria-describedby="feedTel1" autocomplete="off" maxlength="15" @keydown="soloNumeros"></b-form-input>
                  <b-form-invalid-feedback id="feedTel1" >El número debe contener 10 dígitos.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Teléfono Opcional" label-for="tel2" class="etiqueta">
                  <b-form-input id="tel2" ref="tel2" v-model.trim="$v.infoDocente.telefono2.$model" :state="validateStateD('telefono2')" aria-describedby="feedTel2" autocomplete="off" maxlength="15" @keydown="soloNumeros"></b-form-input>
                  <b-form-invalid-feedback id="feedTel2" >El número debe contener 10 dígitos.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Correo Electrónico*" label-for="correo" class="etiqueta">
                  <b-form-input id="correo" ref="correo" v-model.trim="$v.infoDocente.correo.$model" :state="validateStateD('correo')" aria-describedby="feedCorreo" autocomplete="off" maxlength="50"></b-form-input>
                  <b-form-invalid-feedback id="feedCorreo" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="12"><hr></b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Escalafón*" label-for="escala" class="etiqueta">
                  <b-form-select  id="escala" ref="escala" v-model="$v.infoDocente.id_escalafon.$model" :options="comboEscalafones" :state="validateStateD('id_escalafon')" aria-describedby="feedEscala"></b-form-select>
                  <b-form-invalid-feedback id="feedEscala">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="9" md="12">
                <b-form-group label="Último Título Obtenido*" label-for="titulo" class="etiqueta">
                  <b-form-input id="titulo" ref="titulo" v-model.trim="$v.infoDocente.titulo.$model" :state="validateStateD('titulo')" aria-describedby="feedTitulo" autocomplete="off" maxlength="255"></b-form-input>
                  <b-form-invalid-feedback id="feedTitulo">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6" v-if="$store.state.idRol==1">
                <b-form-group label="Usuario" class="etiqueta">
                  <b-form-input v-model.trim="infoDocente.usuario" disabled></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6" v-if="$store.state.idRol==1">
                <b-form-group label="Contraseña" class="etiqueta">
                  <b-form-input v-model.trim="infoDocente.clave" disabled></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <div class="float-right text-medium-emphasis text-info" v-if="!docenteVinculado">* Campo requerido</div>
            <div v-if="!documentoValido">
              <b-button class="small" variant="success" v-if="!docenteVinculado" @click="validarDocumento">Validar Documento</b-button>
              <b-button class="small ml-3" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
            </div>
            <div v-else>
              <b-button class="small" variant="primary" @click="validarDatosFormulario">
                <div v-if="infoDocente.editarDocente">Actualizar Datos del Docente</div>
                <div v-else>Guardar y Vincular Docente</div>
              </b-button>
              <b-button class="small ml-3" :variant="infoDocente.estado==0 ? 'success' : 'warning'" v-if="infoDocente.editarDocente" @click="validarCambioEstadoDocente()">{{infoDocente.estado==0 ? 'Activar el Docente' : 'Desctivar el Docente'}}</b-button>
              <b-button class="small ml-3" variant="danger" v-if="infoDocente.editarDocente" @click="validarDesvincularDocente()">Desvincular el Docente</b-button>
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
    name: 'fichadocente',
    mixins: [validationMixin],
    props: {
      datosDocente: Object
    },
    components: {},
    data () {
      return {
        infoDocente: {
          idDocente: null,
          idDocenteIE: null,
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
          id_escalafon: null,
          titulo: null,
          direccion: null,
          id_municipio_direccion: null,
          telefono1: null,
          telefono2: null,
          correo: null,
          idUsuario: null,
          usuario: null,
          clave: null,
          estado: null,
          editarDocente: true
        },
        comboTiposDoc: [],
        comboMunicipios: [],
        comboGeneros: [],
        comboRhs: [],
        comboEscalafones: [],
        nuevoDocumento: null,
        documentoValido: false,
        docenteExiste: false,
        docenteVinculado: false,
        ieVinculada: null
      }
    },
    validations: {
      infoDocente: {
        documento: { minLength: minLength(7) },
        id_tipo_documento: { required },
        id_municipio_documento: { required },
        nombre1: { required },
        nombre2: { minLength: minLength(0) },
        apellido1: { required },
        apellido2: { minLength: minLength(0) },
        fecha_nacimiento: { required },
        id_genero: { required },
        id_rh: { required },
        id_escalafon: { required },
        titulo: { required, minLength: minLength(5) },
        direccion: { required },
        id_municipio_direccion: { required },
        telefono1: { required, minLength: minLength(10) },
        telefono2: { minLength: minLength(0) },
        correo: { required, minLength: minLength(5) }
      }
    },
    methods: {
      validarDesvincularDocente() {
        let titulo = 'Desvincular Docente'
        let pregunta = 'Al desvincular al Docente este ya no podrá acceder al sistema y se perderá el vinculo con la Institución Educativa. ¿Esta seguro de Desvincular el Docente?'
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
            this.desvincularDocente()
          }
        })
        return true
      },
      async desvincularDocente() {
        let datosVinculo = {idDocenteIE: this.infoDocente.idDocenteIE, idUsuario: this.infoDocente.idUsuario}
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/docentes/desvincular', JSON.stringify(datosVinculo), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Desvincular docente')
          } else{
            //this.enviarCorreoRetiro()
            this.$emit("retorno", 2)
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Desvincular docente. Intente más tarde. ' + err)
        })
        
      },
      validarCambioEstadoDocente() {
        let titulo = this.infoDocente.estado==0 ? 'Activar Docente' : 'Desactivar Docente'
        let pregunta = this.infoDocente.estado==0 ? '¿Esta seguro de Activar el Docente?' : '¿Esta seguro de Desactivar el Docente?'
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
            this.cambioEstadoDocente()
          }
        })
        return true
      },
      async cambioEstadoDocente() {
        let datosEstado = {idUsuario: this.infoDocente.idUsuario, idDocenteIE: this.infoDocente.idDocenteIE, estado: this.infoDocente.estado}
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/docentes/estado', JSON.stringify(datosEstado), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Cambio estado docente')
          } else{
            //this.enviarCorreoRetiro()
            this.$emit("retorno", 3)
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Cambio estado docente. Intente más tarde. ' + err)
        })
        
      },
      async validarDocumento() {
        let cadena = new String(this.nuevoDocumento)
        if (cadena.length > 6) {
          await axios
          .get(CONFIG.ROOT_PATH + 'academico/docentes/documento', { params: { documento: this.nuevoDocumento }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Validar documento docente')
            } else{
              if (response.data.datos != 0) {
                if (response.data.datos.institucion != null) {
                  this.docenteVinculado = true
                  this.ieVinculada = response.data.datos.institucion
                  this.infoDocente = response.data.datos
                  this.nuevoDocumento = ''
                  this.$refs.docV.focus()
                  this.documentoValido = false
                } else {
                  this.docenteVinculado = false
                  this.infoDocente = response.data.datos
                  if (this.infoDocente.fecha_nacimiento != null && this.infoDocente.fecha_nacimiento != '') {
                    this.infoDocente.fecha_nacimiento = this.infoDocente.fecha_nacimiento.substr(0,10)
                  }
                  this.infoDocente.editarDocente = false
                  this.docenteExiste = true
                  this.documentoValido = true
                }
              } else {
                this.infoDocente.documento = this.nuevoDocumento
                this.docenteExiste = false
                this.documentoValido = true
              }
            }
          })
          .catch(err => {
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Validar documento docente. Intente más tarde. ' + err)
          })
        } else {
          this.nuevoDocumento = ''
          this.$refs.docV.focus()
          this.documentoValido = false
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'El documento debe contener mínimo 7 dígitos.')
        }
      },
      validarDatosFormulario() {
        this.$v.infoDocente.$touch()
        if (this.$v.infoDocente.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          let titulo = this.infoDocente.editarDocente ? 'Actualizar Datos del Docente' : 'Guardar y Vincular Docente'
          let pregunta = this.infoDocente.editarDocente ? '¿Esta seguro de Actualizar los Datos del Docente?' : '¿Esta seguro de Guardar y Vincular el Docente?'
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
              this.guardarDatosDocente()
            }
          })
        }
        return true
      },
      async guardarDatosDocente() {
        this.infoDocente.apellido1 = this.infoDocente.apellido1.toUpperCase()
        if (this.infoDocente.apellido2 == '' || this.infoDocente.apellido2 == null) {
          this.infoDocente.apellido2 = null
        } else {
          this.infoDocente.apellido2 = this.infoDocente.apellido2.toUpperCase()
        }
        this.infoDocente.nombre1 = this.infoDocente.nombre1.toUpperCase()
        if (this.infoDocente.nombre2 == '' || this.infoDocente.nombre2 == null) {
          this.infoDocente.nombre2 = null
        } else {
          this.infoDocente.nombre2 = this.infoDocente.nombre2.toUpperCase()
        }
        if (this.infoDocente.telefono2 == '' || this.infoDocente.telefono2 == null) {
          this.infoDocente.telefono2 == null
        }
        this.infoDocente.correo = this.infoDocente.correo.toLowerCase()
        this.infoDocente.titulo = this.infoDocente.titulo.toUpperCase()
        this.infoDocente.docenteExiste = this.docenteExiste
        if (this.infoDocente.editarDocente) {
          await axios
          .put(CONFIG.ROOT_PATH + 'academico/docentes', JSON.stringify(this.infoDocente), { headers: {"Content-Type": "application/json; charset=utf-8" }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Datos del Docente')
            } else{
              this.$emit("retorno", 2)
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Datos del Docente. Intente más tarde. ' + err)
          })
        } else {
          if (!this.docenteExiste) {
            this.infoDocente.idDocente = uuid.v1()
          }
          this.infoDocente.usuario = this.infoDocente.documento
          let caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
          let nuevaCadena = ''
          let i = 0
          for ( i = 0; i < 10; i++ ) {
            nuevaCadena += caracteres.charAt(Math.floor(Math.random() * caracteres.length))
          }
          this.infoDocente.clave = nuevaCadena
          this.infoDocente.id_persona = this.infoDocente.idDocente
          this.infoDocente.id_entorno = 4
          this.infoDocente.idInstitucion = this.$store.state.idInstitucion
          this.infoDocente.id_dependencia = 12
          this.infoDocente.idUsuario = uuid.v1()
          this.infoDocente.idDocenteIE = uuid.v1()
          await axios
          .post(CONFIG.ROOT_PATH + 'academico/docentes', JSON.stringify(this.infoDocente), { headers: {"Content-Type": "application/json; charset=utf-8" }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Crear Docente')
            } else{
              //this.enviarCorreoNuevo()
              this.$emit("retorno", 1)
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Crear Docente. Intente más tarde. ' + err)
          })
        }
      },
      consultaDatosDocente() {
        this.infoDocente = this.datosDocente
        if (this.infoDocente.editarDocente) {
          this.documentoValido = true
        }
      },
      async enviarCorreoRetiro() {
        let datosCorreo = {}
        datosCorreo.institucion = this.$store.state.nombreInstitucion
        datosCorreo.nombres = this.infoDocente.nombre1 + " " + this.infoDocente.nombre2
        datosCorreo.apellidos = this.infoDocente.apellido1 + " " + this.infoDocente.apellido2
        datosCorreo.documento = this.infoDocente.documento
        datosCorreo.usuario = null
        datosCorreo.clave = null
        datosCorreo.correo = this.infoDocente.correo
        datosCorreo.cargo = this.infoDocente.cargo
        await axios
        .post(CONFIG.ROOT_PATH + 'correos/retirofuncionario', JSON.stringify(datosCorreo), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Correo Retiro docente')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Correo Retiro docente. Intente más tarde. ' + err)
        })
      },
      async enviarCorreoNuevo() {
        let datosCorreo = {}
        datosCorreo.institucion = this.$store.state.nombreInstitucion
        datosCorreo.nombres = this.infoDocente.nombre1 + " " + this.infoDocente.nombre2
        datosCorreo.apellidos = this.infoDocente.apellido1 + " " + this.infoDocente.apellido2
        datosCorreo.documento = this.infoDocente.documento
        datosCorreo.usuario = this.infoDocente.usuario
        datosCorreo.clave = this.infoDocente.clave
        datosCorreo.correo = this.infoDocente.correo
        datosCorreo.cargo = this.infoDocente.cargo
        await axios
        .post(CONFIG.ROOT_PATH + 'correos/nuevofuncionario', JSON.stringify(datosCorreo), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Correo Nuevo docente')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Correo Nuevo docente. Intente más tarde. ' + err)
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
      async ocuparComboEscalafones() {
        this.comboEscalafones = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listaescalafones')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Escalafones')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboEscalafones.push({ 'value': element.id, 'text': element.escalafon.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Escalafones. Intente más tarde. ' + err)
        })
      },
      validateStateD(name) {
        const { $dirty, $error } = this.$v.infoDocente[name]
        return $dirty ? !$error : null
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.consultaDatosDocente()
      this.ocuparComboTiposDoc()
      this.ocuparComboMunicipios()
      this.ocuparComboGeneros()
      this.ocuparComboRhs()
      this.ocuparComboEscalafones()
    }
  }
</script>