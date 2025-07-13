<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> BOLETINES DE EVALUACIÓN</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <b-card bg-variant="light" text-variant="">
                  <b-card-text>
                    <b-row>
                      <b-col lg="4">
                        <h6>Por Periodo</h6>
                        <b-form-group label="" v-slot="{ ariaDescribedby }">
                          <b-form-radio v-model="idBoletin" :aria-describedby="ariaDescribedby" name="some-radios" value="1">Boletines por periodo</b-form-radio>
                        </b-form-group>
                      </b-col>
                      <!--
                      <b-col lg="4">
                        <h6>Boletines Finales</h6>
                        <b-form-group label="" v-slot="{ ariaDescribedby }">
                          <b-form-radio v-model="idBoletin" :aria-describedby="ariaDescribedby" name="some-radios" value="10">Ausencias Sin Justificar</b-form-radio>
                          <b-form-radio v-model="idBoletin" :aria-describedby="ariaDescribedby" name="some-radios" value="11">Ausencias Justificadas</b-form-radio>
                        </b-form-group>
                      </b-col>
                      -->
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
            <b-row v-if="idBoletin==1"> 
              <b-col lg="12">
                <b-card>
                  <template #header>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> BOLETINES POR PERIODO</h5>
                  </template>
                  <b-card-text>
                    <b-row>
                      <b-col lg="2">
                        <b-form-group label="Periodo:" label-for="periodo" class="etiqueta">
                          <b-form-select id="periodo" ref="periodo" v-model="idPeriodo" :options="comboPeriodos" @change="idSede=null,idCurso=null,mostrarBoletines=null"></b-form-select>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6">
                        <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                          <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idCurso=null,ocuparComboCursosSede(),mostrarBoletines=null" :disabled="idPeriodo!=null ? false : true"></b-form-select>
                        </b-form-group>
                      </b-col>
                      <b-col lg="4">
                        <b-form-group label="Seleccione el Curso:" label-for="cursos" class="etiqueta">
                          <b-form-select id="cursos" ref="cursos" v-model="idCurso" :options="comboCursosSede" @change="consultarEstudiantes(),mostrarBoletines=null" :disabled="idSede!=null ? false : true"></b-form-select>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
                  <BoletinPeriodo
                    v-if="mostrarBoletines"
                    :estudiantesSeleccionados="estudiantesSeleccionados"
                    :listaAreasAsignaturas="listaAreasAsignaturas"
                    :listaDescriptores="listaDescriptores"
                    :notas="notas"
                    :datosEstudiantes="datosEstudiantes"
                    :anio="Number($store.state.aLectivo)"
                    :periodoActual="idPeriodo"
                    :periodosVisibles="periodosVisibles"
                    :nombreSede="nombreSede"
                    :nombreCurso="nombreCurso"
                    :nombrePeriodo="nombrePeriodo"
                    :nombreJornada="nombreJornada"
                    :nombreDirector="nombreDirector"
                    :idNivel="idNivel"
                    :umbralesA="umbralesA"
                    :umbralesT="umbralesT"
                    :pesosPeriodos="pesosPeriodos"
                    :tipoValComp="tipoValComp"
                    :directorCurso="nombreDirector"
                    :coordinador="coordinador"
                  />
              </b-col>
            </b-row>
            <b-row class="mt-2" v-if="idCurso!=null">
              <b-col lg="12"><hr></b-col>
              <b-col lg="12">
                <div v-if="btnCargando">
                  <div class="text-center m-5 text-primary">
                    <b-spinner style="width: 3rem; height: 3rem;" label="Spinner"></b-spinner>
                    <br><strong>Cargando planilla...</strong>
                  </div>
                </div>
                <div v-else>
                  <vue-good-table ref="estudiantes" :columns="encabColumnas" :rows="datosEstudiantes" @on-row-click="mostrarBoletines=false" styleClass="vgt-table condensed bordered striped" :line-numbers="true"
                  :select-options="{enabled: true,selectionText: 'estudiantes seleccionados',clearSelectionText: 'Limpiar',}">
                    <template #selected-row-actions>
                      <button class="small btn btn-primary" @click="imprimirBoletines()">Procesar Boletines para Impresión</button>
                    </template>
                    <div slot="emptystate">
                      <h5 class="text-danger ml-5">No existen estudiantes matriculados</h5>
                    </div>
                  </vue-good-table>
                </div>
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
  import BoletinPeriodo from '@/views/reportes/BoletinPeriodo'

  export default {
    name: 'boletines',
    components: {
      VueGoodTable,
      BoletinPeriodo,
    },
    data () {
      return {
        idBoletin: null,
        idSede: null,
        comboSedes: [],
        idPeriodo: null,
        comboPeriodos: null,
        idCurso: null,
        comboCursosSede: [],
        nombreSede: null,
        nombreCurso: null,
        nombrePeriodo: null,
        nombreJornada: null,
        nombreDirector: null,
        coordinador: null,
        idNivel: null,
        btnCargando: false,
        datosSeccion: {},
        encabColumnas: [
          { label: 'Apellidos y Nombres del Estudiante', field: 'nombre', sortable: false, tdClass: this.tdClassFuncE },
          { label: 'Estado', field: 'estado', sortable: false, tdClass: this.tdClassFuncE },
        ],
        estudiantesSeleccionados: [],
        datosEstudiantes: [],
        listaAreasAsignaturas: [],
        listaDescriptores: [],
        notas: [],
        periodosVisibles: [],
        mostrarBoletines: false,
        umbralesA: [],
        umbralesT: [],
        pesosPeriodos: [],
        tipoValComp: null,
      }
    },
    methods: {
      imprimirBoletines() {
        this.mostrarBoletines = true
        this.estudiantesSeleccionados = this.$refs.estudiantes.selectedRows
        if (this.idPeriodo == 1) this.periodosVisibles = [1]
        if (this.idPeriodo == 2) this.periodosVisibles = [1,2]
        if (this.idPeriodo == 3) this.periodosVisibles = [1,2,3]
        if (this.idPeriodo == 4) this.periodosVisibles = [1,2,3,4]
        this.umbralesA = [this.datosSeccion.minBas,this.datosSeccion.minAlt,this.datosSeccion.minSup,this.datosSeccion.maxSup]
        this.umbralesT = [this.datosSeccion.minBasT,this.datosSeccion.minAltT,this.datosSeccion.minSupT,this.datosSeccion.maxSupT]
        this.pesosPeriodos = [this.datosSeccion.pesoP1,this.datosSeccion.pesoP2,this.datosSeccion.pesoP3,this.datosSeccion.pesoP4]
        this.tipoValComp = this.datosSeccion.tipoValComp
        //console.log(JSON.stringify(this.pesosPeriodos))
      },
      async consultarNotas() {
        this.notas = []
        await axios
        .get(CONFIG.ROOT_PATH + 'boletines/notas/curso/periodo', {params: {idCurso: this.idCurso, periodo: this.idPeriodo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Notas boletines curso periodo')
            this.btnCargando = false
          } else{
            if (response.data.datos != 0) {
              this.notas = response.data.datos
              //console.log(JSON.stringify(this.notas))
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Notas boletines curso periodo. Intente más tarde.' + err)
          this.btnCargando = false
        })
      },
      async consultarAreasAsignaturas() {
        this.listaAreasAsignaturas = []
        await axios
        .get(CONFIG.ROOT_PATH + 'boletines/areasasignaturas/curso', {params: {idCurso: this.idCurso}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista areas-asignaturas curso')
            this.btnCargando = false
          } else{
            if (response.data.datos != 0) {
              this.listaAreasAsignaturas = response.data.datos
              //console.log(JSON.stringify(this.listaAreasAsignaturas))
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista areas-asignaturas curso. Intente más tarde.' + err)
          this.btnCargando = false
        })
      },
      async consultarDescriptores() {
        this.listaDescriptores = []
        await axios
        .get(CONFIG.ROOT_PATH + 'boletines/descriptores/curso', {params: {idCurso: this.idCurso, periodo: this.idPeriodo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista descriptores curso')
            this.btnCargando = false
          } else{
            if (response.data.datos != 0) {
              this.listaDescriptores = response.data.datos
              //console.log(JSON.stringify(this.listaDescriptores))
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista descriptores curso. Intente más tarde.' + err)
          this.btnCargando = false
        })
      },
      async consultarEstudiantes() { 
        this.btnCargando = true
        if (this.idCurso != null) { 
          this.$store.state.datosCursos.forEach(element => {
            if (element.id == this.idCurso) {
              this.nombreJornada = element.jornada
              this.nombreDirector = element.docente
              this.idNivel = element.id_nivel
            }
          })
          this.nombreSede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
          this.nombreCurso = document.getElementById('cursos')[document.getElementById('cursos').selectedIndex].text
          this.nombrePeriodo = document.getElementById('periodo')[document.getElementById('periodo').selectedIndex].text
          this.datosEstudiantes = []
          await axios
          .get(CONFIG.ROOT_PATH + 'boletines/listacurso/boletines', { params: { idCurso: this.idCurso }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Lista Curso')
              this.btnCargando = false
            } else{
              if (response.data.datos != 0) {
                this.datosEstudiantes = response.data.datos
                this.consultarNotas()
                this.consultarAreasAsignaturas()
                this.consultarDescriptores()
              }
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Curso. Intente más tarde.' + err)
            this.btnCargando = false
          })
        }
        //console.log(JSON.stringify(this.datosEstudiantes))
        this.btnCargando = false
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
      async ocuparComboPeriodos() {
        this.comboPeriodos = []
        this.$store.state.datosTablas.periodos.forEach(element => {
          this.comboPeriodos.push({ 'value': element.id, 'text': element.periodo.toUpperCase() })
        })
      },
      tdClassFuncE(row) {
        if (row.id_estado_actual == 2) { 
          return 'text-danger' 
        }
        if (row.id_estado_actual == 3 || row.id_estado_actual == 4) { 
          return 'text-warning' 
        }
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.ocuparComboSedes()
      this.ocuparComboPeriodos()
      this.datosSeccion = this.$store.state.datosSecciones[this.$store.state.idSeccion - 1]
      //console.log(JSON.stringify(this.datosSeccion))
    }
  }
</script>