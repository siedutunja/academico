<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <vue-good-table :columns="encabColumnas" :rows="listaEstudiantes" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
          <div slot="emptystate">
            <h5 class="text-danger ml-5">No existen estudiantes Retirados</h5>
          </div>
        </vue-good-table>
      </b-col>
    </b-row>
    <div v-if="listaEstudiantes">
      <b-button class="small mx-1 mt-5" variant="primary" @click="imprimirInforme">Imprimir Informe</b-button>
      <vue-excel-xlsx class="mx-1 mt-5 small btn btn-outline-primary" :data="listaEstudiantes" :columns="encabColumnas" :file-name="'Informe-Retirados ' + new Date().toLocaleDateString()" :file-type="'xlsx'" :sheet-name="'Informe-Retirados ' + $store.state.aLectivo">
        Exportar a Excel
      </vue-excel-xlsx>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'

  export default {
    name: 'inforetirados',
    components: {
      VueGoodTable
    },
    data () {
      return {
        listaEstudiantes: [],
        encabColumnas : [
          { label: 'Apellidos y Nombres del Estudiante', field: 'estudiante', sortable: true },
          { label: 'Documento', field: 'documento', sortable: true },
          { label: 'Sede', field: 'sede', sortable: true },
          { label: 'Grado-Curso', field: 'nomenclatura', sortable: true },
          { label: 'Fecha', field: 'fecha', sortable: true },
        ],
      }
    },
    methods: {
      imprimirInforme() {
        let uri = "?idIE=" + this.$store.state.idInstitucion + "&ie=" + this.$store.state.nombreInstitucion + "&vigencia=" + this.$store.state.aLectivo + "&escudo=" + this.$store.state.escudoInstitucion
        let encoded = encodeURI(uri);
        //window.open("http://localhost/siedutunja/php/informes/informe-retirados.php" + encoded,"_blank")
        window.open("https://siedutunja.gov.co/php/informes/informe-retirados.php" + encoded,"_blank")
        return true
      },
      async consultarEstudiantes() {
        this.listaEstudiantes = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/informes/estudiantesretirados', {params: {idInstitucion: this.$store.state.idInstitucion, vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Estudiantes Retirados')
          } else{
            if (response.data.datos != 0) {
              this.listaEstudiantes = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Estudiantes Retirados. Intente más tarde.' + err)
        })
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.consultarEstudiantes()
    }
  }
</script>