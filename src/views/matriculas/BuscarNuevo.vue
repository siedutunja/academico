<template>
  <div>
    <b-row>
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="search" aria-hidden="true"></b-icon> VALIDAR DOCUMENTO ESTUDIANTE</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6" md="6">
                <b-form-group label="Número del Documento*" label-for="texto" class="etiqueta">
                  <b-form-input id="texto" ref="texto" v-model.trim="$v.buscarTexto.textoBusqueda.$model" :state="validateStateT('textoBusqueda')" aria-describedby="feedTextoB" autocomplete="off" maxlength="50" v-on:keyup.enter="buscarEstudiante()" autofocus></b-form-input>
                  <b-form-invalid-feedback id="feedTextoB" >La busqueda debe contener mínimo 6 caracteres.</b-form-invalid-feedback>
                </b-form-group>
                <p>
                  Realice la consulta del documento de un estudiante digitando el número de documento sin puntos ni comas.
                </p>
              </b-col>
              <b-col lg="6" md="6">
                <br>
                <b-button class="small mt-1" variant="primary" @click="buscarEstudiante()">Validar Documento</b-button>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <div class="float-right text-medium-emphasis text-info">* Campo requerido</div>
            <div>
              <b-button class="small ml-3" variant="secondary" @click="cancelarFormulario">Cerrar</b-button>
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
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'

  export default {
    name: 'buscarnuevo',
    mixins: [validationMixin],
    components: {
      VueGoodTable
    },
    data () {
      return {
        buscarTexto: {
          textoBusqueda: null,
        },
      }
    },
    validations: {
      buscarTexto: {
        textoBusqueda: { required, minLength: minLength(6) }
      }
    },
    methods: {
      async buscarEstudiante() {
        this.$v.buscarTexto.$touch()
        if (this.$v.buscarTexto.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'El número de documento es menor a 6 caracteres.')
          this.$refs.texto.focus()
          return false
        } else {
          await axios
          .get(CONFIG.ROOT_PATH + 'academico/buscarestudiante/nuevopfc', { params: { texto: this.buscarTexto.textoBusqueda }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Intente realizar una nueva consulta')
            } else{
              if (response.data.datos == 0) {
                this.$store.commit('set', ['documentoEstudianteNuevo', this.buscarTexto.textoBusqueda])
                this.$router.push('/matriculas/FichaMatriculaNueva')
              } else {
                this.mensajeEmergente('info',CONFIG.TITULO_MSG,'El estudiantes ya se encuentra registrado en Siedutunja.')
              }
            }
          })
          .catch(err => {
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Buscar estudiante. Intente más tarde. ' + err)
          })
        }
        return true
      },
      validateStateT(name) {
        const { $dirty, $error } = this.$v.buscarTexto[name]
        return $dirty ? !$error : null
      },
      cancelarFormulario() {
        this.$router.push('/')
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      if(this.$store.state.idRol == 1 || this.$store.state.idRol == 12 || this.$store.state.perMatricular == 1) {
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>