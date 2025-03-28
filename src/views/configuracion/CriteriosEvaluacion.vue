<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> CRITERIOS DE EVALUACIÓN</h5>
          </template>
          <b-card-text>
            <b-tabs content-class="mt-3">
              <b-tab title="Criterios Plan Académico" active>
                <b-card style="margin-top: -17">
                  <b-card-text>
                    <b-row>
                      <b-col lg="4">
                        <b-card border-variant="primary" title="Criterio de Evaluación 1">
                          <b-card-text>
                            <hr>
                            <b-row>
                              <b-col lg="6">
                                <b-form-group label="Estado:" label-for="estado1" class="etiqueta">
                                  <b-form-select  id="estado1" ref="estado1" v-model="criteriosSeccion.estadoC1" :options="comboEstados" aria-describedby="feedEstado1" disabled></b-form-select>
                                  <b-form-invalid-feedback id="feedEstado1">Campo requerido.</b-form-invalid-feedback>
                                </b-form-group>
                              </b-col>
                              <b-col lg="12">
                                <b-form-group label="Nombre del Criterio:" label-for="criterio1" class="etiqueta">
                                  <b-form-input id="criterio1" ref="criterio1" v-model.trim="criteriosSeccion.nombreC1" aria-describedby="feedCriterio1" autocomplete="off" maxlength="15"></b-form-input>
                                  <b-form-invalid-feedback id="feedCriterio1" >Campo requerido.</b-form-invalid-feedback>
                                </b-form-group>
                              </b-col>
                              <b-col lg="6">
                                <b-form-group label="Porcentaje:" label-for="pcriterio1" class="etiqueta">
                                  <b-form-input type="number" id="pcriterio1" ref="pcriterio1" v-model.trim="criteriosSeccion.porcentajeC1" aria-describedby="feedpCriterio1" autocomplete="off" maxlength="3"></b-form-input>
                                  <b-form-invalid-feedback id="feedpCriterio1" >Campo requerido.</b-form-invalid-feedback>
                                </b-form-group>
                              </b-col>
                            </b-row>
                          </b-card-text>
                        </b-card>
                      </b-col>
                      <b-col lg="4">
                        <b-card border-variant="primary" title="Criterio de Evaluación 2">
                          <b-card-text>
                            <hr>
                            <b-row>
                              <b-col lg="6">
                                <b-form-group label="Estado:" label-for="estado2" class="etiqueta">
                                  <b-form-select  id="estado2" ref="estado2" v-model="criteriosSeccion.estadoC2" :options="comboEstados" aria-describedby="feedEstado2"></b-form-select>
                                  <b-form-invalid-feedback id="feedEstado2">Campo requerido.</b-form-invalid-feedback>
                                </b-form-group>
                              </b-col>
                            </b-row>
                            <b-row v-if="criteriosSeccion.estadoC2 == 1">
                              <b-col lg="12">
                                <b-form-group label="Nombre del Criterio:" label-for="criterio2" class="etiqueta">
                                  <b-form-input id="criterio2" ref="criterio2" v-model.trim="criteriosSeccion.nombreC2" aria-describedby="feedCriterio2" autocomplete="off" maxlength="15"></b-form-input>
                                  <b-form-invalid-feedback id="feedCriterio2" >Campo requerido.</b-form-invalid-feedback>
                                </b-form-group>
                              </b-col>
                              <b-col lg="6">
                                <b-form-group label="Porcentaje:" label-for="pcriterio2" class="etiqueta">
                                  <b-form-input type="number" id="pcriterio2" ref="pcriterio2" v-model.trim="criteriosSeccion.porcentajeC2" aria-describedby="feedpCriterio2" autocomplete="off" maxlength="3"></b-form-input>
                                  <b-form-invalid-feedback id="feedpCriterio2" >Campo requerido.</b-form-invalid-feedback>
                                </b-form-group>
                              </b-col>
                            </b-row>
                          </b-card-text>
                        </b-card>
                      </b-col>
                      <b-col lg="4">
                        <b-card border-variant="primary" title="Criterio de Evaluación 3">
                          <b-card-text>
                            <hr>
                            <b-row>
                              <b-col lg="6">
                                <b-form-group label="Estado:" label-for="estado3" class="etiqueta">
                                  <b-form-select  id="estado3" ref="estado3" v-model="criteriosSeccion.estadoC3" :options="comboEstados" aria-describedby="feedEstado3"></b-form-select>
                                  <b-form-invalid-feedback id="feedEstado3">Campo requerido.</b-form-invalid-feedback>
                                </b-form-group>
                              </b-col>
                            </b-row>
                            <b-row v-if="criteriosSeccion.estadoC3 == 1">
                              <b-col lg="12">
                                <b-form-group label="Nombre del Criterio:" label-for="criterio3" class="etiqueta">
                                  <b-form-input id="criterio3" ref="criterio3" v-model.trim="criteriosSeccion.nombreC3" aria-describedby="feedCriterio3" autocomplete="off" maxlength="15"></b-form-input>
                                  <b-form-invalid-feedback id="feedCriterio3" >Campo requerido.</b-form-invalid-feedback>
                                </b-form-group>
                              </b-col>
                              <b-col lg="6">
                                <b-form-group label="Porcentaje:" label-for="pcriterio3" class="etiqueta">
                                  <b-form-input type="number" id="pcriterio3" ref="pcriterio3" v-model.trim="criteriosSeccion.porcentajeC3" aria-describedby="feedpCriterio3" autocomplete="off" maxlength="3"></b-form-input>
                                  <b-form-invalid-feedback id="feedpCriterio3" >Campo requerido.</b-form-invalid-feedback>
                                </b-form-group>
                              </b-col>
                            </b-row>
                          </b-card-text>
                        </b-card>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col lg="12">
                        <b-card border-variant="primary" title="Conceptos Valorativos Plan Académico">
                          <b-card-text>
                            <hr>
                            <b-row>
                              <b-col lg="3">
                                <b-alert variant="danger" show>
                                  <b-row>
                                    <b-col lg="12">
                                      <h5>BAJO</h5><hr>
                                    </b-col>
                                    <b-col lg="6" md="6">
                                      <b-form-group label="Valoración Mínima:" label-for="minBaj" class="etiqueta">
                                        <b-form-input type="number" id="minBaj" ref="minBaj" v-model.trim="criteriosSeccion.minBaj" aria-describedby="feedminBaj" autocomplete="off" maxlength="3"></b-form-input>
                                        <b-form-invalid-feedback id="feedminBaj" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                    <b-col lg="6" md="6">
                                      <b-form-group label="Valoración Máxima:" label-for="maxBaj" class="etiqueta">
                                        <b-form-input type="number" id="maxBaj" ref="maxBaj" v-model.trim="criteriosSeccion.maxBaj" aria-describedby="feedpmaxBaj" autocomplete="off" maxlength="3"></b-form-input>
                                        <b-form-invalid-feedback id="feedpmaxBaj" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                  </b-row>  
                                </b-alert>
                              </b-col>
                              <b-col lg="3">
                                <b-alert variant="info" show>
                                  <b-row>
                                    <b-col lg="12">
                                      <h5>BASICO</h5><hr>
                                    </b-col>
                                    <b-col lg="6" md="6">
                                      <b-form-group label="Valoración Mínima:" label-for="minBas" class="etiqueta">
                                        <b-form-input type="number" id="minBas" ref="minBas" v-model.trim="criteriosSeccion.minBas" aria-describedby="feedminBas" autocomplete="off" maxlength="3"></b-form-input>
                                        <b-form-invalid-feedback id="feedminBas" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                    <b-col lg="6" md="6">
                                      <b-form-group label="Valoración Máxima:" label-for="maxBas" class="etiqueta">
                                        <b-form-input type="number" id="maxBas" ref="maxBas" v-model.trim="criteriosSeccion.maxBas" aria-describedby="feedpmaxBas" autocomplete="off" maxlength="3"></b-form-input>
                                        <b-form-invalid-feedback id="feedpmaxBas" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                  </b-row>  
                                </b-alert>
                              </b-col>
                              <b-col lg="3">
                                <b-alert variant="warning" show>
                                  <b-row>
                                    <b-col lg="12">
                                      <h5>ALTO</h5><hr>
                                    </b-col>
                                    <b-col lg="6" md="6">
                                      <b-form-group label="Valoración Mínima:" label-for="minAlt" class="etiqueta">
                                        <b-form-input type="number" id="minAlt" ref="minAlt" v-model.trim="criteriosSeccion.minAlt" aria-describedby="feedminAlt" autocomplete="off" maxlength="3"></b-form-input>
                                        <b-form-invalid-feedback id="feedminAlt" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                    <b-col lg="6" md="6">
                                      <b-form-group label="Valoración Máxima:" label-for="maxAlt" class="etiqueta">
                                        <b-form-input type="number" id="maxAlt" ref="maxAlt" v-model.trim="criteriosSeccion.maxAlt" aria-describedby="feedpmaxAlt" autocomplete="off" maxlength="3"></b-form-input>
                                        <b-form-invalid-feedback id="feedpmaxAlt" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                  </b-row>  
                                </b-alert>
                              </b-col>
                              <b-col lg="3">
                                <b-alert variant="success" show>
                                  <b-row>
                                    <b-col lg="12">
                                      <h5>SUPERIOR</h5><hr>
                                    </b-col>
                                    <b-col lg="6" md="6">
                                      <b-form-group label="Valoración Mínima:" label-for="minSup" class="etiqueta">
                                        <b-form-input type="number" id="minSup" ref="minSup" v-model.trim="criteriosSeccion.minSup" aria-describedby="feedminSup" autocomplete="off" maxlength="3"></b-form-input>
                                        <b-form-invalid-feedback id="feedminSup" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                    <b-col lg="6" md="6">
                                      <b-form-group label="Valoración Máxima:" label-for="maxSup" class="etiqueta">
                                        <b-form-input type="number" id="maxSup" ref="maxSup" v-model.trim="criteriosSeccion.maxSup" aria-describedby="feedpmaxSup" autocomplete="off" maxlength="3"></b-form-input>
                                        <b-form-invalid-feedback id="feedpmaxSup" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                  </b-row>  
                                </b-alert>
                              </b-col>
                            </b-row>
                          </b-card-text>
                        </b-card>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col lg="12">
                        <b-button class="small mx-1 mt-2" variant="primary" @click="validarDatosAcademico">Guardar Criterios Plan Académico</b-button>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-tab>
              <b-tab title="Criterios Plan Técnico">
                <b-card style="margin-top: -17">
                  <b-card-text>
                    <b-row>
                      <b-col lg="12">
                        <b-card border-variant="primary" title="Conceptos Valorativos Plan Técnico">
                          <b-card-text>
                            <hr>
                            <b-row>
                              <b-col lg="3">
                                <b-alert variant="danger" show>
                                  <b-row>
                                    <b-col lg="12">
                                      <h5>BAJO</h5><hr>
                                    </b-col>
                                    <b-col lg="6" md="6">
                                      <b-form-group label="Valoración Mínima:" label-for="minBajT" class="etiqueta">
                                        <b-form-input type="number" id="minBajT" ref="minBajT" v-model.trim="criteriosSeccion.minBajT" aria-describedby="feedminBajT" autocomplete="off" maxlength="3"></b-form-input>
                                        <b-form-invalid-feedback id="feedminBajT" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                    <b-col lg="6" md="6">
                                      <b-form-group label="Valoración Máxima:" label-for="maxBajT" class="etiqueta">
                                        <b-form-input type="number" id="maxBajT" ref="maxBajT" v-model.trim="criteriosSeccion.maxBajT" aria-describedby="feedpmaxBajT" autocomplete="off" maxlength="3"></b-form-input>
                                        <b-form-invalid-feedback id="feedpmaxBajT" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                  </b-row>  
                                </b-alert>
                              </b-col>
                              <b-col lg="3">
                                <b-alert variant="info" show>
                                  <b-row>
                                    <b-col lg="12">
                                      <h5>BASICO</h5><hr>
                                    </b-col>
                                    <b-col lg="6" md="6">
                                      <b-form-group label="Valoración Mínima:" label-for="minBasT" class="etiqueta">
                                        <b-form-input type="number" id="minBasT" ref="minBasT" v-model.trim="criteriosSeccion.minBasT" aria-describedby="feedminBasT" autocomplete="off" maxlength="3"></b-form-input>
                                        <b-form-invalid-feedback id="feedminBasT" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                    <b-col lg="6" md="6">
                                      <b-form-group label="Valoración Máxima:" label-for="maxBasT" class="etiqueta">
                                        <b-form-input type="number" id="maxBasT" ref="maxBasT" v-model.trim="criteriosSeccion.maxBasT" aria-describedby="feedpmaxBasT" autocomplete="off" maxlength="3"></b-form-input>
                                        <b-form-invalid-feedback id="feedpmaxBasT" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                  </b-row>  
                                </b-alert>
                              </b-col>
                              <b-col lg="3">
                                <b-alert variant="warning" show>
                                  <b-row>
                                    <b-col lg="12">
                                      <h5>ALTO</h5><hr>
                                    </b-col>
                                    <b-col lg="6" md="6">
                                      <b-form-group label="Valoración Mínima:" label-for="minAltT" class="etiqueta">
                                        <b-form-input type="number" id="minAltT" ref="minAltT" v-model.trim="criteriosSeccion.minAltT" aria-describedby="feedminAltT" autocomplete="off" maxlength="3"></b-form-input>
                                        <b-form-invalid-feedback id="feedminAltT" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                    <b-col lg="6" md="6">
                                      <b-form-group label="Valoración Máxima:" label-for="maxAltT" class="etiqueta">
                                        <b-form-input type="number" id="maxAltT" ref="maxAltT" v-model.trim="criteriosSeccion.maxAltT" aria-describedby="feedpmaxAltT" autocomplete="off" maxlength="3"></b-form-input>
                                        <b-form-invalid-feedback id="feedpmaxAltT" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                  </b-row>  
                                </b-alert>
                              </b-col>
                              <b-col lg="3">
                                <b-alert variant="success" show>
                                  <b-row>
                                    <b-col lg="12">
                                      <h5>SUPERIOR</h5><hr>
                                    </b-col>
                                    <b-col lg="6" md="6">
                                      <b-form-group label="Valoración Mínima:" label-for="minSupT" class="etiqueta">
                                        <b-form-input type="number" id="minSupT" ref="minSupT" v-model.trim="criteriosSeccion.minSupT" aria-describedby="feedminSupT" autocomplete="off" maxlength="3"></b-form-input>
                                        <b-form-invalid-feedback id="feedminSupT" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                    <b-col lg="6" md="6">
                                      <b-form-group label="Valoración Máxima:" label-for="maxSupT" class="etiqueta">
                                        <b-form-input type="number" id="maxSupT" ref="maxSupT" v-model.trim="criteriosSeccion.maxSupT" aria-describedby="feedpmaxSupT" autocomplete="off" maxlength="3"></b-form-input>
                                        <b-form-invalid-feedback id="feedpmaxSupT" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                  </b-row>  
                                </b-alert>
                              </b-col>
                            </b-row>
                          </b-card-text>
                        </b-card>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col lg="12">
                        <b-button class="small mx-1 mt-2" variant="primary" @click="validarDatosTecnico">Guardar Criterios Plan Técnico</b-button>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-tab>
              <b-tab title="Criterios Preescolar">
                <b-card style="margin-top: -17">
                  <b-card-text>
                    <b-row>
                      <b-col lg="12">
                        <b-card border-variant="primary" title="Conceptos Valorativos Preescolar">
                          <b-card-text>
                            <hr>
                            <b-row>
                              <b-col lg="3">
                                <b-alert variant="danger" show>
                                  <b-row>
                                    <b-col lg="8">
                                      <b-form-group label="Concepto:" label-for="preeC1" class="etiqueta">
                                        <b-form-input id="preeC1" ref="preeC1" v-model.trim="criteriosSeccion.preeC1" aria-describedby="feedpreeC1" autocomplete="off" maxlength="15"></b-form-input>
                                        <b-form-invalid-feedback id="feedpreeC1" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                    <b-col lg="4">
                                      <b-form-group label="Letra:" label-for="preeL1" class="etiqueta">
                                        <b-form-input id="preeL1" ref="preeL1" v-model.trim="criteriosSeccion.preeL1" aria-describedby="feedpreeL1" autocomplete="off" maxlength="1"></b-form-input>
                                        <b-form-invalid-feedback id="feedpreeL1" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                  </b-row>  
                                </b-alert>
                              </b-col>
                              <b-col lg="3">
                                <b-alert variant="info" show>
                                  <b-row>
                                    <b-col lg="8">
                                      <b-form-group label="Concepto:" label-for="preeC2" class="etiqueta">
                                        <b-form-input id="preeC2" ref="preeC2" v-model.trim="criteriosSeccion.preeC2" aria-describedby="feedpreeC2" autocomplete="off" maxlength="15"></b-form-input>
                                        <b-form-invalid-feedback id="feedpreeC2" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                    <b-col lg="4">
                                      <b-form-group label="Letra:" label-for="preeL2" class="etiqueta">
                                        <b-form-input id="preeL2" ref="preeL2" v-model.trim="criteriosSeccion.preeL2" aria-describedby="feedpreeL2" autocomplete="off" maxlength="1"></b-form-input>
                                        <b-form-invalid-feedback id="feedpreeL2" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                  </b-row>  
                                </b-alert>
                              </b-col>
                              <b-col lg="3">
                                <b-alert variant="warning" show>
                                  <b-row>
                                    <b-col lg="8">
                                      <b-form-group label="Concepto:" label-for="preeC3" class="etiqueta">
                                        <b-form-input id="preeC3" ref="preeC3" v-model.trim="criteriosSeccion.preeC3" aria-describedby="feedpreeC3" autocomplete="off" maxlength="15"></b-form-input>
                                        <b-form-invalid-feedback id="feedpreeC3" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                    <b-col lg="4">
                                      <b-form-group label="Letra:" label-for="preeL3" class="etiqueta">
                                        <b-form-input id="preeL3" ref="preeL3" v-model.trim="criteriosSeccion.preeL3" aria-describedby="feedpreeL3" autocomplete="off" maxlength="1"></b-form-input>
                                        <b-form-invalid-feedback id="feedpreeL3" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                  </b-row>  
                                </b-alert>
                              </b-col>
                              <b-col lg="3">
                                <b-alert variant="success" show>
                                  <b-row>
                                    <b-col lg="8">
                                      <b-form-group label="Concepto:" label-for="preeC4" class="etiqueta">
                                        <b-form-input id="preeC4" ref="preeC4" v-model.trim="criteriosSeccion.preeC4" aria-describedby="feedpreeC4" autocomplete="off" maxlength="15"></b-form-input>
                                        <b-form-invalid-feedback id="feedpreeC4" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                    <b-col lg="4">
                                      <b-form-group label="Letra:" label-for="preeL4" class="etiqueta">
                                        <b-form-input id="preeL4" ref="preeL4" v-model.trim="criteriosSeccion.preeL4" aria-describedby="feedpreeL4" autocomplete="off" maxlength="1"></b-form-input>
                                        <b-form-invalid-feedback id="feedpreeL4" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                  </b-row>  
                                </b-alert>
                              </b-col>
                            </b-row>
                            <b-row class="mt-3">
                              <b-col lg="6">
                                <b-form-group label="Método de Valoración:" label-for="metodopree" class="etiqueta">
                                  <b-form-select  id="metodopree" ref="metodopree" v-model="criteriosSeccion.metoValPree" :options="comboMetodoValoracion" aria-describedby="feedMetodoPree"></b-form-select>
                                  <b-form-invalid-feedback id="feedMetodoPree">Campo requerido.</b-form-invalid-feedback>
                                </b-form-group>
                              </b-col>
                            </b-row>
                          </b-card-text>
                        </b-card>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col lg="12">
                        <b-button class="small mx-1 mt-2" variant="primary" @click="validarDatosPreescolar">Guardar Criterios Preescolar</b-button>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-tab>
              <b-tab title="Criterios Comportamiento">
                <b-card style="margin-top: -17">
                  <b-card-text>
                    <b-row>
                      <b-col lg="12">
                        <b-card border-variant="primary" title="Conceptos Valorativos Comportamiento">
                          <b-card-text>
                            <hr>
                            <b-row>
                              <b-col lg="6">
                                <b-form-group label="Tipo Valoración:" label-for="tipocompor" class="etiqueta">
                                  <b-form-select  id="tipocompor" ref="tipocompor" v-model="criteriosSeccion.tipoValComp" :options="comboTipoValoracion" aria-describedby="feedTipoCompor"></b-form-select>
                                  <b-form-invalid-feedback id="feedTipoCompor">Campo requerido.</b-form-invalid-feedback>
                                </b-form-group>
                              </b-col>
                            </b-row>
                            <b-row class="mt-3">
                              <b-col lg="3">
                                <b-alert variant="danger" show>
                                  <b-row>
                                    <b-col lg="8">
                                      <b-form-group label="Concepto:" label-for="compC1" class="etiqueta">
                                        <b-form-input id="compC1" ref="compC1" v-model.trim="criteriosSeccion.compC1" aria-describedby="feedcompC1" autocomplete="off" maxlength="15"></b-form-input>
                                        <b-form-invalid-feedback id="feedcompC1" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                    <b-col lg="4">
                                      <b-form-group label="Letra:" label-for="compL1" class="etiqueta">
                                        <b-form-input id="compL1" ref="compL1" v-model.trim="criteriosSeccion.compL1" aria-describedby="feedcompL1" autocomplete="off" maxlength="1"></b-form-input>
                                        <b-form-invalid-feedback id="feedcompL1" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                    <b-col>
                                      <strong>De: {{criteriosSeccion.minBaj}} a {{criteriosSeccion.maxBaj}}</strong>
                                    </b-col>
                                  </b-row>  
                                </b-alert>
                              </b-col>
                              <b-col lg="3">
                                <b-alert variant="info" show>
                                  <b-row>
                                    <b-col lg="8">
                                      <b-form-group label="Concepto:" label-for="compC2" class="etiqueta">
                                        <b-form-input id="compC2" ref="compC2" v-model.trim="criteriosSeccion.compC2" aria-describedby="feedcompC2" autocomplete="off" maxlength="15"></b-form-input>
                                        <b-form-invalid-feedback id="feedcompC2" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                    <b-col lg="4">
                                      <b-form-group label="Letra:" label-for="compL2" class="etiqueta">
                                        <b-form-input id="compL2" ref="compL2" v-model.trim="criteriosSeccion.compL2" aria-describedby="feedcompL2" autocomplete="off" maxlength="1"></b-form-input>
                                        <b-form-invalid-feedback id="feedcompL2" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                    <b-col>
                                      <strong>De: {{criteriosSeccion.minBas}} a {{criteriosSeccion.maxBas}}</strong>
                                    </b-col>
                                  </b-row>  
                                </b-alert>
                              </b-col>
                              <b-col lg="3">
                                <b-alert variant="warning" show>
                                  <b-row>
                                    <b-col lg="8">
                                      <b-form-group label="Concepto:" label-for="compC3" class="etiqueta">
                                        <b-form-input id="compC3" ref="compC3" v-model.trim="criteriosSeccion.compC3" aria-describedby="feedcompC3" autocomplete="off" maxlength="15"></b-form-input>
                                        <b-form-invalid-feedback id="feedcompC3" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                    <b-col lg="4">
                                      <b-form-group label="Letra:" label-for="compL3" class="etiqueta">
                                        <b-form-input id="compL3" ref="compL3" v-model.trim="criteriosSeccion.compL3" aria-describedby="feedcompL3" autocomplete="off" maxlength="1"></b-form-input>
                                        <b-form-invalid-feedback id="feedcompL3" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                    <b-col>
                                      <strong>De: {{criteriosSeccion.minAlt}} a {{criteriosSeccion.maxAlt}}</strong>
                                    </b-col>
                                  </b-row>  
                                </b-alert>
                              </b-col>
                              <b-col lg="3">
                                <b-alert variant="success" show>
                                  <b-row>
                                    <b-col lg="8">
                                      <b-form-group label="Concepto:" label-for="compC4" class="etiqueta">
                                        <b-form-input id="compC4" ref="compC4" v-model.trim="criteriosSeccion.compC4" aria-describedby="feedcompC4" autocomplete="off" maxlength="15"></b-form-input>
                                        <b-form-invalid-feedback id="feedcompC4" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                    <b-col lg="4">
                                      <b-form-group label="Letra:" label-for="compL4" class="etiqueta">
                                        <b-form-input id="compL4" ref="compL4" v-model.trim="criteriosSeccion.compL4" aria-describedby="feedcompL4" autocomplete="off" maxlength="1"></b-form-input>
                                        <b-form-invalid-feedback id="feedcompL4" >Campo requerido.</b-form-invalid-feedback>
                                      </b-form-group>
                                    </b-col>
                                    <b-col>
                                      <strong>De: {{criteriosSeccion.minSup}} a {{criteriosSeccion.maxSup}}</strong>
                                    </b-col>
                                  </b-row>  
                                </b-alert>
                              </b-col>
                            </b-row>
                          </b-card-text>
                        </b-card>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col lg="12">
                        <b-button class="small mx-1 mt-2" variant="primary" @click="validarDatosComportamiento">Guardar Criterios Comportamiento</b-button>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-tab>
            </b-tabs>
          </b-card-text>
          <template #footer>
            <em>Criterios de Evaluación por Sección</em>
          </template>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'

  export default {
    name: 'criteriosevaluacion',
    components: {
    },
    data () {
      return {
        criteriosSeccion: {
          id: null,
          nombreC1: null,
          nombreC2: null,
          nombreC3: null,
          porcentajeC1: null,
          porcentajeC2: null,
          porcentajeC3: null,
          estadoC1: null,
          estadoC2: null,
          estadoC3: null,
          minBaj: null,maxBaj: null,minBas: null,maxBas: null,minAlt: null,maxAlt: null,minSup: null,maxSup: null,
          minBajT: null,maxBajT: null,minBasT: null,maxBasT: null,minAltT: null,maxAltT: null,minSupT: null,maxSupT: null,
          preeC1: null,preeL1: null,preeC2: null,preeL2: null,preeC3: null,preeL3: null,preeC4: null,preeL4: null,
          compC1: null,compL1: null,compC2: null,compL2: null,compC3: null,compL3: null,compC4: null,compL4: null,
          tipoValComp: 0,
          metoValPree: 0,
        },
        comboEstados: [
          { 'value': 0, 'text': 'INACTIVO'},
          { 'value': 1, 'text': 'ACTIVO'}
        ],
        comboTipoValoracion: [
          { 'value': 0, 'text': 'CUALITATIVO (Letras)'},
          { 'value': 1, 'text': 'CUANTITATIVO (Números)'}
        ],
        comboMetodoValoracion: [
          { 'value': 0, 'text': 'EVALUACIÓN POR COMPENTENCIA'},
          { 'value': 1, 'text': 'EVALUACIÓN POR DESCRIPTOR'}
        ]
      }
    },
    methods: {
      validarDatosComportamiento() {
        let titulo = 'Actualizar Criterios de Evaluación'
        let pregunta = '¿Esta seguro de actualizar los Criterios de Evaluación Preescolar?'
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
            this.guardarCriteriosComportamiento()
          }
        })
      },
      async guardarCriteriosComportamiento() {
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/criteriosevaluacion/comportamiento', JSON.stringify(this.criteriosSeccion), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Criterios Comportamiento')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los criterios de evaluación se han actualizado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Criterios Comportamiento. Intente más tarde. ' + err)
        })
      },
      validarDatosPreescolar() {
        let titulo = 'Actualizar Criterios de Evaluación'
        let pregunta = '¿Esta seguro de actualizar los Criterios de Evaluación Preescolar?'
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
            this.guardarCriteriosPreescolar()
          }
        })
      },
      async guardarCriteriosPreescolar() {
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/criteriosevaluacion/preescolar', JSON.stringify(this.criteriosSeccion), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Criterios preescolar')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los criterios de evaluación se han actualizado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Criterios preescolar. Intente más tarde. ' + err)
        })
      },
      validarDatosTecnico() {
        let titulo = 'Actualizar Criterios de Evaluación'
        let pregunta = '¿Esta seguro de actualizar los Criterios de Evaluación Plan Técnico?'
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
            this.guardarCriteriosTecnicos()
          }
        })
      },
      async guardarCriteriosTecnicos() {
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/criteriosevaluacion/tecnico', JSON.stringify(this.criteriosSeccion), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Criterios tecnico')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los criterios de evaluación se han actualizado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Criterios tecnico. Intente más tarde. ' + err)
        })
      },
      validarDatosAcademico() {
        let titulo = 'Actualizar Criterios de Evaluación'
        let pregunta = '¿Esta seguro de actualizar los Criterios de Evaluación Plan Académico?'
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
            this.guardarCriteriosAcademicos()
          }
        })
      },
      async guardarCriteriosAcademicos() {
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/criteriosevaluacion/academico', JSON.stringify(this.criteriosSeccion), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Criterios')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los criterios de evaluación se han actualizado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Criterios. Intente más tarde. ' + err)
        })
      },
      async cargarCriterios() {
        this.$store.state.datosSecciones.forEach(element => {
          if (element.id_seccion == this.$store.state.idSeccion) {
            this.criteriosSeccion = element
          }
        })
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      if(this.$store.state.idRol == 1 || this.$store.state.idRol == 12) {
        this.cargarCriterios()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>