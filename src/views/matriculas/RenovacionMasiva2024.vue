<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="6">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> ESTUDIANTES PARA RENOVAR DEL AÑO 2024</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Sede*" label-for="sedesA" class="etiqueta">
                  <b-form-select  id="sedesA" ref="sedesA" v-model="idSedeA" :options="comboSedesA" @change="idGradoSedeA=null,ocuparComboGradosSedeA()"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="Grado*" label-for="grados" class="etiqueta">
                  <b-form-select  id="grados" ref="grados" v-model="idGradoSedeA" :options="comboGradosSedeA" @change="consultarAntiguos()" :disabled="idSedeA!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mt-2" v-if="idGradoSedeA!=null">
              <b-col lg="12">
                <vue-good-table ref="tablaAntiguos" :columns="encabColumnasAntiguos" :rows="listaAntiguosSinMatricular" styleClass="vgt-table condensed bordered striped" :line-numbers="true"
                  :select-options="{enabled: true, selectOnCheckboxOnly: true, selectionText: 'Marcados', clearSelectionText: 'Desmarcar', selectAllByGroup: true}">
                  <div slot="selected-row-actions">
                    <b-button v-if="idCurso!=null" variant="success" @click="renovarAntiguos()">Renovar Matriculas <b-icon icon="box-arrow-in-right" aria-hidden="true"></b-icon></b-button>
                  </div>
                  <div slot="emptystate">
                    <h5 class="text-danger ml-5">No existen estudiantes para renovar</h5>
                  </div>
                </vue-good-table>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col lg="6">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> ESTUDIANTES MATRICULADOS AÑO 2025</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Sede*" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idCurso=null,ocuparlistaCursosSede()"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="Curso*" label-for="cursos" class="etiqueta">
                  <b-form-select  id="cursos" ref="cursos" v-model="idCurso" :options="listaCursosSede" @change="consultarMatriculados()" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mt-2" v-if="idCurso!=null">
              <b-col lg="12">
                <vue-good-table :columns="encabColumnasMatriculados" :rows="listaMatriculados" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                  <div slot="emptystate">
                    <h5 class="text-danger ml-5">No existen estudiantes matriculados</h5>
                  </div>
                </vue-good-table>
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
  import { uuid } from 'vue-uuid'

  export default {
    name: 'renovacionmasiva2024',
    components: {
      VueGoodTable
    },
    data () {
      return {
        comboSedes: [],
        comboSedesA: [],
        idSede: null,
        idSedeA: null,
        comboGradosSedeA: [],
        idGradoSedeA: null,
        listaCursosSede: [],
        idCurso: null,
        idGrado: null,
        encabColumnasAntiguos : [
          { label: 'Estudiantes Antiguos', field: 'estudiante', sortable: false },
        ],
        encabColumnasMatriculados : [
          { label: 'Estudiantes Matriculados 2025', field: 'estudiante', sortable: false },
        ],
        listaAntiguosSinMatricular: [],
        listaMatriculados: [],
        listaEstudiantesParaRenovar: [],
        idEspecialidad: null,
        idRuta: null
      }
    },
    methods: {
      renovarAntiguos() {
        this.listaEstudiantesParaRenovar = this.$refs['tablaAntiguos'].selectedRows
        this.listaEstudiantesParaRenovar.forEach(element => {
          element.idMatricula = uuid.v1()
          element.idInstitucion = this.$store.state.idInstitucion
          element.vigencia = this.$store.state.aLectivo
          element.idGrado = this.idGrado
          element.idCurso = this.idCurso
          element.idEspecialidad = this.idEspecialidad
          element.idMetodologia = 1
          element.idNuevo = "N"
          element.procedencia = null
          element.idRepitente = "N"
          element.idRuta = this.idRuta
          element.obs_matricula = null
          element.idDiversa = "N"
          element.idEstado = 1
        })
        let titulo = 'Renovar Matricula'
        let pregunta = '¿Esta seguro de renovar la matricula a los estudiante seleccionados?'
        this.$bvModal.msgBoxConfirm(pregunta, {
          headerBgVariant: 'primary',
          headerTextVariant: 'light',
          bodyBgVariant: 'light',
          bodyBgClass: 'text-center',
          title: titulo,
          size: '',
          buttonSize: 'sm',
          okVariant: 'primary',
          okTitle: 'Si, ' + titulo,
          cancelVariant: 'danger',
          cancelTitle: 'Cancelar',
          footerClass: 'p-2',
          bodyClass: 'p-5',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.guardarRenovarMatriculas()
          }
        })
      },
      async guardarRenovarMatriculas() {
        this.listaEstudiantesParaRenovar = this.$refs['tablaAntiguos'].selectedRows
        await axios
        .post(CONFIG.ROOT_PATH + 'academico/matriculas/renovacionmasiva2024', JSON.stringify(this.listaEstudiantesParaRenovar), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Matriculas masivas')
          } else{
            this.consultarAntiguos()
            this.consultarMatriculados()
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Las matriculas de los estudiantes se han realizado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Matriculas masivas. Intente más tarde. ' + err)
        })
      },
      async consultarAntiguos() {
        this.listaAntiguosSinMatricular = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/matriculas/antiguossinmatricular', {params: {idGradoSede: this.idGradoSedeA}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Antuoguos sin Matricular')
          } else{
            if (response.data.datos != 0) {
              this.listaAntiguosSinMatricular = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Antuoguos sin Matricular. Intente más tarde.' + err)
        })
      },
      async consultarMatriculados() {
        this.$store.state.datosCursos.forEach(element => {
          if (element.id == this.idCurso) {
            this.idGrado = element.id_grado_sede
          }
        })
        this.listaMatriculados = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/matriculas/matriculadoscurso', {params: {idCurso: this.idCurso}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Antuoguos sin Matricular')
          } else{
            if (response.data.datos != 0) {
              this.listaMatriculados = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Antuoguos sin Matricular. Intente más tarde.' + err)
        })
      },
      async ocuparlistaCursosSede() {
        this.listaCursosSede = []
        this.$store.state.datosCursos.forEach(element => {
          if (element.id_sede == this.idSede) {
            this.listaCursosSede.push({ 'value': element.id, 'text': element.nomenclatura.toUpperCase() })
          }
        })
      },
      async ocuparComboGradosSedeA() {
        this.comboGradosSedeA = []
        this.$store.state.datosGrados.forEach(element => {
          if (element.id_sede == this.idSedeA) {
            this.comboGradosSedeA.push({ 'value': element.id, 'text': element.grado.toUpperCase() })
          }
        })
      },
      async ocuparComboSedes() {
        this.comboSedes = []
        this.comboSedesA = []
        this.$store.state.datosSedes.forEach(element => {
          this.comboSedes.push({ 'value': element.id, 'text': element.sede.toUpperCase() })
          this.comboSedesA.push({ 'value': element.id, 'text': element.sede.toUpperCase() })
        })
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      if(this.$store.state.idRol == 1 || this.$store.state.idRol == 12) {
        this.idEspecialidad = this.$store.state.datosEspecialidades[0].id
        this.idRuta = this.$store.state.datosRutas[0].id
        this.ocuparComboSedes()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>