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
              <span v-if="props.column.field == 'definitivapree'">
                <b-form-input v-model="props.row.definitivapree" @blur="actualizarItemPree(props.row)" @change="cambioPlanilla" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'definitivapree')" autocomplete="off" maxlength="1" :ref="'definitivapree-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'concepto'">
                <span><strong>{{props.row.concepto}}</strong></span>
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
            <span class="ml-3 text-danger">{{configuracionPlanilla.preeC1}}: ({{configuracionPlanilla.preeL1}})</span>
            <span class="ml-3 text-primary">{{configuracionPlanilla.preeC2}}: ({{configuracionPlanilla.preeL2}})</span>
            <span class="ml-3 text-warning">{{configuracionPlanilla.preeC3}}: ({{configuracionPlanilla.preeL3}})</span>
            <span class="ml-3 text-success">{{configuracionPlanilla.preeC4}}: ({{configuracionPlanilla.preeL4}})</span>
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
        .put(CONFIG.ROOT_PATH + 'docente/notas/planillapree', JSON.stringify(this.notasPlanillaPree), { headers: {"Content-Type": "application/json; charset=utf-8" }})
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
        .get(CONFIG.ROOT_PATH + 'docente/notas/planillapree', {params: {idCurso: this.configuracionPlanilla.idCurso, idPeriodo: this.configuracionPlanilla.idPeriodo, idPlanilla: this.configuracionPlanilla.idPlanilla, vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Notas periodo Preescolar')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                if(element.ausJ === undefined) element.ausJ = null
                if(element.ausS === undefined) element.ausS = null
                if(element.definitivapree === undefined) element.definitivapree = null
                if(element.concepto === undefined) element.concepto = null
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
            {'value': 'definitivapree', 'text': 'Definitiva'},
          ]
        this.encabColumnas = [
          { label: 'Apellidos y Nombres Estudiante', width: '30%', field: 'estudiante', sortable: false },
          { label: '', field: 'diversa', sortable: false, tdClass: this.tdClassFuncDiversa },
          { label: 'Definitiva', field: 'definitivapree', sortable: false },
          { label: 'Concepto', field: 'concepto', sortable: false, tdClass: this.tdClassFuncConceptoPree },
          { label: 'Justificadas', field: 'ausJ', sortable: false },
          { label: 'Sin justificar', field: 'ausS', sortable: false },
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
      actualizarItemPree(item) {
        let indice = this.notasPlanillaPree.findIndex(asigna => asigna.idMatricula === item.idMatricula)
        if (item.definitivapree == '' || item.definitivapree == null) {
          this.notasPlanillaPree[indice].definitivapree = null
          item.definitivapree = null
        } else  {
          if (item.definitivapree == this.configuracionPlanilla.preeL1 || item.definitivapree == this.configuracionPlanilla.preeL2 || item.definitivapree == this.configuracionPlanilla.preeL3 || item.definitivapree == this.configuracionPlanilla.preeL4) {
            this.notasPlanillaPree[indice].definitivapree = item.definitivapree
          } else {
            this.notasPlanillaPree[indice].definitivapree = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación: ' + item.definitivapree  + ' no es válida.')
            item.definitivapree = null
          }
        }
        if (item.definitivapree == this.configuracionPlanilla.preeL1) {
          this.notasPlanillaPree[indice].concepto = this.configuracionPlanilla.preeC1
        } else if (item.definitivapree == this.configuracionPlanilla.preeL2) {
          this.notasPlanillaPree[indice].concepto = this.configuracionPlanilla.preeC2
        } else if (item.definitivapree == this.configuracionPlanilla.preeL3) {
          this.notasPlanillaPree[indice].concepto = this.configuracionPlanilla.preeC3
        } else if (item.definitivapree == this.configuracionPlanilla.preeL4) {
          this.notasPlanillaPree[indice].concepto = this.configuracionPlanilla.preeC4
        } else {
          this.notasPlanillaPree[indice].concepto = null
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