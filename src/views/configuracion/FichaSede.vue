<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card header-bg-variant="secondary">
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> DATOS DE LA SEDE</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="3" md="6">
                <b-form-group label="Código Anterior*" label-for="codigo" class="etiqueta">
                  <b-form-input id="codigo" ref="codigo" v-model.trim="$v.infoSede.codigo_anterior.$model" :state="validateStateS('codigo_anterior')" aria-describedby="feedCodigo" autocomplete="off" maxlength="12" @keydown="soloNumeros"></b-form-input>
                  <b-form-invalid-feedback id="feedCodigo">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Consecutivo Sede (DANE)*" label-for="consecutivo" class="etiqueta">
                  <b-form-input id="consecutivo" ref="consecutivo" v-model.trim="$v.infoSede.consecutivo_sede.$model" :state="validateStateS('consecutivo_sede')" aria-describedby="feedConsecutivo" autocomplete="off" maxlength="14" @keydown="soloNumeros"></b-form-input>
                  <b-form-invalid-feedback id="feedConsecutivo">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Nombre de la Sede*" label-for="sede" class="etiqueta">
                  <b-form-input id="sede" ref="sede" v-model.trim="$v.infoSede.sede.$model" :state="validateStateS('sede')" aria-describedby="feedSede" autocomplete="off" maxlength="50"></b-form-input>
                  <b-form-invalid-feedback id="feedSede" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Dirección de la Sede*" label-for="dir" class="etiqueta">
                  <b-form-input id="dir" ref="dir" v-model.trim="$v.infoSede.direccion.$model" :state="validateStateS('direccion')" aria-describedby="feedDir" autocomplete="off" maxlength="100"></b-form-input>
                  <b-form-invalid-feedback id="feedDir" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="6">
                <b-form-group label="Barrio de la Sede*" label-for="barrio" class="etiqueta">
                  <b-form-input id="barrio" ref="barrio" v-model.trim="$v.infoSede.barrio.$model" :state="validateStateS('barrio')" aria-describedby="feedBarrio" autocomplete="off" maxlength="50"></b-form-input>
                  <b-form-invalid-feedback id="feedBarrio">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Zona de la Sede*" label-for="zona" class="etiqueta">
                  <b-form-select  id="zona" ref="zona" v-model="$v.infoSede.id_zona.$model" :options="comboZonas" :state="validateStateS('id_zona')" aria-describedby="feedZona"></b-form-select>
                  <b-form-invalid-feedback id="feedZona">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Orden*" label-for="orden" class="etiqueta">
                  <b-form-input type="number" id="orden" ref="orden" v-model.trim="$v.infoSede.orden.$model" :state="validateStateS('orden')" aria-describedby="feedOrden" autocomplete="off" maxlength="2" @keydown="soloNumeros"></b-form-input>
                  <b-form-invalid-feedback id="feedOrden">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row v-if="this.$store.state.idRol == 1">
              <b-col lg="12"><hr></b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Estado de la Sede*" label-for="estado" class="etiqueta">
                  <b-form-select  id="estado" ref="estado" v-model="$v.infoSede.estado.$model" :options="comboEstados" :state="validateStateS('estado')" aria-describedby="feedEstado"></b-form-select>
                  <b-form-invalid-feedback id="feedEstado">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col><b-col><i class="text-muted float-right">ID: {{ infoSede.id }}</i></b-col></b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <div class="float-right text-medium-emphasis text-info">* Campo requerido</div>
            <b-button class="small mx-1 mt-2" variant="primary" @click="validarDatosFormulario">
              <div v-if="infoSede.editarSede">Actualizar Datos de la Sede</div>
              <div v-else>Guardar la Nueva Sede</div>
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
  import { uuid } from 'vue-uuid'

  export default {
    name: 'fichasede',
    mixins: [validationMixin],
    props: {
      datosSede: Object
    },
    components: {},
    data () {
      return {
        infoSede: {
          id: null,
          id_institucion: null,
          id_seccion: null,
          vigencia: null,
          codigo_anterior: null,
          consecutivo_sede: null,
          sede: null,
          direccion: null,
          barrio: null,
          id_zona: null,
          id_sector: null,
          orden: null,
          estado: null,
          editarSede: true
        },
        comboZonas: [],
        comboEstados: []
      }
    },
    validations: {
      infoSede: {
        codigo_anterior: { required, minLength: minLength(12) },
        consecutivo_sede: { required, minLength: minLength(14) },
        sede: { required, minLength: minLength(4) },
        direccion: { required, minLength: minLength(4) },
        barrio: { required, minLength: minLength(4) },
        id_zona: { required },
        estado: { required },
        orden: { required, minLength: minLength(1) }
      }
    },
    methods: {
      validarDatosFormulario() {
        this.$v.infoSede.$touch()
        if (this.$v.infoSede.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          let titulo = this.infoSede.editarSede ? 'Actualizar datos de la Sede' : 'Crear Sede'
          let pregunta = this.infoSede.editarSede ? '¿Esta seguro de actualizar los datos de la Sede?' : '¿Esta seguro de crear la Sede?'
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
              this.guardarDatosSede()
            }
          })
        }
        return true
      },
      async guardarDatosSede() {
        this.infoSede.sede = this.infoSede.sede.toUpperCase()
        this.infoSede.barrio = this.infoSede.barrio.toUpperCase()
        if (this.infoSede.editarSede) {
          await axios
          .put(CONFIG.ROOT_PATH + 'academico/sede', JSON.stringify(this.infoSede), { headers: {"Content-Type": "application/json; charset=utf-8" }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Sede')
            } else{
              this.$emit("retorno", 2)
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Sede. Intente más tarde. ' + err)
          })
        } else {
          this.infoSede.id = uuid.v1()
          await axios
          .post(CONFIG.ROOT_PATH + 'academico/sede', JSON.stringify(this.infoSede), { headers: {"Content-Type": "application/json; charset=utf-8" }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Crear Sede')
            } else{
              this.$emit("retorno", 1)
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Crear Sede. Intente más tarde. ' + err)
          })
        }
        this.cargarDatosSedes()
      },
      async cargarDatosSedes() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/carguesedes', {params: {idInstitucion: this.$store.state.idInstitucion, idSeccion: this.$store.state.idSeccion}})
        .then(response => {
          if (response.data.error){
            alert(response.data.mensaje + ' - Consulta datos Sedes Activas')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
          } else {
            this.$store.commit('set', ['datosSedes', response.data.datos])
          }
        })
        .catch(err => {
          alert('Algo salio mal y no se pudo realizar: Consulta datos Sedes Activas. Intente más tarde. ' + err)
          location.replace(CONFIG.ROOT_WEBSITE)
        })
      },
      consultaInfoSede() {
        this.infoSede = this.datosSede
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
        this.comboZonas = []
        this.$store.state.datosTablas.zonas.forEach(element => {
          this.comboZonas.push({ 'value': element.id, 'text': element.zona.toUpperCase() })
        })
      },
      validateStateS(name) {
        const { $dirty, $error } = this.$v.infoSede[name]
        return $dirty ? !$error : null
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.consultaInfoSede()
      this.ocuparCombos()
    }
  }
</script>