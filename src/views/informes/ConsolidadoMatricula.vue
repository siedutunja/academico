<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <b-button class="mx-2 float-right" size="sm" variant="info" @click="cargarDatosSedes" title="Actualizar"><b-icon icon="arrow-repeat"></b-icon></b-button>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> CONSOLIDADO MATRICULA - {{ $store.state.aLectivo }}</h5>
          </template>
          <b-card-text>
            <b-row>
              <!--
              <b-col lg="2">
                <b-alert class="text-center" variant="success" show>
                  <p>Total Activos</p>
                  <h2>{{ totalIEActivos }}</h2>
                </b-alert>
              </b-col>
              <b-col lg="2">
                <b-alert class="text-center" variant="danger" show>
                  <p>Total Retirados</p>
                  <h2>{{ totalIERetiros }}</h2>
                </b-alert>
              </b-col>
              -->
              <b-col lg="12">
                <b-alert class="text-center" variant="success" show>
                  <p>Total Matriculados</p>
                  <h2>{{ totalIE }}</h2>
                </b-alert>
              </b-col>
              <!--
              <b-col lg="2">
                <b-alert class="text-center" variant="primary" show>
                  <p>Total Nuevos</p>
                  <h2>{{ totalIENuevos }}</h2>
                </b-alert>
              </b-col>
              <b-col lg="2">
                <b-alert class="text-center" variant="info" show>
                  <p>Total Repitentes</p>
                  <h2>{{ totalIERepitentes }}</h2>
                </b-alert>
              </b-col>
              -->
            </b-row>
            <b-row>
              <b-col lg="12">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Matriculados por Sede</h5>
                  </template>
                  <b-card-text>
                    <vue-good-table :columns="encabColumnas" :rows="listaSedes" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                      <template slot="table-row" slot-scope="props">
                        <span v-if="props.column.field == 'id'">
                          <span style="font-weight: bold; color: blue; cursor: pointer" @click="seleccionarSede(props.row)" title="Datos de la Sede"><CIcon name="cilZoom"/></span>
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
          <b-row>
            <b-col>
              <b-button class="small mx-1 mt-2" variant="primary" @click="imprimirFormulario">Imprimir Consolidado</b-button>
              <vue-excel-xlsx class="mx-1 mt-2 small btn btn-outline-primary" variant="primary" :data="listaExportar" :columns="encabColumnasExcel" :file-name="'ConsolidadoMatricula-' + this.$store.state.aLectivo" :file-type="'xlsx'" :sheet-name="'Matriculados-' + this.$store.state.aLectivo">
                Exportar a Excel
              </vue-excel-xlsx>
            </b-col>
          </b-row>
          <template #footer>
            <em>Consulte la matricula por Grados de una Sede haciendo clic en la lupa.</em>
          </template>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalConsolidadoMatriculaSede" size="xl" scrollable hide-footer title="Consolidado de Matricula por Sede" ok-only>
      <div class="mx-3">
        <div>
          <ConsolidadoMatriculaSede :datosMatriculaSede="datosMatriculaSede" @retorno="datosRecibidos"/>
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
  import ConsolidadoMatriculaSede from '@/views/informes/ConsolidadoMatriculaSede'

  export default {
    name: 'consolidadomatricula',
    components: {
      ConsolidadoMatriculaSede,
      VueGoodTable
    },
    data () {
      return {
        listaSedes: [],
        totalIE: 0,
        totalIEActivos: 0,
        totalIERetiros: 0,
        encabColumnas : [
          { label: 'Nombre de la Sede', field: 'sede', sortable: false },
          { label: 'Activos', field: 'totalSedeActivos', sortable: false },
          { label: 'Retirados', field: 'totalSedeRetiros', sortable: false },
          //{ label: 'Sin Curso', field: 'totalSedeSinCurso', sortable: false },
          { label: 'Total', field: 'totalSede', sortable: false },
          //{ label: 'Nuevos', field: 'totalSedeNuevos', sortable: false },
          //{ label: 'Repitentes', field: 'totalSedeRepitentes', sortable: false },
          { label: '', field: 'id', sortable: false }
        ],
        encabColumnasExcel : [
          { label: 'Estudiante', field: 'estudiante' },
          { label: 'Documento', field: 'documento' },
          { label: 'Sede', field: 'sede' },
          { label: 'Grado', field: 'grado' },
          { label: 'Curso', field: 'curso' },
          { label: 'Jornada', field: 'jornada' },
          { label: 'Estado', field: 'estado' },
          { label: 'Nuevo', field: 'id_nuevo' },
          { label: 'Repitente', field: 'id_repitente' },
          { label: 'Fecha Renovación', field: 'creado' }
        ],
        datosMatriculaSede: [],
        listaExportar: []
      }
    },
    methods: {
      async exportarExcel() {
        this.listaExportar = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/informes/consolidadomatricula/excel', {params: {idInstitucion: this.$store.state.idInstitucion, vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta datos matricula Excel Sedes Activas')
          } else {
            if(response.data.datos != 0) {
              this.listaExportar = response.data.datos
              //console.log(JSON.stringify(this.listaExportar))
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta datos matricula Excel Sedes Activas. Intente más tarde. ' + err)
        })
      },
      imprimirFormulario() {
        let uri = "?datos=" + JSON.stringify(this.listaSedes) + "&ie=" + this.$store.state.nombreInstitucion + "&vigencia=" + this.$store.state.aLectivo
        let encoded = encodeURI(uri);
        //window.open("http://localhost/siedutunja/php/informes/consolidado-matricula.php" + encoded,"_blank")
        window.open("https://siedutunja.gov.co/php/informes/consolidado-matricula.php" + encoded,"_blank")
        return true
      },
      seleccionarSede(item) {
        this.datosMatriculaSede = item
        this.$refs['modalConsolidadoMatriculaSede'].show()
      },
      async cargarDatosSedes() {
        this.listaSedes = []
        this.totalIE = 0
        this.totalIEActivos = 0
        this.totalIERetiros = 0
        this.totalIENuevos = 0
        this.totalIERepitentes = 0
        this.totalIESinCurso = 0
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/informes/consolidadomatricula', {params: {idInstitucion: this.$store.state.idInstitucion, vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta datos matricula Sedes Activas')
          } else {
            if(response.data.datos != 0) {
              this.listaSedes = response.data.datos
              //console.log(JSON.stringify(this.listaSedes))
              this.listaSedes.forEach(element => {
                element.totalSede = 0
                element.totalSedeActivos = 0
                element.totalSedeRetiros = 0
                element.totalSedeNuevos = 0
                element.totalSedeRepitentes = 0
                element.totalSedeSinCurso = 0
                element.grados.forEach(element2 => {
                  element.totalSede += element2.totalMatGrado
                  element.totalSedeActivos += element2.totalActivosGrado
                  element.totalSedeRetiros += element2.totalRetirosGrado
                  element.totalSedeNuevos += element2.totalNuevosGrado
                  element.totalSedeRepitentes += element2.totalRepitentesGrado
                  element.totalSedeSinCurso += element2.totalSinCursoGrado
                  this.totalIE += element2.totalMatGrado
                  this.totalIEActivos += element2.totalActivosGrado
                  this.totalIERetiros += element2.totalRetirosGrado
                  this.totalIENuevos += element2.totalNuevosGrado
                  this.totalIERepitentes += element2.totalRepitentesGrado
                  this.totalIESinCurso += element2.totalSinCursoGrado
                })
              })
            }
          }
          this.exportarExcel()
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta datos matricula Sedes Activas. Intente más tarde. ' + err)
        })
      },
      datosRecibidos() {
        this.$refs['modalConsolidadoMatriculaSede'].hide()
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.cargarDatosSedes()
    }
  }
</script>