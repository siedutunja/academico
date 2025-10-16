<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="layers" aria-hidden="true"></b-icon> CONFIGURACIÓN CONSULTA ACUDIENTE</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <b-tabs content-class="mt-3">
                  <b-tab title="Consulta Acudiente" active>
                    <b-card style="margin-top: -17">
                      <b-card-text>
                        <b-card bg-variant="light">
                          <b-row>
                            <b-col lg="12"><h5>Fecha de la Consulta</h5><hr></b-col>
                            <b-col lg="6">
                              <b-form-group label="Fecha de Inicio de la Consulta*" label-for="ini" class="etiqueta">
                                <b-form-input type="date" id="ini" v-model="$v.infoConsulta.fechaIniConsulta.$model" :state="validateStateC('fechaIniConsulta')" aria-describedby="feedIni"></b-form-input>
                                <b-form-invalid-feedback id="feedIni">Campo requerido.</b-form-invalid-feedback>
                              </b-form-group>
                            </b-col>
                            <b-col lg="6">
                              <b-form-group label="Fecha de Terminación de la Consulta*" label-for="fin" class="etiqueta">
                                <b-form-input type="date" id="fin" v-model="$v.infoConsulta.fechaFinConsulta.$model" :state="validateStateC('fechaFinConsulta')" aria-describedby="feedFin"></b-form-input>
                                <b-form-invalid-feedback id="feedFin">Campo requerido.</b-form-invalid-feedback>
                              </b-form-group>
                            </b-col>
                            <b-col lg="12">
                              <h6>Seleccione la fecha de inicio y de terminación de la consulta para que los Acudientes puedan ingresar a la plataforma y consulten el estudiante.</h6>
                            </b-col>
                          </b-row>
                        </b-card>
                        <b-card bg-variant="light">
                          <b-row>
                            <b-col lg="12"><h5>Consultar y Descargar el Boletin de Calificaciones</h5><hr></b-col>
                            <b-col lg="3">
                              <b-form-group label="Descargar Boletin*" label-for="boletin" class="etiqueta">
                                <b-form-select  id="boletin" ref="boletin" v-model="$v.infoConsulta.consultaBoletin.$model" :options="comboBoletines" :state="validateStateC('consultaBoletin')" aria-describedby="feedBoletin"></b-form-select>
                                <b-form-invalid-feedback id="feedBoletin">Campo requerido.</b-form-invalid-feedback>
                              </b-form-group>
                            </b-col>
                            <b-col lg="3">
                              <b-form-group label="Periodo:" label-for="periodo" class="etiqueta">
                                <b-form-select id="periodo" ref="periodo" v-model="$v.infoConsulta.periodo_consulta.$model" :options="comboPeriodos" :state="validateStateC('periodo_consulta')" aria-describedby="feedPer"></b-form-select>
                                <b-form-invalid-feedback id="feedPer">Campo requerido.</b-form-invalid-feedback>
                              </b-form-group>
                            </b-col>
                            <b-col lg="12">
                              <h6>Seleccione [SI] si desea que el Acudiente pueda consultar y descargar el boletin de calificaciones del periodo.</h6>
                            </b-col>
                          </b-row>
                        </b-card>
                        <b-card bg-variant="light">
                          <b-row>
                            <b-col lg="12"><h5>Actualizar la Ficha de Datos del Estudiante</h5><hr></b-col>
                            <b-col lg="3">
                              <b-form-group label="Actualizar Ficha Estudiante*" label-for="ficha" class="etiqueta">
                                <b-form-select  id="ficha" ref="ficha" v-model="$v.infoConsulta.actualizarFicha.$model" :options="comboFicha" :state="validateStateC('actualizarFicha')" aria-describedby="feedFicha"></b-form-select>
                                <b-form-invalid-feedback id="feedFicha">Campo requerido.</b-form-invalid-feedback>
                              </b-form-group>
                            </b-col>
                            <b-col lg="12">
                              <h6>Seleccione [SI] si desea que el Acudiente actualice la información del Estudiante. En la ficha del estudiante se debe actualizar la información del Estudiante, del Papá, de la Mamá y del Acudiente.</h6>
                              <h6>Importante tener en cuenta que si se habilita la actualización de datos, el Acudiente no podrá consultar y descargar el boletin de calificaciones hasta que no se diligencie completamente la información del Papá, de la Mamá, del Acudiente y del Estudiante.</h6>
                            </b-col>
                          </b-row>
                        </b-card>
                        <b-card bg-variant="light">
                          <b-row>
                            <b-col lg="12"><h5>Consultar y Descargar Observador</h5><hr></b-col>
                            <b-col lg="3">
                              <b-form-group label="Descargar Observador*" label-for="observador" class="etiqueta">
                                <b-form-select  id="observador" ref="observador" v-model="$v.infoConsulta.consultaObservador.$model" :options="comboObservadores" :state="validateStateC('consultaObservador')" aria-describedby="feedObservador"></b-form-select>
                                <b-form-invalid-feedback id="feedObservador">Campo requerido.</b-form-invalid-feedback>
                              </b-form-group>
                            </b-col>
                            <b-col lg="12">
                              <h6>Seleccione [SI] si desea que el Acudiente pueda consultar y descargar el observador del estudiante.</h6>
                            </b-col>
                          </b-row>
                        </b-card>
                        <b-row>
                          <b-col lg="12">
                            <hr>
                            <div class="float-right text-medium-emphasis text-info">* Campo requerido</div>
                            <b-button class="small mx-1 mt-2" variant="primary" @click="guardarDatosConsulta">Guardar Datos</b-button>
                          </b-col>
                        </b-row>
                      </b-card-text>
                    </b-card>
                  </b-tab>
                </b-tabs>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Actualice los datos y haga clic en Guardar Datos.</em>
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

  export default {
    name: 'configurarconsultaacudiente',
    mixins: [validationMixin],
    components: {
    },
    data () {
      return {
        idPeriodo: null,
        comboPeriodos: [],
        comboBoletines: [
          { value: 0, text: 'NO' },
          { value: 1, text: 'SI'},
        ],
        comboObservadores: [
          { value: 0, text: 'NO' },
          { value: 1, text: 'SI'},
        ],
        comboFicha: [
          { value: 0, text: 'NO' },
          { value: 1, text: 'SI'},
        ],
        infoConsulta: {
          id: null,
          periodo_consulta: null,
          fechaIniConsulta: null,
          fechaFinConsulta: null,
          actualizarFicha: null,
          consultaBoletin: null,
          consultaObservador: null,
        },
      }
    },
    validations: {
      infoConsulta: {
        periodo_consulta: { required },
        fechaIniConsulta: { required },
        fechaFinConsulta: { required },
        actualizarFicha: { required },
        consultaBoletin: { required },
        consultaObservador: { required },
      },
    },
    methods: {
      async guardarDatosConsulta() {
        this.$v.infoConsulta.$touch()
        if (this.$v.infoConsulta.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          this.infoConsulta.fechaFinConsulta = this.infoConsulta.fechaFinConsulta + ' 23:59:59' 
          //console.log(JSON.stringify(this.infoConsulta))
          await axios
          .put(CONFIG.ROOT_PATH + 'academico/configuracion/consultaweb', JSON.stringify(this.infoConsulta), { headers: {"Content-Type": "application/json; charset=utf-8" }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Datos Consulta Web')
            } else{
              this.infoConsulta.fechaFinConsulta = this.infoConsulta.fechaFinConsulta.substr(0,10)
              this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos de la configuración para la consulta de los acudientes se han actualizado correctamente.')
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Datos Consulta Web. Intente más tarde. ' + err)
          })
        }
      },
      async cargarConfiguracionConsulta() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/configuracion/documentos', {params: {idInstitucion: this.$store.state.idInstitucion}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta datos configuración documentos')
          } else {
            if(response.data.datos != 0) {
              this.infoConsulta.id = response.data.datos.id
              this.infoConsulta.periodo_consulta = response.data.datos.periodo_consulta
              this.infoConsulta.fechaIniConsulta = response.data.datos.fechaIniConsulta != '' ? response.data.datos.fechaIniConsulta.substr(0,10) : null
              this.infoConsulta.fechaFinConsulta = response.data.datos.fechaFinConsulta != '' ? response.data.datos.fechaFinConsulta.substr(0,10) : null
              this.infoConsulta.actualizarFicha = response.data.datos.actualizarFicha
              this.infoConsulta.consultaBoletin = response.data.datos.consultaBoletin
              this.infoConsulta.consultaObservador = response.data.datos.consultaObservador
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta datos configuración documentos. Intente más tarde. ' + err)
        })
      },
      validateStateC(name) {
        const { $dirty, $error } = this.$v.infoConsulta[name]
        return $dirty ? !$error : null
      },
      async ocuparComboPeriodos() {
        this.comboPeriodos = []
        this.$store.state.datosTablas.periodos.forEach(element => {
          this.comboPeriodos.push({ 'value': element.id, 'text': element.periodo.toUpperCase() })
        })
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      if(this.$store.state.idRol == 1 || this.$store.state.idRol == 12) {
        this.ocuparComboPeriodos()
        this.cargarConfiguracionConsulta()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>