<template>
  <CContainer class="d-flex align-items-center">
    <CRow class="w-100 justify-content-center">
      <CCol md="6">
        <div class="w-100">
          <div class="clearfix text-danger">
            <b-card class="text-center">
              <h1 class="display-4">¡Uyyy!</h1>
              <h5>La página se encuentra restringida.</h5>
              <b-button type="submit" class="btn mb-2 mt-4" variant="danger" @click="regresar">Regresar</b-button>
            </b-card>
          </div>
        </div>
      </CCol>
    </CRow>
  </CContainer> 
</template>

<script>
  export default {
    name: 'Restringida',
    methods: {
      regresar() {
        this.$router.push('/inicio')
      }
    }
  }
</script>
