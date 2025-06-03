<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> RESUMENES</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="3">
                <b-card>
                  <b-card-text>
                    <h6>Ausencias</h6>
                    <ul>
                      <li @click="idInforme=1">Resumén de Ausencias</li>
                      <li @click="idInforme=2">Resumén de Ausencias</li>
                    </ul>
                  </b-card-text>
                </b-card>
              </b-col>
              <b-col lg="9">
                <div v-if="idInforme==1">
                  <Ausencias/>
                </div>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import Ausencias from '@/views/informes/resumenes/Ausencias'

  export default {
    name: 'resumenes',
    components: {
      Ausencias,
    },
    data () {
      return {
        idInforme: null,
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
      this.listaSedes()
    }
  }
</script>