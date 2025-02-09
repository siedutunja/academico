<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> GRADOS POR SEDE</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="verGradosSede"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mt-0" v-if="idSede!=null">
              <b-col lg="12"><hr></b-col>
              <b-col lg="12">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <b-button class="small float-right" variant="dark" @click="validarAsociarGrados" v-if="$store.state.idRol==1 && idSede!=null">Asociar Grados a la Sede</b-button>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Lista de Grados</h5>
                  </template>
                  <b-card-text>
                    <vue-good-table ref="tablaGrados" :columns="encabColumnas" :rows="listaGradosSede" styleClass="vgt-table condensed bordered striped " :line-numbers="true">
                      <template slot="table-row" slot-scope="props">
                        <span v-if="props.column.field == 'id'">
                          <b-button size="sm" :variant="props.row.estado==0 ? 'success' : 'danger'" @click="actualizarFila(props.row)" :disabled="$store.state.idRol==1 ? false : true">{{ props.row.estado==0 ? 'Activar' : 'Desactivar'}}</b-button>
                        </span>
                      </template>
                      <div slot="emptystate">
                        <h5 class="text-danger ml-5">No existen grados asociados a la Sede</h5>
                      </div>
                    </vue-good-table>
                    <!--{{ $store.state.datosGrados }}-->
                  </b-card-text>
                  <template #footer>
                    <b-button class="small mx-1 mt-2" variant="primary" @click="confirmarEstadosGrados" v-if="$store.state.idRol==1 && idSede!=null && listaGradosSede.length!=0">Actualizar el Estado de los Grados</b-button>
                    <b-button class="small mx-1 mt-2" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
                  </template>
                </b-card>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Active o desactive un grado haciendo clic en el botón Activar/Desactivar.</em>
          </template>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'

  export default {
    name: 'gradossedeie',
    components: {
      VueGoodTable
    },
    data () {
      return {
        idSede: null,
        comboSedes: [],
        listaGradosSede: [],
        encabColumnas : [
          { label: 'Id', field: 'id_grado', sortable: false },
          { label: 'Grado', field: 'grado', sortable: false },
          { label: 'Nemo', field: 'nemotecnico', sortable: false },
          { label: 'Nivel', field: 'nivel', sortable: false },
          { label: 'Estado', field: 'estado', formatFn: this.formatFnE, tdClass: this.tdClassFuncE, sortable: false },
          { label: '', field: 'id', sortable: false }
        ]
      }
    },
    methods: {
      validarAsociarGrados() {
        this.$bvModal.msgBoxConfirm('¿Esta seguro de asociar los Grados a la Sede?', {
          headerBgVariant: 'primary',
          headerTextVariant: 'light',
          bodyBgVariant: 'light',
          bodyBgClass: 'text-center',
          title: 'Asociar Grados',
          size: '',
          buttonSize: 'sm',
          okVariant: 'primary',
          okTitle: 'Si, Asociar Grados',
          cancelVariant: '',
          cancelTitle: 'Cancelar',
          footerClass: 'p-2',
          bodyClass: 'p-5',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.asociarGradosSede()
          }
        })
      },
      async asociarGradosSede() {
        let infoSede = {}
        infoSede.idSede = this.idSede
        infoSede.vigencia = this.$store.state.aLectivo
        await axios
        .post(CONFIG.ROOT_PATH + 'academico/gradossede', JSON.stringify(infoSede), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Asociar Grados Sede')
          } else{
            this.asociarCursosGradosSede()
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Asociar Grados Sede. Intente más tarde. ' + err)
        })
      },
      async asociarCursosGradosSede() {
        let infoSede = {}
        infoSede.idSede = this.idSede
        infoSede.vigencia = this.$store.state.aLectivo
        await axios
        .post(CONFIG.ROOT_PATH + 'academico/cursosgradossede', JSON.stringify(infoSede), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Asociar Cursos Grados Sede')
          } else{
            this.cargarDatosGrados()
            this.cargarDatosSedesGradosConfig()
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los Grados y Cursos se han asociado a la Sede correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Asociar Cursos Grados Sede!. Intente más tarde. ' + err)
        })
      },
      async cargarDatosGrados() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/carguegrados', {params: {idInstitucion: this.$store.state.idInstitucion, vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            alert(response.data.mensaje + ' - Consulta datos Grados Activos')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
          } else {
            this.$store.commit('set', ['datosGrados', response.data.datos])
          }
        })
        .catch(err => {
          alert('Algo salio mal y no se pudo realizar: Consulta datos Grados Activos. Intente más tarde. ' + err)
          location.replace(CONFIG.ROOT_WEBSITE)
        })
      },
      async confirmarEstadosGrados() {
        this.$bvModal.msgBoxConfirm('¿Esta seguro de actualizar el estado de los Grados asociados a la Sede?', {
          headerBgVariant: 'primary',
          headerTextVariant: 'light',
          bodyBgVariant: 'light',
          bodyBgClass: 'text-center',
          title: 'Actualizar Grados',
          size: '',
          buttonSize: 'sm',
          okVariant: 'primary',
          okTitle: 'Si, Actualizar Grados',
          cancelVariant: '',
          cancelTitle: 'Cancelar',
          footerClass: 'p-2',
          bodyClass: 'p-5',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.guardarDatosGrados()
          }
        })
        return true
      },
      async guardarDatosGrados() {
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/gradossede/estados', JSON.stringify(this.listaGradosSede), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Grados')
          } else{
            this.cargarDatosGrados()
            this.cargarDatosSedesGradosConfig()
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los estados de los Grados se han actualizado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Grados. Intente más tarde. ' + err)
        })
      },
      actualizarFila(fila) {
        let nuevoEstado = null
        if (fila.estado == 0) {
          nuevoEstado = 1
        } else {
          nuevoEstado = 0
        }
        this.listaGradosSede.forEach(element => {
          if (element.id == fila.id) {
            element.estado = nuevoEstado
          }
        })
      },
      async verGradosSede() {
        this.listaGradosSede = []
        this.$store.state.datosSedesGradosConfig.forEach(element => {
          if (element.id == this.idSede) {
            this.listaGradosSede = element.grados
          }
        })
      },
      async ocuparComboSedes() {
        this.comboSedes = []
        this.$store.state.datosSedes.forEach(element => {
          this.comboSedes.push({ 'value': element.id, 'text': element.sede.toUpperCase() })
        })
      },
      async cargarDatosSedesGradosConfig() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/carguesedesgradosconfig', {params: {idInstitucion: this.$store.state.idInstitucion, idSeccion: this.$store.state.idSeccion, vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            alert(response.data.mensaje + ' - Consulta datos Sedes')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
          } else {
            if(response.data.datos != 0) {
              this.$store.commit('set', ['datosSedesGradosConfig', response.data.datos])
            } else {
              this.$store.commit('set', ['datosSedesGradosConfig', []])
            }
            this.verGradosSede()
          }
        })
        .catch(err => {
          alert('Algo salio mal y no se pudo realizar: Consulta datos Sedes. Intente más tarde. ' + err)
          location.replace(CONFIG.ROOT_WEBSITE)
        })
      },
      cancelarFormulario() {
        this.$router.push('/')
      },
      formatFnE: function(value) {
        if (value == 0) {
          return 'INACTIVO'
        }
        return 'ACTIVO'
      },
      tdClassFuncE(row) {
        if (row.estado == 0) { 
          return 'text-danger text-left' 
        } else { 
          return 'text-success text-left' 
        }
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      if(this.$store.state.idRol == 1 || this.$store.state.idRol == 12) {
        this.ocuparComboSedes()
        this.cargarDatosSedesGradosConfig()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>