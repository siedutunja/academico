<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> LISTADOS DE ESTUDIANTES</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <b-card bg-variant="light" text-variant="">
                  <b-card-text>
                    <b-row>
                      <b-col lg="4">
                        <h6>Por Grados-Cursos</h6>
                        <b-form-group label="" v-slot="{ ariaDescribedby }">
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="1">Planillas por Curso</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="2">Planillas por Grado</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="3">Listas con Datos por Curso</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="4">Listas con Datos por Grado</b-form-radio>
                        </b-form-group>
                      </b-col>
                      <b-col lg="4">
                        <h6>Por Docente</h6>
                        <b-form-group label="" v-slot="{ ariaDescribedby }">
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="10">Planillas por Docente</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="11">Con Notas Acumuladas</b-form-radio>
                        </b-form-group>
                      </b-col>
                      <b-col lg="4">
                        <h6>Agrupación</h6>
                        <b-form-group label="" v-slot="{ ariaDescribedby }">
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="20">Retirados</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="21">Inclusión</b-form-radio>
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
                  <PlanillasCursos/>
                </div>
                <div v-if="idInforme==2">
                  <PlanillasGrados/>
                </div>
                <div v-if="idInforme==3">
                  <ListasDatosCursos/>
                </div>
                <div v-if="idInforme==4">
                  <ListasDatosGrados/>
                </div>
                <div v-if="idInforme==10">
                  <PlanillasCursosDocente/>
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
  import PlanillasCursos from '@/views/listados/estudiantes/PlanillasCursos'
  import PlanillasGrados from '@/views/listados/estudiantes/PlanillasGrados'
  import ListasDatosCursos from '@/views/listados/estudiantes/ListasDatosCursos'
  import ListasDatosGrados from '@/views/listados/estudiantes/ListasDatosGrados'
  import PlanillasCursosDocente from '@/views/listados/estudiantes/PlanillasCursosDocente'

  export default {
    name: 'listadosdocentes',
    components: {
      PlanillasCursos,
      PlanillasGrados,
      ListasDatosCursos,
      ListasDatosGrados,
      PlanillasCursosDocente,
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