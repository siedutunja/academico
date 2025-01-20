<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card header-bg-variant="secondary">
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> DATOS DE LA RUTA</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="9" md="12">
                <b-form-group label="Descripción de la Ruta*" label-for="ruta" class="etiqueta">
                  <b-form-input id="ruta" ref="ruta" v-model.trim="$v.infoRutas.ruta.$model" :state="validateStateS('ruta')" aria-describedby="feedRuta" autocomplete="off" maxlength="100"></b-form-input>
                  <b-form-invalid-feedback id="feedRuta" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Estado de la Ruta*" label-for="estado" class="etiqueta">
                  <b-form-select  id="estado" ref="estado" v-model="$v.infoRutas.estado.$model" :options="comboEstados" :state="validateStateS('estado')" aria-describedby="feedEstado"></b-form-select>
                  <b-form-invalid-feedback id="feedEstado">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <div class="float-right text-medium-emphasis text-info">* Campo requerido</div>
            <b-button class="small mx-1 mt-2" variant="primary" @click="validarDatosFormulario">
              <div v-if="infoRutas.editarRuta">Actualizar Datos de la Ruta</div>
              <div v-else>Guardar la Nueva Ruta</div>
            </b-button>
            <b-button class="small mx-1 mt-2" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
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
    name: 'ficharuta',
    mixins: [validationMixin],
    props: {
      datosRuta: Object
    },
    components: {},
    data () {
      return {
        infoRutas: {
          id: null,
          id_institucion: null,
          ruta: null,
          estado: null,
          editarRuta: true
        },
        comboEstados: []
      }
    },
    validations: {
      infoRutas: {
        ruta: { required, minLength: minLength(4) },
        estado: { required }
      }
    },
    methods: {
      validarDatosFormulario() {
        this.$v.infoRutas.$touch()
        if (this.$v.infoRutas.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          let titulo = this.infoRutas.editarRuta ? 'Actualizar datos de la Ruta' : 'Crear Ruta'
          let pregunta = this.infoRutas.editarRuta ? '¿Esta seguro de actualizar los datos de la Ruta?' : '¿Esta seguro de crear la Ruta?'
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
              this.guardarDatosRuta()
            }
          })
        }
        return true
      },
      async guardarDatosRuta() {
        this.infoRutas.ruta = this.infoRutas.ruta.toUpperCase()
        if (this.infoRutas.editarRuta) {
          await axios
          .put(CONFIG.ROOT_PATH + 'academico/ruta', JSON.stringify(this.infoRutas), { headers: {"Content-Type": "application/json; charset=utf-8" }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Ruta')
            } else{
              this.$emit("retorno", 2)
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Ruta. Intente más tarde. ' + err)
          })
        } else {
          await axios
          .post(CONFIG.ROOT_PATH + 'academico/ruta', JSON.stringify(this.infoRutas), { headers: {"Content-Type": "application/json; charset=utf-8" }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Crear Ruta')
            } else{
              this.$emit("retorno", 1)
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Crear Ruta. Intente más tarde. ' + err)
          })
        }
        this.cargarDatosRutas()
      },
      async cargarDatosRutas() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/carguerutas', {params: {idInstitucion: this.$store.state.idInstitucion}})
        .then(response => {
          if (response.data.error){
            alert(response.data.mensaje + ' - Consulta datos Rutas IE')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
          } else {
            this.$store.commit('set', ['datosRutas', response.data.datos])
          }
        })
        .catch(err => {
          alert('Algo salio mal y no se pudo realizar: Consulta datos Rutas IE. Intente más tarde. ' + err)
          location.replace(CONFIG.ROOT_WEBSITE)
        })
      },
      consultaInfoRutas() {
        this.infoRutas = this.datosRuta
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
      async ocuparCombos() {
        this.comboEstados = []
        this.$store.state.datosTablas.estados.forEach(element => {
          this.comboEstados.push({ 'value': element.id, 'text': element.estado.toUpperCase() })
        })
      },
      validateStateS(name) {
        const { $dirty, $error } = this.$v.infoRutas[name]
        return $dirty ? !$error : null
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.consultaInfoRutas()
      this.ocuparCombos()
    }
  }
</script>