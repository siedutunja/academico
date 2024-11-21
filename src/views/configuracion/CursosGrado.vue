<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> CURSOS POR SEDE Y GRADO</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Seleccione la Sede*" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idGrado=null,ocuparComboGradosSede()"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="Seleccione el Grado*" label-for="grados" class="etiqueta">
                  <b-form-select  id="grados" ref="grados" v-model="idGrado" :options="comboGrados" @change="verCursosGrado" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mt-0" v-if="idGrado!=null">
              <b-col lg="12"><hr></b-col>
              <b-col lg="12">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <b-button class="small float-right" variant="dark" @click="nuevoCurso" v-if="$store.state.idRol==1 || $store.state.idRol==12">Nuevo Curso</b-button>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Lista de Cursos</h5>
                  </template>
                  <b-card-text>
                    <b-row>
                      <b-col lg="12">
                        <vue-good-table :columns="encabColumnas" :rows="listaCursosGrado" styleClass="vgt-table condensed bordered striped " :line-numbers="true">
                          <template slot="table-row" slot-scope="props">
                            <span v-if="props.column.field == 'idCursoGrado'">
                              <span style="font-weight: bold; color: blue; cursor: pointer" @click="seleccionarCursoGrado(props.row)" title="Actualizar Datos del Curso"><CIcon name="cilPencil"/></span>
                            </span>
                          </template>
                          <div slot="emptystate">
                            <h5 class="text-danger ml-5">No existen cursos creados en el grado</h5>
                          </div>
                        </vue-good-table>
                      </b-col>
                    </b-row>
                  </b-card-text>
                  <p>Total cursos: {{ contadorCursos }}</p>
                </b-card>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Actualice los datos de un curso haciendo clic en el lapiz.</em>
          </template>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalEditarCursoGrado" size="xl" scrollable hide-footer :title="datosCursoGrado.editarCurso ? 'Editar Datos del Curso' : 'Nuevo Curso'" ok-only>
      <div class="mx-3">
        <div>
          <FichaCursoGrado :datosCursoGrado="datosCursoGrado" @retorno="datosRecibidosCursoGrado"/>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'
  import FichaCursoGrado from '@/views/configuracion/FichaCursoGrado'

  export default {
    name: 'cursosgrado',
    components: {
      VueGoodTable,
      FichaCursoGrado
    },
    data () {
      return {
        idSede: null,
        comboSedes: [],
        idGrado: null,
        comboGrados: [],
        listaCursosGrado: [],
        idGradoSede: null,
        descripcionGrado: null,
        encabColumnas : [
          { label: 'Nombre del Curso', field: 'nomenclatura' },
          { label: 'Curso', field: 'curso', sortable: false },
          { label: 'Jornada', field: 'jornada', sortable: false },
          { label: 'Docente Director', field: 'director', sortable: false },
          { label: 'Estado', field: 'estado', formatFn: this.formatFnE, tdClass: this.tdClassFuncE, sortable: false },
          { label: '', field: 'idCursoGrado', sortable: false }
        ],
        datosCursoGrado: {
          idCursoGrado: null,
          curso: null,
          nomenclatura: null,
          id_grado_sede: null,
          id_jornada: null,
          id_director: null,
          estado: null,
          editarCurso: null
        },
        contadorCursos: null
      }
    },
    methods: {
      nuevoCurso() {
        this.datosCursoGrado.idCursoGrado = null
        this.datosCursoGrado.curso = this.contadorCursos + 1
        let textGrado = document.getElementById('grados')[document.getElementById('grados').selectedIndex].text
        this.datosCursoGrado.nomenclatura = textGrado + '-' + this.datosCursoGrado.curso
        this.datosCursoGrado.id_grado_sede = this.idGrado
        this.datosCursoGrado.id_jornada = 1
        this.datosCursoGrado.id_director = null
        this.datosCursoGrado.estado = 1
        this.datosCursoGrado.editarCurso = false
        this.$refs['modalEditarCursoGrado'].show()
      },
      seleccionarCursoGrado(item) {
        this.datosCursoGrado.idCursoGrado = item.id
        this.datosCursoGrado.curso = item.curso
        this.datosCursoGrado.nomenclatura = item.nomenclatura
        this.datosCursoGrado.id_grado_sede = item.id_grado_sede
        this.datosCursoGrado.id_jornada = item.id_jornada
        this.datosCursoGrado.id_director = item.id_director
        this.datosCursoGrado.estado = item.estado
        this.datosCursoGrado.editarCurso = true
        this.$refs['modalEditarCursoGrado'].show()
      },
      datosRecibidosCursoGrado(retorno) {
        let msj = null
        this.$refs['modalEditarCursoGrado'].hide()
        if (retorno == 1) 
          msj = 'El curso se ha creado correctamente.'
        else if (retorno == 2)
          msj = 'Los datos del curso se han actualizado correctamente.'
        if (retorno == 1 || retorno == 2) {
          this.$bvModal.msgBoxOk(msj, {
            headerBgVariant: 'success',
            headerTextVariant: 'light',
            bodyBgVariant: 'light',
            bodyBgClass: 'text-center',
            title: CONFIG.TITULO_MSG,
            size: '',
            buttonSize: 'sm',
            okVariant: 'success',
            okTitle: 'Aceptar',
            footerClass: 'p-2',
            bodyClass: 'p-5',
            hideHeaderClose: true,
            centered: true
          })
          .then(value => {
            this.verCursosGrado()
          })
        }
      },
      async verCursosGrado() {
        this.listaCursosGrado = []
        this.contadorCursos = this.$store.state.datosCursos.length
        this.$store.state.datosCursos.forEach(element => {
          if (element.id_grado_sede == this.idGrado) {
            this.listaCursosGrado.push(element)
          }
        })
        this.contadorCursos = this.listaCursosGrado.length
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
      formatFnE: function(value) {
        if (value == 0) {
          return 'INACTIVO'
        }
        return 'ACTIVO'
      },
      tdClassFuncE(row) {
        if (row.estado == 0) { 
          return 'text-danger text-left' 
        } else { 
          return 'text-success text-left' 
        }
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