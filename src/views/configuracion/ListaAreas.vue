<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> ÁREAS DEL PLAN EDUCATIVO INSTITUCIONAL</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <b-button class="small float-right" variant="dark" @click="nuevaArea" v-if="hayAreas && $store.state.idRol==1">Nueva Área</b-button>
                    <b-button class="small float-right" variant="dark" @click="validarCrearAreas" v-if="$store.state.idRol==1 && !hayAreas">Crear Áreas en Bloque</b-button>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Lista de Áreas</h5>
                  </template>
                  <b-card-text>
                    <vue-good-table :columns="encabColumnas" :rows="listaAreas" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                      <template slot="table-row" slot-scope="props">
                        <span v-if="props.column.field == 'id'">
                          <span style="font-weight: bold; color: blue; cursor: pointer" @click="seleccionarArea(props.row)" title="Consultar/Actualizar Datos del Área"><CIcon name="cilPencil"/></span>
                        </span>
                      </template>
                      <div slot="emptystate">
                        <h5 class="text-danger ml-5">No existen Áreas creadas</h5>
                      </div>
                    </vue-good-table>
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Consulte o actualice los datos de una área haciendo clic en el lapiz.</em>
          </template>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalCrearEditarArea" size="xl" scrollable hide-footer :title="datosArea.editarArea ? 'Editar Datos del Área' : 'Nueva Área'" ok-only>
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
          id: null,
          area: null,
          id_institucion: null,
          vigencia: null,
          nemo: null,
          orden: null,
          id_tipo: null,
          editarArea: true
        },
        encabColumnas : [
          { label: 'Area', field: 'area' },
          { label: 'Vigencia', field: 'vigencia', sortable: false },
          { label: 'Nemo', field: 'nemo', sortable: false },
          { label: 'Orden', field: 'orden', sortable: false },
          { label: 'Tipo', field: 'id_tipo', formatFn: this.formatFn, sortable: false },
          { label: '', field: 'id', sortable: false }
        ]
      }
    },
    methods: {
      validarCrearAreas() {
        let titulo = 'Crear Áreas'
        let pregunta = '¿Esta seguro de crear las Áreas para la Institución Educativa?'
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
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Las Áreas se han creado correctamente.')
            this.consultarListaAreas()
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Crear Areas en Bloque. Intente más tarde. ' + err)
        })
      },
      nuevaArea() {
        this.datosArea.id = null
        this.datosArea.area = null
        this.datosArea.id_institucion = this.$store.state.idInstitucion
        this.datosArea.vigencia = this.$store.state.aLectivo
        this.datosArea.nemo = null
        this.datosArea.orden = null
        this.datosArea.id_tipo = null
        this.datosArea.editarArea = false
        this.$refs['modalCrearEditarArea'].show()
      },
      seleccionarArea(item) {
        this.datosArea.id = item.id
        this.datosArea.area = item.area
        this.datosArea.nemo = item.nemo
        this.datosArea.orden = item.orden
        this.datosArea.id_tipo = item.id_tipo
        this.datosArea.editarArea = true
        this.$refs['modalCrearEditarArea'].show()
      },
      datosRecibidosArea(retorno) {
        if (retorno == 1) 
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'El Área se ha creado correctamente.')
        else if (retorno == 2)
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos del Área se han actualizado correctamente.')
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
      formatFn: function(value) {
        if (value == 1) {
          return 'ACADÉMICA'
        }
        return 'TÉCNICA'
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