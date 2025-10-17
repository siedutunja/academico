<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> ACTUALIZAR DATOS POR CURSO</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Seleccione Datos a Actualizar:" label-for="datos" class="etiqueta">
                  <b-form-select  id="datos" ref="datos" v-model="idDatos" :options="comboDatos" @change="idSede=null,idCurso=null"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row v-if="idDatos != null">
              <b-col lg="6">
                <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idCurso=null,ocuparComboCursosSede()"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="Seleccione el Curso:" label-for="cursos" class="etiqueta">
                  <b-form-select  id="cursos" ref="cursos" v-model="idCurso" :options="comboCursosSede" @change="consultarMatriculados()" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mt-2" v-if="idCurso!=null">
              <b-col lg="12"><hr></b-col>
              <!-- **************** ACTUALIZAR ESPECIALIDADES ************** -->
              <b-col lg="12" v-if="idDatos == 1">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Lista de Estudiantes</h5>
                  </template>
                  <b-card-text>
                    <b-col lg="12">
                      <vue-good-table ref="tablaMatriculadosE" :columns="encabColumnasEspecialidad" :rows="listaMatriculadosEspecialidad" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                        <template slot="table-row" slot-scope="props">
                          <span v-if="props.column.field == 'id'">
                            <b-form-select v-model="props.row.id_especialidad" @change="actualizarItemEspecialidad(props.row)" :options="comboEspecialidades"></b-form-select>
                          </span>
                        </template>
                        <div slot="emptystate">
                          <h5 class="text-danger ml-5">No existen estudiantes matriculados</h5>
                        </div>
                      </vue-good-table>
                    </b-col>
                  </b-card-text>
                  <template #footer>
                    <b-button class="small mx-1 mt-2" variant="primary" @click="confirmarCambioEspecialidad" v-if="listaMatriculadosEspecialidad.length!=0">Actualizar Datos</b-button>
                    <b-button class="small mx-1 mt-2" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
                  </template>
                </b-card>
              </b-col>
              <!-- **************** ACTUALIZAR METODOLOGIAS ************** -->
              <b-col lg="12" v-if="idDatos == 2">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Lista de Estudiantes</h5>
                  </template>
                  <b-card-text>
                    <b-col lg="12">
                      <vue-good-table ref="tablaMatriculadosM" :columns="encabColumnasMetodologia" :rows="listaMatriculadosMetodologia" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                        <template slot="table-row" slot-scope="props">
                          <span v-if="props.column.field == 'id'">
                            <b-form-select v-model="props.row.id_metodologia" @change="actualizarItemMetodologia(props.row)" :options="comboMetodologias"></b-form-select>
                          </span>
                        </template>
                        <div slot="emptystate">
                          <h5 class="text-danger ml-5">No existen estudiantes matriculados</h5>
                        </div>
                      </vue-good-table>
                    </b-col>
                  </b-card-text>
                  <template #footer>
                    <b-button class="small mx-1 mt-2" variant="primary" @click="confirmarCambioMetodologia" v-if="listaMatriculadosMetodologia.length!=0">Actualizar Datos</b-button>
                    <b-button class="small mx-1 mt-2" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
                  </template>
                </b-card>
              </b-col>
              <!-- **************** ACTUALIZAR MODALIDADES ************** -->
              <b-col lg="12" v-if="idDatos == 3">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Lista de Estudiantes</h5>
                  </template>
                  <b-card-text>
                    <b-col lg="12">
                      <vue-good-table ref="tablaMatriculadosMO" :columns="encabColumnasModalidad" :rows="listaMatriculadosModalidad" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                        <template slot="table-row" slot-scope="props">
                          <span v-if="props.column.field == 'id'">
                            <b-form-select v-model="props.row.id_modalidad" @change="actualizarItemModalidad(props.row)" :options="comboModalidades"></b-form-select>
                          </span>
                        </template>
                        <div slot="emptystate">
                          <h5 class="text-danger ml-5">No existen estudiantes matriculados</h5>
                        </div>
                      </vue-good-table>
                    </b-col>
                  </b-card-text>
                  <template #footer>
                    <b-button class="small mx-1 mt-2" variant="primary" @click="confirmarCambioModalidad" v-if="listaMatriculadosModalidad.length!=0">Actualizar Datos</b-button>
                    <b-button class="small mx-1 mt-2" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
                  </template>
                </b-card>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Seleccione el dato que desea actualizar, seleccione la Sede y el Curso, realice los cambios de los datos y haga clic en el botón Actualizar Datos.</em>
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
    name: 'actualizardatoscurso',
    components: {
      VueGoodTable
    },
    data () {
      return {
        idDatos: null,
        comboDatos: [
          { 'value': 1, 'text': 'ESPECIALIDADES - TÉCNICAS'},
          { 'value': 2, 'text': 'METODOLOGÍAS DE APRENDIZAJE'},
          { 'value': 3, 'text': 'MODALIDADES'},
        ],
        comboSedes: [],
        idSede: null,
        comboCursosSede: [],
        idCurso: null,
        comboEspecialidades: [],
        listaMatriculadosEspecialidad: [],
        encabColumnasEspecialidad : [
          { label: 'Apellidos y Nombres del Estudiante', field: 'estudiante', sortable: false },
          { label: 'Documento', field: 'documento', sortable: false },
          { label: 'Especialidad', field: 'id', sortable: false },
        ],
        comboMetodologias: [],
        listaMatriculadosMetodologia: [],
        encabColumnasMetodologia : [
          { label: 'Apellidos y Nombres del Estudiante', field: 'estudiante', sortable: false },
          { label: 'Documento', field: 'documento', sortable: false },
          { label: 'Metodología', field: 'id', sortable: false },
        ],
        comboModalidades: [],
        listaMatriculadosModalidad: [],
        encabColumnasModalidad : [
          { label: 'Apellidos y Nombres del Estudiante', field: 'estudiante', sortable: false },
          { label: 'Documento', field: 'documento', sortable: false },
          { label: 'Modalidad', field: 'id', sortable: false },
        ],
      }
    },
    methods: {
      consultarMatriculados() {
        if (this.idDatos == 1) {
          this.consultarMatriculadosEspecialidad()
        } else if (this.idDatos == 2) {
          this.consultarMatriculadosMetodologia()
        } else if (this.idDatos == 3) {
          this.consultarMatriculadosModalidad()
        }
      },
      async confirmarCambioEspecialidad() {
        let titulo = 'Actualizar Especialidades'
        let pregunta = '¿Esta seguro de actualizar las especialidades a los estudiantes del curso?'
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
            this.guardarCambioEspecialidades()
          }
        })
        return true
      },
      async confirmarCambioMetodologia() {
        let titulo = 'Actualizar Metodologías de Aprendizaje'
        let pregunta = '¿Esta seguro de actualizar las Metodologías de Aprendizaje a los estudiantes del curso?'
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
            this.guardarCambioMetodologias()
          }
        })
        return true
      },
      async confirmarCambioModalidad() {
        let titulo = 'Actualizar Modalidad'
        let pregunta = '¿Esta seguro de actualizar las Modalidades a los estudiantes del curso?'
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
            this.guardarCambioModalidades()
          }
        })
        return true
      },
      async guardarCambioEspecialidades() {
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/estudiantes/actualizarespecialidad', JSON.stringify(this.listaMatriculadosEspecialidad), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Cambiar Especialidad')
          } else{
            this.consultarMatriculadosEspecialidad()
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los cambios de Especialidad se han realizado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Cambiar Especialidad. Intente más tarde. ' + err)
        })
      },
      async guardarCambioMetodologias() {
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/estudiantes/actualizarmetodologia', JSON.stringify(this.listaMatriculadosMetodologia), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Cambiar Matodología')
          } else{
            this.consultarMatriculadosMetodologia()
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los cambios de Matodología se han realizado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Cambiar Matodología. Intente más tarde. ' + err)
        })
      },
      async guardarCambioModalidades() {
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/estudiantes/actualizarmodalidad', JSON.stringify(this.listaMatriculadosModalidad), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Cambiar Modalidad')
          } else{
            this.consultarMatriculadosModalidad()
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los cambios de Modalidad se han realizado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Cambiar Modalidad. Intente más tarde. ' + err)
        })
      },
      actualizarItemEspecialidad(item) {
        let indice = this.listaMatriculadosEspecialidad.findIndex(estudiante => estudiante.id === item.id)
        this.listaMatriculadosEspecialidad[indice].id_especialidad = item.id_especialidad
      },
      actualizarItemMetodologia(item) {
        let indice = this.listaMatriculadosMetodologia.findIndex(estudiante => estudiante.id === item.id)
        this.listaMatriculadosMetodologia[indice].id_metodologia = item.id_metodologia
      },
      actualizarItemModalidad(item) {
        let indice = this.listaMatriculadosModalidad.findIndex(estudiante => estudiante.id === item.id)
        this.listaMatriculadosModalidad[indice].id_modalidad = item.id_modalidad
      },
      async consultarMatriculadosEspecialidad() {
        this.listaMatriculadosEspecialidad = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/estudiantes/actualizarespecialidad', {params: {idCurso: this.idCurso, vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Cambiar especialidad')
          } else{
            if (response.data.datos != 0) {
              this.listaMatriculadosEspecialidad = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Cambiar especialidad. Intente más tarde.' + err)
        })
      },
      async consultarMatriculadosMetodologia() {
        this.listaMatriculadosMetodologia = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/estudiantes/actualizarmetodologia', {params: {idCurso: this.idCurso, vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Cambiar metodología')
          } else{
            if (response.data.datos != 0) {
              this.listaMatriculadosMetodologia = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Cambiar metodología. Intente más tarde.' + err)
        })
      },
      async consultarMatriculadosModalidad() {
        this.listaMatriculadosModalidad = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/estudiantes/actualizarmodalidad', {params: {idCurso: this.idCurso, vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Cambiar modalidad')
          } else{
            if (response.data.datos != 0) {
              this.listaMatriculadosModalidad = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Cambiar modalidad. Intente más tarde.' + err)
        })
      },
      async ocuparComboEspecialidades() {
        this.comboEspecialidades = []
        this.$store.state.datosEspecialidades.forEach(element => {
          this.comboEspecialidades.push({ 'value': element.id, 'text': element.especialidad.toUpperCase() })
        })
      },
      async ocuparComboMetodologias() {
        this.comboMetodologias = []
        this.$store.state.datosTablas.metodologias.forEach(element => {
          this.comboMetodologias.push({ 'value': element.id, 'text': element.metodologia.toUpperCase() })
        })
      },
      async ocuparComboModalidades() {
        this.comboModalidades = []
        this.$store.state.datosTablas.modalidades.forEach(element => {
          this.comboModalidades.push({ 'value': element.id, 'text': element.modalidad.toUpperCase() })
        })
      },
      async ocuparComboSedes() {
        this.comboSedes = []
        this.$store.state.datosSedes.forEach(element => {
          this.comboSedes.push({ 'value': element.id, 'text': element.sede.toUpperCase() })
        })
      },
      async ocuparComboCursosSede() {
        this.comboCursosSede = []
        this.$store.state.datosCursos.forEach(element => {
          if (element.id_sede == this.idSede) {
            this.comboCursosSede.push({ 'value': element.id, 'text': element.nomenclatura.toUpperCase() })
          }
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
      this.ocuparComboSedes()
      this.ocuparComboEspecialidades()
      this.ocuparComboMetodologias()
      this.ocuparComboModalidades()
    }
  }
</script>