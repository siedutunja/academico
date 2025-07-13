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
        <b-col lg="12">
          <vue-good-table ref="table" :columns="encabColumnas" :rows="notasPlanillaCompor" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'estudiante'">
                <span><strong>{{props.row.estudiante}}</strong></span>
              </span>
              <div v-if="configuracionPlanilla.tipoValComp == 0">
                <span v-if="props.column.field == 'definitivacompor'">
                  <b-form-input v-model="props.row.definitivacompor" @blur="actualizarItemComporLetra(props.row)" @change="cambioPlanilla" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'definitivacompor')" autocomplete="off" maxlength="1" :ref="'definitivacompor-' + props.row.originalIndex"></b-form-input>
                </span>
              </div>
              <div v-else>
                <span v-if="props.column.field == 'definitiva'">
                  <b-form-input v-model="props.row.definitiva" @blur="actualizarItemComporNota(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'definitiva'),soloDecimales($event)" :ref="'definitiva-' + props.row.originalIndex"></b-form-input>
                </span>
              </div>
              <span v-if="props.column.field == 'diversa'">
                <span><strong>{{props.row.diversa}}</strong></span>
              </span>
              <span v-if="props.column.field == 'concepto'">
                <span><strong>{{props.row.concepto}}</strong></span>
              </span>
              <span v-if="props.column.field == 'observaciones'">
                <b-form-input v-model="props.row.observaciones" @blur="actualizarItemComporObserv(props.row)" autocomplete="off" maxlength="255" @change="cambioPlanilla" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'observaciones')" :ref="'observaciones-' + props.row.originalIndex" class="text-left"></b-form-input>
              </span>
                <span v-if="props.column.field == 'ausJ'">
                  <b-form-input v-model="props.row.ausJ" @blur="actualizarFallasCompor(props.row)" autocomplete="off" maxlength="2" @change="cambioPlanilla" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'ausJ'),soloNumeros($event)" :ref="'ausJ-' + props.row.originalIndex"></b-form-input>
                </span>
                <span v-if="props.column.field == 'ausS'">
                  <b-form-input v-model="props.row.ausS" @blur="actualizarFallasCompor(props.row)" autocomplete="off" maxlength="2" @change="cambioPlanilla" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'ausS'),soloNumeros($event)" :ref="'ausS-' + props.row.originalIndex"></b-form-input>
                </span>
            </template>
            <div slot="emptystate">
              <h5 class="text-danger ml-5">No existen estudiantes en la planilla</h5>
            </div>
          </vue-good-table>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col lg="12">
          <div v-if="configuracionPlanilla.tipoValComp == 0">
            <h6>Conceptos Valorativos:
              <span class="ml-3 text-danger">{{configuracionPlanilla.compC1}}: ({{configuracionPlanilla.compL1}})</span>
              <span class="ml-3 text-primary">{{configuracionPlanilla.compC2}}: ({{configuracionPlanilla.compL2}})</span>
              <span class="ml-3 text-warning">{{configuracionPlanilla.compC3}}: ({{configuracionPlanilla.compL3}})</span>
              <span class="ml-3 text-success">{{configuracionPlanilla.compC4}}: ({{configuracionPlanilla.compL4}})</span>
            </h6>
          </div>
          <div v-else-if="configuracionPlanilla.tipoValComp == 1">
            <h6>Conceptos Valorativos: 
              <span class="ml-3 text-danger">{{configuracionPlanilla.compC1}}: ({{Number(configuracionPlanilla.minBaj).toFixed(1)}} a {{Number(configuracionPlanilla.maxBaj).toFixed(1)}})</span>
              <span class="ml-3 text-primary">{{configuracionPlanilla.compC2}}: ({{Number(configuracionPlanilla.minBas).toFixed(1)}} a {{Number(configuracionPlanilla.maxBas).toFixed(1)}})</span>
              <span class="ml-3 text-warning">{{configuracionPlanilla.compC3}}: ({{Number(configuracionPlanilla.minAlt).toFixed(1)}} a {{Number(configuracionPlanilla.maxAlt).toFixed(1)}})</span>
              <span class="ml-3 text-success">{{configuracionPlanilla.compC4}}: ({{Number(configuracionPlanilla.minSup).toFixed(1)}} a {{Number(configuracionPlanilla.maxSup).toFixed(1)}})</span>
            </h6>
          </div>
          <div v-else>
            <h6>Conceptos Valorativos: SIN DEFINIR</h6>
          </div>
        </b-col>
      </b-row>
      <div v-if="$store.state.idRol==12">
        <b-row class="mt-2">
          <b-col lg="12">
            <b-alert v-if="cambioActivo==true" variant="danger" show><b>Advertencia: </b>La planilla se ha modificado, se recomienda guardar la planilla.</b-alert>
          </b-col>
        </b-row>
        <b-row v-if="notasPlanillaCompor">
          <b-col v-if="!botonGuardando">
            <b-button class="small mx-1 mt-4" variant="success" @click="botonGuardando = true,guardarPlanillaComportamiento()" :disabled="!cambioActivo">Guardar Planilla Parcial</b-button>
          </b-col>
          <b-col v-else>
            <b-button class="mx-1 mt-4" variant="primary" disabled>
              <b-spinner small type="grow"></b-spinner>
              Guardando la planilla...
            </b-button>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'

  export default {
    name: 'comportamientofinalperiodo',
    props: {
      configuracionPlanilla: Object
    },
    components: {
      VueGoodTable
    },
    data () {
      return {
        notasPlanillaCompor: [],
        botonGuardando: false,
        cambioActivo: false,
        encabColumnas: [],
        btnCargando: true
      }
    },
    methods: {
      async guardarPlanillaComportamiento() {
        await axios
        .put(CONFIG.ROOT_PATH + 'docente/notas/planillacompor', JSON.stringify(this.notasPlanillaCompor), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Planilla Comportamiento')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'La planilla parcial de evaluaciones se ha guardado satisfactoriamente.')
            this.botonGuardando = false
            this.cambioActivo = false
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Planilla Comportamiento. Intente más tarde. ' + err)
        })
      },
      construirPlanillaNotasComportamiento() {
        if (this.configuracionPlanilla.tipoValComp == 0) {
          this.encabColumnas = [
            { label: 'Apellidos y Nombres Estudiante', width: '30%', field: 'estudiante', sortable: false },
            { label: '', field: 'diversa', sortable: false, tdClass: this.tdClassFuncDiversa },
            { label: 'Definitiva', field: 'definitivacompor', sortable: false },
            { label: 'Concepto', field: 'concepto', sortable: false, tdClass: this.tdClassFuncConceptoComporLetra },
            { label: 'Observaciones del Periodo', width: '40%', field: 'observaciones', sortable: false },
            { label: 'AJ', field: 'ausJ', sortable: false },
            { label: 'AS', field: 'ausS', sortable: false },
          ]
        } else {
          this.encabColumnas = [
            { label: 'Apellidos y Nombres Estudiante', width: '30%', field: 'estudiante', sortable: false },
            { label: '', field: 'diversa', sortable: false, tdClass: this.tdClassFuncDiversa },
            { label: 'Definitiva', field: 'definitiva', sortable: false },
            { label: 'Concepto', field: 'concepto', sortable: false, tdClass: this.tdClassFuncConceptoComporNota },
            { label: 'Observaciones del Periodo', width: '40%', field: 'observaciones', sortable: false },
            { label: 'AJ', field: 'ausJ', sortable: false },
            { label: 'AS', field: 'ausS', sortable: false },
          ]
        }
      },
      tdClassFuncConceptoComporNota(fila) {
        if (fila.definitiva >= this.configuracionPlanilla.minBaj && fila.definitiva <= this.configuracionPlanilla.maxBaj) {
          return 'text-danger text-center bg-light'
        } else if (fila.definitiva >= this.configuracionPlanilla.minBas && fila.definitiva <= this.configuracionPlanilla.maxBas) {
          return 'text-primary text-center bg-light'
        } else if (fila.definitiva >= this.configuracionPlanilla.minAlt && fila.definitiva <= this.configuracionPlanilla.maxAlt) {
          return 'text-warning text-center bg-light'
        } else if (fila.definitiva >= this.configuracionPlanilla.minSup && fila.definitiva <= this.configuracionPlanilla.maxSup) {
          return 'text-success text-center bg-light'
        }
        return 'text-secondary text-center bg-light'
      },
      tdClassFuncConceptoComporLetra(fila) {
        if (fila.definitivacompor == this.configuracionPlanilla.compL1) {
          return 'text-danger text-center bg-light'
        } else if (fila.definitivacompor == this.configuracionPlanilla.compL2) {
          return 'text-primary text-center bg-light'
        } else if (fila.definitivacompor == this.configuracionPlanilla.compL3) {
          return 'text-warning text-center bg-light'
        } else if (fila.definitivacompor == this.configuracionPlanilla.compL4) {
          return 'text-success text-center bg-light'
        }
        return 'text-secondary text-center bg-light'
      },
      tdClassFuncDiversa(fila) {
        if (fila.id_diversa == 'S') {
          return 'text-center alert alert-warning'
        }
      },
      async cargarNotasPeriodoComportamiento() {
        this.notasPlanillaCompor = []
        await axios
        .get(CONFIG.ROOT_PATH + 'docente/notas/planillacompor', {params: {idCurso: this.configuracionPlanilla.idCurso, idPeriodo: this.configuracionPlanilla.idPeriodo, idPlanilla: this.configuracionPlanilla.idPlanilla}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Notas periodo Comportamiento')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                if(element.ausJ === undefined) element.ausJ = null
                if(element.ausS === undefined) element.ausS = null
                if(element.definitivacompor === undefined) element.definitivacompor = null
                if(element.definitiva === undefined) element.definitiva = null
                if(element.concepto === undefined) element.concepto = null
                if(element.observaciones === undefined) element.observaciones = null
                element.id_asignatura_curso = this.configuracionPlanilla.idPlanilla
                element.periodo = this.configuracionPlanilla.idPeriodo
              })
              this.notasPlanillaCompor = response.data.datos
              //console.log(JSON.stringify(this.notasPlanillaCompor))
              setTimeout(()=>{
                this.construirPlanillaNotasComportamiento()
                this.btnCargando = false
              },500)
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Notas periodo Comportamiento. Intente más tarde.' + err)
        })
      },
      actualizarItemComporLetra(item) {
        let indice = this.notasPlanillaCompor.findIndex(asigna => asigna.idMatricula === item.idMatricula)
        if (item.definitivacompor == '' || item.definitivacompor == null) {
          this.notasPlanillaCompor[indice].definitivacompor = null
          item.definitivacompor = null
        } else  {
          if (item.definitivacompor == this.configuracionPlanilla.compL1 || item.definitivacompor == this.configuracionPlanilla.compL2 || item.definitivacompor == this.configuracionPlanilla.compL3 || item.definitivacompor == this.configuracionPlanilla.compL4) {
            this.notasPlanillaCompor[indice].definitivacompor = item.definitivacompor
          } else {
            this.notasPlanillaCompor[indice].definitivacompor = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación: ' + item.definitivacompor  + ' no es válida.')
            item.definitivacompor = null
          }
        }
        if (item.definitivacompor == this.configuracionPlanilla.compL1) {
          this.notasPlanillaCompor[indice].concepto = this.configuracionPlanilla.compC1
        } else if (item.definitivacompor == this.configuracionPlanilla.compL2) {
          this.notasPlanillaCompor[indice].concepto = this.configuracionPlanilla.compC2
        } else if (item.definitivacompor == this.configuracionPlanilla.compL3) {
          this.notasPlanillaCompor[indice].concepto = this.configuracionPlanilla.compC3
        } else if (item.definitivacompor == this.configuracionPlanilla.compL4) {
          this.notasPlanillaCompor[indice].concepto = this.configuracionPlanilla.compC4
        } else {
          this.notasPlanillaCompor[indice].concepto = null
        }
      },
      actualizarItemComporNota(item) {
        let indice = this.notasPlanillaCompor.findIndex(asigna => asigna.idMatricula === item.idMatricula)
        if (item.definitiva == '' || item.definitiva == null || item.definitiva == 0) {
          this.notasPlanillaCompor[indice].definitiva = null
          item.definitiva = null
        } else  {
          if (item.definitiva >= this.configuracionPlanilla.minBaj && item.definitiva <= this.configuracionPlanilla.maxSup) {
            this.notasPlanillaCompor[indice].definitiva = item.definitiva
          } else {
            this.notasPlanillaCompor[indice].definitiva = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación (nota): ' + item.definitiva  + ' no es válida.')
            item.definitiva = null
          }
        }
        if (this.notasPlanillaCompor[indice].definitiva >= this.configuracionPlanilla.minBaj && this.notasPlanillaCompor[indice].definitiva < this.configuracionPlanilla.minBas) {
          this.notasPlanillaCompor[indice].concepto = this.configuracionPlanilla.compC1
        } else if (this.notasPlanillaCompor[indice].definitiva >= this.configuracionPlanilla.minBas && this.notasPlanillaCompor[indice].definitiva < this.configuracionPlanilla.minAlt) {
          this.notasPlanillaCompor[indice].concepto = this.configuracionPlanilla.compC2
        } else if (this.notasPlanillaCompor[indice].definitiva >= this.configuracionPlanilla.minAlt && this.notasPlanillaCompor[indice].definitiva < this.configuracionPlanilla.minSup) {
          this.notasPlanillaCompor[indice].concepto = this.configuracionPlanilla.compC3
        } else if (this.notasPlanillaCompor[indice].definitiva >= this.configuracionPlanilla.minSup && this.notasPlanillaCompor[indice].definitiva <= this.configuracionPlanilla.maxSup) {
          this.notasPlanillaCompor[indice].concepto = this.configuracionPlanilla.compC4
        } else {
          this.notasPlanillaCompor[indice].concepto = null
        }
      },
      actualizarItemComporObserv(item) {
        let indice = this.notasPlanillaCompor.findIndex(asigna => asigna.idMatricula === item.idMatricula)
        if (item.observaciones == '' || item.observaciones == null) {
          this.notasPlanillaCompor[indice].observaciones = null
          item.observaciones = null
        } else  {
          this.notasPlanillaCompor[indice].observaciones = item.observaciones
        }
      },
      actualizarFallasCompor(item) {
        let indice = this.notasPlanillaCompor.findIndex(asigna => asigna.idMatricula === item.idMatricula)
        if (item.ausJ == '' || item.ausJ == null) {
          this.notasPlanillaCompor[indice].ausJ = null
        } else  {
          this.notasPlanillaCompor[indice].ausJ = item.ausJ
        }
        if (item.ausS == '' || item.ausS == null) {
          this.notasPlanillaCompor[indice].ausS = null
        } else  {
          this.notasPlanillaCompor[indice].ausS = item.ausS
        }
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
      soloDecimales(e) {
        let key = window.Event ? e.which : e.keyCode
        if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key == 8) || (key == 9) || (key == 37) || (key == 39) || (key == 110) || (key == 189) || (key == 190))) {
            e.preventDefault()
        }
      },
      soloNumeros(e) {
        let key = window.Event ? e.which : e.keyCode
        if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key == 8) || (key == 9) || (key == 37) || (key == 39))) {
            e.preventDefault()
        }
      },
      cambioPlanilla() {
        this.cambioActivo = true
      },
      cancelarFormulario() {
        this.$router.push('/')
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.cargarNotasPeriodoComportamiento()
      //console.log(JSON.stringify(this.configuracionPlanilla))
    }
  }
</script>