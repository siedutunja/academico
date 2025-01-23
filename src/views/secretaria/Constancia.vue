<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> CONSTANCIAS</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Diligencie el documento e imprimalo haciendo clic en Imprimir Documento.</em>
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
    name: 'constancias',
    components: {
    },
    data () {
      return {

      }
    },
    methods: {
      async listaSedes() {

      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      if(this.$store.state.idRol == 1 || this.$store.state.idRol == 12) {
        this.listaSedes()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>