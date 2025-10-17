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
        <b-row>
          <b-col lg="12">
            <b-button class="float-right" variant="outline-info" @click="seleccionarColumnaPegarExcel()" >Pegar valoraciones<br>desde Excel</b-button>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col lg="12">
            <b-alert v-if="cambioActivo==true" variant="danger" show><b>Advertencia: </b>La planilla se ha modificado, se recomienda guardar la planilla.</b-alert>
          </b-col>
        </b-row>
      </div>
      <b-row v-if="planillita == 1" class="mt-2">
        <b-col>
          <vue-good-table ref="table" :columns="encabColumnas" :rows="notasPlanilla" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'estudiante'">
                <span>{{props.row.estudiante}}</span>
              </span>
              <span v-if="props.column.field == 'diversa'">
                <span>{{props.row.diversa}}</span>
              </span>
              <span v-if="props.column.field == 'n1C1'">
                <b-form-input v-model="props.row.n1C1" @blur="actualizarItemC1(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n1C1'),soloDecimales($event)" :ref="'n1C1-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'n2C1'">
                <b-form-input v-model="props.row.n2C1" @blur="actualizarItemC1(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n2C1'),soloDecimales($event)" :ref="'n2C1-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'n3C1'">
                <b-form-input v-model="props.row.n3C1" @blur="actualizarItemC1(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n3C1'),soloDecimales($event)" :ref="'n3C1-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'n4C1'">
                <b-form-input v-model="props.row.n4C1" @blur="actualizarItemC1(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n4C1'),soloDecimales($event)" :ref="'n4C1-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'n5C1'">
                <b-form-input v-model="props.row.n5C1" @blur="actualizarItemC1(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n5C1'),soloDecimales($event)" :ref="'n5C1-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'definitiva'">
                <span><strong>{{Number(props.row.definitiva) > 0 ? Number(props.row.definitiva).toFixed(1) : null}}</strong></span>
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
      </b-row>
      <b-row v-else-if="planillita == 2">
        <b-col>
          <vue-good-table ref="notas1" :columns="encabColumnas" :rows="notasPlanilla" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'estudiante'">
                <span>{{props.row.estudiante}}</span>
              </span>
              <span v-if="props.column.field == 'diversa'">
                <span>{{props.row.diversa}}</span>
              </span>
              <span v-if="props.column.field == 'n1C1'">
                <b-form-input v-model="props.row.n1C1" @blur="actualizarItemC1(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n1C1'),soloDecimales($event)" :ref="'n1C1-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'n2C1'">
                <b-form-input v-model="props.row.n2C1" @blur="actualizarItemC1(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n2C1'),soloDecimales($event)" :ref="'n2C1-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'n3C1'">
                <b-form-input v-model="props.row.n3C1" @blur="actualizarItemC1(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n3C1'),soloDecimales($event)" :ref="'n3C1-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'n4C1'">
                <b-form-input v-model="props.row.n4C1" @blur="actualizarItemC1(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n4C1'),soloDecimales($event)" :ref="'n4C1-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'n5C1'">
                <b-form-input v-model="props.row.n5C1" @blur="actualizarItemC1(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n5C1'),soloDecimales($event)" :ref="'n5C1-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'defC1'">
                <span><strong>{{Number(props.row.defC1) > 0 ? Number(props.row.defC1).toFixed(1) : null}}</strong></span>
              </span>
              <span v-if="props.column.field == 'n1C2'">
                <b-form-input v-model="props.row.n1C2" @blur="actualizarItemC2(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n1C2'),soloDecimales($event)" :ref="'n1C2-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'n2C2'">
                <b-form-input v-model="props.row.n2C2" @blur="actualizarItemC2(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n2C2'),soloDecimales($event)" :ref="'n2C2-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'n3C2'">
                <b-form-input v-model="props.row.n3C2" @blur="actualizarItemC2(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n3C2'),soloDecimales($event)" :ref="'n3C2-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'n4C2'">
                <b-form-input v-model="props.row.n4C2" @blur="actualizarItemC2(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n4C2'),soloDecimales($event)" :ref="'n4C2-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'n5C2'">
                <b-form-input v-model="props.row.n5C2" @blur="actualizarItemC2(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n5C2'),soloDecimales($event)" :ref="'n5C2-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'defC2'">
                <span><strong>{{Number(props.row.defC2) > 0 ? Number(props.row.defC2).toFixed(1) : null}}</strong></span>
              </span>
              <span v-if="props.column.field == 'definitiva'">
                <span><strong>{{Number(props.row.definitiva) > 0 ? Number(props.row.definitiva).toFixed(1) : null}}</strong></span>
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
      </b-row>
      <b-row v-else-if="planillita == 3">
        <b-col>
          <vue-good-table ref="notas1" :columns="encabColumnas" :rows="notasPlanilla" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'estudiante'">
                <span>{{props.row.estudiante}}</span>
              </span>
              <span v-if="props.column.field == 'diversa'">
                <span>{{props.row.diversa}}</span>
              </span>
              <span v-if="props.column.field == 'n1C1'">
                <b-form-input v-model="props.row.n1C1" @blur="actualizarItemC1(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n1C1'),soloDecimales($event)" :ref="'n1C1-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'n2C1'">
                <b-form-input v-model="props.row.n2C1" @blur="actualizarItemC1(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n2C1'),soloDecimales($event)" :ref="'n2C1-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'n3C1'">
                <b-form-input v-model="props.row.n3C1" @blur="actualizarItemC1(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n3C1'),soloDecimales($event)" :ref="'n3C1-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'n4C1'">
                <b-form-input v-model="props.row.n4C1" @blur="actualizarItemC1(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n4C1'),soloDecimales($event)" :ref="'n4C1-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'n5C1'">
                <b-form-input v-model="props.row.n5C1" @blur="actualizarItemC1(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n5C1'),soloDecimales($event)" :ref="'n5C1-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'defC1'">
                <span><strong>{{Number(props.row.defC1) > 0 ? Number(props.row.defC1).toFixed(1) : null}}</strong></span>
              </span>
              <span v-if="props.column.field == 'n1C2'">
                <b-form-input v-model="props.row.n1C2" @blur="actualizarItemC2(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n1C2'),soloDecimales($event)" :ref="'n1C2-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'n2C2'">
                <b-form-input v-model="props.row.n2C2" @blur="actualizarItemC2(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n2C2'),soloDecimales($event)" :ref="'n2C2-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'n3C2'">
                <b-form-input v-model="props.row.n3C2" @blur="actualizarItemC2(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n3C2'),soloDecimales($event)" :ref="'n3C2-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'n4C2'">
                <b-form-input v-model="props.row.n4C2" @blur="actualizarItemC2(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n4C2'),soloDecimales($event)" :ref="'n4C2-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'n5C2'">
                <b-form-input v-model="props.row.n5C2" @blur="actualizarItemC2(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n5C2'),soloDecimales($event)" :ref="'n5C2-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'defC2'">
                <span><strong>{{Number(props.row.defC2) > 0 ? Number(props.row.defC2).toFixed(1) : null}}</strong></span>
              </span>
              <span v-if="props.column.field == 'n1C3'">
                <b-form-input v-model="props.row.n1C3" @blur="actualizarItemC3(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n1C3'),soloDecimales($event)" :ref="'n1C3-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'n2C3'">
                <b-form-input v-model="props.row.n2C3" @blur="actualizarItemC3(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n2C3'),soloDecimales($event)" :ref="'n2C3-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'n3C3'">
                <b-form-input v-model="props.row.n3C3" @blur="actualizarItemC3(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n3C3'),soloDecimales($event)" :ref="'n3C3-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'n4C3'">
                <b-form-input v-model="props.row.n4C3" @blur="actualizarItemC3(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n4C3'),soloDecimales($event)" :ref="'n4C3-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'n5C3'">
                <b-form-input v-model="props.row.n5C3" @blur="actualizarItemC3(props.row)" @change="cambioPlanilla" autocomplete="off" maxlength="3" @keydown="handleKeyNavigation($event, props.row.originalIndex, 'n5C3'),soloDecimales($event)" :ref="'n5C3-' + props.row.originalIndex"></b-form-input>
              </span>
              <span v-if="props.column.field == 'defC3'">
                <span><strong>{{Number(props.row.defC3) > 0 ? Number(props.row.defC3).toFixed(1) : null}}</strong></span>
              </span>
              <span v-if="props.column.field == 'definitiva'">
                <span><strong>{{Number(props.row.definitiva) > 0 ? Number(props.row.definitiva).toFixed(1) : null}}</strong></span>
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
      </b-row>
      <b-row class="mt-2">
        <b-col lg="12">
          <div v-if="configuracionPlanilla.id_tipo == 2">
            <h6>Conceptos Valorativos:
              <span class="ml-3 text-danger">BAJO: ({{Number(configuracionPlanilla.minBajT).toFixed(1)}} a {{Number(configuracionPlanilla.maxBajT).toFixed(1)}})</span>
              <span class="ml-3 text-primary">BÁSICO: ({{Number(configuracionPlanilla.minBasT).toFixed(1)}} a {{Number(configuracionPlanilla.maxBasT).toFixed(1)}})</span>
              <span class="ml-3 text-warning">ALTO: ({{Number(configuracionPlanilla.minAltT).toFixed(1)}} a {{Number(configuracionPlanilla.maxAltT).toFixed(1)}})</span>
              <span class="ml-3 text-success">SUPERIOR: ({{Number(configuracionPlanilla.minSupT).toFixed(1)}} a {{Number(configuracionPlanilla.maxSupT).toFixed(1)}})</span>
            </h6>
          </div>
          <div v-else-if="configuracionPlanilla.id_tipo == 1">
            <h6>Conceptos Valorativos: 
              <span class="ml-3 text-danger">BAJO: ({{Number(configuracionPlanilla.minBaj).toFixed(1)}} a {{Number(configuracionPlanilla.maxBaj).toFixed(1)}})</span>
              <span class="ml-3 text-primary">BÁSICO: ({{Number(configuracionPlanilla.minBas).toFixed(1)}} a {{Number(configuracionPlanilla.maxBas).toFixed(1)}})</span>
              <span class="ml-3 text-warning">ALTO: ({{Number(configuracionPlanilla.minAlt).toFixed(1)}} a {{Number(configuracionPlanilla.maxAlt).toFixed(1)}})</span>
              <span class="ml-3 text-success">SUPERIOR: ({{Number(configuracionPlanilla.minSup).toFixed(1)}} a {{Number(configuracionPlanilla.maxSup).toFixed(1)}})</span>
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
        <b-row v-if="notasPlanilla">
          <b-col v-if="!botonGuardando">
            <b-button class="small mx-1 mt-4" variant="success" @click="botonGuardando = true,guardarPlanilla()" :disabled="!cambioActivo">Guardar Planilla Parcial</b-button>
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
    name: 'notasparcialperiodo',
    props: {
      configuracionPlanilla: Object
    },
    components: {
      VueGoodTable
    },
    data () {
      return {
        notasPlanilla: [],
        botonGuardando: false,
        encabColumnas: [],
        encabezados: {},
        planillita: 0,
        idColumnaCopiar: null,
        comboColumnas: [],
        cambioActivo: false,
        btnCargando: true
      }
    },
    methods: {
      async guardarPlanilla() {
        await axios
        .put(CONFIG.ROOT_PATH + 'docente/notas/planilla', JSON.stringify(this.notasPlanilla), { headers: {"Content-Type": "application/json; charset=utf-8" }})
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
      cambioPlanilla() {
        this.cambioActivo = true
      },
      actualizarItemC1(item) {
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
        if (item.n1C1 == '' || item.n1C1 == null || item.n1C1 == 0) {
          this.notasPlanilla[indice].n1C1 = null
          item.n1C1 = null
        } else  {
          if (item.n1C1 >= notaMinima && item.n1C1 <= notaMaxima) {
            this.notasPlanilla[indice].n1C1 = item.n1C1
          } else {
            this.notasPlanilla[indice].n1C1 = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación (nota): ' + item.n1C1  + ' no es válida.')
            item.n1C1 = null
          }
        }
        if (item.n2C1 == '' || item.n2C1 == null || item.n2C1 == 0) {
          this.notasPlanilla[indice].n2C1 = null
          item.n2C1 = null
        } else  {
          if (item.n2C1 >= notaMinima && item.n2C1 <= notaMaxima) {
            this.notasPlanilla[indice].n2C1 = item.n2C1
          } else {
            this.notasPlanilla[indice].n2C1 = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación (nota): ' + item.n2C1  + ' no es válida.')
            item.n2C1 = null
          }
        }
        if (item.n3C1 == '' || item.n3C1 == null || item.n3C1 == 0) {
          this.notasPlanilla[indice].n3C1 = null
          item.n3C1 = null
        } else  {
          if (item.n3C1 >= notaMinima && item.n3C1 <= notaMaxima) {
            this.notasPlanilla[indice].n3C1 = item.n3C1
          } else {
            this.notasPlanilla[indice].n3C1 = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación (nota): ' + item.n3C1  + ' no es válida.')
            item.n3C1 = null
          }
        }
        if (item.n4C1 == '' || item.n4C1 == null || item.n4C1 == 0) {
          this.notasPlanilla[indice].n4C1 = null
          item.n4C1 = null
        } else  {
          if (item.n4C1 >= notaMinima && item.n4C1 <= notaMaxima) {
            this.notasPlanilla[indice].n4C1 = item.n4C1
          } else {
            this.notasPlanilla[indice].n4C1 = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación (nota): ' + item.n4C1  + ' no es válida.')
            item.n4C1 = null
          }
        }
        if (item.n5C1 == '' || item.n5C1 == null || item.n5C1 == 0) {
          this.notasPlanilla[indice].n5C1 = null
          item.n5C1 = null
        } else  {
          if (item.n5C1 >= notaMinima && item.n5C1 <= notaMaxima) {
            this.notasPlanilla[indice].n5C1 = item.n5C1
          } else {
            this.notasPlanilla[indice].n5C1 = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación (nota): ' + item.n5C1  + ' no es válida.')
            item.n5C1 = null
          }
        }
        let i = 0
        let sumaNotas = 0
        if (this.notasPlanilla[indice].n1C1 > 0) {
          sumaNotas += Number(this.notasPlanilla[indice].n1C1)
          i++
        }
        if (this.notasPlanilla[indice].n2C1 > 0) {
          sumaNotas += Number(this.notasPlanilla[indice].n2C1)
          i++
        }
        if (this.notasPlanilla[indice].n3C1 > 0) {
          sumaNotas += Number(this.notasPlanilla[indice].n3C1)
          i++
        }
        if (this.notasPlanilla[indice].n4C1 > 0) {
          sumaNotas += Number(this.notasPlanilla[indice].n4C1)
          i++
        }
        if (this.notasPlanilla[indice].n5C1 > 0) {
          sumaNotas += Number(this.notasPlanilla[indice].n5C1)
          i++
        }
        if (i == 0) {
          this.notasPlanilla[indice].defC1 = null
          this.notasPlanilla[indice].definitiva = null
        } else {
          this.notasPlanilla[indice].defC1 = this.redondear((sumaNotas / i))
          if (this.planillita == 1) {
            this.notasPlanilla[indice].definitiva = this.redondear((sumaNotas / i))
          }
          if (this.planillita == 2) {
            this.notasPlanilla[indice].definitiva = this.redondear(Number(Number(this.notasPlanilla[indice].defC1) * this.configuracionPlanilla.porcentajeC1 / 100) + Number(Number(this.notasPlanilla[indice].defC2) * this.configuracionPlanilla.porcentajeC2 / 100))
          }
          if (this.planillita == 3) {
            this.notasPlanilla[indice].definitiva = this.redondear(Number(Number(this.notasPlanilla[indice].defC1) * this.configuracionPlanilla.porcentajeC1 / 100) + Number(Number(this.notasPlanilla[indice].defC2) * this.configuracionPlanilla.porcentajeC2 / 100) + Number(Number(this.notasPlanilla[indice].defC3) * this.configuracionPlanilla.porcentajeC3 / 100))
          }
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
      actualizarItemC2(item) {
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
        if (item.n1C2 == '' || item.n1C2 == null || item.n1C2 == 0) {
          this.notasPlanilla[indice].n1C2 = null
          item.n1C2 = null
        } else  {
          if (item.n1C2 >= notaMinima && item.n1C2 <= notaMaxima) {
            this.notasPlanilla[indice].n1C2 = item.n1C2
          } else {
            this.notasPlanilla[indice].n1C2 = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación (nota): ' + item.n1C2  + ' no es válida.')
            item.n1C2 = null
          }
        }
        if (item.n2C2 == '' || item.n2C2 == null || item.n2C2 == 0) {
          this.notasPlanilla[indice].n2C2 = null
          item.n2C2 = null
        } else  {
          if (item.n2C2 >= notaMinima && item.n2C2 <= notaMaxima) {
            this.notasPlanilla[indice].n2C2 = item.n2C2
          } else {
            this.notasPlanilla[indice].n2C2 = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación (nota): ' + item.n2C2  + ' no es válida.')
            item.n2C2 = null
          }
        }
        if (item.n3C2 == '' || item.n3C2 == null || item.n3C2 == 0) {
          this.notasPlanilla[indice].n3C2 = null
          item.n3C2 = null
        } else  {
          if (item.n3C2 >= notaMinima && item.n3C2 <= notaMaxima) {
            this.notasPlanilla[indice].n3C2 = item.n3C2
          } else {
            this.notasPlanilla[indice].n3C2 = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación (nota): ' + item.n3C2  + ' no es válida.')
            item.n3C2 = null
          }
        }
        if (item.n4C2 == '' || item.n4C2 == null || item.n4C2 == 0) {
          this.notasPlanilla[indice].n4C2 = null
          item.n4C2 = null
        } else  {
          if (item.n4C2 >= notaMinima && item.n4C2 <= notaMaxima) {
            this.notasPlanilla[indice].n4C2 = item.n4C2
          } else {
            this.notasPlanilla[indice].n4C2 = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación (nota): ' + item.n4C2  + ' no es válida.')
            item.n4C2 = null
          }
        }
        if (item.n5C2 == '' || item.n5C2 == null || item.n5C2 == 0) {
          this.notasPlanilla[indice].n5C2 = null
          item.n5C2 = null
        } else  {
          if (item.n5C2 >= notaMinima && item.n5C2 <= notaMaxima) {
            this.notasPlanilla[indice].n5C2 = item.n5C2
          } else {
            this.notasPlanilla[indice].n5C2 = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación (nota): ' + item.n5C2  + ' no es válida.')
            item.n5C2 = null
          }
        }
        let i = 0
        let sumaNotas = 0
        if (this.notasPlanilla[indice].n1C2 > 0) {
          sumaNotas += Number(this.notasPlanilla[indice].n1C2)
          i++
        }
        if (this.notasPlanilla[indice].n2C2 > 0) {
          sumaNotas += Number(this.notasPlanilla[indice].n2C2)
          i++
        }
        if (this.notasPlanilla[indice].n3C2 > 0) {
          sumaNotas += Number(this.notasPlanilla[indice].n3C2)
          i++
        }
        if (this.notasPlanilla[indice].n4C2 > 0) {
          sumaNotas += Number(this.notasPlanilla[indice].n4C2)
          i++
        }
        if (this.notasPlanilla[indice].n5C2 > 0) {
          sumaNotas += Number(this.notasPlanilla[indice].n5C2)
          i++
        }
        if (i == 0) {
          this.notasPlanilla[indice].defC2 = null
        } else {
          this.notasPlanilla[indice].defC2 = this.redondear((sumaNotas / i))
          if (this.planillita == 1) {
            this.notasPlanilla[indice].definitiva = this.redondear(Number(sumaNotas / i))
          }
          if (this.planillita == 2) {
            this.notasPlanilla[indice].definitiva = this.redondear(Number(Number(this.notasPlanilla[indice].defC1) * this.configuracionPlanilla.porcentajeC1 / 100) + Number(Number(this.notasPlanilla[indice].defC2) * this.configuracionPlanilla.porcentajeC2 / 100))
          }
          if (this.planillita == 3) {
            this.notasPlanilla[indice].definitiva = this.redondear(Number(Number(this.notasPlanilla[indice].defC1) * this.configuracionPlanilla.porcentajeC1 / 100) + Number(Number(this.notasPlanilla[indice].defC2) * this.configuracionPlanilla.porcentajeC2 / 100) + Number(Number(this.notasPlanilla[indice].defC3) * this.configuracionPlanilla.porcentajeC3 / 100))
          }
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
      actualizarItemC3(item) {
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
        if (item.n1C3 == '' || item.n1C3 == null || item.n1C3 == 0) {
          this.notasPlanilla[indice].n1C3 = null
          item.n1C3 = null
        } else  {
          if (item.n1C3 >= notaMinima && item.n1C3 <= notaMaxima) {
            this.notasPlanilla[indice].n1C3 = item.n1C3
          } else {
            this.notasPlanilla[indice].n1C3 = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación (nota): ' + item.n1C3  + ' no es válida.')
            item.n1C3 = null
          }
        }
        if (item.n2C3 == '' || item.n2C3 == null || item.n2C3 == 0) {
          this.notasPlanilla[indice].n2C3 = null
          item.n2C3 = null
        } else  {
          if (item.n2C3 >= notaMinima && item.n2C3 <= notaMaxima) {
            this.notasPlanilla[indice].n2C3 = item.n2C3
          } else {
            this.notasPlanilla[indice].n2C3 = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación (nota): ' + item.n2C3  + ' no es válida.')
            item.n2C3 = null
          }
        }
        if (item.n3C3 == '' || item.n3C3 == null || item.n3C3 == 0) {
          this.notasPlanilla[indice].n3C3 = null
          item.n3C3 = null
        } else  {
          if (item.n3C3 >= notaMinima && item.n3C3 <= notaMaxima) {
            this.notasPlanilla[indice].n3C3 = item.n3C3
          } else {
            this.notasPlanilla[indice].n3C3 = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación (nota): ' + item.n3C3  + ' no es válida.')
            item.n3C3 = null
          }
        }
        if (item.n4C3 == '' || item.n4C3 == null || item.n4C3 == 0) {
          this.notasPlanilla[indice].n4C3 = null
          item.n4C3 = null
        } else  {
          if (item.n4C3 >= notaMinima && item.n4C3 <= notaMaxima) {
            this.notasPlanilla[indice].n4C3 = item.n4C3
          } else {
            this.notasPlanilla[indice].n4C3 = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación (nota): ' + item.n4C3  + ' no es válida.')
            item.n4C3 = null
          }
        }
        if (item.n5C3 == '' || item.n5C3 == null || item.n5C3 == 0) {
          this.notasPlanilla[indice].n5C3 = null
          item.n5C3 = null
        } else  {
          if (item.n5C3 >= notaMinima && item.n5C3 <= notaMaxima) {
            this.notasPlanilla[indice].n5C3 = item.n5C3
          } else {
            this.notasPlanilla[indice].n5C3 = null
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'La evaluación (nota): ' + item.n5C3  + ' no es válida.')
            item.n5C3 = null
          }
        }
        let i = 0
        let sumaNotas = 0
        if (this.notasPlanilla[indice].n1C3 > 0) {
          sumaNotas += Number(this.notasPlanilla[indice].n1C3)
          i++
        }
        if (this.notasPlanilla[indice].n2C3 > 0) {
          sumaNotas += Number(this.notasPlanilla[indice].n2C3)
          i++
        }
        if (this.notasPlanilla[indice].n3C3 > 0) {
          sumaNotas += Number(this.notasPlanilla[indice].n3C3)
          i++
        }
        if (this.notasPlanilla[indice].n4C3 > 0) {
          sumaNotas += Number(this.notasPlanilla[indice].n4C3)
          i++
        }
        if (this.notasPlanilla[indice].n5C3 > 0) {
          sumaNotas += Number(this.notasPlanilla[indice].n5C3)
          i++
        }
        if (i == 0) {
          this.notasPlanilla[indice].defC3 = null
        } else {
          this.notasPlanilla[indice].defC3 = this.redondear((sumaNotas / i))
          if (this.planillita == 1) {
            this.notasPlanilla[indice].definitiva = this.redondear(Number(sumaNotas / i))
          }
          if (this.planillita == 2) {
            this.notasPlanilla[indice].definitiva = this.redondear(Number(Number(this.notasPlanilla[indice].defC1) * this.configuracionPlanilla.porcentajeC1 / 100) + Number(Number(this.notasPlanilla[indice].defC2) * this.configuracionPlanilla.porcentajeC2 / 100))
          }
          if (this.planillita == 3) {
            this.notasPlanilla[indice].definitiva = this.redondear(Number(Number(this.notasPlanilla[indice].defC1) * this.configuracionPlanilla.porcentajeC1 / 100) + Number(Number(this.notasPlanilla[indice].defC2) * this.configuracionPlanilla.porcentajeC2 / 100) + Number(Number(this.notasPlanilla[indice].defC3) * this.configuracionPlanilla.porcentajeC3 / 100))
          }
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
      tdClassFuncDefinitiva(fila) {
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
      async cargarNotasPeriodo() {
        this.notasPlanilla = []
        await axios
        .get(CONFIG.ROOT_PATH + 'docente/notas/planilla', {params: {idCurso: this.configuracionPlanilla.idCurso, idPeriodo: this.configuracionPlanilla.idPeriodo, idPlanilla: this.configuracionPlanilla.idPlanilla, idTipoEsp: this.configuracionPlanilla.id_tipo, idEspecialidad: this.configuracionPlanilla.id_especialidad, vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Notas periodo')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                if(element.n1C1 === undefined) element.n1C1 = null
                if(element.n2C1 === undefined) element.n2C1 = null
                if(element.n3C1 === undefined) element.n3C1 = null
                if(element.n4C1 === undefined) element.n4C1 = null
                if(element.n5C1 === undefined) element.n5C1 = null
                if(element.defC1 === undefined) element.defC1 = null
                if(element.n1C2 === undefined) element.n1C2 = null
                if(element.n2C2 === undefined) element.n2C2 = null
                if(element.n3C2 === undefined) element.n3C2 = null
                if(element.n4C2 === undefined) element.n4C2 = null
                if(element.n5C2 === undefined) element.n5C2 = null
                if(element.defC2 === undefined) element.defC2 = null
                if(element.n1C3 === undefined) element.n1C3 = null
                if(element.n2C3 === undefined) element.n2C3 = null
                if(element.n3C3 === undefined) element.n3C3 = null
                if(element.n4C3 === undefined) element.n4C3 = null
                if(element.n5C3 === undefined) element.n5C3 = null
                if(element.defC3 === undefined) element.defC3 = null
                if(element.ausJ === undefined) element.ausJ = null
                if(element.ausS === undefined) element.ausS = null
                if(element.definitiva === undefined) element.definitiva = null
                if(element.concepto === undefined) element.concepto = null
                element.id_asignatura_curso = this.configuracionPlanilla.idPlanilla
                element.periodo = this.configuracionPlanilla.idPeriodo
              })
              this.notasPlanilla = response.data.datos
              //console.log(JSON.stringify(this.notasPlanilla))
              setTimeout(()=>{
                this.construirPlanillaNotas()
                this.btnCargando = false
              },500)
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Notas periodo. Intente más tarde.' + err)
        })
      },
      async construirPlanillaNotas() {
        let enca1 = ''
        let enca2 = ''
        let enca3 = ''
        let enca4 = ''
        let enca5 = ''
        let enca6 = ''
        let enca7 = ''
        let enca8 = ''
        let enca9 = ''
        let enca10 = ''
        let enca11 = ''
        let enca12 = ''
        let enca13 = ''
        let enca14 = ''
        let enca15 = ''
        this.planillita = 0
        if (this.configuracionPlanilla.estadoC1 == 1 && this.configuracionPlanilla.estadoC2 == 0 && this.configuracionPlanilla.estadoC3 == 0) {
          this.planillita = 1
          this.comboColumnas = [
            {'value': 'n1C1', 'text': 'N01' + (this.encabezados.enc01 == '' || this.encabezados.enc01 == null ? '' : (' - ' + this.encabezados.enc01))},
            {'value': 'n2C1', 'text': 'N02' + (this.encabezados.enc02 == '' || this.encabezados.enc02 == null ? '' : (' - ' + this.encabezados.enc02))},
            {'value': 'n3C1', 'text': 'N03' + (this.encabezados.enc03 == '' || this.encabezados.enc03 == null ? '' : (' - ' + this.encabezados.enc03))},
            {'value': 'n4C1', 'text': 'N04' + (this.encabezados.enc04 == '' || this.encabezados.enc04 == null ? '' : (' - ' + this.encabezados.enc04))},
            {'value': 'n5C1', 'text': 'N05' + (this.encabezados.enc05 == '' || this.encabezados.enc05 == null ? '' : (' - ' + this.encabezados.enc05))},
          ]
          if (this.encabezados.val01 == 0) {
            if (this.encabezados.enc01 == null || this.encabezados.enc01 == '') this.encabezados.enc01 = 'N01'
            if (this.encabezados.enc02 == null || this.encabezados.enc02 == '') this.encabezados.enc02 = 'N02'
            if (this.encabezados.enc03 == null || this.encabezados.enc03 == '') this.encabezados.enc03 = 'N03'
            if (this.encabezados.enc04 == null || this.encabezados.enc04 == '') this.encabezados.enc04 = 'N04'
            if (this.encabezados.enc05 == null || this.encabezados.enc05 == '') this.encabezados.enc05 = 'N05'
            enca1 = this.encabezados.enc01 + '\n___\nEQ'
            enca2 = this.encabezados.enc02 + '\n___\nEQ'
            enca3 = this.encabezados.enc03 + '\n___\nEQ'
            enca4 = this.encabezados.enc04 + '\n___\nEQ'
            enca5 = this.encabezados.enc05 + '\n___\nEQ'
            this.encabColumnas = [
              { label: 'Apellidos y Nombres Estudiante', width: '30%', field: 'estudiante', sortable: false },
              { label: '', field: 'diversa', sortable: false, tdClass: this.tdClassFuncDiversa },
              { label: 'N01', field: 'n1C1', sortable: false, tooltip: enca1 },
              { label: 'N02', field: 'n2C1', sortable: false, tooltip: enca2 },
              { label: 'N03', field: 'n3C1', sortable: false, tooltip: enca3 },
              { label: 'N04', field: 'n4C1', sortable: false, tooltip: enca4 },
              { label: 'N05', field: 'n5C1', sortable: false, tooltip: enca5 },
              { label: 'Definitiva', field: 'definitiva', sortable: false, tdClass: this.tdClassFuncDefinitiva },
              { label: 'Concepto', field: 'concepto', sortable: false, tdClass: this.tdClassFuncConcepto },
              { label: 'AJ', field: 'ausJ', sortable: false, tooltip: 'Ausencias Justificadas' },
              { label: 'AS', field: 'ausS', sortable: false, tooltip: 'Ausencias Sin Justificar' },
            ]
          } else {
            // planilla porcentual
          }
          //, tooltip: 'A simple tooltip'  //, hidden: true
        } else if (this.configuracionPlanilla.estadoC1 == 1 && this.configuracionPlanilla.estadoC2 == 1 && this.configuracionPlanilla.estadoC3 == 0) {
          this.planillita = 2
          this.comboColumnas = [
            {'value': 'n1C1', 'text': 'N01' + (this.encabezados.enc01 == '' || this.encabezados.enc01 == null ? '' : (' - ' + this.encabezados.enc01))},
            {'value': 'n2C1', 'text': 'N02' + (this.encabezados.enc02 == '' || this.encabezados.enc02 == null ? '' : (' - ' + this.encabezados.enc02))},
            {'value': 'n3C1', 'text': 'N03' + (this.encabezados.enc03 == '' || this.encabezados.enc03 == null ? '' : (' - ' + this.encabezados.enc03))},
            {'value': 'n4C1', 'text': 'N04' + (this.encabezados.enc04 == '' || this.encabezados.enc04 == null ? '' : (' - ' + this.encabezados.enc04))},
            {'value': 'n5C1', 'text': 'N05' + (this.encabezados.enc05 == '' || this.encabezados.enc05 == null ? '' : (' - ' + this.encabezados.enc05))},
            {'value': 'n1C2', 'text': 'N06' + (this.encabezados.enc06 == '' || this.encabezados.enc06 == null ? '' : (' - ' + this.encabezados.enc06))},
            {'value': 'n2C2', 'text': 'N07' + (this.encabezados.enc07 == '' || this.encabezados.enc07 == null ? '' : (' - ' + this.encabezados.enc07))},
            {'value': 'n3C2', 'text': 'N08' + (this.encabezados.enc08 == '' || this.encabezados.enc08 == null ? '' : (' - ' + this.encabezados.enc08))},
            {'value': 'n4C2', 'text': 'N09' + (this.encabezados.enc09 == '' || this.encabezados.enc09 == null ? '' : (' - ' + this.encabezados.enc09))},
            {'value': 'n5C2', 'text': 'N10' + (this.encabezados.enc10 == '' || this.encabezados.enc10 == null ? '' : (' - ' + this.encabezados.enc10))},
          ]
          if (this.encabezados.val02 == 0) {
            if (this.encabezados.enc01 == null || this.encabezados.enc01 == '') this.encabezados.enc01 = 'N01'
            if (this.encabezados.enc02 == null || this.encabezados.enc02 == '') this.encabezados.enc02 = 'N02'
            if (this.encabezados.enc03 == null || this.encabezados.enc03 == '') this.encabezados.enc03 = 'N03'
            if (this.encabezados.enc04 == null || this.encabezados.enc04 == '') this.encabezados.enc04 = 'N04'
            if (this.encabezados.enc05 == null || this.encabezados.enc05 == '') this.encabezados.enc05 = 'N05'
            if (this.encabezados.enc06 == null || this.encabezados.enc06 == '') this.encabezados.enc06 = 'N06'
            if (this.encabezados.enc07 == null || this.encabezados.enc07 == '') this.encabezados.enc07 = 'N07'
            if (this.encabezados.enc08 == null || this.encabezados.enc08 == '') this.encabezados.enc08 = 'N08'
            if (this.encabezados.enc09 == null || this.encabezados.enc09 == '') this.encabezados.enc09 = 'N09'
            if (this.encabezados.enc10 == null || this.encabezados.enc10 == '') this.encabezados.enc10 = 'N10'
            enca1 = this.encabezados.enc01 + '\n___\nEQ'
            enca2 = this.encabezados.enc02 + '\n___\nEQ'
            enca3 = this.encabezados.enc03 + '\n___\nEQ'
            enca4 = this.encabezados.enc04 + '\n___\nEQ'
            enca5 = this.encabezados.enc05 + '\n___\nEQ'
            enca6 = this.encabezados.enc06 + '\n___\nEQ'
            enca7 = this.encabezados.enc07 + '\n___\nEQ'
            enca8 = this.encabezados.enc08 + '\n___\nEQ'
            enca9 = this.encabezados.enc09 + '\n___\nEQ'
            enca10 = this.encabezados.enc10 + '\n___\nEQ'
            this.encabColumnas = [
              { label: 'Apellidos y Nombres Estudiante', width: '30%', field: 'estudiante', sortable: false },
              { label: '', field: 'diversa', sortable: false, tdClass: this.tdClassFuncDiversa },
              { label: 'N01', field: 'n1C1', sortable: false, tooltip: enca1 },
              { label: 'N02', field: 'n2C1', sortable: false, tooltip: enca2 },
              { label: 'N03', field: 'n3C1', sortable: false, tooltip: enca3 },
              { label: 'N04', field: 'n4C1', sortable: false, tooltip: enca4 },
              { label: 'N05', field: 'n5C1', sortable: false, tooltip: enca5 },
              { label: this.configuracionPlanilla.nombreC1+'\n'+this.configuracionPlanilla.porcentajeC1+'%', field: 'defC1', sortable: false, tdClass: this.tdClassFuncC1 },
              { label: 'N06', field: 'n1C2', sortable: false, tooltip: enca6 },
              { label: 'N07', field: 'n2C2', sortable: false, tooltip: enca7 },
              { label: 'N08', field: 'n3C2', sortable: false, tooltip: enca8 },
              { label: 'N09', field: 'n4C2', sortable: false, tooltip: enca9 },
              { label: 'N10', field: 'n5C2', sortable: false, tooltip: enca10 },
              { label: this.configuracionPlanilla.nombreC2+'\n'+this.configuracionPlanilla.porcentajeC2+'%', field: 'defC2', sortable: false, tdClass: this.tdClassFuncC2 },
              { label: 'Definitiva', field: 'definitiva', sortable: false, tdClass: this.tdClassFuncDefinitiva },
              { label: 'Concepto', field: 'concepto', sortable: false, tdClass: this.tdClassFuncConcepto },
              { label: 'AJ', field: 'ausJ', sortable: false, tooltip: 'Ausencias Justificadas' },
              { label: 'AS', field: 'ausS', sortable: false, tooltip: 'Ausencias Sin Justificar' },
            ]
          } else {
            // planilla porcentual
          }
          //, tooltip: 'A simple tooltip'  //, hidden: true
        } else if(this.configuracionPlanilla.estadoC1 == 1 && this.configuracionPlanilla.estadoC2 == 1 && this.configuracionPlanilla.estadoC3 == 1) {       
          this.planillita = 3
          this.comboColumnas = [
            {'value': 'n1C1', 'text': 'N01' + (this.encabezados.enc01 == '' || this.encabezados.enc01 == null ? '' : (' - ' + this.encabezados.enc01))},
            {'value': 'n2C1', 'text': 'N02' + (this.encabezados.enc02 == '' || this.encabezados.enc02 == null ? '' : (' - ' + this.encabezados.enc02))},
            {'value': 'n3C1', 'text': 'N03' + (this.encabezados.enc03 == '' || this.encabezados.enc03 == null ? '' : (' - ' + this.encabezados.enc03))},
            {'value': 'n4C1', 'text': 'N04' + (this.encabezados.enc04 == '' || this.encabezados.enc04 == null ? '' : (' - ' + this.encabezados.enc04))},
            {'value': 'n5C1', 'text': 'N05' + (this.encabezados.enc05 == '' || this.encabezados.enc05 == null ? '' : (' - ' + this.encabezados.enc05))},
            {'value': 'n1C2', 'text': 'N06' + (this.encabezados.enc06 == '' || this.encabezados.enc06 == null ? '' : (' - ' + this.encabezados.enc06))},
            {'value': 'n2C2', 'text': 'N07' + (this.encabezados.enc07 == '' || this.encabezados.enc07 == null ? '' : (' - ' + this.encabezados.enc07))},
            {'value': 'n3C2', 'text': 'N08' + (this.encabezados.enc08 == '' || this.encabezados.enc08 == null ? '' : (' - ' + this.encabezados.enc08))},
            {'value': 'n4C2', 'text': 'N09' + (this.encabezados.enc09 == '' || this.encabezados.enc09 == null ? '' : (' - ' + this.encabezados.enc09))},
            {'value': 'n5C2', 'text': 'N10' + (this.encabezados.enc10 == '' || this.encabezados.enc10 == null ? '' : (' - ' + this.encabezados.enc10))},
            {'value': 'n1C3', 'text': 'N11' + (this.encabezados.enc11 == '' || this.encabezados.enc11 == null ? '' : (' - ' + this.encabezados.enc11))},
            {'value': 'n2C3', 'text': 'N12' + (this.encabezados.enc12 == '' || this.encabezados.enc12 == null ? '' : (' - ' + this.encabezados.enc12))},
            {'value': 'n3C3', 'text': 'N13' + (this.encabezados.enc13 == '' || this.encabezados.enc13 == null ? '' : (' - ' + this.encabezados.enc13))},
            {'value': 'n4C3', 'text': 'N14' + (this.encabezados.enc14 == '' || this.encabezados.enc14 == null ? '' : (' - ' + this.encabezados.enc14))},
            {'value': 'n5C3', 'text': 'N15' + (this.encabezados.enc15 == '' || this.encabezados.enc15 == null ? '' : (' - ' + this.encabezados.enc15))},
          ]
          if (this.encabezados.val03 == 0) {
            if (this.encabezados.enc01 == null || this.encabezados.enc01 == '') this.encabezados.enc01 = 'N01'
            if (this.encabezados.enc02 == null || this.encabezados.enc02 == '') this.encabezados.enc02 = 'N02'
            if (this.encabezados.enc03 == null || this.encabezados.enc03 == '') this.encabezados.enc03 = 'N03'
            if (this.encabezados.enc04 == null || this.encabezados.enc04 == '') this.encabezados.enc04 = 'N04'
            if (this.encabezados.enc05 == null || this.encabezados.enc05 == '') this.encabezados.enc05 = 'N05'
            if (this.encabezados.enc06 == null || this.encabezados.enc06 == '') this.encabezados.enc06 = 'N06'
            if (this.encabezados.enc07 == null || this.encabezados.enc07 == '') this.encabezados.enc07 = 'N07'
            if (this.encabezados.enc08 == null || this.encabezados.enc08 == '') this.encabezados.enc08 = 'N08'
            if (this.encabezados.enc09 == null || this.encabezados.enc09 == '') this.encabezados.enc09 = 'N09'
            if (this.encabezados.enc10 == null || this.encabezados.enc10 == '') this.encabezados.enc10 = 'N10'
            if (this.encabezados.enc11 == null || this.encabezados.enc11 == '') this.encabezados.enc11 = 'N11'
            if (this.encabezados.enc12 == null || this.encabezados.enc12 == '') this.encabezados.enc12 = 'N12'
            if (this.encabezados.enc13 == null || this.encabezados.enc13 == '') this.encabezados.enc13 = 'N13'
            if (this.encabezados.enc14 == null || this.encabezados.enc14 == '') this.encabezados.enc14 = 'N14'
            if (this.encabezados.enc15 == null || this.encabezados.enc15 == '') this.encabezados.enc15 = 'N15'
            enca1 = this.encabezados.enc01 + '\n___\nEQ'
            enca2 = this.encabezados.enc02 + '\n___\nEQ'
            enca3 = this.encabezados.enc03 + '\n___\nEQ'
            enca4 = this.encabezados.enc04 + '\n___\nEQ'
            enca5 = this.encabezados.enc05 + '\n___\nEQ'
            enca6 = this.encabezados.enc06 + '\n___\nEQ'
            enca7 = this.encabezados.enc07 + '\n___\nEQ'
            enca8 = this.encabezados.enc08 + '\n___\nEQ'
            enca9 = this.encabezados.enc09 + '\n___\nEQ'
            enca10 = this.encabezados.enc10 + '\n___\nEQ'
            enca11 = this.encabezados.enc11 + '\n___\nEQ'
            enca12 = this.encabezados.enc12 + '\n___\nEQ'
            enca13 = this.encabezados.enc13 + '\n___\nEQ'
            enca14 = this.encabezados.enc14 + '\n___\nEQ'
            enca15 = this.encabezados.enc15 + '\n___\nEQ'
            this.encabColumnas = [
              { label: 'Apellidos y Nombres Estudiante', width: '30%', field: 'estudiante', sortable: false },
              { label: '', field: 'diversa', sortable: false, tdClass: this.tdClassFuncDiversa },
              { label: 'N01', field: 'n1C1', sortable: false, tooltip: enca1 },
              { label: 'N02', field: 'n2C1', sortable: false, tooltip: enca2 },
              { label: 'N03', field: 'n3C1', sortable: false, tooltip: enca3 },
              { label: 'N04', field: 'n4C1', sortable: false, tooltip: enca4 },
              { label: 'N05', field: 'n5C1', sortable: false, tooltip: enca5 },
              { label: this.configuracionPlanilla.nombreC1+'\n'+this.configuracionPlanilla.porcentajeC1+'%', field: 'defC1', sortable: false, tdClass: this.tdClassFuncC1 },
              { label: 'N06', field: 'n1C2', sortable: false, tooltip: enca6 },
              { label: 'N07', field: 'n2C2', sortable: false, tooltip: enca7 },
              { label: 'N08', field: 'n3C2', sortable: false, tooltip: enca8 },
              { label: 'N09', field: 'n4C2', sortable: false, tooltip: enca9 },
              { label: 'N10', field: 'n5C2', sortable: false, tooltip: enca10 },
              { label: this.configuracionPlanilla.nombreC2+'\n'+this.configuracionPlanilla.porcentajeC2+'%', field: 'defC2', sortable: false, tdClass: this.tdClassFuncC2 },
              { label: 'N11', field: 'n1C3', sortable: false, tooltip: enca11 },
              { label: 'N12', field: 'n2C3', sortable: false, tooltip: enca12 },
              { label: 'N13', field: 'n3C3', sortable: false, tooltip: enca13 },
              { label: 'N14', field: 'n4C3', sortable: false, tooltip: enca14 },
              { label: 'N15', field: 'n5C3', sortable: false, tooltip: enca15 },
              { label: this.configuracionPlanilla.nombreC3+'\n'+this.configuracionPlanilla.porcentajeC3+'%', field: 'defC3', sortable: false, tdClass: this.tdClassFuncC3 },
              { label: 'Definitiva', field: 'definitiva', sortable: false, tdClass: this.tdClassFuncDefinitiva },
              { label: 'Concepto', field: 'concepto', sortable: false, tdClass: this.tdClassFuncConcepto },
              { label: 'AJ', field: 'ausJ', sortable: false, tooltip: 'Ausencias Justificadas' },
              { label: 'AS', field: 'ausS', sortable: false, tooltip: 'Ausencias Sin Justificar' },
            ]
          } else {
            // planilla porcentual
          }
          //, tooltip: 'A simple tooltip'  //, hidden: true
        } else {       
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Los criterios de evaluación se encuentran mal configurados y no se puede mostrar la planilla de evaluación parcial.')
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
      tdClassFuncC1(fila) {
        if (this.configuracionPlanilla.id_tipo == 1) {
          if (fila.defC1 >= this.configuracionPlanilla.minBaj && fila.defC1 <= this.configuracionPlanilla.maxBaj) {
            return 'text-danger text-center bg-light'
          } else if (fila.defC1 >= this.configuracionPlanilla.minBas && fila.defC1 <= this.configuracionPlanilla.maxBas) {
            return 'text-primary text-center bg-light'
          } else if (fila.defC1 >= this.configuracionPlanilla.minAlt && fila.defC1 <= this.configuracionPlanilla.maxAlt) {
            return 'text-warning text-center bg-light'
          } else if (fila.defC1 >= this.configuracionPlanilla.minSup && fila.defC1 <= this.configuracionPlanilla.maxSup) {
            return 'text-success text-center bg-light'
          }
          return 'text-secondary text-center bg-light'
        } else if (this.configuracionPlanilla.id_tipo == 2) {
          if (fila.defC1 >= this.configuracionPlanilla.minBajT && fila.defC1 <= this.configuracionPlanilla.maxBajT) {
            return 'text-danger text-center bg-light'
          } else if (fila.defC1 >= this.configuracionPlanilla.minBasT && fila.defC1 <= this.configuracionPlanilla.maxBasT) {
            return 'text-primary text-center bg-light'
          } else if (fila.defC1 >= this.configuracionPlanilla.minAltT && fila.defC1 <= this.configuracionPlanilla.maxAltT) {
            return 'text-warning text-center bg-light'
          } else if (fila.defC1 >= this.configuracionPlanilla.minSupT && fila.defC1 <= this.configuracionPlanilla.maxSupT) {
            return 'text-success text-center bg-light'
          }
          return 'text-secondary text-center bg-light'
        }
      },
      tdClassFuncC2(fila) {
        if (this.configuracionPlanilla.id_tipo == 1) {
          if (fila.defC2 >= this.configuracionPlanilla.minBaj && fila.defC2 <= this.configuracionPlanilla.maxBaj) {
            return 'text-danger text-center bg-light'
          } else if (fila.defC2 >= this.configuracionPlanilla.minBas && fila.defC2 <= this.configuracionPlanilla.maxBas) {
            return 'text-primary text-center bg-light'
          } else if (fila.defC2 >= this.configuracionPlanilla.minAlt && fila.defC2 <= this.configuracionPlanilla.maxAlt) {
            return 'text-warning text-center bg-light'
          } else if (fila.defC2 >= this.configuracionPlanilla.minSup && fila.defC2 <= this.configuracionPlanilla.maxSup) {
            return 'text-success text-center bg-light'
          }
          return 'text-secondary text-center bg-light'
        } else if (this.configuracionPlanilla.id_tipo == 2) {
          if (fila.defC2 >= this.configuracionPlanilla.minBajT && fila.defC2 <= this.configuracionPlanilla.maxBajT) {
            return 'text-danger text-center bg-light'
          } else if (fila.defC2 >= this.configuracionPlanilla.minBasT && fila.defC2 <= this.configuracionPlanilla.maxBasT) {
            return 'text-primary text-center bg-light'
          } else if (fila.defC2 >= this.configuracionPlanilla.minAltT && fila.defC2 <= this.configuracionPlanilla.maxAltT) {
            return 'text-warning text-center bg-light'
          } else if (fila.defC2 >= this.configuracionPlanilla.minSupT && fila.defC2 <= this.configuracionPlanilla.maxSupT) {
            return 'text-success text-center bg-light'
          }
          return 'text-secondary text-center bg-light'
        }
      },
      tdClassFuncC3(fila) {
        if (this.configuracionPlanilla.id_tipo == 1) {
          if (fila.defC3 >= this.configuracionPlanilla.minBaj && fila.defC3 <= this.configuracionPlanilla.maxBaj) {
            return 'text-danger text-center bg-light'
          } else if (fila.defC3 >= this.configuracionPlanilla.minBas && fila.defC3 <= this.configuracionPlanilla.maxBas) {
            return 'text-primary text-center bg-light'
          } else if (fila.defC3 >= this.configuracionPlanilla.minAlt && fila.defC3 <= this.configuracionPlanilla.maxAlt) {
            return 'text-warning text-center bg-light'
          } else if (fila.defC3 >= this.configuracionPlanilla.minSup && fila.defC3 <= this.configuracionPlanilla.maxSup) {
            return 'text-success text-center bg-light'
          }
          return 'text-secondary text-center bg-light'
        } else if (this.configuracionPlanilla.id_tipo == 2) {
          if (fila.defC3 >= this.configuracionPlanilla.minBajT && fila.defC3 <= this.configuracionPlanilla.maxBajT) {
            return 'text-danger text-center bg-light'
          } else if (fila.defC3 >= this.configuracionPlanilla.minBasT && fila.defC3 <= this.configuracionPlanilla.maxBasT) {
            return 'text-primary text-center bg-light'
          } else if (fila.defC3 >= this.configuracionPlanilla.minAltT && fila.defC3 <= this.configuracionPlanilla.maxAltT) {
            return 'text-warning text-center bg-light'
          } else if (fila.defC3 >= this.configuracionPlanilla.minSupT && fila.defC3 <= this.configuracionPlanilla.maxSupT) {
            return 'text-success text-center bg-light'
          }
          return 'text-secondary text-center bg-light'
        }
      },
      tdClassFuncDiversa(fila) {
        if (fila.id_diversa == 'S') {
          return 'text-center alert alert-warning'
        }
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
          //console.log(rowsFromClipboard)
          rowsFromClipboard.forEach((row, index) => {
            row = row.substr(0,3) //substring(0,3)
            row = row.replace(/,/g, '.')
            if (this.configuracionPlanilla.id_tipo == 1) {
              if (isNaN(row) || row < this.configuracionPlanilla.minBaj || row > this.configuracionPlanilla.maxSup) {
                row = ''
              }
            } else if (this.configuracionPlanilla.id_tipo == 2) {
              if (isNaN(row) || row < this.configuracionPlanilla.minBajT || row > this.configuracionPlanilla.maxSupT) {
                row = ''
              }
            } else {
              row = ''
            }
            const values = row.split("\t") // Separación por tabulaciones
            if (this.notasPlanilla[index]) {
              if (this.idColumnaCopiar == 'n1C1') this.notasPlanilla[index].n1C1 = values[0] || this.notasPlanilla[index].n1C1
              else if (this.idColumnaCopiar == 'n2C1') this.notasPlanilla[index].n2C1 = values[0] || this.notasPlanilla[index].n2C1
              else if (this.idColumnaCopiar == 'n3C1') this.notasPlanilla[index].n3C1 = values[0] || this.notasPlanilla[index].n3C1
              else if (this.idColumnaCopiar == 'n4C1') this.notasPlanilla[index].n4C1 = values[0] || this.notasPlanilla[index].n4C1
              else if (this.idColumnaCopiar == 'n5C1') this.notasPlanilla[index].n5C1 = values[0] || this.notasPlanilla[index].n5C1
              else if (this.idColumnaCopiar == 'n1C2') this.notasPlanilla[index].n1C2 = values[0] || this.notasPlanilla[index].n1C2
              else if (this.idColumnaCopiar == 'n2C2') this.notasPlanilla[index].n2C2 = values[0] || this.notasPlanilla[index].n2C2
              else if (this.idColumnaCopiar == 'n3C2') this.notasPlanilla[index].n3C2 = values[0] || this.notasPlanilla[index].n3C2
              else if (this.idColumnaCopiar == 'n4C2') this.notasPlanilla[index].n4C2 = values[0] || this.notasPlanilla[index].n4C2
              else if (this.idColumnaCopiar == 'n5C2') this.notasPlanilla[index].n5C2 = values[0] || this.notasPlanilla[index].n5C2
              else if (this.idColumnaCopiar == 'n1C3') this.notasPlanilla[index].n1C3 = values[0] || this.notasPlanilla[index].n1C3
              else if (this.idColumnaCopiar == 'n2C3') this.notasPlanilla[index].n2C3 = values[0] || this.notasPlanilla[index].n2C3
              else if (this.idColumnaCopiar == 'n3C3') this.notasPlanilla[index].n3C3 = values[0] || this.notasPlanilla[index].n3C3
              else if (this.idColumnaCopiar == 'n4C3') this.notasPlanilla[index].n4C3 = values[0] || this.notasPlanilla[index].n4C3
              else if (this.idColumnaCopiar == 'n5C3') this.notasPlanilla[index].n5C3 = values[0] || this.notasPlanilla[index].n5C3
              this.actualizarItemC1(this.notasPlanilla[index])
              this.actualizarItemC2(this.notasPlanilla[index])
              this.actualizarItemC3(this.notasPlanilla[index])
            }
          })
          this.cambioActivo = true
        } catch (error) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'No es posible pegar los datos. Intente nuevamente seleccionar y copiar los datos desde Excel.')
        }
        this.cancelarVentana()
      },
      seleccionarColumnaPegarExcel() {
        this.idColumnaCopiar = null
        this.$refs['modalSeleccionarColumna'].show()
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
      this.cargarNotasPeriodo()
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