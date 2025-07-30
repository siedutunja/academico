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
                        <h6>Desempeños</h6>
                        <b-form-group label="" v-slot="{ ariaDescribedby }">
                          <b-form-radio v-model="idEstadistica" :aria-describedby="ariaDescribedby" name="some-radios" value="1">Resumen Asignaturas por Curso</b-form-radio>
                          <b-form-radio v-model="idEstadistica" :aria-describedby="ariaDescribedby" name="some-radios" value="2">Resumen Asignaturas por Grado</b-form-radio>
                          <b-form-radio v-model="idEstadistica" :aria-describedby="ariaDescribedby" name="some-radios" value="3">Resumen Áreas por Curso</b-form-radio>
                        </b-form-group>
                      </b-col>
                      <b-col lg="4">
                        <h6>Rendimiento (Puestos)</h6>
                        <b-form-group label="" v-slot="{ ariaDescribedby }">
                          <b-form-radio v-model="idEstadistica" :aria-describedby="ariaDescribedby" name="some-radios" value="10">Estudiantes por Curso</b-form-radio>
                          <b-form-radio v-model="idEstadistica" :aria-describedby="ariaDescribedby" name="some-radios" value="11">Estudiantes por Grado</b-form-radio>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="12">
                <div v-if="idEstadistica==1">
                  <DesempenoCurso/>
                </div>
                <div v-if="idEstadistica==2">
                  <DesempenoGrado/>
                </div>
                <div v-if="idEstadistica==3">
                  <DesempenoAreaCurso/>
                </div>
                <div v-if="idEstadistica==10">
                  <PuestosEstCursoPeriodo/>
                </div>
                <div v-if="idEstadistica==11">
                  <PuestosEstGradoPeriodo/>
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
  import DesempenoCurso from '@/views/informes/estadisticas/DesempenoCurso'
  import DesempenoGrado from '@/views/informes/estadisticas/DesempenoGrado'
  import DesempenoAreaCurso from '@/views/informes/estadisticas/DesempenoAreaCurso'
  import PuestosEstCursoPeriodo from '@/views/informes/estadisticas/PuestosEstCursoPeriodo'
  import PuestosEstGradoPeriodo from '@/views/informes/estadisticas/PuestosEstGradoPeriodo'

  export default {
    name: 'estadisticas',
    components: {
      DesempenoCurso,
      DesempenoGrado,
      DesempenoAreaCurso,
      PuestosEstCursoPeriodo,
      PuestosEstGradoPeriodo,
    },
    data () {
      return {
        idEstadistica: null,
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