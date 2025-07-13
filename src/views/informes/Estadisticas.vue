<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> ESTADÍSTICAS</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <b-card bg-variant="light" text-variant="">
                  <b-card-text>
                    <b-row>
                      <b-col lg="4">
                        <h6>Evaluaciones</h6>
                        <b-form-group label="" v-slot="{ ariaDescribedby }">
                          <b-form-radio v-model="idConsolidado" :aria-describedby="ariaDescribedby" name="some-radios" value="1">Rendimiento académico por Asignatura</b-form-radio>
                          <b-form-radio v-model="idConsolidado" :aria-describedby="ariaDescribedby" name="some-radios" value="2">Rendimiento académico por Área</b-form-radio>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="12">
                <div v-if="idConsolidado==1">
                  <EstadisticaAsignaturas/>
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
  import EstadisticaAsignaturas from '@/views/informes/consolidados/EstadisticaAsignaturas'

  export default {
    name: 'estadisticas',
    components: {
      EstadisticaAsignaturas,
    },
    data () {
      return {
        idConsolidado: null,
      }
    },
    methods: {
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
    }
  }
</script>