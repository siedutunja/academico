<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> INFORMES POR AGRUPACIÓN</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Seleccione el Informe a Consultar:" label-for="informes" class="etiqueta">
                  <b-form-select id="informes" ref="informes" v-model="idInforme" :options="comboInformes"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <div v-if="idInforme==1">
              <b-row><b-col lg="12"><hr></b-col></b-row>
              <b-row>
                <b-col lg="12">
                  <InfoEspecialidades />
                </b-col>
              </b-row>
            </div>
            <div v-if="idInforme==2">
              <b-row><b-col lg="12"><hr></b-col></b-row>
              <b-row>
                <b-col lg="12">
                  <InfoRetirados />
                </b-col>
              </b-row>
            </div>
          </b-card-text>
          <template #footer>
            <em>Seleccione el informe que desea consultar.</em>
          </template>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import InfoEspecialidades from '@/views/informes/InfoEspecialidades'
  import InfoRetirados from '@/views/informes/InfoRetirados'

  export default {
    name: 'informesagrupacion',
    components: {
      InfoEspecialidades,
      InfoRetirados
    },
    data () {
      return {
        idInforme: null,
        comboInformes: [
          { 'value': 1, 'text': 'INFORME POR ESPECIALIDAD'},
          { 'value': 2, 'text': 'INFORME RETIRADOS'},
        ]
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