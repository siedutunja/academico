<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> RESUMEN DE EVALUACIONES POR PERIODO</h5>
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
        <table border="1" cellspacing="0" cellpadding="1" class="table-responsive">
          <thead>
            <tr>
              <th rowspan="2">#</th>
              <th rowspan="2">Estudiante</th>
              <th v-for="(asigs, area) in encabezadoPorArea" :colspan="asigs.length + 1" :key="'area' + area">
                {{ area }}
              </th>
              <th rowspan="2">PRO GEN</th>
              <th rowspan="2">Baj</th>
              <th rowspan="2">Bas</th>
              <th rowspan="2">Alt</th>
              <th rowspan="2">Sup</th>
              <th rowspan="2">AuJ</th>
              <th rowspan="2">AuS</th>
              <th rowspan="2">Pto</th>
              <th rowspan="2">#</th>
            </tr>
            <tr>
              <template v-for="(area,i) in Object.keys(encabezadoPorArea)">
                <th v-for="(asig,k) in encabezadoPorArea[area]" :key="'Asigna-' + area + asig + k">{{ asig }}</th>
                <th :key="'Asi-'+area + i">Prom</th>
              </template>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(areas, estudiante, i) in estudiantesNotas" :key="estudiante">
              <td class="text-left">{{ i + 1 }}</td>
              <td style="text-align: left">{{ estudiante }}</td>
              <template v-for="(area) in Object.keys(encabezadoPorArea)">
                <td
                  v-for="(asig,j) in encabezadoPorArea[area]" :key="area + asig + j"
                  :class="[
                  obtenerColor(obtenerNota(areas, area, asig), areas, area, asig),
                  fueRecuperada(areas, area, asig) ? 'nota-recuperada' : ''
                ]"
                :title="fueRecuperada(areas, area, asig)
                  ? `Recuperada desde ${obtenerOriginal(areas, area, asig)} → ${obtenerRecuperacion(areas, area, asig)}`
                  : `Nota final: ${obtenerNota(areas, area, asig)}`">
                  {{ obtenerNota(areas, area, asig) }}
                </td>
                <td style="font-weight: bold;" :key="area + i">
                  {{ calcularPromedioArea(areas, area) }}
                </td>
              </template>
              <td :class="obtenerColorGeneral(calcularPromedioGeneral(areas))" style="font-weight: bold; text-align: center;">
                {{ calcularPromedioGeneral(areas) }}
              </td>
              <td style="text-align: center; color: #b22222;">
                {{ contarDesempenoEstudiante(areas, 'bajo') }}
              </td>
              <td style="text-align: center; color: #2980b9;">
                {{ contarDesempenoEstudiante(areas, 'basico') }}
              </td>
              <td style="text-align: center; color: #e67e22;">
                {{ contarDesempenoEstudiante(areas, 'alto') }}
              </td>
              <td style="text-align: center; color: #2e7d32;">
                {{ contarDesempenoEstudiante(areas, 'superior') }}
              </td>
              <td style="text-align: center;">
                {{ areas.ausJ }}
              </td>
              <td style="text-align: center;">
                {{ areas.ausS }}
              </td>
              <td style="text-align: center; font-weight: bold;">
                {{ iconoPuesto(puestosPorEstudiante[estudiante]) }} {{ puestosPorEstudiante[estudiante] }}
              </td>
              <td class="text-left">{{ i + 1 }}</td>
            </tr>
            <tr style="background-color: #f0f0f0; font-weight: bold;">
              <td colspan="2">Total Bajos</td>
              <template v-for="area in Object.keys(encabezadoPorArea)">
                <!-- Totales por asignatura -->
                <template v-for="asig in encabezadoPorArea[area]">
                  <td style="text-align: center; color: #b22222;" :key="asig + area">
                    {{ contarNotasPorAsignatura(area, asig, 'bajo') }}
                  </td>
                </template>
                <!-- Celda vacía para promedio de área -->
                <td :key="area"></td>
              </template>
              <td></td> <!-- Prom. General -->
              <td>{{ contarNotasTotales('bajo') }}</td>
              <td>{{ contarNotasTotales('basico') }}</td>
              <td>{{ contarNotasTotales('alto') }}</td>
              <td>{{ contarNotasTotales('superior') }}</td>
              <td>{{ contarAusencias('ausJ') }}</td>
              <td>{{ contarAusencias('ausS') }}</td>
              <td></td> <!-- Puesto -->
              <td></td>
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
    name: 'resumenperiodo',
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
          const meta = this.listaAreasAsignaturas.find(
            a => a.area === area && a.asignatura === asignatura
          )
          const idTipoEspecialidad = meta?.idTipoEspecialidad
          if (typeof nota !== 'number') return
          if (idTipoEspecialidad === 1) {
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
      calcularPromedioGeneral(estAreas) {
        const areas = [...new Set(this.listaAreasAsignaturas.map(a => a.area))]
        let total = 0
        let cantidad = 0
        areas.forEach(area => {
          const asignsValidas = this.listaAreasAsignaturas.filter(a => a.area === area && a.orden !== 99 && a.orden !== 98)
          if (!asignsValidas.length) return
          const promedio = parseFloat(this.calcularPromedioArea(estAreas, area))
          if (!isNaN(promedio)) {
            total += promedio
            cantidad++
          }
        })
        return cantidad > 0 ? (total / cantidad).toFixed(3) : ''
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
      obtenerNota(areas, area, asig) {
        const val = areas?.[area]?.[asig]?.nota ?? ''
        return typeof val === 'number' ? val.toFixed(1) : val
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
        if (nota > 0) {
          if (val === 1) {
            if (nota < this.datosSeccion.minBas) return 'desempeno-bajo'
            if (nota < this.datosSeccion.minAlt) return 'desempeno-basico'
            if (nota < this.datosSeccion.minSup) return 'desempeno-alto'
            if (nota <= this.datosSeccion.maxSup) return 'desempeno-superior'
          } else {
            if (nota < this.datosSeccion.minBasT) return 'desempeno-bajo'
            if (nota < this.datosSeccion.minAltT) return 'desempeno-basico'
            if (nota < this.datosSeccion.minSupT) return 'desempeno-alto'
            if (nota <= this.datosSeccion.maxSupT) return 'desempeno-superior'
          }
        }
        return 'desempeno-extra'
      },
      obtenerColorGeneral(nota) {
        if (nota < this.datosSeccion.minBas) return 'desempeno-bajo'
        if (nota < this.datosSeccion.minAlt) return 'desempeno-basico'
        if (nota < this.datosSeccion.minSup) return 'desempeno-alto'
        if (nota <= this.datosSeccion.maxSup) return 'desempeno-superior'
        return 'desempeno-extra'
      },
      calcularPromedioArea(estAreas, areaNombre) {
        const asigns = this.listaAreasAsignaturas.filter(a => a.area === areaNombre && a.orden !== 99)
        if (!asigns.length) return ''

        const tipoArea = asigns[0].idTipoArea
        let total = 0
        let pesoTotal = 0
        asigns.forEach(asig => {
          const nota = estAreas?.[areaNombre]?.[asig.asignatura]?.nota ?? 0
          total += nota * (asig.porcentaje / 100)
          /*
          if (tipoArea === 1) {
            total += nota * (asig.porcentaje / 100)
            pesoTotal += asig.porcentaje
          } else {
            total += nota
            pesoTotal++
          }
          */
        })
        //if (pesoTotal === 0) return ''
        //const promedio = tipoArea === 1 ? total : total / pesoTotal
        return total > 0 ? this.redondear(total).toFixed(1) : ''
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
      estudiantesNotas() {
        const mapa = {}
        this.datosRaw.forEach(row => {
          const { estudiante, area, asignatura, definitiva, recuperacion, orden, definitivacompor, definitivapree, idTipoEspecialidad, ausJ, ausS } = row
          if (!mapa[estudiante]) mapa[estudiante] = { ausJ: 0, ausS: 0 }
          if (!mapa[estudiante][area]) mapa[estudiante][area] = {}
          let notaFinal = 0
          if (orden === 99) {
            if (this.datosSeccion.tipoValComp == 1) {
              notaFinal = definitiva
            } else {
              notaFinal = definitivacompor != null && definitivacompor != 0 && definitivacompor != '' ? definitivacompor : ''
            }
          } else {
            if (this.idNivel == 1) {
              notaFinal = definitivapree != null && definitivapree != 0 && definitivapree != '' ? definitivapree : ''
            } else {
              if (definitiva > 0)
                notaFinal = recuperacion > definitiva ? recuperacion : definitiva
              else
                notaFinal = ''
            }
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
