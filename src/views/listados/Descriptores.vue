<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> DESCRIPTORES POR CURSO</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                  <b-form-select id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idCurso=null,ocuparComboCursosSede()"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="Seleccione el Curso:" label-for="cursos" class="etiqueta">
                  <b-form-select id="cursos" ref="cursos" v-model="idCurso" :options="comboCursos" @change="verAsignacionDocentesCurso()" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mt-2" v-if="idCurso!=null">
              <b-col lg="12">
                <div ref="contenido">
                  <table class="table table-striped table-bordered table-hover table-sm" v-for="item in listaAsignaturasDescriptores" :key="item.id">
                    <thead>
                      <tr>
                        <th colspan="3" style="text-align: left; background: #bebebe">Asignatura: <b>{{item.asignatura}}</b></th>
                      </tr>
                      <tr>
                        <th style='width: 7%;'>Concepto</th>
                        <th style='width: 3%;'>Per</th>
                        <th style='width: 90%;'>Descriptor</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="itemD in item.descriptores" :key="itemD.id">
                        <td>
                          <span v-if="itemD.id_concepto_valorativo==1">BAJO</span>
                          <span v-else-if="itemD.id_concepto_valorativo==2">BASICO</span>
                          <span v-else-if="itemD.id_concepto_valorativo==3">ALTO</span>
                          <span v-else-if="itemD.id_concepto_valorativo==4">SUPERIOR</span>
                        </td>
                        <td>{{itemD.id_periodo}}</td>
                        <td>{{itemD.descriptor}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div style="margin-bottom: 1rem">
                  <b-button class="small mx-1 mt-3" variant="primary" @click="imprimir">Imprimir Descriptores</b-button>
                  <b-button class="small mx-1 mt-3" variant="outline-primary" @click="exportarAExcel">Exportar a Excel</b-button>
                </div>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Seleccione la Sede y el Curso para consultar los descriptores generales.</em>
          </template>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import * as XLSX from 'xlsx'

  export default {
    name: 'descriptores',
    components: {
    },
    data () {
      return {
        idSede: null,
        comboSedes: [],
        idCurso: null,
        comboCursos: [],
        nombreSede: null,
        nombreCurso: null,
        listaAsignaturasDescriptores: [],
      }
    },
    methods: {
      exportarAExcel() {
        const libro = XLSX.utils.book_new()
        this.listaAsignaturasDescriptores.forEach(asig => {
          const datos = asig.descriptores.map(d => ({
            Concepto: this.convertirConcepto(d.id_concepto_valorativo),
            Periodo: d.id_periodo,
            Descriptor: d.descriptor
          }))
          const hoja = XLSX.utils.json_to_sheet(datos)
          XLSX.utils.book_append_sheet(libro, hoja, asig.asignatura.slice(0, 31)) // Excel permite máx. 31 caracteres
        })
        XLSX.writeFile(libro, 'Descriptores-' + this.nombreCurso + '.xlsx')
      },
      convertirConcepto(id) {
        return {
          1: 'BAJO',
          2: 'BÁSICO',
          3: 'ALTO',
          4: 'SUPERIOR'
        }[id] || '-'
      },
      imprimir() {
        let fecha = 'Fecha: ' + new Date().toLocaleString()
        let tituloInforme = 'DESCRIPTORES'
        const contenido = this.$refs.contenido.innerHTML
        //const contenido = document.querySelector('table').outerHTML
        const ventana = window.open("Descriptores", "_blank")
        ventana.document.write(`<html><head><title>Descriptores</title></head>
          <style scoped>
            .contenido {
              font-family: 'Segoe UI', sans-serif;
              margin: 5px;
            }
            table {
              font-family: 'Segoe UI', sans-serif;
              width: 100%;
              border-collapse: collapse;
              font-size: 13px;
            }
            th, td {
              border: 1px solid #000;
              padding: 2px;
              text-align: left;
            }
            thead {
              background-color: #f0f8ff;
            }
            @media print {
              .page-break {
                page-break-after: always;
              }
              body {
                font-family: 'Segoe UI', sans-serif;
                margin: 5px;
                color: #000;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                font-size: 12px;
                margin-bottom: 20px;
              }
              th, td {
                border: 1px solid #000;
                padding: 2px;
                text-align: left;
              }
              thead {
                background-color: #f0f4fa;
              }
            }
          </style>
          <body class="container">
            <p style="text-align: center; font-size: 12px;">SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA<br><b>${this.$store.state.nombreInstitucion}</b><br>TUNJA - BOYACÁ<br>${tituloInforme}<br>Sede: ${this.nombreSede} | Curso: ${this.nombreCurso} | Año Lectivo ${this.$store.state.aLectivo}</p>
            ${contenido}
            <div style="text-align: right; font-size: 12px;"><i>${fecha}</i></div>
          </body>
        </html>`)
        ventana.document.close()
        ventana.print()
      },
      async verAsignacionDocentesCurso() {
        this.nombreSede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
        this.nombreCurso = this.idCurso != null ? document.getElementById('cursos')[document.getElementById('cursos').selectedIndex].text : ''
        this.listaAsignaturasDescriptores = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/descriptores', {params: {idCurso: this.idCurso}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista asignación docentes curso')
          } else{
            if (response.data.datos != 0) {
              this.listaAsignaturasDescriptores = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista asignación docentes curso. Intente más tarde.' + err)
        })
      },
      async ocuparComboCursosSede() {
        this.comboCursos = []
        this.$store.state.datosCursos.forEach(element => {
          if (element.id_sede == this.idSede) {
            this.comboCursos.push({ 'value': element.id, 'text': element.nomenclatura.toUpperCase() })
          }
        })
      },
      async ocuparComboSedes() {
        this.comboSedes = []
        this.$store.state.datosSedes.forEach(element => {
          this.comboSedes.push({ 'value': element.id, 'text': element.sede.toUpperCase() })
        })
      },
      colorArea(orden) {
        let color = ['#CC9900','#0033CC','#009900','#CCCC00','#006699','#FF00CC','#9933CC','#FF6600','#0033FF','#666600','#CC3300','#607d8b','#4a148c','#afb42b','#f57c00','#795548','#8e24aa','#c2185b','#f44336','#CC9900','#0033CC','#009900','#CCCC00','#006699','#FF00CC','#9933CC','#FF6600','#0033FF','#666600','#CC3300','#607d8b','#4a148c','#afb42b','#f57c00','#795548','#8e24aa','#c2185b','#f44336','#CC9900','#0033CC','#009900','#CCCC00','#006699','#FF00CC','#9933CC','#FF6600','#0033FF','#666600','#CC3300','#607d8b','#4a148c','#afb42b','#f57c00','#795548','#8e24aa','#c2185b','#f44336','#CC9900','#0033CC','#009900','#CCCC00','#006699','#FF00CC','#9933CC','#FF6600','#0033FF','#666600','#CC3300','#607d8b','#4a148c','#afb42b','#f57c00','#795548','#8e24aa','#c2185b','#f44336']
        return 'color: ' + color[orden]
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.ocuparComboSedes()
    }
  }
</script>