<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <div class="card-header-actions float-right" v-if="!mostrarBuscar">
              <CLink href="#" class="card-header-action btn-setting mx-1 text-primary" @click="mostrarBuscar=!mostrarBuscar,$emit('retorno', 0)">
                <CIcon name="cilArrowThickFromTop"/>
              </CLink>
            </div>
            <h5 class="mb-0"><b-icon icon="search" aria-hidden="true"></b-icon> BUSQUEDA DE ESTUDIANTE</h5>
          </template>
          <b-card-text v-if="mostrarBuscar">
            <b-row>
              <b-col>
                <b-tabs content-class="mt-3">
                  <b-tab title="Busqueda por Documento" active>
                    <b-card style="margin-top: -17">
                      <b-card-text>
                        <b-row>
                          <b-col lg="3" md="6">
                            <b-form-group label="Número de Documento*" label-for="doc" class="etiqueta">
                              <b-form-input id="doc" ref="doc" v-model.trim="$v.infoBusqueda.documento.$model" :state="validateState('documento')" aria-describedby="feedDoc" autocomplete="off" maxlength="25" @keydown="soloNumeros"></b-form-input>
                              <b-form-invalid-feedback id="feedDoc" >Campo requerido, mínimo 7 digitos.</b-form-invalid-feedback>
                            </b-form-group>
                          </b-col>
                        </b-row>
                        <b-row v-if="!docEncontrado">
                          <b-col lg="12"><hr></b-col>
                          <b-col>
                            <h4 class="text-danger">No se encontró el número de documento del Estudiante.</h4>
                          </b-col>
                        </b-row>
                      </b-card-text>
                      <template #footer>
                        <div class="float-right text-medium-emphasis text-info">* Campo requerido</div>
                        <div>
                          <b-button class="small" variant="primary" @click="buscarDocumento">Buscar Estudiante</b-button>
                          <b-button class="small ml-3" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
                        </div>
                      </template>
                    </b-card>
                  </b-tab>
                  <b-tab title="Busqueda Avanzada" disabled>
                    <b-card style="margin-top: -17">
                      <b-card-text>
                        <b-row>
                          <b-col>
                            Avanzada...
                          </b-col>
                        </b-row>
                      </b-card-text>
                    </b-card>
                  </b-tab>
                </b-tabs>
              </b-col>
            </b-row>
          </b-card-text>
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
    name: 'buscarestudiante',
    mixins: [validationMixin],
    components: {
    },
    //props: ['id'],
    data () {
      return {
        infoBusqueda: {
          documento: null
        },
        datosEnviar: {},
        mostrarBuscar: true,
        docEncontrado: true,
      }
    },
    validations: {
      infoBusqueda: {
        documento: { required, minLength: minLength(7) },
      }
    },
    methods: {
      async buscarDocumento() {
        this.$v.infoBusqueda.$touch()
        if (this.$v.infoBusqueda.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Número no válido o está incompleto.')
          this.infoBusqueda.documento = ''
          this.$refs.doc.focus()
          return false
        } else {
          await axios
          .get(CONFIG.ROOT_PATH + 'academico/buscarestudiante/documento', { params: { documento: this.infoBusqueda.documento, aLectivo: this.$store.state.aLectivo }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Buscar documento estudiante')
            } else{
              if (response.data.datos != 0) {
                this.datosEnviar.docEstudiante = this.infoBusqueda.documento
                this.datosEnviar.idEstudiante = response.data.datos.idEstudiante
                this.datosEnviar.idMatricula = response.data.datos.idMatricula
                this.mostrarBuscar = false  //Solo si se encuentra el estudiente
                this.docEncontrado = true
                this.$emit("retorno", this.datosEnviar)
              } else {
                this.$refs.doc.focus()
                this.docEncontrado = false
                this.mostrarBuscar = true
                this.$emit("retorno", 0)
              }
            }
          })
          .catch(err => {
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Buscar documento estudiante. Intente más tarde. ' + err)
          })
        }
        return true
      },
      soloNumeros(e) {
        let key = window.Event ? e.which : e.keyCode
        if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key == 8) || (key == 9) || (key == 37) || (key == 39))) {
            e.preventDefault()
        }
      },
      cancelarFormulario() {
        this.$router.push('/')
      },
      validateState(name) {
        const { $dirty, $error } = this.$v.infoBusqueda[name]
        return $dirty ? !$error : null
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
    }
  }
</script>