<template>
  <div class="mt-2">
    <div v-if="btnCargando">
      <div class="text-center m-5 text-primary">
        <b-spinner style="width: 3rem; height: 3rem;" label="Spinner"></b-spinner>
        <br><strong>Cargando planilla...</strong>
      </div>
    </div>
    <div v-else>
      <div v-if="$store.state.idRol==12">
        <!--
        <b-row>
          <b-col lg="12">
            <b-button class="float-right" variant="outline-info" @click="seleccionarColumnaPegarExcel()" >Pegar valoraciones<br>desde Excel</b-button>
          </b-col>
        </b-row>
        -->
        <b-row class="mt-2">
          <b-col lg="12">
            <b-alert v-if="cambioActivo==true" variant="danger" show><b>Advertencia: </b>La planilla se ha modificado, se recomienda guardar la planilla.</b-alert>
          </b-col>
        </b-row>
      </div>
      <b-row class="mt-2">
        <b-col>
          <vue-good-table :columns="encabColumnas" :rows="notasPlanillaPree" styleClass="vgt-table condensed bordered striped" :lineNumbers="true" ref="table">
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'estudiante'">
                <span>{{props.row.estudiante}}</span>
              </span>
              <span v-if="props.column.field == 'diversa'">
                <span><strong>{{props.row.diversa}}</strong></span>
              </span>
              <span v-if="props.column.field == 'c1'">
                <b-form-input v-model="props.row.c1" @blur="actualizarItemPreeC1(props.row)" @change="cambioPlanilla" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'c1')" autocomplete="off" maxlength="1" :ref="'c1-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'c2'">
                <b-form-input v-model="props.row.c2" @blur="actualizarItemPreeC2(props.row)" @change="cambioPlanilla" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'c2')" autocomplete="off" maxlength="1" :ref="'c2-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'c3'">
                <b-form-input v-model="props.row.c3" @blur="actualizarItemPreeC3(props.row)" @change="cambioPlanilla" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'c3')" autocomplete="off" maxlength="1" :ref="'c3-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'c4'">
                <b-form-input v-model="props.row.c4" @blur="actualizarItemPreeC4(props.row)" @change="cambioPlanilla" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'c4')" autocomplete="off" maxlength="1" :ref="'c4-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'c5'">
                <b-form-input v-model="props.row.c5" @blur="actualizarItemPreeC5(props.row)" @change="cambioPlanilla" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'c5')" autocomplete="off" maxlength="1" :ref="'c5-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'c6'">
                <b-form-input v-model="props.row.c6" @blur="actualizarItemPreeC6(props.row)" @change="cambioPlanilla" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'c6')" autocomplete="off" maxlength="1" :ref="'c6-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'c7'">
                <b-form-input v-model="props.row.c7" @blur="actualizarItemPreeC7(props.row)" @change="cambioPlanilla" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'c7')" autocomplete="off" maxlength="1" :ref="'c7-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'c8'">
                <b-form-input v-model="props.row.c8" @blur="actualizarItemPreeC8(props.row)" @change="cambioPlanilla" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'c8')" autocomplete="off" maxlength="1" :ref="'c8-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'c9'">
                <b-form-input v-model="props.row.c9" @blur="actualizarItemPreeC9(props.row)" @change="cambioPlanilla" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'c9')" autocomplete="off" maxlength="1" :ref="'c9-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'c10'">
                <b-form-input v-model="props.row.c10" @blur="actualizarItemPreeC10(props.row)" @change="cambioPlanilla" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'c10')" autocomplete="off" maxlength="1" :ref="'c10-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'ausJ'">
                <b-form-input v-model="props.row.ausJ" @blur="actualizarFallasPree(props.row)" autocomplete="off" maxlength="2" @change="cambioPlanilla" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'ausJ'),soloNumeros($event)" :ref="'ausJ-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'ausS'">
                <b-form-input v-model="props.row.ausS" @blur="actualizarFallasPree(props.row)" autocomplete="off" maxlength="2" @change="cambioPlanilla" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'ausS'),soloNumeros($event)" :ref="'ausS-' + props.row.originalIndex"></b-form-input>
              </span>
            </template>
          </vue-good-table>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col lg="12">
          <h6>Conceptos Valorativos:
            <span class="ml-3 text-warning">EN PROCESO: (E)</span>
            <span class="ml-3 text-success">LOGRADO: (L)</span>
            <span class="ml-3">RECOMENDACIÓN: (R)</span>
          </h6>
        </b-col>
      </b-row>
      <div v-if="$store.state.idRol==12">
        <b-row class="mt-2">
          <b-col lg="12">
            <b-alert v-if="cambioActivo==true" variant="danger" show><b>Advertencia: </b>La planilla se ha modificado, se recomienda guardar la planilla.</b-alert>
          </b-col>
        </b-row>
        <b-row v-if="notasPlanillaPree">
          <b-col v-if="!botonGuardando">
            <b-button class="small mx-1 mt-4" variant="success" @click="botonGuardando = true,guardarPlanillaPreescolar()" :disabled="!cambioActivo">Guardar Planilla Parcial</b-button>
            <!--<b-button class="small mx-1 mt-4 float-right" variant="success" @click="procesarPlanila">Procesar y Generar Planilla Final del Periodo</b-button>-->
          </b-col>
          <b-col v-else>
            <b-button class="mx-1 mt-4" variant="primary" disabled>
              <b-spinner small type="grow"></b-spinner>
              Guardando la planilla...
            </b-button>
          </b-col>
        </b-row>
      </div>
      <b-modal ref="modalSeleccionarColumna" size="" scrollable hide-footer title="Seleccionar Columna" ok-only>
        <div class="mx-3">
          <div>
            <b-row>
              <b-col lg="12">
                <p>Esta opción le permite copiar datos de una hoja de Excel y pegarlos en la columna que usted seleccione.</p>
                <p>Tenga en cuenta las siguientes condiciones:</p>
                <ul>
                  <li>Los datos se deben copiar desde el portapapeles del sistema. Generalmente se copian con la combianción de teclas (Ctrl+C).</li>
                  <li>Los datos se pegaran en la columna que seleccione.</li>
                  <li>Los datos se pegaran desde la primera fila de la columna seleccionada.</li>
                  <li>Los datos que no sean numéricos no se pegan.</li>
                  <li>Los datos que no cumplan los criterios de validación no se pegan.</li>
                </ul>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="12">
                <b-form-group label="Seleccionar Columna*" label-for="columna" class="etiqueta">
                  <b-form-select  id="columna" ref="columna" v-model="idColumnaCopiar" :options="comboColumnas"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="12" md="12"><hr></b-col>
              <b-col lg="12" md="12" v-if="idColumnaCopiar != null">
                <b-button class="small mt-1 mr-3" variant="primary" @click="pasteExcelData()">Pegar Valoraciones</b-button>
                <b-button class="small mt-1 mr-3" variant="secondary" @click="cancelarVentana">Cancelar</b-button>
              </b-col>
            </b-row>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'

  export default {
    name: 'preeparcialperiodo',
    props: {
      configuracionPlanilla: Object
    },
    components: {
      VueGoodTable
    },
    data () {
      return {
        notasPlanillaPree: [],
        botonGuardando: false,
        encabColumnas: [],
        encabezados: {},
        idColumnaCopiar: null,
        comboColumnas: [],
        cambioActivo: false,
        btnCargando: true
      }
    },
    methods: {
      async guardarPlanillaPreescolar() {
        await axios
        .put(CONFIG.ROOT_PATH + 'docente/notas/planillapree/rural', JSON.stringify(this.notasPlanillaPree), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Planilla Preescolar')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'La planilla parcial de evaluaciones se ha guardado satisfactoriamente.')
            this.botonGuardando = false
            this.cambioActivo = false
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Planilla Preescolar. Intente más tarde. ' + err)
        })
      },
      cambioPlanilla() {
        this.cambioActivo = true
      },
      async cargarEncabezados() {
        this.encabezados = {}
        await axios
        .get(CONFIG.ROOT_PATH + 'docente/configuracion/planilla', {params: {idPlanilla: this.configuracionPlanilla.idPlanilla, idPeriodo: this.configuracionPlanilla.idPeriodo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Encabezados Planilla')
          } else{
            if (response.data.datos != 0) {
              this.encabezados = response.data.datos
            }
          }
          //console.log(JSON.stringify(this.encabezados))
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Encabezados Planilla. Intente más tarde.' + err)
        })
      },
      handleKeyNavigation(event, i, col) {
        if (event.key === "ArrowDown") {
          const nextInput = this.$refs[`${col}-${i + 1}`]
          if (nextInput) nextInput.focus()
        } else if (event.key === "ArrowUp") {
          const previousInput = this.$refs[`${col}-${i - 1}`]
          if (previousInput) previousInput.focus()
        }
      },
      async pasteExcelData() {
        try {
          // Obtener datos del portapapeles
          const clipboardData = await navigator.clipboard.readText();
          // Dividir los datos por líneas y columnas
          const rowsFromClipboard = clipboardData.split("\n");
          console.log(rowsFromClipboard)
          rowsFromClipboard.forEach((row, index) => {
            row = row.substr(0,1) //substring(0,3)
            console.log(index,row)
            //row = row.replace(/,/g, '.')
            if (row != this.configuracionPlanilla.preeL1 && row != this.configuracionPlanilla.preeL2 && row != this.configuracionPlanilla.preeL3 && row != this.configuracionPlanilla.preeL4) {
              row = ''
            }
            const values = row.split("\t") // Separación por tabulaciones
            if (this.notasPlanilla[index]) {
              if (this.idColumnaCopiar == 'definitivapree') this.notasPlanilla[index].definitivapree = values[0] || this.notasPlanilla[index].definitivapree
              //this.actualizarItemPree(this.notasPlanilla[index])
            }
          })
          this.cambioActivo = true
        } catch (error) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'No es posible pegar los datos. Intente nuevamente seleccionar y copiar los datos desde Excel.' + error)
        }
        this.cancelarVentana()
      },
      seleccionarColumnaPegarExcel() {
        this.idColumnaCopiar = null
        this.$refs['modalSeleccionarColumna'].show()
      },
      async cargarNotasPeriodoPreescolar() {
        this.notasPlanillaPree = []
        await axios
        .get(CONFIG.ROOT_PATH + 'docente/notas/planillapree/rural', {params: {idCurso: this.configuracionPlanilla.idCurso, idPeriodo: this.configuracionPlanilla.idPeriodo, idPlanilla: this.configuracionPlanilla.idPlanilla, vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Notas periodo Preescolar')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                if(element.ausJ === undefined) element.ausJ = null
                if(element.ausS === undefined) element.ausS = null
                if(element.c1 === undefined) element.c1 = null
                if(element.c2 === undefined) element.c2 = null
                if(element.c3 === undefined) element.c3 = null
                if(element.c4 === undefined) element.c4 = null
                if(element.c5 === undefined) element.c5 = null
                if(element.c6 === undefined) element.c6 = null
                if(element.c7 === undefined) element.c7 = null
                if(element.c8 === undefined) element.c8 = null
                if(element.c9 === undefined) element.c9 = null
                if(element.c10 === undefined) element.c10 = null
                element.id_asignatura_curso = this.configuracionPlanilla.idPlanilla
                element.periodo = this.configuracionPlanilla.idPeriodo
              })
              this.notasPlanillaPree = response.data.datos
              //console.log(JSON.stringify(this.notasPlanillaPree))
              setTimeout(()=>{
                this.construirPlanillaNotasPreescolar()
                this.btnCargando = false
              },500)
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Notas periodo. Intente más tarde.' + err)
        })
      },
      construirPlanillaNotasPreescolar() {
          this.comboColumnas = [
            {'value': 'c1', 'text': 'c1'},
          ]
        this.encabColumnas = [
          { label: 'Apellidos y Nombres Estudiante', width: '30%', field: 'estudiante', sortable: false },
          { label: '', field: 'diversa', sortable: false, tdClass: this.tdClassFuncDiversa },
          { label: 'C1', field: 'c1', sortable: false },
          { label: 'C2', field: 'c2', sortable: false },
          { label: 'C3', field: 'c3', sortable: false },
          { label: 'C4', field: 'c4', sortable: false },
          { label: 'C5', field: 'c5', sortable: false },
          { label: 'C6', field: 'c6', sortable: false },
          { label: 'C7', field: 'c7', sortable: false },
          { label: 'C8', field: 'c8', sortable: false },
          { label: 'C9', field: 'c9', sortable: false },
          { label: 'C10', field: 'c10', sortable: false },
          { label: 'AJ', field: 'ausJ', sortable: false },
          { label: 'AS', field: 'ausS', sortable: false },
        ]
      },
      tdClassFuncConceptoPree(fila) {
        if (fila.definitivapree == this.configuracionPlanilla.preeL1) {
          return 'text-danger text-center bg-light'
        } else if (fila.definitivapree == this.configuracionPlanilla.preeL2) {
          return 'text-primary text-center bg-light'
        } else if (fila.definitivapree == this.configuracionPlanilla.preeL3) {
          return 'text-warning text-center bg-light'
        } else if (fila.definitivapree == this.configuracionPlanilla.preeL4) {
          return 'text-success text-center bg-light'
        }
        return 'text-secondary bg-light'
      },
      tdClassFuncDiversa(fila) {
        if (fila.id_diversa == 'S') {
          return 'text-center alert alert-warning'
        }
      },
      actualizarItemPreeC1(item) {
        let indice = this.notasPlanillaPree.findIndex(asigna => asigna.idMatricula === item.idMatricula)
        if (item.c1 == '' || item.c1 == null) {
          this.notasPlanillaPree[indice].c1 = null
          item.c1 = null
        } else  {
          if (item.c1 == 'E' || item.c1 == 'L' || item.c1 == 'R') {
            this.notasPlanillaPree[indice].c1 = item.c1
          } else {
            this.notasPlanillaPree[indice].c1 = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación: ' + item.c1  + ' no es válida.')
            item.c1 = null
          }
        }
      },
      actualizarItemPreeC2(item) {
        let indice = this.notasPlanillaPree.findIndex(asigna => asigna.idMatricula === item.idMatricula)
        if (item.c2 == '' || item.c2 == null) {
          this.notasPlanillaPree[indice].c2 = null
          item.c2 = null
        } else  {
          if (item.c2 == 'E' || item.c2 == 'L' || item.c2 == 'R') {
            this.notasPlanillaPree[indice].c2 = item.c2
          } else {
            this.notasPlanillaPree[indice].c2 = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación: ' + item.c2  + ' no es válida.')
            item.c2 = null
          }
        }
      },
      actualizarItemPreeC3(item) {
        let indice = this.notasPlanillaPree.findIndex(asigna => asigna.idMatricula === item.idMatricula)
        if (item.c3 == '' || item.c3 == null) {
          this.notasPlanillaPree[indice].c3 = null
          item.c3 = null
        } else  {
          if (item.c3 == 'E' || item.c3 == 'L' || item.c3 == 'R') {
            this.notasPlanillaPree[indice].c3 = item.c3
          } else {
            this.notasPlanillaPree[indice].c3 = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación: ' + item.c3  + ' no es válida.')
            item.c3 = null
          }
        }
      },
      actualizarItemPreeC4(item) {
        let indice = this.notasPlanillaPree.findIndex(asigna => asigna.idMatricula === item.idMatricula)
        if (item.c4 == '' || item.c4 == null) {
          this.notasPlanillaPree[indice].c4 = null
          item.c4 = null
        } else  {
          if (item.c4 == 'E' || item.c4 == 'L' || item.c4 == 'R') {
            this.notasPlanillaPree[indice].c4 = item.c4
          } else {
            this.notasPlanillaPree[indice].c4 = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación: ' + item.c4  + ' no es válida.')
            item.c4 = null
          }
        }
      },
      actualizarItemPreeC5(item) {
        let indice = this.notasPlanillaPree.findIndex(asigna => asigna.idMatricula === item.idMatricula)
        if (item.c5 == '' || item.c5 == null) {
          this.notasPlanillaPree[indice].c5 = null
          item.c5 = null
        } else  {
          if (item.c5 == 'E' || item.c5 == 'L' || item.c5 == 'R') {
            this.notasPlanillaPree[indice].c5 = item.c5
          } else {
            this.notasPlanillaPree[indice].c5 = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación: ' + item.c5  + ' no es válida.')
            item.c5 = null
          }
        }
      },
      actualizarItemPreeC6(item) {
        let indice = this.notasPlanillaPree.findIndex(asigna => asigna.idMatricula === item.idMatricula)
        if (item.c6 == '' || item.c6 == null) {
          this.notasPlanillaPree[indice].c6 = null
          item.c6 = null
        } else  {
          if (item.c6 == 'E' || item.c6 == 'L' || item.c6 == 'R') {
            this.notasPlanillaPree[indice].c6 = item.c6
          } else {
            this.notasPlanillaPree[indice].c6 = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación: ' + item.c6  + ' no es válida.')
            item.c6 = null
          }
        }
      },
      actualizarItemPreeC7(item) {
        let indice = this.notasPlanillaPree.findIndex(asigna => asigna.idMatricula === item.idMatricula)
        if (item.c7 == '' || item.c7 == null) {
          this.notasPlanillaPree[indice].c7 = null
          item.c7 = null
        } else  {
          if (item.c7 == 'E' || item.c7 == 'L' || item.c7 == 'R') {
            this.notasPlanillaPree[indice].c7 = item.c7
          } else {
            this.notasPlanillaPree[indice].c7 = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación: ' + item.c7  + ' no es válida.')
            item.c7 = null
          }
        }
      },
      actualizarItemPreeC8(item) {
        let indice = this.notasPlanillaPree.findIndex(asigna => asigna.idMatricula === item.idMatricula)
        if (item.c8 == '' || item.c8 == null) {
          this.notasPlanillaPree[indice].c8 = null
          item.c8 = null
        } else  {
          if (item.c8 == 'E' || item.c8 == 'L' || item.c8 == 'R') {
            this.notasPlanillaPree[indice].c8 = item.c8
          } else {
            this.notasPlanillaPree[indice].c8 = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación: ' + item.c8  + ' no es válida.')
            item.c8 = null
          }
        }
      },
      actualizarItemPreeC9(item) {
        let indice = this.notasPlanillaPree.findIndex(asigna => asigna.idMatricula === item.idMatricula)
        if (item.c9 == '' || item.c9 == null) {
          this.notasPlanillaPree[indice].c9 = null
          item.c9 = null
        } else  {
          if (item.c9 == 'E' || item.c9 == 'L' || item.c9 == 'R') {
            this.notasPlanillaPree[indice].c9 = item.c9
          } else {
            this.notasPlanillaPree[indice].c9 = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación: ' + item.c9  + ' no es válida.')
            item.c9 = null
          }
        }
      },
      actualizarItemPreeC10(item) {
        let indice = this.notasPlanillaPree.findIndex(asigna => asigna.idMatricula === item.idMatricula)
        if (item.c10 == '' || item.c10 == null) {
          this.notasPlanillaPree[indice].c10 = null
          item.c10 = null
        } else  {
          if (item.c10 == 'E' || item.c10 == 'L' || item.c10 == 'R') {
            this.notasPlanillaPree[indice].c10 = item.c10
          } else {
            this.notasPlanillaPree[indice].c10 = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación: ' + item.c10  + ' no es válida.')
            item.c10 = null
          }
        }
      },
      actualizarFallasPree(item) {
        let indice = this.notasPlanillaPree.findIndex(asigna => asigna.idMatricula === item.idMatricula)
        if (item.ausJ == '' || item.ausJ == null) {
          this.notasPlanillaPree[indice].ausJ = null
        } else  {
          this.notasPlanillaPree[indice].ausJ = item.ausJ
        }
        if (item.ausS == '' || item.ausS == null) {
          this.notasPlanillaPree[indice].ausS = null
        } else  {
          this.notasPlanillaPree[indice].ausS = item.ausS
        }
      },
      soloNumeros(e) {
        let key = window.Event ? e.which : e.keyCode
        if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key == 8) || (key == 9) || (key == 37) || (key == 39))) {
            e.preventDefault()
        }
      },
      cancelarVentana() {
        this.idColumnaCopiar = null
        this.$refs['modalSeleccionarColumna'].hide()
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.cargarEncabezados()
      this.cargarNotasPeriodoPreescolar()
    }
  }
</script>

<style>
  .condensed thead th{
    padding-left:.1em;
    padding-right:.1em;
    font-size: 12px;
    text-align: center;
    /*writing-mode: vertical-lr;
    text-orientation: upright;*/
  }
  .condensed tbody{
    padding-left:.1em;
    padding-right:.1em;
    font-size: 12px;
    text-align: center;
    height: 10px;
  }
  .condensed input{
    padding-left:.1em;
    padding-right:.1em;
    padding-top:.1em;
    padding-bottom:.1em;
    height: 18px;
    font-size: 12px;
    text-align: center;
  }

</style>