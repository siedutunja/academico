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
                <b-col lg="5">
                  <b-row>
                    <b-col lg="12">
                      <b-form-group>
                        <h5>Campos a adicionar en las Listas:</h5>
                        <b-form-checkbox class="ml-4 m-2" v-for="campo in campos" v-model="camposSeleccionados" :key="campo.value" :value="campo.value" :disabled="campo.disabled">
                          {{ campo.text }}
                        </b-form-checkbox>
                      </b-form-group>
                      <!--div>ORDEN DE LOS CAMPOS SELECCIONADOS: <strong>{{ camposSeleccionados }}</strong></div>-->
                    </b-col>
                  </b-row>
                  <b-row><b-col lg="12"><hr></b-col></b-row>
                  <b-row>
                   <b-col lg="12">
                      <b-form-group>
                        <h5>Director de Curso:</h5>
                        <b-form-checkbox id="dirCurso" ref="dirCurso" class="ml-4 m-3" v-model="director" name="check-button" switch>
                          <span class="ml-2">Incluir director de curso</span>
                        </b-form-checkbox>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row><b-col lg="12"><hr></b-col></b-row>
                  <b-row>
                    <b-col lg="12">
                      <b-form-group>
                        <h5>Número de Columnas:</h5>
                        <b-row class="m-3">
                          <b-col lg="6">
                            <b-form-select id="numCol" ref="numCol" v-model="numeroColumnas" :options="comboNumeroColumnas"></b-form-select>
                          </b-col>
                        </b-row>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row><b-col lg="12"><hr></b-col></b-row>
                  <b-row>
                    <b-col lg="12">
                      <b-form-group>
                        <h5>Orientación del Papel:</h5>
                        <b-row class="m-3">
                          <b-col lg="6">
                            <b-form-select id="numCol" ref="numCol" v-model="orientacion" :options="comboOrientacion"></b-form-select>
                          </b-col>
                        </b-row>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col lg="7" class="mb-5">
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
                  <vue-good-table ref="cursitos" :columns="encabColumnas" :rows="listaCursos" styleClass="vgt-table condensed bordered striped" :line-numbers="true" :search-options="{enabled: true,placeholder: 'Filtrar cursos...'}"
                    :select-options="{enabled: true,selectionText: 'cursos seleccionados',clearSelectionText: 'Limpiar',}">
                    <template #selected-row-actions>
                      <button class="small btn btn-primary" @click="imprimirListas()">Imprimir Listas</button>
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
          { value: 11, text: 'Especialidad'},
          { value: 12, text: 'Discapacidad'},
          { value: 13, text: 'Observaciones Matricula'},
          { value: 14, text: 'Ruta'},
          { value: 15, text: 'Acudiente (Nombre,Dirección,Teléfono,Correo)'},
        ],
        datosCurso: [],
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
        numeroColumnas: 1,
        orientacion: 1,
        comboOrientacion: [
          {'value': 1, 'text': 'Vertical'},
          {'value': 2, 'text': 'Horizontal'},
        ],
        tema: '',
        objetivo: '',
        director: true
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
          this.cursosSeleccionados.push({ 'id': element.id, 'cu': element.nomenclatura, 'se': element.sede, 'jo': element.jornada, 'di': element.docente })
        });
        let uri = "?datos=" + JSON.stringify(this.cursosSeleccionados) + "&ie=" + this.$store.state.nombreInstitucion + "&vigencia=" + this.$store.state.aLectivo + '&campos=' + JSON.stringify(this.camposSeleccionados) + '&director=' + this.director + "&escudo=" + this.$store.state.escudoInstitucion + "&numeroColumnas=" + this.numeroColumnas + "&orientacion=" + this.orientacion + "&tema=" + this.tema + "&objetivo=" + this.objetivo
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
      this.ocuparComboSedes()
    }
  }
</script>