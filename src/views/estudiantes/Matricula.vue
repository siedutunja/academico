<template>
  <div>
    <b-row class="mt-2" v-if="!documentoValido">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="credit-card2-front" aria-hidden="true"></b-icon> CONSULTA ESTUDIANTE</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="3" md="6" v-if="!estudianteMatriculado">
                <b-form-group label="Número de Documento*" label-for="docE" class="etiqueta">
                  <b-form-input id="docE" ref="docE" v-model.trim="docEstudiante" autocomplete="off" maxlength="25" @keydown="soloNumeros"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="12" v-else class="text-center">
                <h5 class="mt-5 mb-3 text-muted">El Estudiante <b><span class="text-info">{{ infoEstudiante.estudiante }}</span></b> con número de documento <b><span class="text-info">{{ infoEstudiante.documento }}</span></b></h5>
                <h4 class="text-primary">SE ENCUENTRA MATRICULADO PARA EL AÑO LECTIVO {{ $store.state.aLectivo }}</h4>
                <h5 class="mt-3 mb-5 text-muted">en: {{ ieVinculada }}</h5>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <div class="float-right text-medium-emphasis text-info" v-if="!estudianteMatriculado">* Campo requerido</div>
            <div>
              <b-button class="small" variant="primary" v-if="!estudianteMatriculado" @click="validarDocumentoEstudiante">Consultar Estudiante</b-button>
              <b-button class="small ml-3" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
            </div>
          </template>
        </b-card>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0 text-center">FORMULARIO DE MATRICULA DE ESTUDIANTE<br> Año Lectivo {{ $store.state.aLectivo }}</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> INFORMACIÓN BÁSICA DEL ESTUDIANTE</h5>
                  </template>
                  <b-card-text>
                    <b-row>
                      <b-col lg="3" md="6">
                        <b-form-group label="Primer Apellido*" label-for="ape1" class="etiqueta">
                          <b-form-input id="ape1" ref="ape1" v-model.trim="$v.infoEstudiante.apellido1.$model" :state="validateStateD('apellido1')" aria-describedby="feedApe1" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                          <b-form-invalid-feedback id="feedApe1" >Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Segundo Apellido" label-for="ape2" class="etiqueta">
                          <b-form-input id="ape2" ref="ape2" v-model.trim="$v.infoEstudiante.apellido2.$model" :state="validateStateD('apellido2')" aria-describedby="feedApe2" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                          <b-form-invalid-feedback id="feedApe2">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Primer Nombre*" label-for="nom1" class="etiqueta">
                          <b-form-input id="nom1" ref="nom1" v-model.trim="$v.infoEstudiante.nombre1.$model" :state="validateStateD('nombre1')" aria-describedby="feedNom1" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                          <b-form-invalid-feedback id="feedNom1">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Segundo Nombre" label-for="nom2" class="etiqueta">
                          <b-form-input id="nom2" ref="nom2" v-model.trim="$v.infoEstudiante.nombre2.$model" :state="validateStateD('nombre2')" aria-describedby="feedNom2" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                          <b-form-invalid-feedback id="feedNom2">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Número de Documento*" label-for="doc" class="etiqueta">
                          <b-form-input id="doc" ref="doc" v-model="infoEstudiante.documento" aria-describedby="feedDoc" autocomplete="off" maxlength="20" disabled @keydown="soloNumeros"></b-form-input>
                          <b-form-invalid-feedback id="feedDoc">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Tipo Documento*" label-for="tipoDoc" class="etiqueta">
                          <b-form-select  id="tipoDoc" ref="tipoDoc" v-model="$v.infoEstudiante.id_tipo_documento.$model" :options="comboTiposDoc" :state="validateStateD('id_tipo_documento')" aria-describedby="feedTipoDoc"></b-form-select>
                          <b-form-invalid-feedback id="feedTipoDoc">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6" md="12">
                        <b-form-group label="Municipio de Expedición del Documento*" label-for="muniDoc" class="etiqueta">
                          <b-form-select  id="muniDoc" ref="muniDoc" v-model="$v.infoEstudiante.id_municipio_documento.$model" :options="comboMunicipios" :state="validateStateD('id_municipio_documento')" aria-describedby="feedMuniDoc"></b-form-select>
                          <b-form-invalid-feedback id="feedMuniDoc">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="3">
                        <b-form-group label="Fecha de Nacimiento*" label-for="fechaN" class="etiqueta">
                          <b-form-input id="fechaN" ref="fechaN" type="date" v-model.trim="$v.infoEstudiante.fecha_nacimiento.$model" :state="validateStateD('fecha_nacimiento')" aria-describedby="feedFechaN"></b-form-input>
                          <b-form-invalid-feedback id="feedFechaN" >Campo requerido.</b-form-invalid-feedback>            
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="3">
                        <b-form-group label="País de Nacimiento*" label-for="pais" class="etiqueta">
                          <b-form-select  id="pais" ref="pais" v-model="$v.infoEstudiante.id_nacionalidad.$model" :options="comboPaises" :state="validateStateD('id_nacionalidad')" aria-describedby="feedPais" @change="infoEstudiante.id_nacionalidad!=='170' ? infoEstudiante.id_municipio_nacimiento='00000' : infoEstudiante.id_municipio_nacimiento=null"></b-form-select>
                          <b-form-invalid-feedback id="feedPais">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6" md="12">
                        <b-form-group label="Municipio de Nacimiento*" label-for="muniNace" class="etiqueta">
                          <b-form-select  id="muniNace" ref="muniNace" v-model="$v.infoEstudiante.id_municipio_nacimiento.$model" :options="comboMunicipios" :state="validateStateD('id_municipio_nacimiento')" aria-describedby="feedMuniNace" :disabled="infoEstudiante.id_nacionalidad==='170' ? false : true"></b-form-select>
                          <b-form-invalid-feedback id="feedMuniNace">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Género*" label-for="genero" class="etiqueta">
                          <b-form-select  id="genero" ref="genero" v-model="$v.infoEstudiante.id_genero.$model" :options="comboGeneros" :state="validateStateD('id_genero')" aria-describedby="feedGenero"></b-form-select>
                          <b-form-invalid-feedback id="feedGenero">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Grupo y Factor RH*" label-for="rh" class="etiqueta">
                          <b-form-select  id="rh" ref="rh" v-model="$v.infoEstudiante.id_rh.$model" :options="comboRhs" :state="validateStateD('id_rh')" aria-describedby="feedRh"></b-form-select>
                          <b-form-invalid-feedback id="feedRh">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Grupo Etnico*" label-for="etnia" class="etiqueta">
                          <b-form-select  id="etnia" ref="etnia" v-model="$v.infoEstudiante.id_etnia.$model" :options="comboEtnias" :state="validateStateD('id_etnia')" aria-describedby="feedEtnia"></b-form-select>
                          <b-form-invalid-feedback id="feedEtnia">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="12">
                        <b-form-group label="Educación Diversa*" label-for="diversa" class="etiqueta">
                          <b-form-select  id="diversa" ref="diversa" v-model="$v.infoEstudiante.id_diversa.$model" :options="comboDiversa" :state="validateStateD('id_diversa')" aria-describedby="feedDiversa"></b-form-select>
                          <b-form-invalid-feedback id="feedDiversa">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6" md="12">
                        <b-form-group label="Discapacidad*" label-for="discapacidad" class="etiqueta">
                          <b-form-select  id="discapacidad" ref="discapacidad" v-model="$v.infoEstudiante.id_discapacidad.$model" :options="comboDiscapacidades" :state="validateStateD('id_discapacidad')" aria-describedby="feedDiscapacidad"></b-form-select>
                          <b-form-invalid-feedback id="feedDiscapacidad">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6" md="12">
                        <b-form-group label="Capacidades Excepcionales*" label-for="capacidades" class="etiqueta">
                          <b-form-select  id="capacidades" ref="capacidades" v-model="$v.infoEstudiante.id_capacidades.$model" :options="comboCapacidades" :state="validateStateD('id_capacidades')" aria-describedby="feedCapacidad"></b-form-select>
                          <b-form-invalid-feedback id="feedCapacidad">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6" md="12">
                        <b-form-group label="Victima Conflicto*" label-for="victima" class="etiqueta">
                          <b-form-select  id="victima" ref="victima" v-model="$v.infoEstudiante.id_victima.$model" :options="comboVictimas" :state="validateStateD('id_victima')" aria-describedby="feedVictima"></b-form-select>
                          <b-form-invalid-feedback id="feedVictima">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6" md="12">
                        <b-form-group label="Eps*" label-for="eps" class="etiqueta">
                          <b-form-select  id="eps" ref="eps" v-model="$v.infoEstudiante.id_eps.$model" :options="comboEps" :state="validateStateD('id_eps')" aria-describedby="feedEps"></b-form-select>
                          <b-form-invalid-feedback id="feedEps">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="12" md="12">
                        <b-form-group label="Describa si tiene una enfermedad o tratamiento especial" label-for="enfermedad" class="etiqueta">
                          <b-form-textarea id="enfermedad" ref="enfermedad" v-model.trim="infoEstudiante.enfermedades" aria-describedby="feedEnfermedad" autocomplete="off" maxlength="255" rows="2"></b-form-textarea>
                          <b-form-invalid-feedback id="feedEnfermedad">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="12">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> INFORMACIÓN DE UBICACIÓN DEL ESTUDIANTE</h5>
                  </template>
                  <b-card-text>
                    <b-row>
                      <b-col lg="6" md="12">
                        <b-form-group label="Dirección Domicilio*" label-for="direccion" class="etiqueta">
                          <b-form-input id="direccion" ref="direccion" v-model.trim="$v.infoEstudiante.direccion.$model" :state="validateStateD('direccion')" aria-describedby="feedDir" autocomplete="off" maxlength="255"></b-form-input>
                          <b-form-invalid-feedback id="feedDir">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Barrio*" label-for="barrio" class="etiqueta">
                          <b-form-input id="barrio" ref="barrio" v-model.trim="$v.infoEstudiante.barrio.$model" :state="validateStateD('barrio')" aria-describedby="feedBarrio" autocomplete="off" maxlength="100"></b-form-input>
                          <b-form-invalid-feedback id="feedBarrio">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Zona*" label-for="zona" class="etiqueta">
                          <b-form-select  id="zona" ref="zona" v-model="$v.infoEstudiante.id_zona.$model" :options="comboZonas" :state="validateStateD('id_zona')" aria-describedby="feedZona"></b-form-select>
                          <b-form-invalid-feedback id="feedZona">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6" md="12">
                        <b-form-group label="Municipio de Domicilio*" label-for="muniDir" class="etiqueta">
                          <b-form-select  id="muniDir" ref="muniDir" v-model="$v.infoEstudiante.id_municipio_direccion.$model" :options="comboMunicipios" :state="validateStateD('id_municipio_direccion')" aria-describedby="feedMuniDir"></b-form-select>
                          <b-form-invalid-feedback id="feedMuniDir">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Estrato*" label-for="estrato" class="etiqueta">
                          <b-form-select  id="estrato" ref="estrato" v-model="$v.infoEstudiante.id_estrato.$model" :options="comboEstratos" :state="validateStateD('id_estrato')" aria-describedby="feedEstrato"></b-form-select>
                          <b-form-invalid-feedback id="feedEstrato">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Grupo Sisben*" label-for="sisben" class="etiqueta">
                          <b-form-select  id="sisben" ref="sisben" v-model="$v.infoEstudiante.id_sisben.$model" :options="comboSisben" :state="validateStateD('id_sisben')" aria-describedby="feedSisben"></b-form-select>
                          <b-form-invalid-feedback id="feedSisben">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Teléfono Principal*" label-for="tel1" class="etiqueta">
                          <b-form-input id="tel1" ref="tel1" v-model.trim="$v.infoEstudiante.telefono1.$model" :state="validateStateD('telefono1')" aria-describedby="feedTel1" autocomplete="off" maxlength="15" @keydown="soloNumeros"></b-form-input>
                          <b-form-invalid-feedback id="feedTel1" >El número debe contener 10 dígitos.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Teléfono Opcional" label-for="tel2" class="etiqueta">
                          <b-form-input id="tel2" ref="tel2" v-model.trim="infoEstudiante.telefono2" aria-describedby="feedTel2" autocomplete="off" maxlength="15" @keydown="soloNumeros"></b-form-input>
                          <b-form-invalid-feedback id="feedTel2" >El número debe contener 10 dígitos.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6" md="12">
                        <b-form-group label="Correo Electrónico" label-for="correo" class="etiqueta">
                          <b-form-input id="correo" ref="correo" v-model.trim="infoEstudiante.correo" aria-describedby="feedCorreo" autocomplete="off" maxlength="50"></b-form-input>
                          <b-form-invalid-feedback id="feedCorreo" >Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="12">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> INFORMACIÓN DE LA MATRICULA</h5>
                  </template>
                  <b-card-text>
                    <b-row>
                      <b-col lg="6">
                        <b-form-group label="Sede*" label-for="sedes" class="etiqueta">
                          <b-form-select  id="sedes" ref="sedes" v-model="$v.infoEstudiante.id_sede.$model" :options="comboSedes" @change="infoEstudiante.id_curso=null,ocuparComboCursosSede()" :state="validateStateD('id_sede')" aria-describedby="feedSede"></b-form-select>
                          <b-form-invalid-feedback id="feedSede">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3">
                        <b-form-group label="Curso*" label-for="cursos" class="etiqueta">
                          <b-form-select  id="cursos" ref="cursos" v-model="$v.infoEstudiante.id_curso.$model" :options="comboCursos" :state="validateStateD('id_curso')" aria-describedby="feedCurso"></b-form-select>
                          <b-form-invalid-feedback id="feedCurso">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3">
                        <b-form-group label="Especialidad*" label-for="especialidad" class="etiqueta">
                          <b-form-select  id="especialidad" ref="especialidad" v-model="$v.infoEstudiante.id_especialidad.$model" :options="comboEspecialidades" :state="validateStateD('id_especialidad')" aria-describedby="feedEspecial"></b-form-select>
                          <b-form-invalid-feedback id="feedEspecial">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="12">
                        <b-form-group label="Estudiante Nuevo*" label-for="nuevo" class="etiqueta">
                          <b-form-select  id="nuevo" ref="nuevo" v-model="$v.infoEstudiante.id_nuevo.$model" :options="comboNuevo" :state="validateStateD('id_nuevo')" aria-describedby="feedNuevo" @change="infoEstudiante.procedencia=null"></b-form-select>
                          <b-form-invalid-feedback id="feedNuevo">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6" md="12">
                        <b-form-group label="Institución de Procedencia" label-for="procedencia" class="etiqueta">
                          <b-form-input id="procedencia" ref="procedencia" v-model.trim="infoEstudiante.procedencia" aria-describedby="feedProcedencia" autocomplete="off" maxlength="100" :disabled="infoEstudiante.id_nuevo ? false : true"></b-form-input>
                          <b-form-invalid-feedback id="feedProcedencia" >Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Repitente*" label-for="repitente" class="etiqueta">
                          <b-form-select  id="repitente" ref="repitente" v-model="$v.infoEstudiante.id_repitente.$model" :options="comboRepitente" :state="validateStateD('id_repitente')" aria-describedby="feedRepite"></b-form-select>
                          <b-form-invalid-feedback id="feedRepite">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3">
                        <b-form-group label="Ruta Trasporte*" label-for="ruta" class="etiqueta">
                          <b-form-select  id="ruta" ref="ruta" v-model="$v.infoEstudiante.id_ruta.$model" :options="comboRutas" :state="validateStateD('id_ruta')" aria-describedby="feedRuta"></b-form-select>
                          <b-form-invalid-feedback id="feedRuta">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="12">
                        <b-form-group label="Seguro*" label-for="seguro" class="etiqueta">
                          <b-form-select  id="seguro" ref="seguro" v-model="$v.infoEstudiante.id_seguro.$model" :options="comboSeguro" :state="validateStateD('id_seguro')" aria-describedby="feedSeguro" @change="infoEstudiante.aseguradora=null"></b-form-select>
                          <b-form-invalid-feedback id="feedSeguro">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6" md="12">
                        <b-form-group label="Aseguradora" label-for="aseguradora" class="etiqueta">
                          <b-form-input id="aseguradora" ref="aseguradora" v-model.trim="infoEstudiante.aseguradora" aria-describedby="feedAsegura" autocomplete="off" maxlength="100" :disabled="infoEstudiante.id_seguro ? false : true"></b-form-input>
                          <b-form-invalid-feedback id="feedAsegura" >Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="12" md="12">
                        <b-form-group label="Observaciones de la Matrícula" label-for="observ" class="etiqueta">
                          <b-form-textarea id="observ" ref="observ" v-model.trim="infoEstudiante.obs_matricula" aria-describedby="feedObserv" autocomplete="off" maxlength="255" rows="2"></b-form-textarea>
                          <b-form-invalid-feedback id="feedObserv">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>

                    </b-row>
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <div class="float-right text-medium-emphasis text-info">* Campo requerido</div>
            <b-button variant="primary" @click="validarDatosFormulario">Matricular Estudiante y Continuar con Información Familiar</b-button>
            <b-button class="ml-3" variant="secondary" @click="cancelarFormulario">Cancelar Matricula</b-button>
          </template>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import { validationMixin } from "vuelidate";
  import { required, minLength } from "vuelidate/lib/validators";
  import { uuid } from 'vue-uuid'

  export default {
    name: 'matricula',
    mixins: [validationMixin],
    components: {
    },
    data () {
      return {
        infoEstudiante: {
          idEstudiante: null,
          documento: null,
          id_tipo_documento: 2,
          id_municipio_documento: '15001',
          nombre1: null,
          nombre2: null,
          apellido1: null,
          apellido2: null,
          fecha_nacimiento: null,
          id_municipio_nacimiento: '15001',
          id_nacionalidad: '170',
          id_genero: null,
          id_rh: 0,
          id_estrato: 3,
          id_sisben: 0,
          id_discapacidad: 0,
          id_capacidades: 0,
          id_etnia: 0,
          id_victima: 0,
          enfermedades: null,
          id_diversa: 0,
          id_eps: '000000',
          direccion: null,
          barrio: null,
          id_municipio_direccion: '15001',
          id_zona: 1,
          telefono1: null,
          telefono2: null,
          correo: null,
          id_papa: null,
          id_mama: null,
          id_acudiente: null,
          id_parentesco: null,
          id_sede: null,
          id_curso: null,
          id_especialidad: null,
          id_nuevo: null,
          procedencia: null,
          id_ruta: null,
          id_seguro: null,
          aseguradora: null,
          obs_matricula: null,
          id_repitente: null,
        },
        comboSedes: [],
        comboCursos: [],
        comboEspecialidades: [],
        comboRutas: [],
        comboNuevo: [{'value': 0, 'text': 'NO'},{'value': 1, 'text': 'SI'}],
        comboSeguro: [{'value': 0, 'text': 'NO'},{'value': 1, 'text': 'SI'}],
        comboRepitente: [{'value': 0, 'text': 'NO'},{'value': 1, 'text': 'SI'}],
        comboTiposDoc: [],
        comboMunicipios: [],
        comboPaises: [],
        comboGeneros: [],
        comboRhs: [],
        comboEstratos: [],
        comboSisben: [],
        comboDiscapacidades: [],
        comboCapacidades: [],
        comboVictimas: [],
        comboEtnias: [],
        comboDiversa: [{'value': 0, 'text': 'NO'},{'value': 1, 'text': 'SI'}],
        comboEps: [],
        comboZonas: [],
        docEstudiante: null,
        documentoValido: false,
        existeEstudiante: false,
        ieVinculada: null,
        estudianteMatriculado: false
      }
    },
    validations: {
      infoEstudiante: {
        documento: { minLength: minLength(7) },
        id_tipo_documento: { required },
        id_municipio_documento: { required },
        nombre1: { required },
        nombre2: { minLength: minLength(0) },
        apellido1: { required },
        apellido2: { minLength: minLength(0) },
        fecha_nacimiento: { required },
        id_municipio_nacimiento: { required },
        id_nacionalidad: { required },
        id_genero: { required },
        id_rh: { required },
        id_estrato: { required },
        id_sisben: { required },
        id_discapacidad: { required },
        id_capacidades: { required },
        id_etnia: { required },
        id_victima: { required },
        id_diversa: { required },
        id_eps: { required },
        direccion: { required },
        barrio: { required },
        id_municipio_direccion: { required },
        id_zona: { required },
        telefono1: { required, minLength: minLength(10) },
        id_sede: { required },
        id_curso: { required },
        id_especialidad: { required },
        id_nuevo: { required },
        id_ruta: { required },
        id_seguro: { required },
        id_repitente: { required },
      }
    },
    methods: {
      validarDatosFormulario() {
        this.$v.infoEstudiante.$touch()
        if (this.$v.infoEstudiante.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          let titulo = 'Matricula Estudiante'
          let pregunta = '¿Esta seguro de realizar la Matricula del Estudiante?'
          this.$bvModal.msgBoxConfirm(pregunta, {
            title: titulo,
            size: '',
            buttonSize: 'sm',
            okVariant: 'success',
            okTitle: 'Si, ' + titulo,
            cancelVariant: 'danger',
            cancelTitle: 'Cancelar',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          })
          .then(value => {
            if (value) {
              this.guardarMatricula()
            }
          })
        }
        return true
      },
      async guardarMatricula() {
        this.infoEstudiante.apellido1 = this.infoEstudiante.apellido1.toUpperCase()
        if (this.infoEstudiante.apellido2 == '' || this.infoEstudiante.apellido2 == null) {
          this.infoEstudiante.apellido2 = null
        } else {
          this.infoEstudiante.apellido2 = this.infoEstudiante.apellido2.toUpperCase()
        }
        this.infoEstudiante.nombre1 = this.infoEstudiante.nombre1.toUpperCase()
        if (this.infoEstudiante.nombre2 == '' || this.infoEstudiante.nombre2 == null) {
          this.infoEstudiante.nombre2 = null
        } else {
          this.infoEstudiante.nombre2 = this.infoEstudiante.nombre2.toUpperCase()
        }
        this.infoEstudiante.barrio = this.infoEstudiante.barrio.toUpperCase()
        if (this.infoEstudiante.telefono2 == '' || this.infoEstudiante.telefono2 == null) {
          this.infoEstudiante.telefono2 == null
        }
        if (this.infoEstudiante.enfermedades == '' || this.infoEstudiante.enfermedades == null) {
          this.infoEstudiante.enfermedades = null
        } else {
          this.infoEstudiante.enfermedades = this.infoEstudiante.enfermedades.toUpperCase()
        }
        if (this.infoEstudiante.obs_matricula == '' || this.infoEstudiante.obs_matricula == null) {
          this.infoEstudiante.obs_matricula = null
        } else {
          this.infoEstudiante.obs_matricula = this.infoEstudiante.obs_matricula.toUpperCase()
        }
        if (this.infoEstudiante.procedencia == '' || this.infoEstudiante.procedencia == null) {
          this.infoEstudiante.procedencia = null
        } else {
          this.infoEstudiante.procedencia = this.infoEstudiante.procedencia.toUpperCase()
        }
        if (this.infoEstudiante.aseguradora == '' || this.infoEstudiante.aseguradora == null) {
          this.infoEstudiante.aseguradora = null
        } else {
          this.infoEstudiante.aseguradora = this.infoEstudiante.aseguradora.toUpperCase()
        }
        this.infoEstudiante.barrio = this.infoEstudiante.barrio.toUpperCase()
        if (this.infoEstudiante.id_papa == null) this.infoEstudiante.id_papa = '99999'
        if (this.infoEstudiante.id_mama == null) this.infoEstudiante.id_mama = '99999'
        if (this.infoEstudiante.id_acudiente == null) {
          this.infoEstudiante.id_acudiente = '99999'
          this.infoEstudiante.id_parentesco = '99999'
        }
        this.infoEstudiante.existeEstudiante = this.existeEstudiante
        if (!this.existeEstudiante) {
          this.infoEstudiante.idEstudiante = uuid.v1()
        }
        //sessionStorage.setItem('idEstud', this.infoEstudiante.idEstudiante)
        this.infoEstudiante.idInstitucion = this.$store.state.idInstitucion
        this.infoEstudiante.idMatricula = uuid.v1()
        sessionStorage.setItem('idMatricula', this.infoEstudiante.idMatricula)
        this.infoEstudiante.aLectivo = this.$store.state.aLectivo
        await axios
        .post(CONFIG.ROOT_PATH + 'academico/matricula', JSON.stringify(this.infoEstudiante), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Matricula Estudiante')
          } else{
            //this.enviarCorreoNuevo()
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'El Estudiante se ha matriculado correctamente.')
            this.$router.push('/estudiantes/matricula2')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Matricula Estudiante. Intente más tarde. ' + err)
        })
      },
      async validarDocumentoEstudiante() {
        let cadena = new String(this.docEstudiante)
        if (cadena.length > 6) {
          await axios
          .get(CONFIG.ROOT_PATH + 'academico/estudiantes/documento', { params: { documento: this.docEstudiante, aLectivo: this.$store.state.aLectivo }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Validar documento estudiante')
            } else{
              if (response.data.datos != 0) {
                if (response.data.datos.institucion != null) {
                  this.estudianteMatriculado = true
                  this.ieVinculada = response.data.datos.institucion
                  this.infoEstudiante = response.data.datos
                  this.docEstudiante = ''
                  this.$refs.docE.focus()
                  this.documentoValido = false
                } else {
                  this.estudianteMatriculado = false
                  this.infoEstudiante = response.data.datos
                  if (this.infoEstudiante.fecha_nacimiento != null && this.infoEstudiante.fecha_nacimiento != '') {
                    this.infoEstudiante.fecha_nacimiento = this.infoEstudiante.fecha_nacimiento.substr(0,10)
                  }
                  this.existeEstudiante = true
                  this.documentoValido = true
                  this.infoEstudiante.id_nuevo = 0
                }
              } else {
                this.infoEstudiante.documento = this.docEstudiante
                this.existeEstudiante = false
                this.documentoValido = true
                this.infoEstudiante.id_repitente = 0
                this.infoEstudiante.id_nuevo = 1
                this.infoEstudiante.id_seguro = 0
              }
            }
          })
          .catch(err => {
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Validar documento estudiante. Intente más tarde. ' + err)
          })
        } else {
          this.docEstudiante = ''
          this.$refs.docE.focus()
          this.documentoValido = false
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'El documento del Estudiante debe contener mínimo 7 dígitos.')
        }
      },
      async ocuparComboEstratos() {
        this.comboEstratos = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listaestratos')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Estratos')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboEstratos.push({ 'value': element.id, 'text': element.estrato.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Estratos. Intente más tarde. ' + err)
        })
      },
      async ocuparComboSisben() {
        this.comboSisben = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listasisben')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Sisben')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboSisben.push({ 'value': element.id, 'text': element.subgrupo.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Sisben. Intente más tarde. ' + err)
        })
      },
      async ocuparComboGeneros() {
        this.comboGeneros = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listageneros')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Generos')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboGeneros.push({ 'value': element.id, 'text': element.genero.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Generos. Intente más tarde. ' + err)
        })
      },
      async ocuparComboRhs() {
        this.comboRhs = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listarhs')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Rhs')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboRhs.push({ 'value': element.id, 'text': element.rh.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Rhs. Intente más tarde. ' + err)
        })
      },
      async ocuparComboPaises() {
        this.comboPaises = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listapaises')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Paises')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboPaises.push({ 'value': element.id, 'text': element.pais.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Paises. Intente más tarde. ' + err)
        })
      },
      async ocuparComboMunicipios() {
        this.comboMunicipios = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listamunicipios')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Municipios')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboMunicipios.push({ 'value': element.id, 'text': element.municipio.toUpperCase() + ' - ' + element.departamento.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Municipios. Intente más tarde. ' + err)
        })
      },
      async ocuparComboTiposDoc() {
        this.comboTiposDoc = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listatiposdocumentos')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Tipos Documento')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboTiposDoc.push({ 'value': element.id, 'text': element.documento.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Tipos Documento. Intente más tarde. ' + err)
        })
      },
      async ocuparComboDiscapacidades() {
        this.comboDiscapacidades = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listadiscapacidades')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Discapacidades')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboDiscapacidades.push({ 'value': element.id, 'text': element.discapacidad.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Discapacidades. Intente más tarde. ' + err)
        })
      },
      async ocuparComboCapacidades() {
        this.comboCapacidades = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listacapacidades')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Capacidades')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboCapacidades.push({ 'value': element.id, 'text': element.capacidad.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Capacidades. Intente más tarde. ' + err)
        })
      },
      async ocuparComboVictimas() {
        this.comboVictimas = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listavictimas')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Victimas')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboVictimas.push({ 'value': element.id, 'text': element.victima.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Victimas. Intente más tarde. ' + err)
        })
      },
      async ocuparComboEtnias() {
        this.comboEtnias = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listaetnias')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Etnias')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboEtnias.push({ 'value': element.id, 'text': element.etnia.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Etnias. Intente más tarde. ' + err)
        })
      },
      async ocuparComboEps() {
        this.comboEps = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listaeps')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Eps')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboEps.push({ 'value': element.id, 'text': element.eps.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Eps. Intente más tarde. ' + err)
        })
      },
      async ocuparComboZonas() {
        this.comboZonas = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listazonas')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Zonas')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboZonas.push({ 'value': element.id, 'text': element.zona.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Zonas. Intente más tarde. ' + err)
        })
      },
      async ocuparComboSedes() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/combo/sedes', {params: {idInstitucion: this.$store.state.idInstitucion, vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Combo sedes')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboSedes.push({ 'value': element.idSedeVigencia, 'text': element.sede.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Combo sedes. Intente más tarde.' + err)
        })
      },
      async ocuparComboCursosSede() {
        this.comboCursos = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/combo/cursossede', {params: {idSede: this.infoEstudiante.id_sede}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Combo Cursos Sede')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboCursos.push({ 'value': element.idCursoGrado, 'text': element.nomenclatura.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Combo Cursos Sede. Intente más tarde.' + err)
        })
      },
      async ocuparComboEspecialidades() {
        this.comboEspecialidades = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/combo/especialidades', {params: {idInstitucion: this.$store.state.idInstitucion}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Combo Especialidades IE')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboEspecialidades.push({ 'value': element.id, 'text': element.especialidad.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Combo Especialidades IE. Intente más tarde.' + err)
        })
      },
      async ocuparComboRutas() {
        this.comboRutas = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/combo/rutas', {params: {idInstitucion: this.$store.state.idInstitucion}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Combo Rutas IE')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboRutas.push({ 'value': element.id, 'text': element.ruta.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Combo Rutas IE. Intente más tarde.' + err)
        })
      },
      cancelarFormulario() {
        this.$router.push('/')
      },
      validateStateD(name) {
        const { $dirty, $error } = this.$v.infoEstudiante[name]
        return $dirty ? !$error : null
      },
      soloLetras(e) {
        let key = window.Event ? e.which : e.keyCode
        if (!((key >= 65 && key <= 90) || (key >= 97 && key <= 122) || (key == 193) || (key == 201) || (key == 205) || (key == 211) || (key == 218) || (key == 225) || (key == 233) || (key == 237) || (key == 243) || (key == 250) || (key == 192) || (key == 32) || (key == 8) || (key == 9) || (key == 37) || (key == 39))) {
            e.preventDefault()
        }
      },
      soloNumeros(e) {
        let key = window.Event ? e.which : e.keyCode
        if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key == 8) || (key == 9) || (key == 37) || (key == 39))) {
            e.preventDefault()
        }
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      if(this.$store.state.idRol == 1 || this.$store.state.idRol == 12) {
        this.ocuparComboTiposDoc()
        this.ocuparComboMunicipios()
        this.ocuparComboPaises()
        this.ocuparComboGeneros()
        this.ocuparComboRhs()
        this.ocuparComboSisben()
        this.ocuparComboEstratos()
        this.ocuparComboDiscapacidades()
        this.ocuparComboCapacidades()
        this.ocuparComboVictimas()
        this.ocuparComboEtnias()
        this.ocuparComboEps()
        this.ocuparComboZonas()
        this.ocuparComboSedes()
        this.ocuparComboEspecialidades()
        this.ocuparComboRutas()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>