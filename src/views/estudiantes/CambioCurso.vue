<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> CAMBIO DE CURSO</h5>
            <!--{{listaMatriculados}}-->
            <!--{{$store.state.datosCursos}}-->
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
                  <b-form-select  id="cursos" ref="cursos" v-model="idCurso" :options="comboCursosSede" @change="consultarMatriculados()" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mt-2" v-if="idCurso!=null">
              <b-col lg="12"><hr></b-col>
              <b-col lg="12">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Lista de Estudiantes</h5>
                  </template>
                  <b-card-text>
                    <b-col lg="12">
                      <vue-good-table ref="tablaMatriculados" :columns="encabColumnasMatriculados" :rows="listaMatriculados" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                        <template slot="table-row" slot-scope="props">
                          <span v-if="props.column.field == 'id'">
                            <b-form-select v-model="props.row.id_curso" @change="actualizarItem(props.row)" :options="comboCursosSede"></b-form-select>
                          </span>
                        </template>
                        <div slot="emptystate">
                          <h5 class="text-danger ml-5">No existen estudiantes matriculados</h5>
                        </div>
                      </vue-good-table>
                    </b-col>
                  </b-card-text>
                  <template #footer>
                    <b-button class="small mx-1 mt-2" variant="primary" @click="confirmarCambioCurso" v-if="($store.state.idRol==1 || $store.state.idRol==12) && idSede!=null && listaMatriculados.length!=0">Actualizar Cursos</b-button>
                    <b-button class="small mx-1 mt-2" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
                  </template>
                </b-card>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Seleccione el Curso al que desea cambiar al Estudiante y haga clic en el botón Actualizar Cursos.</em>
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
    name: 'cambiocurso',
    components: {
      VueGoodTable
    },
    data () {
      return {
        comboSedes: [],
        idSede: null,
        comboCursosSede: [],
        idCurso: null,
        listaMatriculados: [],
        encabColumnasMatriculados : [
          { label: 'Apellidos y Nombres del Estudiante', field: 'estudiante', sortable: false },
          { label: 'Documento', field: 'documento', sortable: false },
          { label: 'Nuevo', field: 'id_nuevo', sortable: false },
          { label: 'Repitente', field: 'id_repitente', sortable: false },
          { label: 'Curso', field: 'id', sortable: false },
        ],
      }
    },
    methods: {
      async confirmarCambioCurso() {
        let titulo = 'Cambiar de Curso'
        let pregunta = '¿Esta seguro de cambiar de Curso a los Estudiantes seleccionados?'
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
            this.guardarCambioCurso()
          }
        })
        return true
      },
      async guardarCambioCurso() {
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/matriculas/cambiocurso', JSON.stringify(this.listaMatriculados), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Cambiar Curso')
          } else{
            this.consultarMatriculados()
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los cambios de Curso se han realizado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Cambiar Curso. Intente más tarde. ' + err)
        })
      },
      actualizarItem(item) {
        let indice = this.listaMatriculados.findIndex(estudiante => estudiante.id === item.id)
        this.listaMatriculados[indice].id_curso = item.id_curso

        this.$store.state.datosCursos.forEach(element => {
          if (element.id == item.id_curso) {
            this.listaMatriculados[indice].id_grado = element.id_grado_sede
          }
        })
      },
      async consultarMatriculados() {
        this.listaMatriculados = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/matriculas/cambiocurso', {params: {idCurso: this.idCurso}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Cambiar curso')
          } else{
            if (response.data.datos != 0) {
              this.listaMatriculados = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Cambiar curso. Intente más tarde.' + err)
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