<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> ESTADÍSTICA DE EVALUACIONES POR PERIODO</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="2">
                <b-form-group label="Periodo:" label-for="periodo" class="etiqueta">
                  <b-form-select id="periodo" ref="periodo" v-model="idPeriodo" :options="comboPeriodos" @change="idSede=null,idCurso=null"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idCurso=null,ocuparComboCursosSede()" :disabled="idPeriodo!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="Seleccione el Curso:" label-for="cursos" class="etiqueta">
                  <b-form-select id="cursos" ref="cursos" v-model="idCurso" :options="comboCursosSede" @change="consultarEstudiantes()" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="12">
        <div v-if="btnCargando">
          <div class="text-center m-5 text-primary">
            <b-spinner style="width: 3rem; height: 3rem;" label="Spinner"></b-spinner>
            <br><strong>Cargando informe...</strong>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row v-if="!btnCargando && idCurso!=null">
      <b-col lg="12">
        <table class="tabla-resumen table-responsive" border="1" cellspacing="0" cellpadding="1">
          <thead>
            <tr>
              <th rowspan="2">Asignatura</th>
              <th colspan="2">🔴 Bajo</th>
              <th colspan="2">🔵 Básico</th>
              <th colspan="2">🟡 Alto</th>
              <th colspan="2">🟢 Superior</th>
              <th rowspan="2">Total</th>
            </tr>
            <tr>
              <th>Cantidad</th><th>%</th>
              <th>Cantidad</th><th>%</th>
              <th>Cantidad</th><th>%</th>
              <th>Cantidad</th><th>%</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="fila in generarResumenDesempeno()" :key="fila.area + '-' + fila.asignatura">
              <td style="text-align: left;">{{ fila.nombreAsignatura }}</td>
              <td style="text-align: center;">{{ fila.bajo }}</td>
              <td style="text-align: center;">{{ fila.pbajo }}%</td>
              <td style="text-align: center;">{{ fila.basico }}</td>
              <td style="text-align: center;">{{ fila.pbasico }}%</td>
              <td style="text-align: center;">{{ fila.alto }}</td>
              <td style="text-align: center;">{{ fila.palto }}%</td>
              <td style="text-align: center;">{{ fila.superior }}</td>
              <td style="text-align: center;">{{ fila.psuperior }}%</td>
              <td style="text-align: center;">{{ fila.totalFila }}</td>
            </tr>
            <tr style="background-color: #f0f0f0; font-weight: bold;">
              <td colspan="1">Totales</td>
              <td style="text-align: center;">{{ totales.bajo }}</td>
              <td></td>
              <td style="text-align: center;">{{ totales.basico }}</td>
              <td></td>
              <td style="text-align: center;">{{ totales.alto }}</td>
              <td></td>
              <td style="text-align: center;">{{ totales.superior }}</td>
              <td></td>
              <td style="text-align: center;">{{ totales.total }}</td>
            </tr>
          </tbody>
        </table>
        <div style="margin-bottom: 1rem">
          <b-button class="small mx-1 mt-3" variant="primary" @click="imprimir">Imprimir Consolidado</b-button>
          <b-button class="small mx-1 mt-3" variant="outline-primary" @click="exportarAExcel">Exportar a Excel</b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import * as XLSX from 'xlsx'
  export default {
    name: 'estadisticaasignaturas',
    components: {
    },
    data () {
      return {
        idSede: null,
        comboSedes: [],
        idPeriodo: null,
        comboPeriodos: null,
        idCurso: null,
        comboCursosSede: [],
        nombreSede: null,
        nombreCurso: null,
        idNivel: null,
        btnCargando: false,
        datosRaw: [],
        datosSeccion: {},
        listaAreasAsignaturas: [],
      }
    },
    methods: {
      calcularTotalesResumen() {
        const resumen = this.generarResumenDesempeno()
        let bajo = 0, basico = 0, alto = 0, superior = 0, total = 0
        resumen.forEach(fila => {
          bajo += fila.bajo
          basico += fila.basico
          alto += fila.alto
          superior += fila.superior
          total += fila.totalFila
        })
        return { bajo, basico, alto, superior, total }
      },
      generarResumenDesempeno() {
        const resumen = []
        this.listaAreasAsignaturas.forEach(({ area, asignatura, nombreArea, nombreAsignatura }) => {
          let bajo = 0, basico = 0, alto = 0, superior = 0
          let total = 0
          Object.values(this.estudiantesNotas).forEach(est => {
            const nota = est?.[area]?.[asignatura]?.nota
            const val = est?.[area]?.[asignatura]?.idTipoEspecialidad
            if (typeof nota !== 'number') return
            total++
            if (val === 1) {
              if (nota < this.datosSeccion.minBas) bajo++
              else if (nota < this.datosSeccion.minAlt) basico++
              else if (nota < this.datosSeccion.minSup) alto++
              else if (nota <= this.datosSeccion.maxSup) superior++
            } else {
              if (nota < this.datosSeccion.minBasT) bajo++
              else if (nota < this.datosSeccion.minAltT) basico++
              else if (nota < this.datosSeccion.minSupT) alto++
              else if (nota <= this.datosSeccion.maxSupT) superior++
            }
          })
          resumen.push({
            area,
            nombreArea,
            asignatura,
            nombreAsignatura,
            bajo,
            basico,
            alto,
            superior,
            total,
            pbajo: total ? this.redondear((bajo / total) * 100).toFixed(1) : '0.0',
            pbasico: total ? this.redondear((basico / total) * 100).toFixed(1) : '0.0',
            palto: total ? this.redondear((alto / total) * 100).toFixed(1) : '0.0',
            psuperior: total ? this.redondear((superior / total) * 100).toFixed(1) : '0.0',
            totalFila: bajo + basico + alto + superior
          })
        })
        return resumen
      },
      async consultarEstudiantes() {
        this.btnCargando = true
        this.nombreSede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
        if (this.idCurso != null) { 
          this.nombreCurso = document.getElementById('cursos')[document.getElementById('cursos').selectedIndex].text
          this.$store.state.datosCursos.forEach(element => {
            if (element.id == this.idCurso) {
              this.idNivel = element.id_nivel
            }
          })
          this.listaAreasAsignaturas = []
          await axios
          .get(CONFIG.ROOT_PATH + 'consolidados/areasasignaturas/curso', {params: {idCurso: this.idCurso}})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista areas-asignaturas curso')
              this.btnCargando = false
            } else{
              if (response.data.datos != 0) {
                this.listaAreasAsignaturas = response.data.datos
              }
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista areas-asignaturas curso. Intente más tarde.' + err)
            this.btnCargando = false
          })
          this.datosRaw = []
          await axios
          .get(CONFIG.ROOT_PATH + 'consolidados/asignaturas/curso/periodo', {params: {idCurso: this.idCurso, periodo: this.idPeriodo}})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consolidados asignaturas curso periodo')
              this.btnCargando = false
            } else{
              if (response.data.datos != 0) {
                this.datosRaw = response.data.datos
              }
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consolidados asignaturas curso periodo. Intente más tarde.' + err)
            this.btnCargando = false
          })
        }
        //console.log(JSON.stringify(this.listaAreasAsignaturas))
        this.btnCargando = false
      },
      imprimir() {
        let fecha = 'Fecha: ' + new Date().toLocaleString()
        let tituloInforme = 'RESUMEN DE EVALUACIONES POR PERIODO'
        const contenido = document.querySelector('table').outerHTML
        const ventana = window.open("Consolidados", "_blank")
        ventana.document.write(`<html><head><title>Imprimir</title></head>
        <style scoped>
          table {
            border-collapse: collapse;
            width: 100%;
            text-align: center;
            font-size: 10px;
          }
          th {
            background: #eee;
          }
          .nota-recuperada {
            border: 2px solid #ffa500;
            box-shadow: 0 0 5px #ffa500;
          }
          .desempeno-bajo { background-color: #f8d7da; color: #721c24; }
          .desempeno-basico { background-color: #d1ecf1; color: #0c5460; }
          .desempeno-alto { background-color: #fff3cd; color: #856404; }
          .desempeno-superior { background-color: #d4edda; color: #155724; }
          .desempeno-extra { background-color: #f4ecf5; color: #2f2e2e; }
        </style>
          <body class="container">
            <p style="text-align: center; font-size: 12px;">SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA<br><b>${this.$store.state.nombreInstitucion}</b><br>TUNJA - BOYACÁ<br>${tituloInforme}<br>Sede: ${this.nombreSede} | Curso: ${this.nombreCurso} | Año Lectivo ${this.$store.state.aLectivo} | Periodo: ${this.idPeriodo}</p>
            ${contenido}
            <div style="text-align: right; font-size: 12px;"><i>${fecha}</i></div>
          </body>
        </html>`)
        ventana.document.close()
        ventana.print()
      },
      exportarAExcel() {
        const tabla = document.querySelector('table')
        const wb = XLSX.utils.table_to_book(tabla)
        XLSX.writeFile(wb, 'notas.xlsx')
      },
      redondear(num) {
        var m = Number((Math.abs(num) * 10).toPrecision(15))
        return Math.round(m) / 10 * Math.sign(num);
      },
      async ocuparComboCursosSede() {
        this.comboCursosSede = []
        this.$store.state.datosCursos.forEach(element => {
          if (element.id_sede == this.idSede) {
            this.comboCursosSede.push({ 'value': element.id, 'text': element.nomenclatura.toUpperCase() })
          }
        })
      },
      async ocuparComboSedes() {
        this.comboSedes = []
        this.$store.state.datosSedes.forEach(element => {
          this.comboSedes.push({ 'value': element.id, 'text': element.sede.toUpperCase() })
        })
      },
      async ocuparComboPeriodos() {
        this.comboPeriodos = []
        this.$store.state.datosTablas.periodos.forEach(element => {
          this.comboPeriodos.push({ 'value': element.id, 'text': element.periodo.toUpperCase() })
        })
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    computed: {
      totales() {
        return this.calcularTotalesResumen()
      },
      estudiantesNotas() {
        const mapa = {}
        this.datosRaw.forEach(row => {
          const { estudiante, area, asignatura, definitiva, recuperacion, orden, definitivacompor, idTipoEspecialidad, ausJ, ausS } = row
          if (!mapa[estudiante]) mapa[estudiante] = { ausJ: 0, ausS: 0 }
          if (!mapa[estudiante][area]) mapa[estudiante][area] = {}
          let notaFinal = 0
          if (orden === 99) {
            notaFinal = definitivacompor != null ? definitivacompor : ''
          } else {
            notaFinal = recuperacion > definitiva ? recuperacion : definitiva
          }
          mapa[estudiante][area][asignatura] = {
            nota: notaFinal,
            fueRecuperada: recuperacion > definitiva,
            original: definitiva,
            recuperacion,
            idTipoEspecialidad
          }
          mapa[estudiante].ausJ += ausJ || 0
          mapa[estudiante].ausS += ausS || 0
        })
        return mapa
      },
    },
    beforeMount() {
      this.ocuparComboSedes()
      this.ocuparComboPeriodos()
      this.datosSeccion = this.$store.state.datosSecciones[this.$store.state.idSeccion - 1]
      //console.log(JSON.stringify(this.datosSeccion))
    }
  }
</script>
<style scoped>
.tabla-resumen {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-size: 0.95rem;
}
.tabla-resumen th,
.tabla-resumen td {
  border: 1px solid #ccc;
  padding: 6px 8px;
  text-align: left;
}
.tabla-resumen thead {
  background-color: #f5f5f5;
  font-weight: bold;
}
</style>
