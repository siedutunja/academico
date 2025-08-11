<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> FORMATO OBSERVADOR</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <div v-if="btnCargando">
                  <div class="text-center m-5 text-primary">
                    <b-spinner style="width: 3rem; height: 3rem;" label="Spinner"></b-spinner>
                    <br><strong>Cargando informe...</strong>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                  <b-form-select id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="ocuparComboCursos(),idCurso=null,estConsultados=null"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Seleccione el Curso:" label-for="cursos" class="etiqueta">
                  <b-form-select id="cursos" ref="cursos" v-model="idCurso" :options="comboCursos" @change="generarListadoEstudiantes(),estConsultados=null" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="3" class="mt-2">
                <b-button class="small mx-1 mt-4" variant="success" @click="seleccionarEstudiantes()" :disabled="idCurso!=null ? false : true">Seleccionar Estudiantes</b-button>
              </b-col>
            </b-row>
            <b-row v-if="estConsultados">
              <b-col lg="12">
                <b-card>
                  <b-card-text>
                    <b-row v-if="!btnCargando">
                      <b-col lg="12">
                        <div v-if="$store.state.idInstitucion == 'f5529ba0-fcb3-11ec-8267-536b07c743c4'"> <!-- Gustavo Rojas -->
                          <GustavoRojas :estudiantesSeleccionados="estudiantesSeleccionados" :sede="nombreSede" :curso="nombreCurso" :jornada="nombreJornada"/>
                        </div>
                        <div v-else> <!-- Formato General -->
                          <FormatoGeneral :estudiantesSeleccionados="estudiantesSeleccionados" :sede="nombreSede" :curso="nombreCurso" :jornada="nombreJornada"/>
                        </div>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalSeleccionarEstudiantes" size="xl" scrollable hide-footer title="Seleccionar Cursos" ok-only>
      <div class="mx-3">
        <div>
          <vue-good-table ref="estudianticos" :columns="encabColumnas" :rows="listaEstudiantes" styleClass="vgt-table condensed bordered striped" :line-numbers="true" :search-options="{enabled: true,placeholder: 'Filtrar estudiantes...'}"
            :select-options="{enabled: true,selectionText: 'estudiantes seleccionados',clearSelectionText: 'Limpiar',}">
            <template #selected-row-actions>
              <button class="small btn btn-success" @click="procesarFormatoObservador()">Seleccionar >></button>
            </template>
            <div slot="emptystate">
              <h5 class="text-danger ml-5">No existen Estudiantes en el Curso</h5>
            </div>
          </vue-good-table>
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
  import GustavoRojas from '@/views/listados/observadores/GustavoRojas'
  import FormatoGeneral from '@/views/listados/observadores/FormatoGeneral'

  export default {
    name: 'formatoobservador',
    props: {
    },
    components: {
      VueGoodTable,
      GustavoRojas,
      FormatoGeneral,
    },
    data () {
      return {
        idSede: null,
        comboSedes: [],
        nombreSede: null,
        idCurso: null,
        comboCursos: [],
        nombreCurso: null,
        nombreJornada: null,
        listaEstudiantes: [],
        btnCargando: false,
        datosSeccion: {},
        encabColumnas: [
          { label: 'Estudiante', field: 'estudiante' },
          //{ label: '', field: 'id', sortable: false }
        ],
        estudiantesSeleccionados: [],
        fechaImpresion: null,
        estConsultados: false,
      }
    },
    methods: {
      generarListadoEstudiantes() {
        this.listaEstudiantes = this.$store.state.datosDataEstudiantes.filter(e => e.idCurso == this.idCurso)
        this.listaEstudiantes.forEach(element => {
          element.edad = this.calcularEdad(element.fnace) + " Años"
        })
        this.nombreSede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
        this.nombreCurso = document.getElementById('cursos')[document.getElementById('cursos').selectedIndex].text
        this.$store.state.datosCursos.forEach(element => {
          if (element.id == this.idCurso) {
            this.nombreJornada = element.jornada
          }
        })
        //console.log(JSON.stringify(this.listaEstudiantes))
      },
      procesarFormatoObservador() {
        this.estConsultados = true
        this.estudiantesSeleccionados = this.$refs.estudianticos.selectedRows
        this.$refs['modalSeleccionarEstudiantes'].hide()
      },
      seleccionarEstudiantes() {
        this.$refs['modalSeleccionarEstudiantes'].show()
      },
      calcularEdad(fecha) {
        var hoy = new Date()
        var cumpleanos = new Date(fecha)
        var edad = hoy.getFullYear() - cumpleanos.getFullYear()
        var m = hoy.getMonth() - cumpleanos.getMonth()
        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--
        }
        return edad
      },
      async ocuparComboCursos() {
        this.comboCursos = []
        this.$store.state.datosCursos.forEach(element => {
          if (element.id_sede == this.idSede) {
            this.comboCursos.push({ 'value': element.id, 'text': element.nomenclatura.toUpperCase(), 'jornada': element.jornada })
          }
        })
        //console.log(JSON.stringify(this.$store.state.datosCursos))
      },
      async ocuparComboSedes() {
        this.comboSedes = []
        this.$store.state.datosSedes.forEach(element => {
          this.comboSedes.push({ 'value': element.id, 'text': element.sede.toUpperCase() })
        })
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    computed: {
    },
    beforeMount() {
      this.datosSeccion = this.$store.state.datosSecciones[this.$store.state.idSeccion - 1]
      this.ocuparComboSedes()
    }
  }
</script>
