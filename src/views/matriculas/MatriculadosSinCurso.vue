<template>
  <div>
    <b-row class="mt-0">
      <b-col lg="12">
        <b-card>
          <template #header>
            <div class="float-right">
              <b-button class="mx-2" size="sm" variant="info" @click="verMatriculadosSinCurso()" title="Actualizar Lista Preinscritos"><b-icon icon="arrow-repeat"></b-icon></b-button>
            </div>
            <h5 class="mb-0"><b-icon icon="credit-card2-front" aria-hidden="true"></b-icon> MATRICULADOS SIN CURSO</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Seleccione la Sede*" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="verMatriculadosSinCurso(),ocuparComboCursosSede()"></b-form-select>
                </b-form-group>
              </b-col>
              <!--{{listaMatriculadosSinCurso}}-->
            </b-row>
            <b-row class="mt-2" v-if="idSede!=null">
              <b-col lg="12"><hr></b-col>
              <b-col lg="12">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Lista de Estudiantes</h5>
                  </template>
                  <b-card-text>
                    <b-col lg="12">
                      <vue-good-table ref="tablaMatriculados" :columns="encabColumnas" :rows="listaMatriculadosSinCurso" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                        <template slot="table-row" slot-scope="props">
                          <span v-if="props.column.field == 'id'">
                            <b-form-select v-model="props.row.id_curso" @change="actualizarItem(props.row)" :options="comboCursosSede"></b-form-select>
                          </span>
                        </template>
                        <div slot="emptystate">
                          <h5 class="text-danger ml-5">No existen estudiantes sin curso</h5>
                        </div>
                      </vue-good-table>
                    </b-col>
                  </b-card-text>
                  <template #footer>
                    <b-button class="small mx-1 mt-2" variant="primary" @click="confirmarCambioCurso" v-if="($store.state.idRol==1 || $store.state.idRol==12) && idSede!=null && listaMatriculadosSinCurso.length!=0">Asignar Cursos</b-button>
                    <b-button class="small mx-1 mt-2" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
                  </template>
                </b-card>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Seleccione el Curso a asignar al Estudiante y haga clic en el botón Actualizar Cursos.</em>
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
        idSede: null,
        comboCursosSede: [],
        listaMatriculadosSinCurso: [],
        encabColumnas : [
          { label: 'Nombre del Estudiante', field: 'estudiante', sortable: true },
          { label: 'Documento', field: 'documento', sortable: false },
          { label: 'Nuevo', field: 'id_nuevo', sortable: true },
          { label: 'Repitente', field: 'id_repitente', sortable: true },
          { label: 'Grado', field: 'grado', sortable: true },
          { label: 'Curso', field: 'id', sortable: false },
        ]
      }
    },
    methods: {
      async confirmarCambioCurso() {
        let titulo = 'Asignanar Curso'
        let pregunta = '¿Esta seguro de Asignar el Curso a los Estudiantes seleccionados?'
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
        .put(CONFIG.ROOT_PATH + 'academico/matriculas/cambiocurso', JSON.stringify(this.listaMatriculadosSinCurso), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Asignar Curso')
          } else{
            this.verMatriculadosSinCurso()
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'La Asignación de Cursos se han realizado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Asignar Curso. Intente más tarde. ' + err)
        })
      },
      async verMatriculadosSinCurso() {
        this.listaMatriculadosSinCurso = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/matriculas/sincurso', { params: { idSede: this.idSede }})
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
      actualizarItem(item) {
        let indice = this.listaMatriculadosSinCurso.findIndex(estudiante => estudiante.id === item.id)
        this.listaMatriculadosSinCurso[indice].id_curso = item.id_curso

        this.$store.state.datosCursos.forEach(element => {
          if (element.id == item.id_curso) {
            this.listaMatriculadosSinCurso[indice].id_grado = element.id_grado_sede
          }
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
      if(this.$store.state.idRol == 1 || this.$store.state.idRol == 12 || this.$store.state.perMatricular == 1) {
        this.ocuparComboSedes()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>