<template>
  <div>
    <b-row>
      <b-col lg="12">
        <b-card>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <h2 class="text-center">OBSERVADOR DEL ESTUDIANTE</h2>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="12">
                <b-alert class="text-center" :variant="datosFichaE.id_estado_actual==1 ? 'success' : 'danger'" show>ESTUDIANTE<br><h4 class="mb-0"><b>{{ datosFichaE.estudiante }}</b></h4><span><b>ESTADO: {{ datosFichaE.estado }}</b></span></b-alert>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="12">
                <b-card border-variant="secondary">
                  <b-card-text>
                    <b-row>
                      <b-col lg="12">
                        <h5 class="mb-0"><b-icon icon="person" aria-hidden="true"></b-icon> Datos del Estudiante</h5>
                        <hr>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col lg="2" md="6">
                        <div>Número Documento:</div>
                        <div class="etiqueta">{{datosFichaE.tipodoc}} # {{datosFichaE.documento}}</div>
                      </b-col>
                      <b-col lg="2" md="6">
                        <div>Fecha Nace:</div>
                        <div class="etiqueta">{{ datosFichaE.fechaNace }}</div>
                      </b-col>
                      <b-col lg="2" md="6">
                        <div>Municipio:</div>
                        <div class="etiqueta">{{datosFichaE.municipioNac != null ? datosFichaE.municipioNac.toUpperCase() : '-'}}</div>
                      </b-col>
                      <b-col lg="2" md="6">
                        <div>Edad:</div>
                        <div class="etiqueta">{{ calcularEdad(datosFichaE.fechaNace)}} Años</div>
                      </b-col>
                      <b-col lg="2" md="6">
                        <div>Nacionalidad:</div>
                        <div class="etiqueta">{{datosFichaE.pais}}</div>
                      </b-col>
                      <b-col lg="2" md="6">
                        <div>Género:</div>
                        <div class="etiqueta">{{datosFichaE.genero}}</div>
                      </b-col>
                    </b-row>
                    <b-row class="mt-3">
                      <b-col lg="4" md="6">
                        <div>Dirección:</div>
                        <div class="etiqueta">{{datosFichaE.direccion}}</div>
                      </b-col>
                      <b-col lg="2" md="6">
                        <div>Municipio:</div>
                        <div class="etiqueta">{{datosFichaE.municipioDir}}</div>
                      </b-col>
                      <b-col lg="2" md="6">
                        <div>Telefono 1:</div>
                        <div class="etiqueta">{{ datosFichaE.telefono1 }}</div>
                      </b-col>
                      <b-col lg="2" md="6">
                        <div>Telefono 2:</div>
                        <div class="etiqueta">{{ datosFichaE.telefono2 }}</div>
                      </b-col>
                      <b-col lg="2" md="6">
                        <div>Correo:</div>
                        <div class="etiqueta">{{datosFichaE.correo}}</div>
                      </b-col>
                    </b-row>
                    <b-row class="mt-5">
                      <b-col lg="12">
                        <h5 class="mb-0"><b-icon icon="people" aria-hidden="true"></b-icon> Datos Familiares</h5>
                        <hr>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col lg="3" md="6">
                        <div>Padre:</div>
                        <div class="etiqueta">{{datosFichaE.padre}}</div>
                      </b-col>
                      <b-col lg="3" md="6">
                        <div>Dirección:</div>
                        <div class="etiqueta">{{datosFichaE.direccionP}}</div>
                      </b-col>
                      <b-col lg="2" md="6">
                        <div>Municipio:</div>
                        <div class="etiqueta">{{ datosFichaE.municipioDirP }}</div>
                      </b-col>
                      <b-col lg="2" md="6">
                        <div>Telefono:</div>
                        <div class="etiqueta">{{ datosFichaE.telefonoP }}</div>
                      </b-col>
                      <b-col lg="2" md="6">
                        <div>Correo:</div>
                        <div class="etiqueta">{{datosFichaE.correoP}}</div>
                      </b-col>
                    </b-row>
                    <b-row class="mt-3">
                      <b-col lg="3" md="6">
                        <div>Madre:</div>
                        <div class="etiqueta">{{datosFichaE.madre}}</div>
                      </b-col>
                      <b-col lg="3" md="6">
                        <div>Dirección:</div>
                        <div class="etiqueta">{{datosFichaE.direccionM}}</div>
                      </b-col>
                      <b-col lg="2" md="6">
                        <div>Municipio:</div>
                        <div class="etiqueta">{{ datosFichaE.municipioDirM }}</div>
                      </b-col>
                      <b-col lg="2" md="6">
                        <div>Telefono:</div>
                        <div class="etiqueta">{{ datosFichaE.telefonoM }}</div>
                      </b-col>
                      <b-col lg="2" md="6">
                        <div>Correo:</div>
                        <div class="etiqueta">{{datosFichaE.correoM}}</div>
                      </b-col>
                    </b-row>
                    <b-row class="mt-3">
                      <b-col lg="3" md="6">
                        <div>Acudiente - {{datosFichaE.parentesco}}:</div>
                        <div class="etiqueta">{{datosFichaE.acudiente}}</div>
                      </b-col>
                      <b-col lg="3" md="6">
                        <div>Dirección:</div>
                        <div class="etiqueta">{{datosFichaE.direccionA}}</div>
                      </b-col>
                      <b-col lg="2" md="6">
                        <div>Municipio:</div>
                        <div class="etiqueta">{{ datosFichaE.municipioDirA }}</div>
                      </b-col>
                      <b-col lg="2" md="6">
                        <div>Telefono:</div>
                        <div class="etiqueta">{{ datosFichaE.telefonoA }}</div>
                      </b-col>
                      <b-col lg="2" md="6">
                        <div>Correo:</div>
                        <div class="etiqueta">{{datosFichaE.correoA}}</div>
                      </b-col>
                    </b-row>
                    <b-row class="mt-5">
                      <b-col lg="12">
                        <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Datos de la Matrícula</h5>
                        <hr>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col lg="2" md="6">
                        <div>Fecha Matrícula:</div>
                        <div class="etiqueta">{{datosFichaE.creado}}</div>
                      </b-col>
                      <b-col lg="2" md="6">
                        <div>Año Lectivo:</div>
                        <div class="etiqueta">{{datosFichaE.vigencia}}</div>
                      </b-col>
                      <b-col lg="4" md="6">
                        <div>Sede:</div>
                        <div class="etiqueta">{{ datosFichaE.sede}}</div>
                      </b-col>
                      <b-col lg="2" md="6">
                        <div>Grado-Curso:</div>
                        <div class="etiqueta">{{datosFichaE.nomenclatura}}</div>
                      </b-col>
                      <b-col lg="2" md="6">
                        <div>Jornada:</div>
                        <div class="etiqueta">{{datosFichaE.jornada}}</div>
                      </b-col>
                    </b-row>
                    <b-row class="mt-3">
                      <b-col lg="2" md="6">
                        <div>Nuevo:</div>
                        <div class="etiqueta">{{datosFichaE.id_nuevo}}</div>
                      </b-col>
                      <b-col lg="2" md="6">
                        <div>Repitente:</div>
                        <div class="etiqueta">{{datosFichaE.id_repitente}}</div>
                      </b-col>
                      <b-col lg="4" md="6">
                        <div>Especialidad:</div>
                        <div class="etiqueta">{{ datosFichaE.especialidad}}</div>
                      </b-col>
                      <b-col lg="4" md="6">
                        <div>Observaciones Matrícula:</div>
                        <div class="etiqueta">{{datosFichaE.obs_matricula}}</div>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="12">
                <b-card border-variant="secondary">
                  <b-card-text>
                    <b-row>
                      <b-col lg="12">
                        <b-button class="small float-right" variant="dark" @click="nuevaObservacion">Nueva Observación</b-button>
                        <h5 class="mb-0"><b-icon icon="stickies" aria-hidden="true"></b-icon> Registro General de Observaciones</h5>
                        <hr>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <vue-good-table :columns="encabColumnas" :rows="listaAnotaciones" styleClass="vgt-table condensed bordered striped">
                          <template slot="table-row" slot-scope="props">
                            <span v-if="props.column.field == 'fecha_observacion'">
                              <span>{{props.row.fecha_observacion}}</span>
                            </span>
                            <span v-if="props.column.field == 'tipoobservacion'">
                              <span>{{props.row.tipoobservacion}}<br>{{props.row.subtipo}}</span>
                            </span>
                            <span v-if="props.column.field == 'situacion'">
                              <span>{{props.row.situacion}}<br>Responsable: {{props.row.responsable}}</span>
                            </span>
                            <span v-if="props.column.field == 'descargos'">
                              <span>{{props.row.descargos}}</span>
                            </span>
                            <span v-if="props.column.field == 'estadoseguimiento'">
                              <span>{{props.row.estadoseguimiento}}</span>
                            </span>
                            <span v-if="props.column.field == 'id'">
                              <span style="font-weight: bold; color: blue; cursor: pointer" @click="consultarObservacion(props.row)" title="Consultar Observación"><CIcon name="cilPencil"/></span>
                            </span>
                          </template>
                          <div slot="emptystate">
                            <h5 class="text-danger ml-5">No existen observaciones registradas.</h5>
                          </div>
                        </vue-good-table>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="12">
                <b-button class="small mx-1 mt-3" variant="primary" @click="imprimirObservador">Imprimir Observador</b-button>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Actualice los datos de una observación haciendo clic en el lapiz.</em>
          </template>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalRegistroObservador" size="xl" scrollable hide-footer :title="'Registro Observación de: ' + datosFichaE.estudiante" ok-only>
      <div class="mx-3">
        <b-row>
          <b-col lg="8">
            <b-form-group label="Responsable:" label-for="responsable" class="etiqueta">
              <b-form-input  id="responsable" ref="responsable" v-model="registroObservador.responsable" disabled></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group label="Rol:" label-for="rol" class="etiqueta">
              <b-form-input  id="rol" ref="rol" v-model="registroObservador.rol" disabled></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row><b-col lg="12"><hr></b-col></b-row>
        <b-row>
          <b-col lg="4">
            <b-form-group label="Fecha Registro:*" label-for="fecha" class="etiqueta">
              <b-form-input type="date" id="fecha" ref="fecha" v-model="$v.registroObservador.fecha_observacion.$model" :state="validateStateO('fecha_observacion')" aria-describedby="feedFecha" :disabled="cerrado"></b-form-input>
              <b-form-invalid-feedback id="feedFecha">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group label="Tipo Observación:*" label-for="tipoObservacion" class="etiqueta">
              <b-form-select  id="tipoObservacion" ref="tipoObservacion" v-model="$v.registroObservador.id_tipo_observacion.$model" :options="comboTiposObservacion" :state="validateStateO('id_tipo_observacion')" aria-describedby="feedTipoObservacion" :disabled="cerrado"></b-form-select>
              <b-form-invalid-feedback id="feedTipoObservacion">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group label="SubTipo Observación:*" label-for="subtipoObservacion" class="etiqueta">
              <b-form-select  id="subtipoObservacion" ref="subtipoObservacion" v-model="$v.registroObservador.id_subtipo.$model" :options="comboSubTipos" :state="validateStateO('id_subtipo')" aria-describedby="feedSubTipoObservacion" :disabled="registroObservador.id_tipo_observacion==4 && !cerrado ? false : true"></b-form-select>
              <b-form-invalid-feedback id="feedSubTipoObservacion">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="12" md="12">
            <b-form-group label="Describa la Situación a Registrar:*" label-for="situacion" class="etiqueta">
              <b-form-textarea id="situacion" ref="situacion" v-model.trim="$v.registroObservador.situacion.$model" :state="validateStateO('situacion')" aria-describedby="feedSituacion" autocomplete="off" rows="2" :disabled="cerrado"></b-form-textarea>
              <b-form-invalid-feedback id="feedSituacion">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="12" md="12">
            <b-form-group label="Versión del Estudiante:" label-for="descargos" class="etiqueta">
              <b-form-textarea id="descargos" ref="descargos" v-model.trim="registroObservador.descargos" autocomplete="off" rows="2" :disabled="cerrado"></b-form-textarea>
            </b-form-group>
          </b-col>
          <b-col lg="12" md="12">
            <b-form-group label="Compromisos:" label-for="compromisos" class="etiqueta">
              <b-form-textarea id="compromisos" ref="compromisos" v-model.trim="registroObservador.compromisos" autocomplete="off" rows="2" :disabled="cerrado"></b-form-textarea>
            </b-form-group>
          </b-col>
          <b-col lg="12" md="12">
            <b-form-group label="Nota de Seguimiento:" label-for="seguimiento" class="etiqueta">
              <b-form-textarea id="seguimiento" ref="seguimiento" v-model.trim="registroObservador.seguimiento" autocomplete="off" rows="2" :disabled="cerrado"></b-form-textarea>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group label="Estado del Seguimiento:*" label-for="estadoSegui" class="etiqueta">
              <b-form-select  id="estadoSegui" ref="estadoSegui" v-model="$v.registroObservador.id_estado_seguimiento.$model" :options="comboEstadosSeguimiento" :state="validateStateO('id_estado_seguimiento')" aria-describedby="feedSegui" :disabled="cerrado"></b-form-select>
              <b-form-invalid-feedback id="feedSegui">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row><b-col lg="12"><hr></b-col></b-row>
        <b-row>
          <b-col lg="12" v-if="!botonGuardando">
            <b-button v-if="!cerrado" class="small ml-3" variant="primary" @click="validarDatosFormulario()">Guardar Observación</b-button>
            <b-button class="small ml-3" variant="secondary" @click="cancelarFormulario">Cerrar</b-button>
          </b-col>
          <b-col v-else>
            <b-button class="small ml-3" variant="primary" disabled>
              <b-spinner small type="grow"></b-spinner>
              Guardando el registro...
            </b-button>
          </b-col>
        </b-row>
      </div>
    </b-modal>
    <div class="observador" id="observador" style="display:none;">
      <table class="table">
        <thead>
          <tr>
            <th colspan="7" style="text-align: center">DATOS DEL ESTUDIANTE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Estudiante</th>
            <td colspan="2">{{datosFichaE.estudiante}}</td>
            <th>Documento</th>
            <td>{{datosFichaE.tipodoc}} {{datosFichaE.documento}}</td>
            <th>F. Nace</th>
            <td>{{datosFichaE.fechaNace}}</td>
          </tr>
          <tr>
            <th>Dirección</th>
            <td colspan="2">{{datosFichaE.direccion}} {{datosFichaE.municipioDir}}</td>
            <th>Teléfono</th>
            <td>{{datosFichaE.telefono1}}</td>
            <th>Edad</th>
            <td>{{ calcularEdad(datosFichaE.fechaNace)}} Años</td>
          </tr>
          <tr>
            <th>Sede</th>
            <td colspan="2">{{datosFichaE.sede}}</td>
            <th>Grado-Curso</th>
            <td>{{datosFichaE.nomenclatura}}</td>
            <th>Jornada</th>
            <td>{{datosFichaE.jornada}}</td>
          </tr>
        </tbody>
      </table>
      <table class="table">
        <thead>
          <tr>
            <th colspan="7" style="text-align: center">DATOS FAMILIARES</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Padre</th>
            <td>{{datosFichaE.padre}}</td>
            <th>Dirección</th>
            <td>{{datosFichaE.direccionP}} {{datosFichaE.municipioDirP}}</td>
            <th>Tel.</th>
            <td>{{datosFichaE.telefonoP}}</td>
          </tr>
          <tr>
            <th>Madre</th>
            <td>{{datosFichaE.madre}}</td>
            <th>Dirección</th>
            <td>{{datosFichaE.direccionM}} {{datosFichaE.municipioDirM}}</td>
            <th>Tel.</th>
            <td>{{datosFichaE.telefonoM}}</td>
          </tr>
          <tr>
            <th>Acudiente</th>
            <td>{{datosFichaE.acudiente}}</td>
            <th>Dirección</th>
            <td>{{datosFichaE.direccionA}} {{datosFichaE.municipioDirA}}</td>
            <th>Tel.</th>
            <td>{{datosFichaE.telefonoA}}</td>
          </tr>
          <tr>
            <th>Correo</th>
            <td>{{datosFichaE.correoA}}</td>
            <th>Parentesco</th>
            <td>{{datosFichaE.parentesco}}</td>
            <th>Fecha</th>
            <td>{{fechaHoy}}</td>
          </tr>
        </tbody>
      </table>
      <table class="table">
        <thead>
          <tr>
            <th colspan="8" style="text-align: center">REGISTRO OBSERVADOR</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Fecha</th>
            <th>Tipo Obsev</th>
            <th>Descripción de la Situación</th>
            <th>Versión del Estudiante</th>
            <th>Compromisos</th>
            <th>Seguimiento</th>
            <th>Nota Seguimiento</th>
            <th>Firmas</th>
          </tr>
          <tr v-for="item in datosFichaE.observador" :key="item.id">
            <td>{{item.fecha_observacion}}</td>
            <td>{{item.tipoobservacion}}<br>{{item.subtipo}}</td>
            <td>{{item.situacion}}<br><b>Responsable:</b><br>{{item.responsable}}</td>
            <td>{{item.descargos}}</td>
            <td>{{item.compromisos}}</td>
            <td>{{item.estadoseguimiento}}</td>
            <td>{{item.seguimiento}}</td>
            <td><br>________________<br>Estudiante<br><br>________________<br>Acudiente<br><br>________________<br>Responsable<br></td>
          </tr>
        </tbody>
      </table>
      <table>
        <tr>
          <td style="border: hidden">
            <p style="text-align: center;"><br><br>_______________________________________<br>Director(a) de Curso</p>
          </td>
          <td style="border: hidden">
            <p style="text-align: center;"><br><br>_______________________________________<br>Coordinador(a) / Rector(a)</p>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'
  import { validationMixin } from "vuelidate";
  import { required, minLength } from "vuelidate/lib/validators";

  export default {
    name: 'observador',
    mixins: [validationMixin],
    components: {
      VueGoodTable
    },
    data () {
      return {
        idEstudiante: null,
        idMatricula: null,
        datosFichaE: {},
        listaAnotaciones: [],
        encabColumnas: [
          { label: 'Fecha', field: 'fecha_observacion', sortable: false },
          { label: 'Tipo', field: 'tipoobservacion', sortable: false },
          { label: 'Descripción de la Situación', field: 'situacion', sortable: false },
          { label: 'Versión del Estudiante', field: 'descargos', sortable: false },
          //{ label: 'Compromisos', field: 'compromisos', sortable: false },
          //{ label: 'Actualizado', field: 'actualizado', sortable: false },
          { label: 'Seguimiento', field: 'estadoseguimiento', sortable: false },
          { label: '', field: 'id', sortable: false },
        ],
        registroObservador: {
          id: null,
          id_estudiante: null,
          situacion: null,
          id_tipo_observacion: null,
          id_subtipo: null,
          subtipo: null,
          descargos: null,
          compromisos: null,
          id_estado_seguimiento: null,
          seguimiento: null,
          id_responsable: null,
          responsable	: null,
          rol: null,
          id_institucion: null,
          fecha_observacion: null,
          creado: null,
          actualizado: null,
          editar: null
        },
        comboTiposObservacion: [],
        comboSubTipos: [
          { 'value': '1', 'text': 'TIPO I' },
          { 'value': '2', 'text': 'TIPO II' },
          { 'value': '3', 'text': 'TIPO III' },
          { 'value': '9', 'text': 'NO APLICA' },
        ],
        comboEstadosSeguimiento: [],
        botonGuardando: false,
        cerrado: false,
        fechaHoy: null
      }
    },
    validations: {
      registroObservador: {
        fecha_observacion: { required },
        situacion: { required, minLength: minLength(10) },
        id_tipo_observacion: { required },
        id_subtipo: { required },
        id_estado_seguimiento: { required },
      }
    },
    methods: {
      imprimirObservador() {
        document.getElementById("observador").style.display = "block";
        // Crear una nueva ventana para imprimir
        const printWindow = window.open("Observador", "_blank");

        // Obtener el contenido HTML de la tabla
        const tableHtml = document.querySelector(".observador").outerHTML;

        // Estilos básicos para la impresión
        const style = `
          <style>
            @media all {
              div.saltopagina{
                display: none;
              }
            }
            @media print{
              div.saltopagina{
                display:block; 
                page-break-before:always;
              }
            }	
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 10px 0;
              font-size: 10px;
              text-align: left;
            }
            table, th, td {
              border: 1px solid black;
            }
            th, td {
              padding-left: 5px;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        `;

        // Insertar el contenido HTML y los estilos en la nueva ventana
        printWindow.document.write(`
          <html>
            <head>
              <title>Observador del Estudiante</title>
              ${style}
            </head>
            <body>
              <div style="float: left; margin-top: -1px;">
                <img src="https://siedutunja.gov.co/api/colegios/escudos/${this.$store.state.escudoInstitucion}" style="width:60px;height:60px;"></img>
              </div>
              <div style="margin-left: -60px">
                <p style="text-align: center; font-size: 10px;">SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA<br><b>${this.$store.state.nombreInstitucion}</b><br>TUNJA -BOYACÁ<br><br><b>OBSERVADOR DEL ESTUDIANTE - AÑO LECTIVO ${this.$store.state.aLectivo}</p>
              </div>
              ${tableHtml}
            </body>
          </html>
        `);

        // Iniciar la impresión y cerrar la ventana
        //printWindow.document.close();
        //printWindow.print();
        document.getElementById("observador").style.display = "none";
      },
      validarDatosFormulario() {
        this.$v.registroObservador.$touch()
        if (this.$v.registroObservador.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          let titulo = this.registroObservador.editar ? 'Actualizar Datos del Registro' : 'Crear Registro'
          let pregunta = this.registroObservador.editar ? '¿Esta seguro de actualizar los datos del Registro?' : '¿Esta seguro de crear el Registro?'
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
            cancelVariant: '',
            cancelTitle: 'Cancelar',
            footerClass: 'p-2',
            bodyClass: 'p-5',
            hideHeaderClose: false,
            centered: true
          })
          .then(value => {
            if (value) {
              this.botonGuardando = true
              this.guardarRegistro()
            }
          })
        }
        return true
      },
      async guardarRegistro() {
        if (this.registroObservador.editar) {
          await axios
          .put(CONFIG.ROOT_PATH + 'observador/registroanotacion', JSON.stringify(this.registroObservador), { headers: {"Content-Type": "application/json; charset=utf-8" }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Registro')
            } else{
              this.mensajeEmergente('success',CONFIG.TITULO_MSG,'El registro del Observador del Estudiante se ha actualizado satisfactoriamente.')
              this.botonGuardando = false
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Registro. Intente más tarde. ' + err)
          })
        } else {
          await axios
          .post(CONFIG.ROOT_PATH + 'observador/registroanotacion', JSON.stringify(this.registroObservador), { headers: {"Content-Type": "application/json; charset=utf-8" }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Crear Registro')
            } else{
              this.mensajeEmergente('success',CONFIG.TITULO_MSG,'El registro del Observador del Estudiante se ha creado satisfactoriamente.')
              this.botonGuardando = false
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Crear Registro. Intente más tarde. ' + err)
          })
        }
        this.cancelarFormulario()
        this.consultaObservador()
      },
      consultarObservacion(item) {
        //console.log(JSON.stringify(item))
        this.registroObservador.id = item.id
        this.registroObservador.id_estudiante = item.id_estudiante
        this.registroObservador.situacion = item.situacion
        this.registroObservador.id_tipo_observacion = item.id_tipo_observacion
        this.registroObservador.id_subtipo = item.id_subtipo
        this.registroObservador.subtipo = item.subtipo
        this.registroObservador.descargos = item.descargos
        this.registroObservador.compromisos = item.compromisos
        this.registroObservador.id_estado_seguimiento = item.id_estado_seguimiento
        this.registroObservador.seguimiento = item.seguimiento
        this.registroObservador.id_responsable = item.id_responsable
        this.registroObservador.responsable = item.responsable
        this.registroObservador.rol = item.rol
        this.registroObservador.id_institucion = item.id_institucion
        this.registroObservador.fecha_observacion = item.fecha_observacion
        this.registroObservador.actualizado = item.actualizado
        if (this.registroObservador.id_responsable == this.$store.state.idPersona) {
          if ((this.registroObservador.id_estado_seguimiento == 3 || this.registroObservador.id_estado_seguimiento == 4)) {
            this.cerrado = true
          } else {
            this.cerrado = false
          }
        } else {
          this.cerrado = true
        }
        this.registroObservador.editar = true
        this.$refs['modalRegistroObservador'].show()
      },
      nuevaObservacion(item) {
        this.registroObservador.id = null
        this.registroObservador.id_estudiante = this.datosFichaE.id_estudiante
        this.registroObservador.situacion = null
        this.registroObservador.id_tipo_observacion = null
        this.registroObservador.id_subtipo = 9
        this.registroObservador.subtipo = null
        this.registroObservador.descargos = null
        this.registroObservador.compromisos = null
        this.registroObservador.id_estado_seguimiento = null
        this.registroObservador.seguimiento = null
        this.registroObservador.id_responsable = this.$store.state.idPersona
        this.registroObservador.responsable = this.$store.state.Persona
        this.registroObservador.rol = this.$store.state.rol
        this.registroObservador.id_institucion = this.$store.state.idInstitucion
        this.registroObservador.fecha_observacion = this.fechaHoy
        this.registroObservador.creado = null
        this.registroObservador.actualizado = null
        this.cerrado = false
        this.registroObservador.editar = false
        this.$refs['modalRegistroObservador'].show()
      },
      cancelarFormulario() {
        this.$refs['modalRegistroObservador'].hide()
      },
      async consultaObservador() {
        this.datosFichaE = {}
        this.listaAnotaciones = []
        await axios
        .get(CONFIG.ROOT_PATH + 'observador/consultaobservador', { params: { idEstudiante: this.idEstudiante, idMatricula: this.idMatricula }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Observador')
          } else{
            if (response.data.datos != 0) {
              this.datosFichaE = response.data.datos
              this.listaAnotaciones = this.datosFichaE.observador
              /*
              if (this.datosFichaE.foto == null || this.datosFichaE.foto == '') {
                this.datosFichaE.foto = CONFIG.FOTO
              }
              */  
            } else {
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'No se encontró el Observador del Estudiante')
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Observador. Intente más tarde.' + err)
        })
        this.fechaHoy = new Date()
        this.fechaHoy = this.fechaHoy.toJSON().slice(0,10)
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
      ocuparCombos() {
        this.comboTiposObservacion = []
        this.$store.state.datosTablas.tiposobservacion.forEach(element => {
          this.comboTiposObservacion.push({ 'value': element.id, 'text': element.tipoobservacion.toUpperCase() })
        })
        this.comboEstadosSeguimiento = []
        this.$store.state.datosTablas.estadosseguimiento.forEach(element => {
          this.comboEstadosSeguimiento.push({ 'value': element.id, 'text': element.estadoseguimiento.toUpperCase() })
        })
      },
      validateStateO(name) {
        const { $dirty, $error } = this.$v.registroObservador[name]
        return $dirty ? !$error : null
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.idEstudiante = this.$store.state.idEstudiante
      this.idMatricula = this.$store.state.idMatricula
      this.consultaObservador()
      this.ocuparCombos()
    }
  }
</script>