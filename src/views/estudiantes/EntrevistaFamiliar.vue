<template>
  <div>
    <b-row>
      <b-col lg="12">
        <b-card>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <h2 class="text-center">FORMULARIO DE ENTREVISTA FAMILIAR</h2>
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
                <table class="table table-striped table-bordered table-hover table-sm">
                  <tbody>
                    <tr>
                      <th colspan="2" style="text-align: left"> INFORMACIÓN DE LA ENTREVISTA</th>
                    </tr>
                    <tr>
                      <td>Fecha de la entrevista</td>
                      <td>
                        <b-form-input type="date" id="fecha" ref="fecha" v-model="$v.datosEntrevista.fecha.$model" :state="validateStateE('fecha')" aria-describedby="feedFecha"></b-form-input>
                        <b-form-invalid-feedback id="feedFecha">Campo requerido.</b-form-invalid-feedback>
                      </td>
                    </tr>
                    <tr>
                      <td class="col-5">Quién reliza la entrevista</td>
                      <td>
                        <b-form-input v-model.trim="$v.datosEntrevista.aplico.$model" :state="validateStateE('aplico')" autocomplete="off" maxlength="60" aria-describedby="feedAplico"></b-form-input>
                        <b-form-invalid-feedback id="feedAplico">Campo requerido.</b-form-invalid-feedback>
                      </td>
                    </tr>
                    <tr>
                      <td>Entrevista respondida por</td>
                      <td>
                        <b-form-input v-model.trim="$v.datosEntrevista.respondio.$model" :state="validateStateE('respondio')" autocomplete="off" maxlength="60" aria-describedby="feedRespondio"></b-form-input>
                        <b-form-invalid-feedback id="feedRespondio">Campo requerido.</b-form-invalid-feedback>
                      </td>
                    </tr>
                    <tr>
                      <th colspan="2" style="text-align: left"> INFORMACIÓN GENERAL DEL ESTUDIANTE</th>
                    </tr>
                    <tr>
                      <td>¿Está en Centro de Protección?</td>
                      <td>
                        <b-form-group>
                          <b-form-select v-model="datosEntrevista.id_centro_proteccion" :options="comboCentrosProteccion"></b-form-select>
                        </b-form-group>
                        <div v-if="datosEntrevista.id_centro_proteccion=='S'">
                          <label class="text-muted"><i>Centro de Protección:</i></label>
                          <b-form-input v-model.trim="datosEntrevista.centro_proteccion" autocomplete="off" maxlength="255"></b-form-input>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>¿Se reconoce como víctima de conflicto armado?</td>
                      <td>
                        <b-form-group>
                          <b-form-select v-model="datosEntrevista.id_victima" :options="comboVictimas"></b-form-select>
                        </b-form-group>
                      </td>
                    </tr>
                    <tr>
                      <td>El estudiante es</td>
                      <td>
                        <b-form-group>
                          <b-form-checkbox class="ml-4 m-2" v-for="campo in camposEs" v-model="camposEsSeleccionados" :key="campo.value" :value="campo.value">
                            {{ campo.text }}
                          </b-form-checkbox>
                        </b-form-group>
                      </td>
                    </tr>
                    <tr>
                      <td>Calidad del sueño</td>
                      <td>
                        <b-form-group>
                          <b-form-checkbox class="ml-4 m-2" v-for="campo in camposSueno" v-model="camposSuenoSeleccionados" :key="campo.value" :value="campo.value">
                            {{ campo.text }}
                          </b-form-checkbox>
                        </b-form-group>
                      </td>
                    </tr>
                    <tr>
                      <td>¿Qué aptitudes tiene?</td>
                      <td>
                        <b-form-group>
                          <b-form-checkbox class="ml-4 m-2" v-for="campo in camposAptitud" v-model="camposAptitudSeleccionados" :key="campo.value" :value="campo.value">
                            {{ campo.text }}
                          </b-form-checkbox>
                        </b-form-group>
                      </td>
                    </tr>
                    <tr>
                      <td>¿Tiene desórdenes alimenticios?</td>
                      <td>
                        <b-form-group>
                          <b-form-select v-model="datosEntrevista.id_desorden_alimenticio" :options="comboDesordenAlimenticio"></b-form-select>
                        </b-form-group>
                        <div v-if="datosEntrevista.id_desorden_alimenticio=='S'">
                          <label class="text-muted"><i>Cual:</i></label>
                          <b-form-input v-model.trim="datosEntrevista.desorden_alimenticio" autocomplete="off" maxlength="255"></b-form-input>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>¿A que alimento es alérgico?</td>
                      <td><b-form-input v-model.trim="datosEntrevista.alergias" autocomplete="off" maxlength="255" placeholder="Ninguno."></b-form-input></td>
                    </tr>
                    <tr>
                      <th colspan="2" style="text-align: left"> SALUD Y BIENESTAR</th>
                    </tr>
                    <tr>
                      <td>EPS, lugar de atención en caso de emergencia</td>
                      <td><b-form-input v-model.trim="datosEntrevista.eps" autocomplete="off" maxlength="255"></b-form-input></td>
                    </tr>
                    <tr>
                      <td>¿Tiene algún diagnóstico médico?</td>
                      <td>
                        <b-form-group>
                          <b-form-select v-model="datosEntrevista.id_diagnostico" :options="comboDiagnostico"></b-form-select>
                        </b-form-group>
                        <div v-if="datosEntrevista.id_diagnostico=='S'">
                          <label class="text-muted"><i>Cual:</i></label>
                          <b-form-input v-model.trim="datosEntrevista.diagnostico" autocomplete="off" maxlength="255"></b-form-input>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>¿Actualmente se encuentra en tratamiento médico?</td>
                      <td>
                        <b-form-group>
                          <b-form-select v-model="datosEntrevista.id_tratamiento" :options="comboTratamiento"></b-form-select>
                        </b-form-group>
                        <div v-if="datosEntrevista.id_tratamiento=='S'">
                          <label class="text-muted"><i>Cual:</i></label>
                          <b-form-input v-model.trim="datosEntrevista.tratamiento" autocomplete="off" maxlength="255"></b-form-input>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>¿Asiste a terapias?</td>
                      <td>
                        <b-form-group>
                          <b-form-select v-model="datosEntrevista.id_terapias" :options="comboTerapias"></b-form-select>
                        </b-form-group>
                        <div v-if="datosEntrevista.id_terapias=='S'">
                          <label class="text-muted"><i>Cuales:</i></label>
                          <b-form-input v-model.trim="datosEntrevista.terapias" autocomplete="off" maxlength="255"></b-form-input>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Presenta dificultades</td>
                      <td>
                        <b-form-group>
                          <b-form-checkbox class="ml-4 m-2" v-for="campo in camposDificultad" v-model="camposDificultadSeleccionados" :key="campo.value" :value="campo.value">
                            {{ campo.text }}
                          </b-form-checkbox>
                        </b-form-group>
                      </td>
                    </tr>
                    <tr>
                      <td>¿Requiere cuidados especiales en salud?</td>
                      <td>
                        <b-form-group>
                          <b-form-select v-model="datosEntrevista.id_cuidados" :options="comboCuidados"></b-form-select>
                        </b-form-group>
                        <div v-if="datosEntrevista.id_cuidados=='S'">
                          <label class="text-muted"><i>Cuales:</i></label>
                          <b-form-input v-model.trim="datosEntrevista.cuidados" autocomplete="off" maxlength="255"></b-form-input>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Enfermedades padecidas</td>
                      <td><b-form-input v-model.trim="datosEntrevista.enfermedades" autocomplete="off" maxlength="255" placeholder="Ninguna."></b-form-input></td>
                    </tr>
                    <tr>
                      <td>¿Cirugías?</td>
                      <td>
                        <b-form-group>
                          <b-form-select v-model="datosEntrevista.id_cirugias" :options="comboCirugias"></b-form-select>
                        </b-form-group>
                        <div v-if="datosEntrevista.id_cirugias=='S'">
                          <label class="text-muted"><i>Cuales:</i></label>
                          <b-form-input v-model.trim="datosEntrevista.cirugias" autocomplete="off" maxlength="255"></b-form-input>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>¿Tiene el esquema de vacunación completo?</td>
                      <td>
                        <b-form-group>
                          <b-form-select v-model="datosEntrevista.id_vacunacion" :options="comboVacunacion"></b-form-select>
                        </b-form-group>
                      </td>
                    </tr>
                    <tr>
                      <td>¿En qué emplea el tiempo libre?</td>
                      <td><b-form-input v-model.trim="datosEntrevista.tiempo_libre" autocomplete="off" maxlength="255"></b-form-input></td>
                    </tr>
                    <tr>
                      <th colspan="2" style="text-align: left"> ENTORNO FAMILIAR</th>
                    </tr>
                    <tr>
                      <td>Número de Hermanos</td>
                      <td><b-form-input type="number" v-model.trim="datosEntrevista.hermanos" autocomplete="off" maxlength="2"></b-form-input></td>
                    </tr>
                    <tr>
                      <td>Lugar que ocupa</td>
                      <td><b-form-input type="number" v-model.trim="datosEntrevista.lugar" autocomplete="off" maxlength="2"></b-form-input></td>
                    </tr>
                    <tr>
                      <th colspan="2" style="text-align: left"> PERSONAS CON QUIENES CONVIVE</th>
                    </tr>
                    <tr>
                      <td>Nombre</td>
                      <td>
                        <b-form-input v-model.trim="datosEntrevista.convive1" autocomplete="off" maxlength="500" placeholder="Persona 1"></b-form-input>
                        <b-form-group>
                          <label class="text-muted mt-3"><i>Parentesco:</i></label>
                          <b-form-checkbox class="ml-4 m-2" v-for="campo in camposParent1" v-model="camposParent1Seleccionados" :key="campo.value" :value="campo.value">
                            {{ campo.text }}
                          </b-form-checkbox>
                        </b-form-group>
                      </td>
                    </tr>
                    <tr>
                      <td>Nombre</td>
                      <td>
                        <b-form-input v-model.trim="datosEntrevista.convive2" autocomplete="off" maxlength="500" placeholder="Persona 2"></b-form-input>
                        <b-form-group>
                          <label class="text-muted mt-3"><i>Parentesco:</i></label>
                          <b-form-checkbox class="ml-4 m-2" v-for="campo in camposParent2" v-model="camposParent2Seleccionados" :key="campo.value" :value="campo.value">
                            {{ campo.text }}
                          </b-form-checkbox>
                        </b-form-group>
                      </td>
                    </tr>
                    <tr>
                      <td>¿La familia recibe subsidio de alguna Entidad o Institución?</td>
                      <td>
                        <b-form-group>
                          <b-form-select v-model="datosEntrevista.id_subsidio" :options="comboSubsidio"></b-form-select>
                        </b-form-group>
                        <div v-if="datosEntrevista.id_subsidio=='S'">
                          <label class="text-muted"><i>Cual:</i></label>
                          <b-form-input v-model.trim="datosEntrevista.subsidio" autocomplete="off" maxlength="255"></b-form-input>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>En las relaciones familiares hay</td>
                      <td>
                        <b-form-group>
                          <b-form-checkbox class="ml-4 m-2" v-for="campo in camposRelFam" v-model="camposRelFamSeleccionados" :key="campo.value" :value="campo.value">
                            {{ campo.text }}
                          </b-form-checkbox>
                        </b-form-group>
                      </td>
                    </tr>
                    <tr>
                      <td>¿Qué actividades comparten en familia?</td>
                      <td><b-form-input v-model.trim="datosEntrevista.actividades_familiares" autocomplete="off" maxlength="255"></b-form-input></td>
                    </tr>
                    <tr>
                      <td>¿En qué momentos?</td>
                      <td><b-form-input v-model.trim="datosEntrevista.momentos" autocomplete="off" maxlength="255"></b-form-input></td>
                    </tr>
                    <tr>
                      <td>¿Con quién(es) se lleva bien?</td>
                      <td><b-form-input v-model.trim="datosEntrevista.se_lleva_bien" autocomplete="off" maxlength="255"></b-form-input></td>
                    </tr>
                    <tr>
                      <td>¿Con quién(es) no se lleva bien?</td>
                      <td><b-form-input v-model.trim="datosEntrevista.no_se_lleva_bien" autocomplete="off" maxlength="255"></b-form-input></td>
                    </tr>
                    <tr>
                      <th colspan="2" style="text-align: left"> RELACIONES SOCIALES</th>
                    </tr>
                    <tr>
                      <td>Maneja buenas relaciones con</td>
                      <td>
                        <b-form-group>
                          <b-form-checkbox class="ml-4 m-2" v-for="campo in camposBuenasRel" v-model="camposBuenasRelSeleccionados" :key="campo.value" :value="campo.value">
                            {{ campo.text }}
                          </b-form-checkbox>
                        </b-form-group>
                      </td>
                    </tr>
                    <tr>
                      <th colspan="2" style="text-align: left"> HISTORIA ESCOLAR</th>
                    </tr>
                    <tr>
                      <td>¿De qué Institución viene?</td>
                      <td><b-form-input v-model.trim="datosEntrevista.ie_viene" autocomplete="off" maxlength="255"></b-form-input></td>
                    </tr>
                    <tr>
                      <td>¿Reinicia el grado actual?</td>
                      <td>
                        <b-form-group>
                          <b-form-select v-model="datosEntrevista.id_reinicia_grado" :options="comboReiniciaGrado"></b-form-select>
                        </b-form-group>
                      </td>
                    </tr>
                    <tr>
                      <td>¿Qué años ha reiniciado?</td>
                      <td>
                        <b-form-group>
                          <b-form-checkbox class="ml-4 m-2" v-for="campo in camposReinicio" v-model="camposReinicioSeleccionados" :key="campo.value" :value="campo.value">
                            {{ campo.text }}
                          </b-form-checkbox>
                        </b-form-group>
                      </td>
                    </tr>
                    <tr>
                      <td>En general, el desempeño académico en el año anterior fue</td>
                      <td>
                        <b-form-group>
                          <b-form-checkbox class="ml-4 m-2" v-for="campo in camposDesemp" v-model="camposDesempSeleccionados" :key="campo.value" :value="campo.value">
                            {{ campo.text }}
                          </b-form-checkbox>
                          {{ camposDesempSeleccionados }}
                        </b-form-group>
                      </td>
                    </tr>
                    <tr>
                      <td>Áreas que se le facilitan</td>
                      <td><b-form-input v-model.trim="datosEntrevista.areas_facilita" autocomplete="off" maxlength="255"></b-form-input></td>
                    </tr>
                    <tr>
                      <td>Áreas que más se le dificultan</td>
                      <td><b-form-input v-model.trim="datosEntrevista.areas_dificulta" autocomplete="off" maxlength="255"></b-form-input></td>
                    </tr>
                    <tr>
                      <td>¿Por qué?</td>
                      <td><b-form-input v-model.trim="datosEntrevista.porque_dificulta" autocomplete="off" maxlength="255"></b-form-input></td>
                    </tr>
                    <tr>
                      <td>¿En el año anterior recibió algún(os) reconocimiento(s)?¿Cuál (es)?</td>
                      <td>
                        <b-form-group>
                          <b-form-select v-model="datosEntrevista.id_reconocimieto" :options="comboReconocimieto"></b-form-select>
                        </b-form-group>
                        <div v-if="datosEntrevista.id_reconocimieto=='S'">
                          <label class="text-muted"><i>Cual:</i></label>
                          <b-form-input v-model.trim="datosEntrevista.reconocimieto" autocomplete="off" maxlength="255"></b-form-input>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Observaciones generales</td>
                      <td><b-form-textarea v-model.trim="datosEntrevista.observaciones" autocomplete="off" rows="5"></b-form-textarea></td>
                    </tr>
                  </tbody>
                </table>
              </b-col>
            </b-row>
            <b-row><b-col lg="12"><hr></b-col></b-row>
            <b-row>
              <b-col lg="12">
                <b-button class="small mx-1 mt-3" variant="primary" @click="validarDatosFormulario">Guardar Entrevista Familiar</b-button>
                <b-button class="small mx-1 mt-3" variant="outline-primary" @click="imprimirEntrevista">Imprimir Entrevista</b-button>
                <b-button class="small mx-1 mt-3" variant="secondary" @click="cancelarFormulario">Cerrar</b-button>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Actualice los datos de la entrevista familiar haciendo clic en el botón Guardar Encuesta.</em>
          </template>
        </b-card>
      </b-col>
    </b-row>
    <div class="Entrevista" id="Entrevista" style="display:none;">
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
        <tbody>
          <tr>
            <th colspan="2" style="text-align: left"> INFORMACIÓN DE LA ENTREVISTA</th>
          </tr>
          <tr>
            <td>Fecha de la entrevista</td><td>{{datosEntrevista.fecha}}</td>
          </tr>
          <tr>
            <td class="col-5">Quién reliza la entrevista</td><td>{{datosEntrevista.aplico}}</td>
          </tr>
          <tr>
            <td>Entrevista respondida por</td><td>{{datosEntrevista.respondio}}</td>
          </tr>
          <tr>
            <th colspan="2" style="text-align: left"> INFORMACIÓN GENERAL DEL ESTUDIANTE</th>
          </tr>
          <tr>
            <td>¿Está en Centro de Protección?¿Dónde?</td><td>{{datosEntrevista.id_centro_proteccion=='S' ? 'SI - ' + datosEntrevista.centro_proteccion : 'NO'}}</td>
          </tr>
          <tr>
            <td>¿Se reconoce como víctima de conflicto armado?</td><td>{{datosEntrevista.id_centro_proteccion=='S' ? 'SI' : 'NO'}}</td>
          </tr>
          <tr>
            <td>El estudiante es</td><td>{{datosEntrevista.cualidades}}</td>
          </tr>
          <tr>
            <td>Calidad del sueño</td><td>{{datosEntrevista.calidad_sueno}}</td>
          </tr>
          <tr>
            <td>¿Qué aptitudes tiene?</td><td>{{datosEntrevista.aptitudes}}</td>
          </tr>
          <tr>
            <td>¿Tiene desórdenes alimenticios?</td><td>{{datosEntrevista.id_desorden_alimenticio=='S' ? 'SI - ' + datosEntrevista.desorden_alimenticio : 'NO'}}</td>
          </tr>
          <tr>
            <td>¿A que alimento es alérgico?</td><td>{{datosEntrevista.alergias}}</td>
          </tr>
          <tr>
            <th colspan="2" style="text-align: left"> SALUD Y BIENESTAR</th>
          </tr>
          <tr>
            <td>EPS, lugar de atención en caso de emergencia</td><td>{{datosEntrevista.eps}}</td>
          </tr>
          <tr>
            <td>¿Tiene algún diagnóstico médico?¿Cuál?</td><td>{{datosEntrevista.id_diagnostico=='S' ? 'SI - ' + datosEntrevista.diagnostico : 'NO'}}</td>
          </tr>
          <tr>
            <td>¿Actualmente se encuentra en tratamiento médico?</td><td>{{datosEntrevista.id_tratamiento=='S' ? 'SI - ' + datosEntrevista.tratamiento : 'NO'}}</td>
          </tr>
          <tr>
            <td>¿Asiste a terapias?</td><td>{{datosEntrevista.id_terapias=='S' ? 'SI - ' + datosEntrevista.terapias : 'NO'}}</td>
          </tr>
          <tr>
            <td>Presenta dificultades</td><td>{{datosEntrevista.dificultades}}</td>
          </tr>
          <tr>
            <td>¿Requiere cuidados especiales en salud?¿Cuál(es)?</td><td>{{datosEntrevista.id_cuidados=='S' ? 'SI - ' + datosEntrevista.cuidados : 'NO'}}</td>
          </tr>
          <tr>
            <td>Enfermedades padecidas</td><td>{{datosEntrevista.enfermedades}}</td>
          </tr>
          <tr>
            <td>¿Cirugías?¿Cuál (es)?</td><td>{{datosEntrevista.id_cirugias=='S' ? 'SI - ' + datosEntrevista.cirugias : 'NO'}}</td>
          </tr>
          <tr>
            <td>¿Tiene el esquema de vacunación completo?</td><td>{{datosEntrevista.id_vacunacion=='S' ? 'SI' : 'NO'}}</td>
          </tr>
          <tr>
            <td>¿En qué emplea el tiempo libre?</td><td>{{datosEntrevista.tiempo_libre}}</td>
          </tr>
          <tr>
            <th colspan="2" style="text-align: left"> ENTORNO FAMILIAR</th>
          </tr>
          <tr>
            <td>Número de Hermanos</td><td>{{datosEntrevista.hermanos}}</td>
          </tr>
          <tr>
            <td>Lugar que ocupa</td><td>{{datosEntrevista.lugar}}</td>
          </tr>
          <tr>
            <th colspan="2" style="text-align: left"> PERSONAS CON QUIENES CONVIVE</th>
          </tr>
          <tr>
            <td>Nombre (Parentesco)</td><td>{{datosEntrevista.convive1 != null ? datosEntrevista.convive1 + ' - ' + datosEntrevista.parentesco1 : ''}}</td>
          </tr>
          <tr>
            <td>Nombre (Parentesco)</td><td>{{datosEntrevista.convive2 != null ? datosEntrevista.convive2 + ' - ' + datosEntrevista.parentesco2 : ''}}</td>
          </tr>
          <tr>
            <td>¿La familia recibe subsidio de alguna Entidad o Institución?¿Cuál?</td><td>{{datosEntrevista.id_subsidio=='S' ? 'SI - ' + datosEntrevista.subsidio : 'NO'}}</td>
          </tr>
          <tr>
            <td>En las relaciones familiares hay</td><td>{{datosEntrevista.relacion_familiar}}</td>
          </tr>
          <tr>
            <td>¿Qué actividades comparten en familia?</td><td>{{datosEntrevista.actividades_familiares}}</td>
          </tr>
          <tr>
            <td>¿En qué momentos?</td><td>{{datosEntrevista.momentos}}</td>
          </tr>
          <tr>
            <td>¿Con quién(es) se lleva bien?</td><td>{{datosEntrevista.se_lleva_bien}}</td>
          </tr>
          <tr>
            <td>¿Con quién(es) no se lleva bien?</td><td>{{datosEntrevista.no_se_lleva_bien}}</td>
          </tr>
          <tr>
            <th colspan="2" style="text-align: left"> RELACIONES SOCIALES</th>
          </tr>
          <tr>
            <td>Maneja buenas relaciones con</td><td>{{datosEntrevista.buenas_relaciones}}</td>
          </tr>
          <tr>
            <th colspan="2" style="text-align: left"> HISTORIA ESCOLAR</th>
          </tr>
          <tr>
            <td>¿De qué Institución viene?</td><td>{{datosEntrevista.ie_viene}}</td>
          </tr>
          <tr>
            <td>¿Reinicia el grado actual?</td><td>{{datosEntrevista.id_reinicia_grado=='S' ? 'SI' : 'NO'}}</td>
          </tr>
          <tr>
            <td>¿Qué años ha reiniciado?</td><td>{{datosEntrevista.anos_reinicio}}</td>
          </tr>
          <tr>
            <td>En general, el desempeño académico en el año anterior fue</td><td>{{datosEntrevista.desempeno_anterior}}</td>
          </tr>
          <tr>
            <td>Áreas que se le facilitan</td><td>{{datosEntrevista.areas_facilita}}</td>
          </tr>
          <tr>
            <td>Áreas que más se le dificultan</td><td>{{datosEntrevista.areas_dificulta}}</td>
          </tr>
          <tr>
            <td>¿Por qué?</td><td>{{datosEntrevista.porque_dificulta}}</td>
          </tr>
          <tr>
            <td>¿En el año anterior recibió algún(os) reconocimiento(s)?¿Cuál (es)?</td><td>{{datosEntrevista.id_reconocimieto=='S' ? 'SI - ' + datosEntrevista.reconocimieto : 'NO'}}</td>
          </tr>
          <tr>
            <td>Observaciones generales</td><td>{{datosEntrevista.observaciones}}</td>
          </tr>
        </tbody>
      </table>
      <table>
        <tr>
          <td style="border: hidden">
            <p style="text-align: center;"><br><br>_______________________________________<br>Director(a) de Curso</p>
          </td>
          <td style="border: hidden">
            <p style="text-align: center;"><br><br>_______________________________________<br>Estudiante</p>
          </td>
          <td style="border: hidden">
            <p style="text-align: center;"><br><br>_______________________________________<br>Padre/Madre/Acudiente</p>
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
    name: 'entrevistafamiliar',
    mixins: [validationMixin],
    components: {
      VueGoodTable
    },
    data () {
      return {
        idEstudiante: null,
        idMatricula: null,
        datosFichaE: {},
        datosEntrevista: {
          id: null,
          id_estudiante: null,
          fecha: null,
          aplico: this.$store.state.Persona,
          respondio: null,
          id_centro_proteccion: 'N',
          centro_proteccion: null,
          id_victima: 'N',
          cualidades: null,
          calidad_sueno: null,
          aptitudes: null,
          id_desorden_alimenticio: 'N',
          desorden_alimenticio: null,
          alergias: null,
          eps: null,
          id_diagnostico: 'N',
          diagnostico: null,
          id_tratamiento: 'N',
          tratamiento: null,
          id_terapias: 'N',
          terapias: null,
          dificultades	: null,
          id_cuidados: 'N',
          cuidados: null,
          enfermedades: null,
          id_cirugias: 'N',
          cirugias: null,
          id_vacunacion: 'N',
          tiempo_libre: null,
          hermanos: null,
          lugar: null,
          convive1: null,
          parentesco1: null,
          convive2: null,
          parentesco2: null,
          id_subsidio: 'N',
          subsidio: null,
          relacion_familiar: null,
          actividades_familiares: null,
          momentos: null,
          se_lleva_bien: null,
          no_se_lleva_bien: null,
          buenas_relaciones: null,
          ie_viene: null,
          id_reinicia_grado: 'N',
          anos_reinicio: null,
          desempeno_anterior: null,
          areas_facilita: null,
          areas_dificulta: null,
          porque_dificulta: null,
          id_reconocimieto: 'N',
          reconocimieto: null,
          observaciones: null,
          creado: null,
          actualizado: null,
        },
        fechaImprimir: null,
        botonGuardando: false,
        comboCentrosProteccion: [],
        comboVictimas: [],
        camposEs: [],
        camposEsSeleccionados: [],
        camposSueno: [],
        camposSuenoSeleccionados: [],
        camposAptitud: [],
        camposAptitudSeleccionados: [],
        comboDesordenAlimenticio: [],
        comboDiagnostico: [],
        comboTratamiento: [],
        comboTerapias: [],
        camposDificultad: [],
        camposDificultadSeleccionados: [],
        comboCuidados: [],
        comboCirugias: [],
        comboVacunacion: [],
        camposParent1: [],
        camposParent2: [],
        camposParent1Seleccionados: [],
        camposParent2Seleccionados: [],
        comboSubsidio: [],
        camposRelFam: [],
        camposRelFamSeleccionados: [],
        camposBuenasRel: [],
        camposBuenasRelSeleccionados: [],
        comboReiniciaGrado: [],
        camposReinicio: [],
        camposReinicioSeleccionados: [],
        camposDesemp: [],
        camposDesempSeleccionados: [],
        comboReconocimieto: [],
      }
    },
    validations: {
      datosEntrevista: {
        fecha: { required },
        aplico: { required, minLength: minLength(5) },
        respondio: { required, minLength: minLength(5) },
      }
    },
    methods: {
      imprimirEntrevista() {
        document.getElementById("Entrevista").style.display = "block";
        // Crear una nueva ventana para imprimir
        const printWindow = window.open("Entrevista", "_blank");

        // Obtener el contenido HTML de la tabla
        const tableHtml = document.querySelector(".Entrevista").outerHTML;

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
              <title>Entrevista Familiar</title>
              ${style}
            </head>
            <body>
              <div style="float: left; margin-top: -1px;">
                <img src="https://siedutunja.gov.co/api/colegios/escudos/${this.$store.state.escudoInstitucion}" style="width:60px;height:60px;"></img>
              </div>
              <div style="margin-left: -60px">
                <p style="text-align: center; font-size: 10px;">SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA<br><b>${this.$store.state.nombreInstitucion}</b><br>TUNJA -BOYACÁ<br><br><b>ENTREVISTA FAMILIAR DEL ESTUDIANTE - AÑO LECTIVO ${this.$store.state.aLectivo}</p>
              </div>
              ${tableHtml}
            </body>
          </html>
        `);

        // Iniciar la impresión y cerrar la ventana
        //printWindow.document.close();
        //printWindow.print();
        document.getElementById("Entrevista").style.display = "none";
      },
      validarDatosFormulario() {
        this.$v.datosEntrevista.$touch()
        if (this.$v.datosEntrevista.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          let titulo = 'Actualizar Entrevista Familiar'
          let pregunta = '¿Esta seguro de actualizar los datos de la Entrevista Familiar'
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
              this.guardarEntrevista()
            }
          })
        }
        return true
      },
      async guardarEntrevista() {
        this.datosEntrevista.id_estudiante = this.idEstudiante
        this.datosEntrevista.cualidades = JSON.stringify(this.camposEsSeleccionados)
        this.datosEntrevista.calidad_sueno = JSON.stringify(this.camposSuenoSeleccionados)
        this.datosEntrevista.aptitudes = JSON.stringify(this.camposAptitudSeleccionados)
        this.datosEntrevista.dificultades = JSON.stringify(this.camposDificultadSeleccionados)
        this.datosEntrevista.parentesco1 = JSON.stringify(this.camposParent1Seleccionados)
        this.datosEntrevista.parentesco2 = JSON.stringify(this.camposParent2Seleccionados)
        this.datosEntrevista.relacion_familiar = JSON.stringify(this.camposRelFamSeleccionados)
        this.datosEntrevista.buenas_relaciones = JSON.stringify(this.camposBuenasRelSeleccionados)
        this.datosEntrevista.anos_reinicio = JSON.stringify(this.camposReinicioSeleccionados)
        this.datosEntrevista.desempeno_anterior = JSON.stringify(this.camposDesempSeleccionados)

        await axios
        .put(CONFIG.ROOT_PATH + 'academico/entrevistafamiliar', JSON.stringify(this.datosEntrevista), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Entrevista')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'La Entrevista Familiar del Estudiante se ha actualizado satisfactoriamente.')
            this.botonGuardando = false
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Entrevista. Intente más tarde. ' + err)
        })
      },
      cancelarFormulario() {
        this.$emit("retorno", 0)
      },
      async consultaEntrevista() {
        this.datosFichaE = {}
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/entrevistafamiliar', { params: { idEstudiante: this.idEstudiante, idMatricula: this.idMatricula }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Entrevista')
          } else{
            if (response.data.datos != 0) {
              this.datosFichaE = response.data.datos
              if (this.datosFichaE.entrevista.length) {
                this.datosEntrevista = this.datosFichaE.entrevista[0]
                if (this.datosEntrevista.fecha != null) {
                  this.datosEntrevista.fecha = this.datosEntrevista.fecha.substr(0,10)
                }
                this.camposEsSeleccionados = this.datosEntrevista.cualidades !== null ? JSON.parse(this.datosEntrevista.cualidades) : []
                this.camposSuenoSeleccionados = this.datosEntrevista.calidad_sueno !== null ? JSON.parse(this.datosEntrevista.calidad_sueno) : []
                this.camposAptitudSeleccionados = this.datosEntrevista.aptitudes !== null ? JSON.parse(this.datosEntrevista.aptitudes) : []
                this.camposDificultadSeleccionados = this.datosEntrevista.dificultades !== null ? JSON.parse(this.datosEntrevista.dificultades) : []
                this.camposParent1Seleccionados = this.datosEntrevista.parentesco1 !== null ? JSON.parse(this.datosEntrevista.parentesco1) : []
                this.camposParent2Seleccionados = this.datosEntrevista.parentesco2 !== null ? JSON.parse(this.datosEntrevista.parentesco2) : []
                this.camposRelFamSeleccionados = this.datosEntrevista.relacion_familiar !== null ? JSON.parse(this.datosEntrevista.relacion_familiar) : []
                this.camposBuenasRelSeleccionados = this.datosEntrevista.buenas_relaciones !== null ? JSON.parse(this.datosEntrevista.buenas_relaciones) : []
                this.camposReinicioSeleccionados = this.datosEntrevista.anos_reinicio !== null ? JSON.parse(this.datosEntrevista.anos_reinicio) : []
                this.camposDesempSeleccionados = this.datosEntrevista.desempeno_anterior !== null ? JSON.parse(this.datosEntrevista.desempeno_anterior) : []
              }
              /*
              if (this.datosFichaE.foto == null || this.datosFichaE.foto == '') {
                this.datosFichaE.foto = CONFIG.FOTO
              }
              */  
            } else {
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'No se encontró la Entrevista Familiar del Estudiante')
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Entrevista. Intente más tarde.' + err)
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
        this.comboCentrosProteccion = []
        this.$store.state.datosTablas.sino.forEach(element => {
          this.comboCentrosProteccion.push({ 'value': element.id, 'text': element.sino.toUpperCase() })
        })
        this.comboVictimas = []
        this.$store.state.datosTablas.sino.forEach(element => {
          this.comboVictimas.push({ 'value': element.id, 'text': element.sino.toUpperCase() })
        })
        this.comboDesordenAlimenticio = []
        this.$store.state.datosTablas.sino.forEach(element => {
          this.comboDesordenAlimenticio.push({ 'value': element.id, 'text': element.sino.toUpperCase() })
        })
        this.comboDiagnostico = []
        this.$store.state.datosTablas.sino.forEach(element => {
          this.comboDiagnostico.push({ 'value': element.id, 'text': element.sino.toUpperCase() })
        })
        this.comboTratamiento = []
        this.$store.state.datosTablas.sino.forEach(element => {
          this.comboTratamiento.push({ 'value': element.id, 'text': element.sino.toUpperCase() })
        })
        this.comboTerapias = []
        this.$store.state.datosTablas.sino.forEach(element => {
          this.comboTerapias.push({ 'value': element.id, 'text': element.sino.toUpperCase() })
        })
        this.comboCuidados = []
        this.$store.state.datosTablas.sino.forEach(element => {
          this.comboCuidados.push({ 'value': element.id, 'text': element.sino.toUpperCase() })
        })
        this.comboCirugias = []
        this.$store.state.datosTablas.sino.forEach(element => {
          this.comboCirugias.push({ 'value': element.id, 'text': element.sino.toUpperCase() })
        })
        this.comboVacunacion = []
        this.$store.state.datosTablas.sino.forEach(element => {
          this.comboVacunacion.push({ 'value': element.id, 'text': element.sino.toUpperCase() })
        })
        this.comboSubsidio = []
        this.$store.state.datosTablas.sino.forEach(element => {
          this.comboSubsidio.push({ 'value': element.id, 'text': element.sino.toUpperCase() })
        })
        this.comboReiniciaGrado = []
        this.$store.state.datosTablas.sino.forEach(element => {
          this.comboReiniciaGrado.push({ 'value': element.id, 'text': element.sino.toUpperCase() })
        })
        this.comboReconocimieto = []
        this.$store.state.datosTablas.sino.forEach(element => {
          this.comboReconocimieto.push({ 'value': element.id, 'text': element.sino.toUpperCase() })
        })
      },
      validateStateE(name) {
        const { $dirty, $error } = this.$v.datosEntrevista[name]
        return $dirty ? !$error : null
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.idEstudiante = this.$store.state.idEstudiante
      this.idMatricula = this.$store.state.idMatricula
      this.consultaEntrevista()
      this.ocuparCombos()
      this.camposEs = [
        { value: 'Sociable', text: 'Sociable' },
        { value: 'Comunicativo', text: 'Comunicativo' },
        { value: 'Empático', text: 'Empático' },
        { value: 'Se valora a sí mismo', text: 'Se valora a sí mismo'},
        { value: 'Colaborador', text: 'Colaborador' },
        { value: 'Tranquilo', text: 'Tranquilo' },
        { value: 'Afectuoso', text: 'Afectuoso' },
        { value: 'Inquieto', text: 'Inquieto' },
        { value: 'Ansioso', text: 'Ansioso' },
        { value: 'Obediente', text: 'Obediente' },
        { value: 'Emotivo', text: 'Emotivo' },
        { value: 'Timido', text: 'Timido' },
        { value: 'Agresivo', text: 'Agresivo' },
        { value: 'Sensible', text: 'Sensible' },
      ]
      this.camposSueno = [
        { value: 'Tranquilo', text: 'Tranquilo' },
        { value: 'Insomnio', text: 'Insomnio' },
        { value: 'Pesadillas', text: 'Pesadillas' },
        { value: 'Temores nocturnos', text: 'Temores nocturnos' },
      ]
      this.camposAptitud = [
        { value: 'Deportivas', text: 'Deportivas' },
        { value: 'Artísticas', text: 'Artísticas' },
        { value: 'Liderazgo', text: 'Liderazgo' },
        { value: 'Tecnológicas', text: 'Tecnológicas' },
      ]
      this.camposDificultad = [
        { value: 'Sensoriales', text: 'Sensoriales' },
        { value: 'Motoras', text: 'Motoras' },
        { value: 'Del lenguaje', text: 'Del lenguaje' },
        { value: 'Psicológicas', text: 'Psicológicas' },
        { value: 'Cognitivas', text: 'Cognitivas' },
        { value: 'Otras', text: 'Otras' },
      ]
      this.camposParent1 = [
        { value: 'Madre', text: 'Madre' },
        { value: 'Padre', text: 'Padre' },
        { value: 'Abuelo(a)', text: 'Abuelo(a)' },
        { value: 'Tio(a)', text: 'Tio(a)' },
        { value: 'Hermano(a)', text: 'Hermano(a)' },
        { value: 'Amigo(a)', text: 'Amigo(a)' },
        { value: 'Pareja - Conyugue', text: 'Pareja - Conyugue' },
        { value: 'Otro', text: 'Otro' },
      ]
      this.camposParent2 = [
        { value: 'Madre', text: 'Madre' },
        { value: 'Padre', text: 'Padre' },
        { value: 'Abuelo(a)', text: 'Abuelo(a)' },
        { value: 'Tio(a)', text: 'Tio(a)' },
        { value: 'Hermano(a)', text: 'Hermano(a)' },
        { value: 'Amigo(a)', text: 'Amigo(a)' },
        { value: 'Pareja - Conyugue', text: 'Pareja - Conyugue' },
        { value: 'Otro', text: 'Otro' },
      ]
      this.camposRelFam = [
        { value: 'Respeto', text: 'Respeto' },
        { value: 'Cercanía', text: 'Cercanía' },
        { value: 'Autoridad', text: 'Autoridad' },
        { value: 'Diálogo', text: 'Diálogo' },
        { value: 'Disciplina', text: 'Disciplina' },
        { value: 'Normas', text: 'Normas' },
        { value: 'Limites', text: 'Limites' },
        { value: 'Solidaridad', text: 'Solidaridad' },
      ]
      this.camposBuenasRel = [
        { value: 'Profesores', text: 'Profesores' },
        { value: 'Compañeros', text: 'Compañeros' },
        { value: 'Vecinos', text: 'Vecinos' },
      ]
      this.camposReinicio = [
        { value: 'PRIMERO', text: 'PRIMERO' },
        { value: 'SEGUNDO', text: 'SEGUNDO' },
        { value: 'TERCERO', text: 'TERCERO' },
        { value: 'CUARTO', text: 'CUARTO' },
        { value: 'QUINTO', text: 'QUINTO' },
        { value: 'SEXTO', text: 'SEXTO' },
        { value: 'SEPTIMO', text: 'SEPTIMO' },
        { value: 'OCTAVO', text: 'OCTAVO' },
        { value: 'NOVENO', text: 'NOVENO' },
        { value: 'DECIMO', text: 'DECIMO' },
        { value: 'ONCE', text: 'ONCE' },
        { value: 'OTRO', text: 'OTRO' },
      ]
      this.camposDesemp = [
        { value: 'Superior', text: 'Superior' },
        { value: 'Alto', text: 'Alto' },
        { value: 'Básico', text: 'Básico' },
        { value: 'Bajo', text: 'Bajo' },
      ]
      this.fechaImprimir = new Date().toLocaleString()
    }
  }
</script>