<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> SECCIONES DE LA INSTITUCIÓN EDUCATIVA</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <b-button class="small float-right" variant="dark" @click="validarAsociarSecciones" v-if="$store.state.idRol==1">Asociar Secciones</b-button>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Lista de Secciones</h5>
                  </template>
                  <b-card-text>
                    <vue-good-table ref="tablaGrados" :columns="encabColumnas" :rows="listaSecciones" styleClass="vgt-table condensed bordered striped " :line-numbers="true">
                      <template slot="table-row" slot-scope="props">
                        <span v-if="props.column.field == 'id_seccion'">
                          <b-button size="sm" :variant="props.row.estado==0 ? 'success' : 'danger'" @click="actualizarFila(props.row)" :disabled="$store.state.idRol==1 ? false : true">{{ props.row.estado==0 ? 'Activar' : 'Desactivar'}}</b-button>
                        </span>
                      </template>
                      <div slot="emptystate">
                        <h5 class="text-danger ml-5">No existen secciones asociadas a la Sede</h5>
                      </div>
                    </vue-good-table>
                    <!--{{ $store.state.datosGrados }}-->
                  </b-card-text>
                  <template #footer>
                    <b-button class="small mx-1 mt-2" variant="primary" @click="confirmarEstadosSecciones" v-if="$store.state.idRol==1 && listaSecciones.length!=0">Actualizar el Estado de las Secciones</b-button>
                    <b-button class="small mx-1 mt-2" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
                  </template>
                </b-card>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Active o desactive una sección haciendo clic en el botón Activar/Desactivar.</em>
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
    name: 'seccionesie',
    components: {
      VueGoodTable
    },
    data () {
      return {
        listaSecciones: [],
        encabColumnas : [
          { label: 'Sección', field: 'seccion', sortable: false },
          { label: 'Estado', field: 'estado', formatFn: this.formatFnE, tdClass: this.tdClassFuncE, sortable: false },
          { label: '', field: 'id_seccion', sortable: false }
        ]
      }
    },
    methods: {
      validarAsociarSecciones() {
        this.$bvModal.msgBoxConfirm('¿Esta seguro de asociar las Secciones a la Sede?', {
          headerBgVariant: 'primary',
          headerTextVariant: 'light',
          bodyBgVariant: 'light',
          bodyBgClass: 'text-center',
          title: 'Asociar Secciones',
          size: '',
          buttonSize: 'sm',
          okVariant: 'primary',
          okTitle: 'Si, Asociar Secciones',
          cancelVariant: '',
          cancelTitle: 'Cancelar',
          footerClass: 'p-2',
          bodyClass: 'p-5',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.asociarSecciones()
          }
        })
      },
      async asociarSecciones() {
        let infoSeccion = {}
        infoSeccion.idInstitucion = this.$store.state.idInstitucion
        await axios
        .post(CONFIG.ROOT_PATH + 'academico/seccionesie', JSON.stringify(infoSeccion), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Asociar Secciones')
          } else{
            this.verSecciones()
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Las Secciones se han asociado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Asociar Secciones. Intente más tarde. ' + err)
        })
      },
      async confirmarEstadosSecciones() {
        this.$bvModal.msgBoxConfirm('¿Esta seguro de actualizar el estado de las Secciones?', {
          headerBgVariant: 'primary',
          headerTextVariant: 'light',
          bodyBgVariant: 'light',
          bodyBgClass: 'text-center',
          title: 'Actualizar Secciones',
          size: '',
          buttonSize: 'sm',
          okVariant: 'primary',
          okTitle: 'Si, Actualizar Secciones',
          cancelVariant: '',
          cancelTitle: 'Cancelar',
          footerClass: 'p-2',
          bodyClass: 'p-5',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.guardarDatosSecciones()
            this.$router.push('/bienvenida')
          }
        })
        return true
      },
      async guardarDatosSecciones() {
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/seccionesie/estados', JSON.stringify(this.listaSecciones), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Secciones')
          } else{
            //this.cargarDatosSecciones()
            //this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los estados de las Secciones se han actualizado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Secciones. Intente más tarde. ' + err)
        })
      },
      /*
      async cargarDatosSecciones() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/carguesecciones', {params: {idInstitucion: this.$store.state.idInstitucion}})
        .then(response => {
          if (response.data.error){
            alert(response.data.mensaje + ' - Consulta datos Secciones')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
          } else {
            if(response.data.datos != 0) {
              this.$store.commit('set', ['datosSecciones', response.data.datos])
            } else {
              this.$store.commit('set', ['datosSecciones', []])
            }
            console.log(JSON.stringify(response.data.datos))
          }
        })
        .catch(err => {
          alert('Algo salio mal y no se pudo realizar: Consulta datos Secciones. Intente más tarde. ' + err)
          location.replace(CONFIG.ROOT_WEBSITE)
        })
      },
      */
      actualizarFila(fila) {
        let nuevoEstado = null
        if (fila.estado == 0) {
          nuevoEstado = 1
        } else {
          nuevoEstado = 0
        }
        this.listaSecciones.forEach(element => {
          if (element.id == fila.id) {
            element.estado = nuevoEstado
          }
        })
      },
      async verSecciones() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/cargueseccionesconfig', {params: {idInstitucion: this.$store.state.idInstitucion}})
        .then(response => {
          if (response.data.error){
            alert(response.data.mensaje + ' - Consulta datos Secciones')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
          } else {
            if(response.data.datos != 0) {
              this.listaSecciones =  response.data.datos
            } else {
              this.listaSecciones =  []
            }
          }
        })
        .catch(err => {
          alert('Algo salio mal y no se pudo realizar: Consulta datos Secciones. Intente más tarde. ' + err)
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
        this.verSecciones()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>