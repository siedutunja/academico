<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> PLANILLAS AUXILIARES CON EVALUACIONES</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Seleccione Planillas:" label-for="datos" class="etiqueta">
                  <b-form-select  id="datos" ref="datos" v-model="idPlanillas" :options="comboPlanillas" @change="idDocente=null"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="6" v-if="idPlanillas==1">
                <b-form-group label="Seleccione el Docente:" label-for="docentes" class="etiqueta">
                  <b-form-select id="docentes" ref="docentes" v-model="idDocente" :options="comboDocentes" @change="consultaListaAsignacion()"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <div v-if="idDocente!=null">
              <b-row>
                <b-col lg="12"><hr></b-col>
              </b-row>
              <b-row>
                <b-col lg="12" class="mb-5">
                  <vue-good-table ref="planillita" :columns="encabColumnas" :rows="listaAsignacion" styleClass="vgt-table condensed bordered striped" :line-numbers="true" :search-options="{enabled: true,placeholder: 'Filtrar cursos...'}"
                    :select-options="{enabled: true,selectionText: 'cursos seleccionados',clearSelectionText: 'Limpiar',}">
                    <template #selected-row-actions>
                      <button class="small btn btn-primary" @click="imprimirListas()">Imprimir Cursos</button>
                    </template>
                    <div slot="emptystate">
                      <h5 class="text-danger ml-5">No existen Cursos en la Sede</h5>
                    </div>
                  </vue-good-table>
                </b-col>
              </b-row>
            </div>
          </b-card-text>
          <template #footer>
            <em>Listas auxiliares con evaluaciones.</em>
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
    name: 'planillasnotas',
    components: {
      VueGoodTable,
    },
    data () {
      return {
        idDocente: null,
        comboDocentes: [],
        idPlanillas: null,
        comboPlanillas: [
          { 'value': 1, 'text': 'PLANILLAS POR DOCENTES'},
        ],
        encabColumnas : [
          { label: 'Grado-Curso', field: 'nomenclatura' },
          { label: 'Asignatura', field: 'asignatura' },
          { label: 'IH', field: 'ih' },
          { label: '', field: 'idAsignaturaCurso', sortable: false },
          { label: '', field: 'id', sortable: false }
        ],
        planillasSeleccionadas: [],

        listaAsignacion: [],
        datosCurso: [],
      }
    },
    methods: {
      imprimirListas() {
        this.planillasSeleccionadas = []
        this.$refs.planillita.selectedRows.forEach(element => {
          this.planillasSeleccionadas.push({ 'idAsignaturaCurso': element.idAsignaturaCurso, 'id': element.id, 'cu': element.nomenclatura, 'se': element.sede, 'jo': element.jornada, 'di': element.docente, 'as': element.asignatura })
        })
        let docenteTitular = document.getElementById('docentes')[document.getElementById('docentes').selectedIndex].text
        let uri = "?datos=" + JSON.stringify(this.planillasSeleccionadas) + "&ie=" + this.$store.state.nombreInstitucion + "&vigencia=" + this.$store.state.aLectivo + "&escudo=" + this.$store.state.escudoInstitucion + "&titular=" + docenteTitular
        let encoded = encodeURI(uri);
        //window.open("http://localhost/siedutunja/php/listas/listas-05.php" + encoded,"_blank")
        window.open("https://siedutunja.gov.co/php/listas/listas-05.php" + encoded,"_blank")
        return true
      },
      async consultaListaAsignacion() {
        this.listaAsignacion = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/cargaacademica/docente', { params: { idInstitucion: this.$store.state.idInstitucion, vigencia: this.$store.state.aLectivo, idDocente: this.idDocente }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Asignación Docente')
          } else{
            if (response.data.datos != 0) {
              this.listaAsignacion = response.data.datos
            }
          }
          //console.log(JSON.stringify(this.listaAsignacion))
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Asignación Docente. Intente más tarde.' + err)
        })
      },
      async ocuparComboDocentes() {
        this.comboDocentes = []
        this.$store.state.datosDocentes.forEach(element => {
          this.comboDocentes.push({ 'value': element.id, 'text': element.docente.toUpperCase() })
        })
        //console.log(JSON.stringify(this.$store.state.datosDocentes))
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    computed: {
    },
    beforeMount() {
      this.ocuparComboDocentes()
    }
  }
</script>