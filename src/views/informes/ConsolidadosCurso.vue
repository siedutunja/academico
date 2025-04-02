<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> INFORMES CONSOLIDADOS POR CURSO</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Seleccione Informe:" label-for="datos" class="etiqueta">
                  <b-form-select  id="datos" ref="datos" v-model="idInforme" :options="comboInformes" @change="idPeriodo=null,idSede=null,idCurso=null"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row v-if="idInforme != null">
              <b-col lg="2">
                <b-form-group label="Seleccione el Periodo:" label-for="periodo" class="etiqueta">
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
                  <b-form-select  id="cursos" ref="cursos" v-model="idCurso" :options="comboCursosSede" @change="consultarMatriculados()" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mt-2" v-if="idCurso!=null">
              <b-col lg="12"><hr></b-col>
              <!-- **************** CONSOLIDADO ASIGNATURAS ************** -->
              <b-col lg="12" v-if="idInforme == 1">
                <vue-good-table ref="table" :columns="encabColumnas" :rows="listaMatriculados" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                  <div slot="emptystate">
                    <h5 class="text-danger ml-5">No existen estudiantes matriculados</h5>
                  </div>
                </vue-good-table>
              </b-col>
              <b-col lg="12">
                <b-button class="small mx-1 mt-2" variant="outline-primary" @click="imprimirConsolidado">Imprimir Consolidado</b-button>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Informes consolidados por curso.</em>
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
    name: 'consolidadoscurso',
    components: {
      VueGoodTable
    },
    data () {
      return {
        idInforme: null,
        comboInformes: [
          { 'value': 1, 'text': 'CONSOLIDADO DE CALIFICACIONES POR ASIGNATURA Y POR CURSO'},
        ],
        comboSedes: [],
        idSede: null,
        comboCursosSede: [],
        idCurso: null,
        listaMatriculados: [],
        encabColumnas: [],
        listaAsignaturasCurso: [],
        idPeriodo: 1,
        comboPeriodos: [],
        nombreSede: null,
        nombreCurso: null,
      }
    },
    methods: {
      imprimirConsolidado() {
        // Crear una nueva ventana para imprimir
        const printWindow = window.open("", "_blank");

        // Obtener el contenido HTML de la tabla
        const tableHtml = this.$refs.table.$el.querySelector("table").outerHTML;

        // Estilos básicos para la impresión
        const style = `
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
              font-size: 14px;
              text-align: left;
            }
            table, th, td {
              border: 1px solid black;
            }
            th, td {
              padding: 2px;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        `;

        // Insertar el contenido HTML y los estilos en la nueva ventana
        printWindow.document.write(`
          <html>
            <head>
              <title>Imprimir Tabla</title>
              ${style}
            </head>
            <body>
              <p class="text-center">INFORMES CONSOLIDADOS POR CURSO - AÑO LECTIVO ${this.$store.state.aLectivo}<br>Sede: ${this.nombreSede} | Curso: ${this.nombreCurso}</p>
              ${tableHtml}
            </body>
          </html>
        `);

        // Iniciar la impresión y cerrar la ventana
        printWindow.document.close();
        printWindow.print();
      },

      consultarMatriculados() {
        if (this.idInforme == 1) {
          this.consultarConsolidadoAsignaturas()
        }
      },
      async consultarConsolidadoAsignaturas() {
        this.nombreSede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
        this.nombreCurso = document.getElementById('cursos')[document.getElementById('cursos').selectedIndex].text
        this.listaAsignaturasCurso = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/asignacioncurso', {params: {idCurso: this.idCurso}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista asignaturas curso')
          } else{
            if (response.data.datos != 0) {
              this.listaAsignaturasCurso = response.data.datos
            }
          }
          //console.log(JSON.stringify(this.listaAsignaturasCurso))
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista asignación docentes curso. Intente más tarde.' + err)
        })

        this.encabColumnas = []
        this.encabColumnas.push({label: 'Estudiante', field: 'estudiante', sortable: false})
        this.listaAsignaturasCurso.forEach(element => {
          this.encabColumnas.push({label: element.nemo, field: element.nemo, sortable: false})
        })

        this.listaMatriculados = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/estudiantes/curso/consolidadoasignaturas', {params: {idCurso: this.idCurso, periodo: this.idPeriodo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - consolidado asignaturas curso')
          } else{
            if (response.data.datos != 0) {
              //console.log(JSON.stringify(response.data.datos))
              let datosEstudiante = {}
              response.data.datos.forEach(element => {
                
                datosEstudiante.estudiante = element.estudiante
                element.notas.forEach(element2 => {
                  datosEstudiante[element2.nemo] = element2.definitiva
                })
                this.listaMatriculados.push(JSON.parse(JSON.stringify(datosEstudiante)))
                //console.log(JSON.stringify(datosEstudiante))
              })
            }
          }
          //console.log(JSON.stringify(this.listaMatriculados))
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: consolidado asignaturas curso. Intente más tarde.' + err)
        })
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
      },
      async ocuparComboPeriodos() {
        this.comboPeriodos = []
        this.$store.state.datosTablas.periodos.forEach(element => {
          this.comboPeriodos.push({ 'value': element.id, 'text': element.periodo.toUpperCase() })
        })
      },
      cancelarFormulario() {
        this.$router.push('/')
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.ocuparComboPeriodos()
      this.ocuparComboSedes()
    }
  }
</script>

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
