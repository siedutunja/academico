<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> DATOS DEL GRADO</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6" md="12">
                <b-form-group label="Descripción del grado*" label-for="grado" class="etiqueta">
                  <b-form-input id="grado" ref="grado" v-model.trim="$v.infoGrado.descripcion.$model" :state="validateStateG('descripcion')" aria-describedby="feedGrado" autocomplete="off" maxlength="50" :disabled="$store.state.idRol==1 ? false : true"></b-form-input>
                  <b-form-invalid-feedback id="feedGrado" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Nivel del grado*" label-for="nivel" class="etiqueta">
                  <b-form-select  id="nivel" ref="nivel" v-model="$v.infoGrado.id_nivel.$model" :options="comboNiveles" :state="validateStateG('id_nivel')" aria-describedby="feedNivel" :disabled="$store.state.idRol==1 ? false : true"></b-form-select>
                  <b-form-invalid-feedback id="feedNivel">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Periodos a Evaluar*" label-for="periodos" class="etiqueta">
                  <b-form-select  id="periodos" ref="periodos" v-model="$v.infoGrado.periodos.$model" :options="comboPeriodos" :state="validateStateG('periodos')" aria-describedby="feedPer"></b-form-select>
                  <b-form-invalid-feedback id="feedPer">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <div class="float-right text-medium-emphasis text-info">* Campo requerido</div>
            <b-button class="small" variant="primary" @click="validarDatosFormulario">Actualizar Datos del Grado</b-button>
            <b-button class="small ml-3" :variant="infoGrado.estado==0 ? 'success' : 'danger'" v-if="$store.state.idRol==1" @click="activarGradoSede()">{{infoGrado.estado==0 ? 'Activar el Grado' : 'Desctivar el Grado'}}</b-button>
            <b-button class="small ml-3" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
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
    name: 'fichagrado',
    mixins: [validationMixin],
    props: {
      datosGradoSede: Object
    },
    components: {},
    data () {
      return {
        infoGrado: {
          idGradoSede: null,
          descripcion: null,
          id_nivel: null,
          estado: null,
          periodos: null
        },
        comboNiveles: [],
        comboPeriodos: []
      }
    },
    validations: {
      infoGrado: {
        descripcion: { required, minLength: minLength(4) },
        id_nivel: { required },
        periodos: { required }
      }
    },
    methods: {
      async activarGradoSede() {
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/gradossedes/estado', JSON.stringify(this.infoGrado), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Estado Grado')
          } else{
            this.$emit("retorno", 1)
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Estado Grado. Intente más tarde. ' + err)
        })
      },
      validarDatosFormulario() {
        this.$v.infoGrado.$touch()
        if (this.$v.infoGrado.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          let titulo = 'Actualizar Datos del Grado'
          let pregunta = '¿Esta seguro de Actualizar los Datos del Grado?'
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
              this.guardarDatosGradoSede()
            }
          })
        }
        return true
      },
      async guardarDatosGradoSede() {
        this.infoGrado.descripcion = this.infoGrado.descripcion.toUpperCase()
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/gradossedes', JSON.stringify(this.infoGrado), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Grado')
          } else{
            this.$emit("retorno", 1)
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Grado. Intente más tarde. ' + err)
        })
      },
      consultaInfoGrado() {
        this.infoGrado = this.datosGradoSede
      },
      cancelarFormulario() {
        this.$emit("retorno", 0)
      },
      async ocuparComboNiveles() {
        this.comboNiveles = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/listaniveles')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Niveles')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboNiveles.push({ 'value': element.id, 'text': element.nivel.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Niveles. Intente más tarde. ' + err)
        })
      },
      validateStateG(name) {
        const { $dirty, $error } = this.$v.infoGrado[name]
        return $dirty ? !$error : null
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.consultaInfoGrado()
      this.ocuparComboNiveles()
      for (var i = 1; i <= 4; i++) {
        this.comboPeriodos.push({ 'value': i, 'text': i })
      }
    }
  }
</script>