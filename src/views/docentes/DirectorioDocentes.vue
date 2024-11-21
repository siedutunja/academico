<template>
  <div>
    <b-row>
      <b-col lg="12">
        <h3 class="ml-2"><b-icon icon="person-square" aria-hidden="true"></b-icon> DIRECTORIO DE DOCENTES</h3>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <div class="card-header-actions float-right">
              <b-button class="mx-2" size="sm" variant="primary" title="Descargar Excel">
                <vue-excel-xlsx style="border: none; padding: 0px; background: none; color: white" :data="listaDocentes" :columns="encabColumnas" :file-name="'ListaDocentes'" :file-type="'xlsx'" :sheet-name="'Docentes'">
                  <b-icon icon="file-earmark-excel"></b-icon>
                </vue-excel-xlsx>
              </b-button>
            </div>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> LISTA DE DOCENTES</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <vue-good-table :columns="encabColumnas" :rows="listaDocentes" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                  <div slot="emptystate">
                    <h5 class="text-danger ml-5">No se encontraron docentes</h5>
                  </div>
                </vue-good-table>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Exporte el directorio a Excel haciendo clic en el botón con el icono de Excel.</em>
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
    name: 'directoriodocentes',
    components: {
      VueGoodTable
    },
    data () {
      return {
        listaDocentes: [],
        encabColumnas : [
          { label: 'Docente', field: 'docente', sortable: false },
          { label: 'Tipo', field: 'nemo', sortable: false },
          { label: 'Documento', field: 'documento', sortable: false },
          { label: 'Dirección', field: 'direccion', sortable: false },
          { label: 'Municipio', field: 'munDireccion', sortable: false },
          { label: 'Teléfono', field: 'telefono1', sortable: false },
          { label: 'Correo', field: 'correo', sortable: false, },
          { label: 'Estado', field: 'estado', tdClass: this.tdClassFuncE, sortable: false },
        ]
      }
    },
    methods: {
      cancelarFormulario() {
        this.$refs['modalConsultaDocente'].hide()
      },
      async consultarListaDocentes() {
        this.listaDocentes = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/docentes/directorio', {params: {idInstitucion: this.$store.state.idInstitucion}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Directorio Docentes')
          } else{
            if (response.data.datos != 0) {
              this.listaDocentes = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Directorio Docentes. Intente más tarde.' + err)
        })
      },
      tdClassFuncE(row) {
        if (row.estado == 'INACTIVO') { 
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
      this.consultarListaDocentes()
    }
  }
</script>