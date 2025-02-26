<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Docente: <b>{{ datosDocente.docente }}</b></h5>
          </template>
          <b-card-text>
            <vue-good-table :columns="encabColumnas" :rows="listaAsignacion" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
              <div slot="emptystate">
                <h5 class="text-danger ml-5">No existen Asignación Académica asignada.</h5>
              </div>
            </vue-good-table>
            <b-alert class="text-center" show><h4>IH Total Asignada = {{ totalIH }} horas</h4></b-alert>
          </b-card-text>
          <template #footer>
            <vue-excel-xlsx class="small mx-1 mt-2 btn btn-outline-primary" :data="listaAsignacion" :columns="encabColumnas" :file-name="'AsigAcademica-' + datosDocente.docente + ' ' + new Date().toLocaleDateString()" :file-type="'xlsx'" :sheet-name="'AsigAcademica ' + $store.state.aLectivo">
              Exportar a Excel
            </vue-excel-xlsx>
            <b-button class="small mx-1 mt-2" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
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
    name: 'consultaasignaciondocente',
    props: {
      datosDocente: Object
    },
    components: {
      VueGoodTable
    },
    data () {
      return {
        listaAsignacion: [],
        encabColumnas: [
          { label: 'Grado-Curso', field: 'nomenclatura' },
          { label: 'Asignatura', field: 'asignatura' },
          { label: 'IH', field: 'ih' },
        ],
        totalIH: 0
      }
    },
    methods: {
      async consultaListaAsignacion() {
        this.listaAsignacion = []
        this.totalIH = 0
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/cargaacademica/docente', { params: { idInstitucion: this.$store.state.idInstitucion, vigencia: this.$store.state.aLectivo, idDocente: this.datosDocente.id }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Asignación Docente')
          } else{
            if (response.data.datos != 0) {
              this.listaAsignacion = response.data.datos
              this.listaAsignacion.forEach(element => {
                this.totalIH += element.ih
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Asignación Docente. Intente más tarde.' + err)
        })
      },
      cancelarFormulario() {
        this.$emit("retorno", 0)
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.consultaListaAsignacion()
    }
  }
</script>