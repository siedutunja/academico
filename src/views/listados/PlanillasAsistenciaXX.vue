<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> PLANILLAS PARA REGISTRO DE ASISTENCIA POR CURSO</h5>
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
                <b-col lg="6" class="mb-5">
                  <vue-good-table ref="cursitos" :columns="encabColumnas" :rows="listaCursos" styleClass="vgt-table condensed bordered striped" :line-numbers="true" :search-options="{enabled: true,placeholder: 'Filtrar cursos...'}"
                    :select-options="{enabled: true,selectionText: 'cursos seleccionados',clearSelectionText: 'Limpiar',}">
                    <template #selected-row-actions>
                      <button @click="imprimirListas()">Imprimir Listas</button>
                    </template>
                    <div slot="emptystate">
                      <h5 class="text-danger ml-5">No existen Cursos en la Sede</h5>
                    </div>
                  </vue-good-table>
                </b-col>
                <b-col lg="6">
                  <b-form-group>
                    <h4>Seleccione la planilla o formato que desea generar</h4>
                    <b-form-radio-group class="ml-4 m-3" v-model="planillaSeleccionada" :options="campos" size="lg" stacked></b-form-radio-group>
                  </b-form-group>
                  <div class="ml-4" v-if="planillaSeleccionada==0">
                    <hr>
                    <b-form-group label="Número de Columnas:" label-for="numCol" class="etiqueta">
                      <b-form-select id="numCol" ref="numCol" v-model="numeroColumnas" :options="comboNumeroColumnas"></b-form-select>
                    </b-form-group>
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-card-text>
          <template #footer>
            <em>Seleccione la Sede, los Cursos y la planilla o formato que desea imprimir.</em>
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
    name: 'planillascurso',
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
        cursosSeleccionados: [],
        planillaSeleccionada: '0',
        campos: [
          { value: 1, text: 'Planilla Registro de Asistencia Semanal'},
          { value: 0, text: 'Planilla general de estudiantes con columnas' },
        ],
        comboNumeroColumnas: [
          {'value': 5, 'text': '5 columnas'},
          {'value': 6, 'text': '6 columnas'},
          {'value': 7, 'text': '7 columnas'},
          {'value': 8, 'text': '8 columnas'},
          {'value': 9, 'text': '9 columnas'},
          {'value': 10, 'text': '10 columnas'}
        ],
        numeroColumnas: 5,
      }
    },
    methods: {
      imprimirListas() {
        this.cursosSeleccionados = []
        this.$refs.cursitos.selectedRows.forEach(element => {
          this.cursosSeleccionados.push({ 'id': element.id, 'cu': element.nomenclatura, 'se': element.sede, 'jo': element.jornada })
        });
        if (this.planillaSeleccionada == 0) {
          let uri = "?datos=" + JSON.stringify(this.cursosSeleccionados) + "&ie=" + this.$store.state.nombreInstitucion + "&vigencia=" + this.$store.state.aLectivo + '&numeroColumnas=' + this.numeroColumnas
          let encoded = encodeURI(uri);
          //window.open("http://localhost/siedutunja/php/listas/planilla-00.php" + encoded,"_blank")
          window.open("https://siedutunja.gov.co/php/listas/planilla-00.php" + encoded,"_blank")
        }
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
    computed: {
    },
    beforeMount() {
      this.ocuparComboSedes()
    }
  }
</script>