<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> RENDIMIENTO DE CURSOS POR SEDE</h5>
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
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="consultarEstudiantes()" :disabled="idPeriodo!=null ? false : true"></b-form-select>
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
    <b-row v-if="!btnCargando && idSede!=null">
      <b-col lg="12">
        <table class="tabla-desempeno table-responsive" border="1" cellspacing="0" cellpadding="1">
          <thead>
            <tr>
              <th width="50px">Puesto</th>
              <th width="500px">Grado-Curso</th>
              <th width="150px">Promedio</th>
            </tr>
          </thead>
            <tr v-for="(fila, index) in cursosOrdenados" :key="fila.id">
              <td>{{ index + 1 }}</td>
              <td style="text-align: left;">{{ fila.curso }}</td>
              <td>{{ fila.promedioCurso.toFixed(5) }}</td>
            </tr>
          <tbody>
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
    name: 'puestoscursossedeperiodo',
    components: {
    },
    data () {
      return {
        idSede: null,
        comboSedes: [],
        idPeriodo: null,
        comboPeriodos: null,
        nombreSede: null,
        btnCargando: false,
        dataConsultada: [],
        datosSeccion: {},
      }
    },
    methods: {
      async consultarEstudiantes() {
        this.btnCargando = true
        if (this.idSede != null) { 
          this.nombreSede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
          this.dataConsultada = []
          await axios
          .get(CONFIG.ROOT_PATH + 'consolidados/notascursos/sede/periodo', {params: {idSede: this.idSede, periodo: this.idPeriodo}})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consolidados notas cursos periodo')
              this.btnCargando = false
            } else{
              if (response.data.datos != 0) {
                this.dataConsultada = response.data.datos
              }
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consolidados notas cursos periodo. Intente más tarde.' + err)
            this.btnCargando = false
          })
        }
        //console.log(JSON.stringify(this.dataConsultada))
        this.btnCargando = false
      },
      imprimir() {
        let fecha = 'Fecha: ' + new Date().toLocaleString()
        let tituloInforme = 'RENDIMIENTO DE CURSOS POR SEDE'
        const contenido = document.querySelector('table').outerHTML
        const ventana = window.open("Puestos Cursos", "_blank")
        ventana.document.write(`<html><head><title>Puestos Cursos</title></head>
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
            <p style="text-align: center; font-size: 12px;">SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA<br><b>${this.$store.state.nombreInstitucion}</b><br>TUNJA - BOYACÁ<br>${tituloInforme}<br>Sede: ${this.nombreSede} | Año Lectivo ${this.$store.state.aLectivo} | Periodo: ${this.idPeriodo}</p>
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
      async ocuparComboGradosSede() {
        this.comboGradosSede = []
        this.$store.state.datosGrados.forEach(element => {
          if (element.id_sede == this.idSede) {
            this.comboGradosSede.push({ 'value': element.id, 'text': element.grado.toUpperCase() })
          }
        })
        //console.log(JSON.stringify(this.comboGradosSede))
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
      cursosOrdenados() {
        return [...this.dataConsultada].sort(
          (a, b) => b.promedioCurso - a.promedioCurso
        )
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
