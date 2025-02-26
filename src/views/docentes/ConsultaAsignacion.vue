<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> CONSULTA ASIGNACIÓN ACADÉMICA</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Seleccione la Consulta:" label-for="informes" class="etiqueta">
                  <b-form-select id="informes" ref="informes" v-model="idInforme" :options="comboInformes"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <div v-if="idInforme==1">
              <b-row><b-col lg="12"><hr></b-col></b-row>
              <b-row>
                <b-col lg="12">
                  <vue-good-table ref="profes" :columns="encabColumnasDocentes" :rows="listaDocentes" styleClass="vgt-table condensed bordered striped" :line-numbers="true" :search-options="{enabled: true,placeholder: 'Filtrar docentes...'}"
                    :select-options="{enabled: true,selectionText: 'Docentes seleccionados',clearSelectionText: 'Limpiar',}">
                    <template #selected-row-actions>
                      <button class="small btn btn-primary" @click="imprimirAsignacionDocentes()">Imprimir Asignación</button>
                    </template>
                    <template slot="table-row" slot-scope="props">
                      <span v-if="props.column.field == 'id'">
                        <span style="font-weight: bold; color: blue; cursor: pointer" @click="consultaAsignacionDocente(props.row)" title="Ver Asignación Docente"><CIcon name="cilZoom"/></span>
                      </span>
                    </template>
                    <div slot="emptystate">
                      <h5 class="text-danger ml-5">No existen Docentes</h5>
                    </div>
                  </vue-good-table>
                </b-col>
              </b-row>
            </div>
            <div v-if="idInforme==2">
              <b-row><b-col lg="12"><hr></b-col></b-row>
              <b-row>
                <b-col lg="6">
                  <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                    <b-form-select id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="listarCursosSede()"></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row class="mt-2" v-if="idSede!=null">
                <b-col lg="12">
                  <vue-good-table ref="cursitos" :columns="encabColumnasCursos" :rows="listaCursos" styleClass="vgt-table condensed bordered striped" :line-numbers="true" :search-options="{enabled: true,placeholder: 'Filtrar cursos...'}"
                    :select-options="{enabled: true,selectionText: 'cursos seleccionados',clearSelectionText: 'Limpiar',}">
                    <template #selected-row-actions>
                      <button class="small btn btn-primary" @click="imprimirAsignacionCursos()">Imprimir Asignación</button>
                    </template>
                    <template slot="table-row" slot-scope="props">
                      <span v-if="props.column.field == 'id'">
                        <span style="font-weight: bold; color: blue; cursor: pointer" @click="consultaAsignacionCurso(props.row)" title="Ver Asignación Curso"><CIcon name="cilZoom"/></span>
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
            <em>Seleccione la consulta que desea realizar.</em>
          </template>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalConsultaAsignacionDocente" size="xl" scrollable hide-footer title="Consulta Asignación Académica por Docente" ok-only>
      <div class="mx-3">
        <div>
          <ConsultaAsignacionDocente :datosDocente="datosDocente" @retorno="datosRecibidosConsultaD"/>
        </div>
      </div>
    </b-modal>
    <b-modal ref="modalConsultaAsignacionCurso" size="xl" scrollable hide-footer title="Consulta Asignación Académica por Curso" ok-only>
      <div class="mx-3">
        <div>
          <ConsultaAsignacionCurso :datosCurso="datosCurso" @retorno="datosRecibidosConsultaC"/>
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
  import ConsultaAsignacionDocente from '@/views/docentes/ConsultaAsignacionDocente'
  import ConsultaAsignacionCurso from '@/views/docentes/ConsultaAsignacionCurso'

  export default {
    name: 'consultaasignacion',
    components: {
      VueGoodTable,
      ConsultaAsignacionDocente,
      ConsultaAsignacionCurso
    },
    data () {
      return {
        idInforme: null,
        comboInformes: [
          { 'value': 1, 'text': 'ASIGNACIÓN ACADÉMICA POR DOCENTE'},
          { 'value': 2, 'text': 'ASIGNACIÓN ACADÉMICA POR CURSO'},
        ],
        listaCursos: [],
        encabColumnasCursos : [
          { label: 'Curso', field: 'nomenclatura' },
          { label: 'Jornada', field: 'jornada', sortable: false },
          { label: 'Director', field: 'director', sortable: false },
          { label: '', field: 'id', sortable: false }
        ],
        listaDocentes: [],
        encabColumnasDocentes: [
          { label: 'Apellidos y Nombres del Docente', field: 'docente' },
          { label: '', field: 'id', sortable: false }
        ],
        datosDocente: {
          id: null,
          docente: null
        },
        profesSeleccionados: [],
        idSede: null,
        comboSedes: [],
        datosCurso: {
          id: null,
          nomenclatura: null,
          jornada: null,
          director: null,
        },
        cursosSeleccionados: [],
      }
    },
    methods: {
      imprimirAsignacionCursos() {
        this.cursosSeleccionados = []
        this.$refs.cursitos.selectedRows.forEach(element => {
          this.cursosSeleccionados.push({ 'id': element.id, 'cu': element.nomenclatura, 'jo': element.jornada, 'di': element.director })
        });
        let uri = "?datos=" + JSON.stringify(this.cursosSeleccionados) + "&idIE=" + this.$store.state.idInstitucion + "&ie=" + this.$store.state.nombreInstitucion + "&vigencia=" + this.$store.state.aLectivo + "&escudo=" + this.$store.state.escudoInstitucion
        let encoded = encodeURI(uri);
        //window.open("http://localhost/siedutunja/php/informes/asignacion-cursos.php" + encoded,"_blank")
        window.open("https://siedutunja.gov.co/php/informes/asignacion-cursos.php" + encoded,"_blank")
        return true
      },
      imprimirAsignacionDocentes() {
        this.profesSeleccionados = []
        this.$refs.profes.selectedRows.forEach(element => {
          this.profesSeleccionados.push({ 'id': element.id, 'do': element.docente })
        });
        let uri = "?datos=" + JSON.stringify(this.profesSeleccionados) + "&idIE=" + this.$store.state.idInstitucion + "&ie=" + this.$store.state.nombreInstitucion + "&vigencia=" + this.$store.state.aLectivo + "&escudo=" + this.$store.state.escudoInstitucion
        let encoded = encodeURI(uri);
        //window.open("http://localhost/siedutunja/php/informes/asignacion-docentes.php" + encoded,"_blank")
        window.open("https://siedutunja.gov.co/php/informes/asignacion-docentes.php" + encoded,"_blank")
        return true
      },
      consultaAsignacionCurso(item) {
        //console.log(JSON.stringify(item))
        this.datosCurso.id = item.id
        this.datosCurso.nomenclatura = item.nomenclatura
        this.datosCurso.jornada = item.jornada
        this.datosCurso.director = item.director
        this.$refs['modalConsultaAsignacionCurso'].show()
      },
      consultaAsignacionDocente(item) {
        //console.log(JSON.stringify(item))
        this.datosDocente.id = item.id
        this.datosDocente.docente = item.docente
        this.$refs['modalConsultaAsignacionDocente'].show()
      },
      datosRecibidosConsultaD(retorno) {
        this.$refs['modalConsultaAsignacionDocente'].hide()
      },
      datosRecibidosConsultaC(retorno) {
        this.$refs['modalConsultaAsignacionCurso'].hide()
      },
      listarCursosSede() {
        this.listaCursos = []
        this.$store.state.datosCursos.forEach(element => {
          if (element.id_sede == this.idSede) {
            this.listaCursos.push({ 'id': element.id, 'nomenclatura': element.nomenclatura.toUpperCase(), 'jornada': element.jornada, 'director': element.docente })
          }
          //console.log(JSON.stringify(this.$store.state.datosCursos))
        })
      },
      async ocuparComboSedes() {
        this.comboSedes = []
        this.$store.state.datosSedes.forEach(element => {
          this.comboSedes.push({ 'value': element.id, 'text': element.sede.toUpperCase() })
        })
      },
      async cargueListaDocentes() {
        this.listaDocentes = []
        this.listaDocentes = this.$store.state.datosDocentes
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.ocuparComboSedes()
      this.cargueListaDocentes()
    }
  }
</script>