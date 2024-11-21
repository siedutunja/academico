<template>
  <div>
    <b-row>
      <b-col lg="12">
        <h3 class="ml-2"><b-icon icon="filter-square" aria-hidden="true"></b-icon> CREAR NUEVO AÑO LECTIVO PARA LA INSTITUCIÓN EDUCATIVA</h3>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <div class="card-header-actions float-right" v-if="$store.state.idRol == 1">
              <CLink href="#" class="card-header-action btn-setting mx-1 text-primary" @click="nuevaSede" title="Nueva Sede">
                <CIcon name="cilMedicalCross"/>
              </CLink>
            </div>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> LISTA DE SEDES</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <vue-good-table :columns="encabColumnas" :rows="listaSedes" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'id'">
                      <span style="font-weight: bold; color: blue; cursor: pointer" @click="seleccionarSede(props.row)" title="Consultar/Actualizar Datos de la Sede"><CIcon name="cilPencil"/></span>
                    </span>
                  </template>
                  <div slot="emptystate">
                    <h5 class="text-danger ml-5">No existen sedes creadas</h5>
                  </div>
                </vue-good-table>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Consulte o actualice los datos de una sede haciendo clic en el lapiz.</em>
          </template>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> SEDES HABILITADAS POR AÑO LECTIVO</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="3" md="6">
                <b-form-group label="Año Lectivo:" label-for="alectivo" class="etiqueta">
                  <b-form-select  id="alectivo" ref="alectivo" v-model="aLectivo" :options="comboAnnos" aria-describedby="feedAlectivo" @change="consultarListaSedesVigencia"></b-form-select>
                  <b-form-invalid-feedback id="feedAlectivo">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row><b-col><hr></b-col></b-row>
            <b-row>
              <b-col lg="12">
                <vue-good-table :columns="encabColumnasVigencia" :rows="listaSedesVigencia" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                  <div slot="emptystate">
                    <h5 class="text-danger ml-5">No existen sedes habilitadas para la vigencia: {{ aLectivo }}</h5>
                  </div>
                </vue-good-table>
              </b-col>
            </b-row>
            <b-row><b-col><hr></b-col></b-row>
            <b-row>
              <b-col>
                <b-button class="small ml-3" variant="primary" @click="actualizarSedesVigencia">Habilitar y Actualizar las Sedes para el Año Lectivo {{ aLectivo }}</b-button>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Consulte, habilite y actualice los datos de las sedes para el año lectivo seleccionado haciendo clic en el Año Lectivo.</em>
          </template>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalCrearEditarSede" size="xl" scrollable hide-footer :title="datosSede.editarSede ? 'Editar Datos de la Sede' : 'Nueva Sede'" ok-only>
      <div class="mx-3">
        <div>
          <FichaSede :datosSede="datosSede"  @retorno="datosRecibidosSede"/>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'
  import FichaSede from '@/views/configuracion/FichaSede'

  export default {
    name: 'nuevavigencia',
    components: {
      VueGoodTable,
      FichaSede
    },
    data () {
      return {
        listaSedes: [],
        listaSedesVigencia: [],
        datosSede: {
          id: null,
          id_institucion: null,
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
        encabColumnas : [
          { label: 'Sede', field: 'sede', sortable: false },
          { label: 'Consecutivo', field: 'consecutivo_sede', sortable: false },
          { label: 'Orden', field: 'orden', sortable: false },
          { label: 'Dirección', field: 'direccion', sortable: false },
          { label: 'Barrio', field: 'barrio', sortable: false },
          { label: 'Estado', field: 'estado', formatFn: this.formatFnE, tdClass: this.tdClassFuncE, sortable: false },
          { label: '', field: 'id', sortable: false }
        ],
        encabColumnasVigencia : [
          { label: 'Sede', field: 'sede', sortable: false },
          { label: 'Consecutivo', field: 'consecutivo_sede', sortable: false },
          { label: 'Orden', field: 'orden', sortable: false },
          { label: 'Año', field: 'vigencia', sortable: false },
          { label: 'Estado', field: 'estado', formatFn: this.formatFnE, tdClass: this.tdClassFuncE, sortable: false },
        ],
        comboAnnos: [],
        aLectivo: this.$store.state.aLectivo
      }
    },
    methods: {
      async actualizarSedesVigencia() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/sedes/habilitar/vigencia', {params: {idInstitucion: this.$store.state.idInstitucion, vigencia: this.aLectivo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar sedes Vigencia')
          } else{
            if (response.data.datos != 0) {
              this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Las sede se ha actualizado correctamente.')
              this.consultarListaSedesVigencia()
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar sedes Vigencia. Intente más tarde.' + err)
        })
      },
      nuevaSede() {
        this.datosSede.id = null
        this.datosSede.id_institucion = this.$store.state.idInstitucion
        this.datosSede.consecutivo_sede = null
        this.datosSede.sede = null
        this.datosSede.direccion = null
        this.datosSede.barrio = null
        this.datosSede.id_zona = null
        this.datosSede.id_sector = this.$store.state.idSector
        this.datosSede.orden = 0
        this.datosSede.estado = 1
        this.datosSede.editarSede = false
        this.$refs['modalCrearEditarSede'].show()
      },
      seleccionarSede(item) {
        this.datosSede.id = item.id
        this.datosSede.id_institucion = item.id_institucion
        this.datosSede.consecutivo_sede = item.consecutivo_sede
        this.datosSede.sede = item.sede
        this.datosSede.direccion = item.direccion
        this.datosSede.barrio = item.barrio
        this.datosSede.id_zona = item.id_zona
        this.datosSede.id_sector = item.id_sector
        this.datosSede.orden = item.orden
        this.datosSede.estado = item.estado
        this.datosSede.editarSede = true
        this.$refs['modalCrearEditarSede'].show()
      },
      datosRecibidosSede(retorno) {
        if (retorno == 1) 
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'La sede se ha creado correctamente.')
        else if (retorno == 2)
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos de la sede se han actualizado correctamente.')
        this.consultarListaSedes()
        this.$refs['modalCrearEditarSede'].hide()
      },
      async consultarListaSedes() {
        this.listaSedes = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/sedes/ie', {params: {idInstitucion: this.$store.state.idInstitucion}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista sedes')
          } else{
            if (response.data.datos != 0) {
              this.listaSedes = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista sedes. Intente más tarde.' + err)
        })
      },
      async consultarListaSedesVigencia() {
        this.listaSedesVigencia = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/sedes/vigencia', {params: {idInstitucion: this.$store.state.idInstitucion, vigencia: this.aLectivo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista sedes Vigencia')
          } else{
            if (response.data.datos != 0) {
              this.listaSedesVigencia = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista sedes Vigencia. Intente más tarde.' + err)
        })
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
        this.comboAnnos = [{ 'value': this.$store.state.aLectivo, 'text': this.$store.state.aLectivo },{ 'value': Number(this.$store.state.aLectivo) + 1, 'text': Number(this.$store.state.aLectivo) + 1 }]
        this.consultarListaSedes()
        this.consultarListaSedesVigencia()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>