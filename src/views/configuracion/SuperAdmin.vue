<template>
  <div>
    <b-row class="mt-0">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="credit-card2-front" aria-hidden="true"></b-icon> SUPERADMIN</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <b-tabs content-class="mt-3">
                  <b-tab title="Actualizar Datos Estudiantes" active>
                    <CCard style="margin-top: -17">
                      <CCardBody>
                        <b-row>
                          <b-col lg="12">
                            <p>La tabla "lista_datos" debe estar precargada con el excel de los datos a actualizar por el campo documento, Este se debe guardar en formato CSV para cargarla en la tabla "lista_datos".</p>
                            <p>Actualizar la tabla "estudiantes" con los datos de la tabla "lista_datos".</p>
                            <hr>
                            <b-button class="small mx-1 mt-2" variant="primary" @click="actualizarDatos">Actualizar Datos</b-button>
                          </b-col>
                          <div v-if="esperar">
                            <div class="text-center m-5">
                              <b-spinner style="width: 3rem; height: 3rem;" label="Spinner"></b-spinner>
                              <br><strong>Actualizando los datos...</strong>
                            </div>
                          </div>
                        </b-row>
                      </CCardBody>
                    </CCard>
                  </b-tab>
                  <b-tab title="Cargar Estudiantes Simat">
                    <CCard style="margin-top: -17">
                      <CCardBody>
                        <b-row>
                          <b-col lg="12">
                            <p>La tabla "simat" debe estar precargada con el Anexo 6A, Este anexo se debe guardar en formato CSV, sin tiutulos e importarla en la tabla.</p>
                            <p>Se validaran los datos de la tabla "simat" y se copiaran en la tabla "estudiantes".</p>
                            <hr>
                            <b-button class="small mx-1 mt-2" variant="primary" @click="validarDatos" disabled>Validar Datos</b-button>
                          </b-col>
                          <div v-if="esperar">
                            <div class="text-center m-5">
                              <b-spinner style="width: 3rem; height: 3rem;" label="Spinner"></b-spinner>
                              <br><strong>Validando los datos...</strong>
                            </div>
                          </div>
                        </b-row>
                      </CCardBody>
                    </CCard>
                  </b-tab>
                </b-tabs>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
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
  import { uuid } from 'vue-uuid'

  export default {
    name: 'superadmin',
    data () {
      return {
        datosEstudianteSimat: null,
        listaEstudiantesSimat: null,
        listaDatosEstudiantes: null,
        esperar: false
      }
    },
    methods: {
      async actualizarDatos() {
        this.esperar = true
        this.listaDatosEstudiantes = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/datosestudiantesaactualizar')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Datos Estudiantes')
          } else {
            this.listaDatosEstudiantes = response.data.datos
            console.log('No.Est a Actualizar: ' + response.data.datos.length)
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Datos Estudiantes!. Intente más tarde. ' + err)
        })

        await axios
        .put(CONFIG.ROOT_PATH + 'academico/actualizardatosestudiantes', JSON.stringify(this.listaDatosEstudiantes), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Datos Estudiantes')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'¡Los datos de los estudiantes se han actualizado satisfactorimanete!')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Datos Estudiantes. Intente más tarde. ' + err)
        })
        this.esperar = false
      },
      async validarDatos() {
        this.esperar = true
        this.listaEstudiantesSimat = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/datossimat')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Validar Datos Simat')
          } else {
            console.log('No.Est: ' + response.data.datos.length)
            response.data.datos.forEach(element => {
              this.datosEstudianteSimat = {}
              this.datosEstudianteSimat.id = uuid.v1()
              this.datosEstudianteSimat.documento = element.NRO_DOCUMENTO
              this.datosEstudianteSimat.id_tipo_documento = element.TIPO_DOCUMENTO
              let coddpto = '00'
              if (element.EXP_DEPTO !== '' && element.EXP_DEPTO !== null) {
                coddpto = Number(element.EXP_DEPTO) < 10 ? '0' + element.EXP_DEPTO : element.EXP_DEPTO
              }
              let codmuni = '000'
              if (element.EXP_MUN !== '' && element.EXP_MUN !== null) {
                if (Number(element.EXP_MUN) < 10)
                  codmuni = '00' + element.EXP_MUN
                else if (Number(element.EXP_MUN) >= 10 && Number(element.EXP_MUN) < 100)
                  codmuni = '0' + element.EXP_MUN
                else
                  codmuni = element.EXP_MUN
              }
              this.datosEstudianteSimat.id_municipio_documento = coddpto + codmuni
              this.datosEstudianteSimat.apellido1 = element.APELLIDO1
              this.datosEstudianteSimat.apellido2 = element.APELLIDO2
              this.datosEstudianteSimat.nombre1 = element.NOMBRE1
              this.datosEstudianteSimat.nombre2 = element.NOMBRE2
              this.datosEstudianteSimat.id_genero = element.GENERO
              this.datosEstudianteSimat.fecha_nacimiento = element.FECHA_NACIMIENTO
              coddpto = '00'
              if (element.NAC_DEPTO !== '' && element.NAC_DEPTO !== null) {
                coddpto = Number(element.NAC_DEPTO) < 10 ? '0' + element.NAC_DEPTO : element.NAC_DEPTO
              }
              codmuni = '000'
              if (element.NAC_MUN !== '' && element.NAC_MUN !== null) {
                if (Number(element.NAC_MUN) < 10)
                  codmuni = '00' + element.NAC_MUN
                else if (Number(element.NAC_MUN) >= 10 && Number(element.NAC_MUN) < 100)
                  codmuni = '0' + element.NAC_MUN
                else
                  codmuni = element.NAC_MUN
              }
              this.datosEstudianteSimat.id_municipio_nacimiento = coddpto + codmuni
              let codpais = null
              if (element.PAIS_ORIGEN !== '' && element.PAIS_ORIGEN !== null) {
                if (Number(element.PAIS_ORIGEN) < 10)
                  codpais = '00' + element.PAIS_ORIGEN
                else if (Number(element.PAIS_ORIGEN) >= 10 && Number(element.PAIS_ORIGEN) < 100)
                  codpais = '0' + element.PAIS_ORIGEN
                else
                  codpais = element.PAIS_ORIGEN
              }
              this.datosEstudianteSimat.id_nacionalidad = codpais
              this.datosEstudianteSimat.id_rh = 9
              this.datosEstudianteSimat.id_estrato = element.ESTRATO
              if (element.SISBEN == '' || element.SISBEN == null || element.SISBEN == 'NO APLICA') {
                this.datosEstudianteSimat.id_sisben = 0
              } else {
                this.$store.state.datosTablas.sisben.forEach(elementS => {
                  if (element.SISBEN == elementS.subgrupo) {
                    this.datosEstudianteSimat.id_sisben = elementS.id
                  }                
                })
              }
              let coddisc = '99'
              if (element.TIPO_DISCAPACIDAD !== '' && element.TIPO_DISCAPACIDAD !== null) {
                coddisc = Number(element.TIPO_DISCAPACIDAD) < 10 ? '0' + element.TIPO_DISCAPACIDAD : element.TIPO_DISCAPACIDAD
              }
              this.datosEstudianteSimat.id_discapacidad = coddisc
              let codcapa = '9'
              if (element.CAP_EXC !== '' && element.CAP_EXC !== null && element.CAP_EXC != 7 && element.CAP_EXC != 10 && element.CAP_EXC != 11) {
                codcapa = element.CAP_EXC
              }
              this.datosEstudianteSimat.id_capacidades = codcapa
              this.datosEstudianteSimat.id_etnia = element.ETNIA
              this.datosEstudianteSimat.id_victima = 99
              this.datosEstudianteSimat.id_municipio_expulsor = null
              this.datosEstudianteSimat.id_eps = null
              this.datosEstudianteSimat.id_seguro = 'N'
              this.datosEstudianteSimat.aseguradora = null
              this.datosEstudianteSimat.enfermedades = null
              this.datosEstudianteSimat.id_papa = null
              this.datosEstudianteSimat.id_mama = null
              this.datosEstudianteSimat.id_acudiente = null
              this.datosEstudianteSimat.id_parentesco = null
              this.datosEstudianteSimat.direccion = element.DIRECCION_RESIDENCIA
              coddpto = '00'
              if (element.RES_DEPTO !== '' && element.RES_DEPTO !== null) {
                coddpto = Number(element.RES_DEPTO) < 10 ? '0' + element.RES_DEPTO : element.RES_DEPTO
              }
              codmuni = '000'
              if (element.RES_MUN !== '' && element.RES_MUN !== null) {
                if (Number(element.RES_MUN) < 10)
                  codmuni = '00' + element.RES_MUN
                else if (Number(element.RES_MUN) >= 10 && Number(element.RES_MUN) < 100)
                  codmuni = '0' + element.RES_MUN
                else
                  codmuni = element.RES_MUN
              }
              this.datosEstudianteSimat.id_municipio_direccion = coddpto + codmuni
              this.datosEstudianteSimat.barrio = null
              this.datosEstudianteSimat.id_zona = element.ZON_ALU
              let tel1 = null
              if (element.TEL !== '' && element.TEL !== null) {
                tel1 = element.TEL.substr(0,10)
              }
              this.datosEstudianteSimat.telefono1 = tel1
              this.datosEstudianteSimat.telefono2 = null
              this.datosEstudianteSimat.correo = null
              this.listaEstudiantesSimat.push(this.datosEstudianteSimat)
            });
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Validar Datos Simat!. Intente más tarde. ' + err)
        })

        await axios
        .post(CONFIG.ROOT_PATH + 'academico/cargarestudiantessimat', JSON.stringify(this.listaEstudiantesSimat), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Cargar Datos Estudiantes Simat')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'¡Los datos de los estudiantes se han cargado satisfactorimanete!')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Cargar Datos Estudiantes Simat. Intente más tarde. ' + err)
        })
        this.esperar = false
      },
      cancelarFormulario() {
        this.$router.push('/')
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      if(this.$store.state.idRol == 1) {

      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>