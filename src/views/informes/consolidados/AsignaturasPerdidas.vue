<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> CONSOLIDADO ASIGNATURAS PERDIDAS</h5>
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
        <table border="1" cellspacing="0" cellpadding="1" class="tabla-perdidas">
          <thead>
            <tr>
              <th>Estudiante</th>
              <th>Asignaturas Perdidas</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="fila in informePerdidas" :key="fila.estudiante">
              <td>{{ fila.estudiante }}</td>
              <td>{{ fila.perdidas.join(', ') }}</td>
              <td>{{ fila.total }}</td>
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
    name: 'asignaturasperdidas',
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
          this.dataConsultada = []
          await axios
          .get(CONFIG.ROOT_PATH + 'consolidados/notasperdidas/curso/periodo', {params: {idCurso: this.idCurso, periodo: this.idPeriodo}})
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
        let tituloInforme = 'CONSOLIDADO DE ASIGNATURAS PERDIDAS'
        const contenido = document.querySelector('table').outerHTML
        const ventana = window.open("Perdidas", "_blank")
        ventana.document.write(`<html><head><title>Perdidas</title></head>
        <style scoped>
          .tabla-perdidas {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
          }
          .tabla-perdidas th, .tabla-perdidas td {
            border: 1px solid #ccc;
            padding: 1px;
          }
          .tabla-perdidas th {
            background-color: #f2f8ff;
            text-align: center;
          }
          .tabla-perdidas td {
            vertical-align: top;
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
      informePerdidas() {
        return this.listaEstudiantes.map(est => {
          const registros = this.dataConsultada.filter(dc => dc.idMatricula === est.idMatricula && dc.orden !== 98 && dc.orden !== 99)
          const asignaturasPerdidas = registros
            .map(dc => {
              const definitiva = parseFloat(dc.definitiva) || 0
              const recuperacion = parseFloat(dc.recuperacion)
              const notaFinal = (!isNaN(recuperacion) && recuperacion > definitiva)
                ? recuperacion
                : definitiva
              const tipo = parseInt(dc.idTipoEspecialidad)
              const esPerdida =
                tipo === 1 ? notaFinal < this.datosSeccion.minBas :
                tipo === 2 ? notaFinal < this.datosSeccion.minBasT :
                false // otros tipos no se consideran
              return esPerdida
                ? { asignatura: dc.asignatura, nota: notaFinal }
                : null
            })
            .filter(Boolean)

          const resumen = asignaturasPerdidas.map(a => `${a.asignatura}(${a.nota.toFixed(1)})`)

          return {
            estudiante: est.estudiante,
            perdidas: resumen,
            total: resumen.length
          }
        }).filter(e => e.total > 0) // solo estudiantes con pérdidas
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
  .tabla-perdidas {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  .tabla-perdidas th, .tabla-perdidas td {
    border: 1px solid #ccc;
    padding: 6px;
  }
  .tabla-perdidas th {
    background-color: #f2f8ff;
    text-align: center;
  }
  .tabla-perdidas td {
    vertical-align: top;
  }
</style>
