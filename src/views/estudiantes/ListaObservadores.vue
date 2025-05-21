<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> OBSERVADORES POR CURSO</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idCurso=null,ocuparComboCursosSede()"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="Seleccione el Curso:" label-for="cursos" class="etiqueta">
                  <b-form-select  id="cursos" ref="cursos" v-model="idCurso" :options="comboCursosSede" @change="consultaListaCurso()" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row><b-col lg="12"><hr></b-col></b-row>
            <div v-if="idCurso!=null">
              <vue-good-table :columns="encabColumnas" :rows="listaEstudiantesCurso" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                <template slot="table-row" slot-scope="props">
                  <span v-if="props.column.field == 'idEstudiante'">
                    <span style="font-weight: bold; color: blue; cursor: pointer" @click="consultarObservador(props.row)" title="Consultar Observador"><CIcon name="cilZoom"/></span>
                  </span>
                </template>
                <div slot="emptystate">
                  <h5 class="text-danger ml-5">No existen Estudiantes matriculados en el Curso.</h5>
                </div>
              </vue-good-table>
            </div>
          </b-card-text>
          <template #footer>
            <em>Seleccione el curso donde se encuentra el estudiante y consulte el observador del estudiante haciendo clic en la lupa.</em>
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
    name: 'listaobservadores',
    components: {
      VueGoodTable
    },
    data () {
      return {
        idSede: null,
        comboSedes: [],
        idCurso: null,
        comboCursosSede: [],
        listaEstudiantesCurso: [],
        encabColumnas: [
          { label: 'Apellidos y Nombres del Estudiante', field: 'estudiante' },
          { label: 'Documento', field: 'documento' },
          { label: 'Gen', field: 'id_genero' },
          { label: 'FechaNace', field: 'fechaNace' },
          { label: 'Edad', field: 'edad' },
          { label: 'Anotaciones', field: 'numObservaciones' },
          { label: '', field: 'idEstudiante', sortable: false },
        ],
      }
    },
    methods: {
      consultarObservador(item) {
        this.$store.commit('set', ['idEstudiante', item.idEstudiante])
        this.$store.commit('set', ['idMatricula', item.idMatricula])
        this.$router.push('/estudiantes/observador')
      },      
      async consultaListaCurso() {
        await axios
        .get(CONFIG.ROOT_PATH + 'observador/listacurso', { params: { idCurso: this.idCurso }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Lista Curso')
          } else{
            if (response.data.datos != 0) {
              this.listaEstudiantesCurso = []
              response.data.datos.forEach(element => {
                element.edad = this.calcularEdad(element.fechaNace) + " Años"
              })
              this.listaEstudiantesCurso = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Lista Curso. Intente más tarde.' + err)
        })
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
      async ocuparComboCursosSede() {
        this.comboCursosSede = []
        this.$store.state.datosCursos.forEach(element => {
          if (element.id_sede == this.idSede) {
            this.comboCursosSede.push({ 'value': element.id, 'text': element.nomenclatura.toUpperCase() })
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