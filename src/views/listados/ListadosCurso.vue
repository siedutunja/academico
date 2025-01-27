<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> LISTAS DE ESTUDIANTES POR CURSO</h5>
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
                    <template slot="table-row" slot-scope="props">
                      <span v-if="props.column.field == 'id'">
                        <span style="font-weight: bold; color: blue; cursor: pointer" @click="consultaListaCurso(props.row)" title="Vista Curso"><CIcon name="cilZoom"/></span>
                      </span>
                    </template>
                    <div slot="emptystate">
                      <h5 class="text-danger ml-5">No existen Cursos en la Sede</h5>
                    </div>
                  </vue-good-table>
                </b-col>
                <b-col lg="6">
                  <b-form-group>
                    <h4>Seleccione los campos que desea adicionar en las Listas</h4>
                    <b-form-checkbox class="ml-4 m-3" v-for="campo in campos" v-model="camposSeleccionados" :key="campo.value" :value="campo.value" :disabled="campo.disabled" size="lg">
                      {{ campo.text }}
                    </b-form-checkbox>
                  </b-form-group>
                  <div>ORDEN DE LOS CAMPOS SELECCIONADOS: <strong>{{ camposSeleccionados }}</strong></div>
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
    <b-modal ref="modalConsultaListaCurso" size="xl" scrollable hide-footer title="Consulta Lista de Estudiantes" ok-only>
      <div class="mx-3">
        <div>
          <ConsultaListaCurso :datosCurso="datosCurso"  @retorno="datosRecibidosConsulta"/>
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
  import ConsultaListaCurso from '@/views/listados/ConsultaListaCurso'

  export default {
    name: 'listadoscurso',
    components: {
      VueGoodTable,
      ConsultaListaCurso
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
          { label: 'Jornada', field: 'jornada', sortable: false },
          { label: '', field: 'id', sortable: false }
        ],
        cursosSeleccionados: [],
        camposSeleccionados: [], // Must be an array reference!
        campos: [
          { value: 0, text: 'Apellidos y Nombres', disabled: true },
          { value: 1, text: 'Documento' },
          { value: 2, text: 'Fecha de Nacimiento' },
          { value: 3, text: 'Edad'},
          { value: 4, text: 'Genero'},
          { value: 5, text: 'Repitencia'},
          { value: 6, text: 'Estudiante Nuevo'},
          { value: 7, text: 'Nacionalidad'},
          { value: 8, text: 'Estrato Socioeconómico'},
          { value: 9, text: 'Grupo Sanguineo - Rh'},
          { value: 10, text: 'Sisben'},
        ],
        datosCurso: []
      }
    },
    methods: {
      consultaListaCurso(item) {
        this.datosCurso = item
        this.$refs['modalConsultaListaCurso'].show()
      },
      datosRecibidosConsulta(retorno) {
        this.$refs['modalConsultaListaCurso'].hide()
      },
      imprimirListas() {
        this.cursosSeleccionados = []
        this.$refs.cursitos.selectedRows.forEach(element => {
          this.cursosSeleccionados.push({ 'id': element.id, 'cu': element.nomenclatura, 'se': element.sede, 'jo': element.jornada })
        });
        let uri = "?datos=" + JSON.stringify(this.cursosSeleccionados) + "&ie=" + this.$store.state.nombreInstitucion + "&vigencia=" + this.$store.state.aLectivo + '&campos=' + JSON.stringify(this.camposSeleccionados)
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
    computed: {
    },
    beforeMount() {
      this.ocuparComboSedes()
    }
  }
</script>