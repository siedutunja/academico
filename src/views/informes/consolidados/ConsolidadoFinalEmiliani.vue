<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> CONSOLIDADO EVALUACIONES FINALES</h5>
          </template>
          <b-card-text>
            <b-row>
              <!--
              <b-col lg="2">
                <b-form-group label="Periodo:" label-for="periodo" class="etiqueta">
                  <b-form-select id="periodo" ref="periodo" v-model="idPeriodo" :options="comboPeriodos" @change="idSede=null,idCurso=null"></b-form-select>
                </b-form-group>
              </b-col>
              -->
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
        <table border="1" cellspacing="0" cellpadding="1" class="table-responsive">
          <thead>
            <tr>
              <th rowspan="3">#</th>
              <th rowspan="3">Estudiante</th>
              <template v-for="(asigs, area) in encabezadoPorArea">
                <th :colspan="asigs.length * 5 + 1" :key="area">{{ area }}</th>
              </template>
              <th rowspan="2">AuJ</th>
              <th rowspan="2">AuS</th>
            </tr>
            <tr>
              <template v-for="(asigs, area) in encabezadoPorArea">
                <template v-for="(asig, k) in asigs">
                  <th colspan="5" :key="'area-' + asig + k">{{ asig }}</th>
                </template>
                <th rowspan="2" :key="'prom-area-' + area">PRO AR</th>
              </template>
            </tr>
            <tr>
              <template v-for="(asigs, area) in encabezadoPorArea">
                <template v-for="asig in asigs">
                  <th :key="'p1' + asig + area">P1</th>
                  <th :key="'p2' + asig + area">P2</th>
                  <th :key="'p3' + asig + area">P3</th>
                  <th :key="'p4' + asig + area">P4</th>
                  <th :key="'prom' + asig + area">PR</th>
                </template>
              </template>
              <th></th> <!-- Prom. General -->
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(est, nombre, i) in estudiantesNotas" :key="nombre">
              <td class="text-left">{{ i + 1 }}</td>
              <td style="text-align: left">{{ nombre }}</td>
              <template v-for="(asigs, area) in encabezadoPorArea">
                <template v-for="asig in asigs">
                  <td v-for="p in [1,2,3,4]" :key="nombre + area + asig + p">
                    {{ obtenerNota(est, area, asig, p) }}
                  </td>
                  <td :key="'prom' + nombre + area + asig">
                    {{ obtenerPromedioAsignatura(est, area, asig) }}
                  </td>
                </template>
                <td :key="'promArea' + nombre + area">
                  {{ obtenerPromedioArea(est, area) }}
                </td>
              </template>

              <td>{{ est.ausJ }}</td>
              <td>{{ est.ausS }}</td>
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
    name: 'consolidadoponderado',
    components: {
    },
    data () {
      return {
        idSede: null,
        comboSedes: [],
        idPeriodo: 5,
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
      obtenerPromedioArea(est, area) {
        const areaData = est.areas && est.areas[area]
        return areaData ? this.calcularPromedioArea(areaData) : '0.00'
      },
      obtenerNota(est, area, asignatura, periodo) {
        const nota = est?.areas?.[area]?.asignaturas?.[asignatura]?.periodos?.[periodo]
        return typeof nota === 'number' ? nota.toFixed(1) : nota
      },
      obtenerPromedioAsignatura(est, area, asignatura) {
        const asig = est?.areas?.[area]?.asignaturas?.[asignatura]
        return asig ? this.calcularPromedioAsignatura(asig) : '0.00'
      },
      calcularPromedioAsignatura(asig) {
        const pesos = asig.pesos
        const periodos = asig.periodos
        const orden = asig.orden
        if (orden === 99) return ''
        let total = 0
        for (let p = 1; p <= 4; p++) {
          const nota = periodos[p] ?? 0
          total += nota * pesos[p] / 100
        }
        return total.toFixed(2)
      },
      calcularPromedioArea(areaData) {
        const asigns = Object.values(areaData.asignaturas)
        if (!asigns.length) return '0.00'
        let total = 0
        asigns.forEach(asig => {
          total += parseFloat(this.calcularPromedioAsignatura(asig))
        })
        return (total / asigns.length).toFixed(2)
      },
      calcularPromedioGeneral(est) {
        const areas = Object.values(est.areas)
        if (!areas.length) return '0.00'
        let total = 0
        areas.forEach(area => {
          total += parseFloat(this.calcularPromedioArea(area))
        })
        return (total / areas.length).toFixed(2)
      },
      contarAusencias(tipo) {
        let total = 0
        Object.values(this.estudiantesNotas).forEach(est => {
          if (tipo === 'ausJ') total += est.ausJ || 0
          if (tipo === 'ausS') total += est.ausS || 0
        })
        return total
      },
      contarNotasPorAsignatura(area, asignatura, tipo) {
        let contador = 0
        Object.values(this.estudiantesNotas).forEach(est => {
          const nota = est?.[area]?.[asignatura]?.nota
          const val = est?.[area]?.[asignatura]?.idTipoEspecialidad
          if (typeof nota !== 'number') return
          if (val === 1) {
            if (tipo === 'bajo' && nota < this.datosSeccion.minBas) contador++
            else if (tipo === 'basico' && nota >= this.datosSeccion.minBas && nota < this.datosSeccion.minAlt) contador++
            else if (tipo === 'alto' && nota >= this.datosSeccion.minAlt && nota < this.datosSeccion.minSup) contador++
            else if (tipo === 'superior' && nota >= this.datosSeccion.minSup && nota <= this.datosSeccion.maxSup) contador++
          } else {
            if (tipo === 'bajo' && nota < this.datosSeccion.minBasT) contador++
            else if (tipo === 'basico' && nota >= this.datosSeccion.minBasT && nota < this.datosSeccion.minAltT) contador++
            else if (tipo === 'alto' && nota >= this.datosSeccion.minAltT && nota < this.datosSeccion.minSupT) contador++
            else if (tipo === 'superior' && nota >= this.datosSeccion.minSupT && nota <= this.datosSeccion.maxSupT) contador++
          }
        })
        return contador
      },
      contarNotasTotales(tipo) {
        let total = 0
        Object.values(this.estudiantesNotas).forEach(est => {
          this.listaAreasAsignaturas.forEach(({ area, asignatura }) => {
            const nota = est?.[area]?.[asignatura]?.nota
            const val = est?.[area]?.[asignatura]?.idTipoEspecialidad
            if (typeof nota !== 'number') return
          if (val === 1) {
            if (tipo === 'bajo' && nota < this.datosSeccion.minBas) total++
            else if (tipo === 'basico' && nota >= this.datosSeccion.minBas && nota < this.datosSeccion.minAlt) total++
            else if (tipo === 'alto' && nota >= this.datosSeccion.minAlt && nota < this.datosSeccion.minSup) total++
            else if (tipo === 'superior' && nota >= this.datosSeccion.minSup && nota <= this.datosSeccion.maxSup) total++
          } else {
            if (tipo === 'bajo' && nota < this.datosSeccion.minBasT) total++
            else if (tipo === 'basico' && nota >= this.datosSeccion.minBasT && nota < this.datosSeccion.minAltT) total++
            else if (tipo === 'alto' && nota >= this.datosSeccion.minAltT && nota < this.datosSeccion.minSupT) total++
            else if (tipo === 'superior' && nota >= this.datosSeccion.minSupT && nota <= this.datosSeccion.maxSupT) total++
          }
          })
        })
        return total
      },
      iconoPuesto(puesto) {
        if (puesto === 1) return '🥇'
        if (puesto === 2) return '🥈'
        if (puesto === 3) return '🥉'
        return ''
      },
      contarDesempenoEstudiante(estAreas, tipo) {
        let contador = 0
        this.listaAreasAsignaturas.forEach(({ area, asignatura }) => {
          const nota = estAreas?.[area]?.[asignatura]?.nota
          const val =  estAreas?.[area]?.[asignatura]?.idTipoEspecialidad
          if (typeof nota !== 'number') return
          if (val === 1) {
            if (tipo === 'bajo' && nota < this.datosSeccion.minBas) contador++
            else if (tipo === 'basico' && nota >= this.datosSeccion.minBas && nota < this.datosSeccion.minAlt) contador++
            else if (tipo === 'alto' && nota >= this.datosSeccion.minAlt && nota < this.datosSeccion.minSup) contador++
            else if (tipo === 'superior' && nota >= this.datosSeccion.minSup && nota <= this.datosSeccion.maxSup) contador++
          } else {
            if (tipo === 'bajo' && nota < this.datosSeccion.minBasT) contador++
            else if (tipo === 'basico' && nota >= this.datosSeccion.minBasT && nota < this.datosSeccion.minAltT) contador++
            else if (tipo === 'alto' && nota >= this.datosSeccion.minAltT && nota < this.datosSeccion.minSupT) contador++
            else if (tipo === 'superior' && nota >= this.datosSeccion.minSupT && nota <= this.datosSeccion.maxSupT) contador++
          }
        })
        return contador
      },
      fueRecuperada(areas, area, asig) {
        return areas?.[area]?.[asig]?.fueRecuperada ?? false
      },
      obtenerOriginal(areas, area, asig) {
        const val = areas?.[area]?.[asig]?.original
        return typeof val === 'number' ? val.toFixed(1) : '0.0'
      },
      obtenerRecuperacion(areas, area, asig) {
        const val = areas?.[area]?.[asig]?.recuperacion
        return typeof val === 'number' ? val.toFixed(1) : '0.0'
      },
      obtenerColor(nota, areas, area, asig) {
        const val = areas?.[area]?.[asig]?.idTipoEspecialidad
        if (val === 1) {
          if (nota < this.datosSeccion.minBas) return 'desempeno-bajo'
          if (nota < this.datosSeccion.minAlt) return 'desempeno-basico'
          if (nota < this.datosSeccion.minSup) return 'desempeno-alto'
          if (nota <= this.datosSeccion.maxSup) return 'desempeno-superior'
          return 'desempeno-extra'
        } else {
          if (nota < this.datosSeccion.minBasT) return 'desempeno-bajo'
          if (nota < this.datosSeccion.minAltT) return 'desempeno-basico'
          if (nota < this.datosSeccion.minSupT) return 'desempeno-alto'
          if (nota <= this.datosSeccion.maxSupT) return 'desempeno-superior'
          return 'desempeno-extra'
        }
      },
      obtenerColorGeneral(nota) {
        if (nota < this.datosSeccion.minBas) return 'desempeno-bajo'
        if (nota < this.datosSeccion.minAlt) return 'desempeno-basico'
        if (nota < this.datosSeccion.minSup) return 'desempeno-alto'
        if (nota <= this.datosSeccion.maxSup) return 'desempeno-superior'
        return 'desempeno-extra'
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
                //this.listaAreasAsignaturas = response.data.datos
                response.data.datos.forEach(element => {
                  if (element.orden != 99) {
                    this.listaAreasAsignaturas.push(element)
                  }
                });
              }
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista areas-asignaturas curso. Intente más tarde.' + err)
            this.btnCargando = false
          })
          this.datosRaw = []
          await axios
          .get(CONFIG.ROOT_PATH + 'consolidados/asignaturas/curso/acumulado', {params: {idCurso: this.idCurso, periodo: this.idPeriodo, vigencia: this.$store.state.aLectivo}})
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
        let tituloInforme = 'CONSOLIDADO EVALUACIONES FINALES'
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
            <p style="text-align: center; font-size: 12px;">SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA<br><b>${this.$store.state.nombreInstitucion}</b><br>TUNJA - BOYACÁ<br>${tituloInforme}<br>Sede: ${this.nombreSede} | Curso: ${this.nombreCurso} | Año Lectivo ${this.$store.state.aLectivo} | Periodo: FINAL</p>
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
        XLSX.writeFile(wb, 'ConsolidadoFinal.xlsx')
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
        this.$store.state.periodos.forEach(element => {
          this.comboPeriodos.push({ 'value': element.id, 'text': element.periodo.toUpperCase() })
        })
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    computed: {
      estudiantesNotas() {
        const mapa = {}
        this.datosRaw.forEach(row => {
          const { estudiante, area, asignatura, periodo, definitiva, recuperacion, orden, definitivacompor, idTipoEspecialidad, ausJ, ausS } = row
          if (!mapa[estudiante]) {
            mapa[estudiante] = { ausJ: 0, ausS: 0, areas: {} }
          }
          if (!mapa[estudiante].areas[area]) {
            mapa[estudiante].areas[area] = { asignaturas: {} }
          }
          if (!mapa[estudiante].areas[area].asignaturas[asignatura]) {
            mapa[estudiante].areas[area].asignaturas[asignatura] = {
              periodos: {},
              orden,
              pesos: { 1: this.datosSeccion.pesoP1, 2: this.datosSeccion.pesoP2, 3: this.datosSeccion.pesoP3, 4: this.datosSeccion.pesoP4 }
            }
          }
          let notaFinal = 0
          if (orden === 99) {
            notaFinal = definitivacompor != null ? definitivacompor : ''
          } else {
            notaFinal = recuperacion > definitiva ? recuperacion : definitiva
          }
          mapa[estudiante].areas[area].asignaturas[asignatura].periodos[periodo] = notaFinal
          mapa[estudiante].ausJ += ausJ || 0
          mapa[estudiante].ausS += ausS || 0
        })
        return mapa
      },




      totalColumnasPromedioArea() {
        const areasUnicas = new Set(this.listaAreasAsignaturas.map(a => a.area))
        return areasUnicas.size
      },
      puestosPorEstudiante() {
        const lista = Object.entries(this.estudiantesNotas).map(([nombre, areas]) => {
          const promedio = parseFloat(this.calcularPromedioGeneral(areas))
          return { nombre, promedio: isNaN(promedio) ? 0 : promedio }
        })
        // Ordenar de mayor a menor
        lista.sort((a, b) => b.promedio - a.promedio)
        const puestos = {}
        let puestoActual = 1
        let contador = 1
        let ultimoPromedio = null
        lista.forEach(est => {
          if (est.promedio !== ultimoPromedio) {
            puestoActual = contador
            ultimoPromedio = est.promedio
          }
          puestos[est.nombre] = puestoActual
          contador++
        })
        return puestos
      },
      encabezadoPorArea() {
        const mapa = {}
        this.listaAreasAsignaturas.forEach(({ area, asignatura }) => {
          if (!mapa[area]) mapa[area] = []
          mapa[area].push(asignatura)
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
