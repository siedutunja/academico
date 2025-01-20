<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> GENERADOR DE LISTAS DE ESTUDIANTES</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Seleccione la Sede" label-for="sedes" class="etiqueta">
                  <b-form-select id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="ocuparlistaCursosSede()"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <div v-if="idSede!=null">
              <b-row>
                <b-col lg="12"><hr></b-col>
              </b-row>
              <b-row>
                <b-col lg="6">
                  <vue-good-table ref="cursitos" :columns="encabColumnas" :rows="listaCursos" styleClass="vgt-table condensed bordered striped" :line-numbers="true"
                    :select-options="{
                        enabled: true,
                        selectionText: 'cursos seleccionados',
                        clearSelectionText: 'Limpiar',
                      }">
                    <template #selected-row-actions>
                      <button @click="imprimirListas()">Imprimir Listas</button>
                    </template>
                    <div slot="emptystate">
                      <h5 class="text-danger ml-5">No existen Cursos en la Sede</h5>
                    </div>
                  </vue-good-table>
                </b-col>
                <b-col lg="6">
                  <p>*</p>
                </b-col>
              </b-row>
            </div>
          </b-card-text>
          <template #footer>
            <em>Imprima las Listas de Estudiantes seleccionando la Sede y luego seleccionando el o los Cursos.</em>
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
    name: 'listados',
    components: {
      VueGoodTable
    },
    data () {
      return {
        idSede: null,
        idCurso: null,
        comboSedes: [],
        listaCursos: [],
        listaEstudiantes: [],
        encabColumnas : [
          { label: 'Curso', field: 'nomenclatura' },
          { label: 'Jornada', field: 'jornada', sortable: false }
        ],
        cursosSeleccionados: []
      }
    },
    methods: {
      imprimirListas() {
        this.cursosSeleccionados = []
        this.$refs.cursitos.selectedRows.forEach(element => {
          this.cursosSeleccionados.push({ 'id': element.id, 'cu': element.nomenclatura, 'se': element.sede, 'jo': element.jornada })
        });
        let uri = "?datos=" + JSON.stringify(this.cursosSeleccionados) + "&ie=" + this.$store.state.nombreInstitucion + "&vigencia=" + this.$store.state.aLectivo
        let encoded = encodeURI(uri);
        //window.open("http://localhost/siedutunja/php/listas/listas-01.php" + encoded,"_blank")
        window.open("https://siedutunja.gov.co/php/listas/listas-01.php" + encoded,"_blank")
        return true
      },
      async ocuparlistaCursosSede() {
        this.listaCursos = []
        this.$store.state.datosCursos.forEach(element => {
          if (element.id_sede == this.idSede) {
            this.listaCursos.push(element)
          }
        })
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
    beforeMount() {
      this.ocuparComboSedes()
    }
  }
</script>