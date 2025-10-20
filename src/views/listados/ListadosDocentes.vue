<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> LISTADOS DE DOCENTES</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <b-card bg-variant="light" text-variant="">
                  <b-card-text>
                    <b-row>
                      <b-col lg="4">
                        <h6>Listados</h6>
                        <b-form-group label="" v-slot="{ ariaDescribedby }">
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="1">Listado General de Docentes</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="2">Por Sede</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="3">Por Grado</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="4">Por Curso</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="5">Por Área</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="6">Por Asignatura</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="7">Por Jornada</b-form-radio>
                        </b-form-group>
                      </b-col>
                      <b-col lg="4">
                        <h6>Asignación Académica</h6>
                        <b-form-group label="" v-slot="{ ariaDescribedby }">
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="10">Asignación por Docente</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="11">Asignación por Curso</b-form-radio>
                        </b-form-group>
                      </b-col>
                      <b-col lg="4">
                        <h6>Otros</h6>
                        <b-form-group label="" v-slot="{ ariaDescribedby }">
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="20">Directores de Curso</b-form-radio>
                          <b-form-radio v-model="idInforme" :aria-describedby="ariaDescribedby" name="some-radios" value="21">Directorio de Docentes</b-form-radio>
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
                  <ListaGeneral/>
                </div>
                <div v-if="idInforme==2">
                  <ListaSede/>
                </div>
                <div v-if="idInforme==3">
                  <ListaGrado/>
                </div>
                <div v-if="idInforme==4">
                  <ListaCurso/>
                </div>
                <div v-if="idInforme==5">
                  <ListaArea/>
                </div>
                <div v-if="idInforme==6">
                  <ListaAsignatura/>
                </div>
                <div v-if="idInforme==7">
                  <ListaJornada/>
                </div>
                <div v-if="idInforme==10">
                  <AsignacionDocente/>
                </div>
                <div v-if="idInforme==11">
                  <AsignacionCurso/>
                </div>
                <div v-if="idInforme==20">
                  <DirectoresCurso/>
                </div>
                <div v-if="idInforme==21">
                  <Directorio/>
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
  import ListaGeneral from '@/views/listados/docentes/ListaGeneral'
  import ListaSede from '@/views/listados/docentes/ListaSede'
  import ListaGrado from '@/views/listados/docentes/ListaGrado'
  import ListaCurso from '@/views/listados/docentes/ListaCurso'
  import ListaArea from '@/views/listados/docentes/ListaArea'
  import ListaAsignatura from '@/views/listados/docentes/ListaAsignatura'
  import ListaJornada from '@/views/listados/docentes/ListaJornada'
  import Directorio from '@/views/listados/docentes/Directorio'
  import AsignacionDocente from '@/views/listados/docentes/AsignacionDocente'
  import AsignacionCurso from '@/views/listados/docentes/AsignacionCurso'
  import DirectoresCurso from '@/views/listados/docentes/DirectoresCurso'

  export default {
    name: 'listadosdocentes',
    components: {
      ListaGeneral,
      ListaSede,
      ListaGrado,
      ListaCurso,
      ListaArea,
      ListaAsignatura,
      ListaJornada,
      Directorio,
      AsignacionDocente,
      AsignacionCurso,
      DirectoresCurso,
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