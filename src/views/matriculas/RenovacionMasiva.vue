<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="6">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> ESTUDIANTES MATRICULADOS EN EL AÑO {{ $store.state.aLectivo }}</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Seleccione la Sede:" label-for="sedesA" class="etiqueta">
                  <b-form-select  id="sedesA" ref="sedesA" v-model="idSedeA" :options="comboSedesA" @change="idCursoA=null,ocuparlistaCursosSedeA()"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="Seleccione el Grado:" label-for="grados" class="etiqueta">
                  <b-form-select  id="grados" ref="grados" v-model="idCursoA" :options="listaCursosSedeA" @change="consultarAntiguos()" :disabled="idSedeA!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mt-2" v-if="idCursoA!=null">
              <b-col lg="12">
                <vue-good-table ref="tablaAntiguos" :columns="encabColumnasAntiguos" :rows="listaAntiguosSinMatricular" styleClass="vgt-table condensed bordered striped" :line-numbers="true"
                  :select-options="{enabled: true, selectOnCheckboxOnly: true, selectionText: 'Marcados', clearSelectionText: 'Desmarcar', selectAllByGroup: true}">
                  <div slot="selected-row-actions">
                    <b-button v-if="idCurso!=null" variant="success" @click="renovarAntiguos()">Renovar Matriculas <b-icon icon="box-arrow-in-right" aria-hidden="true"></b-icon></b-button>
                  </div>
                  <div slot="emptystate">
                    <h5 class="text-danger ml-5">No existen estudiantes promovidos</h5>
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
            <!--  ************************************************************************************  -->
            <!--  aqui va la nueva vigencia cuando se establezca apertura de matriculas nueva vigencia  -->
            <!--  ************************************************************************************  -->
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> MATRICULA ACTUAL AÑO {{ $store.state.aMatriculas }}</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idCurso=null,ocuparlistaCursosSede()"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="Seleccione el Curso:" label-for="cursos" class="etiqueta">
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
    name: 'renovacionmasiva',
    components: {
      VueGoodTable
    },
    data () {
      return {
        comboSedes: [],
        comboSedesA: [],
        idSede: null,
        idSedeA: null,
        listaCursosSede: [],
        listaCursosSedeA: [],
        idCurso: null,
        idCursoA: null,
        encabColumnasAntiguos : [
          { label: 'Estudiantes Antiguos para Renovar', field: 'estudiante', sortable: false, tdClass: this.tdClassFunc },
          { label: 'Estado Final', field: 'estadoFinal', sortable: false, tdClass: this.tdClassFunc },
        ],
        encabColumnasMatriculados : [
          { label: 'Estudiantes Matriculados', field: 'estudiante', sortable: false },
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
          element.vigencia = this.$store.state.aMatriculas
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
        //console.log(JSON.stringify(this.listaEstudiantesParaRenovar))
        let titulo = 'Renovar Matriculas'
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
        .post(CONFIG.ROOT_PATH + 'academico/matriculas/renovacionmasiva', JSON.stringify(this.listaEstudiantesParaRenovar), { headers: {"Content-Type": "application/json; charset=utf-8" }})
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
        if (this.$store.state.idInstitucion == '17ee4f30-fc80-11ec-a1d1-1dc2835404e5') { // ********* consulta solo prematriculados ENSLAP ********** //
          await axios
          .get(CONFIG.ROOT_PATH + 'academico/matriculas/renovacion/enslap', {params: {idCursoA: this.idCursoA, vigencia: this.$store.state.aLectivo }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - A renovar sin Matricular')
            } else{
              if (response.data.datos != 0) {
                this.listaAntiguosSinMatricular = response.data.datos
              }
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: A renovar sin Matricular. Intente más tarde.' + err)
          })
        } else {
          await axios
          .get(CONFIG.ROOT_PATH + 'academico/matriculas/renovacion', {params: {idCursoA: this.idCursoA, vigencia: this.$store.state.aLectivo }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - A renovar sin Matricular')
            } else{
              if (response.data.datos != 0) {
                this.listaAntiguosSinMatricular = response.data.datos
              }
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: A renovar sin Matricular. Intente más tarde.' + err)
          })
        }
      },
      async consultarMatriculados() {
        this.$store.state.datosCursos.forEach(element => {
          if (element.id == this.idCurso) {
            this.idGrado = element.id_grado_sede
          }
        })
        this.listaMatriculados = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/matriculas/matriculadoscurso', {params: {idCurso: this.idCurso, vigencia: this.$store.state.aMatriculas}})
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
      async ocuparlistaCursosSedeA() {
        this.listaCursosSedeA = []
        this.$store.state.datosCursos.forEach(element => {
          if (element.id_sede == this.idSedeA) {
            this.listaCursosSedeA.push({ 'value': element.id, 'text': element.nomenclatura.toUpperCase() })
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
      tdClassFunc(row) {
        if (row.id_estado_final == 2 || row.id_estado_final == 12) { 
          return 'text-danger' 
        }
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      if(this.$store.state.idRol == 1 || this.$store.state.idRol == 12 || this.$store.state.perMatricular == 1) {
        this.idEspecialidad = this.$store.state.datosEspecialidades[0].id
        this.idRuta = this.$store.state.datosRutas[0].id
        this.ocuparComboSedes()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>