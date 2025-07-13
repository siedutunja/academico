<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> AUSENCIAS SIN JUSTIFICAR</h5>
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
        <div style="margin-bottom: 1rem">
          <button @click="exportarAExcel">📁 Exportar a Excel</button>
          <button @click="imprimir">🖨️ Imprimir</button>
        </div>
        <table border="1" cellspacing="0" cellpadding="1" class="table-responsive">
          <thead>
            <!-- Fila 1: Áreas -->
            <tr>
              <th rowspan="3">Estudiante</th>
              <template v-for="area in areas">
                <th
                  :colspan="area.asignaturas.length * 5 + 1"
                  :key="'th-area-' + area.nombre"
                >
                  {{ area.nombre }}
                </th>
              </template>
              <th rowspan="3">Prom. General</th>
            </tr>

            <!-- Fila 2: Asignaturas -->
            <tr>
              <template v-for="area in areas">
                <template v-for="asig in area.asignaturas">
                  <th
                    :colspan="5"
                    :key="'th-asig-' + area.nombre + '-' + asig"
                  >
                    {{ asig }}
                  </th>
                </template>
                <th :key="'th-promArea-' + area.nombre">Prom. Área</th>
              </template>
            </tr>

            <!-- Fila 3: Periodos + Prom. -->
            <tr>
              <template v-for="area in areas">
                <template v-for="asig in area.asignaturas">
                  <th
                    v-for="i in 4"
                    :key="'th-per-' + area.nombre + '-' + asig + '-p' + i"
                  >
                    P{{ i }}
                  </th>
                  <th :key="'th-prom-' + area.nombre + '-' + asig">Prom.</th>
                </template>
                <th :key="'th-prom-label-' + area.nombre">—</th>
              </template>
              <th :key="'th-prom-general'">—</th>
            </tr>

            <!--
            <tr>
              <th rowspan="3">#</th>
              <th rowspan="3">ESTUDIANTES</th>
              <th v-for="area in areas" :key="'area-' + area.nombre" :colspan="area.asignaturas.length * 5 + 1">
                {{ area.nombre }}
              </th>
              <th rowspan="3">Prom. General</th>
            </tr>
            <tr>
              <th v-for="item in encabezadosPlanos" :key="'asig-' + item.area + '-' + item.asignatura" :colspan="5">
                {{ item.asignatura }}
              </th>
            </tr>
            
            <tr>
              <th v-for="header in encabezadosPeriodosConPromedio" :key="'header-' + header.area + '-' + header.asignatura + '-' + header.tipo + header.periodo">
                {{ header.tipo === 'Prom' ? 'PR' : 'P' + header.periodo }}
              </th>
            </tr>
            -->
          </thead>
          <tbody>
  <tr v-for="est in estudiantes" :key="est.nombre">
    <td>{{ est.nombre }}</td>

    <td
      v-for="col in columnasTotales"
      :key="`td-${est.nombre}-${col.area || 'global'}-${col.asignatura || 'n/a'}-${col.tipo}-${col.periodo || 0}`"
      :style="col.tipo === 'PromedioArea' || col.tipo === 'PromedioGeneral' ? 'font-weight: bold' : ''"
    >
      {{
        col.tipo === 'Periodo'
          ? (
              est.notas &&
              est.notas[col.area] &&
              est.notas[col.area][col.asignatura] &&
              est.notas[col.area][col.asignatura][col.periodo - 1] &&
              typeof est.notas[col.area][col.asignatura][col.periodo - 1].notaFinal === 'number'
                ? est.notas[col.area][col.asignatura][col.periodo - 1].notaFinal.toFixed(2)
                : '-'
            )
          : col.tipo === 'PromedioAsignatura'
            ? promedioAsignatura(est, col.area, col.asignatura)
            : col.tipo === 'PromedioArea'
              ? promedioArea(est, col.area)
              : promedioGeneral(est)
      }}
    </td>
  </tr>

<!--
  <tr v-for="est in estudiantes" :key="est.nombre">
    <td>{{ est.nombre }}</td>

    <td
      v-for="encabezado in encabezadosPeriodosConPromedio"
      :key="`td-${est.nombre}-${encabezado.area}-${encabezado.asignatura}-${encabezado.tipo}-${encabezado.periodo}`"
    >
      {{
        encabezado.tipo === 'Prom'
          ? promedioAsignatura(est, encabezado.area, encabezado.asignatura)
          : obtenerNota(est, encabezado)
      }}
    </td>

    <td
      v-for="area in areas"
      :key="`td-promArea-${est.nombre}-${area.nombre}`"
      style="font-weight: bold"
    >
      {{ promedioArea(est, area.nombre) }}
    </td>

    <td style="font-weight: bold">
      {{ promedioGeneral(est) }}
    </td>
  </tr>
-->

            <!--
            <tr v-for="(estudiante, indexEst) in estudiantes" :key="'est-' + indexEst">
              <td class="text-left">{{ indexEst + 1 }}</td>
              <td class="text-left">{{ estudiante.nombre }}</td>
              <td v-for="encabezado in encabezadosPeriodosConPromedio" :key="'nota-' + estudiante.nombre + '-' + encabezado.area + '-' + encabezado.asignatura + '-' + encabezado.tipo + '-' + encabezado.periodo">
                {{
                  encabezado.tipo === 'Prom'
                    ? promedioAsignatura(estudiante, encabezado.area, encabezado.asignatura)
                    : obtenerCelda(estudiante, encabezado)
                }}
              </td>
              <td v-for="area in areas" :key="'promArea-' + estudiante.nombre + '-' + area.nombre" style="font-weight: bold">
                {{ promedioArea(estudiante, area.nombre) }}
              </td>
              <td style="font-weight: bold">
                {{ promedioGeneral(estudiante) }}
              </td>
            </tr>
            -->
          </tbody>
        </table>
      </b-col>
    </b-row>
    <div class="informe" id="informe" style="display:none;" v-if="idPeriodo!=null">
      <div v-for="item in listasEstudiantes" :key="item.id">
        <div style="text-align: center">
            <div>REPUBLICA DE COLOMBIA</div>
            <div>SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA</div>
            <div><strong>{{$store.state.nombreInstitucion}}</strong></div>
            <div>TUNJA - BOYACÁ</div>
            <div>RESÚMEN DE AUSENCIAS AÑO LECTIVO {{$store.state.aLectivo}}</div>
        </div>
        <table class="table">
          <thead>
            <tr><th>Curso</th><th>{{item.idCurso}}</th></tr>
          </thead>
          <tbody>
            <tr v-for="item2 in item.estudiantes" :key="item2.id">
              <td>{{item2.estudiante}}</td>
            </tr>
          </tbody>
        </table>
        <div class="saltopagina"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import * as XLSX from 'xlsx'

  export default {
    name: 'ausencias',
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
        estudiantes: [],

        listasEstudiantes: [],
  }
    },
    methods: {
      promedioAsignatura(est, area, asignatura) {
        const periodos = est.notas?.[area]?.[asignatura]
        if (!Array.isArray(periodos)) return "-"
        const vals = periodos
          .filter(p => p && typeof p.notaFinal === "number")
          .map(p => p.notaFinal)
        const prom = vals.reduce((a, b) => a + b, 0) / (vals.length || 1)
        return vals.length ? prom.toFixed(2) : "-"
      },
      promedioArea(est, area) {
        const asigns = Object.keys(est.notas?.[area] || {})
        const proms = asigns.map(asig =>
          parseFloat(this.promedioAsignatura(est, area, asig))
        ).filter(n => !isNaN(n))
        const total = proms.reduce((a, b) => a + b, 0)
        return proms.length ? (total / proms.length).toFixed(2) : "-"
      },
      promedioGeneral(est) {
        const areas = Object.keys(est.notas || {})
        const proms = areas.map(area =>
          parseFloat(this.promedioArea(est, area))
        ).filter(n => !isNaN(n))
        const total = proms.reduce((a, b) => a + b, 0)
        return proms.length ? (total / proms.length).toFixed(2) : "-"
      },


      /*
      promedioAsignatura(estudiante, area, asignatura) {
        const notas = estudiante.notas?.[area]?.[asignatura]
        if (!Array.isArray(notas)) return "-"
        const suma = notas.reduce((acum, periodo) => {
          if (periodo && typeof periodo.notaFinal === "number") {
            return acum + periodo.notaFinal
          }
          return acum
        }, 0)
        const cantidad = notas.filter(p => p && typeof p.notaFinal === "number").length
        return cantidad > 0 ? this.redondear(suma / cantidad).toFixed(1) : "-"
      },
      promedioArea(estudiante, area) {
        const asignaturas = estudiante.notas?.[area]
        if (!asignaturas) return "-"
        let suma = 0
        let count = 0
        Object.values(asignaturas).forEach(periodos => {
          periodos.forEach(p => {
            if (p && typeof p.notaFinal === 'number') {
              suma += p.notaFinal
              count++
            }
          })
        })
        return count > 0 ? (suma / count).toFixed(2) : "-"
      },
      promedioGeneral(estudiante) {
        const areas = Object.keys(estudiante.notas || {})
        const promedios = areas
          .map(area => parseFloat(this.promedioArea(estudiante, area)))
          .filter(n => !isNaN(n))
        const suma = promedios.reduce((a, b) => a + b, 0)
        return promedios.length ? (suma / promedios.length).toFixed(2) : "-"
      },
      */
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
          this.estudiantes = []
          await axios
          .get(CONFIG.ROOT_PATH + 'consolidados/asignaturas/curso', {params: {idCurso: this.idCurso, periodo: this.idPeriodo}})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consolidados asignaturas curso')
              this.btnCargando = false
            } else{
              if (response.data.datos != 0) {
                this.estudiantes = this.transformarResultados(response.data.datos)
              }
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consolidados asignación docentes curso. Intente más tarde.' + err)
            this.btnCargando = false
          })
        }
        //console.log(JSON.stringify(this.estudiantes))
        this.btnCargando = false
      },
      transformarResultados(data) {
        const estructura = {}
        data.forEach(item => {
          const nombre = item.estudiante.trim()
          const area = item.area
          const asignatura = item.asignatura
          const periodo = parseInt(item.periodo)
          const definitiva = parseFloat(item.definitiva || 0)
          const recuperacion = parseFloat(item.recuperacion || 0)
          const notaFinal = Math.max(definitiva, recuperacion)
          const detalle = {
            periodo,
            notaFinal,
            definitiva,
            recuperacion,
            definitivacompor: parseFloat(item.definitivacompor || 0),
            definitivapree: parseFloat(item.definitivapree || 0),
            ausJ: parseInt(item.ausJ || 0),
            ausS: parseInt(item.ausS || 0),
            id_tipo: item.id_tipo,
            orden: item.orden
          }
          if (!estructura[nombre]) {
            estructura[nombre] = { nombre, notas: {} }
          }
          if (!estructura[nombre].notas[area]) {
            estructura[nombre].notas[area] = {}
          }
          if (!estructura[nombre].notas[area][asignatura]) {
            estructura[nombre].notas[area][asignatura] = []
          }
          estructura[nombre].notas[area][asignatura][periodo - 1] = detalle
        })
        return Object.values(estructura)
      },
      obtenerNota(est, columna) {
        const bloque = est.notas && est.notas[columna.area] &&
                      est.notas[columna.area][columna.asignatura]
        const periodo = bloque && bloque[columna.periodo - 1]

        if (periodo && typeof periodo.notaFinal === 'number') {
          return periodo.notaFinal.toFixed(2)
        }
        return '-'
      },
      /*
      obtenerCelda(est, encabezado) {
        const notas = est.notas?.[encabezado.area]?.[encabezado.asignatura]
        if (!Array.isArray(notas)) return "-"
        return notas[encabezado.periodo - 1]?.notaFinal > 0 ? (notas[encabezado.periodo - 1]?.notaFinal).toFixed(1) : ""
      },
      */
      calcularPromedioGeneral(area, asignatura, periodo) {
        let suma = 0
        let count = 0
        this.estudiantes.forEach(est => {
          const nota = est.notas?.[area]?.[asignatura]?.[periodo - 1]
          if (typeof nota === 'number') {
            suma += nota
            count++
          }
        })
        return count ? this.redondear(suma / count) : "-"
      },
      calcularPromedioAsignatura(area, asignatura) {
        let suma = 0
        let count = 0
        this.estudiantes.forEach(est => {
          const notas = est.notas?.[area]?.[asignatura]
          if (Array.isArray(notas)) {
            notas.forEach(nota => {
              if (typeof nota === 'number') {
                suma += nota
                count++
              }
            })
          }
        })
        return count ? this.redondear(suma / count) : "-"
      },
      imprimir() {
        let fecha = 'Fecha: ' + new Date().toLocaleString()
        let tituloInforme = 'CONSOLIDADO DE EVALUACIONES ACUMULADO'
        const contenido = document.querySelector('table').outerHTML
        const ventana = window.open("Consolidados", "_blank")
        ventana.document.write(`<html><head><title>Imprimir</title></head>
          <body class="container">
            <p style="text-align: center; font-size: 12px;">SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA<br><b>${this.$store.state.nombreInstitucion}</b><br>TUNJA - BOYACÁ<br>${tituloInforme}<br>Sede: ${this.nombreSede} | Curso: ${this.nombreCurso} | Año Lectivo ${this.$store.state.aLectivo} | Periodo: ${this.idPeriodo}</p>
            ${contenido}
            <div style="text-align: right;"><i>${fecha}</i></div>
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
      areas() {
        // Obtener todas las áreas únicas y sus asignaturas
        const mapa = {};
        this.estudiantes.forEach(est => {
          Object.entries(est.notas).forEach(([area, asignaturas]) => {
            if (!mapa[area]) mapa[area] = new Set();
            Object.keys(asignaturas).forEach(asig => mapa[area].add(asig));
          });
        });
        return Object.entries(mapa).map(([area, asignaturas]) => ({
          nombre: area,
          asignaturas: [...asignaturas]
        }));
      },
      encabezadosPeriodosConPromedio() {
        return this.encabezadosPlanos.flatMap(item =>
          Array.from({ length: 5 }, (_, i) => ({
            ...item,
            tipo: i < 4 ? 'P' : 'Prom',
            periodo: i + 1
          }))
        )
      },
      encabezadosPlanos() {
        const resultado = [];
        this.areas.forEach(area => {
          area.asignaturas.forEach(asig => {
            resultado.push({
              area: area.nombre,
              asignatura: asig
            });
          });
        });
        return resultado;
      },
      encabezadosPeriodos() {
        return this.encabezadosPlanos.flatMap(item =>
          Array.from({ length: 4 }, (_, i) => ({
            ...item,
            periodo: i + 1
          }))
        );
      },

      columnasPorAsignatura() {
        const columnas = []
        this.areas.forEach(area => {
          area.asignaturas.forEach(asig => {
            for (let i = 1; i <= 4; i++) {
              columnas.push({
                area: area.nombre,
                asignatura: asig,
                tipo: 'Periodo',
                periodo: i
              })
            }
            columnas.push({
              area: area.nombre,
              asignatura: asig,
              tipo: 'Promedio'
            })
          })
        })
        return columnas
      },
      columnasAsignaturas() {
        return this.areas.flatMap(area =>
          area.asignaturas.map(asig => ({
            area: area.nombre,
            asignatura: asig
          }))
        )
      },
      columnasPeriodos() {
        const columnas = []
        this.areas.forEach(area => {
          area.asignaturas.forEach(asig => {
            for (let i = 1; i <= 4; i++) {
              columnas.push({
                area: area.nombre,
                asignatura: asig,
                periodo: i
              })
            }
          })
        })
        return columnas
      },
      columnasTotales() {
        const columnas = []
        this.areas.forEach(area => {
          area.asignaturas.forEach(asig => {
            for (let i = 1; i <= 4; i++) {
              columnas.push({
                area: area.nombre,
                asignatura: asig,
                tipo: 'Periodo',
                periodo: i
              })
            }
            columnas.push({
              area: area.nombre,
              asignatura: asig,
              tipo: 'PromedioAsignatura'
            })
          })
          columnas.push({
            area: area.nombre,
            tipo: 'PromedioArea'
          })
        })
        columnas.push({ tipo: 'PromedioGeneral' })
        return columnas
      }
    },
    beforeMount() {
      this.ocuparComboSedes()
      this.ocuparComboPeriodos()
    }
  }
</script>
<style scoped>
  table {
    border-collapse: collapse;
    width: 100%;
    text-align: center;
  }
  th {
    background: #eee;
  }
</style>
