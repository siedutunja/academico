<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> SEDES DE LA INSTITUCIÓN EDUCATIVA</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <b-button class="small float-right" variant="dark" @click="nuevaSede" v-if="$store.state.idRol==1">Nueva Sede</b-button>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Lista de Sedes</h5>
                  </template>
                  <b-card-text>
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
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Consulte o actualice los datos de una sede haciendo clic en el lapiz.</em>
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
    name: 'sedesie',
    components: {
      VueGoodTable,
      FichaSede
    },
    data () {
      return {
        listaSedes: [],
        datosSede: {
          id: null,
          id_institucion: null,
          vigencia: null,
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
          { label: 'Nombre de la Sede', field: 'sede', sortable: false },
          { label: 'Consecutivo', field: 'consecutivo_sede', sortable: false },
          { label: 'Año', field: 'vigencia', sortable: false },
          { label: 'Dirección', field: 'direccion', sortable: false },
          { label: 'Barrio', field: 'barrio', sortable: false },
          { label: 'Orden', field: 'orden', sortable: false },
          { label: 'Estado', field: 'estado', formatFn: this.formatFnE, tdClass: this.tdClassFuncE, sortable: false },
          { label: '', field: 'id', sortable: false }
        ]
      }
    },
    methods: {
      nuevaSede() {
        this.datosSede.id = null
        this.datosSede.id_institucion = this.$store.state.idInstitucion
        this.datosSede.vigencia = this.$store.state.aLectivo
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
        this.datosSede.vigencia = item.vigencia
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
        let msj = null
        this.$refs['modalCrearEditarSede'].hide()
        if (retorno == 1) 
          msj = 'La sede se ha creado correctamente.'
        else if (retorno == 2)
          msj = 'Los datos de la sede se han actualizado correctamente.'
        if (retorno == 1 || retorno == 2) {
          this.$bvModal.msgBoxOk(msj, {
            headerBgVariant: 'success',
            headerTextVariant: 'light',
            bodyBgVariant: 'light',
            bodyBgClass: 'text-center',
            title: CONFIG.TITULO_MSG,
            size: '',
            buttonSize: 'sm',
            okVariant: 'success',
            okTitle: 'Aceptar',
            footerClass: 'p-2',
            bodyClass: 'p-5',
            hideHeaderClose: true,
            centered: true
          })
          .then(value => {
            this.consultarListaSedesGradosConfig()
          })
        }
      },
      consultarListaSedesGradosConfig() {
        this.listaSedes = this.$store.state.datosSedesGradosConfig
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
        this.consultarListaSedesGradosConfig()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>