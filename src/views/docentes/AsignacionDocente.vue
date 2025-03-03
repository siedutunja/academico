<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> ASIGNACIÓN ACADÉMICA POR DOCENTE</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                  <b-form-select id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idAsignaturaSede=null"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="Seleccione la Asignatura:" label-for="asignatura" class="etiqueta">
                  <b-form-select id="asignatura" ref="asignatura" v-model="idAsignaturaSede" :options="comboAsignaturasSede" @change="cargarAsignaturasCursos()" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mt-2" v-if="idAsignaturaSede!=null">
              <b-col lg="12">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Asignación Académica por Docente</h5>
                  </template>
                  <b-card-text>
                    <b-row>
                      <b-col lg="6">
                        <b-form-group label="Seleccione el Docente:" label-for="docente" class="etiqueta">
                          <b-form-select id="docente" ref="docente" v-model="idDocente" :options="comboDocentes"></b-form-select>
                        </b-form-group>
                      </b-col>
                      <b-col lg="12">
                        <vue-good-table ref="cursitos" :columns="encabColumnas" :rows="listaAsignaturasCursos" styleClass="vgt-table condensed bordered striped " :line-numbers="true"
                        :select-options="{enabled: true,selectionText: 'cursos seleccionados',clearSelectionText: 'Limpiar',}">
                          <template #selected-row-actions>
                            <button class="small btn btn-primary" @click="asignarDocenteCursos()">Asignar Docente a Cursos</button>
                          </template>
                          <div slot="emptystate">
                            <h5 class="text-danger ml-5">No existen Asignaturas asignadas a la Sede</h5>
                          </div>
                        </vue-good-table>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Seleccione el Docente, seleccione la Asignatura y marque los Cursos que desea asignar al Docente, luego guarde la asignación haciendo clic en Actualizar Asignación Académica.</em>
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
    name: 'asignacionacademica',
    components: {
      VueGoodTable,
    },
    data () {
      return {
        idSede: null,
        comboSedes: [],
        idAsignaturaSede: null,
        comboAsignaturasSede: [],
        idDocente: 99999,
        comboDocentes: [],
        listaAsignaturasCursos: [],
        encabColumnas : [
          { label: 'Grado-Curso', field: 'nomenclatura', sortable: false },
          { label: 'Asignatura', field: 'asignatura' },
          { label: 'Docente', field: 'docente', sortable: false }
        ],
      }
    },
    methods: {
      async asignarDocenteCursos() {
        let cursosSeleccionados = []
        this.$refs.cursitos.selectedRows.forEach(element => {
          cursosSeleccionados.push({ 'id': element.id, 'id_docente': this.idDocente })
        })
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/asignacionacademicadocente', JSON.stringify(cursosSeleccionados), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Asignación Académica por Docente')
          } else{
            this.cargarAsignaturasCursos()
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'La Asignación Académica se han actualizado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Asignación Académica por Docente. Intente más tarde. ' + err)
        })
      },
      async cargarAsignaturasCursos() {
        this.listaAsignaturasCursos = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/cargueasignaturascursos', {params: {idSede: this.idSede,idAsignaturaSede: this.idAsignaturaSede}})
        .then(response => {
          if (response.data.error){
            alert(response.data.mensaje + ' - Consulta Asignaturas por Cursos')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
          } else {
            if(response.data.datos != 0) {
              this.listaAsignaturasCursos = response.data.datos
            }
            //console.log(JSON.stringify(response.data.datos))
          }
        })
        .catch(err => {
          alert('Algo salio mal y no se pudo realizar: Consulta Asignaturas por Cursos. Intente más tarde. ' + err)
          location.replace(CONFIG.ROOT_WEBSITE)
        })
      },
      async ocuparComboAsignaturasSede() {
        this.comboAsignaturasSede = []
        this.$store.state.datosAsignaturas.forEach(element => {
          if (element.estado == 1) {
            this.comboAsignaturasSede.push({ 'value': element.id, 'text': element.asignatura.toUpperCase() })
          }
        })
      },
      async ocuparComboDocentes() {
        this.comboDocentes = []
        this.$store.state.datosDocentes.forEach(element => {
          this.comboDocentes.push({ 'value': element.id, 'text': element.docente.toUpperCase() })
        })
        this.comboDocentes.push({ 'value': '99999', 'text': '--- SIN ASIGNAR DOCENTE' })
      },
      async ocuparComboSedes() {
        this.comboSedes = []
        this.$store.state.datosSedes.forEach(element => {
          this.comboSedes.push({ 'value': element.id, 'text': element.sede.toUpperCase() })
        })
      },
      colorArea(orden) {
        let color = ['#CC9900','#0033CC','#009900','#CCCC00','#006699','#FF00CC','#9933CC','#FF6600','#0033FF','#666600','#CC3300','#607d8b','#4a148c','#afb42b','#f57c00','#795548','#8e24aa','#c2185b','#f44336','#CC9900','#0033CC','#009900','#CCCC00','#006699','#FF00CC','#9933CC','#FF6600','#0033FF','#666600','#CC3300','#607d8b','#4a148c','#afb42b','#f57c00','#795548','#8e24aa','#c2185b','#f44336','#CC9900','#0033CC','#009900','#CCCC00','#006699','#FF00CC','#9933CC','#FF6600','#0033FF','#666600','#CC3300','#607d8b','#4a148c','#afb42b','#f57c00','#795548','#8e24aa','#c2185b','#f44336','#CC9900','#0033CC','#009900','#CCCC00','#006699','#FF00CC','#9933CC','#FF6600','#0033FF','#666600','#CC3300','#607d8b','#4a148c','#afb42b','#f57c00','#795548','#8e24aa','#c2185b','#f44336']
        return 'color: ' + color[orden]
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.ocuparComboSedes()
      this.ocuparComboAsignaturasSede()
      this.ocuparComboDocentes()
    }
  }
</script>