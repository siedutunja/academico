<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> DATOS DE LA ASIGNATURA</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6" md="12">
                <b-form-group label="Asignatura*" label-for="asignatura" class="etiqueta">
                  <b-form-input id="asignatura" ref="asignatura" v-model.trim="$v.infoAsignatura.asignatura.$model" :state="validateStateA('asignatura')" aria-describedby="feedAsig" autocomplete="off" maxlength="255" :disabled="$store.state.idRol==1 ? false : true"></b-form-input>
                  <b-form-invalid-feedback id="feedAsig" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Nemotécnico*" label-for="nemo" class="etiqueta">
                  <b-form-input id="nemo" ref="nemo" v-model.trim="$v.infoAsignatura.nemo.$model" :state="validateStateA('nemo')" aria-describedby="feedNemo" autocomplete="off" maxlength="10"></b-form-input>
                  <b-form-invalid-feedback id="feedNemo" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Area*" label-for="area" class="etiqueta">
                  <b-form-select  id="area" ref="area" v-model="$v.infoAsignatura.id_area_vigencia.$model" :options="comboAreasVigencia" :state="validateStateA('id_area_vigencia')" aria-describedby="feedArea"></b-form-select>
                  <b-form-invalid-feedback id="feedArea">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <div class="float-right text-medium-emphasis text-info">* Campo requerido</div>
            <b-button class="small" variant="primary" @click="validarDatosFormulario">
              <div v-if="infoAsignatura.editarAsignatura">Actualizar Datos de la Asignatura</div>
              <div v-else>Guardar la Nueva Asignatura</div>
            </b-button>
            <b-button class="small ml-3" :variant="infoAsignatura.estado==0 ? 'success' : 'danger'" v-if="infoAsignatura.editarAsignatura && $store.state.idRol==1" @click="activarAsignatura()">{{infoAsignatura.estado==0 ? 'Activar la Asignatura' : 'Desctivar la Asignatura'}}</b-button>
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
    name: 'fichaasignatura',
    mixins: [validationMixin],
    props: {
      datosAsignatura: Object
    },
    components: {},
    data () {
      return {
        infoAsignatura: {
          idAsignatura: null,
          asignatura: null,
          id_area_vigencia: null,
          nemo: null,
          estado: null,
          editarAsignatura: true
        },
        comboAreasVigencia: []
      }
    },
    validations: {
      infoAsignatura: {
        asignatura: { required, minLength: minLength(4) },
        id_area_vigencia: { required },
        nemo: { required, minLength: minLength(4) }
      }
    },
    methods: {
      async activarAsignatura() {
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/asignaturas/estado', JSON.stringify(this.infoAsignatura), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Estado Asignatura')
          } else{
            this.$emit("retorno", 2)
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Estado Asignatura. Intente más tarde. ' + err)
        })
      },
      validarDatosFormulario() {
        this.$v.infoAsignatura.$touch()
        if (this.$v.infoAsignatura.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          let titulo = this.infoAsignatura.editarAsignatura ? 'Actualizar Datos de la Asignatura' : 'Crear Asignatura'
          let pregunta = this.infoAsignatura.editarAsignatura ? '¿Esta seguro de Actualizar los Datos de la Asignatura?' : '¿Esta seguro de Crear la Asignatura?'
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
              this.guardarDatosAsignatura()
            }
          })
        }
        return true
      },
      async guardarDatosAsignatura() {
        this.infoAsignatura.asignatura = this.infoAsignatura.asignatura.toUpperCase()
        this.infoAsignatura.nemo = this.infoAsignatura.nemo.toUpperCase()
        if (this.infoAsignatura.editarAsignatura) {
          await axios
          .put(CONFIG.ROOT_PATH + 'academico/asignaturas', JSON.stringify(this.infoAsignatura), { headers: {"Content-Type": "application/json; charset=utf-8" }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Asignatura')
            } else{
              this.$emit("retorno", 2)
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Asignatura. Intente más tarde. ' + err)
          })
        } else {
          await axios
          .post(CONFIG.ROOT_PATH + 'academico/asignaturas', JSON.stringify(this.infoAsignatura), { headers: {"Content-Type": "application/json; charset=utf-8" }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Crear Asignatura')
            } else{
              this.$emit("retorno", 1)
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Crear Asignatura. Intente más tarde. ' + err)
          })
        }
      },
      consultaInfoAsignatura() {
        this.infoAsignatura = this.datosAsignatura
      },
      cancelarFormulario() {
        this.$emit("retorno", 0)
      },
      async ocuparComboAreasVigencia() {
        this.comboAreasVigencia = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/combo/areasvigencia', {params: {idInstitucion: this.$store.state.idInstitucion, vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Areas Vigencia')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboAreasVigencia.push({ 'value': element.id, 'text': element.area.toUpperCase() })
              })
              this.comboAreasVigencia.push({ 'value': '99999', 'text': '--- SIN ASIGNAR AREA' })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Areas Vigencia. Intente más tarde. ' + err)
        })
      },
      validateStateA(name) {
        const { $dirty, $error } = this.$v.infoAsignatura[name]
        return $dirty ? !$error : null
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.consultaInfoAsignatura()
      this.ocuparComboAreasVigencia()
    }
  }
</script>