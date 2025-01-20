<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> {{ datosMatriculaSede.sede }}</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="2">
                <b-alert class="text-center" variant="success" show>
                  <p>Total Activos</p>
                  <h2>{{ datosMatriculaSede.totalSedeActivos }}</h2>
                </b-alert>
              </b-col>
              <b-col lg="2">
                <b-alert class="text-center" variant="danger" show>
                  <p>Total Retirados</p>
                  <h2>{{ datosMatriculaSede.totalSedeRetiros }}</h2>
                </b-alert>
              </b-col>
              <b-col lg="4">
                <b-alert class="text-center" variant="warning" show>
                  <p>Total Matriculados</p>
                  <h2>{{ datosMatriculaSede.totalSede }}</h2>
                </b-alert>
              </b-col>
              <b-col lg="2">
                <b-alert class="text-center" variant="primary" show>
                  <p>Total Nuevos</p>
                  <h2>{{ datosMatriculaSede.totalSedeNuevos }}</h2>
                </b-alert>
              </b-col>
              <b-col lg="2">
                <b-alert class="text-center" variant="info" show>
                  <p>Total Repitentes</p>
                  <h2>{{ datosMatriculaSede.totalSedeRepitentes }}</h2>
                </b-alert>
              </b-col>
            </b-row>
            <vue-good-table :columns="encabColumnas" :rows="listaGrados" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
              <div slot="emptystate">
                <h5 class="text-danger ml-5">No existen sedes creadas</h5>
              </div>
            </vue-good-table>
          </b-card-text>
          <template #footer>
            <div>
              <b-button class="small ml-3" variant="secondary" @click="cancelarFormulario">Cerrar</b-button>
            </div>
          </template>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'

  export default {
    name: 'consolidadomatriculasede',
    props: {
      datosMatriculaSede: Object
    },
    components: {
      VueGoodTable
    },
    data () {
      return {
        listaGrados: [],
        encabColumnas : [
          { label: 'Grado', field: 'grado', sortable: false },
          { label: 'Activos', field: 'totalActivosGrado', sortable: false },
          { label: 'Retirados', field: 'totalRetirosGrado', sortable: false },
          { label: 'Total Matriculados', field: 'totalMatGrado', sortable: false },
          { label: 'Nuevos', field: 'totalNuevosGrado', sortable: false },
          { label: 'Repitentes', field: 'totalRepitentesGrado', sortable: false },
        ]
      }
    },
    methods: {
      cancelarFormulario() {
        this.$emit("retorno", 0)
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.listaGrados = this.datosMatriculaSede.grados
    }
  }
</script>