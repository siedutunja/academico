<template>
  <div>
    <b-row class="mt-0">
      <b-col lg="12">
        <b-card>
          <template #header>
            <div class="float-right">
              <b-button class="mx-2" size="sm" variant="info" @click="verPreInscritos" title="Actualizar Lista Preinscritos"><b-icon icon="arrow-repeat"></b-icon></b-button>
            </div>
            <h5 class="mb-0"><b-icon icon="credit-card2-front" aria-hidden="true"></b-icon> PREINSCRITOS {{ $store.state.aLectivo }}</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col>
              <vue-good-table :columns="encabColumnas" :rows="listaPreinscritos" styleClass="vgt-table condensed bordered striped" :line-numbers="true"
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
                <template slot="table-row" slot-scope="props">
                  <span v-if="props.column.field == 'estudiante'">
                    <span style="font-weight: bold; color: blue; cursor: pointer" @click="matricularPreinscrito(props.row)">{{props.row.estudiante}}</span> 
                  </span>
                </template>
                <div slot="emptystate">
                  <h5 class="text-danger ml-5">No existen estudiantes para sentar matricula</h5>
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
    name: 'preinscritos',
    components: {
      VueGoodTable
    },
    data () {
      return {
        listaPreinscritos: [],
        encabColumnas : [
          { label: 'Apellidos y Nombres del Estudiante', field: 'estudiante' },
          { label: 'Tipo', field: 'tipodoc', sortable: false },
          { label: 'Documento', field: 'documento', sortable: false },
          { label: 'Genero', field: 'genero', sortable: false },
          { label: 'Nacionalidad', field: 'pais', sortable: false },
          { label: 'Grado', field: 'grado', sortable: false },
          { label: 'Población', field: 'id_poblacion', formatFn: this.formatFnF, sortable: false },
          { label: 'Vigencia', field: 'vigencia', sortable: false },
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
      async verPreInscritos() {
        this.listaPreinscritos = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/preinscritos', { params: { idIE: this.$store.state.idInstitucion, vigencia: this.$store.state.aLectivo }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista de preinscritos')
          } else{
            if (response.data.datos != 0) {
              this.listaPreinscritos = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista de preinscritos. Intente más tarde.' + err)
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
      cancelarFormulario() {
        this.$router.push('/')
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      if(this.$store.state.idRol == 1 || this.$store.state.idRol == 12 || this.$store.state.perMatricular == 1) {
        this.verPreInscritos()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>