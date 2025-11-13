<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> ACTIVAR/DESACTIVAR PERIODOS PARA EVALUACIONES</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Periodo:" label-for="periodo" class="etiqueta">
                  <b-form-select id="periodo" ref="periodo" v-model="idPeriodo" :options="comboPeriodos" @change="cargueListaDocentes"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <div v-if="idPeriodo != null">
              <b-row><b-col lg="12"><hr></b-col></b-row>
              <b-row>
                <b-col lg="12">
                  <vue-good-table ref="profes" :columns="encabColumnasDocentes" :rows="listaDocentes" styleClass="vgt-table condensed bordered striped" :line-numbers="true" :search-options="{enabled: true,placeholder: 'Filtrar docentes...'}"
                    :select-options="{enabled: true,selectionText: 'Docentes seleccionados',clearSelectionText: 'Limpiar',}">
                    <template #selected-row-actions>
                      <button class="small btn btn-primary" @click="seleccionarFechas()">Seleccionar Fechas</button>
                    </template>
                    <template slot="table-row" slot-scope="props">
                      <span v-if="props.column.field == 'docente'">
                        <span>{{props.row.docente}}</span>
                      </span>
                      <span v-if="props.column.field == 'periodo'">
                        <span><strong>{{props.row.periodo}}</strong></span>
                      </span>
                      <span v-if="props.column.field == 'fechaIni'">
                        <span>{{props.row.fechaIni}}</span>
                      </span>
                      <span v-if="props.column.field == 'fechaFin'">
                        <span>{{props.row.fechaFin}}</span>
                      </span>
                    </template>
                    <div slot="emptystate">
                      <h5 class="text-danger ml-5">No existen Docentes</h5>
                    </div>
                  </vue-good-table>
                </b-col>
              </b-row>
            </div>
          </b-card-text>
          <template #footer>
            <em>Seleccione el periodo y los docentes que desea activar/desactivar para cargue de evalaciones.</em>
          </template>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalSeleccionarFechas" size="" scrollable hide-footer title="Seleccionar Fechas" ok-only>
      <div class="mx-3">
        <div>
          <b-row>
            <b-col lg="12">
              <p>Esta opción permite seleccionar y asignar a los docentes las fechas de Inicio y Cierre del periodo para que carguen las evaluaciones.</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="12">
              <b-form-group label="Fecha de Inicio del Periodo*" label-for="ini" class="etiqueta">
                <b-form-input type="date" id="ini" v-model="fechaIniPer"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="12">
              <b-form-group label="Fecha de Terminación del Periodo*" label-for="fin" class="etiqueta">
                <b-form-input type="date" id="fin" v-model="fechaFinPer"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="12" md="12"><hr></b-col>
            <b-col lg="12" md="12">
              <b-button class="small mt-1 mr-3" variant="primary" @click="asignarFechas()">Asignar Fechas a los Docentes</b-button>
              <b-button class="small mt-1 mr-3" variant="secondary" @click="cancelarVentana">Cancelar</b-button>
            </b-col>
          </b-row>
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

  export default {
    name: 'evaluacionesperiodo',
    components: {
      VueGoodTable,
    },
    data () {
      return {
        idPeriodo: null,
        comboPeriodos: [],
        listaDocentes: [],
        encabColumnasDocentes: [
          { label: 'Apellidos y Nombres del Docente', field: 'docente' },
          { label: 'Periodo', field: 'periodo', sortable: false, tdClass: 'text-center' },
          { label: 'Fecha Inicial', field: 'fechaIni', sortable: false },
          { label: 'Fecha Final', field: 'fechaFin', sortable: false },
          { label: '', field: 'id', sortable: false }
        ],
        profesSeleccionados: [],
        fechaIniPer: null,
        fechaFinPer: null
      }
    },
    methods: {
      async asignarFechas() {
        this.profesSeleccionados = []
        this.$refs.profes.selectedRows.forEach(element => {
          this.profesSeleccionados.push({ 'id': element.id, 'fechaIniPer': this.fechaIniPer, 'fechaFinPer': this.fechaFinPer, 'periodo': this.idPeriodo })
        })
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/periodosdocente', JSON.stringify(this.profesSeleccionados), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.$refs['modalSeleccionarFechas'].hide()
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar fechas periodos')
          } else{
            this.$refs['modalSeleccionarFechas'].hide()
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Las fechas se han actualizado correctamente.')
            this.cargarDatosDocentes()
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar fechas periodos. Intente más tarde. ' + err)
        })
      },
      seleccionarFechas() {
        this.$refs['modalSeleccionarFechas'].show()
      },
      async cargarDatosDocentes() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/carguedocentes', {params: {idInstitucion: this.$store.state.idInstitucion}})
        .then(response => {
          if (response.data.error){
            alert(response.data.mensaje + ' - Consulta datos Docentes Activos')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
          } else {
            if(response.data.datos != 0) {
              this.$store.commit('set', ['datosDocentes', response.data.datos])
              this.cargueListaDocentes()
            } else {
              this.$store.commit('set', ['datosDocentes', []])
            }
          }
        })
        .catch(err => {
          alert('Algo salio mal y no se pudo realizar: Consulta datos Docentes Activos. Intente más tarde. ' + err)
          location.replace(CONFIG.ROOT_WEBSITE)
        })
      },
      async cargueListaDocentes() {
        this.listaDocentes = []
        this.$store.state.datosDocentes.forEach(element => {
          let fechitaI = null
          let fechitaF = null
          if (this.idPeriodo == 1) {
            if (element.notasP1_Ini != null) fechitaI = element.notasP1_Ini.substr(0,10)
            if (element.notasP1_Fin != null) fechitaF = element.notasP1_Fin.substr(0,10)
          } else if (this.idPeriodo == 2) {
            if (element.notasP2_Ini != null) fechitaI = element.notasP2_Ini.substr(0,10)
            if (element.notasP2_Fin != null) fechitaF = element.notasP2_Fin.substr(0,10)
          } else if (this.idPeriodo == 3) {
            if (element.notasP3_Ini != null) fechitaI = element.notasP3_Ini.substr(0,10)
            if (element.notasP3_Fin != null) fechitaF = element.notasP3_Fin.substr(0,10)
          } else if (this.idPeriodo == 4) {
            if (element.notasP4_Ini != null) fechitaI = element.notasP4_Ini.substr(0,10)
            if (element.notasP4_Fin != null) fechitaF = element.notasP4_Fin.substr(0,10)
          } else if (this.idPeriodo == 5) {
            if (element.notasP5_Ini != null) fechitaI = element.notasP5_Ini.substr(0,10)
            if (element.notasP5_Fin != null) fechitaF = element.notasP5_Fin.substr(0,10)
          }
          this.listaDocentes.push({ 'id': element.id, 'docente': element.docente, 'periodo': this.idPeriodo, 'fechaIni': fechitaI, 'fechaFin': fechitaF})
        });
      },
      async ocuparComboPeriodos() {
        this.comboPeriodos = []
        this.$store.state.periodos.forEach(element => {
          this.comboPeriodos.push({ 'value': element.id, 'text': element.periodo.toUpperCase() })
        })
      },
      cancelarVentana() {
        this.$refs['modalSeleccionarFechas'].hide()
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      if(this.$store.state.idRol == 1 || this.$store.state.idRol == 12) {
        let fechaHoy = new Date()
        this.fechaIniPer = fechaHoy.toJSON().slice(0,10)
        this.fechaFinPer = fechaHoy.toJSON().slice(0,10)
        this.ocuparComboPeriodos()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>