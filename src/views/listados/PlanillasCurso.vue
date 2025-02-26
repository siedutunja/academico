<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> PLANILLAS Y FORMATOS POR CURSO</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
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
                  <b-form-group>
                    <h4>Seleccione la planilla o formato que desea generar:</h4>
                    <b-form-radio-group class="ml-4 m-3" v-model="planillaSeleccionada" :options="campos" size="lg" stacked></b-form-radio-group>
                  </b-form-group>
                  <div class="ml-4" v-if="planillaSeleccionada==0">
                    <hr>
                    <b-form-group label="Número de Columnas:" label-for="numCol" class="etiqueta">
                      <b-form-select id="numCol" ref="numCol" v-model="numeroColumnas" :options="comboNumeroColumnas"></b-form-select>
                    </b-form-group>
                  </div>
                  <div class="ml-4" v-if="planillaSeleccionada==0 || planillaSeleccionada==3">
                    <hr>
                    <b-row>
                      <b-col lg="12">
                        <b-form-group label="Titulo del Tema o Actividad:" label-for="tema" class="etiqueta">
                          <b-form-input id="tema" ref="tema" v-model.trim="tema" autocomplete="off" maxlength="50"></b-form-input>
                          <b-form-text id="tema">Ingrese el titulo del tema o actividad para ser visualizado en la planilla, de lo contrario deje el campo vacio.</b-form-text>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col lg="12">
                        <b-form-group label="Objetivo del Tema o Actividad:" label-for="objetivo" class="etiqueta">
                          <b-form-input id="objetivo" ref="objetivo" v-model.trim="objetivo" autocomplete="off" maxlength="100"></b-form-input>
                          <b-form-text id="objetivo">Ingrese el objetivo del tema o actividad para ser visualizado en la planilla, de lo contrario deje el campo vacio.</b-form-text>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </div>
                  <div class="ml-4" v-if="planillaSeleccionada==4">
                    <hr>
                    <b-form-group label="Número de Horas Diarias:" label-for="numHoras" class="etiqueta">
                      <b-form-select id="numHoras" ref="numHoras" v-model="numeroHoras" :options="comboNumeroHoras"></b-form-select>
                    </b-form-group>
                  </div>
                </b-col>
                <b-col lg="6" class="mb-5">
                  <vue-good-table ref="cursitos" :columns="encabColumnas" :rows="listaCursos" styleClass="vgt-table condensed bordered striped" :line-numbers="true" :search-options="{enabled: true,placeholder: 'Filtrar cursos...'}"
                    :select-options="{enabled: true,selectionText: 'cursos seleccionados',clearSelectionText: 'Limpiar',}">
                    <template #selected-row-actions>
                      <button class="small btn btn-primary" @click="imprimirListas()">Imprimir Listas</button>
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
          { value: 0, text: 'Lista de estudiantes con columnas' },
          { value: 1, text: 'Planilla control mensual de actividades'},
          { value: 2, text: 'Datos de contacto del acudiente'},
          { value: 3, text: 'Planilla asistencia acudiente / padres de familia'},
          { value: 4, text: 'Planilla control de asistencia semanal'},
        ],
        comboNumeroColumnas: [
          {'value': 1, 'text': '1 columna'},
          {'value': 2, 'text': '2 columnas'},
          {'value': 3, 'text': '3 columnas'},
          {'value': 4, 'text': '4 columnas'},
          {'value': 5, 'text': '5 columnas'},
          {'value': 6, 'text': '6 columnas'},
          {'value': 7, 'text': '7 columnas'},
          {'value': 8, 'text': '8 columnas'},
          {'value': 9, 'text': '9 columnas'},
          {'value': 10, 'text': '10 columnas'},
          {'value': 11, 'text': '11 columnas'},
          {'value': 12, 'text': '12 columnas'},
          {'value': 13, 'text': '13 columnas'},
          {'value': 14, 'text': '14 columnas'},
          {'value': 15, 'text': '15 columnas'},
        ],
        tema: '',
        objetivo: '',
        numeroColumnas: 1,
        numeroHoras: 1,
        comboNumeroHoras: [
          {'value': 1, 'text': '1 hora'},
          {'value': 2, 'text': '2 horas'},
          {'value': 3, 'text': '3 horas'},
          {'value': 4, 'text': '4 horas'},
          {'value': 5, 'text': '5 horas'},
          {'value': 6, 'text': '6 horas'},
          {'value': 7, 'text': '7 horas'},
          {'value': 8, 'text': '8 horas'},
          {'value': 9, 'text': '9 horas'},
          {'value': 10, 'text': '10 horas'},
        ]
      }
    },
    methods: {
      imprimirListas() {
        this.cursosSeleccionados = []
        this.$refs.cursitos.selectedRows.forEach(element => {
          this.cursosSeleccionados.push({ 'id': element.id, 'cu': element.nomenclatura, 'se': element.sede, 'jo': element.jornada })
        });
        if (this.planillaSeleccionada == 0) {
          let uri = "?datos=" + JSON.stringify(this.cursosSeleccionados) + "&ie=" + this.$store.state.nombreInstitucion + "&vigencia=" + this.$store.state.aLectivo + "&numeroColumnas=" + this.numeroColumnas + "&escudo=" + this.$store.state.escudoInstitucion + "&tema=" + this.tema + "&objetivo=" + this.objetivo
          let encoded = encodeURI(uri);
          //window.open("http://localhost/siedutunja/php/listas/planilla-00.php" + encoded,"_blank")
          window.open("https://siedutunja.gov.co/php/listas/planilla-00.php" + encoded,"_blank")
        } else if (this.planillaSeleccionada == 1) {
          let uri = "?datos=" + JSON.stringify(this.cursosSeleccionados) + "&ie=" + this.$store.state.nombreInstitucion + "&vigencia=" + this.$store.state.aLectivo + "&escudo=" + this.$store.state.escudoInstitucion
          let encoded = encodeURI(uri);
          //window.open("http://localhost/siedutunja/php/listas/planilla-01.php" + encoded,"_blank")
          window.open("https://siedutunja.gov.co/php/listas/planilla-01.php" + encoded,"_blank")
        } else if (this.planillaSeleccionada == 2) {
          let uri = "?datos=" + JSON.stringify(this.cursosSeleccionados) + "&ie=" + this.$store.state.nombreInstitucion + "&vigencia=" + this.$store.state.aLectivo + "&escudo=" + this.$store.state.escudoInstitucion
          let encoded = encodeURI(uri);
          //window.open("http://localhost/siedutunja/php/listas/planilla-02.php" + encoded,"_blank")
          window.open("https://siedutunja.gov.co/php/listas/planilla-02.php" + encoded,"_blank")
        } else if (this.planillaSeleccionada == 3) {
          let uri = "?datos=" + JSON.stringify(this.cursosSeleccionados) + "&ie=" + this.$store.state.nombreInstitucion + "&vigencia=" + this.$store.state.aLectivo + "&escudo=" + this.$store.state.escudoInstitucion + "&tema=" + this.tema + "&objetivo=" + this.objetivo
          let encoded = encodeURI(uri);
          //window.open("http://localhost/siedutunja/php/listas/planilla-03.php" + encoded,"_blank")
          window.open("https://siedutunja.gov.co/php/listas/planilla-03.php" + encoded,"_blank")
        } else if (this.planillaSeleccionada == 4) {
          let uri = "?datos=" + JSON.stringify(this.cursosSeleccionados) + "&ie=" + this.$store.state.nombreInstitucion + "&vigencia=" + this.$store.state.aLectivo + "&escudo=" + this.$store.state.escudoInstitucion + "&numeroHoras=" + this.numeroHoras
          let encoded = encodeURI(uri);
          //window.open("http://localhost/siedutunja/php/listas/planilla-04.php" + encoded,"_blank")
          window.open("https://siedutunja.gov.co/php/listas/planilla-04.php" + encoded,"_blank")
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