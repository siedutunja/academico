<template>
  <div>
    <b-row v-if="estadoDocumento>0">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> VALIDACIÓN DEL DOCUMENTO DEL ESTUDIANTE</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <b-alert show variant="info" class="p-5" v-if="estadoDocumento==1">
                  <h5 class="mb-5"><b>¡Confirmamos que!</b></h5>
                  <h5 class="mb-3">El número de documento <span class="text-info"><b>({{ docEstudiante }})</b></span> ya se encuentra registrado en el sistema sieduTunja.</h5>
                  <h5 class="mb-3">El número de documento corresponde a: {{ estudianteEncontrado }}.</h5>
                  <h5 class="mb-3">En el momento el estudiante NO SE ENCUENTRA VINCULADO a otra Institución Educativa Oficial de Tunja.</h5>
                  <h5 class="mb-3">Para matricularlo en esta Institución se debe realizar el proceso de Renovar Matricula.</h5>
                </b-alert>
                <b-alert show variant="primary" class="p-5" v-else-if="estadoDocumento==2">
                  <h5 class="mb-5"><b>¡Informamos que!</b></h5>
                  <h5 class="mb-3">El número de documento <span class="text-info"><b>({{ docEstudiante }})</b></span> ya se encuentra registrado en el sistema sieduTunja.</h5>
                  <h5 class="mb-3">El número de documento corresponde a: {{ estudianteEncontrado }}.</h5>
                  <h5 class="mb-3">En el momento el estudiante SE ENCUENTRA VINCULADO en una Institución Educativa.</h5>
                  <h5 class="mb-3">La Institución vinculante es: {{ ieVinculante }}.</h5>
                  <h5 class="mb-3">Para matricularlo en esta Institución, debe comunicarse con la Institución Educativa  {{ ieVinculante }} para solicitar que sea desvinculado.</h5>
                  <h5 class="mb-3">Una vez el estudiante sea desvinculado, se debe realizar el proceso de Renovar Matricula.</h5>
                </b-alert>
                <b-alert show variant="danger" class="p-5" v-else-if="estadoDocumento==3">
                  <h5 class="mb-5"><b>¡Lo sentimos!</b></h5>
                  <h5 class="mb-3">El número de documento <span class="text-info"><b>({{ docEstudiante }})</b></span> registrado en la preinscripción no cumple con las características requeridas.</h5>
                  <h5 class="mb-3">La longitud del número de documento debe ser mayor o igual a 7 digitos y/o caracteres.</h5>
                </b-alert>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <b-button class="small mx-1 mt-2" variant="secondary" @click="cancelarFormulario">Cerrar</b-button>
          </template>
        </b-card>
      </b-col>
    </b-row>
    <b-row v-if="estadoDocumento==0">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h3 class="mb-0 text-center">FORMULARIO DE MATRICULA DE ESTUDIANTE<br> Año Lectivo {{ $store.state.aMatriculas }}</h3>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Información Básica del Estudiante</h5>
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
                          <b-form-input id="doc" ref="doc" v-model="infoEstudiante.documento" aria-describedby="feedDoc" autocomplete="off" maxlength="50" @keydown="soloNumerosLetras" disabled></b-form-input>
                          <b-form-invalid-feedback id="feedDoc">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Tipo Documento*" label-for="tipoDoc" class="etiqueta">
                          <b-form-select  id="tipoDoc" ref="tipoDoc" v-model="$v.infoEstudiante.id_tipo_documento.$model" :options="comboTiposDoc" :state="validateStateD('id_tipo_documento')" aria-describedby="feedTipoDoc"></b-form-select>
                          <b-form-invalid-feedback id="feedTipoDoc">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6" md="6">
                        <b-form-group label="Municipio de Expedición del Documento*" label-for="muniDoc" class="etiqueta">
                          <b-form-select  id="muniDoc" ref="muniDoc" v-model="$v.infoEstudiante.id_municipio_documento.$model" :options="comboMunicipios" :state="validateStateD('id_municipio_documento')" aria-describedby="feedMuniDoc"></b-form-select>
                          <b-form-invalid-feedback id="feedMuniDoc">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Fecha de Nacimiento*" label-for="fechaN" class="etiqueta">
                          <b-form-input id="fechaN" ref="fechaN" type="date" v-model.trim="$v.infoEstudiante.fecha_nacimiento.$model" :state="validateStateD('fecha_nacimiento')" aria-describedby="feedFechaN"></b-form-input>
                          <b-form-invalid-feedback id="feedFechaN" >Campo requerido.</b-form-invalid-feedback>            
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="País de Nacimiento*" label-for="pais" class="etiqueta">
                          <b-form-select  id="pais" ref="pais" v-model="$v.infoEstudiante.id_nacionalidad.$model" :options="comboPaises" :state="validateStateD('id_nacionalidad')" aria-describedby="feedPais" @change="habilitaMunicipioNace"></b-form-select>
                          <b-form-invalid-feedback id="feedPais">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6" md="6">
                        <b-form-group label="Municipio de Nacimiento*" label-for="muniNace" class="etiqueta">
                          <b-form-select  id="muniNace" ref="muniNace" v-model="$v.infoEstudiante.id_municipio_nacimiento.$model" :options="comboMunicipios" :state="validateStateD('id_municipio_nacimiento')" aria-describedby="feedMuniNace" :disabled="deshabMunNace"></b-form-select>
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
                      <b-col lg="6" md="6">
                        <b-form-group label="Grupo Etnico*" label-for="etnia" class="etiqueta">
                          <b-form-select  id="etnia" ref="etnia" v-model="$v.infoEstudiante.id_etnia.$model" :options="comboEtnias" :state="validateStateD('id_etnia')" aria-describedby="feedEtnia"></b-form-select>
                          <b-form-invalid-feedback id="feedEtnia">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6" md="6">
                        <b-form-group label="Discapacidad*" label-for="discapacidad" class="etiqueta">
                          <b-form-select  id="discapacidad" ref="discapacidad" v-model="$v.infoEstudiante.id_discapacidad.$model" :options="comboDiscapacidades" :state="validateStateD('id_discapacidad')" aria-describedby="feedDiscapacidad" @change="infoEstudiante.id_discapacidad==='99' ? infoEstudiante.id_diversa='N' : infoEstudiante.id_diversa=null"></b-form-select>
                          <b-form-invalid-feedback id="feedDiscapacidad">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Educación Inclusiva*" label-for="diversa" class="etiqueta">
                          <b-form-select  id="diversa" ref="diversa" v-model="$v.infoEstudiante.id_diversa.$model" :options="comboDiversa" :state="validateStateD('id_diversa')" aria-describedby="feedDiversa" :disabled="infoEstudiante.id_discapacidad!=='99' ? false : true"></b-form-select>
                          <b-form-invalid-feedback id="feedDiversa">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Capacidades Excepcionales*" label-for="capacidades" class="etiqueta">
                          <b-form-select  id="capacidades" ref="capacidades" v-model="$v.infoEstudiante.id_capacidades.$model" :options="comboCapacidades" :state="validateStateD('id_capacidades')" aria-describedby="feedCapacidad"></b-form-select>
                          <b-form-invalid-feedback id="feedCapacidad">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6" md="6">
                        <b-form-group label="Victima Conflicto*" label-for="victima" class="etiqueta">
                          <b-form-select  id="victima" ref="victima" v-model="$v.infoEstudiante.id_victima.$model" :options="comboVictimas" :state="validateStateD('id_victima')" aria-describedby="feedVictima" @change="habilitaMunicipioExpulsor"></b-form-select>
                          <b-form-invalid-feedback id="feedVictima">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6" md="6">
                        <b-form-group label="Municipio Expulsor*" label-for="muniExpulsor" class="etiqueta">
                          <b-form-select  id="muniExpulsor" ref="muniExpulsor" v-model="$v.infoEstudiante.id_municipio_expulsor.$model" :options="comboMunicipios" :state="validateStateD('id_municipio_expulsor')" aria-describedby="feedMuniExpulsor" :disabled="deshabMuniExpulsor"></b-form-select>
                          <b-form-invalid-feedback id="feedMuniExpulsor">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6" md="6">
                        <b-form-group label="Eps*" label-for="eps" class="etiqueta">
                          <b-form-select  id="eps" ref="eps" v-model="$v.infoEstudiante.id_eps.$model" :options="comboEps" :state="validateStateD('id_eps')" aria-describedby="feedEps"></b-form-select>
                          <b-form-invalid-feedback id="feedEps">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="12" md="12">
                        <b-form-group label="Describa si tiene una enfermedad o tratamiento especial" label-for="enfermedad" class="etiqueta">
                          <b-form-textarea id="enfermedad" ref="enfermedad" v-model.trim="infoEstudiante.enfermedades" aria-describedby="feedEnfermedad" autocomplete="off" rows="2"></b-form-textarea>
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
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Información de Ubicación del Estudiante</h5>
                  </template>
                  <b-card-text>
                    <b-row>
                      <b-col lg="6" md="12">
                        <b-form-group label="Municipio de Domicilio*" label-for="muniDir" class="etiqueta">
                          <b-form-select  id="muniDir" ref="muniDir" v-model="$v.infoEstudiante.id_municipio_direccion.$model" :options="comboMunicipios" :state="validateStateD('id_municipio_direccion')" aria-describedby="feedMuniDir"></b-form-select>
                          <b-form-invalid-feedback id="feedMuniDir">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6" md="12">
                        <b-form-group label="Dirección Domicilio*" label-for="direccion" class="etiqueta">
                          <b-form-input id="direccion" ref="direccion" v-model.trim="$v.infoEstudiante.direccion.$model" :state="validateStateD('direccion')" aria-describedby="feedDir" autocomplete="off" maxlength="100"></b-form-input>
                          <b-form-invalid-feedback id="feedDir">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Barrio*" label-for="barrio" class="etiqueta">
                          <b-form-input id="barrio" ref="barrio" v-model.trim="$v.infoEstudiante.barrio.$model" :state="validateStateD('barrio')" aria-describedby="feedBarrio" autocomplete="off" maxlength="50"></b-form-input>
                          <b-form-invalid-feedback id="feedBarrio">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Zona*" label-for="zona" class="etiqueta">
                          <b-form-select  id="zona" ref="zona" v-model="$v.infoEstudiante.id_zona.$model" :options="comboZonas" :state="validateStateD('id_zona')" aria-describedby="feedZona"></b-form-select>
                          <b-form-invalid-feedback id="feedZona">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Estrato*" label-for="estrato" class="etiqueta">
                          <b-form-select  id="estrato" ref="estrato" v-model="$v.infoEstudiante.id_estrato.$model" :options="comboEstratos" :state="validateStateD('id_estrato')" aria-describedby="feedEstrato"></b-form-select>
                          <b-form-invalid-feedback id="feedEstrato">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Sisben*" label-for="sisben" class="etiqueta">
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
                      <b-col lg="6" md="6">
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
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Información del Acudiente del Estudiante</h5>
                  </template>
                  <b-card-text>
                    <b-row>
                      <b-col lg="3" md="6">
                        <b-form-group label="Primer Apellido*" label-for="ape1A" class="etiqueta">
                          <b-form-input id="ape1A" ref="ape1A" v-model.trim="$v.infoEstudiante.apellido1A.$model" :state="validateStateD('apellido1A')" aria-describedby="feedApe1A" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                          <b-form-invalid-feedback id="feedApe1A" >Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Segundo Apellido" label-for="ape2A" class="etiqueta">
                          <b-form-input id="ape2A" ref="ape2A" v-model.trim="$v.infoEstudiante.apellido2A.$model" :state="validateStateD('apellido2A')" aria-describedby="feedApe2A" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                          <b-form-invalid-feedback id="feedApe2A">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Primer Nombre*" label-for="nom1A" class="etiqueta">
                          <b-form-input id="nom1A" ref="nom1A" v-model.trim="$v.infoEstudiante.nombre1A.$model" :state="validateStateD('nombre1A')" aria-describedby="feedNom1A" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                          <b-form-invalid-feedback id="feedNom1A">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Segundo Nombre" label-for="nom2A" class="etiqueta">
                          <b-form-input id="nom2A" ref="nom2A" v-model.trim="$v.infoEstudiante.nombre2A.$model" :state="validateStateD('nombre2A')" aria-describedby="feedNom2A" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                          <b-form-invalid-feedback id="feedNom2A">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Número de Documento*" label-for="docA" class="etiqueta">
                          <b-form-input id="docA" ref="docA" v-model="infoEstudiante.documentoA" :state="validateStateD('documentoA')" aria-describedby="feedDocA" autocomplete="off" maxlength="50" @keydown="soloNumerosLetras"></b-form-input>
                          <b-form-invalid-feedback id="feedDocA">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Tipo Documento*" label-for="tipoDocA" class="etiqueta">
                          <b-form-select  id="tipoDocA" ref="tipoDocA" v-model="$v.infoEstudiante.id_tipo_documentoA.$model" :options="comboTiposDoc" :state="validateStateD('id_tipo_documentoA')" aria-describedby="feedTipoDocA"></b-form-select>
                          <b-form-invalid-feedback id="feedTipoDocA">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6" md="6">
                        <b-form-group label="Municipio de Expedición del Documento*" label-for="muniDocA" class="etiqueta">
                          <b-form-select  id="muniDocA" ref="muniDocA" v-model="$v.infoEstudiante.id_municipio_documentoA.$model" :options="comboMunicipios" :state="validateStateD('id_municipio_documentoA')" aria-describedby="feedMuniDocA"></b-form-select>
                          <b-form-invalid-feedback id="feedMuniDocA">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Fecha de Nacimiento*" label-for="fechaNA" class="etiqueta">
                          <b-form-input id="fechaNA" ref="fechaNA" type="date" v-model.trim="$v.infoEstudiante.fecha_nacimientoA.$model" :state="validateStateD('fecha_nacimientoA')" aria-describedby="feedFechaNA"></b-form-input>
                          <b-form-invalid-feedback id="feedFechaNA" >Campo requerido.</b-form-invalid-feedback>            
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Nacionalidad*" label-for="paisA" class="etiqueta">
                          <b-form-select  id="paisA" ref="paisA" v-model="$v.infoEstudiante.id_nacionalidadA.$model" :options="comboPaises" :state="validateStateD('id_nacionalidadA')" aria-describedby="feedPaisA" @change="habilitaMunicipioNaceA"></b-form-select>
                          <b-form-invalid-feedback id="feedPaisA">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6" md="6">
                        <b-form-group label="Municipio de Nacimiento*" label-for="muniNaceA" class="etiqueta">
                          <b-form-select  id="muniNaceA" ref="muniNaceA" v-model="$v.infoEstudiante.id_municipio_nacimientoA.$model" :options="comboMunicipios" :state="validateStateD('id_municipio_nacimientoA')" aria-describedby="feedMuniNaceA" :disabled="deshabMunNaceA"></b-form-select>
                          <b-form-invalid-feedback id="feedMuniNaceA">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Género*" label-for="generoA" class="etiqueta">
                          <b-form-select  id="generoA" ref="generoA" v-model="$v.infoEstudiante.id_generoA.$model" :options="comboGeneros" :state="validateStateD('id_generoA')" aria-describedby="feedGeneroA"></b-form-select>
                          <b-form-invalid-feedback id="feedGeneroA">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Grupo y Factor RH*" label-for="rhA" class="etiqueta">
                          <b-form-select  id="rhA" ref="rhA" v-model="$v.infoEstudiante.id_rhA.$model" :options="comboRhs" :state="validateStateD('id_rhA')" aria-describedby="feedRhA"></b-form-select>
                          <b-form-invalid-feedback id="feedRhA">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6" md="6">
                        <b-form-group label="Eps*" label-for="epsA" class="etiqueta">
                          <b-form-select  id="epsA" ref="epsA" v-model="$v.infoEstudiante.id_epsA.$model" :options="comboEps" :state="validateStateD('id_epsA')" aria-describedby="feedEpsA"></b-form-select>
                          <b-form-invalid-feedback id="feedEpsA">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6" md="12">
                        <b-form-group label="Municipio de Domicilio*" label-for="muniDirA" class="etiqueta">
                          <b-form-select  id="muniDirA" ref="muniDirA" v-model="$v.infoEstudiante.id_municipio_direccionA.$model" :options="comboMunicipios" :state="validateStateD('id_municipio_direccionA')" aria-describedby="feedMuniDirA"></b-form-select>
                          <b-form-invalid-feedback id="feedMuniDirA">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6" md="12">
                        <b-form-group label="Dirección Domicilio*" label-for="direccionA" class="etiqueta">
                          <b-form-input id="direccionA" ref="direccionA" v-model.trim="$v.infoEstudiante.direccionA.$model" :state="validateStateD('direccionA')" aria-describedby="feedDirA" autocomplete="off" maxlength="100"></b-form-input>
                          <b-form-invalid-feedback id="feedDirA">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Barrio*" label-for="barrioA" class="etiqueta">
                          <b-form-input id="barrioA" ref="barrioA" v-model.trim="$v.infoEstudiante.barrioA.$model" :state="validateStateD('barrioA')" aria-describedby="feedBarrioA" autocomplete="off" maxlength="50"></b-form-input>
                          <b-form-invalid-feedback id="feedBarrioA">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Zona*" label-for="zonaA" class="etiqueta">
                          <b-form-select  id="zonaA" ref="zonaA" v-model="$v.infoEstudiante.id_zonaA.$model" :options="comboZonas" :state="validateStateD('id_zonaA')" aria-describedby="feedZonaA"></b-form-select>
                          <b-form-invalid-feedback id="feedZonaA">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Estrato*" label-for="estratoA" class="etiqueta">
                          <b-form-select  id="estratoA" ref="estratoA" v-model="$v.infoEstudiante.id_estratoA.$model" :options="comboEstratos" :state="validateStateD('id_estratoA')" aria-describedby="feedEstratoA"></b-form-select>
                          <b-form-invalid-feedback id="feedEstratoA">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Sisben*" label-for="sisbenA" class="etiqueta">
                          <b-form-select  id="sisbenA" ref="sisbenA" v-model="$v.infoEstudiante.id_sisbenA.$model" :options="comboSisben" :state="validateStateD('id_sisbenA')" aria-describedby="feedSisbenA"></b-form-select>
                          <b-form-invalid-feedback id="feedSisbenA">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Teléfono Principal*" label-for="tel1A" class="etiqueta">
                          <b-form-input id="tel1A" ref="tel1A" v-model.trim="$v.infoEstudiante.telefono1A.$model" :state="validateStateD('telefono1A')" aria-describedby="feedTel1A" autocomplete="off" maxlength="15" @keydown="soloNumeros"></b-form-input>
                          <b-form-invalid-feedback id="feedTel1A" >El número debe contener 10 dígitos.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Teléfono Opcional" label-for="tel2A" class="etiqueta">
                          <b-form-input id="tel2A" ref="tel2A" v-model.trim="infoEstudiante.telefono2A" aria-describedby="feedTel2A" autocomplete="off" maxlength="15" @keydown="soloNumeros"></b-form-input>
                          <b-form-invalid-feedback id="feedTel2A" >El número debe contener 10 dígitos.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6" md="6">
                        <b-form-group label="Correo Electrónico*" label-for="correoA" class="etiqueta">
                          <b-form-input id="correoA" ref="correoA" v-model.trim="infoEstudiante.correoA" :state="validateStateD('correoA')" aria-describedby="feedCorreoA" autocomplete="off" maxlength="50"></b-form-input>
                          <b-form-invalid-feedback id="feedCorreoA" >Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6" md="6">
                        <b-form-group label="Ocupación Laboral" label-for="ocupacionA" class="etiqueta">
                          <b-form-input id="ocupacionA" ref="ocupacionA" v-model.trim="infoEstudiante.ocupacionA" aria-describedby="feedOcupacionA" autocomplete="on" maxlength="100"></b-form-input>
                          <b-form-invalid-feedback id="feedOcupacionA" >Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6" md="6">
                        <b-form-group label="Parentesco con el Estudiante*" label-for="parentesco" class="etiqueta">
                          <b-form-select  id="parentesco" ref="parentesco" v-model="$v.infoEstudiante.id_parentesco.$model" :options="comboParentescos" :state="validateStateD('id_parentesco')" aria-describedby="feedParentesco"></b-form-select>
                          <b-form-invalid-feedback id="feedParentesco">Campo requerido.</b-form-invalid-feedback>
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
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Información de la Matrícula del Estudiante</h5>
                  </template>
                  <b-card-text>
                    <b-row>
                      <b-col lg="6" md="12">
                        <b-form-group label="Seleccione la Sede*" label-for="sedes" class="etiqueta">
                          <b-form-select  id="sedes" ref="sedes" v-model="$v.infoEstudiante.id_sede.$model" :options="comboSedes" @change="infoEstudiante.id_grado=null,infoEstudiante.id_curso=null,ocuparComboGradosSede()" :state="validateStateD('id_sede')" aria-describedby="feedSede"></b-form-select>
                          <b-form-invalid-feedback id="feedSede">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Seleccione el Grado*" label-for="grados" class="etiqueta">
                          <b-form-select  id="grados" ref="grados" v-model="$v.infoEstudiante.id_grado.$model" :options="comboGrados" @change="infoEstudiante.id_curso=null,ocuparComboCursosGradosSede()" :state="validateStateD('id_grado')" aria-describedby="feedGrado"></b-form-select>
                          <b-form-invalid-feedback id="feedGrado">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Seleccione el Curso*" label-for="cursos" class="etiqueta">
                          <b-form-select  id="cursos" ref="cursos" v-model="$v.infoEstudiante.id_curso.$model" :options="comboCursos" :state="validateStateD('id_curso')" aria-describedby="feedCurso"></b-form-select>
                          <b-form-invalid-feedback id="feedCurso">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6" md="12">
                        <b-form-group label="Especialidad*" label-for="especialidad" class="etiqueta">
                          <b-form-select  id="especialidad" ref="especialidad" v-model="$v.infoEstudiante.id_especialidad.$model" :options="comboEspecialidades" :state="validateStateD('id_especialidad')" aria-describedby="feedEspecial"></b-form-select>
                          <b-form-invalid-feedback id="feedEspecial">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6" md="12">
                        <b-form-group label="Metodología*" label-for="metodologia" class="etiqueta">
                          <b-form-select  id="metodologia" ref="metodologia" v-model="$v.infoEstudiante.id_metodologia.$model" :options="comboMetodologias" :state="validateStateD('id_metodologia')" aria-describedby="feedMetodologia"></b-form-select>
                          <b-form-invalid-feedback id="feedMetodologia">Campo requerido.</b-form-invalid-feedback>
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
                          <b-form-input id="procedencia" ref="procedencia" v-model.trim="infoEstudiante.procedencia" aria-describedby="feedProcedencia" autocomplete="off" maxlength="100" :disabled="infoEstudiante.id_nuevo=='S' ? false : true"></b-form-input>
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
                          <b-form-input id="aseguradora" ref="aseguradora" v-model.trim="infoEstudiante.aseguradora" aria-describedby="feedAsegura" autocomplete="off" maxlength="100" :disabled="infoEstudiante.id_seguro=='S' ? false : true"></b-form-input>
                          <b-form-invalid-feedback id="feedAsegura" >Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="12" md="12">
                        <b-form-group label="Observaciones de la Matrícula" label-for="observ" class="etiqueta">
                          <b-form-textarea id="observ" ref="observ" v-model.trim="infoEstudiante.obs_matricula" aria-describedby="feedObserv" autocomplete="off" rows="2"></b-form-textarea>
                          <b-form-invalid-feedback id="feedObserv">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col lg="3" md="6">
                        <b-form-group label="Código (Opcional)" label-for="codigo" class="etiqueta">
                          <b-form-input id="codigo" ref="codigo" v-model.trim="infoEstudiante.codigo" aria-describedby="feedCodigo" autocomplete="off" maxlength="20"></b-form-input>
                          <b-form-invalid-feedback id="feedCodigo" >Campo requerido.</b-form-invalid-feedback>
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
            <b-button class="small mx-1 mt-2" variant="primary" @click="validarDatosFormulario">Sentar la Matricular del Estudiante</b-button>
            <b-button class="small mx-1 mt-2" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
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
    name: 'fichamatriculapreinscrito',
    mixins: [validationMixin],
    components: {
    },
    data () {
      return {
        infoEstudiante: {
          idPreinscrito: null,
          idEstudiante: null,//
          documento: null,//
          id_tipo_documento: null,//
          id_municipio_documento: '15001',//
          nombre1: null,//
          nombre2: null,//
          apellido1: null,//
          apellido2: null,//
          fecha_nacimiento: null,//
          id_municipio_nacimiento: '15001',//
          id_nacionalidad: '170',//
          id_genero: null,//
          id_rh: null,
          id_estrato: null,//
          id_sisben: null,//
          id_discapacidad: null,//
          id_capacidades: null,//
          id_etnia: null,//
          id_victima: null,//
          id_municipio_expulsor: null,//
          enfermedades: null,//
          id_diversa: null,//
          id_eps: '000000',//
          direccion: null,//
          id_municipio_direccion: '15001',//
          barrio: null,//
          id_zona: null,//
          telefono1: null,//
          telefono2: null,//
          correo: null,//
          codigo: null,//
          id_sede: null,//
          id_grado: null,//
          id_curso: null,//
          id_especialidad: null,//
          id_metodologia: null,//
          id_nuevo: null,//
          procedencia: null,//
          id_repitente: null,//
          id_ruta: null,//
          id_seguro: null,//
          aseguradora: null,//
          obs_matricula: null,//
          idMatricula: null,//
          idInstitucion: null,//
          vigencia: null,//
          idAcudiente: null,
          apellido1A: null,
          apellido2A: null,
          nombre1A: null,
          nombre2A: null,
          documentoA: null,
          id_tipo_documentoA: null,
          id_municipio_documentoA: null,
          fecha_nacimientoA: null,
          id_nacionalidadA: null,
          id_municipio_nacimientoA: null,
          id_generoA: null,
          id_rhA: null,
          id_estratoA: null,
          id_sisbenA: null,
          id_epsA: '000000',
          direccionA: null,
          id_municipio_direccionA: '15001',
          barrioA: null,
          id_zonaA: null,
          telefono1A: null,
          telefono2A: null,
          correoA: null,
          id_parentesco: null,
          ocupacionA: null
        },
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
        comboEps: [],
        comboZonas: [],
        comboDiversa: [],
        deshabMunNace: false,
        deshabMunNaceA: false,
        deshabMuniExpulsor: false,
        comboSedes: [],
        comboGrados: [],
        comboCursos: [],
        comboEspecialidades: [],
        comboMetodologias: [],
        comboNuevo: [],
        comboRepitente: [],
        comboSeguro: [],
        comboRutas: [],
        comboParentescos: [],
        estadoDocumento: null,
        docEstudiante: null,
        ieVinculante: null,
        estudianteEncontrado: null
      }
    },
    validations: {
      infoEstudiante: {
        documento: { required, minLength: minLength(6) },
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
        id_municipio_expulsor: { required },
        id_diversa: { required },
        id_eps: { required },
        direccion: { required },
        barrio: { required },
        id_municipio_direccion: { required },
        id_zona: { required },
        telefono1: { required, minLength: minLength(10) },
        id_sede: { required },
        id_grado: { required },
        id_curso: { required },
        id_especialidad: { required },
        id_metodologia: { required },
        id_repitente: { required },
        id_nuevo: { required },
        id_seguro: { required },
        id_ruta: { required },
        documentoA: { required, minLength: minLength(6) },
        id_tipo_documentoA: { required },
        id_municipio_documentoA: { required },
        nombre1A: { required },
        nombre2A: { minLength: minLength(0) },
        apellido1A: { required },
        apellido2A: { minLength: minLength(0) },
        fecha_nacimientoA: { required },
        id_municipio_nacimientoA: { required },
        id_nacionalidadA: { required },
        id_generoA: { required },
        id_rhA: { required },
        id_estratoA: { required },
        id_sisbenA: { required },
        id_epsA: { required },
        direccionA: { required },
        barrioA: { required },
        id_municipio_direccionA: { required },
        id_zonaA: { required },
        telefono1A: { required, minLength: minLength(10) },
        correoA: { required },
        id_parentesco: { required }
      }
    },
    methods: {
      validarDatosFormulario() {
        this.$v.infoEstudiante.$touch()
        if (this.$v.infoEstudiante.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          let titulo = 'Matricular Estudiante'
          let pregunta = '¿Esta seguro de sentar la Matricula del Estudiante?'
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
            cancelVariant: 'danger',
            cancelTitle: 'Cancelar',
            footerClass: 'p-2',
            bodyClass: 'p-5',
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
        this.infoEstudiante.idEstudiante = uuid.v1()
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
        if (this.infoEstudiante.telefono2 == '' || this.infoEstudiante.telefono2 == null) {
          this.infoEstudiante.telefono2 = null
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
        if (this.infoEstudiante.correo == null || this.infoEstudiante.correo == '') {
          this.infoEstudiante.correo = null
        } else {
          this.infoEstudiante.correo = this.infoEstudiante.correo.toLowerCase()
        }
        this.infoEstudiante.idInstitucion = this.$store.state.idInstitucion
        this.infoEstudiante.idMatricula = uuid.v1()
        this.infoEstudiante.vigencia = this.$store.state.aMatriculas
        this.infoEstudiante.idAcudiente = uuid.v1()
        this.infoEstudiante.apellido1A = this.infoEstudiante.apellido1A.toUpperCase()
        if (this.infoEstudiante.apellido2A == '' || this.infoEstudiante.apellido2A == null) {
          this.infoEstudiante.apellido2A = null
        } else {
          this.infoEstudiante.apellido2A = this.infoEstudiante.apellido2A.toUpperCase()
        }
        this.infoEstudiante.nombre1A = this.infoEstudiante.nombre1A.toUpperCase()
        if (this.infoEstudiante.nombre2A == '' || this.infoEstudiante.nombre2A == null) {
          this.infoEstudiante.nombre2A = null
        } else {
          this.infoEstudiante.nombre2A = this.infoEstudiante.nombre2A.toUpperCase()
        }
        if (this.infoEstudiante.telefono2A == '' || this.infoEstudiante.telefono2A == null) {
          this.infoEstudiante.telefono2A = null
        }
        if (this.infoEstudiante.codigo != '' && this.infoEstudiante.codigo != null) {
          this.infoEstudiante.codigo = this.infoEstudiante.codigo.toUpperCase()
        }
        if (this.infoEstudiante.ocupacionA != '' && this.infoEstudiante.ocupacionA != null) {
          this.infoEstudiante.ocupacionA = this.infoEstudiante.ocupacionA.toUpperCase()
        }
        this.infoEstudiante.barrioA = this.infoEstudiante.barrioA.toUpperCase()
        this.infoEstudiante.correoA = this.infoEstudiante.correoA.toLowerCase()
        await axios
        .post(CONFIG.ROOT_PATH + 'academico/matriculas/preinscrito', JSON.stringify(this.infoEstudiante), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Matricula Estudiante Preinscrito')
          } else{
            this.infoEstudiante.desTipoDocumento = document.getElementById('tipoDoc')[document.getElementById('tipoDoc').selectedIndex].text
            this.infoEstudiante.desMunicipioDocumento = document.getElementById('muniDoc')[document.getElementById('muniDoc').selectedIndex].text
            this.infoEstudiante.desMunicipioNace = document.getElementById('muniNace')[document.getElementById('muniNace').selectedIndex].text
            this.infoEstudiante.desPais = document.getElementById('pais')[document.getElementById('pais').selectedIndex].text
            this.infoEstudiante.desGenero = document.getElementById('genero')[document.getElementById('genero').selectedIndex].text
            this.infoEstudiante.desRh = document.getElementById('rh')[document.getElementById('rh').selectedIndex].text
            this.infoEstudiante.desEstrato = document.getElementById('estrato')[document.getElementById('estrato').selectedIndex].text
            this.infoEstudiante.desSisben = document.getElementById('sisben')[document.getElementById('sisben').selectedIndex].text
            this.infoEstudiante.desDiscapacidad = document.getElementById('discapacidad')[document.getElementById('discapacidad').selectedIndex].text
            this.infoEstudiante.desCapacidades = document.getElementById('capacidades')[document.getElementById('capacidades').selectedIndex].text
            this.infoEstudiante.desEtnia = document.getElementById('etnia')[document.getElementById('etnia').selectedIndex].text
            this.infoEstudiante.desVictima = document.getElementById('victima')[document.getElementById('victima').selectedIndex].text
            this.infoEstudiante.desMunicipioExpulsor = document.getElementById('muniExpulsor')[document.getElementById('muniExpulsor').selectedIndex].text
            this.infoEstudiante.desDiversa = document.getElementById('diversa')[document.getElementById('diversa').selectedIndex].text
            this.infoEstudiante.desEps = document.getElementById('eps')[document.getElementById('eps').selectedIndex].text
            this.infoEstudiante.desMunicipioDireccion = document.getElementById('muniDir')[document.getElementById('muniDir').selectedIndex].text
            this.infoEstudiante.desZona = document.getElementById('zona')[document.getElementById('zona').selectedIndex].text
            this.infoEstudiante.desSede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
            this.infoEstudiante.desGrado = document.getElementById('grados')[document.getElementById('grados').selectedIndex].text
            this.infoEstudiante.desCurso = document.getElementById('cursos')[document.getElementById('cursos').selectedIndex].text
            this.infoEstudiante.desEspecialidad = document.getElementById('especialidad')[document.getElementById('especialidad').selectedIndex].text
            this.infoEstudiante.desMetodologia = document.getElementById('metodologia')[document.getElementById('metodologia').selectedIndex].text
            this.infoEstudiante.desNuevo = document.getElementById('nuevo')[document.getElementById('nuevo').selectedIndex].text
            this.infoEstudiante.desRepitente = document.getElementById('repitente')[document.getElementById('repitente').selectedIndex].text
            this.infoEstudiante.desRuta = document.getElementById('ruta')[document.getElementById('ruta').selectedIndex].text
            this.infoEstudiante.desSeguro = document.getElementById('seguro')[document.getElementById('seguro').selectedIndex].text
            this.infoEstudiante.barrioA = this.infoEstudiante.barrioA.toUpperCase()
            this.infoEstudiante.desTipoDocumentoA = document.getElementById('tipoDocA')[document.getElementById('tipoDocA').selectedIndex].text
            this.infoEstudiante.desMunicipioDocumentoA = document.getElementById('muniDocA')[document.getElementById('muniDocA').selectedIndex].text
            this.infoEstudiante.desMunicipioNaceA = document.getElementById('muniNaceA')[document.getElementById('muniNaceA').selectedIndex].text
            this.infoEstudiante.desPaisA = document.getElementById('paisA')[document.getElementById('paisA').selectedIndex].text
            this.infoEstudiante.desGeneroA = document.getElementById('generoA')[document.getElementById('generoA').selectedIndex].text
            this.infoEstudiante.desRhA = document.getElementById('rhA')[document.getElementById('rhA').selectedIndex].text
            this.infoEstudiante.desEstratoA = document.getElementById('estratoA')[document.getElementById('estratoA').selectedIndex].text
            this.infoEstudiante.desSisbenA = document.getElementById('sisbenA')[document.getElementById('sisbenA').selectedIndex].text
            this.infoEstudiante.desEpsA = document.getElementById('epsA')[document.getElementById('epsA').selectedIndex].text
            this.infoEstudiante.desMunicipioDireccionA = document.getElementById('muniDirA')[document.getElementById('muniDirA').selectedIndex].text
            this.infoEstudiante.desZonaA = document.getElementById('zonaA')[document.getElementById('zonaA').selectedIndex].text
            this.infoEstudiante.desParentesco = document.getElementById('parentesco')[document.getElementById('parentesco').selectedIndex].text
            //this.enviarCorreoNuevo()
            this.$store.commit('set', ['datosMatriculaPreinscrito', this.infoEstudiante])
            sessionStorage.setItem('datosMatriculaPreinscrito', JSON.stringify(this.infoEstudiante))
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'El estudiante preinscrito se ha matriculado correctamente.')
            this.$router.push('/matriculas/FichaMatriculaPreinscrito2')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Matricula Estudiante Preinscrito. Intente más tarde. ' + err)
        })
      },
      async validarDocumentoEstudiante() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/matriculas/buscardocumento', { params: { documento: this.docEstudiante, vigencia: this.$store.state.aMatriculas }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Validar documento estudiante')
          } else{
            if (response.data.bandera == 0) {
              this.llenarFormulario()
              this.ocuparCombos()
              this.habilitaMunicipioNace()
              this.habilitaMunicipioNaceA()
              this.habilitaMunicipioExpulsor()
              this.ocuparComboSedes()
              this.estadoDocumento = 0
            } else if (response.data.bandera == 1) {
              this.estadoDocumento = 1
              this.estudianteEncontrado = response.data.datos.estudiante
            } else if (response.data.bandera == 2) {
              this.estadoDocumento = 2
              this.ieVinculante = response.data.datos.institucion
              this.estudianteEncontrado = response.data.datos.estudiante
            } else {
              alert('Error...')
            }
          }
        })
        .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Validar documento estudiante. Intente más tarde. ' + err)
        })
      },
      async ocuparComboSedes() {
        this.comboSedes = []
        this.$store.state.datosSedes.forEach(element => {
          this.comboSedes.push({ 'value': element.id, 'text': element.sede.toUpperCase() })
        })
      },
      async ocuparComboGradosSede() {
        this.comboGrados = []
        this.$store.state.datosGrados.forEach(element => {
          if (element.id_sede == this.infoEstudiante.id_sede) {
            this.comboGrados.push({ 'value': element.id, 'text': element.grado.toUpperCase() })
          }
        })
      },
      async ocuparComboCursosGradosSede() {
        this.comboCursos = []
        this.$store.state.datosCursos.forEach(element => {
          if (element.id_grado_sede == this.infoEstudiante.id_grado) {
            this.comboCursos.push({ 'value': element.id, 'text': element.nomenclatura.toUpperCase() })
          }
        })
        this.comboCursos.push({ 'value': 0, 'text': ' --- SIN CURSO (BOLSA) ---' })
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
      soloNumerosLetras(e) {
        let key = window.Event ? e.which : e.keyCode
        if (!((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 96 && key <= 122) || (key == 193) || (key == 201) || (key == 205) || (key == 211) || (key == 218) || (key == 225) || (key == 233) || (key == 237) || (key == 243) || (key == 250) || (key == 192) || (key == 32) || (key == 8) || (key == 9) || (key == 37) || (key == 39))) {
            e.preventDefault()
        }
      },
      llenarFormulario() {
        //console.log('Preinscrito: '+JSON.stringify(this.$store.state.datosPreinscrito))
        this.infoEstudiante.idPreinscrito = this.$store.state.datosPreinscrito.id
        this.infoEstudiante.idEstudiante = null
        this.infoEstudiante.documento = this.$store.state.datosPreinscrito.documento        
        if (this.$store.state.datosPreinscrito.id_tipo_documento == 15) {
          this.infoEstudiante.id_tipo_documento = 13
        } else {
          this.infoEstudiante.id_tipo_documento = this.$store.state.datosPreinscrito.id_tipo_documento
        }
        this.infoEstudiante.id_municipio_documento = null
        this.infoEstudiante.nombre1 = this.$store.state.datosPreinscrito.nombre1
        this.infoEstudiante.nombre2 = this.$store.state.datosPreinscrito.nombre2
        this.infoEstudiante.apellido1 = this.$store.state.datosPreinscrito.apellido1
        this.infoEstudiante.apellido2 = this.$store.state.datosPreinscrito.apellido2
        if (this.$store.state.datosPreinscrito.fecha_nacimiento != null && this.$store.state.datosPreinscrito.fecha_nacimiento != '') {
          this.infoEstudiante.fecha_nacimiento = this.$store.state.datosPreinscrito.fecha_nacimiento.substr(0,10)
        } else {
          this.infoEstudiante.fecha_nacimiento = null
        }
        this.infoEstudiante.id_nacionalidad = this.$store.state.datosPreinscrito.id_nacionalidad
        this.infoEstudiante.id_municipio_nacimiento = '00000'
        if (this.$store.state.datosPreinscrito.id_genero == 1) {
          this.infoEstudiante.id_genero = 'M'
        } else {
          this.infoEstudiante.id_genero = 'F'
        }
        this.infoEstudiante.id_rh = null
        this.infoEstudiante.id_estrato = 9
        this.infoEstudiante.id_sisben = this.$store.state.datosPreinscrito.id_sisben
        if (this.$store.state.datosPreinscrito.id_discapacidad == 0) {
          this.infoEstudiante.id_discapacidad = '99'
        } else if (this.$store.state.datosPreinscrito.id_discapacidad == 3) {
          this.infoEstudiante.id_discapacidad = '03'
        } else if (this.$store.state.datosPreinscrito.id_discapacidad == 4) {
          this.infoEstudiante.id_discapacidad = '04'
        } else if (this.$store.state.datosPreinscrito.id_discapacidad == 7) {
          this.infoEstudiante.id_discapacidad = '07'
        } else if (this.$store.state.datosPreinscrito.id_discapacidad == 8) {
          this.infoEstudiante.id_discapacidad = '08'
        } else {
          this.infoEstudiante.id_discapacidad = this.$store.state.datosPreinscrito.id_discapacidad
        }
        this.infoEstudiante.id_capacidades = 9
        this.infoEstudiante.id_etnia = 0
        this.infoEstudiante.id_victima = 99
        this.infoEstudiante.enfermedades = null
        this.infoEstudiante.id_diversa = 'N'
        this.infoEstudiante.id_eps = '000000'
        this.infoEstudiante.direccion = this.$store.state.datosPreinscrito.direccion
        this.infoEstudiante.id_municipio_direccion = this.$store.state.datosPreinscrito.id_municipio_direccion
        this.infoEstudiante.id_zona = 1
        this.infoEstudiante.telefono1 = this.$store.state.datosPreinscrito.telefono1
        this.infoEstudiante.telefono2 = this.$store.state.datosPreinscrito.telefono2
        this.infoEstudiante.correo = this.$store.state.datosPreinscrito.correo
        this.infoEstudiante.codigo = null
        this.infoEstudiante.id_especialidad = '05'
        this.infoEstudiante.id_metodologia = 1
        this.infoEstudiante.id_nuevo = 'S'
        this.infoEstudiante.id_repitente = 'N'
        this.infoEstudiante.id_ruta = null
        this.infoEstudiante.id_seguro = 'N'
        //------------------------- Información del Acudiente
        if (this.$store.state.datosPreinscrito.documentoA == '9999999999') {
          this.infoEstudiante.documentoA = null
        } else {
          this.infoEstudiante.documentoA = this.$store.state.datosPreinscrito.documentoA
        }
        this.infoEstudiante.id_tipo_documentoA = 1
        this.infoEstudiante.id_nacionalidadA = '170'
        this.infoEstudiante.nombre1A = this.$store.state.datosPreinscrito.nombre1A
        this.infoEstudiante.nombre2A = this.$store.state.datosPreinscrito.nombre2A
        this.infoEstudiante.apellido1A = this.$store.state.datosPreinscrito.apellido1A
        this.infoEstudiante.apellido2A = this.$store.state.datosPreinscrito.apellido2A
        this.infoEstudiante.id_municipio_nacimientoA = '00000'
        if (this.$store.state.datosPreinscrito.id_generoA == 1) {
          this.infoEstudiante.id_generoA = 'M'
        } else if (this.$store.state.datosPreinscrito.id_generoA == 2) {
          this.infoEstudiante.id_generoA = 'F'
        } else {
          this.infoEstudiante.id_generoA = null
        }
        this.infoEstudiante.id_rhA = null
        this.infoEstudiante.id_estratoA = 9
        this.infoEstudiante.id_sisbenA = this.$store.state.datosPreinscrito.id_sisben
        this.infoEstudiante.id_epsA = '000000'
        this.infoEstudiante.direccionA = this.$store.state.datosPreinscrito.direccion
        this.infoEstudiante.id_municipio_direccionA = this.$store.state.datosPreinscrito.id_municipio_direccion
        this.infoEstudiante.id_zonaA = 1
        this.infoEstudiante.telefono1A = this.$store.state.datosPreinscrito.telefono1
        this.infoEstudiante.telefono2A = this.$store.state.datosPreinscrito.telefono2
        this.infoEstudiante.correoA = this.$store.state.datosPreinscrito.correo
        this.infoEstudiante.id_parentesco = this.$store.state.datosPreinscrito.id_parentesco
        this.infoEstudiante.ocupacionA = null
      },
      ocuparCombos() {
        this.comboParentescos = []
        this.$store.state.datosTablas.parentescos.forEach(element => {
          this.comboParentescos.push({ 'value': element.id, 'text': element.parentesco.toUpperCase() })
        })
        this.comboMetodologias = []
        this.$store.state.datosTablas.metodologias.forEach(element => {
          this.comboMetodologias.push({ 'value': element.id, 'text': element.metodologia.toUpperCase() })
        })
        this.comboRutas = []
        this.$store.state.datosRutas.forEach(element => {
          this.comboRutas.push({ 'value': element.id, 'text': element.ruta.toUpperCase() })
        })
        this.comboEspecialidades = []
        this.$store.state.datosTablas.especialidades.forEach(element => {
          this.comboEspecialidades.push({ 'value': element.id, 'text': element.especialidad.toUpperCase() })
        })
        this.comboRepitente = []
        this.$store.state.datosTablas.sino.forEach(element => {
          this.comboRepitente.push({ 'value': element.id, 'text': element.sino.toUpperCase() })
        })
        this.comboNuevo = []
        this.$store.state.datosTablas.sino.forEach(element => {
          this.comboNuevo.push({ 'value': element.id, 'text': element.sino.toUpperCase() })
        })
        this.comboSeguro = []
        this.$store.state.datosTablas.sino.forEach(element => {
          this.comboSeguro.push({ 'value': element.id, 'text': element.sino.toUpperCase() })
        })
        this.comboDiversa = []
        this.$store.state.datosTablas.sino.forEach(element => {
          this.comboDiversa.push({ 'value': element.id, 'text': element.sino.toUpperCase() })
        })
        this.comboZonas = []
        this.$store.state.datosTablas.zonas.forEach(element => {
          this.comboZonas.push({ 'value': element.id, 'text': element.zona.toUpperCase() })
        })
        this.comboEps = []
        this.$store.state.datosTablas.eps.forEach(element => {
          this.comboEps.push({ 'value': element.id, 'text': element.eps.toUpperCase() })
        })
        this.comboEtnias = []
        this.$store.state.datosTablas.etnias.forEach(element => {
          this.comboEtnias.push({ 'value': element.id, 'text': element.etnia.toUpperCase() })
        })
        this.comboVictimas = []
        this.$store.state.datosTablas.victimas.forEach(element => {
          this.comboVictimas.push({ 'value': element.id, 'text': element.victima.toUpperCase() })
        })
        this.comboCapacidades = []
        this.$store.state.datosTablas.capacidades.forEach(element => {
          this.comboCapacidades.push({ 'value': element.id, 'text': element.capacidad.toUpperCase() })
        })
        this.comboDiscapacidades = []
        this.$store.state.datosTablas.discapacidades.forEach(element => {
          this.comboDiscapacidades.push({ 'value': element.id, 'text': element.discapacidad.toUpperCase() })
        })
        this.comboEstratos = []
        this.$store.state.datosTablas.estratos.forEach(element => {
          this.comboEstratos.push({ 'value': element.id, 'text': element.estrato.toUpperCase() })
        })
        this.comboSisben = []
        this.$store.state.datosTablas.sisben.forEach(element => {
          this.comboSisben.push({ 'value': element.id, 'text': element.subgrupo.toUpperCase() })
        })
        this.comboRhs = []
        this.$store.state.datosTablas.rhs.forEach(element => {
          this.comboRhs.push({ 'value': element.id, 'text': element.rh.toUpperCase() })
        })
        this.comboGeneros = []
        this.$store.state.datosTablas.generos.forEach(element => {
          this.comboGeneros.push({ 'value': element.id, 'text': element.genero.toUpperCase() })
        })
        this.comboTiposDoc = []
        this.$store.state.datosTablas.tiposdocumentos.forEach(element => {
          this.comboTiposDoc.push({ 'value': element.id, 'text': element.tipodocumento.toUpperCase() })
        })
        this.comboMunicipios = []
        this.$store.state.datosTablas.municipios.forEach(element => {
          this.comboMunicipios.push({ 'value': element.id, 'text': element.municipio.toUpperCase() + ' - ' + element.departamento.toUpperCase() })
        })
        this.comboPaises = []
        this.$store.state.datosTablas.paises.forEach(element => {
          this.comboPaises.push({ 'value': element.id, 'text': element.pais.toUpperCase() })
        })
      },
      habilitaMunicipioNace() {
        if (this.infoEstudiante.id_nacionalidad == '170') {
          this.infoEstudiante.id_municipio_nacimiento = null
          this.deshabMunNace = false
        } else {
          this.infoEstudiante.id_municipio_nacimiento='00000'
          this.deshabMunNace = true
        }
      },
      habilitaMunicipioNaceA() {
        if (this.infoEstudiante.id_nacionalidadA == '170') {
          this.infoEstudiante.id_municipio_nacimientoA = null
          this.deshabMunNaceA = false
        } else {
          this.infoEstudiante.id_municipio_nacimientoA='00000'
          this.deshabMunNaceA = true
        }
      },
      habilitaMunicipioExpulsor() {
        if (this.infoEstudiante.id_victima == '1') {
          this.infoEstudiante.id_municipio_expulsor = null
          this.deshabMuniExpulsor = false
        } else {
          this.infoEstudiante.id_municipio_expulsor='00000'
          this.deshabMuniExpulsor = true
        }
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      if(this.$store.state.idRol == 1 || this.$store.state.idRol == 12  || tokenDecodificado.id_rol == 17) {
        this.docEstudiante = this.$store.state.datosPreinscrito.documento
        this.estadoDocumento = null
        if (this.docEstudiante.length < 7) {
          this.estadoDocumento = 3
        } else {
          this.validarDocumentoEstudiante()
        }
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>