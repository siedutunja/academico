<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> RENDIMIENTO DE ESTUDIANTES POR GRADO</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="2">
                <b-form-group label="Periodo:" label-for="periodo" class="etiqueta">
                  <b-form-select id="periodo" ref="periodo" v-model="idPeriodo" :options="comboPeriodos" @change="idSede=null,idGrado=null"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idGrado=null,ocuparComboGradosSede()" :disabled="idPeriodo!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="Seleccione el Grado:" label-for="grados" class="etiqueta">
                  <b-form-select id="grados" ref="grados" v-model="idGrado" :options="comboGradosSede" @change="consultarEstudiantes()" :disabled="idSede!=null ? false : true"></b-form-select>
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
    <b-row v-if="!btnCargando && idGrado!=null">
      <b-col lg="12">
        <table border="1" cellspacing="0" cellpadding="1" class="tabla-puestos">
          <thead>
            <tr>
              <th>Puesto</th>
              <th>Estudiante</th>
              <th>Grado-Curso</th>
              <th>Estado</th>
              <th>Promedio</th>
              <th>Medalla</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="est in estudiantesConPromedioOrdenado" :key="est.idMatricula">
              <td style="text-align: left; width: 5%;">{{ est.puesto }}</td>
              <td style="text-align: left">{{ est.estudiante }}</td>
              <td style="text-align: left">{{ est.curso }}</td>
              <td style="text-align: left">{{ est.estado }}</td>
              <td>{{ est.promedioFinal > 0 ? est.promedioFinal.toFixed(3) : '' }}</td>
              <td>{{ est.medalla }}</td>
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
    name: 'puestosestgradoperiodo',
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
        idGrado: null,
        comboGradosSede: [],
        nombreSede: null,
        nombreGrado: null,
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
      promediosPorEstudiante() {
        return this.listaEstudiantes.map(est => {
          const asignaturasDelEstudiante = this.listaAreasAsignaturas.filter(asig =>
            this.dataConsultada.some(dc =>
              dc.idMatricula === est.idMatricula &&
              dc.area === asig.area &&
              dc.asignatura === asig.asignatura &&
              dc.periodo === this.idPeriodo
            )
          )
          const areasDelEstudiante = {}
          asignaturasDelEstudiante.forEach(asig => {
            if (asig.orden === 98 || asig.orden === 99 || asig.porcentaje === 0) return
            if (!areasDelEstudiante[asig.area]) areasDelEstudiante[asig.area] = []
            areasDelEstudiante[asig.area].push(asig)
          })
          const promediosPorArea = Object.entries(areasDelEstudiante).map(([area, asignaturas]) => {
            let suma = 0
            let totalPorcentaje = 0
            //let numero = asignaturas.length
            //let numerito = 0
            asignaturas.forEach(asig => {
              const nota = this.dataConsultada.find(dc => dc.idMatricula === est.idMatricula && dc.asignatura === asig.asignatura && dc.periodo === this.idPeriodo)
              if (nota !== undefined) {
                const base = parseFloat(nota.definitiva)
                const recu = parseFloat(nota.recuperacion)
                const final = !isNaN(recu) && recu > base ? recu : base
                if ((final > 0)) {
                  suma += this.redondear(final * (asig.porcentaje / 100))
                  //totalPorcentaje += asig.porcentaje
                }
              }
              if (suma > 0) totalPorcentaje += asig.porcentaje
            })
            return totalPorcentaje ? this.redondear(this.redondear(suma) / (totalPorcentaje / 100)) : null
          }).filter(p => p !== null)
          const promedioFinal = promediosPorArea.length ? (promediosPorArea.reduce((a, b) => a + b, 0) / promediosPorArea.length).toFixed(3) : null
          return {
            estudiante: est.estudiante,
            idMatricula: est.idMatricula,
            curso: est.curso,
            estado: est.estado,
            promedioFinal: parseFloat(promedioFinal) || null
          }
        })
      },
      async consultarEstudiantes() {
        this.btnCargando = true
        this.nombreSede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
        if (this.idGrado != null) { 
          this.nombreGrado = document.getElementById('grados')[document.getElementById('grados').selectedIndex].text
          this.$store.state.datosGrados.forEach(element => {
            if (element.id == this.idGrado) {
              this.idNivel = element.id_nivel
            }
          })
          this.listaEstudiantes = []
          await axios
          .get(CONFIG.ROOT_PATH + 'consolidado/listaestudiantes/grado', { params: { idGrado: this.idGrado, vigencia: this.$store.state.aLectivo }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Lista Grado')
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
          .get(CONFIG.ROOT_PATH + 'consolidados/areasasignaturas/grado', {params: {idGrado: this.idGrado}})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista areas-asignaturas grado')
              this.btnCargando = false
            } else{
              if (response.data.datos != 0) {
                this.listaAreasAsignaturas = response.data.datos
              }
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista areas-asignaturas grado. Intente más tarde.' + err)
            this.btnCargando = false
          })
          this.dataConsultada = []
          await axios
          .get(CONFIG.ROOT_PATH + 'consolidados/notasdesempeno/grado/periodo', {params: {idGrado: this.idGrado, periodo: this.idPeriodo, vigencia: this.$store.state.aLectivo}})
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
        //console.log(JSON.stringify(this.listaEstudiantes))
        //console.log(JSON.stringify(this.listaAreasAsignaturas))
        //console.log(JSON.stringify(this.dataConsultada))
        this.btnCargando = false
      },
      imprimir() {
        let fecha = 'Fecha: ' + new Date().toLocaleString()
        let tituloInforme = 'RENDIMIENTO DE ESTUDIANTES POR GRADO'
        const contenido = document.querySelector('table').outerHTML
        const ventana = window.open("Puestos", "_blank")
        ventana.document.write(`<html><head><title>Puestos</title></head>
        <style scoped>
          .tabla-puestos {
              border-collapse: collapse;
              width: 100%;
              text-align: center;
              font-size: 12px;
          }
          .tabla-puestos th {
            background: #eee;
          }
          .podio {
            margin: 20px 0;
            text-align: center;
          }
          .cajones {
            display: flex;
            justify-content: center;
            gap: 16px;
          }
          .puesto {
            background: #f7f7f7;
            border: 2px solid #ccc;
            border-radius: 10px;
            padding: 12px;
            width: 150px;
          }
          .puesto-1 { background-color: #ffd700; } /* oro */
          .puesto-2 { background-color: #c0c0c0; } /* plata */
          .puesto-3 { background-color: #cd7f32; } /* bronce */
          .medalla {
            font-size: 24px;
          }
          .promedio {
            font-size: 18px;
            font-weight: bold;
          }
          .puesto-label {
            font-size: 14px;
            margin-top: 4px;
            color: #333;
          }
        </style>
          <body class="container">
            <p style="text-align: center; font-size: 12px;">SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA<br><b>${this.$store.state.nombreInstitucion}</b><br>TUNJA - BOYACÁ<br>${tituloInforme}<br>Sede: ${this.nombreSede} | Grado: ${this.nombreGrado} | Año Lectivo ${this.$store.state.aLectivo} | Periodo: ${this.idPeriodo}</p>
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
        XLSX.writeFile(wb, 'puestos.xlsx')
      },
      async ocuparComboGradosSede() {
        this.comboGradosSede = []
        this.$store.state.datosGrados.forEach(element => {
          if (element.id_sede == this.idSede) {
            this.comboGradosSede.push({ 'value': element.id, 'text': element.grado.toUpperCase() })
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
      redondear(num) {
        var m = Number((Math.abs(num) * 10).toPrecision(15))
        return Math.round(m) / 10 * Math.sign(num);
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    computed: {
      estudiantesConPromedioOrdenado() {
        const base = this.promediosPorEstudiante()
        // Agrupar por promedio y asignar puestos con empate
        const ordenados = base.sort((a, b) => b.promedioFinal - a.promedioFinal)
        const agrupados = []
        let puestoActual = 1
        for (let i = 0; i < ordenados.length; i++) {
          const actual = ordenados[i]
          const anterior = agrupados[agrupados.length - 1]
          const mismoPromedio = anterior && actual.promedioFinal === anterior.promedioFinal
          agrupados.push({
            ...actual,
            puesto: mismoPromedio ? anterior.puesto : puestoActual,
            medalla: puestoActual === 1 ? '🥇' : puestoActual === 2 ? '🥈' : puestoActual === 3 ? '🥉' : ''
          })

          if (!mismoPromedio) puestoActual++
        }
        return agrupados
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
  .tabla-puestos {
    border-collapse: collapse;
    width: 100%;
    text-align: center;
    font-size: 12px;
  }
  .tabla-puestos th {
    background: #eee;
  }
  .podio {
    margin: 20px 0;
    text-align: center;
  }
  .cajones {
    display: flex;
    justify-content: center;
    gap: 16px;
  }
  .puesto {
    background: #f7f7f7;
    border: 2px solid #ccc;
    border-radius: 10px;
    padding: 12px;
    width: 150px;
  }
  .puesto-1 { background-color: #ffd700; } /* oro */
  .puesto-2 { background-color: #c0c0c0; } /* plata */
  .puesto-3 { background-color: #cd7f32; } /* bronce */
  .medalla {
    font-size: 24px;
  }
  .promedio {
    font-size: 18px;
    font-weight: bold;
  }
  .puesto-label {
    font-size: 14px;
    margin-top: 4px;
    color: #333;
  }
</style>
