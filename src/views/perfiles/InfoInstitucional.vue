<template>
  <div>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader color="info" text-color="light">
            <h5 class="my-0">Información de la Institución Educativa</h5>
          </CCardHeader>
          <CCardBody>
            <b-row>
              <b-col lg="12">
                <b-tabs content-class="mt-3">
                  <b-tab title="Datos de Identificación" lazy>
                    <div class="p-3">
                      <EditarColegio :datosColegio="datosColegio" @retorno="datosRecibidosColegio"/>
                    </div>
                  </b-tab>
                  <b-tab title="Datos del Rector">
                  </b-tab>
                  <b-tab title="Datos del Representante Legal" active>
                  </b-tab>
                </b-tabs>
              </b-col>
            </b-row>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
  import axios from "axios"
  import { validationMixin } from "vuelidate";
  import { required, minLength } from "vuelidate/lib/validators";
  import * as CONFIG from '@/assets/config.js'
  import EditarColegio from '@/views/perfiles/EditarColegio'

  export default {
    name: 'Perfil',
    mixins: [validationMixin],
    components: {
      EditarColegio
    },
    data () {
      return {
        idColegio: this.$store.state.idInstitucion,
        datosColegio: {},
      }
    },
    methods: {
      datosRecibidosColegio(retorno) {
        if (retorno == 1) {
          this.consultaColegio()
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Datos actualizados correctamente.')
        }
        this.$router.push('/')
      },
      async consultaColegio() {
        await axios
        .get(CONFIG.ROOT_PATH + 'colegios/colegio', { params: { idColegio: this.idColegio }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Colegio')
          } else{
            if (response.data.datos != 0) {
              this.datosColegio = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Colegio. Intente más tarde. ' + err)
        })
      },
      iniciarVista() {
        if(this.$store.state.idRol == 5) {
          this.consultaColegio()
        } else {
          this.$router.push('/restringida')
        }
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.iniciarVista()
    }
  }
</script>
