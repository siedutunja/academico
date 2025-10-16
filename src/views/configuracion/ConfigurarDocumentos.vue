<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="layers" aria-hidden="true"></b-icon> CONFIGURACIÓN DE DOCUMENTOS</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <b-tabs content-class="mt-3">
                  <b-tab title="General" active>
                    <b-card style="margin-top: -17">
                      <b-card-text>
                        <b-row>
                          <b-col lg="4" md="4">
                            <b-form-group label="Nombres y Apellidos del Rector(a)*" label-for="rector" class="etiqueta">
                              <b-form-input id="rector" ref="rector" v-model.trim="$v.infoGeneral.rector.$model" :state="validateStateG('rector')" aria-describedby="feedRector" autocomplete="off" maxlength="100"></b-form-input>
                              <b-form-invalid-feedback id="feedRector" >Campo requerido.</b-form-invalid-feedback>
                            </b-form-group>
                          </b-col>
                          <b-col lg="4" md="4">
                            <b-form-group label="Documento y Lugar Rector(a)*" label-for="drector" class="etiqueta">
                              <b-form-input id="drector" ref="drector" v-model.trim="$v.infoGeneral.documento_rector.$model" :state="validateStateG('documento_rector')" aria-describedby="feeddRector" autocomplete="off" maxlength="100"></b-form-input>
                              <b-form-invalid-feedback id="feeddRector" >Campo requerido.</b-form-invalid-feedback>
                            </b-form-group>
                          </b-col>
                          <b-col lg="4" md="4">
                            <b-form-group label="Cargo Rector(a)*" label-for="crector" class="etiqueta">
                              <b-form-input id="crector" ref="crector" v-model.trim="$v.infoGeneral.cargo_rector.$model" :state="validateStateG('cargo_rector')" aria-describedby="feedcRector" autocomplete="off" maxlength="50"></b-form-input>
                              <b-form-invalid-feedback id="feedcRector" >Campo requerido.</b-form-invalid-feedback>
                            </b-form-group>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col lg="4" md="4">
                            <b-form-group label="Nombres y Apellidos Secretario(a)*" label-for="secre" class="etiqueta">
                              <b-form-input id="secre" ref="secre" v-model.trim="$v.infoGeneral.secretaria.$model" :state="validateStateG('secretaria')" aria-describedby="feedSecre" autocomplete="off" maxlength="100"></b-form-input>
                              <b-form-invalid-feedback id="feedSecre" >Campo requerido.</b-form-invalid-feedback>
                            </b-form-group>
                          </b-col>
                          <b-col lg="4" md="4">
                            <b-form-group label="Documento y Lugar Secretario(a)*" label-for="dsecre" class="etiqueta">
                              <b-form-input id="dsecre" ref="dsecre" v-model.trim="$v.infoGeneral.documento_secretaria.$model" :state="validateStateG('documento_secretaria')" aria-describedby="feeddSecre" autocomplete="off" maxlength="100"></b-form-input>
                              <b-form-invalid-feedback id="feeddSecre" >Campo requerido.</b-form-invalid-feedback>
                            </b-form-group>
                          </b-col>
                          <b-col lg="4" md="4">
                            <b-form-group label="Cargo Secretario(a)*" label-for="csecre" class="etiqueta">
                              <b-form-input id="csecre" ref="csecre" v-model.trim="$v.infoGeneral.cargo_secretaria.$model" :state="validateStateG('cargo_secretaria')" aria-describedby="feedcSecre" autocomplete="off" maxlength="50"></b-form-input>
                              <b-form-invalid-feedback id="feedcSecre" >Campo requerido.</b-form-invalid-feedback>
                            </b-form-group>
                          </b-col>
                        </b-row>
                        <b-row><b-col lg="12"><hr></b-col></b-row>
                        <b-row>
                          <b-col lg="12" md="12">
                            <b-form-group label="Resolución de Aprobación*" label-for="resolucion" class="etiqueta">
                              <b-form-input id="resolucion" ref="resolucion" v-model.trim="$v.infoGeneral.resolucion.$model" :state="validateStateG('resolucion')" aria-describedby="feedResolucion" autocomplete="off"></b-form-input>
                              <b-form-invalid-feedback id="feedResolucion" >Campo requerido.</b-form-invalid-feedback>
                            </b-form-group>
                          </b-col>
                        </b-row>
                        <b-row><b-col lg="12"><hr></b-col></b-row>
                        <b-row>
                          <b-col lg="12" md="12">
                            <b-form-group label="Pie de Página*" label-for="pie" class="etiqueta">
                              <b-form-input id="pie" ref="pie" v-model.trim="$v.infoGeneral.pie.$model" :state="validateStateG('pie')" aria-describedby="feedPie" autocomplete="off"></b-form-input>
                              <b-form-invalid-feedback id="feedPie" >Campo requerido.</b-form-invalid-feedback>
                            </b-form-group>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col lg="12">
                            <hr>
                            <div class="float-right text-medium-emphasis text-info">* Campo requerido</div>
                            <b-button class="small mx-1 mt-2" variant="primary" @click="guardarDatosGeneral">Guardar Datos</b-button>
                          </b-col>
                        </b-row>
                      </b-card-text>
                    </b-card>
                  </b-tab>
                  <b-tab title="Constancias">
                    <b-card style="margin-top: -17">
                      <b-card-text>
                        <b-row>
                          <b-col lg="4" md="4">
                            <b-form-group label="Tipo de Papel*" label-for="papel" class="etiqueta">
                              <b-form-select  id="papel" ref="papel" v-model="$v.infoConstancia.cons_papel.$model" :options="comboPapeles" :state="validateStateC('cons_papel')" aria-describedby="feedPapel"></b-form-select>
                              <b-form-invalid-feedback id="feedPapel">Campo requerido.</b-form-invalid-feedback>
                            </b-form-group>
                          </b-col>
                          <b-col lg="4" md="4">
                            <b-form-group label="Margen Superior*" label-for="margen" class="etiqueta">
                              <b-form-select  id="margen" ref="margen" v-model="$v.infoConstancia.cons_margen.$model" :options="comboMargenes" :state="validateStateC('cons_margen')" aria-describedby="feedMargen"></b-form-select>
                              <b-form-invalid-feedback id="feedMargen">Campo requerido.</b-form-invalid-feedback>
                            </b-form-group>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col lg="12" md="12">
                            <b-form-group label="Bloque Superior*" label-for="constanciaB1" class="etiqueta">
                              <b-form-textarea id="constanciaB1" ref="constanciaB1" v-model.trim="$v.infoConstancia.cons_bloque1.$model" :state="validateStateC('cons_bloque1')" aria-describedby="feedConstanciaB1" autocomplete="off" rows="5"></b-form-textarea>
                              <b-form-invalid-feedback id="feedConstanciaB1">Campo requerido.</b-form-invalid-feedback>
                            </b-form-group>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col lg="6">
                            <b-form-group label="Seleccione las Firmas*" class="etiqueta">
                              <b-form-checkbox class="ml-4 m-1" v-for="firma in firmas" v-model="firmasSeleccionadas" :key="firma.value" :value="firma.value" :disabled="firma.disabled" size="">
                                {{ firma.text }}
                              </b-form-checkbox>
                            </b-form-group>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col lg="12">
                            <hr>
                            <div class="float-right text-medium-emphasis text-info">* Campo requerido</div>
                            <b-button class="small mx-1 mt-2" variant="primary" @click="guardarDatosConstancia">Guardar Datos</b-button>
                          </b-col>
                        </b-row>
                      </b-card-text>
                    </b-card>
                  </b-tab>
                  <b-tab title="Paz y Salvo">
                    <b-card style="margin-top: -17">
                      <b-card-text>
                        <b-row>
                          <b-col lg="6" md="6">
                            <b-form-group label="Firma 1:" label-for="firma1" class="etiqueta">
                              <b-form-input id="firma1" ref="firma1" v-model.trim="infoPaz.firmaP1" autocomplete="off" maxlength="50"></b-form-input>
                            </b-form-group>
                          </b-col>
                          <b-col lg="6" md="6">
                            <b-form-group label="Firma 2:" label-for="firma2" class="etiqueta">
                              <b-form-input id="firma2" ref="firma2" v-model.trim="infoPaz.firmaP2" autocomplete="off" maxlength="50"></b-form-input>
                            </b-form-group>
                          </b-col>
                          <b-col lg="6" md="6">
                            <b-form-group label="Firma 3:" label-for="firma3" class="etiqueta">
                              <b-form-input id="firma3" ref="firma3" v-model.trim="infoPaz.firmaP3" autocomplete="off" maxlength="50"></b-form-input>
                            </b-form-group>
                          </b-col>
                          <b-col lg="6" md="6">
                            <b-form-group label="Firma 4:" label-for="firma4" class="etiqueta">
                              <b-form-input id="firma4" ref="firma4" v-model.trim="infoPaz.firmaP4" autocomplete="off" maxlength="50"></b-form-input>
                            </b-form-group>
                          </b-col>
                          <b-col lg="6" md="6">
                            <b-form-group label="Firma 5:" label-for="firma5" class="etiqueta">
                              <b-form-input id="firma5" ref="firma5" v-model.trim="infoPaz.firmaP5" autocomplete="off" maxlength="50"></b-form-input>
                            </b-form-group>
                          </b-col>
                          <b-col lg="6" md="6">
                            <b-form-group label="Firma 6:" label-for="firma6" class="etiqueta">
                              <b-form-input id="firma6" ref="firma6" v-model.trim="infoPaz.firmaP6" autocomplete="off" maxlength="50"></b-form-input>
                            </b-form-group>
                          </b-col>
                          <b-col lg="6" md="6">
                            <b-form-group label="Firma 7:" label-for="firma7" class="etiqueta">
                              <b-form-input id="firma7" ref="firma7" v-model.trim="infoPaz.firmaP7" autocomplete="off" maxlength="50"></b-form-input>
                            </b-form-group>
                          </b-col>
                          <b-col lg="6" md="6">
                            <b-form-group label="Firma 8:" label-for="firma8" class="etiqueta">
                              <b-form-input id="firma8" ref="firma8" v-model.trim="infoPaz.firmaP8" autocomplete="off" maxlength="50"></b-form-input>
                            </b-form-group>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col lg="12">
                            <hr>
                            <div class="float-right text-medium-emphasis text-info">* Campo requerido</div>
                            <b-button class="small mx-1 mt-2" variant="primary" @click="guardarDatosPaz">Guardar Datos</b-button>
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
    name: 'configurardocumentos',
    mixins: [validationMixin],
    components: {
    },
    data () {
      return {
        comboPapeles: [
          { value: 1, text: 'Papel en Blanco'},
          { value: 2, text: 'Formato PreImpreso' },
        ],
        comboMargenes: [
          { value: 1, text: '1'},
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' },
        ],
        infoGeneral: {
          rector: null,
          documento_rector: null,
          cargo_rector: null,
          secretaria: null,
          documento_secretaria: null,
          cargo_secretaria: null,
          pie: null,
          resolucion: null,
        },
        infoConstancia: {
          id: null,
          cons_bloque1: null,
          cons_papel: null,
          cons_firma_rector: null,
          cons_firma_secre: null,
          cons_margen: null,
        },
        infoPaz: {
          id: null,
          firmaP1: null,
          firmaP2: null,
          firmaP3: null,
          firmaP4: null,
          firmaP5: null,
          firmaP6: null,
          firmaP7: null,
          firmaP8: null,
        },
        firmas: [
          { value: 1, text: 'Rector(a)'},
          { value: 2, text: 'Secretario(a)' }
        ],
        firmasSeleccionadas: [],
        comboVer: [
          { value: 0, text: 'NO'},
          { value: 1, text: 'SI' }
        ],
      }
    },
    validations: {
      infoConstancia: {
        cons_bloque1: { required, minLength: minLength(1) },
        cons_papel: { required },
        cons_margen: { required },
      },
      infoGeneral: {
        rector: { required, minLength: minLength(1) },
        documento_rector: { required, minLength: minLength(1) },
        cargo_rector: { required, minLength: minLength(1) },
        secretaria: { required, minLength: minLength(1) },
        documento_secretaria: { required, minLength: minLength(1) },
        cargo_secretaria: { required, minLength: minLength(1) },
        pie: { required, minLength: minLength(1) },
        resolucion: { required, minLength: minLength(1) },
      }
    },
    methods: {
      async guardarDatosPaz() {
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/configuracion/pazysalvo', JSON.stringify(this.infoPaz), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Datos Paz y Salvo')
          } else{
            this.$store.commit('set', ['firmaPaz1', this.infoPaz.firmaP1])
            this.$store.commit('set', ['firmaPaz2', this.infoPaz.firmaP2])
            this.$store.commit('set', ['firmaPaz3', this.infoPaz.firmaP3])
            this.$store.commit('set', ['firmaPaz4', this.infoPaz.firmaP4])
            this.$store.commit('set', ['firmaPaz5', this.infoPaz.firmaP5])
            this.$store.commit('set', ['firmaPaz6', this.infoPaz.firmaP6])
            this.$store.commit('set', ['firmaPaz7', this.infoPaz.firmaP7])
            this.$store.commit('set', ['firmaPaz8', this.infoPaz.firmaP8])
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos de la configuración del Paz y Salvo se han actualizado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Datos Paz y Salvo. Intente más tarde. ' + err)
        })
      },
      async guardarDatosGeneral() {
        this.$v.infoGeneral.$touch()
        if (this.$v.infoGeneral.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          this.infoGeneral.rector = this.infoGeneral.rector.toUpperCase()
          this.infoGeneral.secretaria = this.infoGeneral.secretaria.toUpperCase()
          await axios
          .put(CONFIG.ROOT_PATH + 'academico/configuracion/general', JSON.stringify(this.infoGeneral), { headers: {"Content-Type": "application/json; charset=utf-8" }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Datos Generales Documentos')
            } else{
              this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos de la configuración General se han actualizado correctamente.')
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Datos Generales Documentos. Intente más tarde. ' + err)
          })
        }
      },
      async guardarDatosConstancia() {
        this.$v.infoConstancia.$touch()
        if (this.$v.infoConstancia.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          this.infoConstancia.cons_firma_rector = 0
          this.infoConstancia.cons_firma_secre = 0
          this.firmasSeleccionadas.forEach(element => {
            if (element == 1) {
              this.infoConstancia.cons_firma_rector = 1
            }
            if (element == 2) {
              this.infoConstancia.cons_firma_secre = 1
            }
          })
          await axios
          .put(CONFIG.ROOT_PATH + 'academico/configuracion/constancias', JSON.stringify(this.infoConstancia), { headers: {"Content-Type": "application/json; charset=utf-8" }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Constancia')
            } else{
              this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos de la configuración de las Constancias se han actualizado correctamente.')
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Constancia. Intente más tarde. ' + err)
          })
        }
      },
      async cargarConfiguracionDocumentos() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/configuracion/documentos', {params: {idInstitucion: this.$store.state.idInstitucion}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta datos configuración documentos')
          } else {
            if(response.data.datos != 0) {
              this.infoConstancia.id = response.data.datos.id
              this.infoConstancia.cons_bloque1 = response.data.datos.cons_bloque1
              this.infoConstancia.cons_papel = response.data.datos.cons_papel
              this.infoConstancia.cons_margen = response.data.datos.cons_margen
              this.infoConstancia.cons_firma_rector = response.data.datos.cons_firma_rector
              this.infoConstancia.cons_firma_secre = response.data.datos.cons_firma_secre
              this.infoConstancia.cons_firma_rector == 1 ? this.firmasSeleccionadas.push(1) : null
              this.infoConstancia.cons_firma_secre == 1 ? this.firmasSeleccionadas.push(2) : null

              this.infoGeneral.id = response.data.datos.id
              this.infoGeneral.rector = response.data.datos.rector
              this.infoGeneral.documento_rector = response.data.datos.documento_rector
              this.infoGeneral.cargo_rector = response.data.datos.cargo_rector
              this.infoGeneral.secretaria = response.data.datos.secretaria
              this.infoGeneral.documento_secretaria = response.data.datos.documento_secretaria
              this.infoGeneral.cargo_secretaria = response.data.datos.cargo_secretaria
              this.infoGeneral.pie = response.data.datos.pie
              this.infoGeneral.resolucion = response.data.datos.resolucion

              this.infoPaz.id = response.data.datos.id
              this.infoPaz.firmaP1 = response.data.datos.firmaP1
              this.infoPaz.firmaP2 = response.data.datos.firmaP2
              this.infoPaz.firmaP3 = response.data.datos.firmaP3
              this.infoPaz.firmaP4 = response.data.datos.firmaP4
              this.infoPaz.firmaP5 = response.data.datos.firmaP5
              this.infoPaz.firmaP6 = response.data.datos.firmaP6
              this.infoPaz.firmaP7 = response.data.datos.firmaP7
              this.infoPaz.firmaP8 = response.data.datos.firmaP8
              //console.log(JSON.stringify(response.data.datos))
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta datos configuración documentos. Intente más tarde. ' + err)
        })
      },
      soloNumeros(e) {
        let key = window.Event ? e.which : e.keyCode
        if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key == 8) || (key == 9) || (key == 37) || (key == 39))) {
            e.preventDefault()
        }
      },
      validateStateC(name) {
        const { $dirty, $error } = this.$v.infoConstancia[name]
        return $dirty ? !$error : null
      },
      validateStateG(name) {
        const { $dirty, $error } = this.$v.infoGeneral[name]
        return $dirty ? !$error : null
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      if(this.$store.state.idRol == 1 || this.$store.state.idRol == 12) {
        this.cargarConfiguracionDocumentos()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>