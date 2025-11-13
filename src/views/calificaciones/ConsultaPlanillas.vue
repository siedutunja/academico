<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> CONSULTA PLANILLA PARCIAL POR PERIODO</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="2">
                <b-form-group label="Periodo:" label-for="periodo" class="etiqueta">
                  <b-form-select id="periodo" ref="periodo" v-model="idPeriodo" :options="comboPeriodos" @change="idDocente=null,idPlanilla=null"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="Seleccione el Docente:" label-for="docentes" class="etiqueta">
                  <b-form-select id="docentes" ref="docentes" v-model="idDocente" :options="comboDocentes" @change="idPlanilla=null,cargarPlanillasDocente()" :disabled="idPeriodo!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="Seleccione la Planilla:" label-for="planillas" class="etiqueta">
                  <b-form-select id="planillas" ref="planillas" v-model="idPlanilla" :options="comboPlanillas" @change="cargarConfiguracionPlanilla()" :disabled="idDocente!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="2">
                <b-button  style="margin-top: 28px" variant="primary" @click="verPlanilla">Ver Planilla</b-button>
              </b-col>
            </b-row>
            <b-row><b-col lg="12"><hr></b-col></b-row>
            <div v-if="planillita == 1">
              <NotasParcialPeriodo :configuracionPlanilla="configuracionPlanilla"/>
            </div>
            <div v-else-if="planillita == 2">
              <PreeParcialPeriodo :configuracionPlanilla="configuracionPlanilla"/>
            </div>
            <div v-else-if="planillita == 3">
              <ComportamientoParcialPeriodo :configuracionPlanilla="configuracionPlanilla"/>
            </div>
            <div v-else-if="planillita == 4">
              <PreeParcialPeriodoRural :configuracionPlanilla="configuracionPlanilla"/>
            </div>
            <div v-else-if="planillita == 5">
              <PreeParcialPeriodoSilvino :configuracionPlanilla="configuracionPlanilla"/>
            </div>
            
          </b-card-text>
          <template #footer>
            <em>Consulta planilla parcial por periodo.</em>
          </template>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import ComportamientoParcialPeriodo from '@/views/calificaciones/ComportamientoParcialPeriodo'
  import NotasParcialPeriodo from '@/views/calificaciones/NotasParcialPeriodo'
  import PreeParcialPeriodo from '@/views/calificaciones/PreeParcialPeriodo'
  import PreeParcialPeriodoRural from '@/views/calificaciones/PreeParcialPeriodoRural'
  import PreeParcialPeriodoSilvino from '@/views/calificaciones/PreeParcialPeriodoSilvino'

  export default {
    name: 'consultaplanillas',
    components: {
      ComportamientoParcialPeriodo,
      NotasParcialPeriodo,
      PreeParcialPeriodo,
      PreeParcialPeriodoRural,
      PreeParcialPeriodoSilvino
    },
    data () {
      return {
        idPeriodo: null,
        comboPeriodos: [],
        idDocente: null,
        comboDocentes: [],
        idPlanilla: null,
        comboPlanillas: [],
        listaPlanillasDocente: [],
        configuracionPlanilla: {},
        planillita: null,
      }
    },
    methods: {
      verPlanilla() {
        if (this.configuracionPlanilla.orden == 99) {
          this.planillita = 3
        } else {
          if (this.configuracionPlanilla.id_nivel > 1 && this.configuracionPlanilla.id_nivel < 7) {
            this.planillita = 1
          } else if (this.configuracionPlanilla.id_nivel == 1) {
            if (this.$store.state.idInstitucion == '097b7b10-fcaa-11ec-8267-536b07c743c4') { // PREE RURAL
              this.planillita = 4
            } else if (this.$store.state.idInstitucion == 'c50f3d80-fca0-11ec-8267-536b07c743c4') { // PREE SILVINO
              this.planillita = 5
            } else {
              this.planillita = 2
            }
          } else {
            this.mensajeEmergente('info',CONFIG.TITULO_MSG,'Lo sentimos, debe seleccionar una planilla para consultar las valoraciones.')
          }
        }
      },
      async cargarConfiguracionPlanilla() {
        this.configuracionPlanilla = {}
        this.planillita = 0
        this.listaPlanillasDocente.forEach(element => {
          if (element.idPlanilla == this.idPlanilla) {
            this.configuracionPlanilla = element
            this.configuracionPlanilla.idPeriodo = this.idPeriodo
          }
        })
        //console.log(JSON.stringify(this.configuracionPlanilla))
      },
      async cargarPlanillasDocente() {
        this.listaPlanillasDocente = []
        this.comboPlanillas = []
        await axios
        .get(CONFIG.ROOT_PATH + 'docente/planillasasignadas/docente', { params: { idInstitucion: this.$store.state.idInstitucion, vigencia: this.$store.state.aLectivo, idDocente: this.idDocente }})
        .then(response => {
          if (response.data.error){
            alert(response.data.mensaje + ' - Consulta Asignación Docente')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
          } else {
            if(response.data.datos != 0) {
              this.listaPlanillasDocente = response.data.datos
              this.listaPlanillasDocente.forEach(element => {
                this.comboPlanillas.push({ 'value': element.idPlanilla, 'text': element.nomenclatura.toUpperCase() + ' - ' + element.asignatura.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          alert('Algo salio mal y no se pudo realizar: Consulta Asignación Docente. Intente más tarde. ' + err)
          location.replace(CONFIG.ROOT_WEBSITE)
        })
      },
      async ocuparComboDocentes() {
        this.comboDocentes = []
        this.$store.state.datosDocentes.forEach(element => {
          this.comboDocentes.push({ 'value': element.id, 'text': element.docente.toUpperCase() })
        })
        //console.log(JSON.stringify(this.$store.state.datosDocentes))
      },
      async ocuparComboPeriodos() {
        this.comboPeriodos = []
        this.$store.state.periodos.forEach(element => {
          this.comboPeriodos.push({ 'value': element.id, 'text': element.periodo.toUpperCase() })
        })
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.ocuparComboPeriodos()
      this.ocuparComboDocentes()
    }
  }
</script>