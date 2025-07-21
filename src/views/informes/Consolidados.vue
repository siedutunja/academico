<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> CONSOLIDADOS</h5>
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
                          <b-form-radio v-model="idConsolidado" :aria-describedby="ariaDescribedby" name="some-radios" value="1">Resumen por Periodo</b-form-radio>
                          <b-form-radio v-model="idConsolidado" :aria-describedby="ariaDescribedby" name="some-radios" value="2">Consolidado Acumulado/Promedio</b-form-radio>
                          <b-form-radio v-model="idConsolidado" :aria-describedby="ariaDescribedby" name="some-radios" value="3">Consolidado Acumulado/Ponderado</b-form-radio>
                        </b-form-group>
                      </b-col>
                      <b-col lg="4">
                        <h6>Ausencias</h6>
                        <b-form-group label="" v-slot="{ ariaDescribedby }">
                          <b-form-radio v-model="idConsolidado" :aria-describedby="ariaDescribedby" name="some-radios" value="10">Ausencias por Periodo</b-form-radio>
                        </b-form-group>
                      </b-col>
                      <b-col lg="4">
                        <h6>Puestos</h6>
                        <b-form-group label="" v-slot="{ ariaDescribedby }">
                          <b-form-radio v-model="idConsolidado" :aria-describedby="ariaDescribedby" name="some-radios" value="20">Puestos por Periodo</b-form-radio>
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
                  <ResumenPeriodo/>
                </div>
                <div v-if="idConsolidado==2">
                  <ConsolidadoPromedio/>
                </div>
                <div v-if="idConsolidado==3">
                  <ConsolidadoPonderado/>
                </div>
                <div v-if="idConsolidado==10">
                  <AusenciasPeriodo/>
                </div>
                <div v-if="idConsolidado==20">
                  <PuestosPeriodo/>
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
  import ResumenPeriodo from '@/views/informes/consolidados/ResumenPeriodo'
  import ConsolidadoPromedio from '@/views/informes/consolidados/ConsolidadoPromedio'
  import ConsolidadoPonderado from '@/views/informes/consolidados/ConsolidadoPonderado'
  import AusenciasPeriodo from '@/views/informes/consolidados/AusenciasPeriodo'
  import PuestosPeriodo from '@/views/informes/consolidados/PuestosPeriodo'

  export default {
    name: 'consolidados',
    components: {
      ResumenPeriodo,
      ConsolidadoPromedio,
      ConsolidadoPonderado,
      AusenciasPeriodo,
      PuestosPeriodo,
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