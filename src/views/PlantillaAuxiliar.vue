<template>
  <div>
    <b-row class="mt-0">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="credit-card2-front" aria-hidden="true"></b-icon> PREINSCRITOS</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col>
                LISTA DE PREINSCRITOS...
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <div class="float-right text-medium-emphasis text-info">* Campo requerido</div>
            <b-button class="ml-3" size="sm" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
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
    name: 'preinscritos',
    components: {
    },
    data () {
      return {
      }
    },
    methods: {
      cancelarFormulario() {
        this.$router.push('/')
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      if(this.$store.state.idRol == 12) {
        //Inicio
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>