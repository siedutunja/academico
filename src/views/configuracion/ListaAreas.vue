<template>
  <div>
    <b-row>
      <b-col lg="12">
        <h3 class="ml-2"><b-icon icon="filter-square" aria-hidden="true"></b-icon> AREAS DE LA INSTITUCIÓN EDUCATIVA</h3>
      </b-col>
    </b-row>
    <b-row class="mt-2" v-if="hayAreas">
      <b-col lg="12">
        <b-card>
          <template #header>
            <div class="card-header-actions float-right" v-if="$store.state.idRol == 1">
              <CLink href="#" class="card-header-action btn-setting mx-1 text-primary" @click="nuevaSede" title="Nueva Area">
                <CIcon name="cilMedicalCross"/>
              </CLink>
            </div>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> LISTA DE AREAS</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <vue-good-table :columns="encabColumnas" :rows="listaAreas" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'idArea'">
                      <span style="font-weight: bold; color: blue; cursor: pointer" @click="seleccionarArea(props.row)" title="Consultar/Actualizar Datos del Area"><CIcon name="cilPencil"/></span>
                    </span>
                  </template>
                  <div slot="emptystate">
                    <h5 class="text-danger ml-5">No existen areas creadas</h5>
                  </div>
                </vue-good-table>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Consulte o actualice los datos del area haciendo clic en el lapiz.</em>
          </template>
        </b-card>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col lg="12">
        <b-card>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <h5>No se han creado las areas para la Institución Educativa.</h5>
                <b-button class="small mt-5" variant="primary" @click="validarCrearAreas" v-if="$store.state.idRol==1">Crear Areas</b-button>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalCrearEditarArea" size="xl" scrollable hide-footer :title="datosArea.editarArea ? 'Editar Datos del Area' : 'Nueva Area'" ok-only>
      <div class="mx-3">
        <div>
          <FichaArea :datosArea="datosArea"  @retorno="datosRecibidosArea"/>
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
  import FichaArea from '@/views/configuracion/FichaArea'

  export default {
    name: 'listaareas',
    components: {
      VueGoodTable,
      FichaArea
    },
    data () {
      return {
        listaAreas: [],
        hayAreas: null,
        datosArea: {
          idArea: null,
          area: null,
          id_institucion: null,
          vigencia: null,
          orden: null,
          editarArea: true
        },
        encabColumnas : [
          { label: 'Area', field: 'area' },
          { label: 'Vigencia', field: 'vigencia', sortable: false },
          { label: 'Orden', field: 'orden', sortable: false },
          { label: '', field: 'idArea', sortable: false }
        ]
      }
    },
    methods: {
      validarCrearAreas() {
        let titulo = 'Crear Areas'
        let pregunta = '¿Esta seguro de Crear las Areas para la Institución Educativa?'
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
            this.crearAreas()
          }
        })
      },
      async crearAreas() {
        let datosAreasBloque = {}
        datosAreasBloque.idInstitucion = this.$store.state.idInstitucion
        datosAreasBloque.vigencia = this.$store.state.aLectivo
        await axios
        .post(CONFIG.ROOT_PATH + 'academico/areas/bloque', JSON.stringify(datosAreasBloque), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Crear Areas en Bloque')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos de las areas se han actualizado correctamente.')
            this.consultarListaAreas()
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Crear Areas en Bloque. Intente más tarde. ' + err)
        })
      },
      nuevaSede() {
        this.datosArea.idArea = null
        this.datosArea.area = null
        this.datosArea.id_institucion = this.$store.state.idInstitucion
        this.datosArea.vigencia = this.$store.state.aLectivo
        this.datosArea.orden = 11
        this.datosArea.editarArea = false
        this.$refs['modalCrearEditarArea'].show()
      },
      seleccionarArea(item) {
        this.datosArea.idArea = item.idArea
        this.datosArea.area = item.area
        this.datosArea.orden = item.orden
        this.datosArea.editarArea = true
        this.$refs['modalCrearEditarArea'].show()
      },
      datosRecibidosArea(retorno) {
        if (retorno == 1) 
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'El Area se ha creado correctamente.')
        else if (retorno == 2)
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos del Area se han actualizado correctamente.')
        this.consultarListaAreas()
        this.$refs['modalCrearEditarArea'].hide()
      },
      async consultarListaAreas() {
        this.hayAreas = false
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/areas', {params: {idInstitucion: this.$store.state.idInstitucion, vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista areas')
          } else{
            if (response.data.datos != 0) {
              this.listaAreas = response.data.datos
              this.hayAreas = true
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista areas. Intente más tarde.' + err)
        })
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      if(this.$store.state.idRol == 1 || this.$store.state.idRol == 12) {
        this.consultarListaAreas()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>