<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> INFORMES PUESTOS POR RENDIMIENTO</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Seleccione Informe:" label-for="datos" class="etiqueta">
                  <b-form-select  id="datos" ref="datos" v-model="idInforme" :options="comboInformes" @change="idPeriodo=null,idSede=null,idCurso=null"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row v-if="idInforme == 1">
              <b-col lg="2">
                <b-form-group label="Periodo:" label-for="periodo" class="etiqueta">
                  <b-form-select id="periodo" ref="periodo" v-model="idPeriodo" :options="comboPeriodos" @change="idCurso=null,idSede=null"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idCurso=null,ocuparComboCursosSede()" :disabled="idPeriodo!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="Seleccione el Curso:" label-for="cursos" class="etiqueta">
                  <b-form-select id="cursos" ref="cursos" v-model="idCurso" :options="comboCursosSede" @change="consultarMatriculados()" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row v-if="idInforme == 2">
              <b-col lg="2">
                <b-form-group label="Periodo:" label-for="periodo" class="etiqueta">
                  <b-form-select id="periodo" ref="periodo" v-model="idPeriodo" :options="comboPeriodos" @change="idSede=null"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idGrado=null,ocuparComboGradosSede()" :disabled="idPeriodo!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="Seleccione el Grado:" label-for="grados" class="etiqueta">
                  <b-form-select id="grados" ref="grados" v-model="idGrado" :options="comboGradosSede" @change="consultarMatriculados()" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mt-2" v-if="idCurso!=null || idGrado!=null">
              <b-col lg="12"><hr></b-col>
              <!-- **************** LISTA CURSO ************** -->
              <b-col lg="12" v-if="idInforme == 1 || idInforme == 2">
                <div v-if="btnCargando">
                  <div class="text-center m-5 text-primary">
                    <b-spinner style="width: 3rem; height: 3rem;" label="Spinner"></b-spinner>
                    <br><strong>Cargando planilla...</strong>
                  </div>
                </div>
                <div v-else>
                  <vue-good-table ref="table" :columns="encabColumnas" :rows="ordenadoPorPromedio" styleClass="vgt-table condensed bordered striped">
                    <div slot="emptystate">
                      <h5 class="text-danger ml-5">No existen estudiantes matriculados</h5>
                    </div>
                  </vue-good-table>
                  <b-row>
                    <b-col lg="12">
                      <b-button class="small mx-1 mt-3" variant="primary" @click="idInforme == 1 ? imprimirConsolidadoCurso() : imprimirConsolidadoGrado()">Imprimir Consolidado</b-button>
                      <vue-excel-xlsx class="small mx-1 mt-3 btn btn-outline-primary" :data="ordenadoPorPromedio" :columns="encabColumnas" :file-name="idInforme == 1 ? 'PuestosCurso-' + nombreCurso + '-' + new Date().toLocaleDateString() : 'PuestosGrado-' + nombreGrado + '-' + new Date().toLocaleDateString()" :file-type="'xlsx'" :sheet-name="'Puestos'">
                        Exportar Resumen a Excel
                      </vue-excel-xlsx>
                    </b-col>
                  </b-row>
                </div>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Lista de estudiantes por puesto en el curso y por periodo.</em>
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
    name: 'puestoscurso',
    components: {
      VueGoodTable
    },
    data () {
      return {
        idInforme: null,
        comboInformes: [
          { 'value': 1, 'text': 'PUESTOS POR RENDIMIENTO ACADÉMICO POR CURSO'},
          { 'value': 2, 'text': 'PUESTOS POR RENDIMIENTO ACADÉMICO POR GRADO'},
        ],
        comboSedes: [],
        idSede: null,
        comboCursosSede: [],
        idCurso: null,
        comboGradosSede: [],
        idGrado: null,
        comboPeriodos: [],
        idPeriodo: null,
        listaEstudiantesCurso: [],
        ordenadoPorPromedio: [],
        encabColumnas: [
          { label: 'Puesto', field: 'puesto', sortable: false },
          { label: 'Apellidos y Nombres del Estudiante', field: 'estudiante', sortable: false },
          { label: 'Promedio General', field: 'promedio_final', sortable: false, tdClass: this.tdClassFuncE },
        ],
        btnCargando: false,
        nombreSede: null,
        nombreCurso: null,
        nombreGrado: null,
        nombrePeriodo: null,
        jornada: null,
        director: null,
        idNivel: null,
        puesto: '',
        listaPuestos: [],
        listaNotasGrado: []
      }
    },
    methods: {
      consultarMatriculados() {
        this.btnCargando = true
        if (this.idInforme == 1) {
          this.consultarPuestosCurso()
        }
        if (this.idInforme == 2) {
          this.consultarPuestosGrado()
        }
      },
      imprimirConsolidadoGrado() {
        this.nombreSede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
        this.nombreGrado = document.getElementById('grados')[document.getElementById('grados').selectedIndex].text
        this.nombrePeriodo = document.getElementById('periodo')[document.getElementById('periodo').selectedIndex].text
        // Crear una nueva ventana para imprimir
        const printWindow = window.open("Puestos", "_blank");
        // Obtener el contenido HTML de la tabla
        const tableHtml = this.$refs.table.$el.querySelector("table").outerHTML;
        let fecha = 'Fecha: ' + new Date().toLocaleString()
        // Estilos básicos para la impresión
        const style = `
          <style>
            @media all {
              div.saltopagina{
                display: none;
              }
            }
            @media print{
              div.saltopagina{
                display:block; 
                page-break-before:always;
              }
            }	
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 10px 0;
              font-size: 14px;
              text-align: left;
            }
            table, th, td {
              border: 1px solid black;
            }
            th, td {
              padding-left: 5px;
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
              <title>Puestos</title>
              ${style}
            </head>
            <body>
              <p style="text-align: center; font-size: 12px;">SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA<br><b>${this.$store.state.nombreInstitucion}</b><br>TUNJA - BOYACÁ<br>PUESTOS DE ESTUDIANTES POR GRADO Y PERIODO - AÑO LECTIVO ${this.$store.state.aLectivo}<br>Sede: ${this.nombreSede} | Grado: ${this.nombreGrado} | Periodo: ${this.nombrePeriodo}</p>
              ${tableHtml}
              <div style="text-align: right;"><i>${fecha}</i></div>
            </body>
          </html>
        `);

        // Iniciar la impresión y cerrar la ventana
        //printWindow.document.close();
        printWindow.print();
      },
      imprimirConsolidadoCurso() {
        this.nombreSede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
        this.nombreCurso = document.getElementById('cursos')[document.getElementById('cursos').selectedIndex].text
        this.nombrePeriodo = document.getElementById('periodo')[document.getElementById('periodo').selectedIndex].text
        // Crear una nueva ventana para imprimir
        const printWindow = window.open("Puestos", "_blank");
        // Obtener el contenido HTML de la tabla
        const tableHtml = this.$refs.table.$el.querySelector("table").outerHTML;
        let fecha = 'Fecha: ' + new Date().toLocaleString()
        // Estilos básicos para la impresión
        const style = `
          <style>
            @media all {
              div.saltopagina{
                display: none;
              }
            }
            @media print{
              div.saltopagina{
                display:block; 
                page-break-before:always;
              }
            }	
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 10px 0;
              font-size: 14px;
              text-align: left;
            }
            table, th, td {
              border: 1px solid black;
            }
            th, td {
              padding-left: 5px;
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
              <title>Puestos</title>
              ${style}
            </head>
            <body>
              <p style="text-align: center; font-size: 12px;">SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA<br><b>${this.$store.state.nombreInstitucion}</b><br>TUNJA - BOYACÁ<br>PUESTOS DE ESTUDIANTES POR CURSO Y PERIODO - AÑO LECTIVO ${this.$store.state.aLectivo}<br>Sede: ${this.nombreSede} | Curso: ${this.nombreCurso} | Periodo: ${this.nombrePeriodo}</p>
              ${tableHtml}
              <div style="text-align: right;"><i>${fecha}</i></div>
            </body>
          </html>
        `);

        // Iniciar la impresión y cerrar la ventana
        //printWindow.document.close();
        printWindow.print();
      },
      async consultarPuestosGrado() {
        this.btnCargando = true
        this.listaNotasGrado = []
        this.ordenadoPorPromedio = []
        this.idNivel = null
        this.$store.state.datosGrados.forEach(element => {
          if (element.id == this.idGrado) {
            this.idNivel = element.id_nivel
          }
        })
        await axios
        .get(CONFIG.ROOT_PATH + 'resumenes/notasgrado', {params: {idGrado: this.idGrado,periodo: this.idPeriodo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista notas grado')
          } else{
            if (response.data.datos != 0) {
              this.listaNotasGrado = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista notas grado. Intente más tarde.' + err)
        })
        if (this.idNivel == 1) {
          this.mensajeEmergente('warning',CONFIG.TITULO_MSG,'Lo sentimos!. El informe no se encuentra disponible.')
          this.btnCargando = false
        } else {
          // Ordenar por promedio de mayor a menor
          this.ordenadoPorPromedio = this.listaNotasGrado
              .sort((a, b) => parseFloat(b.promedio_final) - parseFloat(a.promedio_final))
              .map((estudiante, index) => ({ ...estudiante, puesto: index + 1 }));
          let puesto = 1;
          this.ordenadoPorPromedio.forEach((estudiante, index) => {
              if (index > 0 && estudiante.promedio_final !== this.ordenadoPorPromedio[index - 1].promedio_final) {
                  puesto = index + 1; // Si el promedio es diferente, actualizar el puesto
              }
              estudiante.puesto = puesto; // Asignar puesto actual
          });
          this.btnCargando = false
        }
      },
      async consultarPuestosCurso() {
        this.btnCargando = true
        this.listaNotasCurso = []
        this.ordenadoPorPromedio = []
        this.idNivel = null
        this.$store.state.datosGrados.forEach(element => {
          if (element.id == this.idCurso) {
            this.idNivel = element.id_nivel
          }
        })
        await axios
        .get(CONFIG.ROOT_PATH + 'resumenes/notascurso', {params: {idCurso: this.idCurso,periodo: this.idPeriodo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista notas grado')
          } else{
            if (response.data.datos != 0) {
              this.listaNotasCurso = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista notas grado. Intente más tarde.' + err)
        })
        if (this.idNivel == 1) {
          this.mensajeEmergente('warning',CONFIG.TITULO_MSG,'Lo sentimos!. El informe no se encuentra disponible.')
          this.btnCargando = false
        } else {
          // Ordenar por promedio de mayor a menor
          this.ordenadoPorPromedio = this.listaNotasCurso
              .sort((a, b) => parseFloat(b.promedio_final) - parseFloat(a.promedio_final))
              .map((estudiante, index) => ({ ...estudiante, puesto: index + 1 }))
          let puesto = 1
          this.ordenadoPorPromedio.forEach((estudiante, index) => {
              if (index > 0 && estudiante.promedio_final !== this.ordenadoPorPromedio[index - 1].promedio_final) {
                  puesto = index + 1 // Si el promedio es diferente, actualizar el puesto
              }
              estudiante.puesto = puesto // Asignar puesto actual
          })
          this.btnCargando = false
        }
      },      
      async ocuparComboGradosSede() {
        this.comboGradosSede = []
        this.$store.state.datosGrados.forEach(element => {
          if (element.id_sede == this.idSede) {
            this.comboGradosSede.push({ 'value': element.id, 'text': element.grado.toUpperCase() })
          }
        })
      },
      async consultaListaCurso() { // para eliminar esta función
        this.btnCargando = true
        this.$store.state.datosCursos.forEach(element => {
          if (element.id == this.idCurso) {
            this.jornada = element.jornada
            this.director = element.docente
            this.idNivel = element.id_nivel
          }
        })
        this.listaEstudiantesCurso = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/listacurso/reportes', { params: { idCurso: this.idCurso }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Lista Curso')
            this.btnCargando = false
          } else{
            if (response.data.datos != 0) {
              this.listaEstudiantesCurso = response.data.datos
              let numPuesto = 1
              this.listaPuestos.forEach(element2 => {
                this.listaEstudiantesCurso.forEach(element => {
                  if (element.idMatricula == element2.id) {
                    element.puesto = numPuesto
                    if (element2.promedio > 0)
                      element.promedio = element2.promedio.toFixed(2)
                    else
                      element.promedio = 0
                    numPuesto++
                  }
                })
              })
              this.listaEstudiantesCurso.sort(((a, b) => b.puesto - a.puesto))
            }
            this.btnCargando = false
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Lista Curso. Intente más tarde.' + err)
          this.btnCargando = false
        })
      },
      tdClassFuncE(row) {
        return 'text-center'
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