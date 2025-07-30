<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> RESUMEN DE DESEMPEÑOS POR AREA Y CURSO</h5>
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
        <table class="tabla-desempeno table-responsive" border="1" cellspacing="0" cellpadding="1">
          <thead>
            <tr>
              <th rowspan="2">Área</th>
              <th colspan="2">😟 Bajo</th>
              <th colspan="2">😐 Básico</th>
              <th colspan="2">🙂 Alto</th>
              <th colspan="2">🌟 Superior</th>
            </tr>
            <tr>
              <th>Cant</th><th>%</th>
              <th>Cant</th><th>%</th>
              <th>Cant</th><th>%</th>
              <th>Cant</th><th>%</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(fila,i) in resumenDesempenoPorArea" :key="fila.area">
              <td style="text-align: left;">{{ fila.area }}</td>
              <template v-for="(item,j) in fila.resumen">
                <td :key="'cant' + i + '-' + j">{{ item.cantidad }}</td>
                <td :key="'porc' + i + '-' + j">{{ item.porcentaje }}%</td>
              </template>
            </tr>
            <tr class="fila-totales">
              <td style="text-align: left;"><strong>Totales: {{ nombreCurso }}</strong></td>
              <template v-for="(item,i) in totalesDesempeno">
                <td :key="'canti' + item + i"><strong>{{ item.cantidad }}</strong></td>
                <td :key="'total' + item + i"><strong>{{ item.porcentaje }}%</strong></td>
              </template>
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
        dataConsultada: [],
        datosSeccion: {},
        listaAreasAsignaturas: [],
        listaEstudiantes: [],
      }
    },
    methods: {
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
          /*
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
          */
          this.listaEstudiantes = []
          await axios
          .get(CONFIG.ROOT_PATH + 'consolidado/listaestudiantes/curso', { params: { idCurso: this.idCurso }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Lista Curso')
            } else{
              if (response.data.datos != 0) {
                this.listaEstudiantes = response.data.datos
              }
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Lista Curso. Intente más tarde.' + err)
          })
          this.dataConsultada = []
          await axios
          .get(CONFIG.ROOT_PATH + 'consolidados/notasdesempenoarea/curso/periodo', {params: {idCurso: this.idCurso, periodo: this.idPeriodo}})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consolidados notas curso periodo')
              this.btnCargando = false
            } else{
              if (response.data.datos != 0) {
                this.dataConsultada = response.data.datos
              }
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consolidados notas curso periodo. Intente más tarde.' + err)
            this.btnCargando = false
          })
        }
        //console.log(JSON.stringify(this.listaAreasAsignaturas))
        this.btnCargando = false
      },
      imprimir() {
        let fecha = 'Fecha: ' + new Date().toLocaleString()
        let tituloInforme = 'RESUMEN DE DESEMPEÑOS POR AREA Y CURSO'
        const contenido = document.querySelector('table').outerHTML
        const ventana = window.open("Desempeño Area", "_blank")
        ventana.document.write(`<html><head><title>Desempeño Area</title></head>
        <style scoped>
          .tabla-desempeno {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
          }
          .tabla-desempeno th, .tabla-desempeno td {
            border: 1px solid #ccc;
            padding: 4px;
            text-align: center;
          }
          .tabla-desempeno thead {
            background-color: #f0f0f0;
          }
          .fila-totales {
            background-color: #f0f0f0;
            font-weight: bold;
          }
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
      resumenDesempenoPorArea() {
        const conteo = {} // agrupación final por área
        const totalPorArea = {} // conteo total por área
        this.listaEstudiantes.forEach(est => {
          const registros = this.dataConsultada.filter(dc => dc.idMatricula === est.idMatricula && dc.orden !== 98 && dc.orden !== 99)
          const agrupadas = {}
          registros.forEach(dc => {
            const area = dc.nombreArea
            if (!agrupadas[area]) agrupadas[area] = []
            agrupadas[area].push(dc)
          })
          Object.entries(agrupadas).forEach(([area, asignaturas]) => {
            let suma = 0
            let totalPorcentaje = 0
            const tipo = parseInt(asignaturas[0].idTipoEspecialidad)
            asignaturas.forEach(asig => {
              const def = parseFloat(asig.definitiva) || 0
              const rec = parseFloat(asig.recuperacion)
              const final = !isNaN(rec) && rec > def ? rec : def
              const peso = parseFloat(asig.porcentaje) || 0
              suma += final * peso
              totalPorcentaje += peso
            })
            if (totalPorcentaje === 0) return
            const promedio = suma / totalPorcentaje
            let nivel = ''
            if (tipo === 1) {
              nivel = promedio < this.datosSeccion.minBas ? 'BAJO'
                  : promedio < this.datosSeccion.minAlt ? 'BÁSICO'
                  : promedio < this.datosSeccion.minSup ? 'ALTO'
                  : 'SUPERIOR'
            } else if (tipo === 2) {
              nivel = promedio < this.datosSeccion.minBasT ? 'BAJO'
                  : promedio < this.datosSeccion.minAltT ? 'BÁSICO'
                  : promedio < this.datosSeccion.minSupT ? 'ALTO'
                  : 'SUPERIOR'
            } else return
            if (!conteo[area]) {
              conteo[area] = { BAJO: 0, BÁSICO: 0, ALTO: 0, SUPERIOR: 0 }
              totalPorArea[area] = 0
            }
            conteo[area][nivel]++
            totalPorArea[area]++
          })
        })
        // Formato final por área
        return Object.entries(conteo).map(([area, datos]) => {
          const total = totalPorArea[area]
          return {
            area,
            resumen: ['BAJO', 'BÁSICO', 'ALTO', 'SUPERIOR'].map(nivel => ({
              nivel,
              cantidad: datos[nivel],
              porcentaje: total ? ((datos[nivel] / total) * 100).toFixed(1) : '0.0'
            }))
          }
        })
      },
      totalesDesempeno() {
        const resumen = this.resumenDesempenoPorArea
        const acumulado = { BAJO: 0, BÁSICO: 0, ALTO: 0, SUPERIOR: 0 }
        let totalGlobal = 0
        resumen.forEach(area => {
          area.resumen.forEach(r => {
            acumulado[r.nivel] += r.cantidad
            totalGlobal += r.cantidad
          })
        })
        return ['BAJO', 'BÁSICO', 'ALTO', 'SUPERIOR'].map(nivel => ({
          nivel,
          cantidad: acumulado[nivel],
          porcentaje: totalGlobal ? ((acumulado[nivel] / totalGlobal) * 100).toFixed(1) : '0.0'
        }))
      }
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
  .tabla-desempeno {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  .tabla-desempeno th, .tabla-desempeno td {
    border: 1px solid #ccc;
    padding: 4px;
    text-align: center;
  }
  .tabla-desempeno thead {
    background-color: #f0f0f0;
  }
  .fila-totales {
    background-color: #f0f0f0;
    font-weight: bold;
  }
</style>
