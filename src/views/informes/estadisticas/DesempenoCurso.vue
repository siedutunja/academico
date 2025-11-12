<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> RESUMEN DE DESEMPEÑOS POR CURSO</h5>
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
              <th rowspan="2">Asignatura</th>
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
            <tr v-for="asig in conteoPorAsignatura" :key="asig.nombreAsignatura">
              <td style="text-align: left;">{{ asig.nombreAsignatura }}</td>
              <td>{{ asig.bajo.cantidad }}</td><td>{{ asig.bajo.porcentaje + '%' }}</td>
              <td>{{ asig.basico.cantidad }}</td><td>{{ asig.basico.porcentaje + '%' }}</td>
              <td>{{ asig.alto.cantidad }}</td><td>{{ asig.alto.porcentaje + '%' }}</td>
              <td>{{ asig.superior.cantidad }}</td><td>{{ asig.superior.porcentaje + '%' }}</td>
            </tr>
            <tr class="fila-totales">
              <td style="text-align: left;">Totales: {{ nombreCurso }}</td>
              <td><strong>{{ totalesGlobalesDesempenoCurso.bajo.cantidad }}</strong></td>
              <td><strong>{{ totalesGlobalesDesempenoCurso.bajo.porcentaje + '%' }}</strong></td>
              <td><strong>{{ totalesGlobalesDesempenoCurso.basico.cantidad }}</strong></td>
              <td><strong>{{ totalesGlobalesDesempenoCurso.basico.porcentaje + '%' }}</strong></td>
              <td><strong>{{ totalesGlobalesDesempenoCurso.alto.cantidad }}</strong></td>
              <td><strong>{{ totalesGlobalesDesempenoCurso.alto.porcentaje + '%' }}</strong></td>
              <td><strong>{{ totalesGlobalesDesempenoCurso.superior.cantidad }}</strong></td>
              <td><strong>{{ totalesGlobalesDesempenoCurso.superior.porcentaje + '%' }}</strong></td>
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
          .get(CONFIG.ROOT_PATH + 'consolidados/notasdesempeno/curso/periodo', {params: {idCurso: this.idCurso, periodo: this.idPeriodo, vigencia: this.$store.state.aLectivo}})
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
        let tituloInforme = 'RESUMEN DE DESEMPEÑOS POR CURSO'
        const contenido = document.querySelector('table').outerHTML
        const ventana = window.open("Desempeño Curso", "_blank")
        ventana.document.write(`<html><head><title>Desempeño Curso</title></head>
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
        this.$store.state.periodos.forEach(element => {
          this.comboPeriodos.push({ 'value': element.id, 'text': element.periodo.toUpperCase() })
        })
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    computed: {
      totalesGlobalesDesempenoCurso() {
        const suma = { bajo: 0, basico: 0, alto: 0, superior: 0 }

        this.conteoPorAsignatura.forEach(asig => {
          suma.bajo     += parseInt(asig.bajo.cantidad) || 0
          suma.basico   += parseInt(asig.basico.cantidad) || 0
          suma.alto     += parseInt(asig.alto.cantidad) || 0
          suma.superior += parseInt(asig.superior.cantidad) || 0
        })

        const total = suma.bajo + suma.basico + suma.alto + suma.superior

        return {
          bajo: {
            cantidad: suma.bajo,
            porcentaje: total ? ((suma.bajo / total) * 100).toFixed(1) : '0'
          },
          basico: {
            cantidad: suma.basico,
            porcentaje: total ? ((suma.basico / total) * 100).toFixed(1) : '0'
          },
          alto: {
            cantidad: suma.alto,
            porcentaje: total ? ((suma.alto / total) * 100).toFixed(1) : '0'
          },
          superior: {
            cantidad: suma.superior,
            porcentaje: total ? ((suma.superior / total) * 100).toFixed(1) : '0'
          }
        }
      },
      totalesGlobalesDesempeno() {
        return this.conteoPorAsignatura.reduce(
          (acum, asig) => {
            acum.bajo += parseInt(asig.bajo.cantidad) || 0
            acum.basico += parseInt(asig.basico.cantidad) || 0
            acum.alto += parseInt(asig.alto.cantidad) || 0
            acum.superior += parseInt(asig.superior.cantidad) || 0
            return acum
          },
          { bajo: 0, basico: 0, alto: 0, superior: 0 }
        )
      },
      conteoPorAsignatura() {
        return this.listaAreasAsignaturas
          .filter(asig => asig.orden !== 98 && asig.orden !== 99)
          .map(asig => {
            const registros = this.dataConsultada.filter(n =>
              n.asignatura === asig.asignatura &&
              n.area === asig.area &&
              n.periodo === this.idPeriodo
            )
            const reglas = asig.idTipoEspecialidad === 2
              ? { bajo: v => v > 0 && v < this.datosSeccion.minBasT, basico: v => v >= this.datosSeccion.minBasT && v < this.datosSeccion.minAltT, alto: v => v >= this.datosSeccion.minAltT && v < this.datosSeccion.minSupT, superior: v => v >= this.datosSeccion.minSupT && v <= this.datosSeccion.maxSupT }
              : { bajo: v => v > 0 && v < this.datosSeccion.minBas, basico: v => v >= this.datosSeccion.minBas && v < this.datosSeccion.minAlt, alto: v => v >= this.datosSeccion.minAlt && v < this.datosSeccion.minSup, superior: v => v >= this.datosSeccion.minSup && v <= this.datosSeccion.maxSup }
            const totales = { bajo: 0, basico: 0, alto: 0, superior: 0 }
            registros.forEach(n => {
              const base = parseFloat(n.definitiva)
              const recu = parseFloat(n.recuperacion)
              const nota = !isNaN(recu) && recu > base ? recu : base
              if (!isNaN(nota)) {
                if (reglas.bajo(nota)) totales.bajo++
                else if (reglas.basico(nota)) totales.basico++
                else if (reglas.alto(nota)) totales.alto++
                else if (reglas.superior(nota)) totales.superior++
              }
            })
            const totalNotas = Object.values(totales).reduce((a, b) => a + b, 0)
            const porcentajes = {
              bajo: totalNotas ? ((totales.bajo / totalNotas) * 100).toFixed(1) : '0',
              basico: totalNotas ? ((totales.basico / totalNotas) * 100).toFixed(1) : '0',
              alto: totalNotas ? ((totales.alto / totalNotas) * 100).toFixed(1) : '0',
              superior: totalNotas ? ((totales.superior / totalNotas) * 100).toFixed(1) : '0'
            }
            return {
              nombreAsignatura: asig.nombreAsignatura,
              bajo: {
                cantidad: totales.bajo,
                porcentaje: porcentajes.bajo
              },
              basico: {
                cantidad: totales.basico,
                porcentaje: porcentajes.basico
              },
              alto: {
                cantidad: totales.alto,
                porcentaje: porcentajes.alto
              },
              superior: {
                cantidad: totales.superior,
                porcentaje: porcentajes.superior
              }
            }
          })
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
