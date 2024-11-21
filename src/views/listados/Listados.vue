<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> LISTAS GENERAL DE ESTUDIANTES POR CURSO</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Seleccione la Sede" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idGrado=null,idCurso=null,ocuparComboGradosSede()"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Seleccione el Grado" label-for="grados" class="etiqueta">
                  <b-form-select  id="grados" ref="grados" v-model="idGrado" :options="comboGrados" @change="idCurso=null,ocuparComboCursosGradosSede()"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Seleccione el Curso" label-for="cursos" class="etiqueta">
                  <b-form-select  id="cursos" ref="cursos" v-model="idCurso" :options="comboCursos" @change="verEstudiantesCurso"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mt-0" v-if="idCurso!=null">
              <b-col lg="12"><hr></b-col>
              <b-col lg="12">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Lista de Estudiantes</h5>
                  </template>
                  <b-card-text>
                    <b-row>
                      <b-col lg="12">
                        <vue-good-table :columns="encabColumnas" :rows="listaEstudiantes" styleClass="vgt-table condensed bordered striped " :line-numbers="true">
                          <template slot="table-row" slot-scope="props">
                            <span v-if="props.column.field == 'idMatricula'">
                              <span style="font-weight: bold; color: blue; cursor: pointer" @click="seleccionarEstudiante(props.row)" title="Consultar Estudiante"><CIcon name="cilPencil"/></span>
                            </span>
                          </template>
                          <div slot="emptystate">
                            <h5 class="text-danger ml-5">No existen estudiantes matriculados en el curso</h5>
                          </div>
                        </vue-good-table>
                      </b-col>
                    </b-row>
                  </b-card-text>
                  <p>Total Estudiantes: {{ contadorEstudiantes }}</p>
                </b-card>
              </b-col>
            </b-row>

          </b-card-text>
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
        idGrado: null,
        idCurso: null,
        comboSedes: [],
        comboGrados: [],
        comboCursos: [],
        listaEstudiantes: [],
        encabColumnas : [
          { label: 'Estudiante', field: 'estudiante' },
          { label: 'Documento', field: 'documento', sortable: false },
          { label: 'Nuevo', field: 'id_nuevo', sortable: false },
          { label: 'Repitente', field: 'id_repitente', sortable: false },
          { label: '', field: 'idMatricula', sortable: false }
        ],
        contadorEstudiantes: 0,
      }
    },
    methods: {
      seleccionarEstudiante(fila) {
        console.log(fila)
      },
      async verEstudiantesCurso() {
        this.listaEstudiantes = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/listas/general', { params: { idCurso: this.idCurso }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Listado General')
          } else{
            if (response.data.datos != 0) {
              this.listaEstudiantes = response.data.datos
              this.contadorEstudiantes = this.listaEstudiantes.length
            }
          }
        })
        .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Listado General. Intente más tarde. ' + err)
        })
      },
      async ocuparComboCursosGradosSede() {
        this.comboCursos = []
        this.contadorEstudiantes = 0
        this.$store.state.datosCursos.forEach(element => {
          if (element.id_grado_sede == this.idGrado) {
            this.comboCursos.push({ 'value': element.id, 'text': element.nomenclatura.toUpperCase() })
          }
        })
      },
      async ocuparComboGradosSede() {
        this.comboGrados = []
        this.$store.state.datosGrados.forEach(element => {
          if (element.id_sede == this.idSede) {
            this.comboGrados.push({ 'value': element.id, 'text': element.grado.toUpperCase() })
          }
        })
      },
      async ocuparComboSedes() {
        this.comboSedes = []
        this.$store.state.datosSedes.forEach(element => {
          this.comboSedes.push({ 'value': element.id, 'text': element.sede.toUpperCase() })
        })
      },
      cancelarFormulario() {
        this.$router.push('/')
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      if(this.$store.state.idRol == 1 || this.$store.state.idRol == 12) {
        this.ocuparComboSedes()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>