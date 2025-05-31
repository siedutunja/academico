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
          { label: 'Apellidos y Nombres del Estudiante', field: 'estudiante', tdClass: this.tdClassFuncE },
          { label: 'Documento', field: 'documento', tdClass: this.tdClassFuncE },
          { label: 'Estado', field: 'estado', tdClass: this.tdClassFuncE },
        ],
        encabColumnasExcel: []
      }
    },
    methods: {
      async consultaListaCurso() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/listas/general', { params: { idCurso: this.datosCurso.id, retirados: this.datosCurso.retirados }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Lista Curso')
          } else{
            if (response.data.datos != 0) {
              this.listaEstudiantesCurso = []
              response.data.datos.forEach(element => {
                element.edad = this.calcularEdad(element.fecha_nacimiento.substr(0,10)) + " Años"
              })
              this.listaEstudiantesCurso = response.data.datos
              //console.log(JSON.stringify(this.listaEstudiantesCurso))
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
      tdClassFuncE(row) {
        if (row.id_estado_actual == 2) { 
          return 'text-danger' 
        }
      },
      cancelarFormulario() {
        this.$emit("retorno", 0)
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.encabColumnasExcel.push({ label: 'Apellidos y Nombres del Estudiante', field: 'estudiante' })
      this.encabColumnasExcel.push({ label: 'Estado', field: 'estado' })
      this.datosCurso.campos.forEach(element => {
        if (element == 1) {
          this.encabColumnasExcel.push({ label: 'Documento', field: 'documento' })
          this.encabColumnasExcel.push({ label: 'Tipo', field: 'nomenclatura' })
        }
        if (element == 25) this.encabColumnasExcel.push({ label: 'Municipio Documento', field: 'munidoc' })
        if (element == 2) this.encabColumnasExcel.push({ label: 'Fecha Nacimiento', field: 'fecha_nacimiento' })
        if (element == 24) this.encabColumnasExcel.push({ label: 'Municipio Nacimiento', field: 'muninace' })
        if (element == 3) this.encabColumnasExcel.push({ label: 'Edad', field: 'edad' })
        if (element == 4) this.encabColumnasExcel.push({ label: 'Genero', field: 'id_genero' })
        if (element == 5) this.encabColumnasExcel.push({ label: 'Repitente', field: 'id_repitente' })
        if (element == 6) this.encabColumnasExcel.push({ label: 'Nuevo', field: 'id_nuevo' })
        if (element == 7) this.encabColumnasExcel.push({ label: 'Nacionalidad', field: 'pais' })
        if (element == 8) this.encabColumnasExcel.push({ label: 'Estrato', field: 'id_estrato' })
        if (element == 9) this.encabColumnasExcel.push({ label: 'Rh', field: 'rh' })
        if (element == 10) this.encabColumnasExcel.push({ label: 'Sisben', field: 'subgrupo' })
        if (element == 11) this.encabColumnasExcel.push({ label: 'Especialidad', field: 'especialidad' })
        if (element == 12) this.encabColumnasExcel.push({ label: 'Discapacidad', field: 'discapacidad' })
        if (element == 13) this.encabColumnasExcel.push({ label: 'Capacidad Excepcional', field: 'capacidad' })
        if (element == 14) this.encabColumnasExcel.push({ label: 'Trastorno del Aprendizaje', field: 'trastorno' })
        if (element == 15) this.encabColumnasExcel.push({ label: 'Apoyo Académico Especial', field: 'apoyo' })
        if (element == 16) this.encabColumnasExcel.push({ label: 'Victima del Conflicto', field: 'victima' })
        if (element == 17) this.encabColumnasExcel.push({ label: 'Etnia', field: 'etnia' })
        if (element == 18) this.encabColumnasExcel.push({ label: 'Eps', field: 'eps' })
        if (element == 19) this.encabColumnasExcel.push({ label: 'Enfermedades', field: 'enfermedades' })
        if (element == 20) {
          this.encabColumnasExcel.push({ label: 'Dir Estudiante', field: 'dire' })
          this.encabColumnasExcel.push({ label: 'Mun Estudiante', field: 'munidire' })
          this.encabColumnasExcel.push({ label: 'Barrio Estudiante', field: 'barrio' })
          this.encabColumnasExcel.push({ label: 'Tel1 Estudiante', field: 'tel1e' })
          this.encabColumnasExcel.push({ label: 'Tel2 Estudiante', field: 'tel2e' })
        }
        if (element == 21) this.encabColumnasExcel.push({ label: 'Observaciones', field: 'obs_matricula' })
        if (element == 22) this.encabColumnasExcel.push({ label: 'Ruta', field: 'ruta' })
        if (element == 23) {
          this.encabColumnasExcel.push({ label: 'Acudiente', field: 'acudiente' })
          this.encabColumnasExcel.push({ label: 'Dir Acudiente', field: 'direccion' })
          this.encabColumnasExcel.push({ label: 'Tel1 Acudiente', field: 'telefono1' })
          this.encabColumnasExcel.push({ label: 'Tel2 Acudiente', field: 'telefono2' })
          this.encabColumnasExcel.push({ label: 'Correo Acudiente', field: 'correo' })
          this.encabColumnasExcel.push({ label: 'Parentesco', field: 'parentesco' })
        }
      })
      this.consultaListaCurso()
    }
  }
</script>