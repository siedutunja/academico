<template>
  <div>
    <b-row>
      <b-col lg="12">
        <h3 class="ml-2"><b-icon icon="person-square" aria-hidden="true"></b-icon> CONSULTA DOCENTES</h3>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> LISTA DE DOCENTES</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <vue-good-table :columns="encabColumnas" :rows="listaDocentes" styleClass="vgt-table condensed bordered striped" :line-numbers="true" :search-options="{enabled: true,placeholder: 'Buscar docente...'}">
                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'idDocente'">
                      <span style="font-weight: bold; color: blue; cursor: pointer" @click="seleccionarDocente(props.row)" title="Consultar Docente"><CIcon name="cilHappy"/></span>
                    </span>
                  </template>
                  <div slot="emptystate">
                    <h5 class="text-danger ml-5">No se encontraron docentes</h5>
                  </div>
                </vue-good-table>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Consulte el docente haciendo clic en la carita feliz.</em>
          </template>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalConsultaDocente" size="xl" scrollable hide-footer title="Consulta Docente" ok-only>
      <div class="mx-3">
        <b-card>
          <b-card-text>
            <b-card>
              <b-row>
                <b-col>
                  <span>Apellidos y Nombres</span>
                  <h3>{{ datosDocente.docente }}</h3>
                </b-col>
              </b-row>
              <b-row>
                <b-col lg="10">
                  <span>Identificación</span>
                  <h5>{{ datosDocente.nemo }} No. {{ datosDocente.documento }} de {{ datosDocente.munDocumento }}</h5>
                </b-col>
                <b-col lg="2">
                  <b-alert class="text-center" :variant="datosDocente.estado ? 'success' : 'danger'" show><b>{{ datosDocente.estado ? 'ACTIVO' : 'INACTIVO' }}</b></b-alert>
                </b-col>
              </b-row>
            </b-card>
            <b-row>
              <b-col>
                <b-tabs content-class="mt-3">
                  <b-tab title="Información Personal" active>
                    <b-card style="margin-top: -17">
                      <b-card-text>
                        <b-col>
                          <b-table-simple striped hover responsive bordered fixed>
                            <b-tbody>
                              <b-tr><b-th style="width: 25%">Fecha Nacimiento:</b-th><b-td>{{ datosDocente.fecha_nacimiento!=null ? datosDocente.fecha_nacimiento.substr(0,10) : '-' }}</b-td></b-tr>
                              <b-tr><b-th style="width: 25%">Grupo Sanguineo:</b-th><b-td>{{ datosDocente.rh }}</b-td></b-tr>
                              <b-tr><b-th style="width: 25%">Dirección:</b-th><b-td>{{ datosDocente.direccion }} de {{ datosDocente.munDireccion }}</b-td></b-tr>
                              <b-tr><b-th style="width: 25%">Teléfono:</b-th><b-td>{{ datosDocente.telefono1 }} - {{ datosDocente.telefono2 }}</b-td></b-tr>
                              <b-tr><b-th style="width: 25%">Correo:</b-th><b-td>{{ datosDocente.correo }}</b-td></b-tr>
                            </b-tbody>
                          </b-table-simple>
                        </b-col>
                      </b-card-text>
                    </b-card>
                  </b-tab>
                  <b-tab title="Formación">
                    <b-card style="margin-top: -17">
                      <b-card-text>
                        <b-col>
                          <b-table-simple striped hover responsive bordered fixed>
                            <b-tbody>
                              <b-tr><b-th style="width: 25%">Último Título Obtenido:</b-th><b-td>{{ datosDocente.titulo }}</b-td></b-tr>
                              <b-tr><b-th style="width: 25%">Escalafón:</b-th><b-td>{{ datosDocente.escalafon }}</b-td></b-tr>
                            </b-tbody>
                          </b-table-simple>
                        </b-col>
                      </b-card-text>
                    </b-card>
                  </b-tab>
                  <b-tab title="Asignación Académica">
                    <b-card style="margin-top: -17">
                      <b-card-text>
                        <b-col>
                          <vue-good-table :columns="encabColumnasAsig" :rows="datosDocente.cargaso" styleClass="vgt-table condensed bordered striped" :line-numbers="true" :search-options="{enabled: true,placeholder: 'Buscar...'}">
                            <div slot="emptystate">
                              <h5 class="text-danger ml-5">No se encontraron asignaturas para el docentes</h5>
                            </div>
                          </vue-good-table>
                        </b-col>
                      </b-card-text>
                    </b-card>
                  </b-tab>
                  <b-tab title="Acceso Sistema">
                    <b-card style="margin-top: -17">
                      <b-card-text>
                        <b-col>
                          <b-table-simple striped hover responsive bordered fixed>
                            <b-tbody>
                              <b-tr><b-th style="width: 25%">Usuario:</b-th><b-td>{{ datosDocente.usuario }}</b-td></b-tr>
                              <b-tr><b-th style="width: 25%">Contraseña:</b-th><b-td>{{ $store.state.idRol==1 ? datosDocente.clave : '*********' }}</b-td></b-tr>
                              <b-tr><b-th style="width: 25%">Correo de Recuperación:</b-th><b-td>{{ datosDocente.correo }}</b-td></b-tr>
                              <b-tr><b-th style="width: 25%">ID:</b-th><b-td>{{ datosDocente.idDocente }}</b-td></b-tr>
                            </b-tbody>
                          </b-table-simple>
                        </b-col>
                      </b-card-text>
                    </b-card>
                  </b-tab>
                </b-tabs>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <div>
              <b-button class="small ml-3" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
            </div>
          </template>
        </b-card>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'

  export default {
    name: 'consultadocente',
    components: {
      VueGoodTable
    },
    data () {
      return {
        listaDocentes: [],
        datosDocente: {},
        encabColumnas : [
          { label: 'Docente', field: 'docente' },
          { label: 'Documento', field: 'documento', sortable: false },
          { label: 'Teléfono', field: 'telefono1', sortable: false },
          { label: 'Correo', field: 'correo', sortable: false, },
          { label: 'Usuario', field: 'usuario', sortable: false, },
          { label: 'Estado', field: 'estado', formatFn: this.formatFnE, tdClass: this.tdClassFuncE, sortable: false },
          { label: '', field: 'idDocente', sortable: false }
        ],
        encabColumnasAsig : [
          { label: 'Sede', field: 'sede' },
          { label: 'Grado', field: 'grado' },
          { label: 'Asignatura', field: 'asignatura', sortable: false },
          { label: 'IH', field: 'ih', sortable: false },
        ]
      }
    },
    methods: {
      cancelarFormulario() {
        this.$refs['modalConsultaDocente'].hide()
      },
      seleccionarDocente(item) {
        this.datosDocente = item
        this.$refs['modalConsultaDocente'].show()
      },
      async consultarListaDocentes() {
        this.listaDocentes = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/docentes/consulta', {params: {idInstitucion: this.$store.state.idInstitucion}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Docentes')
          } else{
            if (response.data.datos != 0) {
              this.listaDocentes = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Docentes. Intente más tarde.' + err)
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
      this.consultarListaDocentes()
    }
  }
</script>