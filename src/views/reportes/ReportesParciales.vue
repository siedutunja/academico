<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> INFORMES PARCIALES DE EVALUACIÓN POR PERIODO</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="2">
                <b-form-group label="Periodo:" label-for="periodo" class="etiqueta">
                  <b-form-select id="periodo" ref="periodo" v-model="idPeriodo" :options="comboPeriodos" @change="idSede=null"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idCurso=null,ocuparComboCursosSede()" :disabled="idPeriodo!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="Seleccione el Curso:" label-for="cursos" class="etiqueta">
                  <b-form-select id="cursos" ref="cursos" v-model="idCurso" :options="comboCursosSede" @change="consultaListaCurso()" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mt-2" v-if="idCurso!=null">
              <b-col lg="12"><hr></b-col>
              <!-- **************** LISTA CURSO ************** -->
              <b-col lg="12">
                <div v-if="btnCargando">
                  <div class="text-center m-5 text-primary">
                    <b-spinner style="width: 3rem; height: 3rem;" label="Spinner"></b-spinner>
                    <br><strong>Cargando planilla...</strong>
                  </div>
                </div>
                <div v-else>
                  <vue-good-table ref="estudiantes" :columns="encabColumnas" :rows="listaEstudiantesCurso" styleClass="vgt-table condensed bordered striped" :line-numbers="true"
                  :select-options="{enabled: true,selectionText: 'estudiantes seleccionados',clearSelectionText: 'Limpiar',}">
                    <template #selected-row-actions>
                      <button class="small btn btn-primary" @click="imprimirReportes()">Imprimir Informes</button>
                    </template>
                    <div slot="emptystate">
                      <h5 class="text-danger ml-5">No existen estudiantes matriculados</h5>
                    </div>
                  </vue-good-table>
                </div>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Informes parciales de evaluación por periodo.</em>
          </template>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'

  export default {
    name: 'reportesperiodos',
    components: {
      VueGoodTable
    },
    data () {
      return {
        comboSedes: [],
        idSede: null,
        comboCursosSede: [],
        idCurso: null,
        comboPeriodos: [],
        idPeriodo: null,
        listaEstudiantesCurso: [],
        encabColumnas: [
          { label: 'Apellidos y Nombres del Estudiante', field: 'estudiante', tdClass: this.tdClassFuncE },
          { label: 'Documento', field: 'documento', tdClass: this.tdClassFuncE },
          { label: 'Estado', field: 'estado', tdClass: this.tdClassFuncE },
        ],
        btnCargando: false,
        listaReportes: [],
        nombreSede: null,
        nombreCurso: null,
        jornada: null,
        director: null,
        idNivel: null,
      }
    },
    methods: {
      async imprimirReportes() {
        this.listaReportes = []
        this.$refs.estudiantes.selectedRows.forEach(element => {
          this.listaReportes.push({ 'id': element.id, 'estudiante': element.estudiante })
        })
        let sede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
        let curso = document.getElementById('cursos')[document.getElementById('cursos').selectedIndex].text
        let periodo = document.getElementById('periodo')[document.getElementById('periodo').selectedIndex].text
        let uri = "?datos=" + JSON.stringify(this.listaReportes) + "&ie=" + this.$store.state.nombreInstitucion + "&vigencia=" + this.$store.state.aLectivo + "&escudo=" + this.$store.state.escudoInstitucion + "&sede=" + sede + "&idCurso=" + this.idCurso + "&curso=" + curso + "&jornada=" + this.jornada + "&director=" + this.director + "&periodo=" + periodo + "&idPeriodo=" + this.idPeriodo + "&idIe=" + this.$store.state.idInstitucion + "&idNivel=" + this.idNivel
        let encoded = encodeURI(uri);
        //window.open("http://localhost/siedutunja/php/boletines/" + this.$store.state.daneInstitucion + "parcial.php" + encoded,"_blank")
        window.open("https://siedutunja.gov.co/php/boletines/" + this.$store.state.daneInstitucion + "parcial.php" + encoded,"_blank")
        return true
      },
      async consultaListaCurso() {
        this.$store.state.datosCursos.forEach(element => {
          if (element.id == this.idCurso) {
            this.jornada = element.jornada
            this.director = element.docente
            this.idNivel = element.id_nivel
            //console.log(element)
          }
        })
        this.listaEstudiantesCurso = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/listacurso/parciales', { params: { idCurso: this.idCurso, vigencia: this.$store.state.aLectivo }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Lista Curso')
          } else{
            if (response.data.datos != 0) {
              this.listaEstudiantesCurso = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Lista Curso. Intente más tarde.' + err)
        })
      },
      tdClassFuncE(row) {
        if (row.id_estado_actual == 2) { 
          return 'text-danger' 
        }
      },
      async ocuparComboSedes() {
        this.comboSedes = []
        this.$store.state.datosSedes.forEach(element => {
          this.comboSedes.push({ 'value': element.id, 'text': element.sede.toUpperCase() })
        })
      },
      async ocuparComboCursosSede() {
        this.comboCursosSede = []
        this.$store.state.datosCursos.forEach(element => {
          if (element.id_sede == this.idSede) {
            this.comboCursosSede.push({ 'value': element.id, 'text': element.nomenclatura.toUpperCase() })
          }
        })
        //console.log(JSON.stringify(this.$store.state.datosCursos))
      },
      async ocuparComboPeriodos() {
        this.comboPeriodos = []
        this.$store.state.periodos.forEach(element => {
          this.comboPeriodos.push({ 'value': element.id, 'text': element.periodo.toUpperCase() })
        })
      },
      redondear(num) {
        var m = Number((Math.abs(num) * 10).toPrecision(15))
        return Math.round(m) / 10 * Math.sign(num);
      },
      cancelarFormulario() {
        this.$router.push('/')
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    computed: {
    },
    beforeMount() {
      this.ocuparComboPeriodos()
      this.ocuparComboSedes()
    }
  }
</script>
<!--
<style>
  .condensed thead th{
    padding-left:.1em;
    padding-right:.1em;
    font-size: 12px;
    text-align: center;
    /*writing-mode: vertical-lr;
    text-orientation: upright;*/
  }
  .condensed tbody{
    padding-left:.1em;
    padding-right:.1em;
    font-size: 12px;
    text-align: center;
    height: 10px;
  }
  .condensed input{
    padding-left:.1em;
    padding-right:.1em;
    padding-top:.1em;
    padding-bottom:.1em;
    height: 18px;
    font-size: 12px;
    text-align: center;
  }
</style>
-->