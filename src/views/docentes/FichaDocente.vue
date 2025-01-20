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
              <b-col lg="3" md="6">
                <b-form-group label="Número de Documento*" label-for="docV" class="etiqueta">
                  <b-form-input id="docV" ref="docV" v-model.trim="nuevoDocumento" autocomplete="off" maxlength="20" @keydown="soloNumeros"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row v-else>
              <b-col lg="3" md="6">
                <b-form-group label="Primer Apellido*" label-for="ape1" class="etiqueta">
                  <b-form-input id="ape1" ref="ape1" v-model.trim="$v.datosPersona.apellido1.$model" :state="validateStateD('apellido1')" aria-describedby="feedApe1" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                  <b-form-invalid-feedback id="feedApe1" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Segundo Apellido" label-for="ape2" class="etiqueta">
                  <b-form-input id="ape2" ref="ape2" v-model.trim="$v.datosPersona.apellido2.$model" :state="validateStateD('apellido2')" aria-describedby="feedApe2" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                  <b-form-invalid-feedback id="feedApe2">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Primer Nombre*" label-for="nom1" class="etiqueta">
                  <b-form-input id="nom1" ref="nom1" v-model.trim="$v.datosPersona.nombre1.$model" :state="validateStateD('nombre1')" aria-describedby="feedNom1" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                  <b-form-invalid-feedback id="feedNom1">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Segundo Nombre" label-for="nom2" class="etiqueta">
                  <b-form-input id="nom2" ref="nom2" v-model.trim="$v.datosPersona.nombre2.$model" :state="validateStateD('nombre2')" aria-describedby="feedNom2" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                  <b-form-invalid-feedback id="feedNom2">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Número de Documento*" label-for="doc" class="etiqueta">
                  <b-form-input id="doc" ref="doc" v-model="datosPersona.documento" aria-describedby="feedDoc" autocomplete="off" maxlength="20" disabled @keydown="soloNumeros"></b-form-input>
                  <b-form-invalid-feedback id="feedDoc">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Tipo Documento*" label-for="tipoDoc" class="etiqueta">
                  <b-form-select  id="tipoDoc" ref="tipoDoc" v-model="$v.datosPersona.id_tipo_documento.$model" :options="comboTiposDoc" :state="validateStateD('id_tipo_documento')" aria-describedby="feedTipoDoc"></b-form-select>
                  <b-form-invalid-feedback id="feedTipoDoc">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Municipio de Expedición del Documento*" label-for="muniDoc" class="etiqueta">
                  <b-form-select  id="muniDoc" ref="muniDoc" v-model="$v.datosPersona.id_municipio_documento.$model" :options="comboMunicipios" :state="validateStateD('id_municipio_documento')" aria-describedby="feedMuniDoc"></b-form-select>
                  <b-form-invalid-feedback id="feedMuniDoc">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Fecha de Nacimiento*" label-for="fechaN" class="etiqueta">
                  <b-form-input id="fechaN" ref="fechaN" type="date" v-model.trim="$v.datosPersona.fecha_nacimiento.$model" :state="validateStateD('fecha_nacimiento')" aria-describedby="feedFechaN"></b-form-input>
                  <b-form-invalid-feedback id="feedFechaN" >Campo requerido.</b-form-invalid-feedback>            
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Género*" label-for="genero" class="etiqueta">
                  <b-form-select  id="genero" ref="genero" v-model="$v.datosPersona.id_genero.$model" :options="comboGeneros" :state="validateStateD('id_genero')" aria-describedby="feedGenero"></b-form-select>
                  <b-form-invalid-feedback id="feedGenero">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Grupo y Factor RH*" label-for="rh" class="etiqueta">
                  <b-form-select  id="rh" ref="rh" v-model="$v.datosPersona.id_rh.$model" :options="comboRhs" :state="validateStateD('id_rh')" aria-describedby="feedRh"></b-form-select>
                  <b-form-invalid-feedback id="feedRh">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Dirección de Residencia*" label-for="dir" class="etiqueta">
                  <b-form-input id="dir" ref="dir" v-model.trim="$v.datosPersona.direccion.$model" :state="validateStateD('direccion')" aria-describedby="feedDir" autocomplete="off" maxlength="100"></b-form-input>
                  <b-form-invalid-feedback id="feedDir" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Municipio de Residencia*" label-for="muniRes" class="etiqueta">
                  <b-form-select  id="muniRes" ref="muniRes" v-model="$v.datosPersona.id_municipio_direccion.$model" :options="comboMunicipios" :state="validateStateD('id_municipio_direccion')" aria-describedby="feedMuniRes"></b-form-select>
                  <b-form-invalid-feedback id="feedMuniRes">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Teléfono Principal*" label-for="tel1" class="etiqueta">
                  <b-form-input id="tel1" ref="tel1" v-model.trim="$v.datosPersona.telefono1.$model" :state="validateStateD('telefono1')" aria-describedby="feedTel1" autocomplete="off" maxlength="15" @keydown="soloNumeros"></b-form-input>
                  <b-form-invalid-feedback id="feedTel1" >El número debe contener 10 dígitos.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Teléfono Opcional" label-for="tel2" class="etiqueta">
                  <b-form-input id="tel2" ref="tel2" v-model.trim="$v.datosPersona.telefono2.$model" :state="validateStateD('telefono2')" aria-describedby="feedTel2" autocomplete="off" maxlength="15" @keydown="soloNumeros"></b-form-input>
                  <b-form-invalid-feedback id="feedTel2" >El número debe contener 10 dígitos.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Correo Electrónico*" label-for="correo" class="etiqueta">
                  <b-form-input id="correo" ref="correo" v-model.trim="$v.datosPersona.correo.$model" :state="validateStateD('correo')" aria-describedby="feedCorreo" autocomplete="off" maxlength="50"></b-form-input>
                  <b-form-invalid-feedback id="feedCorreo" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="12"><hr></b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Escalafón*" label-for="escala" class="etiqueta">
                  <b-form-select  id="escala" ref="escala" v-model="$v.datosPersona.id_escalafon.$model" :options="comboEscalafones" :state="validateStateD('id_escalafon')" aria-describedby="feedEscala"></b-form-select>
                  <b-form-invalid-feedback id="feedEscala">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="9" md="12">
                <b-form-group label="Último Título Obtenido*" label-for="titulo" class="etiqueta">
                  <b-form-input id="titulo" ref="titulo" v-model.trim="$v.datosPersona.titulo.$model" :state="validateStateD('titulo')" aria-describedby="feedTitulo" autocomplete="off" maxlength="255"></b-form-input>
                  <b-form-invalid-feedback id="feedTitulo">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Estado del Docente*" label-for="estado" class="etiqueta">
                  <b-form-select  id="estado" ref="estado" v-model="$v.datosPersona.estado.$model" :options="comboEstados" :state="validateStateD('estado')" aria-describedby="feedEstado"></b-form-select>
                  <b-form-invalid-feedback id="feedEstado">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6" v-if="$store.state.idRol==1">
                <b-form-group label="Usuario" class="etiqueta">
                  <b-form-input v-model.trim="datosPersona.usuario" disabled></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6" v-if="$store.state.idRol==1">
                <b-form-group label="Contraseña" class="etiqueta">
                  <b-form-input v-model.trim="datosPersona.clave" disabled></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <div class="float-right text-medium-emphasis text-info">* Campo requerido</div>
            <div v-if="!documentoValido">
              <b-button class="small mx-1 mt-2" variant="primary" @click="validarDocumento">Validar Documento</b-button>
              <b-button class="small mx-1 mt-2" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
            </div>
            <div v-else>
              <b-button class="small mx-1 mt-2" variant="primary" @click="validarDatosFormulario">
                <div v-if="datosPersona.editarDocente">Actualizar Datos del Docente</div>
                <div v-else>Crear Docente</div>
              </b-button>
              <b-button v-if="datosPersona.editarDocente" class="small mx-1 mt-2" variant="danger" @click="validarRetiroDocente">Desvincular Docente</b-button>
              <b-button class="small mx-1 mt-2" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
            </div>
          </template>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalMensaje" size="" title="Mensaje" ok-only>
      <div class="mx-3">
        <div>
          <h5 class="mb-2">¡Lo sentimos!</h5>
          <h5 class="mb-4 text-danger">El número de documento {{nuevoDocumento}} ya tiene un usuario registrado en el sistema.</h5>
          <h6>Institución asociada al documento:</h6>
          <h5 class="mb-4">{{ IeVinculante }}</h5>
          <h6>Por favor comuníquese con la entidad y solicite que el usuario sea desvinculado.</h6>
        </div>
      </div>
      <template #modal-footer="{ ok }">
        <b-button size="sm" variant="primary" @click="ok()">Aceptar</b-button>
      </template>
    </b-modal>
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
        datosPersona: {
          id: null,
          documento: null,
          id_tipo_documento: null,
          id_municipio_documento: null,
          nombre1: null,
          nombre2: null,
          apellido1: null,
          apellido2: null,
          id_genero: null,
          fecha_nacimiento: null,
          id_rh: null,
          direccion: null,
          id_municipio_direccion: null,
          telefono1: null,
          telefono2: null,
          correo: null,
          idDocente: null,
          id_escalafon: null,
          titulo: null,
          estado: null,
          idUsuario: null,
          usuario: null,
          clave: null,
          id_rol: null,
          id_entorno: null,
          id_institucion: null,
          id_dependencia: null,
          editarDocente: true
        },
        comboTiposDoc: [],
        comboMunicipios: [],
        comboGeneros: [],
        comboRhs: [],
        comboEscalafones: [],
        comboEstados: [],
        nuevoDocumento: null,
        documentoValido: false,
        personaExiste: false,
        IeVinculante: null
      }
    },
    validations: {
      datosPersona: {
        documento: { minLength: minLength(6) },
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
        id_escalafon: { required },
        titulo: { required },
        estado: { required }
      }
    },
    methods: {
      async validarDocumento() {
        let cadena = new String(this.nuevoDocumento)
        if (cadena.length > 5) {
          await axios
          .get(CONFIG.ROOT_PATH + 'academico/docentes/validadocumento', { params: { documento: this.nuevoDocumento }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Validar documento docente')
            } else{
              if (response.data.datos == 0) {
                this.consultarPersonaDocumento()
              } else {
                this.IeVinculante = response.data.datos.institucion == null ? 'SET' : response.data.datos.institucion
                this.$refs.docV.focus()
                this.documentoValido = false
                this.$refs['modalMensaje'].show()
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
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'El documento debe contener mínimo 6 dígitos.')
        }
      },
      async consultarPersonaDocumento() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/personas/documento', { params: { documento: this.nuevoDocumento }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consultar Persona por Documento')
          } else{
            if (response.data.datos != 0) {
              this.datosPersona.id = response.data.datos.id
              this.datosPersona.documento = response.data.datos.documento
              this.datosPersona.id_tipo_documento = response.data.datos.id_tipo_documento
              this.datosPersona.id_municipio_documento = response.data.datos.id_municipio_documento
              this.datosPersona.nombre1 = response.data.datos.nombre1
              this.datosPersona.nombre2 = response.data.datos.nombre2
              this.datosPersona.apellido1 = response.data.datos.apellido1
              this.datosPersona.apellido2 = response.data.datos.apellido2
              this.datosPersona.id_genero = response.data.datos.id_genero
              if (response.data.datos.fecha_nacimiento != null && response.data.datos.fecha_nacimiento != '') {
                this.datosPersona.fecha_nacimiento = response.data.datos.fecha_nacimiento.substr(0,10)
              }
              this.datosPersona.id_rh = response.data.datos.id_rh
              this.datosPersona.direccion = response.data.datos.direccion
              this.datosPersona.id_municipio_direccion = response.data.datos.id_municipio_direccion
              this.datosPersona.telefono1 = response.data.datos.telefono1
              this.datosPersona.telefono2 = response.data.datos.telefono2
              this.datosPersona.correo = response.data.datos.correo
              this.personaExiste = true
            } else {
              this.datosPersona.id = uuid.v1()
              this.datosPersona.documento = this.nuevoDocumento
              this.datosPersona.id_tipo_documento = null
              this.datosPersona.id_municipio_documento = null
              this.datosPersona.nombre1 = null
              this.datosPersona.nombre2 = null
              this.datosPersona.apellido1 = null
              this.datosPersona.apellido2 = null
              this.datosPersona.id_genero = null
              this.datosPersona.fecha_nacimiento = null
              this.datosPersona.id_rh = null
              this.datosPersona.direccion = null
              this.datosPersona.id_municipio_direccion = null
              this.datosPersona.telefono1 = null
              this.datosPersona.telefono2 = null
              this.datosPersona.correo = null
              this.personaExiste = false
            }
            this.datosPersona.idDocente = uuid.v1()
            this.datosPersona.id_escalafon = null
            this.datosPersona.titulo = null

            this.datosPersona.idUsuario = uuid.v1()
            this.datosPersona.usuario = this.nuevoDocumento
            this.datosPersona.clave = this.nuevoDocumento
            this.datosPersona.id_rol = 8
            this.datosPersona.id_entorno = 4
            this.datosPersona.id_institucion = this.$store.state.idInstitucion
            this.datosPersona.id_dependencia = 12
            this.datosPersona.estado = 1

            this.documentoValido = true
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consultar Persona por Documento. Intente más tarde. ' + err)
        })
      },
      validarDatosFormulario() {
        console.log(JSON.stringify(this.datosPersona))
        this.$v.datosPersona.$touch()
        if (this.$v.datosPersona.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          let titulo = this.datosPersona.editarDocente ? 'Actualizar Datos del Docente' : 'Crear Docente'
          let pregunta = this.datosPersona.editarDocente ? '¿Esta seguro de Actualizar los Datos del Docente?' : '¿Esta seguro de Crear el Docente?'
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
              this.guardarDatosPersona()
            }
          })
        }
        return true
      },
      async guardarDatosPersona() {
        this.datosPersona.apellido1 = this.datosPersona.apellido1.toUpperCase()
        if (this.datosPersona.apellido2 == '' || this.datosPersona.apellido2 == null) {
          this.datosPersona.apellido2 = null
        } else {
          this.datosPersona.apellido2 = this.datosPersona.apellido2.toUpperCase()
        }
        this.datosPersona.nombre1 = this.datosPersona.nombre1.toUpperCase()
        if (this.datosPersona.nombre2 == '' || this.datosPersona.nombre2 == null) {
          this.datosPersona.nombre2 = null
        } else {
          this.datosPersona.nombre2 = this.datosPersona.nombre2.toUpperCase()
        }
        if (this.datosPersona.telefono2 == '' || this.datosPersona.telefono2 == null) {
          this.datosPersona.telefono2 == null
        }
        this.datosPersona.correo = this.datosPersona.correo.toLowerCase()
        this.datosPersona.titulo = this.datosPersona.titulo.toUpperCase()

        if (this.datosPersona.editarDocente) {
          await axios
          .put(CONFIG.ROOT_PATH + 'academico/docente', JSON.stringify(this.datosPersona), { headers: {"Content-Type": "application/json; charset=utf-8" }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Docente')
            } else{
              this.$emit("retorno", 2)
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Docente. Intente más tarde. ' + err)
          })
        } else {
          if (!this.personaExiste) {
            this.datosPersona.id = uuid.v1()
          }
          this.datosPersona.personaExiste = this.personaExiste
          await axios
          .post(CONFIG.ROOT_PATH + 'academico/docente', JSON.stringify(this.datosPersona), { headers: {"Content-Type": "application/json; charset=utf-8" }})
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
      validarRetiroDocente() {
        let titulo = 'Desvincular Docente'
        let pregunta = 'Recuerde que al desvincular (retirar) un Docente de la Institución Educativa, este no podrá volver a ingresar con las credenciales asignadas actualmente. ¿Esta seguro de Desvincular el Docente de la Institución Educativa?'
        this.$bvModal.msgBoxConfirm(pregunta, {
          headerBgVariant: 'danger',
          headerTextVariant: 'light',
          bodyBgVariant: 'light',
          bodyBgClass: 'text-center',
          title: titulo,
          size: '',
          buttonSize: 'sm',
          okVariant: 'primary',
          okTitle: 'Si, ' + titulo,
          cancelVariant: '',
          cancelTitle: 'Cancelar',
          footerClass: 'p-2',
          bodyClass: 'p-5',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.retirarDocente()
          }
        })
        return true
      },
      async retirarDocente() {
        await axios
        .delete(CONFIG.ROOT_PATH + 'academico/docente', {params: {idDocente: this.datosPersona.idDocente, idUsuario: this.datosPersona.idUsuario}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Retirar Docente')
          } else{
            //this.enviarCorreoRetiro()
            this.$emit("retorno", 3)
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Retirar Docente. Intente más tarde. ' + err)
        })
      },
      consultaDatosPersona() {
        this.datosPersona = this.datosDocente
        if (this.datosPersona.editarDocente) {
          this.documentoValido = true
        }
      },
      async enviarCorreoRetiro() {
        let datosCorreo = {}
        datosCorreo.institucion = this.$store.state.nombreInstitucion
        datosCorreo.nombres = this.datosPersona.nombre1 + " " + this.datosPersona.nombre2
        datosCorreo.apellidos = this.datosPersona.apellido1 + " " + this.datosPersona.apellido2
        datosCorreo.documento = this.datosPersona.documento
        datosCorreo.usuario = null
        datosCorreo.clave = null
        datosCorreo.correo = this.datosPersona.correo
        await axios
        .post(CONFIG.ROOT_PATH + 'correos/retirodocente', JSON.stringify(datosCorreo), { headers: {"Content-Type": "application/json; charset=utf-8" }})
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
        datosCorreo.nombres = this.datosPersona.nombre1 + " " + this.datosPersona.nombre2
        datosCorreo.apellidos = this.datosPersona.apellido1 + " " + this.datosPersona.apellido2
        datosCorreo.documento = this.datosPersona.documento
        datosCorreo.usuario = this.datosPersona.usuario
        datosCorreo.clave = this.datosPersona.clave
        datosCorreo.correo = this.datosPersona.correo
        await axios
        .post(CONFIG.ROOT_PATH + 'correos/nuevodocente', JSON.stringify(datosCorreo), { headers: {"Content-Type": "application/json; charset=utf-8" }})
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
      ocuparCombos() {
        this.comboEstados = []
        this.$store.state.datosTablas.estados.forEach(element => {
          this.comboEstados.push({ 'value': element.id, 'text': element.estado.toUpperCase() })
        })
        this.comboRhs = []
        this.$store.state.datosTablas.rhs.forEach(element => {
          this.comboRhs.push({ 'value': element.id, 'text': element.rh.toUpperCase() })
        })
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
      },
      async ocuparComboEscalafones() {
        this.comboEscalafones = []
        this.$store.state.datosEscalafones.forEach(element => {
          this.comboEscalafones.push({ 'value': element.id, 'text': element.escalafon.toUpperCase() })
        })
      },
      validateStateD(name) {
        const { $dirty, $error } = this.$v.datosPersona[name]
        return $dirty ? !$error : null
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.ocuparCombos()
      this.ocuparComboEscalafones()
      this.consultaDatosPersona()
    }
  }
</script>