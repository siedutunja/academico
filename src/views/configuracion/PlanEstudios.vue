<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> PLAN DE ESTUDIOS POR GRADOS</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idGradoSede=null,ocuparComboGradosSede()"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="Seleccione el Grado:" label-for="grados" class="etiqueta">
                  <b-form-select  id="grados" ref="grados" v-model="idGradoSede" :options="comboGradosSede" @change="consultarPlanEstudios()" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-2" v-if="idGradoSede!=null">
      <b-col lg="5">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> LISTA DE ASIGNATURAS</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <vue-good-table ref="tablaAsignaturas" :columns="encabColumnasAsig" :rows="listaAsignaturasNoAsignadas" styleClass="vgt-table condensed bordered striped"
                  :select-options="{enabled: true, selectOnCheckboxOnly: true, selectionText: 'Marcados', clearSelectionText: 'Desmarcar', selectAllByGroup: true}">
                  <div slot="selected-row-actions">
                    <b-button class="" variant="success" @click="asignarAlPlan()">Asignar al Plan <b-icon icon="box-arrow-in-right" aria-hidden="true"></b-icon></b-button>
                  </div>
                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'asignatura'">
                      <span class="text-muted" style="font-size: 10px;">{{props.row.area}}</span><br><strong>{{props.row.asignatura}}</strong>
                    </span>
                  </template>
                  <div slot="emptystate">
                    <h5 class="text-danger ml-5">No existen asignaturas creadas</h5>
                  </div>
                </vue-good-table>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <ul>
                 <li><em>Marque las asignaturas y asígnelas al Plan de Estudios.</em></li>
                </ul>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col lg="7">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> PLAN DEL GRADO .:. {{textGrado}} .:.</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <vue-good-table ref="tablaAsignaturasPlan" :columns="encabColumnasPlan" :rows="listaAsignaturasSiAsignadas" styleClass="vgt-table condensed bordered striped"
                  :select-options="{enabled: true, selectOnCheckboxOnly: true, selectionText: 'Marcados', clearSelectionText: 'Desmarcar', selectAllByGroup: true}">
                  <div slot="selected-row-actions">
                    <b-button class="" variant="success" @click="quitarDelPlan()">Quitar del Plan <b-icon icon="box-arrow-in-left" aria-hidden="true"></b-icon></b-button>
                  </div>
                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'asignatura'" :style="(colorArea(props.row.orden))">
                      <span style="font-size: 10px;">{{props.row.area}}</span><br><strong>{{props.row.asignatura}}</strong>
                    </span>
                    <span v-if="props.column.field == 'idEspecialidad'">
                      <b-form-select v-model="props.row.idEspecialidad" @change="actualizarItem(props.row)" :options="comboEspecialidades" :style="(colorArea(props.row.orden))"></b-form-select>
                    </span>
                    <span v-if="props.column.field == 'ih'">
                      <b-form-input v-model="props.row.ih" @blur="actualizarItem(props.row)" autocomplete="off" maxlength="2" @keydown="soloNumeros" :style="(colorArea(props.row.orden))"></b-form-input>
                    </span>
                    <span v-if="props.column.field == 'porcentaje'">
                      <b-form-input type="number" v-model="props.row.porcentaje" @blur="actualizarItem(props.row)" autocomplete="off" maxlength="4" :style="(colorArea(props.row.orden))"></b-form-input>
                    </span>
                  </template>
                  <div slot="emptystate">
                    <h5 class="text-danger ml-5">No existen asignaturas en el plan de estudios</h5>
                  </div>
                </vue-good-table>
              </b-col>
              <b-col lg="12">
                <b-alert class="text-center" show><h4>IH Total = {{ totalIH }} horas</h4></b-alert>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <ul>
                  <li><em>Marque las asignaturas y quítelas del Plan de Estudios.</em></li>
                  <li><em>Actualice la Intensidad Horaria y/o el Porcentaje de la Asignatura dentro del Area y Actualice el Plan de Estudios.</em></li>
                </ul>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <b-button block variant="primary" @click="confirmarPlanEstudios">Actualizar el Plan de Estudios del Grado {{textGrado}}</b-button>
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
    name: 'planestudios',
    components: {
      VueGoodTable
    },
    data () {
      return {
        listaAsignaturas: [],
        comboSedes: [],
        idSede: null,
        comboGradosSede: [],
        idGradoSede: null,
        encabColumnasAsig : [
          { label: 'Área/Asignatura', field: 'asignatura', sortable: false }
        ],
        encabColumnasPlan : [
          { label: 'Área/Asignatura', field: 'asignatura', sortable: false },
          { label: 'Especialidad', field: 'idEspecialidad', sortable: false },
          { label: 'IH', field: 'ih', width: '70px', sortable: false },
          { label: 'Peso', field: 'porcentaje',width: '100px', sortable: false }
        ],
        listaAsignaturasNoAsignadas: [],
        listaAsignaturasSiAsignadas: [],
        listaAsignaturasParaAsignar: [],
        listaAsignaturasParaQuitar: [],
        comboEspecialidades: [],
        textGrado: null,
        totalIH: 0
      }
    },
    methods: {
      async guardarPlanEstudios() {
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/planestudios', JSON.stringify(this.listaAsignaturasSiAsignadas), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Plan Estudios')
          } else{
            this.quitarAsignaturasPlanEstudios()
            this.consultarPlanEstudios()
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Plan Estudios. Intente más tarde. ' + err)
        })
      },
      async quitarAsignaturasPlanEstudios() {
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/planestudios/quitarasignaturasplan', JSON.stringify(this.listaAsignaturasNoAsignadas), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Quitar AsignaturasPlan Estudios')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos del Plan de Estudios se han actualizado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Quitar AsignaturasPlan Estudios. Intente más tarde. ' + err)
        })
      },
      confirmarPlanEstudios() {
        let titulo = 'Actualizar datos del Plan de Estudios'
        let pregunta = '¿Esta seguro de actualizar el Plan de Estudios?'
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
            this.guardarPlanEstudios()
          }
        })
        return true
      },
      actualizarItem(item) {
        let indice = this.listaAsignaturasSiAsignadas.findIndex(asigna => asigna.idAsignatura === item.idAsignatura)
        this.listaAsignaturasSiAsignadas[indice].idEspecialidad = item.idEspecialidad
        this.listaAsignaturasSiAsignadas[indice].ih = item.ih
        this.listaAsignaturasSiAsignadas[indice].porcentaje = item.porcentaje
      },
      quitarDelPlan() {
        this.listaAsignaturasParaQuitar = this.$refs['tablaAsignaturasPlan'].selectedRows
        this.listaAsignaturasParaQuitar.forEach(element => {
          this.listaAsignaturasNoAsignadas.push({ 'idAsignatura': element.idAsignatura, 'asignatura': element.asignatura, 'idGradoSede': this.idGradoSede, 'area': element.area, 'orden': element.orden })
          let indice = this.listaAsignaturasSiAsignadas.findIndex(asigna => asigna.idAsignatura === element.idAsignatura)
          this.listaAsignaturasSiAsignadas.splice(indice,1)
        })
      },
      asignarAlPlan() {
        this.listaAsignaturasParaAsignar = this.$refs['tablaAsignaturas'].selectedRows
        this.listaAsignaturasParaAsignar.forEach(element => {
          this.listaAsignaturasSiAsignadas.push({ 'idAsignatura': element.idAsignatura, 'ih': 0, 'porcentaje': 0, 'asignatura': element.asignatura, 'idGradoSede': this.idGradoSede, 'idEspecialidad': 0, 'area': element.area, 'orden': element.orden })
          let indice = this.listaAsignaturasNoAsignadas.findIndex(asigna => asigna.idAsignatura === element.idAsignatura)
          this.listaAsignaturasNoAsignadas.splice(indice,1)
        })
      },
      async consultarPlanEstudios() {
        this.textGrado = document.getElementById('grados')[document.getElementById('grados').selectedIndex].text
        this.listaAsignaturasNoAsignadas = []
        this.listaAsignaturas.forEach(element => {
          this.listaAsignaturasNoAsignadas.push({ 'idAsignatura': element.id, 'asignatura': element.asignatura, 'idGradoSede': this.idGradoSede, 'area': element.area, 'orden': element.orden })
        })
        this.listaAsignaturasSiAsignadas = []
        this.totalIH = 0
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/planestudios', {params: {idGradoSede: this.idGradoSede}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Plan Estudios')
          } else{
            if (response.data.datos != 0) {
              this.listaAsignaturasSiAsignadas = response.data.datos
              this.listaAsignaturasSiAsignadas.forEach(element => {
                let indice = this.listaAsignaturasNoAsignadas.findIndex(asigna => asigna.idAsignatura == element.idAsignatura)
                this.listaAsignaturasNoAsignadas.splice(indice,1)
                this.totalIH += element.ih
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Plan Estudios. Intente más tarde.' + err)
        })
      },
      async consultarListaAsignaturas() {
        this.listaAsignaturas = this.$store.state.datosAsignaturas
      },
      async ocuparComboGradosSede() {
        this.comboGradosSede = []
        this.$store.state.datosGrados.forEach(element => {
          if (element.id_sede == this.idSede) {
            this.comboGradosSede.push({ 'value': element.id, 'text': element.grado.toUpperCase() })
          }
        })
      },
      async ocuparComboSedes() {
        this.comboSedes = []
        this.$store.state.datosSedes.forEach(element => {
          this.comboSedes.push({ 'value': element.id, 'text': element.sede.toUpperCase() })
        })
      },
      async ocuparComboEspecialidades() {
        this.comboEspecialidades = []
        this.$store.state.datosEspecialidades.forEach(element => {
          this.comboEspecialidades.push({ 'value': element.id, 'text': element.especialidad.toUpperCase() })
        })
      },
      soloNumeros(e) {
        let key = window.Event ? e.which : e.keyCode
        if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key == 8) || (key == 9) || (key == 37) || (key == 39))) {
            e.preventDefault()
        }
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
      if(this.$store.state.idRol == 1 || this.$store.state.idRol == 12) {
        this.consultarListaAsignaturas()
        this.ocuparComboSedes()
        this.ocuparComboEspecialidades()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>