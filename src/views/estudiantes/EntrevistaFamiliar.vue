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
                      <td>¿Está en Centro de Protección?¿Dónde?</td>
                      <td><b-form-input v-model.trim="datosEntrevista.centro_proteccion" autocomplete="off" maxlength="255"></b-form-input></td>
                    </tr>
                    <tr>
                      <td>¿Se reconoce como víctima de conflicto armado?</td>
                      <td><b-form-input v-model.trim="datosEntrevista.victima" autocomplete="off" maxlength="255"></b-form-input></td>
                    </tr>
                    <tr>
                      <td>El estudiante es</td>
                      <td><b-form-input v-model.trim="datosEntrevista.cualidades" autocomplete="off" maxlength="255"></b-form-input></td>
                    </tr>
                    <tr>
                      <td>Calidad del sueño</td>
                      <td><b-form-input v-model.trim="datosEntrevista.calidad_sueno" autocomplete="off" maxlength="255"></b-form-input></td>
                    </tr>
                    <tr>
                      <td>¿Qué aptitudes tiene?</td>
                      <td><b-form-input v-model.trim="datosEntrevista.aptitudes" autocomplete="off" maxlength="255"></b-form-input></td>
                    </tr>
                    <tr>
                      <td>¿Tiene desórdenes alimenticios?</td>
                      <td><b-form-input v-model.trim="datosEntrevista.desorden_alimenticio" autocomplete="off" maxlength="255"></b-form-input></td>
                    </tr>
                    <tr>
                      <td>¿A que alimento es alérgico?</td>
                      <td><b-form-input v-model.trim="datosEntrevista.alergias" autocomplete="off" maxlength="255"></b-form-input></td>
                    </tr>
                    <tr>
                      <th colspan="2" style="text-align: left"> SALUD Y BIENESTAR</th>
                    </tr>
                    <tr>
                      <td>EPS, lugar de atención en caso de emergencia</td>
                      <td><b-form-input v-model.trim="datosEntrevista.eps" autocomplete="off" maxlength="255"></b-form-input></td>
                    </tr>
                    <tr>
                      <td>¿Tiene algún diagnóstico médico?¿Cuál?</td>
                      <td><b-form-input v-model.trim="datosEntrevista.diagnostico" autocomplete="off" maxlength="255"></b-form-input></td>
                    </tr>
                    <tr>
                      <td>¿Actualmente se encuentra en tratamiento médico?</td>
                      <td><b-form-input v-model.trim="datosEntrevista.tratamiento" autocomplete="off" maxlength="255"></b-form-input></td>
                    </tr>
                    <tr>
                      <td>¿Asiste a terapias?</td>
                      <td><b-form-input v-model.trim="datosEntrevista.terapias" autocomplete="off" maxlength="255"></b-form-input></td>
                    </tr>
                    <tr>
                      <td>Presenta dificultades</td>
                      <td><b-form-input v-model.trim="datosEntrevista.dificultades" autocomplete="off" maxlength="255"></b-form-input></td>
                    </tr>
                    <tr>
                      <td>¿Requiere cuidados especiales en salud?¿Cuál(es)?</td>
                      <td><b-form-input v-model.trim="datosEntrevista.cuidados" autocomplete="off" maxlength="255"></b-form-input></td>
                    </tr>
                    <tr>
                      <td>Enfermedades padecidas</td>
                      <td><b-form-input v-model.trim="datosEntrevista.enfermedades" autocomplete="off" maxlength="255"></b-form-input></td>
                    </tr>
                    <tr>
                      <td>¿Cirugías?¿Cuál (es)?</td>
                      <td><b-form-input v-model.trim="datosEntrevista.cirugias" autocomplete="off" maxlength="255"></b-form-input></td>
                    </tr>
                    <tr>
                      <td>¿Tiene el esquema de vacunación completo?</td>
                      <td><b-form-input v-model.trim="datosEntrevista.vacunacion" autocomplete="off" maxlength="255"></b-form-input></td>
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
                      <td>Nombre (Parentesco)</td>
                      <td><b-form-input v-model.trim="datosEntrevista.convive" autocomplete="off" maxlength="500"></b-form-input></td>
                    </tr>
                    <tr>
                      <td>¿La familia recibe subsidio de alguna Entidad o Institución?¿Cuál?</td>
                      <td><b-form-input v-model.trim="datosEntrevista.subsidio" autocomplete="off" maxlength="255"></b-form-input></td>
                    </tr>
                    <tr>
                      <td>En las relaciones familiares hay</td>
                      <td><b-form-input v-model.trim="datosEntrevista.relacion_familiar" autocomplete="off" maxlength="255"></b-form-input></td>
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
                      <td><b-form-input v-model.trim="datosEntrevista.buenas_relaciones" autocomplete="off" maxlength="255"></b-form-input></td>
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
                      <td><b-form-input v-model.trim="datosEntrevista.reinicia_grado" autocomplete="off" maxlength="255"></b-form-input></td>
                    </tr>
                    <tr>
                      <td>¿Qué años ha reiniciado?</td>
                      <td><b-form-input v-model.trim="datosEntrevista.anos_reinicio" autocomplete="off" maxlength="255"></b-form-input></td>
                    </tr>
                    <tr>
                      <td>En general, el desempeño académico en el año anterior fue</td>
                      <td><b-form-input v-model.trim="datosEntrevista.desempeno_anterior" autocomplete="off" maxlength="255"></b-form-input></td>
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
                      <td><b-form-input v-model.trim="datosEntrevista.reconocimieto" autocomplete="off" maxlength="255"></b-form-input></td>
                    </tr>
                    <tr>
                      <td>Observaciones generales</td>
                      <td><b-form-input v-model.trim="datosEntrevista.observaciones" autocomplete="off" maxlength="255"></b-form-input></td>
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
            <td>¿Está en Centro de Protección?¿Dónde?</td><td>{{datosEntrevista.centro_proteccion}}</td>
          </tr>
          <tr>
            <td>¿Se reconoce como víctima de conflicto armado?</td><td>{{datosEntrevista.victima}}</td>
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
            <td>¿Tiene desórdenes alimenticios?</td><td>{{datosEntrevista.desorden_alimenticio}}</td>
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
            <td>¿Tiene algún diagnóstico médico?¿Cuál?</td><td>{{datosEntrevista.diagnostico}}</td>
          </tr>
          <tr>
            <td>¿Actualmente se encuentra en tratamiento médico?</td><td>{{datosEntrevista.tratamiento}}</td>
          </tr>
          <tr>
            <td>¿Asiste a terapias?</td><td>{{datosEntrevista.terapias}}</td>
          </tr>
          <tr>
            <td>Presenta dificultades</td><td>{{datosEntrevista.dificultades}}</td>
          </tr>
          <tr>
            <td>¿Requiere cuidados especiales en salud?¿Cuál(es)?</td><td>{{datosEntrevista.cuidados}}</td>
          </tr>
          <tr>
            <td>Enfermedades padecidas</td><td>{{datosEntrevista.enfermedades}}</td>
          </tr>
          <tr>
            <td>¿Cirugías?¿Cuál (es)?</td><td>{{datosEntrevista.cirugias}}</td>
          </tr>
          <tr>
            <td>¿Tiene el esquema de vacunación completo?</td><td>{{datosEntrevista.vacunacion}}</td>
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
            <td>Nombre (Parentesco)</td><td>{{datosEntrevista.convive}}</td>
          </tr>
          <tr>
            <td>¿La familia recibe subsidio de alguna Entidad o Institución?¿Cuál?</td><td>{{datosEntrevista.subsidio}}</td>
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
            <td>¿Reinicia el grado actual?</td><td>{{datosEntrevista.reinicia_grado}}</td>
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
            <td>¿En el año anterior recibió algún(os) reconocimiento(s)?¿Cuál (es)?</td><td>{{datosEntrevista.reconocimieto}}</td>
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
          centro_proteccion: null,
          victima: null,
          cualidades: null,
          calidad_sueno: null,
          aptitudes: null,
          desorden_alimenticio: null,
          alergias: null,
          eps: null,
          diagnostico: null,
          tratamiento: null,
          terapias: null,
          dificultades	: null,
          cuidados: null,
          enfermedades: null,
          cirugias: null,
          vacunacion: null,
          tiempo_libre: null,
          hermanos: null,
          lugar: null,
          convive: null,
          subsidio: null,
          relacion_familiar: null,
          actividades_familiares: null,
          momentos: null,
          se_lleva_bien: null,
          no_se_lleva_bien: null,
          buenas_relaciones: null,
          ie_viene: null,
          reinicia_grado: null,
          anos_reinicio: null,
          desempeno_anterior: null,
          areas_facilita: null,
          areas_dificulta: null,
          porque_dificulta: null,
          reconocimieto: null,
          observaciones: null,
          creado: null,
          actualizado: null,
        },
        fechaImprimir: null,
        botonGuardando: false,
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
        this.comboTiposObservacion = []
        this.$store.state.datosTablas.tiposobservacion.forEach(element => {
          this.comboTiposObservacion.push({ 'value': element.id, 'text': element.tipoobservacion.toUpperCase() })
        })
        this.comboEstadosSeguimiento = []
        this.$store.state.datosTablas.estadosseguimiento.forEach(element => {
          this.comboEstadosSeguimiento.push({ 'value': element.id, 'text': element.estadoseguimiento.toUpperCase() })
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
      this.fechaImprimir = new Date().toLocaleString()
    }
  }
</script>