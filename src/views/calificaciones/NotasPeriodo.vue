<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> PLANILLA DE CALIFICACIONES POR PERIODO</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="2">
                <b-form-group label="Seleccione el Periodo:" label-for="periodo" class="etiqueta">
                  <b-form-select id="periodo" ref="periodo" v-model="idPeriodo" :options="comboPeriodos" @change="idSede=null,idCurso=null,idAsignatura=null"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idCurso=null,idAsignatura=null,ocuparComboCursosSede()" :disabled="idPeriodo!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Seleccione el Curso:" label-for="cursos" class="etiqueta">
                  <b-form-select  id="cursos" ref="cursos" v-model="idCurso" :options="comboCursosSede" @change="idAsignatura=null,ocuparAsignaturasCurso()" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="Seleccione la Asignatura:" label-for="asig" class="etiqueta">
                  <b-form-select  id="asig" ref="asig" v-model="idAsignatura" :options="comboAsignaturasCurso" @change="consultaListaCurso()" :disabled="idCurso!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <div v-if="idAsignatura!=null">
              <b-row><b-col lg="12"><hr></b-col></b-row>
              <b-row>
                <b-col>
                  <div v-if="btnCargando">
                    <div class="text-center m-5 text-primary">
                      <b-spinner style="width: 3rem; height: 3rem;" label="Spinner"></b-spinner>
                      <br><strong>Cargando planilla...</strong>
                    </div>
                  </div>
                  <div v-else>
                    <b-row v-if="planillita==1 && colEncabezados==1" class="mt-2">
                      <b-col>
                        <vue-good-table ref="table" :columns="encabColumnas" :rows="notasPlanilla" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                          <template slot="table-row" slot-scope="props">
                            <span v-if="props.column.field == 'estudiante'">
                              <span>{{props.row.estudiante}}</span>
                            </span>
                            <span v-if="props.column.field == 'diversa'">
                              <span>{{props.row.diversa}}</span>
                            </span>
                            <span v-if="props.column.field == 'estado'">
                              <span>{{props.row.estado}}</span>
                            </span>
                            <span v-if="props.column.field == 'defC1'">
                              <b-form-input v-model="props.row.defC1" @blur="actualizarItemNota(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'defC1'),soloDecimales($event)" :ref="'defC1-' + props.row.originalIndex"></b-form-input>
                            </span>
                            <span v-if="props.column.field == 'definitiva'">
                              <span><strong>{{props.row.definitiva}}</strong></span>
                            </span>
                            <span v-if="props.column.field == 'concepto'">
                              <span><strong>{{props.row.concepto}}</strong></span>
                            </span>
                            <span v-if="props.column.field == 'ausJ'">
                              <b-form-input v-model="props.row.ausJ" @blur="actualizarFallas(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'ausJ'),soloNumeros($event)" :ref="'ausJ-' + props.row.originalIndex"></b-form-input>
                            </span>
                            <span v-if="props.column.field == 'ausS'">
                              <b-form-input v-model="props.row.ausS" @blur="actualizarFallas(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'ausS'),soloNumeros($event)" :ref="'ausS-' + props.row.originalIndex"></b-form-input>
                            </span>
                          </template>
                          <div slot="emptystate">
                            <h5 class="text-danger ml-5">No existen estudiantes en la planilla</h5>
                          </div>
                        </vue-good-table>
                      </b-col>
                      <b-col lg="12">
                        <b-alert v-if="cambioActivo==true" variant="danger" show><b>Advertencia: </b>La planilla se ha modificado, se recomienda guardar la planilla.</b-alert>
                      </b-col>
                      <b-col v-if="!botonGuardando">
                        <b-button class="small mx-1 mt-4" variant="success" @click="botonGuardando=true,guardarPlanilla()" :disabled="!cambioActivo">Guardar Planilla de Calificaciones</b-button>
                      </b-col>
                      <b-col v-else>
                        <b-button class="mx-1 mt-4" variant="primary" disabled>
                          <b-spinner small type="grow"></b-spinner>
                          Guardando la planilla...
                        </b-button>
                      </b-col>
                    </b-row>
                    <b-row v-if="planillita==1 && colEncabezados==2" class="mt-2">
                      <b-col>
                        <vue-good-table ref="table" :columns="encabColumnas" :rows="notasPlanilla" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                          <template slot="table-row" slot-scope="props">
                            <span v-if="props.column.field == 'estudiante'">
                              <span>{{props.row.estudiante}}</span>
                            </span>
                            <span v-if="props.column.field == 'diversa'">
                              <span>{{props.row.diversa}}</span>
                            </span>
                            <span v-if="props.column.field == 'estado'">
                              <span>{{props.row.estado}}</span>
                            </span>
                            <span v-if="props.column.field == 'defC1'">
                              <b-form-input v-model="props.row.defC1" @blur="actualizarItemNota(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'defC1'),soloDecimales($event)" :ref="'defC1-' + props.row.originalIndex"></b-form-input>
                            </span>
                            <span v-if="props.column.field == 'defC2'">
                              <b-form-input v-model="props.row.defC2" @blur="actualizarItemNota(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'defC2'),soloDecimales($event)" :ref="'defC2-' + props.row.originalIndex"></b-form-input>
                            </span>
                            <span v-if="props.column.field == 'definitiva'">
                              <span><strong>{{props.row.definitiva}}</strong></span>
                            </span>
                            <span v-if="props.column.field == 'concepto'">
                              <span><strong>{{props.row.concepto}}</strong></span>
                            </span>
                            <span v-if="props.column.field == 'ausJ'">
                              <b-form-input v-model="props.row.ausJ" @blur="actualizarFallas(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'ausJ'),soloNumeros($event)" :ref="'ausJ-' + props.row.originalIndex"></b-form-input>
                            </span>
                            <span v-if="props.column.field == 'ausS'">
                              <b-form-input v-model="props.row.ausS" @blur="actualizarFallas(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'ausS'),soloNumeros($event)" :ref="'ausS-' + props.row.originalIndex"></b-form-input>
                            </span>
                          </template>
                          <div slot="emptystate">
                            <h5 class="text-danger ml-5">No existen estudiantes en la planilla</h5>
                          </div>
                        </vue-good-table>
                      </b-col>
                      <b-col lg="12">
                        <b-alert v-if="cambioActivo==true" variant="danger" show><b>Advertencia: </b>La planilla se ha modificado, se recomienda guardar la planilla.</b-alert>
                      </b-col>
                      <b-col v-if="!botonGuardando">
                        <b-button class="small mx-1 mt-4" variant="success" @click="botonGuardando=true,guardarPlanilla()" :disabled="!cambioActivo">Guardar Planilla de Calificaciones</b-button>
                      </b-col>
                      <b-col v-else>
                        <b-button class="mx-1 mt-4" variant="primary" disabled>
                          <b-spinner small type="grow"></b-spinner>
                          Guardando la planilla...
                        </b-button>
                      </b-col>
                    </b-row>
                    <b-row v-if="planillita==1 && colEncabezados==3" class="mt-2">
                      <b-col>
                        <vue-good-table ref="table" :columns="encabColumnas" :rows="notasPlanilla" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                          <template slot="table-row" slot-scope="props">
                            <span v-if="props.column.field == 'estudiante'">
                              <span>{{props.row.estudiante}}</span>
                            </span>
                            <span v-if="props.column.field == 'diversa'">
                              <span>{{props.row.diversa}}</span>
                            </span>
                            <span v-if="props.column.field == 'estado'">
                              <span>{{props.row.estado}}</span>
                            </span>
                            <span v-if="props.column.field == 'defC1'">
                              <b-form-input v-model="props.row.defC1" @blur="actualizarItemNota(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'defC1'),soloDecimales($event)" :ref="'defC1-' + props.row.originalIndex"></b-form-input>
                            </span>
                            <span v-if="props.column.field == 'defC2'">
                              <b-form-input v-model="props.row.defC2" @blur="actualizarItemNota(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'defC2'),soloDecimales($event)" :ref="'defC2-' + props.row.originalIndex"></b-form-input>
                            </span>
                            <span v-if="props.column.field == 'defC3'">
                              <b-form-input v-model="props.row.defC3" @blur="actualizarItemNota(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'defC3'),soloDecimales($event)" :ref="'defC3-' + props.row.originalIndex"></b-form-input>
                            </span>
                            <span v-if="props.column.field == 'definitiva'">
                              <span><strong>{{props.row.definitiva}}</strong></span>
                            </span>
                            <span v-if="props.column.field == 'concepto'">
                              <span><strong>{{props.row.concepto}}</strong></span>
                            </span>
                            <span v-if="props.column.field == 'ausJ'">
                              <b-form-input v-model="props.row.ausJ" @blur="actualizarFallas(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'ausJ'),soloNumeros($event)" :ref="'ausJ-' + props.row.originalIndex"></b-form-input>
                            </span>
                            <span v-if="props.column.field == 'ausS'">
                              <b-form-input v-model="props.row.ausS" @blur="actualizarFallas(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'ausS'),soloNumeros($event)" :ref="'ausS-' + props.row.originalIndex"></b-form-input>
                            </span>
                          </template>
                          <div slot="emptystate">
                            <h5 class="text-danger ml-5">No existen estudiantes en la planilla</h5>
                          </div>
                        </vue-good-table>
                      </b-col>
                      <b-col lg="12">
                        <b-alert v-if="cambioActivo==true" variant="danger" show><b>Advertencia: </b>La planilla se ha modificado, se recomienda guardar la planilla.</b-alert>
                      </b-col>
                      <b-col v-if="!botonGuardando">
                        <b-button class="small mx-1 mt-4" variant="success" @click="botonGuardando=true,guardarPlanilla()" :disabled="!cambioActivo">Guardar Planilla de Calificaciones</b-button>
                      </b-col>
                      <b-col v-else>
                        <b-button class="mx-1 mt-4" variant="primary" disabled>
                          <b-spinner small type="grow"></b-spinner>
                          Guardando la planilla...
                        </b-button>
                      </b-col>
                    </b-row>
                    <b-row v-if="planillita == 5" class="mt-2">
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
                      <b-col lg="12">
                        <b-alert v-if="cambioActivo==true" variant="danger" show><b>Advertencia: </b>La planilla se ha modificado, se recomienda guardar la planilla.</b-alert>
                      </b-col>
                      <b-col v-if="!botonGuardando">
                        <b-button class="small mx-1 mt-4" variant="success" @click="botonGuardando=true,guardarPlanillaComportamiento()" :disabled="!cambioActivo">Guardar Planilla de Calificaciones</b-button>
                      </b-col>
                      <b-col v-else>
                        <b-button class="mx-1 mt-4" variant="primary" disabled>
                          <b-spinner small type="grow"></b-spinner>
                          Guardando la planilla...
                        </b-button>
                      </b-col>
                    </b-row>
                    <b-row v-if="planillita == 2" class="mt-2">
                      <b-col lg="12">
                        <vue-good-table ref="table" :columns="encabColumnas" :rows="notasPlanillaPree" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                          <template slot="table-row" slot-scope="props">
                            <span v-if="props.column.field == 'estudiante'">
                              <span><strong>{{props.row.estudiante}}</strong></span>
                            </span>
                            <span v-if="props.column.field == 'definitivapree'">
                              <b-form-input v-model="props.row.definitivapree" @blur="actualizarItemPreeLetra(props.row)" @change="cambioPlanilla" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'definitivapree')" autocomplete="off" maxlength="1" :ref="'definitivapree-' + props.row.originalIndex"></b-form-input>
                            </span>
                            <span v-if="props.column.field == 'diversa'">
                              <span><strong>{{props.row.diversa}}</strong></span>
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
                          <div slot="emptystate">
                            <h5 class="text-danger ml-5">No existen estudiantes en la planilla</h5>
                          </div>
                        </vue-good-table>
                      </b-col>
                      <b-col lg="12">
                        <b-alert v-if="cambioActivo==true" variant="danger" show><b>Advertencia: </b>La planilla se ha modificado, se recomienda guardar la planilla.</b-alert>
                      </b-col>
                      <b-col v-if="!botonGuardando">
                        <b-button class="small mx-1 mt-4" variant="success" @click="botonGuardando=true,guardarPlanillaPreescolar()" :disabled="!cambioActivo">Guardar Planilla de Calificaciones</b-button>
                      </b-col>
                      <b-col v-else>
                        <b-button class="mx-1 mt-4" variant="primary" disabled>
                          <b-spinner small type="grow"></b-spinner>
                          Guardando la planilla...
                        </b-button>
                      </b-col>
                    </b-row>
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-card-text>
          <template #footer>
            <em>Actualización de Calificaciones por Periodo.</em>
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
    name: 'notasperiodo',
    components: {
      VueGoodTable,
    },
    data () {
      return {
        idPeriodo: null,
        comboPeriodos: [],
        idSede: null,
        comboSedes: [],
        idCurso: null,
        comboCursosSede: [],
        idAsignatura: null,
        comboAsignaturasCurso: [],
        listaAsignaturasCurso: [],
        planillita: 0,
        configuracionPlanilla: {},
        btnCargando: false,
        cambioActivo: false,
        notasPlanilla: [],
        notasPlanillaCompor: [],
        notasPlanillaPree: [],
        botonGuardando: false,
        colEncabezados: null,
      }
    },
    methods: {
      async guardarPlanillaPreescolar() {
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/notas/planillapree', JSON.stringify(this.notasPlanillaPree), { headers: {"Content-Type": "application/json; charset=utf-8" }})
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
      async guardarPlanillaComportamiento() {
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/notas/planillacompor', JSON.stringify(this.notasPlanillaCompor), { headers: {"Content-Type": "application/json; charset=utf-8" }})
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
      async guardarPlanilla() {
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/notas/planilla', JSON.stringify(this.notasPlanilla), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Planilla')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'La planilla parcial de evaluaciones se ha guardado satisfactoriamente.')
            this.botonGuardando = false
            this.cambioActivo = false
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Planilla. Intente más tarde. ' + err)
        })
      },
      actualizarItemNota(item) {
        let notaMinima = 0
        let notaMaxima = 99
        if (this.configuracionPlanilla.id_tipo == 1) {
          notaMinima = this.configuracionPlanilla.minBaj
          notaMaxima = this.configuracionPlanilla.maxSup
        } else if (this.configuracionPlanilla.id_tipo == 2) {
          notaMinima = this.configuracionPlanilla.minBajT
          notaMaxima = this.configuracionPlanilla.maxSupT
        }
        let indice = this.notasPlanilla.findIndex(asigna => asigna.idMatricula === item.idMatricula)
        if (item.defC1 == '' || item.defC1 == null || item.defC1 == 0) {
          this.notasPlanilla[indice].defC1 = null
          item.defC1 = null
        } else  {
          if (item.defC1 >= notaMinima && item.defC1 <= notaMaxima) {
            this.notasPlanilla[indice].defC1 = item.defC1
          } else {
            this.notasPlanilla[indice].defC1 = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación (nota): ' + item.defC1  + ' no es válida.')
            item.defC1 = null
          }
        }
        if (item.defC2 == '' || item.defC2 == null || item.defC2 == 0) {
          this.notasPlanilla[indice].defC2 = null
          item.defC2 = null
        } else  {
          if (item.defC2 >= notaMinima && item.defC2 <= notaMaxima) {
            this.notasPlanilla[indice].defC2 = item.defC2
          } else {
            this.notasPlanilla[indice].defC2 = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación (nota): ' + item.defC2  + ' no es válida.')
            item.defC2 = null
          }
        }
        if (item.defC3 == '' || item.defC3 == null || item.defC3 == 0) {
          this.notasPlanilla[indice].defC3 = null
          item.defC3 = null
        } else  {
          if (item.defC3 >= notaMinima && item.defC3 <= notaMaxima) {
            this.notasPlanilla[indice].defC3 = item.defC3
          } else {
            this.notasPlanilla[indice].defC3 = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación (nota): ' + item.defC3  + ' no es válida.')
            item.defC3 = null
          }
        }
        if (this.colEncabezados == 1) {
          this.notasPlanilla[indice].definitiva = item.defC1
        }
        if (this.colEncabezados == 2) {
          this.notasPlanilla[indice].definitiva = this.redondear(Number(Number(this.notasPlanilla[indice].defC1) * this.configuracionPlanilla.porcentajeC1 / 100) + Number(Number(this.notasPlanilla[indice].defC2) * this.configuracionPlanilla.porcentajeC2 / 100))
        }
        if (this.colEncabezados == 3) {
          this.notasPlanilla[indice].definitiva = this.redondear(Number(Number(this.notasPlanilla[indice].defC1) * this.configuracionPlanilla.porcentajeC1 / 100) + Number(Number(this.notasPlanilla[indice].defC2) * this.configuracionPlanilla.porcentajeC2 / 100) + Number(Number(this.notasPlanilla[indice].defC3) * this.configuracionPlanilla.porcentajeC3 / 100))
        }
        if (this.configuracionPlanilla.id_tipo == 1) {
          if (this.notasPlanilla[indice].definitiva >= this.configuracionPlanilla.minBaj && this.notasPlanilla[indice].definitiva < this.configuracionPlanilla.minBas) {
            this.notasPlanilla[indice].concepto = 'BAJO'
          } else if (this.notasPlanilla[indice].definitiva >= this.configuracionPlanilla.minBas && this.notasPlanilla[indice].definitiva < this.configuracionPlanilla.minAlt) {
            this.notasPlanilla[indice].concepto = 'BASICO'
          } else if (this.notasPlanilla[indice].definitiva >= this.configuracionPlanilla.minAlt && this.notasPlanilla[indice].definitiva < this.configuracionPlanilla.minSup) {
            this.notasPlanilla[indice].concepto = 'ALTO'
          } else if (this.notasPlanilla[indice].definitiva >= this.configuracionPlanilla.minSup && this.notasPlanilla[indice].definitiva <= this.configuracionPlanilla.maxSup) {
            this.notasPlanilla[indice].concepto = 'SUPERIOR'
          } else {
            this.notasPlanilla[indice].concepto = null
          }
        } else if (this.configuracionPlanilla.id_tipo == 2) {
          if (this.notasPlanilla[indice].definitiva >= this.configuracionPlanilla.minBajT && this.notasPlanilla[indice].definitiva < this.configuracionPlanilla.minBasT) {
            this.notasPlanilla[indice].concepto = 'BAJO'
          } else if (this.notasPlanilla[indice].definitiva >= this.configuracionPlanilla.minBasT && this.notasPlanilla[indice].definitiva < this.configuracionPlanilla.minAltT) {
            this.notasPlanilla[indice].concepto = 'BASICO'
          } else if (this.notasPlanilla[indice].definitiva >= this.configuracionPlanilla.minAltT && this.notasPlanilla[indice].definitiva < this.configuracionPlanilla.minSupT) {
            this.notasPlanilla[indice].concepto = 'ALTO'
          } else if (this.notasPlanilla[indice].definitiva >= this.configuracionPlanilla.minSupT && this.notasPlanilla[indice].definitiva <= this.configuracionPlanilla.maxSupT) {
            this.notasPlanilla[indice].concepto = 'SUPERIOR'
          } else {
            this.notasPlanilla[indice].concepto = null
          }
        }
      },
      redondear(num) {
        var m = Number((Math.abs(num) * 10).toPrecision(15))
        return Math.round(m) / 10 * Math.sign(num);
      },
      tdClassFuncConcepto(fila) {
        if (this.configuracionPlanilla.id_tipo == 1) {
          if (fila.definitiva >= this.configuracionPlanilla.minBaj && fila.definitiva <= this.configuracionPlanilla.maxBaj) {
            return 'text-danger text-center bg-secondary'
          } else if (fila.definitiva >= this.configuracionPlanilla.minBas && fila.definitiva <= this.configuracionPlanilla.maxBas) {
            return 'text-primary text-center bg-secondary'
          } else if (fila.definitiva >= this.configuracionPlanilla.minAlt && fila.definitiva <= this.configuracionPlanilla.maxAlt) {
            return 'text-warning text-center bg-secondary'
          } else if (fila.definitiva >= this.configuracionPlanilla.minSup && fila.definitiva <= this.configuracionPlanilla.maxSup) {
            return 'text-success text-center bg-secondary'
          }
          return 'text-secondary text-center bg-secondary'
        } else if (this.configuracionPlanilla.id_tipo == 2) {
          if (fila.definitiva >= this.configuracionPlanilla.minBajT && fila.definitiva <= this.configuracionPlanilla.maxBajT) {
            return 'text-danger text-center bg-secondary'
          } else if (fila.definitiva >= this.configuracionPlanilla.minBasT && fila.definitiva <= this.configuracionPlanilla.maxBasT) {
            return 'text-primary text-center bg-secondary'
          } else if (fila.definitiva >= this.configuracionPlanilla.minAltT && fila.definitiva <= this.configuracionPlanilla.maxAltT) {
            return 'text-warning text-center bg-secondary'
          } else if (fila.definitiva >= this.configuracionPlanilla.minSupT && fila.definitiva <= this.configuracionPlanilla.maxSupT) {
            return 'text-success text-center bg-secondary'
          }
          return 'text-secondary text-center bg-secondary'
        }
      },
      actualizarFallas(item) {
        let indice = this.notasPlanilla.findIndex(asigna => asigna.idMatricula === item.idMatricula)
        if (item.ausJ == '' || item.ausJ == null) {
          this.notasPlanilla[indice].ausJ = null
        } else  {
          this.notasPlanilla[indice].ausJ = item.ausJ
        }
        if (item.ausS == '' || item.ausS == null) {
          this.notasPlanilla[indice].ausS = null
        } else  {
          this.notasPlanilla[indice].ausS = item.ausS
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
      consultaListaCurso() {
        this.btnCargando = true
        this.planillita = 0
        let orden = 0
        let nivel = 0
        this.configuracionPlanilla = {}
        this.listaAsignaturasCurso.forEach(element => {
          if (element.idAsignaturaCurso == this.idAsignatura) {
            orden = element.orden
            nivel = element.id_nivel
            this.configuracionPlanilla = element
          }
        })
        //console.log(JSON.stringify(this.configuracionPlanilla))
        if (orden == 99) {
          this.planillita = 5
          this.cargarNotasPeriodoComportamiento()
        } else {
          if (nivel > 1 && nivel < 7) {
            this.planillita = 1
            this.cargarNotasPeriodo()
          } else if (nivel == 1) {
            this.planillita = 2
            this.cargarNotasPeriodoPrees()
          } else {
            this.mensajeEmergente('info',CONFIG.TITULO_MSG,'Lo sentimos, debe seleccionar una asignatura para consultar las valoraciones.')
          }
        }
      },
      async cargarNotasPeriodoPrees() {
        this.notasPlanillaPree = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/notas/planillapree', {params: {idCurso: this.idCurso, idPeriodo: this.idPeriodo, idPlanilla: this.idAsignatura}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Notas periodo preescolar')
            this.btnCargando = false
            this.cambioActivo = false
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                element.id_asignatura_curso = this.idAsignatura
                element.periodo = this.idPeriodo
              })
              this.notasPlanillaPree = response.data.datos
              //console.log(JSON.stringify(this.notasPlanillaCompor))
              setTimeout(()=>{
                this.construirPlanillaNotasPree()
                this.btnCargando = false
                this.cambioActivo = false
              },500)
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Notas periodo preescolar. Intente más tarde.' + err)
          this.btnCargando = false
          this.cambioActivo = false
        })
      },
      async cargarNotasPeriodoComportamiento() {
        this.notasPlanillaCompor = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/notas/planillacompor', {params: {idCurso: this.idCurso, idPeriodo: this.idPeriodo, idPlanilla: this.idAsignatura}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Notas periodo')
            this.btnCargando = false
            this.cambioActivo = false
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                element.id_asignatura_curso = this.idAsignatura
                element.periodo = this.idPeriodo
              })
              this.notasPlanillaCompor = response.data.datos
              //console.log(JSON.stringify(this.notasPlanillaCompor))
              setTimeout(()=>{
                this.construirPlanillaNotasComportamiento()
                this.btnCargando = false
                this.cambioActivo = false
              },500)
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Notas periodo. Intente más tarde.' + err)
          this.btnCargando = false
          this.cambioActivo = false
        })
      },
      async cargarNotasPeriodo() {
        this.notasPlanilla = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/notas/planilla', {params: {idCurso: this.idCurso, idPeriodo: this.idPeriodo, idPlanilla: this.idAsignatura, idTipoEsp: this.configuracionPlanilla.id_tipo, idEspecialidad: this.configuracionPlanilla.id_especialidad}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Notas periodo')
            this.btnCargando = false
            this.cambioActivo = false
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                element.id_asignatura_curso = this.idAsignatura
                element.periodo = this.idPeriodo
              })
              this.notasPlanilla = response.data.datos
              //console.log(JSON.stringify(this.notasPlanilla))
              setTimeout(()=>{
                this.construirPlanillaNotas()
                this.btnCargando = false
                this.cambioActivo = false
              },5)
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Notas periodo. Intente más tarde.' + err)
          this.btnCargando = false
          this.cambioActivo = false
        })
      },
      async construirPlanillaNotas() {
        if (this.planillita == 1) {
          if (this.configuracionPlanilla.estadoC1 == 1 && this.configuracionPlanilla.estadoC2 == 0 && this.configuracionPlanilla.estadoC3 == 0) {
            this.colEncabezados = 1
            this.encabColumnas = [
              { label: 'Apellidos y Nombres Estudiante', width: '30%', field: 'estudiante', sortable: false },
              { label: '', field: 'diversa', sortable: false, tdClass: this.tdClassFuncDiversa },
              { label: 'Estado', field: 'estado', sortable: false, tdClass: this.tdClassFuncE },
              { label: this.configuracionPlanilla.nombreC1+'\n'+this.configuracionPlanilla.porcentajeC1+'%', field: 'defC1', sortable: false },
              { label: 'Definitiva', field: 'definitiva', sortable: false },
              { label: 'Concepto', field: 'concepto', sortable: false, tdClass: this.tdClassFuncConcepto },
              { label: 'AJ', field: 'ausJ', sortable: false, tooltip: 'Ausencias Justificadas' },
              { label: 'AS', field: 'ausS', sortable: false, tooltip: 'Ausencias Sin Justificar' },
            ]
          } else if (this.configuracionPlanilla.estadoC1 == 1 && this.configuracionPlanilla.estadoC2 == 1 && this.configuracionPlanilla.estadoC3 == 0) {
            this.colEncabezados = 2
            this.encabColumnas = [
              { label: 'Apellidos y Nombres Estudiante', width: '30%', field: 'estudiante', sortable: false },
              { label: '', field: 'diversa', sortable: false, tdClass: this.tdClassFuncDiversa },
              { label: 'Estado', field: 'estado', sortable: false, tdClass: this.tdClassFuncE },
              { label: this.configuracionPlanilla.nombreC1+'\n'+this.configuracionPlanilla.porcentajeC1+'%', field: 'defC1', sortable: false },
              { label: this.configuracionPlanilla.nombreC2+'\n'+this.configuracionPlanilla.porcentajeC2+'%', field: 'defC2', sortable: false },
              { label: 'Definitiva', field: 'definitiva', sortable: false },
              { label: 'Concepto', field: 'concepto', sortable: false, tdClass: this.tdClassFuncConcepto },
              { label: 'AJ', field: 'ausJ', sortable: false, tooltip: 'Ausencias Justificadas' },
              { label: 'AS', field: 'ausS', sortable: false, tooltip: 'Ausencias Sin Justificar' },
            ]
          } else if (this.configuracionPlanilla.estadoC1 == 1 && this.configuracionPlanilla.estadoC2 == 1 && this.configuracionPlanilla.estadoC3 == 1) {
            this.colEncabezados = 3
            this.encabColumnas = [
              { label: 'Apellidos y Nombres Estudiante', width: '30%', field: 'estudiante', sortable: false },
              { label: '', field: 'diversa', sortable: false, tdClass: this.tdClassFuncDiversa },
              { label: 'Estado', field: 'estado', sortable: false, tdClass: this.tdClassFuncE },
              { label: this.configuracionPlanilla.nombreC1+'\n'+this.configuracionPlanilla.porcentajeC1+'%', field: 'defC1', sortable: false },
              { label: this.configuracionPlanilla.nombreC2+'\n'+this.configuracionPlanilla.porcentajeC2+'%', field: 'defC2', sortable: false },
              { label: this.configuracionPlanilla.nombreC3+'\n'+this.configuracionPlanilla.porcentajeC3+'%', field: 'defC3', sortable: false },
              { label: 'Definitiva', field: 'definitiva', sortable: false },
              { label: 'Concepto', field: 'concepto', sortable: false, tdClass: this.tdClassFuncConcepto },
              { label: 'AJ', field: 'ausJ', sortable: false, tooltip: 'Ausencias Justificadas' },
              { label: 'AS', field: 'ausS', sortable: false, tooltip: 'Ausencias Sin Justificar' },
            ]
          }
        } else if (this.planillita == 5) {
          this.encabColumnas = [
            { label: 'Apellidos y Nombres Estudiante', width: '30%', field: 'estudiante', sortable: false },
            { label: '', field: 'diversa', sortable: false, tdClass: this.tdClassFuncDiversa },
            { label: 'Estado', field: 'id_estado_actual', sortable: false, tdClass: this.tdClassFuncE },
            { label: 'Definitiva', field: 'definitivacompor', sortable: false },
            { label: 'Concepto', field: 'concepto', sortable: false, tdClass: this.tdClassFuncConcepto },
            { label: 'AJ', field: 'ausJ', sortable: false, tooltip: 'Ausencias Justificadas' },
            { label: 'AS', field: 'ausS', sortable: false, tooltip: 'Ausencias Sin Justificar' },
          ]
        }
      },
      construirPlanillaNotasComportamiento() {
        if (this.configuracionPlanilla.tipoValComp == 0) {
          this.encabColumnas = [
            { label: 'Apellidos y Nombres Estudiante', width: '30%', field: 'estudiante', sortable: false },
            { label: '', field: 'diversa', sortable: false, tdClass: this.tdClassFuncDiversa },
            { label: 'Definitiva', field: 'definitivacompor', sortable: false },
            { label: 'Concepto', field: 'concepto', sortable: false, tdClass: this.tdClassFuncConceptoComporLetra },
            { label: 'AJ', field: 'ausJ', sortable: false, tooltip: 'Ausencias Justificadas' },
            { label: 'AS', field: 'ausS', sortable: false, tooltip: 'Ausencias Sin Justificar' },
          ]
        } else {
          this.encabColumnas = [
            { label: 'Apellidos y Nombres Estudiante', width: '30%', field: 'estudiante', sortable: false },
            { label: '', field: 'diversa', sortable: false, tdClass: this.tdClassFuncDiversa },
            { label: 'Definitiva', field: 'definitiva', sortable: false },
            { label: 'Concepto', field: 'concepto', sortable: false, tdClass: this.tdClassFuncConceptoComporNota },
            { label: 'AJ', field: 'ausJ', sortable: false, tooltip: 'Ausencias Justificadas' },
            { label: 'AS', field: 'ausS', sortable: false, tooltip: 'Ausencias Sin Justificar' },
          ]
        }
      },
      construirPlanillaNotasPree() {
        this.encabColumnas = [
          { label: 'Apellidos y Nombres Estudiante', width: '30%', field: 'estudiante', sortable: false },
          { label: '', field: 'diversa', sortable: false, tdClass: this.tdClassFuncDiversa },
          { label: 'Definitiva', field: 'definitivapree', sortable: false },
          { label: 'Concepto', field: 'concepto', sortable: false, tdClass: this.tdClassFuncConceptoPreeLetra },
          { label: 'AJ', field: 'ausJ', sortable: false, tooltip: 'Ausencias Justificadas' },
          { label: 'AS', field: 'ausS', sortable: false, tooltip: 'Ausencias Sin Justificar' },
        ]
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
      actualizarItemPreeLetra(item) {
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
      tdClassFuncConceptoPreeLetra(fila) {
        if (fila.definitivapree == this.configuracionPlanilla.preeL1) {
          return 'text-danger text-center bg-light'
        } else if (fila.definitivapree == this.configuracionPlanilla.preeL2) {
          return 'text-primary text-center bg-light'
        } else if (fila.definitivapree == this.configuracionPlanilla.preeL3) {
          return 'text-warning text-center bg-light'
        } else if (fila.definitivapree == this.configuracionPlanilla.preeL4) {
          return 'text-success text-center bg-light'
        }
        return 'text-secondary text-center bg-light'
      },
      async ocuparAsignaturasCurso() {
        this.comboAsignaturasCurso = []
        this.listaAsignaturasCurso = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/asignacioncurso', {params: {idCurso: this.idCurso, idInstitucion: this.$store.state.idInstitucion}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista asignaturas curso')
          } else{
            if (response.data.datos != 0) {
              this.listaAsignaturasCurso = response.data.datos
              this.listaAsignaturasCurso.forEach(element => {
                this.comboAsignaturasCurso.push({ 'value': element.idAsignaturaCurso, 'text': element.asignatura.toUpperCase() })
              })
            }
          }
          //console.log(JSON.stringify(this.listaAsignaturasCurso))
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista asignación docentes curso. Intente más tarde.' + err)
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
      async ocuparComboPeriodos() {
        this.comboPeriodos = []
        this.$store.state.datosTablas.periodos.forEach(element => {
          this.comboPeriodos.push({ 'value': element.id, 'text': element.periodo.toUpperCase() })
        })
      },
      tdClassFuncE(row) {
        if (row.id_estado_actual == 1) { 
          return 'text-success' 
        } else if (row.id_estado_actual == 2) { 
          return 'text-danger' 
        } else if (row.id_estado_actual == 3) { 
          return 'text-warning' 
        } else if (row.id_estado_actual == 4) { 
          return 'text-info' 
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
      soloNumeros(e) {
        let key = window.Event ? e.which : e.keyCode
        if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key == 8) || (key == 9) || (key == 37) || (key == 39))) {
            e.preventDefault()
        }
      },
      soloDecimales(e) {
        let key = window.Event ? e.which : e.keyCode
        if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key == 8) || (key == 9) || (key == 37) || (key == 39) || (key == 110) || (key == 189) || (key == 190))) {
            e.preventDefault()
        }
      },
      tdClassFuncDiversa(fila) {
        if (fila.id_diversa == 'S') {
          return 'text-center alert alert-warning'
        }
      },
      cambioPlanilla() {
        this.cambioActivo = true
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      if(this.$store.state.idRol == 1 || this.$store.state.idRol == 12 || this.$store.state.perActNotas == 1) {
        this.ocuparComboPeriodos()
        this.ocuparComboSedes()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>