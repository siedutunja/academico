<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> LISTA DE ESTUDIANTES DEL CURSO {{ datosCurso.nomenclatura }}</h5>
          </template>
          <b-card-text>
            <vue-good-table :columns="encabColumnas" :rows="listaEstudiantesCurso" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
              <div slot="emptystate">
                <h5 class="text-danger ml-5">No existen Estudiantes matriculados en el Curso.</h5>
              </div>
            </vue-good-table>
          </b-card-text>
          <template #footer>
            <vue-excel-xlsx class="small mx-1 mt-2 btn btn-outline-primary" :data="listaEstudiantesCurso" :columns="encabColumnasExcel" :file-name="'Lista-' + datosCurso.nomenclatura + ' ' + new Date().toLocaleDateString()" :file-type="'xlsx'" :sheet-name="'Lista-' + datosCurso.nomenclatura + ' ' + $store.state.aLectivo">
              Exportar a Excel
            </vue-excel-xlsx>
            <b-button class="small mx-1 mt-2" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
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
    name: 'consultalistacurso',
    props: {
      datosCurso: Object
    },
    components: {
      VueGoodTable
    },
    data () {
      return {
        listaEstudiantesCurso: [],
        encabColumnas: [
          { label: 'Apellidos y Nombres del Estudiante', field: 'estudiante' },
          { label: 'Documento', field: 'documento' },
        ],
        encabColumnasExcel: [
          { label: 'Apellidos y Nombres del Estudiante', field: 'estudiante' },
          { label: 'Documento', field: 'documento' },
          { label: 'Tipo', field: 'nomenclatura' },
          { label: 'Fecha Nace', field: 'fecha_nacimiento' },
          { label: 'Genero', field: 'id_genero' },
          { label: 'Nacionalidad', field: 'pais' },
          { label: 'Estrato', field: 'id_estrato' },
          { label: 'Rh', field: 'rh' },
          { label: 'Sisben', field: 'subgrupo' },
          { label: 'Nuevo', field: 'id_nuevo' },
          { label: 'Repitente', field: 'id_repitente' },
          { label: 'Especialidad', field: 'especialidad' },
          { label: 'Discapacidad', field: 'discapacidad' },
          { label: 'Observaciones', field: 'obs_matricula' },
          { label: 'Ruta', field: 'ruta' },
          { label: 'Acudiente', field: 'acudiente' },
          { label: 'Dirección', field: 'direccion' },
          { label: 'Teléfono1', field: 'telefono1' },
          { label: 'Teléfono2', field: 'telefono2' },
          { label: 'Correo', field: 'correo' },
          { label: 'Parentesco', field: 'parentesco' },
        ]
      }
    },
    methods: {
      async consultaListaCurso() {
        await axios
        //.get(CONFIG.ROOT_PATH + 'academico/listas/solonombreestudiante', { params: { idCurso: this.datosCurso.id }})
        .get(CONFIG.ROOT_PATH + 'academico/listas/general', { params: { idCurso: this.datosCurso.id }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Lista Curso')
          } else{
            if (response.data.datos != 0) {
              this.listaEstudiantesCurso = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Lista Curso. Intente más tarde.' + err)
        })
      },
      cancelarFormulario() {
        this.$emit("retorno", 0)
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.consultaListaCurso()
    }
  }
</script>