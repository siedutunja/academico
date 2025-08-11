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
                      <b-col lg="3">
                        <h6>Por Grados-Cursos</h6>
                        <b-form-group label="" v-slot="{ ariaDescribedby }">
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="1">Planillas por Curso</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="2">Planillas por Grado</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="3">Listas con Datos por Curso</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="4">Listas con Datos por Grado</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="5">Sin Curso</b-form-radio>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3">
                        <h6>Por Docente</h6>
                        <b-form-group label="" v-slot="{ ariaDescribedby }">
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="10">Auxiliares</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="11">Auxiliares con Notas </b-form-radio>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3">
                        <h6>Formatos</h6>
                        <b-form-group label="" v-slot="{ ariaDescribedby }">
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="21">Asistencia Semanal</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="22">Actividades Mensual</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="23">Observador</b-form-radio>
                        </b-form-group>
                      </b-col>
                      <b-col lg="3">
                        <h6>Otros</h6>
                        <b-form-group label="" v-slot="{ ariaDescribedby }">
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="30">Por Acudiente</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="31">Por Agrupación </b-form-radio>
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
                <div v-if="idInforme==11">
                  <PlanillasCursosDocenteNotas/>
                </div>
                <div v-if="idInforme==21">
                  <FormatoAsistenciaSemanal/>
                </div>
                <div v-if="idInforme==22">
                  <FormatoActividadMensual/>
                </div>
                <div v-if="idInforme==23">
                  <FormatoObservador/>
                </div>
                <div v-if="idInforme==30">
                  <ListasPorAcudiente/>
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
  import PlanillasCursosDocenteNotas from '@/views/listados/estudiantes/PlanillasCursosDocenteNotas'
  import FormatoAsistenciaSemanal from '@/views/listados/estudiantes/FormatoAsistenciaSemanal'
  import FormatoActividadMensual from '@/views/listados/estudiantes/FormatoActividadMensual'
  import FormatoObservador from '@/views/listados/estudiantes/FormatoObservador'
  import ListasPorAcudiente from '@/views/listados/estudiantes/ListasPorAcudiente'

  export default {
    name: 'listadosdocentes',
    components: {
      PlanillasCursos,
      PlanillasGrados,
      ListasDatosCursos,
      ListasDatosGrados,
      PlanillasCursosDocente,
      PlanillasCursosDocenteNotas,
      FormatoAsistenciaSemanal,
      FormatoActividadMensual,
      FormatoObservador,
      ListasPorAcudiente,
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