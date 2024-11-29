<template>
  <div>
    <b-row class="mt-0">
      <b-col lg="12">
        <b-card>
          <template #header>
            <div class="float-right">
              <b-button class="mx-2" size="sm" variant="info" @click="verMatriculadosSinCurso(0)" title="Actualizar Lista Preinscritos"><b-icon icon="arrow-repeat"></b-icon></b-button>
            </div>
            <h5 class="mb-0"><b-icon icon="credit-card2-front" aria-hidden="true"></b-icon> MATRICULADOS SIN CURSO</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Seleccione la Sede*" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="verMatriculadosSinCursoSese(idSede)"></b-form-select>
                </b-form-group>
              </b-col>
              <!--
              <b-col lg="6">
                <b-form-group label="Seleccione el Grado*" label-for="grados" class="etiqueta">
                  <b-form-select  id="grados" ref="grados" v-model="idGrado" :options="comboGrados" @change="verMatriculadosSinCursoGrado(),verCursosGrado()" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
              -->
            </b-row>

            <b-row>
              <b-col>
              <vue-good-table :columns="encabColumnas" :rows="listaMatriculadosSinCurso" styleClass="vgt-table condensed bordered striped" :line-numbers="true"
                :search-options="{enabled: true,placeholder: 'Buscar...'}"
                :pagination-options="{
                  enabled: true,
                  mode: 'records',
                  perPage: 25,
                  position: '',
                  perPageDropdown: [50, 100, 150, 200],
                  dropdownAllowAll: false,
                  setCurrentPage: 1,
                  nextLabel: 'Siguiente',
                  prevLabel: 'Anterior',
                  rowsPerPageLabel: 'Filas por página',
                  ofLabel: 'de',
                  pageLabel: 'Página', // for 'pages' mode
                  allLabel: 'Todo',
                  //infoFn: (params) => `my own page ${params.firstRecordOnPage}`, 
                }">
                <!--
                <template slot="table-row" slot-scope="props">
                  <span v-if="props.column.field == 'estudiante'">
                    <span style="font-weight: bold; color: blue; cursor: pointer" @click="matricularPreinscrito(props.row)">{{props.row.estudiante}}</span> 
                  </span>
                </template>
                -->
                <div slot="emptystate">
                  <h5 class="text-danger ml-5">No existen estudiantes matriculados en la Sede</h5>
                </div>
              </vue-good-table>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <b-button class="ml-3" size="sm" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
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
    name: 'matriculadossincurso',
    components: {
      VueGoodTable
    },
    data () {
      return {
        comboSedes: [],
        comboGrados: [],
        idSede: null,
        idGrado: null,
        listaMatriculadosSinCurso: [],
        encabColumnas : [
          { label: 'Nombre del Estudiante', field: 'estudiante', sortable: true },
          { label: 'Documento', field: 'documento', sortable: false },
          { label: 'Sede', field: 'sede', sortable: true },
          { label: 'Grado', field: 'grado', sortable: true },
          { label: 'Nuevo', field: 'id_nuevo', sortable: true },
          { label: 'Repitente', field: 'id_repitente', sortable: true },
          //{ label: 'Repitente', field: 'id_repitente', formatFn: this.formatFnF, sortable: false }
        ]
      }
    },
    methods: {
      async matricularPreinscrito(datosPreinscrito) {
        this.$bvModal.msgBoxConfirm('Está seguro de sentar la matricula del estudiante ' + datosPreinscrito.estudiante + '?', {
          headerBgVariant: 'primary',
          headerTextVariant: 'light',
          bodyBgVariant: 'light',
          bodyBgClass: 'text-center',
          title: 'Sentar Matricula',
          size: '',
          buttonSize: 'sm',
          okVariant: 'primary',
          okTitle: 'Si, Sentar la Matricula',
          cancelVariant: 'danger',
          cancelTitle: 'Cancelar',
          bodyClass: 'p-5',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.$store.commit('set', ['datosPreinscrito', datosPreinscrito])
            this.$router.push('/matriculas/fichamatriculapreinscrito')
          }
        })
      },
      verMatriculadosSinCursoSese() {
        this.verMatriculadosSinCurso(this.idSede)
      },
      async verMatriculadosSinCurso(idSedeSeleccionada) {
        if (idSedeSeleccionada == 0) {
          this.idSede = null
        }
        this.listaMatriculadosSinCurso = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/matriculadossincurso', { params: { idIE: this.$store.state.idInstitucion, vigencia: this.$store.state.aMatriculas, idSede: idSedeSeleccionada }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista de matriculados sin curso')
          } else{
            if (response.data.datos != 0) {
              this.listaMatriculadosSinCurso = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista de matriculados sin curso. Intente más tarde.' + err)
        })
      },
      formatFnF: function(value) {
        if (value == 1) {
          return 'ICBF-TA'
        } else if (value == 2) {
          return 'SRPA'
        } else if (value == 3) {
          return 'NUEVO'
        } else if (value == 4) {
          return 'ADULTOS'
        }
        return '-'
      },
      /*
      async verCursosGrado() {
        this.listaCursosGrado = []
        this.$store.state.datosCursos.forEach(element => {
          if (element.id_grado_sede == this.idGrado) {
            this.listaCursosGrado.push(element)
          }
        })
      },
      */
      /*
      async ocuparComboGradosSede() {
        this.comboGrados = []
        this.$store.state.datosGrados.forEach(element => {
          if (element.id_sede == this.idSede) {
            this.comboGrados.push({ 'value': element.id, 'text': element.grado.toUpperCase() })
          }
        })
      },
      */
      async ocuparComboSedes() {
        this.comboSedes = []
        this.$store.state.datosSedes.forEach(element => {
          this.comboSedes.push({ 'value': element.id, 'text': element.sede.toUpperCase() })
        })
        this.comboSedes.push({ 'value': 0, 'text': ' --- TODAS LAS SEDES ---' })
      },
      cancelarFormulario() {
        this.$router.push('/')
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      if(this.$store.state.idRol == 1 || this.$store.state.idRol == 12 || this.$store.state.perMatricular == 1) {
        this.ocuparComboSedes()
        this.verMatriculadosSinCurso(0)
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>