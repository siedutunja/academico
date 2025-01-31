<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> CAMBIAR DOCUMENTO DEL ESTUDIANTE</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-row>
                  <b-col lg="12">
                    <b-card header-bg-variant="secondary">
                      <template #header>
                        <h5 class="mb-0"><b-icon icon="person" aria-hidden="true"></b-icon> Estudiante</h5>
                      </template>
                      <b-card-text>
                        <b-row class="text-center">
                          <b-col lg="12">
                            <img :src="datosFichaE.foto" id="photoA" alt="photo" width="30%">
                          </b-col>
                          <b-col lg="12" class="mt-3">
                            <h5>{{ datosFichaE.estudiante }}</h5>
                            <h6>{{ datosFichaE.estado }}</h6>
                          </b-col>
                        </b-row>
                      </b-card-text>
                      <template #footer>
                        <b-table-simple striped hover responsive bordered fixed>
                          <b-tbody>
                            <b-tr><b-th>Sede</b-th><b-td>{{datosFichaE.sede}}</b-td></b-tr>
                            <b-tr><b-th>Grado</b-th><b-td>{{datosFichaE.grado}}</b-td></b-tr>
                            <b-tr><b-th>Curso</b-th><b-td>{{datosFichaE.nomenclatura}}</b-td></b-tr>
                            <b-tr><b-th>Número Documento</b-th><b-td>{{datosFichaE.documento}}</b-td></b-tr>
                            <b-tr><b-th>Tipo Documento</b-th><b-td>{{datosFichaE.tipodocumento}}</b-td></b-tr>
                            <b-tr><b-th>Expedición</b-th><b-td>{{datosFichaE.municipioDoc != null ? datosFichaE.municipioDoc.toUpperCase() : '-'}}</b-td></b-tr>
                            <b-tr><b-th>Fecha Nace</b-th><b-td>{{ datosFichaE.fecha_nacimiento != null ? datosFichaE.fecha_nacimiento.substr(0,10) : '-'}}</b-td></b-tr>
                            <b-tr><b-th>Nacionalidad</b-th><b-td>{{datosFichaE.pais}}</b-td></b-tr>
                            <b-tr><b-th>Género</b-th><b-td>{{datosFichaE.genero}}</b-td></b-tr>
                          </b-tbody>
                        </b-table-simple>
                      </template>
                    </b-card>
                  </b-col>
                </b-row>
              </b-col>
              <b-col lg="6">
                <b-row>
                  <b-col lg="12">
                    <b-card header-bg-variant="secondary">
                      <template #header>
                        <h5 class="mb-0"><b-icon icon="filter-square" aria-hidden="true"></b-icon> Cambio de Número de Documento</h5>
                      </template>
                      <b-card-text>
                        <b-row>
                          <b-col lg="6">
                            <b-form-group label="Número de Documento Actual" label-for="texto" class="etiqueta">
                              <b-form-input id="texto" ref="texto" v-model.trim="datosFichaE.documento" disabled></b-form-input>
                            </b-form-group>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col lg="6">
                            <b-form-group label="Nuevo Número de Documento" label-for="texto" class="etiqueta">
                              <b-form-input id="texto" ref="texto" v-model.trim="$v.datosNuevoDocumento.documento.$model" :state="validateStateT('documento')" aria-describedby="feedTextoB" autocomplete="off" maxlength="50" v-on:keyup.enter="buscarEstudiante()" autofocus></b-form-input>
                              <b-form-invalid-feedback id="feedTexto" >Campo requerido.</b-form-invalid-feedback>
                            </b-form-group>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col lg="6">
                            <b-form-group label="Tipo Documento*" label-for="tipoDoc" class="etiqueta">
                              <b-form-select  id="tipoDoc" ref="tipoDoc" v-model="$v.datosNuevoDocumento.id_tipo_documento.$model" :options="comboTiposDoc" :state="validateStateT('id_tipo_documento')" aria-describedby="feedTipoDoc"></b-form-select>
                              <b-form-invalid-feedback id="feedTipoDoc">Campo requerido.</b-form-invalid-feedback>
                            </b-form-group>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col lg="4">
                            <br>
                            <b-button class="small mt-1" variant="primary" @click="buscarEstudiante()">Validar y Actualizar</b-button>
                          </b-col>
                        </b-row>
                      </b-card-text>
                    </b-card>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Actualice el número de documento del estudiante.</em>
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
    name: 'cambiardocumento',
    mixins: [validationMixin],
    components: {
    },
    data () {
      return {
        idMatricula: null,
        datosFichaE: {},
        datosNuevoDocumento: {
          idEstudiante: null,
          documento: null,
          id_tipo_documento: null,
        },
        comboTiposDoc: []
      }
    },
    validations: {
      datosNuevoDocumento: {
        documento: { required, minLength: minLength(6) },
        id_tipo_documento: { required }
      }
    },
    methods: {
      async actualizarDocumento() {
        this.datosNuevoDocumento.idEstudiante = this.datosFichaE.idEstudiante
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/estudiante/documento', JSON.stringify(this.datosNuevoDocumento), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Documento Estudiante')
          } else{
            this.$router.push('/')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Documento Estudiante. Intente más tarde. ' + err)
        })
      },
      validarActualizarDocumento() {
        let titulo = 'Actualizar Documento del Estudiante'
        let pregunta = '¿Esta seguro de actualizar el documento del estudiante?'
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
          cancelVariant: '',
          cancelTitle: 'Cancelar',
          footerClass: 'p-2',
          bodyClass: 'p-5',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.actualizarDocumento()
          }
        })
        return true
      },
      async buscarEstudiante() {
        this.$v.datosNuevoDocumento.$touch()
        if (this.$v.datosNuevoDocumento.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          this.$refs.texto.focus()
          return false
        } else {
          await axios
          .get(CONFIG.ROOT_PATH + 'academico/buscarestudiante/documento', { params: { texto: this.datosNuevoDocumento.documento }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Intente realizar una nueva consulta')
            } else{
              if (response.data.datos == 0) {
                this.validarActualizarDocumento()
              } else {
                this.mensajeEmergente('info',CONFIG.TITULO_MSG,'El número de documento ya se encuentra registrado en Siedutunja.')
              }
            }
          })
          .catch(err => {
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Buscar estudiante. Intente más tarde. ' + err)
          })
        }
        return true
      },
      async consultaFichaMatricula() {
        this.datosFichaE = {}
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/matriculas/consultacarpetamatricula', { params: { idMatricula: this.idMatricula }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Carpeta Matricula')
          } else{
            if (response.data.datos != 0) {
              this.datosFichaE = response.data.datos.estudiante
              if (this.datosFichaE.foto == null || this.datosFichaE.foto == '') {
                this.datosFichaE.foto = CONFIG.FOTO
              }
            } else {
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'No se encontró la Carpeta del Estudiante')
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Carpeta Matricula. Intente más tarde.' + err)
        })
      },
      ocuparCombos() {
        this.comboTiposDoc = []
        this.$store.state.datosTablas.tiposdocumentos.forEach(element => {
          this.comboTiposDoc.push({ 'value': element.id, 'text': element.tipodocumento.toUpperCase() })
        })
      },
      validateStateT(name) {
        const { $dirty, $error } = this.$v.datosNuevoDocumento[name]
        return $dirty ? !$error : null
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      if(this.$store.state.idRol == 1 || this.$store.state.idRol == 12) {
        this.idMatricula = this.$store.state.idMatricula
        this.consultaFichaMatricula()
        this.ocuparCombos()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>