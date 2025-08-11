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
              <b-col lg="12">
                <b-card bg-variant="light" text-variant="">
                  <b-card-text>
                    <b-row>
                      <b-col lg="4">
                        <b-form-group label="" v-slot="{ ariaDescribedby }">
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="1">Especialidades</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="2">Retirados</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="3">Nuevos</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="4">Repitentes</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="5">Nacionalidad</b-form-radio>
                        </b-form-group>
                      </b-col>
                      <b-col lg="4">
                        <b-form-group label="" v-slot="{ ariaDescribedby }">
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="6">Discapacidad</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="7">Capacidades Excepcionales</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="8">Inclusión</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="9">Apoyo Académico</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="10">Trastorno del Aprendizaje</b-form-radio>
                        </b-form-group>
                      </b-col>
                      <b-col lg="4">
                        <b-form-group label="" v-slot="{ ariaDescribedby }">
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="11">Victima del Conflicto</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="12">Grupo Étnico</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="13">Eps</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="14">Grupo Sanguineo - Rh </b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="15">Estrato</b-form-radio>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="12">
                <div v-if="idInforme==1">
                  <Especialidades/>
                </div>
                <div v-if="idInforme==2">
                  <Retirados/>
                </div>
                <div v-if="idInforme==3">
                  <Nuevos/>
                </div>
                <div v-if="idInforme==4">
                  <Repitentes/>
                </div>
                <div v-if="idInforme==5">
                  <Nacionalidad/>
                </div>
                <div v-if="idInforme==6">
                  <Discapacidades/>
                </div>
                <div v-if="idInforme==7">
                  <Capacidades/>
                </div>
                <div v-if="idInforme==8">
                  <Inclusion/>
                </div>
                <div v-if="idInforme==9">
                  <Apoyos/>
                </div>
                <div v-if="idInforme==10">
                  <Trastornos/>
                </div>
                <div v-if="idInforme==11">
                  <Victimas/>
                </div>
                <div v-if="idInforme==12">
                  <Etnias/>
                </div>
                <div v-if="idInforme==13">
                  <Eps/>
                </div>
                <div v-if="idInforme==14">
                  <Rhs/>
                </div>
                <div v-if="idInforme==15">
                  <Estratos/>
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
  import Especialidades from '@/views/informes/agrupacion/Especialidades'
  import Retirados from '@/views/informes/agrupacion/Retirados.vue'
  import Nuevos from '@/views/informes/agrupacion/Nuevos.vue'
  import Repitentes from '@/views/informes/agrupacion/Repitentes.vue'
  import Nacionalidad from '@/views/informes/agrupacion/Nacionalidad.vue'
  import Discapacidades from '@/views/informes/agrupacion/Discapacidades.vue'
  import Capacidades from '@/views/informes/agrupacion/Capacidades.vue'
  import Inclusion from '@/views/informes/agrupacion/Inclusion.vue'
  import Apoyos from '@/views/informes/agrupacion/Apoyos.vue'
  import Trastornos from '@/views/informes/agrupacion/Trastornos.vue'
  import Victimas from '@/views/informes/agrupacion/Victimas.vue'
  import Etnias from '@/views/informes/agrupacion/Etnias.vue'
  import Eps from '@/views/informes/agrupacion/Eps.vue'
  import Rhs from '@/views/informes/agrupacion/Rhs.vue'
  import Estratos from '@/views/informes/agrupacion/Estratos.vue'

  export default {
    name: 'informesagrupacion',
    components: {
      Especialidades,
      Retirados,
      Nuevos,
      Repitentes,
      Nacionalidad,
      Discapacidades,
      Capacidades,
      Inclusion,
      Apoyos,
      Trastornos,
      Victimas,
      Etnias,
      Eps,
      Rhs,
      Estratos,
    },
    data () {
      return {
        idInforme: null,
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