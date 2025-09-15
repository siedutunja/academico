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
                <b-alert class="text-center" :variant="datosFichaE.id_estado_actual==1 ? 'success' : 'danger'" show>
                  <img :src="datosFichaE.foto" id="photo" alt="photo" width="9%" class="float-left">
                  ESTUDIANTE<br><h4 class="mb-0"><b>{{ datosFichaE.estudiante }}</b></h4><span><b>ESTADO: {{ datosFichaE.estado }}</b></span>
                </b-alert>
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
                              <span><b>Responsable:</b><br>{{props.row.responsable}}<span v-if="props.row.nombre_situacion!=null"><br><b>Situación:</b><br>{{props.row.nombre_situacion}}</span><br><b>Descripción de la situación:</b><br>{{props.row.situacion}}<span v-if="props.row.accionP!=null"><br><b>Acción Pedagógica:</b><br>{{props.row.accionP}}</span><span v-if="props.row.accionR!=null"><br><b>Medidas Correctivas o Reparadoras:</b><br>{{props.row.accionR}}</span></span>
                            </span>
                            <span v-if="props.column.field == 'descargos'">
                              <span>{{props.row.descargos}}</span>
                            </span>
                            <span v-if="props.column.field == 'compromisos'">
                              <span>{{props.row.compromisos}}<span v-if="props.row.fecha_compromiso!=null"><br><b>Fecha compromisos:</b><br>{{props.row.fecha_compromiso.substr(0,10)}}</span></span>
                            </span>
                            <span v-if="props.column.field == 'estadoseguimiento'">
                              <span>{{props.row.seguimiento}}<br><b>Estado:</b><br>{{props.row.estadoseguimiento}}</span>
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
                <b-button class="small mx-1 mt-3" variant="secondary" @click="cerrarObservador">Cerrar</b-button>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Actualice los datos de una observación haciendo clic en el lapiz.</em>
          </template>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalRegistroObservador" size="xl" scrollable hide-footer :title="'Observación para: ' + datosFichaE.estudiante" ok-only>
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
            <b-form-group label="Aspecto:*" label-for="tipoObservacion" class="etiqueta">
              <b-form-select  id="tipoObservacion" ref="tipoObservacion" v-model="$v.registroObservador.id_tipo_observacion.$model" :options="comboTiposObservacion" :state="validateStateO('id_tipo_observacion')" @change="registroObservador.id_subtipo=9" aria-describedby="feedTipoObservacion" :disabled="cerrado"></b-form-select>
              <b-form-invalid-feedback id="feedTipoObservacion">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group label="Tipo:*" label-for="subtipoObservacion" class="etiqueta">
              <b-form-select  id="subtipoObservacion" ref="subtipoObservacion" v-model="$v.registroObservador.id_subtipo.$model" :options="comboSubTipos" :state="validateStateO('id_subtipo')" @change="cargarSituaciones(),cargarAccionesP(),cargarAccionesR()" aria-describedby="feedSubTipoObservacion" :disabled="registroObservador.id_tipo_observacion==4 && !cerrado ? false : true"></b-form-select>
              <b-form-invalid-feedback id="feedSubTipoObservacion">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <div v-if="$store.state.idInstitucion == 'eb58bf60-fc83-11ec-a1d1-1dc2835404e5' && registroObservador.id_subtipo > 0 && registroObservador.id_subtipo < 4"> <!-- INEM -->
            <b-col lg="12">
              <b-form-group label="Situación:*" label-for="idSituacion" class="etiqueta">
                <b-form-select  id="idSituacion" ref="idSituacion" v-model="idSituacion" :options="comboSituaciones" aria-describedby="feedidSituacion"></b-form-select>
                <b-form-invalid-feedback id="feedidSituacion">Campo requerido.</b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col lg="12">
              <b-form-group label="Acciones Pedagógicas:*" label-for="idAccionP" class="etiqueta">
                <b-form-select  id="idAccionP" ref="idAccionP" v-model="idAccionP" :options="comboAccionesP" aria-describedby="feedidAccionP"></b-form-select>
                <b-form-invalid-feedback id="feedidAccionP">Campo requerido.</b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col lg="12">
              <b-form-group label="Medidas Correctivas o Reparadoras:*" label-for="idAccionR" class="etiqueta">
                <b-form-select  id="idAccionR" ref="idAccionR" v-model="idAccionR" :options="comboAccionesR" aria-describedby="feedidAccionR"></b-form-select>
                <b-form-invalid-feedback id="feedidAccionR">Campo requerido.</b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </div>
          <b-col lg="12" md="12">
            <b-form-group label="Descripción la Situación:*" label-for="situacion" class="etiqueta">
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
          <b-col lg="4">
            <b-form-group label="Fecha Compromisos:*" label-for="fechaC" class="etiqueta">
              <b-form-input type="date" id="fechaC" ref="fechaC" v-model="registroObservador.fecha_compromiso" aria-describedby="feedFechaC" :disabled="cerrado"></b-form-input>
              <b-form-invalid-feedback id="feedFechaC">Campo requerido.</b-form-invalid-feedback>
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
            <b-button v-if="!cerrado" class="small ml-3" variant="danger" @click="validarDatosFormularioEliminar()">Eliminar Observación</b-button>
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
            <td>{{fechaImprimir}}</td>
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
            <th>Tipo</th>
            <th>Observación</th>
            <th>Versión del Estudiante</th>
            <th>Compromisos</th>
            <th>Seguimiento</th>
            <th>Firmas</th>
          </tr>
          <tr v-for="item in datosFichaE.observador" :key="item.id">
            <td>{{item.fecha_observacion}}</td>
            <td>{{item.tipoobservacion}}<br>{{item.subtipo}}</td>
            <td><b>Responsable:</b><br>{{item.responsable}}<span v-if="item.nombre_situacion!=null"><br><b>Situación:</b><br>{{item.nombre_situacion}}</span><br><b>Descripción de la situación:</b><br>{{item.situacion}}<span v-if="item.accionP!=null"><br><b>Acción Pedagógica:</b><br>{{item.accionP}}</span><span v-if="item.accionR!=null"><br><b>Medidas Correctivas o Reparadoras:</b><br>{{item.accionR}}</span></td>
            <td>{{item.descargos}}</td>
            <td>{{item.compromisos}}<span v-if="item.fecha_compromiso!=null"><br><b>Fecha compromisos:</b><br>{{item.fecha_compromiso.substr(0,10)}}</span></td>
            <td>{{item.seguimiento}}<br><b>Estado:</b><br>{{item.estadoseguimiento}}</td>
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
          { label: 'Observación', field: 'situacion', sortable: false },
          { label: 'Versión del Estudiante', field: 'descargos', sortable: false },
          { label: 'Compromisos', field: 'compromisos', sortable: false },
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
          id_situacion: null,
          nombre_situacion: null,
          id_accionP: null,
          accionP: null,
          id_accionR: null,
          accionR: null,
          descargos: null,
          compromisos: null,
          id_estado_seguimiento: null,
          seguimiento: null,
          id_responsable: null,
          responsable	: null,
          rol: null,
          id_institucion: null,
          fecha_observacion: null,
          fecha_compromiso: null,
          firma_compromiso: null,
          creado: null,
          actualizado: null,
          editar: null
        },
        comboTiposObservacion: [],
        comboSubTipos: [],
        comboEstadosSeguimiento: [],
        listaSituaciones: [],
        idSituacion: null,
        comboSituaciones: [],
        listaAccionesP: [],
        idAccionP: null,
        comboAccionesP: [],
        listaAccionesR: [],
        idAccionR: null,
        comboAccionesR: [],
        fechaImprimir: null,
        botonGuardando: false,
        cerrado: false
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
      validarDatosFormularioEliminar() {
        let titulo = 'Eliminar el Registro'
        let pregunta = '¿Esta seguro de eliminar los datos del Registro?'
        this.$bvModal.msgBoxConfirm(pregunta, {
          headerBgVariant: 'danger',
          headerTextVariant: 'light',
          bodyBgVariant: 'light',
          bodyBgClass: 'text-center',
          title: titulo,
          size: '',
          buttonSize: 'sm',
          okVariant: 'danger',
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
            this.eliminarRegistro()
          }
        })
        return true
      },
      async eliminarRegistro() {
        await axios
        .delete(CONFIG.ROOT_PATH + 'observador/registroanotacion', {params: {id: this.registroObservador.id}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Eliminar Registro')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'El registro del Observador del Estudiante se ha eliminado satisfactoriamente.')
            
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Eliminar Registro. Intente más tarde. ' + err)
        })
        this.botonGuardando = false
        this.cancelarFormulario()
        this.consultaObservador()
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
        if (this.idSituacion > 0) {
          this.registroObservador.id_situacion = this.idSituacion
          this.registroObservador.nombre_situacion = document.getElementById('idSituacion')[document.getElementById('idSituacion').selectedIndex].text
        } else {
          this.registroObservador.id_situacion = null
          this.registroObservador.nombre_situacion = null
        }
        if (this.idAccionP > 0) {
          this.registroObservador.id_accionP = this.idAccionP
          this.registroObservador.accionP = document.getElementById('idAccionP')[document.getElementById('idAccionP').selectedIndex].text
        } else {
          this.registroObservador.id_accionP = null
          this.registroObservador.accionP = null
        }
        if (this.idAccionR > 0) {
          this.registroObservador.id_accionR = this.idAccionR
          this.registroObservador.accionR = document.getElementById('idAccionR')[document.getElementById('idAccionR').selectedIndex].text
        } else {
          this.registroObservador.id_accionR = null
          this.registroObservador.accionR = null
        }
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
        this.idSituacion = item.id_situacion
        this.registroObservador.id_situacion = item.id_situacion
        this.registroObservador.nombre_situacion = item.nombre_situacion
        this.idAccionP = item.id_accionP
        this.registroObservador.id_accionP = item.id_accionP
        this.registroObservador.accionP = item.accionP
        this.idAccionR = item.id_accionR
        this.registroObservador.id_accionR = item.id_accionR
        this.registroObservador.accionR = item.accionR
        this.registroObservador.descargos = item.descargos
        this.registroObservador.compromisos = item.compromisos
        this.registroObservador.id_estado_seguimiento = item.id_estado_seguimiento
        this.registroObservador.seguimiento = item.seguimiento
        this.registroObservador.id_responsable = item.id_responsable
        this.registroObservador.responsable = item.responsable
        this.registroObservador.rol = item.rol
        this.registroObservador.id_institucion = item.id_institucion
        this.registroObservador.fecha_observacion = item.fecha_observacion
        if (item.fecha_compromiso != null) {
          this.registroObservador.fecha_compromiso = item.fecha_compromiso.substr(0,10)
        }
        this.registroObservador.firma_compromiso = item.firma_compromiso
        this.registroObservador.actualizado = item.actualizado
        if (this.$store.state.idRol == 1 || this.$store.state.idRol == 12 || this.$store.state.idRol == 14) {
          this.cerrado = false
        } else {
          this.cerrado = true
        }
        this.cargarSituaciones()
        this.cargarAccionesP()
        this.cargarAccionesR()
        this.registroObservador.editar = true
        this.$refs['modalRegistroObservador'].show()
      },
      nuevaObservacion() {
        this.registroObservador.id = null
        this.registroObservador.id_estudiante = this.datosFichaE.id_estudiante
        this.registroObservador.situacion = null
        this.registroObservador.id_tipo_observacion = null
        this.registroObservador.id_subtipo = 9
        this.registroObservador.descargos = null
        this.registroObservador.compromisos = null
        this.registroObservador.id_estado_seguimiento = null
        this.registroObservador.seguimiento = null
        this.registroObservador.id_responsable = this.$store.state.idPersona
        this.registroObservador.responsable = this.$store.state.Persona
        this.registroObservador.rol = this.$store.state.rol
        this.registroObservador.id_institucion = this.$store.state.idInstitucion
        let fechaHoy = new Date()
        this.registroObservador.fecha_observacion = fechaHoy.toJSON().slice(0,10)
        this.registroObservador.creado = null
        this.registroObservador.actualizado = null
        this.cerrado = false
        this.registroObservador.editar = false
        this.$refs['modalRegistroObservador'].show()
      },
      cargarSituaciones() {
        this.comboSituaciones = []
        this.listaSituaciones.forEach(element => {
          if (element.nivel == this.registroObservador.id_subtipo) {
            this.comboSituaciones.push({ 'value': element.id, 'text': element.situacion })
          }
        })
      },  
      cargarAccionesP() {
        this.comboAccionesP = []
        this.comboAccionesP.push({ 'value': 0, 'text': '-- No Aplica' })
        this.listaAccionesP.forEach(element => {
          if (element.nivel == this.registroObservador.id_subtipo) {
            this.comboAccionesP.push({ 'value': element.id, 'text': element.accionP })
          }
        })
      },  
      cargarAccionesR() {
        this.comboAccionesR = []
        this.comboAccionesR.push({ 'value': 0, 'text': '-- No Aplica' })
        this.listaAccionesR.forEach(element => {
          if (element.nivel == this.registroObservador.id_subtipo) {
            this.comboAccionesR.push({ 'value': element.id, 'text': element.accionR })
          }
        })
      },  
      cancelarFormulario() {
        this.$refs['modalRegistroObservador'].hide()
      },
      cerrarObservador() {
        this.$emit("retorno", 0)
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
              if (this.datosFichaE.foto == null || this.datosFichaE.foto == '') {
                this.datosFichaE.foto = CONFIG.FOTO
              }
            } else {
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'No se encontró el Observador del Estudiante')
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Observador. Intente más tarde.' + err)
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
      this.fechaImprimir = new Date().toLocaleString()
      if (this.$store.state.idInstitucion == 'eb58bf60-fc83-11ec-a1d1-1dc2835404e5') {
        this.comboSubTipos = [
          { 'value': '1', 'text': 'TIPO I - FALTAS LEVES' },
          { 'value': '2', 'text': 'TIPO II - FALTAS GRAVES' },
          { 'value': '3', 'text': 'TIPO III - FALTAS GRAVÍSIMAS' },
          { 'value': '9', 'text': 'NO APLICA' },
        ]
      } else {
        this.comboSubTipos = [
          { 'value': '1', 'text': 'TIPO I' },
          { 'value': '2', 'text': 'TIPO II' },
          { 'value': '3', 'text': 'TIPO III' },
          { 'value': '4', 'text': 'FALTA LEVE' },
          { 'value': '5', 'text': 'FALTA GRAVE' },
          { 'value': '6', 'text': 'FALTA GRAVÍSIMA' },
          { 'value': '9', 'text': 'NO APLICA' },
        ]
      }
      this.listaSituaciones = [
        {'id': 1, nivel: '1', 'situacion': 'Evadir clases o actividades programadas por el plantel'},
        {'id': 2, nivel: '1', 'situacion': 'Inasistencia al colegio sin justificación'},
        {'id': 3, nivel: '1', 'situacion': 'Incumplir frecuentemente con las normas establecidas en el pacto de aula'},
        {'id': 4, nivel: '1', 'situacion': 'Generar indisciplina, desorden y algarabía por medio de gritos, vocabulario soez y/o burlas que afecten a algún miembro de la comunidad educativa, o el buen desarrollo de las actividades programadas dentro de cualquier espacio de la Institución (izadas de bandera, actos culturales/deportivos, entre otros)'},
        {'id': 5, nivel: '1', 'situacion': 'Comercializar cualquier tipo de artículo o servicio dentro de la Institución Educativa, a menos que se trate de actividades programadas y autorizadas'},
        {'id': 6, nivel: '1', 'situacion': 'Arrojar basuras en cualquier espacio del colegio que no sea el adecuado para este fin'},
        {'id': 7, nivel: '1', 'situacion': 'Dañar cualquier bien público y/o privado (puertas, ventanas, pupitres, útiles, uniformes, entre otros) de uso institucional, dentro y/o fuera del estamento educativo, así como árboles o plantas ornamentales dentro de la Institución Educativa'},
        {'id': 8, nivel: '1', 'situacion': 'Utilizar sobrenombres, motes, apodos, ademanes que tengan como fin ridiculizar, humillar u ofender a cualquier miembro de la comunidad educativa'},
        {'id': 9, nivel: '1', 'situacion': 'Agresiones físicas que no generen daños al cuerpo como: empujones, calvazos, zancadilla, halar cabello, cachetadas, puños, entre otros'},
        {'id': 10, nivel: '1', 'situacion': 'Agresiones verbales o amenazas a cualquier persona de la comunidad educativa'},
        {'id': 11, nivel: '1', 'situacion': 'Hacer caso omiso a los llamados de atención verbal o escrita por parte del docente'},
        {'id': 12, nivel: '1', 'situacion': 'Difundir chismes para dañar el buen nombre de cualquier persona de la comunidad educativa, o para incitar a la agresión física dentro y fuera del colegio, sea de manera personal o virtual'},
        {'id': 13, nivel: '1', 'situacion': 'Usar indebidamente el celular o cualquier otro aparato electrónico, en las clases o actividades programadas por la institución'},
        {'id': 14, nivel: '1', 'situacion': 'Portar los uniformes en los días que no correspondan salvo en actividades institucionales programadas'},
        {'id': 15, nivel: '1', 'situacion': 'Presentación personal inadecuada en cuanto al aseo y porte de prendas, accesorios diferentes a los establecidos para el uso del uniforme y uso de maquillaje excesivo (delineado muy marcado, pedrería, escarchas)'},
        {'id': 16, nivel: '1', 'situacion': 'Cometer fraude en evaluaciones o actividades académicas'},
        {'id': 17, nivel: '1', 'situacion': 'Llegar frecuentemente tarde a las clases y/o actividades escolares sin justificación'},
        {'id': 18, nivel: '1', 'situacion': 'Hacer mal uso del PAE (desperdiciar los alimentos, usarlos como herramientas de juego/agresión, entre otros)'},
        {'id': 19, nivel: '1', 'situacion': 'La no entrega intencionada a los padres de familia o acudientes de las citaciones enviadas por la institución'},
        {'id': 20, nivel: '1', 'situacion': 'Realizar escritos y/o dibujos vulgares, conversaciones y actitudes indecorosas, así como exponer a contenido sexual a estudiantes menores de edad'},
        {'id': 21, nivel: '2', 'situacion': 'Incurrir repetitivamente en faltas leves'},
        {'id': 22, nivel: '2', 'situacion': 'Participar en riñas, retos que impliquen juegos bruscos, inadecuados, humillantes, denigrantes o morbosos que puedan afectar físicamente pero que no impliquen incapacidad médica'},
        {'id': 23, nivel: '2', 'situacion': 'Lanzar objetos (piedras, palos, semillas, botellas, etc.) o sustancias peligrosas, que puedan causar daño a personas y bienes muebles e inmuebles, tanto dentro como en el perímetro de la Institución'},
        {'id': 24, nivel: '2', 'situacion': 'Realizar demostraciones amorosas y/o actos explícitamente sexuales dentro de la Institución Educativa'},
        {'id': 25, nivel: '2', 'situacion': 'Crear o difundir por redes sociales contenidos o información que contenga datos personales, imágenes no autorizadas, sobrenombres, ridiculizaciones o fotos inapropiadas de compañeros que atenten contra el derecho a la intimidad, integridad y dignidad hacia otra persona de la comunidad educativa'},
        {'id': 26, nivel: '2', 'situacion': 'Escalar muros para entrar o salir de la Institución, con el fin de evadir la jornada escolar o realizar acciones que atenten contra el espacio público o los bienes privados'},
        {'id': 27, nivel: '2', 'situacion': 'Adulterar y/o falsificar documentos institucionales'},
        {'id': 28, nivel: '2', 'situacion': 'Incumplir constantemente con las labores académicas que den como resultado un desempeño bajo en dos áreas o más'},
        {'id': 29, nivel: '2', 'situacion': 'Prestar el uniforme a personas no vinculadas a la Institución Educativa para su ingreso a ésta de forma irregular'},
        {'id': 30, nivel: '2', 'situacion': 'El uso inadecuado del agua, harina, huevos, confeti, espumas, pinturas, sustancias químicas o inflamables y demás materiales que afecten la presentación y decoro de la Institución, o que atenten contra los compañeros, docentes o personal de la Institución'},
        {'id': 31, nivel: '2', 'situacion': 'Realizar actos de vandalismo a los bienes de la institución o de cualquier integrante de la comunidad educativa'},
        {'id': 32, nivel: '3', 'situacion': 'Dañar física, psicológica o emocionalmente a una autoridad, un compañero o a cualquier otra persona o empleado de la Institución Educativa, dentro o fuera de la misma, que cause incapacidad médica certificada por medicina legal o la que haga las veces'},
        {'id': 33, nivel: '3', 'situacion': 'Apropiarse de cualquier objeto perteneciente a otro u otros estudiantes o personas que haga parte de la comunidad educativa sin su consentimiento y para fines propios'},
        {'id': 34, nivel: '3', 'situacion': 'Realizar cualquier acción que vulnere los derechos sexuales y reproductivos de cualquier persona perteneciente a la comunidad educativa. (Ley 599 de 2000, Título IV, Artículo 105 y subsiguientes)'},
        {'id': 35, nivel: '3', 'situacion': 'Intimidar bajo amenaza a cualquier integrante de la comunidad educativa'},
        {'id': 36, nivel: '3', 'situacion': 'Portar, usar o comercializar armas de cualquier tipo'},
        {'id': 37, nivel: '3', 'situacion': 'Homicidio'},
        {'id': 38, nivel: '3', 'situacion': 'Extorsión'},
        {'id': 39, nivel: '3', 'situacion': 'Secuestro'},
        {'id': 40, nivel: '3', 'situacion': 'Porte, tráfico y/o comercialización de sustancias psicoactivas (alcohol, tabaco, Vaper, sustancias psicotrópicas, entre otras), a cualquier persona perteneciente a la comunidad educativa'},
      ],
      this.listaAccionesP = [
        {'id': 1, nivel: '1', 'accionP': 'Promover diálogo pedagógico (escucha activa, generar acuerdos, establecer compromisos escritos y delegar actividades reflexivas que generen un aprendizaje acorde al tipo de situación, con el estudiante, padre de familia o acudiente y dejar evidencia de lo actuado'},
        {'id': 2, nivel: '1', 'accionP': 'Realizar y liderar actividades reflexivas y pedagógicas dentro de la Institución que involucren a los compañeros de las secciones afectadas haciendo énfasis en las consecuencias de los comportamientos inadecuados y promoviendo el respeto al Manual de Convivencia'},
        {'id': 3, nivel: '1', 'accionP': 'Hacer una lectura crítica de un material escrito, audiovisual o de multimedia relacionado al comportamiento inadecuado y realizar un escrito reflexivo que establezca su compromiso de no repetir estas conductas'},
        {'id': 4, nivel: '1', 'accionP': 'Realizar la lectura de obras literarias, cuentos o cómics que permitan vivenciar diferentes situaciones y presentar por escrito su enseñanza'},
        {'id': 5, nivel: '1', 'accionP': 'Planear y ejecutar una campaña que tenga como objetivo la prevención del comportamiento inadecuado'},
        {'id': 6, nivel: '1', 'accionP': 'Creación de material audiovisual que promocione una habilidad para la vida o comportamientos pro sociales'},
        {'id': 7, nivel: '2', 'accionP': 'Actividad socioeducativa como guías, ensayos, cortometrajes, acorde con las acciones cometidas, valiéndose de medios de difusión, como radio escolar, para la socialización de las actividades propuestas'},
        {'id': 8, nivel: '2', 'accionP': 'Socialización de una actividad reeducativa en la sección afectada, según los parámetros establecidos por coordinación'},
        {'id': 9, nivel: '2', 'accionP': 'Desarrollo de talleres educativos en pro del desarrollo de habilidades para la vida'},
        {'id': 10, nivel: '2', 'accionP': 'Realización de actividades de autoformación y reconocimiento de aptitudes y fortalezas, forjando liderazgo positivo en el aula de clase'},
        {'id': 11, nivel: '2', 'accionP': 'Realizar exposiciones sobre las implicaciones legales que existen según la Constitución Política de daños a bienes públicos'},
        {'id': 12, nivel: '2', 'accionP': 'Realizar foros sobre redes sociales y diferentes temáticas que alteren la sana convivencia de la Institución'},
      ]
      this.listaAccionesR = [
        {'id': 1, nivel: '1', 'accionR': 'Reparar los bienes materiales públicos o privados que fueron dañados por el estudiante, por otros, con características similares'},
        {'id': 2, nivel: '1', 'accionR': 'Realizar acciones grupales cuyo objetivo sea pedir disculpas de manera pública a los afectados, cuando la falta haya generado un daño emocional o psicológico'},
        {'id': 3, nivel: '1', 'accionR': 'Realizar mantenimiento que tengan como objetivo devolverle al objeto dañado su estado original cuando se hizo mal uso del mismo'},
        {'id': 4, nivel: '1', 'accionR': 'Realizar labores de aseo y embellecimiento en la Institución, siempre y cuando el bien dañado haya sido público'},
        {'id': 5, nivel: '1', 'accionR': 'Realizar actividades de asistencia a los docentes en las diferentes áreas pedagógicas de la Institución, siempre y cuando estén relacionadas con  la falta cometida y tengan en cuenta la etapa de desarrollo de los estudiantes'},
        {'id': 6, nivel: '1', 'accionR': 'Generar actividades cuyo objetivo sea realizar pactos sociales dentro de la comunidad educativa que busquen la creación de conocimientos, la adaptación y renegociación de reglas de convivencia, actitudes y comportamientos que ayuden al mejoramiento del clima escolar'},
        {'id': 7, nivel: '2', 'accionR': 'Los estudiantes implicados en la falta deben reparar el daño, devolver lo hurtado, dañado o perdido, corregir el daño: pintar, lavar, reparar lo afectado, elaborar carteleras, afiches o pendones deteriorados'},
        {'id': 8, nivel: '2', 'accionR': 'Proyectos transversales que impliquen reconocer la situación y hacer una labor social dentro de la institución'},
        {'id': 9, nivel: '2', 'accionR': 'Realizar actividades de embellecimiento y reparación en la Institución Educativa'},
        {'id': 10, nivel: '2', 'accionR': 'Promover espacios en donde se establezcan actividades para restaurar situaciones cometidas con acompañamiento de docentes y padres de familia o acudientes, según lo establecido por la institución'},
        {'id': 11, nivel: '2', 'accionR': 'Reforzar actividades en el área de ética y valores con el proyecto transversal líderes de paz'},
      ]
    }
  }
</script>