<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> RESUMEN DE PROMOCIÓN DEFINITIVO POR AREAS</h5>
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
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idCurso=null,ocuparComboCursosSede()"></b-form-select>
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
              <th>#</th>
              <th>Estudiante</th>
              <!--
              <template v-for="(asigs, area) in encabezadoPorArea">
                <th :colspan="colspanArea(area)" :key="area">
                  {{ area }}
                </th>
              </template>
              -->
              <th>Estado Final Promoción</th>
              <!--
              <th rowspan="3">PRO GEN</th>
              <th rowspan="3">Tot<br>Area<br>Baj</th>
              <th rowspan="3">Tot<br>Area<br>Bas</th>
              <th rowspan="3">Tot<br>Area<br>Alt</th>
              <th rowspan="3">Tot<br>Area<br>Sup</th>
              <th rowspan="3">Tot<br>AuJ</th>
              <th rowspan="3">Tot<br>AuS</th>
              <th rowspan="3">Puesto</th>
              -->
              <th>#</th>
            </tr>
            <!--
            <tr>
              <template v-for="(asigs, area) in encabezadoPorArea">
                <template v-for="(asig, k) in asigs">
                  <th :colspan="periodosVisibles.length + 1" :key="'area-' + asig + k">
                    {{ asig }}
                  </th>
                </template>
                <th class="promedio-area" :key="'prom-area-' + area">PRO AR</th>
              </template>
            </tr>
            <tr>
              <template v-for="(asigs, area) in encabezadoPorArea">
                <template v-for="asig in asigs">
                  <th v-for="p in periodosVisibles" :key="'h' + area + asig + p">
                    P{{ p }}
                  </th>
                  <th :key="'prom' + asig + area">PR</th>
                </template>
                <th :key="'prom' + area"></th>
              </template>
            </tr>
            -->
          </thead>
          <tbody>
            <tr v-for="(est, nombre, i) in estudiantesNotas" :key="nombre">
              <td class="text-left">{{ i + 1 }}</td>
              <td style="text-align: left">{{ nombre }}</td>
              <!--
              <template v-for="(asigs, area) in encabezadoPorArea">
                <template v-for="asig in asigs">
                  <td v-for="p in periodosVisibles"  :key="nombre + area + asig + p">
                    {{ est.id_conceptual=='N' ? obtenerNota(est, area, asig, p) : '-' }}
                  </td>
                  <td class="bloque-area" :key="'prom' + nombre + area + asig" style="font-weight: bold; text-align: center;">
                    {{ est.id_conceptual=='N' ? obtenerPromedioAsignatura(est, area, asig) : '-' }}
                  </td>
                </template>
                <td class="promedio-area bloque-area" :key="'promArea' + nombre + area">
                  {{ est.id_conceptual=='N' ? obtenerPromedioArea(est, area) : '-' }}
                </td>
              </template>
              -->
              <td style="text-align: left">{{ est.id_conceptual=='N' ? mostrarEstadoPromocion(est.obs_comision,contarDesempenoEstudianteArea(est, 'bajo'),est.idMatricula) : '-' }}</td>
              <!--
              <td>{{ est.id_conceptual=='N' ? calcularPromedioGeneral(est) : '-' }}</td>
              <td>{{ est.id_conceptual=='N' ? contarDesempenoEstudianteArea(est, 'bajo') : '-' }}</td>
              <td>{{ est.id_conceptual=='N' ? contarDesempenoEstudianteArea(est, 'basico') : '-' }}</td>
              <td>{{ est.id_conceptual=='N' ? contarDesempenoEstudianteArea(est, 'alto') : '-' }}</td>
              <td>{{ est.id_conceptual=='N' ? contarDesempenoEstudianteArea(est, 'superior') : '-' }}</td>
              <td>{{ est.id_conceptual=='N' ? est.ausJ : '-' }}</td>
              <td>{{ est.id_conceptual=='N' ? est.ausS : '-' }}</td>
              <td>{{ est.id_conceptual=='N' ? iconoPuesto(puestosPorEstudiante[nombre]) : '-' }} {{ est.id_conceptual=='N' ? puestosPorEstudiante[nombre] : '-' }}</td>
              -->
              <td class="text-left">{{ i + 1 }}</td>
            </tr>
            <!--
            <tr style="background-color: #f0f0f0; font-weight: bold;">
              <td colspan="2">Total Bajos</td>
              <template v-for="(asigs, area) in encabezadoPorArea">
                <template v-for="asig in asigs">
                  <td v-for="p in periodosVisibles" :key="'bp' + area + asig + p">
                    {{ totalBajosPorPeriodo(area, asig, p) }}
                  </td>
                  <td :key="'bj' + area + asig">
                    {{ totalBajosPromedioAsignatura(area, asig) }}
                  </td>
                </template>
                <td  :key="'bja' + area" class="promedio-area">
                  {{ totalBajosPromedioArea(area) }}
                </td>
              </template>
              <td></td>
              <td></td>
              <td>{{ totales.bajo }}</td>
              <td>{{ totales.basico }}</td>
              <td>{{ totales.alto }}</td>
              <td>{{ totales.superior }}</td>
              <td>{{ totales.ausJ }}</td>
              <td>{{ totales.ausS }}</td>
              <td></td>
              <td></td>
            </tr>
            -->
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
import AreasPerdidasVue from './AreasPerdidas.vue'

  export default {
    name: 'resumenpromocionareas',
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
        periodosVisibles: [],
        listaHabilitaciones: [],
      }
    },
    methods: {
      mostrarEstadoPromocion(obs_comision,areasPerdidas,idMatricula) {
        let perdioHabilitacion = 0
        let contHabilitaciones = 0
        const meta = this.listaHabilitaciones.filter(h => h.id_matricula === idMatricula)
        meta.forEach(element => {
          if (element.habilitacion < 3) perdioHabilitacion++
          contHabilitaciones++
        })
        if ( this.$store.state.idInstitucion == 'f5529ba0-fcb3-11ec-8267-536b07c743c4') { // GUSTAVO ROJAS
          if (obs_comision === null || obs_comision === '') {
            if (perdioHabilitacion > 0) return 'REPROBADO' // reprobo por perdida de habilitacion
            if (areasPerdidas == 0) {
              return contHabilitaciones == 0 ? 'APROBÓ EL GRADO' : 'PROMOVIDO'
            } else {
              return 'REPROBADO'
            }
          } else {
            return 'PROMOVIDO POR COMISIÓN DE EVALUACIÓN'
          }
        } else if ( this.$store.state.idInstitucion == '17ee4f30-fc80-11ec-a1d1-1dc2835404e5') { // ENSLAP
          if (this.$store.state.idSeccion == 1) {
            if (areasPerdidas == 0) {
              return 'APROBÓ EL GRADO'
            } else {
              return 'REPROBADO'
            }
          } else {
            if (areasPerdidas == 0) {
              return 'APROBÓ EL SEMESTRE'
            } else {
              return 'REPROBÓ EL SEMESTRE'
            }
          }
        } else if ( this.$store.state.idInstitucion == 'f0491770-fca8-11ec-8267-536b07c743c4') { // GONZALO
          if (areasPerdidas == 0) {
            return 'APROBÓ EL GRADO'
          } else {
            return 'REPROBADO'
          }
        } else {
          if (areasPerdidas == 0) {
            return 'APROBÓ EL GRADO'
          } else {
            return 'REPROBADO'
          }
        }
      },
      colspanArea(area) {
        const asignaturas = this.encabezadoPorArea[area] || []
        const columnasPorAsignatura = this.periodosVisibles.length + 1
        const extraColumnaPromArea = 1
        return (asignaturas.length * columnasPorAsignatura) + extraColumnaPromArea
      },

      totalBajosPorPeriodo(area, asignatura, periodo) {
        let total = 0
        const meta = this.listaAreasAsignaturas.find(
          a => a.area === area && a.asignatura === asignatura
        )
        const idTipoEspecialidad = meta?.idTipoEspecialidad
        Object.values(this.estudiantesNotas).forEach(est => {
          const nota = est?.areas?.[area]?.asignaturas?.[asignatura]?.periodos?.[periodo]
          if (idTipoEspecialidad === 1) {
            if (nota > 0 && nota < this.datosSeccion.minBas) total++
          } else {
            if (nota > 0 && nota < this.datosSeccion.minBasT) total++
          }
        })
        return total
      },
      totalBajosPromedioAsignatura(area, asignatura) {
        let total = 0
        const meta = this.listaAreasAsignaturas.find(
          a => a.area === area && a.asignatura === asignatura
        )
        const idTipoEspecialidad = meta?.idTipoEspecialidad
        Object.values(this.estudiantesNotas).forEach(est => {
          const asig = est?.areas?.[area]?.asignaturas?.[asignatura]
          if (!asig) return
          const prom = parseFloat(this.calcularPromedioAsignatura(asig))
          if (idTipoEspecialidad === 1) {
            if (prom < this.datosSeccion.minBas) total++
          } else {
            if (prom < this.datosSeccion.minBasT) total++
          }
        })
        return total
      },
      totalBajosPromedioArea(area) {
        let total = 0
        Object.values(this.estudiantesNotas).forEach(est => {
          const prom = parseFloat(this.obtenerPromedioArea(est, area))
          if (!isNaN(prom) && prom < this.datosSeccion.minBas) total++
        })
        return total
      },
      totalesGlobales() {
        let bajo = 0, basico = 0, alto = 0, superior = 0, ausJ = 0, ausS = 0
        Object.values(this.estudiantesNotas).forEach(est => {
          bajo += this.contarDesempenoEstudianteArea(est, 'bajo')
          basico += this.contarDesempenoEstudianteArea(est, 'basico')
          alto += this.contarDesempenoEstudianteArea(est, 'alto')
          superior += this.contarDesempenoEstudianteArea(est, 'superior')
          ausJ += est.ausJ || 0
          ausS += est.ausS || 0
        })

        return { bajo, basico, alto, superior, ausJ, ausS }
      },
      esAreaValida(area) {
        //const asigns = this.listaAreasAsignaturas.filter(a => a.area === area)
        //return asigns.some(a => a.orden !== 99)
        const asigns = this.listaAreasAsignaturas.filter(a => a.area === area)
        if (asigns.some(a => a.orden !== 99 && a.orden !== 98)) return true
        else if (asigns.some(a => a.orden === 99) && this.datosSeccion.promCompor == 1) return true
        else return false
      },
      obtenerPromedioArea(est, area) {
        const areaData = est.areas && est.areas[area]
        return areaData ? this.calcularPromedioArea(areaData) : ''
      },
      obtenerNota(est, area, asignatura, periodo) {
        let nota = est?.areas?.[area]?.asignaturas?.[asignatura]?.periodos?.[periodo]
        if (nota === 0) nota = ''
        return typeof nota === 'number' ? nota.toFixed(1) : nota
      },
      obtenerPromedioAsignatura(est, area, asignatura) {
        const asig = est?.areas?.[area]?.asignaturas?.[asignatura]
        return asig ? this.calcularPromedioAsignatura(asig) : ''
      },
      calcularPromedioAsignatura(asig) {
        const pesos = asig.pesos
        const periodos = asig.periodos
        const orden = asig.orden
        if (orden === 99 && this.datosSeccion.promCompor == 0) return '-'
        let total = 0
        if (this.$store.state.idInstitucion == 'acaa36d0-fcb1-11ec-8267-536b07c743c4') { // Emiliani
          if( orden == 12) {
            let cantidad = 0 
            for (let p = 1; p <= 4; p++) {
              const nota = periodos[p] ?? 0
              if (nota > 0) {
                total += nota
                cantidad++
              }
            }
            if (total === 0) return ''
            total = total / cantidad
            return this.redondear(total).toFixed(1) > 0 ? this.redondear(total).toFixed(1) : ''
          } else {
            for (let p = 1; p <= 4; p++) {
              const nota = periodos[p] ?? 0
              total += nota * pesos[p] / 100
            }
            return this.redondear(total).toFixed(1) > 0 ? this.redondear(total).toFixed(1) : ''
          }
        } else if (this.$store.state.idInstitucion == 'eb58bf60-fc83-11ec-a1d1-1dc2835404e5') { // Inem
          if (orden == 55) {
            let cantidad = 0 // nuevo
            for (let p = 1; p <= 4; p++) {
              const nota = periodos[p] ?? 0
              if (nota > 0) {
                total += nota
                cantidad++
              }
            }
            if (total === 0) return ''
            total = total / cantidad
            return this.redondear(total).toFixed(1) > 0 ? this.redondear(total).toFixed(1) : ''
          } else {
            for (let p = 1; p <= 4; p++) {
              const nota = periodos[p] ?? 0
              total += nota * pesos[p] / 100
            }
            return this.redondear(total).toFixed(1) > 0 ? this.redondear(total).toFixed(1) : ''
          }
        } else if (this.$store.state.idInstitucion == 'c50f3d80-fca0-11ec-8267-536b07c743c4') { // Silvino
          const nota = periodos[5] ?? 0
          return nota > 0 ? nota.toFixed(1) : ''
        } else if (this.$store.state.idInstitucion == '8a1bd1e0-fcb2-11ec-8267-536b07c743c4') { // Libertador
          const nota = periodos[5] ?? 0
          return nota > 0 ? nota.toFixed(1) : ''
        } else if (this.$store.state.idInstitucion == '17ee4f30-fc80-11ec-a1d1-1dc2835404e5') { // Enslap
          let cantidad = 0 
          for (let p = 1; p <= 4; p++) {
            const nota = asig.periodos[p] ?? 0
            if (nota > 0) {
              total += nota
              cantidad++
            }
          }
          if (total === 0) return ''
          const promedio = this.$store.state.idSeccion == 1 ? total / 4 : total
          return this.redondear(promedio).toFixed(1) > 0 ? this.redondear(promedio).toFixed(1) : ''
        } else if (this.$store.state.idInstitucion == '7c63ed50-fcb0-11ec-8267-536b07c743c4') { // Santiago
          let cantidad = 0 
          for (let p = 1; p <= 4; p++) {
            const nota = asig.periodos[p] ?? 0
            if (nota > 0) {
              total += nota
              cantidad++
            }
          }
          if (total === 0) return ''
          const promedio = total / cantidad
          return this.redondear(promedio).toFixed(1) > 0 ? this.redondear(promedio).toFixed(1) : ''
        } else {
          let cantidad = 0 
          for (let p = 1; p <= 4; p++) {
            const nota = periodos[p] ?? 0
            if (nota > 0) {
              total += nota
              cantidad++
            }
          }
          if (total === 0) return ''
          const promedio = total / cantidad
          return this.redondear(promedio).toFixed(1) > 0 ? this.redondear(promedio).toFixed(1) : ''
        }
      },
      calcularPromedioArea(areaData) {
        const asigns = Object.values(areaData.asignaturas)
        if (!asigns.length) return '0.00'
        let total = 0
        asigns.forEach(asig => {
          //console.log(asig)
          if (asig.orden === 99 && this.datosSeccion.promCompor == 0) return '-'
          const idAsignaturaCurso = asig.idAsignaturaCurso
          const idMatricula = asig.idMatricula
          const habilit = this.mostrarHabilitacion(idMatricula,idAsignaturaCurso)
          const promAsigna = parseFloat((this.calcularPromedioAsignatura(asig) * asig.porcentaje) / 100)
          const valorSumar = habilit.habilitacion > promAsigna ? habilit.habilitacion : promAsigna
          total += valorSumar //parseFloat((this.calcularPromedioAsignatura(asig) * asig.porcentaje) / 100)
          /*
          const ausJArea = asig.orden == 98 || asig.orden == 99 ? '' : ausJ > 0 ? ausJ : ''
          const ihArea = asig.ih
          const minPierdeFallas = (ihArea * 40 * .2) + 1
          if ((this.orden !== 99) && (ausSArea >= minPierdeFallas)) this.perdioPorFallas = 1
          */
        })
        return total > 0 ? this.redondear(total).toFixed(1) : ''
      },
      contarDesempenoEstudianteArea(est, tipo) {
        const areas = Object.keys(est.areas || {})
        let contador = 0
        areas.forEach(area => {
          if (!this.esAreaValida(area)) return
          const meta = this.listaAreasAsignaturas.find( a => a.area === area)
          const idTipoEspecialidadArea = meta?.idTipoArea
          const promedio = parseFloat(this.calcularPromedioArea(est.areas[area]))
          if (!isNaN(promedio)) {
            if (idTipoEspecialidadArea === 1) {
              if (tipo === 'bajo' && promedio < this.datosSeccion.minBas) contador++
              else if (tipo === 'basico' && promedio >= this.datosSeccion.minBas && promedio < this.datosSeccion.minAlt) contador++
              else if (tipo === 'alto' && promedio >= this.datosSeccion.minAlt && promedio < this.datosSeccion.minSup) contador++
              else if (tipo === 'superior' && promedio >= this.datosSeccion.minSup && promedio <= this.datosSeccion.maxSup) contador++
            } else {
              if (tipo === 'bajo' && promedio < this.datosSeccion.minBasT) contador++
              else if (tipo === 'basico' && promedio >= this.datosSeccion.minBasT && promedio < this.datosSeccion.minAltT) contador++
              else if (tipo === 'alto' && promedio >= this.datosSeccion.minAltT && promedio < this.datosSeccion.minSupT) contador++
              else if (tipo === 'superior' && promedio >= this.datosSeccion.minSupT && promedio <= this.datosSeccion.maxSupT) contador++
            }
          }
        })
        return contador
      },
      calcularPromedioGeneral(est) {
        const areas = Object.keys(est.areas || {})
        let total = 0
        let cantidad = 0
        areas.forEach(area => {
          if (!this.esAreaValida(area)) return
          const promedio = parseFloat(this.calcularPromedioArea(est.areas[area]))
          if (!isNaN(promedio)) {
            total += promedio
            cantidad++
          }
        })
        return cantidad > 0 ? (total / cantidad).toFixed(3) : ''
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
      contarDesempenoEstudiante(areas, tipo) {
        let contador = 0
        Object.values(areas || {}).forEach(area => {
          Object.values(area.asignaturas || {}).forEach(asig => {
            const nota = parseFloat(this.calcularPromedioAsignatura(asig))
            const val =  asig.idTipoEspecialidad
            const orden =  asig.orden
            if (this.$store.state.idInstitucion == 'eb58bf60-fc83-11ec-a1d1-1dc2835404e5' && orden == 90) return // No se tiene en cuenta el area de Inem Exploracion vocacional - Complementaria
            if (this.$store.state.idInstitucion == '097b7b10-fcaa-11ec-8267-536b07c743c4' && orden == 98) return // No se tiene en cuenta el area de Rural Proyectos Profundizacion
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
      claseDesempeno(nota) {
        //console.log(nota)
        if (typeof nota !== 'number') return 'desempeno-extra'
        if (nota < 3) return 'desempeno-bajo'
        if (nota < 4) return 'desempeno-basico'
        if (nota < 4.6) return 'desempeno-alto'
        if (nota <= 5) return 'desempeno-superior'
        return 'desempeno-extra'
      },
      obtenerColorGeneral(nota) {
        if (nota < this.datosSeccion.minBas) return 'desempeno-bajo'
        if (nota < this.datosSeccion.minAlt) return 'desempeno-basico'
        if (nota < this.datosSeccion.minSup) return 'desempeno-alto'
        if (nota <= this.datosSeccion.maxSup) return 'desempeno-superior'
        return 'desempeno-extra'
      },
      mostrarHabilitacion(idMatricula,idAsignaturaCurso) {
        const meta = this.listaHabilitaciones.find(h => h.id_matricula === idMatricula && h.id_asignatura_curso === idAsignaturaCurso)
        if (!(meta === undefined)) {
          const valor = meta.habilitacion > 0 ? meta.habilitacion.toFixed(1) : ''
          const fechita = meta.fecha !== null && meta.fecha !== '' ? meta.fecha.substr(0,10) : ''
          const actica = meta.acta != null ? meta.acta : ''
          return {habilitacion: valor, acta: actica, fecha: fechita }
        } else {
          return {habilitacion: '', acta: '', fecha: ''}
        }
      },
      async consultarHabilitaciones() {
        this.listaHabilitaciones = []
        await axios
        .get(CONFIG.ROOT_PATH + 'boletines/habilitaciones/curso', {params: {vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta habilitacion')
            this.btnCargando = false
          } else{
            if (response.data.datos != 0) {
              this.listaHabilitaciones = response.data.datos
              //console.log(JSON.stringify(response.data.datos))
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta habilitacion. Intente más tarde.' + err)
        })
      },
      async consultarEstudiantes() {
        this.btnCargando = true
        if (this.idPeriodo == 1) this.periodosVisibles = [1]
        if (this.idPeriodo == 2) this.periodosVisibles = [1,2]
        if (this.idPeriodo == 3) this.periodosVisibles = [1,2,3]
        if (this.idPeriodo == 4) this.periodosVisibles = [1,2,3,4]
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
                  if ( this.$store.state.idInstitucion == 'eb58bf60-fc83-11ec-a1d1-1dc2835404e5' ) { //Inem
                    if (element.orden != 99 && element.orden != 90) {
                      this.listaAreasAsignaturas.push(element)
                    }
                  } else if ( this.$store.state.idInstitucion == 'f5529ba0-fcb3-11ec-8267-536b07c743c4' ) { // Gustavo Rojas
                    if (element.orden != 99 && element.orden != 15 && element.orden != 16 && element.orden != 98) {
                      this.listaAreasAsignaturas.push(element)
                    }
                  } else if ( this.$store.state.idInstitucion == '097b7b10-fcaa-11ec-8267-536b07c743c4' ) { // Rural
                    if (element.orden != 99 && element.orden != 98) {
                      this.listaAreasAsignaturas.push(element)
                    }
                  } else if ( this.$store.state.idInstitucion == '54fd7440-fc81-11ec-a1d1-1dc2835404e5' || this.$store.state.idInstitucion == '7c63ed50-fcb0-11ec-8267-536b07c743c4' ) { // Antonio Jose Sandoval, Normal Santiago, 
                    this.listaAreasAsignaturas.push(element)
                  } else {
                    if (element.orden != 99) {
                      this.listaAreasAsignaturas.push(element)
                    }
                  }
                })
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
                //console.log(JSON.stringify(this.datosRaw))
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
        let tituloInforme = 'ESTADOS FINALES DE PROMOCIÓN ESCOLAR'
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
        XLSX.writeFile(wb, 'ConsoldidaFinal.xlsx')
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
      totales() {
        return this.totalesGlobales()
      },
      estudiantesNotas() {
        const mapa = {}
        this.datosRaw.forEach(row => {
          const { obs_comision, id_matricula, idAsignaturaCurso, estudiante, area, asignatura, ih, periodo, definitiva, recuperacion, orden, definitivacompor, definitivapree, idTipoEspecialidad, ausJ, ausS, porcentaje, id_conceptual } = row
          if (!mapa[estudiante]) {
            mapa[estudiante] = { idMatricula: id_matricula, obs_comision, id_conceptual, ausJ: 0, ausS: 0, areas: {} }
          }
          if (!mapa[estudiante].areas[area]) {
            mapa[estudiante].areas[area] = { asignaturas: {} }
          }
          if (!mapa[estudiante].areas[area].asignaturas[asignatura]) {
            mapa[estudiante].areas[area].asignaturas[asignatura] = {
              idMatricula: id_matricula,
              idAsignaturaCurso,
              ih,
              periodos: {},
              orden,
              idTipoEspecialidad,
              porcentaje,
              pesos: { 1: this.datosSeccion.pesoP1, 2: this.datosSeccion.pesoP2, 3: this.datosSeccion.pesoP3, 4: this.datosSeccion.pesoP4 }
            }
          }
          let notaFinal = 0
          if (orden === 99) {
            if (this.datosSeccion.tipoValComp == 1) {
              notaFinal = definitiva
            } else {
              notaFinal = definitivacompor != null ? definitivacompor : ''
            }
          } else {
            if (this.idNivel == 1) {
              notaFinal = definitivapree != null && definitivapree != 0 && definitivapree != '' ? definitivapree : ''
            } else {
              notaFinal = recuperacion > definitiva ? recuperacion : definitiva
            }
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
            contador++
          }
          puestos[est.nombre] = puestoActual
          //contador++
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
      this.consultarHabilitaciones()
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
  .promedio-area {
    background-color: #f2f2f2;
    font-weight: bold;
    text-align: center;
  }
  .bloque-area th,
  .bloque-area td {
    border-right: 3px solid #999; /* línea divisoria entre áreas */
  }

</style>
