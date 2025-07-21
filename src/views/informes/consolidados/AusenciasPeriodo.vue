<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> CONSOLIDADO AUSENCIAS</h5>
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
        <table border="1" cellspacing="0" cellpadding="1" class="tabla-ausencias">
          <thead>
            <tr>
              <th rowspan="3">#</th>
              <th rowspan="3">Estudiante</th>
              <template v-for="(asig,i) in asignaturasValidas">
                <th :colspan="periodos.length * 2" :key="'head-' + i">{{ asig.asignatura }}</th>
              </template>
              <th rowspan="3">TJ</th>
              <th rowspan="3">TS</th>
              <th rowspan="3">#</th>
            </tr>
            <tr>
              <template v-for="(asig,i) in asignaturasValidas">
                <template v-for="p in periodos">
                  <th colspan="2" :key="'p-' + i + '-' + p">{{ p }}</th>
                </template>
              </template>
            </tr>
            <tr>
              <template v-for="(asig,i) in asignaturasValidas">
                <template v-for="p in periodos">
                  <th :key="'tipoJ-' + i + '-' + p">J</th>
                  <th :key="'tipoS-' + i + '-' + p">S</th>
                </template>
              </template>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(est,cont) in consolidadoAusencias" :key="est.estudiante">
              <td>{{ cont + 1 }}</td>
              <td style="text-align: left">{{ est.estudiante }}</td>
              <template v-for="(asig,i) in asignaturasValidas">
                <template v-for="p in periodos">
                  <td :key="i + 'J-' + est.estudiante + asig.asignatura + p">{{ getAusencia(est, asig, p, 'ausJ') }}</td>
                  <td :key="i + 'S-' + est.estudiante + asig.asignatura + p">{{ getAusencia(est, asig, p, 'ausS') }}</td>
                </template>
              </template>
              <td><strong>{{ est.totalAusJ }}</strong></td>
              <td><strong>{{ est.totalAusS }}</strong></td>
              <td>{{ cont + 1 }}</td>
            </tr>
            <tr style="background-color: #f0f0f0; font-weight: bold;">
              <td colspan="2"><strong>Totales</strong></td>
              <template v-for="(asig,i) in asignaturasValidas">
                <template v-for="p in periodos">
                  <td :key="i + 'J-' + asig.asignatura + p">{{ getAusenciaTotal(asig, p, 'ausJ') }}</td>
                  <td :key="i + 'S-' + asig.asignatura + p">{{ getAusenciaTotal(asig, p, 'ausS') }}</td>
                </template>
              </template>
              <td>{{ getTotalGeneral('totalAusJ') }}</td>
              <td>{{ getTotalGeneral('totalAusS') }}</td>
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
    name: 'ausencias',
    props: {
    },
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
        ausencias: [],
      }
    },
    methods: {
      getTotalGeneral(tipo) {
        return this.consolidadoAusencias.reduce((t, e) => t + (parseInt(e[tipo]) || 0), 0)
      },
      getAusenciaTotal(asignatura, periodo, tipo) {
        const clave = asignatura?.asignatura || asignatura
        const suma = this.consolidadoAusencias.reduce((total, est) => {
          const valor = est.asignaturas?.[clave]?.[periodo]?.[tipo]
          return total + (parseInt(valor) || 0)
        }, 0)
        return suma
      },
      getAusencia(est, asig, periodo, tipo) {
        try {
          return est.asignaturas?.[asig.asignatura]?.[periodo]?.[tipo] || ''
        } catch (e) {
          return ''
        }
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
          this.dataConsultada = []
          await axios
          .get(CONFIG.ROOT_PATH + 'consolidados/ausencias/curso/periodo', {params: {idCurso: this.idCurso, periodo: this.idPeriodo}})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consolidados ausencias curso periodo')
              this.btnCargando = false
            } else{
              if (response.data.datos != 0) {
                this.dataConsultada = response.data.datos
              }
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consolidados ausencias curso periodo. Intente más tarde.' + err)
            this.btnCargando = false
          })
        }
        //console.log(JSON.stringify(this.listaEstudiantes))
        //console.log(JSON.stringify(this.listaAreasAsignaturas))
        //console.log(JSON.stringify(this.dataConsultada))
        this.btnCargando = false
      },
      imprimir() {
        let fecha = 'Fecha: ' + new Date().toLocaleString()
        let tituloInforme = 'CONSOLIDADO DE AUSENCIAS'
        const contenido = document.querySelector('table').outerHTML
        const ventana = window.open("Ausencias", "_blank")
        ventana.document.write(`<html><head><title>Ausencias</title></head>
        <style scoped>
          .tabla-ausencias {
              border-collapse: collapse;
              width: 100%;
              text-align: center;
              font-size: 10px;
          }
          .tabla-ausencias th {
            background: #eee;
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
        XLSX.writeFile(wb, 'ausencias.xlsx')
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
      totalesPorColumna() {
        const resumen = {}
        this.asignaturasValidas.forEach(asig => {
          const clave = asig.asignatura
          resumen[clave] = {}
          this.periodos.forEach(p => {
            let sumaJ = 0, sumaS = 0
            this.consolidadoAusencias.forEach(est => {
              sumaJ += est.asignaturas?.[clave]?.[p]?.ausJ || 0
              sumaS += est.asignaturas?.[clave]?.[p]?.ausS || 0
            })
            resumen[clave][p] = { ausJ: sumaJ, ausS: sumaS }
          })
        })
        return resumen
      },
      periodos() {
        return Array.from({ length: this.idPeriodo }, (_, i) => `P${i + 1}`)
      },
      asignaturasValidas() {
        return this.listaAreasAsignaturas.filter(a => a.orden !== 99)
      },
      consolidadoAusencias() {
        return this.listaEstudiantes.map(est => {
          const fila = {
            estudiante: est.estudiante,
            asignaturas: {},
            totalAusJ: 0,
            totalAusS: 0
          }
          this.asignaturasValidas.forEach(asig => {
            const clave = asig.asignatura
            fila.asignaturas[clave] = {}
            this.periodos.forEach(p => {
              const registro = this.dataConsultada.find(dc =>
                dc.idMatricula === est.idMatricula &&
                dc.asignatura === clave &&
                dc.periodo === parseInt(p.slice(1)) // convertir 'P1' → 1
              )
              const ausJ = registro?.ausJ || 0
              const ausS = registro?.ausS || 0
              fila.asignaturas[clave][p] = { ausJ, ausS }
              fila.totalAusJ += ausJ
              fila.totalAusS += ausS
            })
          })
          return fila
        })
      }
    },
    beforeMount() {
      this.ocuparComboSedes()
      this.ocuparComboPeriodos()
      this.datosSeccion = this.$store.state.datosSecciones[this.$store.state.idSeccion - 1]
    }
  }
</script>
<style scoped>
  .tabla-ausencias {
      border-collapse: collapse;
      width: 100%;
      text-align: center;
      font-size: 10px;
  }
  .tabla-ausencias th {
    background: #eee;
  }
</style>
