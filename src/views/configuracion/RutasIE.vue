<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> RUTAS DE LA INSTITUCIÓN EDUCATIVA</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <b-button class="small float-right" variant="dark" @click="nuevaRuta" v-if="$store.state.idRol==1 || $store.state.idRol==12">Nueva Ruta</b-button>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Lista de Rutas</h5>
                  </template>
                  <b-card-text>
                    <vue-good-table :columns="encabColumnas" :rows="listaRutas" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                      <template slot="table-row" slot-scope="props">
                        <span v-if="props.column.field == 'id'">
                          <span style="font-weight: bold; color: blue; cursor: pointer" @click="seleccionarRuta(props.row)" title="Consultar/Actualizar Datos de la Ruta"><CIcon name="cilPencil"/></span>
                        </span>
                      </template>
                      <div slot="emptystate">
                        <h5 class="text-danger ml-5">No existen Rutas creadas</h5>
                      </div>
                    </vue-good-table>
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Consulte o actualice los datos de una ruta haciendo clic en el lapiz.</em>
          </template>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalCrearEditarRuta" size="xl" scrollable hide-footer :title="datosRuta.editarRuta ? 'Editar Datos de la Ruta' : 'Nueva Ruta'" ok-only>
      <div class="mx-3">
        <div>
          <FichaRuta :datosRuta="datosRuta"  @retorno="datosRecibidosRuta"/>
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
  import FichaRuta from '@/views/configuracion/FichaRuta'

  export default {
    name: 'rutasie',
    components: {
      VueGoodTable,
      FichaRuta
    },
    data () {
      return {
        listaRutas: [],
        datosRuta: {
          id: null,
          ruta: null,
          id_institucion: null,
          estado: null,
          editarRuta: true
        },
        encabColumnas : [
          { label: 'Descripción de la Ruta', field: 'ruta' },
          { label: 'Estado', field: 'estado', formatFn: this.formatFnE, tdClass: this.tdClassFuncE, sortable: false },
          { label: '', field: 'id', sortable: false }
        ]
      }
    },
    methods: {
      nuevaRuta() {
        this.datosRuta.id = null
        this.datosRuta.ruta = null
        this.datosRuta.id_institucion = this.$store.state.idInstitucion
        this.datosRuta.estado = 1
        this.datosRuta.editarRuta = false
        this.$refs['modalCrearEditarRuta'].show()
      },
      seleccionarRuta(item) {
        this.datosRuta.id = item.id
        this.datosRuta.ruta = item.ruta
        this.datosRuta.id_institucion = item.id_institucion
        this.datosRuta.estado = item.estado
        this.datosRuta.editarRuta = true
        this.$refs['modalCrearEditarRuta'].show()
      },
      datosRecibidosRuta(retorno) {
        if (retorno == 1) 
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'La Ruta se ha creado correctamente.')
        else if (retorno == 2)
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos de la Ruta se han actualizado correctamente.')
        this.verRutas()
        this.$refs['modalCrearEditarRuta'].hide()
      },
      async verRutas() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/carguerutasconfig', {params: {idInstitucion: this.$store.state.idInstitucion}})
        .then(response => {
          if (response.data.error){
            alert(response.data.mensaje + ' - Consulta datos Rutas')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
          } else {
            if(response.data.datos != 0) {
              this.listaRutas =  response.data.datos
            } else {
              this.listaRutas =  []
            }
          }
        })
        .catch(err => {
          alert('Algo salio mal y no se pudo realizar: Consulta datos Rutas. Intente más tarde. ' + err)
          location.replace(CONFIG.ROOT_WEBSITE)
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
        this.verRutas()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>