<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> CRITERIOS DE EVALUACIÓN</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <b-card border-variant="primary" title="Criterio de Evaluación 1">
                  <b-card-text>
                    <hr>
                    <b-row>
                      <b-col lg="3" md="6">
                        <b-form-group label="Estado:" label-for="estado1" class="etiqueta">
                          <b-form-select  id="estado1" ref="estado1" v-model="criteriosSeccion.estadoC1" :options="comboEstados" aria-describedby="feedEstado1" disabled></b-form-select>
                          <b-form-invalid-feedback id="feedEstado1">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col lg="9" md="6">
                        <b-form-group label="Nombre del Criterio:" label-for="criterio1" class="etiqueta">
                          <b-form-input id="criterio1" ref="criterio1" v-model.trim="criteriosSeccion.nombreC1" aria-describedby="feedCriterio1" autocomplete="off" maxlength="15"></b-form-input>
                          <b-form-invalid-feedback id="feedCriterio1" >Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Porcentaje:" label-for="pcriterio1" class="etiqueta">
                          <b-form-input type="number" id="pcriterio1" ref="pcriterio1" v-model.trim="criteriosSeccion.porcentajeC1" aria-describedby="feedpCriterio1" autocomplete="off" maxlength="3"></b-form-input>
                          <b-form-invalid-feedback id="feedpCriterio1" >Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="12">
                <b-card border-variant="primary" title="Criterio de Evaluación 2">
                  <b-card-text>
                    <hr>
                    <b-row>
                      <b-col lg="3" md="6">
                        <b-form-group label="Estado:" label-for="estado2" class="etiqueta">
                          <b-form-select  id="estado2" ref="estado2" v-model="criteriosSeccion.estadoC2" :options="comboEstados" aria-describedby="feedEstado2"></b-form-select>
                          <b-form-invalid-feedback id="feedEstado2">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row v-if="criteriosSeccion.estadoC2 == 1">
                      <b-col lg="9" md="6">
                        <b-form-group label="Nombre del Criterio:" label-for="criterio2" class="etiqueta">
                          <b-form-input id="criterio2" ref="criterio2" v-model.trim="criteriosSeccion.nombreC2" aria-describedby="feedCriterio2" autocomplete="off" maxlength="15"></b-form-input>
                          <b-form-invalid-feedback id="feedCriterio2" >Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
                        <b-form-group label="Porcentaje:" label-for="pcriterio2" class="etiqueta">
                          <b-form-input type="number" id="pcriterio2" ref="pcriterio2" v-model.trim="criteriosSeccion.porcentajeC2" aria-describedby="feedpCriterio2" autocomplete="off" maxlength="3"></b-form-input>
                          <b-form-invalid-feedback id="feedpCriterio2" >Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="12">
                <b-card border-variant="primary" title="Criterio de Evaluación 3">
                  <b-card-text>
                    <hr>
                    <b-row>
                      <b-col lg="3" md="6">
                        <b-form-group label="Estado:" label-for="estado3" class="etiqueta">
                          <b-form-select  id="estado3" ref="estado3" v-model="criteriosSeccion.estadoC3" :options="comboEstados" aria-describedby="feedEstado3"></b-form-select>
                          <b-form-invalid-feedback id="feedEstado3">Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row v-if="criteriosSeccion.estadoC3 == 1">
                      <b-col lg="9" md="6">
                        <b-form-group label="Nombre del Criterio:" label-for="criterio3" class="etiqueta">
                          <b-form-input id="criterio3" ref="criterio3" v-model.trim="criteriosSeccion.nombreC3" aria-describedby="feedCriterio3" autocomplete="off" maxlength="15"></b-form-input>
                          <b-form-invalid-feedback id="feedCriterio3" >Campo requerido.</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3" md="6">
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
                <b-card border-variant="primary" title="Conceptos Valorativos">
                  <b-card-text>
                    <hr>
                    <div>
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
                    </div>
                    <div>
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
                    </div>
                    <div>
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
                    </div>
                    <div>
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
                    </div>
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="12">
                <b-button class="small mx-1 mt-2" variant="primary" @click="validarDatosFormulario">Guardar Criterios</b-button>
              </b-col>
            </b-row>
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
          minBaj: null,
          maxBaj: null,
          minBas: null,
          maxBas: null,
          minAlt: null,
          maxAlt: null,
          minSup: null,
          maxSup: null
        },
        comboEstados: [
          { 'value': 0, 'text': 'INACTIVO'},
          { 'value': 1, 'text': 'ACTIVO'}
        ],
      }
    },
    methods: {
      validarDatosFormulario() {
        let titulo = 'Actualizar Criterios de Evaluación'
        let pregunta = '¿Esta seguro de actualizar los Criterios de Evaluación?'
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
            this.guardarCriterios()
          }
        })
      },
      async guardarCriterios() {
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/criteriosevaluacion', JSON.stringify(this.criteriosSeccion), { headers: {"Content-Type": "application/json; charset=utf-8" }})
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