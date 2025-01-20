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
              <b-col lg="9" md="12">
                <b-form-group label="Asignatura*" label-for="asignatura" class="etiqueta">
                  <b-form-input id="asignatura" ref="asignatura" v-model.trim="$v.infoAsignatura.asignatura.$model" :state="validateStateA('asignatura')" aria-describedby="feedAsig" autocomplete="off" maxlength="100"></b-form-input>
                  <b-form-invalid-feedback id="feedAsig" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="12">
                <b-form-group label="Nemotécnico*" label-for="nemo" class="etiqueta">
                  <b-form-input id="nemo" ref="nemo" v-model.trim="$v.infoAsignatura.nemo.$model" :state="validateStateA('nemo')" aria-describedby="feedNemo" autocomplete="off" maxlength="5"></b-form-input>
                  <b-form-invalid-feedback id="feedNemo" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="9" md="12">
                <b-form-group label="Area*" label-for="area" class="etiqueta">
                  <b-form-select  id="area" ref="area" v-model="$v.infoAsignatura.id_area.$model" :options="comboAreas" :state="validateStateA('id_area')" aria-describedby="feedArea" :disabled="!infoAsignatura.editarAsignatura"></b-form-select>
                  <b-form-invalid-feedback id="feedArea">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="12">
                <b-form-group label="Modalidad*" label-for="modalidad" class="etiqueta">
                  <b-form-select  id="modalidad" ref="modalidad" v-model="$v.infoAsignatura.id_modalidad.$model" :options="comboModalidades" :state="validateStateA('id_modalidad')" aria-describedby="feedModalidad"></b-form-select>
                  <b-form-invalid-feedback id="feedModalidad">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Estado de la Asignatura*" label-for="estado" class="etiqueta">
                  <b-form-select  id="estado" ref="estado" v-model="$v.infoAsignatura.estado.$model" :options="comboEstados" :state="validateStateA('estado')" aria-describedby="feedEstado"></b-form-select>
                  <b-form-invalid-feedback id="feedEstado">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <div class="float-right text-medium-emphasis text-info">* Campo requerido</div>
            <b-button class="small mx-1 mt-2" variant="primary" @click="validarDatosFormulario">
              <div v-if="infoAsignatura.editarAsignatura">Actualizar Datos de la Asignatura</div>
              <div v-else>Guardar la Nueva Asignatura</div>
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
    name: 'fichaasignatura',
    mixins: [validationMixin],
    props: {
      datosAsignatura: Object
    },
    components: {},
    data () {
      return {
        infoAsignatura: {
          id: null,
          asignatura: null,
          id_area: null,
          id_modalidad: null,
          nemo: null,
          estado: null,
          editarAsignatura: true
        },
        comboAreas: [],
        comboModalidades: [],
        comboEstados: []
      }
    },
    validations: {
      infoAsignatura: {
        asignatura: { required, minLength: minLength(4) },
        nemo: { required },
        id_area: { required },
        id_modalidad: { required },
        estado: { required }
      }
    },
    methods: {
      validarDatosFormulario() {
        this.$v.infoAsignatura.$touch()
        if (this.$v.infoAsignatura.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          let titulo = this.infoAsignatura.editarAsignatura ? 'Actualizar Datos de la Asignatura' : 'Crear Asignatura'
          let pregunta = this.infoAsignatura.editarAsignatura ? '¿Esta seguro de Actualizar los Datos de la Asignatura?' : '¿Esta seguro de Crear la Asignatura?'
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
        this.cargarDatosAsignaturas()
      },
      async cargarDatosAsignaturas() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/cargueasignaturas', {params: {idInstitucion: this.$store.state.idInstitucion, vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            alert(response.data.mensaje + ' - Consulta datos Asignaturas')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
          } else {
            if(response.data.datos != 0) {
              this.$store.commit('set', ['datosAsignaturas', response.data.datos])
            } else {
              this.$store.commit('set', ['datosAsignaturas', []])
            }
          }
        })
        .catch(err => {
          alert('Algo salio mal y no se pudo realizar: Consulta datos Asignaturas. Intente más tarde. ' + err)
          location.replace(CONFIG.ROOT_WEBSITE)
        })
      },
      consultaInfoAsignatura() {
        this.infoAsignatura = this.datosAsignatura
      },
      cancelarFormulario() {
        this.$emit("retorno", 0)
      },
      async ocuparCombos() {
        this.comboAreas = []
        this.$store.state.datosAreas.forEach(element => {
          this.comboAreas.push({ 'value': element.id, 'text': element.area.toUpperCase() })
        })
        this.comboModalidades = []
        this.$store.state.datosTablas.modalidades.forEach(element => {
          this.comboModalidades.push({ 'value': element.id, 'text': element.modalidad.toUpperCase() })
        })
        this.comboEstados = []
        this.$store.state.datosTablas.estados.forEach(element => {
          this.comboEstados.push({ 'value': element.id, 'text': element.estado.toUpperCase() })
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
      this.ocuparCombos()
    }
  }
</script>