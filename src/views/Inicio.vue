<template>
  <div>
    <CRow>
      <CCol>
        <CCard>
          <CCardBody>
            <CCard>
              <CCardFooter style="background: rgb(220, 160, 242, 0.879); margin-top: -40; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);">
                <CRow>
                  <CCol lg="2" md="3">
                    <div class="text-center">
                      <img :src="escudoInstitucion" height="80"/>
                    </div>
                  </CCol>
                  <CCol lg="10" md="9">
                    <div class="mt-2">
                      <h6 style="margin-top: -5">{{ secretaria }}</h6>
                      <h4 style="margin-top: -1">{{ $store.state.nombreInstitucion }}</h4>
                      <h6 style="margin-top: -1" class="text-black">INSTITUCIÓN EDUCATIVA {{ $store.state.sectorInstitucion }}</h6>
                      <h6 style="margin-top: -1">CÓDIGO DANE: {{ $store.state.daneInstitucion }}</h6>
                      <h6 style="margin-top: -1">NIT: {{ $store.state.nitInstitucion }}</h6>
                      <h6 style="margin-top: -1">AÑO LECTIVO {{ $store.state.aLectivo }}</h6>
                    </div>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
  import * as CONFIG from '@/assets/config.js'

  export default {
    name: 'Inicio',
    data () {
      return {
        escudoInstitucion: null,
        secretaria: null
      }
    },
    methods: {
      iniciarVista() {
        this.escudoInstitucion = CONFIG.ROOT_ESCUDOS + this.$store.state.escudoInstitucion
        this.secretaria = CONFIG.SECRETARIA
      }
    },
    beforeMount() {
      this.iniciarVista()
    }
  }
</script>

<style>
  .linkini:hover {
    position: relative;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
    background: rgba(149, 195, 247, 0.108);
    cursor: pointer;
    color: rgba(220, 160, 242, 0.879);
    /*background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);*/
  }
</style>
