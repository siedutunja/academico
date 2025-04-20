<template>
  <div>
    <CRow>
      <CCol>
        <CCard>
          <CCardBody>
            <CCard>
              <CCardFooter style="background: rgb(220, 160, 242, 0.879); margin-top: -40; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);">
                <CRow>
                  <CCol lg="2" md="3">
                    <div class="text-center">
                      <b-avatar class="c-sidebar-brand-minimized" variant="light" :src="escudoInstitucion"  size="6rem"></b-avatar>
                    </div>
                  </CCol>
                  <CCol lg="8" md="6">
                    <div class="mt-2 text-center">
                      <h6 style="margin-top: -5" class="text-muted">{{ secretaria }}</h6>
                      <h4 style="margin-top: -1">{{ $store.state.nombreInstitucion }}</h4>
                      <h6 style="margin-top: -1" class="text-muted">DANE: {{ $store.state.daneInstitucion }} - NIT: {{ $store.state.nitInstitucion }}</h6>
                      <h5 style="margin-top: -1">SECCIÓN: {{ $store.state.nombreSeccion }}</h5>
                    </div>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
            <b-card-group deck class="mt-5">
              <b-card border-variant="light" class="text-center linkini" @click="irListados">
                <b-card-text>
                  <span><b-icon icon="card-list" font-scale="3"></b-icon></span>
                  <h5 class="mt-2">Listados</h5>
                </b-card-text>
                <b-card-text>Genere listados o planillas de Estudiantes</b-card-text>
              </b-card>
              <b-card border-variant="light" class="text-center linkini" @click="irFichaMatricula">
                <b-card-text>
                  <span><b-icon icon="filter-square" font-scale="3"></b-icon></span>
                  <h5 class="mt-2">Ficha Matricula</h5>
                </b-card-text>
                <b-card-text>Consulte la Ficha de Matricula de Estudiantes</b-card-text>
              </b-card>
              <b-card border-variant="light" class="text-center linkini" @click="irAsignacionAcademica">
                <b-card-text>
                  <span><b-icon icon="person-check" font-scale="3"></b-icon></span>
                  <h5 class="mt-2">Asignación Académica</h5>
                </b-card-text>
                <b-card-text>Consulte y actualice la Asignación Académica por Curso</b-card-text>
              </b-card>
              <b-card border-variant="light" class="text-center linkini" @click="irManuales">
                <b-card-text>
                  <span><b-icon icon="book" font-scale="3"></b-icon></span>
                  <h5 class="mt-2">Manuales</h5>
                </b-card-text>
                <b-card-text>Consulte los Manuales de Usuario del sistema</b-card-text>
              </b-card>
            </b-card-group>
            <b-card-group deck class="mt-5">
              <b-card border-variant="light" class="text-center linkini" @click="irMatriculaPFC" v-if="$store.state.idSeccion == 2">
                <b-card-text>
                  <span><b-icon icon="card-list" font-scale="3"></b-icon></span>
                  <h5 class="mt-2">Matricula Nuevo PFC</h5>
                </b-card-text>
                <b-card-text>Matricula de Estudiantes Nuevos del PFC</b-card-text>
              </b-card>
            </b-card-group>
            <b-row>
              <b-col lg="12"><hr></b-col>
              <b-col>
                <span class="text-muted" v-if="$store.state.idRol == 1">ID Institución: {{$store.state.idInstitucion}}</span>
              </b-col>
            </b-row>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
  import * as CONFIG from '@/assets/config.js'
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'

  export default {
    name: 'Inicio',
    components: {
      VueGoodTable,
    },
    data () {
      return {
        escudoInstitucion: null,
        secretaria: null
      }
    },
    methods: {
      irMatriculaPFC() {
        this.$router.push('/matriculas/buscarnuevo')
      },
      irListados() {
        this.$router.push('/listados/listadoscurso')
      },
      irFichaMatricula() {
        this.$router.push('/matriculas/buscarcarpetamatricula')
      },
      irAsignacionAcademica() {
        this.$router.push('/docentes/asignacioncurso')
      },
      irManuales() {
        this.$router.push('/manuales')
      }
    },
    beforeMount() {
      this.escudoInstitucion = CONFIG.ROOT_ESCUDOS + this.$store.state.escudoInstitucion
      this.secretaria = CONFIG.SECRETARIA
    }
  }
</script>

<style>
  .linkini:hover {
    position: relative;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
    background: rgba(149, 195, 247, 0.108);
    cursor: pointer;
    color: rgba(220, 160, 242, 0.879);
    /*background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);*/
  }
</style>
