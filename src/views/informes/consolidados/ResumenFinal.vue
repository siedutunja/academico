<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> RESUMEN FINAL DE EVALUACIONES</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="3">
                <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idCurso=null,idMatricula=null,ocuparComboCursosSede()"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Seleccione el Curso:" label-for="cursos" class="etiqueta">
                  <b-form-select  id="cursos" ref="cursos" v-model="idCurso" :options="comboCursosSede" @change="idMatricula=null,ocuparComboEstudiantes(),consultaAsignaturasCurso()" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="Seleccione el Estudiante:" label-for="estud" class="etiqueta">
                  <b-form-select  id="estud" ref="estud" v-model="idMatricula" :options="comboEstudiantes" @change="estudiantesNotas()" :disabled="idCurso!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <div v-if="idMatricula!=null">
              <b-row><b-col lg="12"><hr></b-col></b-row>
              <b-row>
                <b-col>
                <div v-if="btnCargando">
                  <div class="text-center m-5 text-primary">
                    <b-spinner style="width: 3rem; height: 3rem;" label="Spinner"></b-spinner>
                    <br><strong>Cargando planilla...</strong>
                  </div>
                </div>
                  <div v-else>
                    <b-row class="mt-2">
                      <b-col>
                        <vue-good-table ref="table" :columns="encabColumnas" :rows="listaNotasAsignaturasCurso" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                          <template slot="table-row" slot-scope="props">
                            <span v-if="props.column.field == 'nombreAsignatura'">
                              <span>{{props.row.nombreAsignatura}}</span>
                            </span>
                            <span v-if="props.column.field == 'promedioFinal'">
                              <span><b>{{props.row.promedioFinal}}</b></span>
                            </span>
                            <span v-if="props.column.field == 'desempeno'">
                              <span><b>{{props.row.desempeno}}</b></span>
                            </span>
                          </template>
                          <div slot="emptystate">
                            <h5 class="text-danger ml-5">No existen asignaturas en la planilla</h5>
                          </div>
                        </vue-good-table>
                      </b-col>
                      <b-col lg="12">
                        <div style="margin-bottom: 1rem">
                          <b-button class="small mx-1 mt-3" variant="primary" @click="imprimir">Imprimir Consolidado</b-button>
                          <b-button class="small mx-1 mt-3" variant="outline-primary" @click="exportarAExcel">Exportar a Excel</b-button>
                        </div>
                      </b-col>
                    </b-row>
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-card-text>
          <template #footer>
            <em>Consulta desempeños finales.</em>
          </template>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'
  import * as XLSX from 'xlsx'

  export default {
    name: 'resumenfinal',
    components: {
      VueGoodTable,
    },
    data () {
      return {
        idSede: null,
        comboSedes: [],
        idCurso: null,
        comboCursosSede: [],
        idMatricula: null,
        comboEstudiantes: [],
        nombreEstudiante: null,
        listaAsignaturasCurso: [],
        encabColumnas: [
          { label: 'Asignatura', field: 'nombreAsignatura', sortable: false },
          { label: 'Final', field: 'promedioFinal', sortable: false },
          { label: 'Desempeño', field: 'desempeno', sortable: false },
          //{ label: 'Habil', field: 'habilitacion', width: '5%', sortable: false },
        ],
        notas: [],
        btnCargando: false,
        listaNotasAsignaturasCurso: [],
      }
    },
    methods: {
      imprimir() {
        let fecha = 'Fecha: ' + new Date().toLocaleString()
        let tituloInforme = 'RESUMEN FINAL DE EVALUACIONES'
        const contenido = document.querySelector('table').outerHTML
        const ventana = window.open("Final", "_blank")
        ventana.document.write(`<html><head><title>Final</title></head>
        <style scoped>
          .tabla-estado-final {
              border-collapse: collapse;
              width: 100%;
              text-align: center;
              font-size: 10px;
          }
          .tabla-estado-final th {
            background: #eee;
          }
        </style>
          <body class="container">
            <p style="text-align: center; font-size: 12px;">SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA<br><b>${this.$store.state.nombreInstitucion}</b><br>TUNJA - BOYACÁ<br>${tituloInforme}<br>Sede: ${this.nombreSede} | Curso: ${this.nombreCurso} | Año Lectivo ${this.$store.state.aLectivo}<br>Estudiante: ${this.nombreEstudiante}</p>
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
        XLSX.writeFile(wb, 'Promocion.xlsx')
      },
      generarPromediosFinalesConDesempeno(asignaturas, notas) {
        // Agrupar por matrícula + asignatura
        const agrupado = {}
        notas.forEach(nota => {
          const key = `${nota.idMatricula}-${nota.asignatura}`
          if (!agrupado[key]) {
            agrupado[key] = {
              idMatricula: nota.idMatricula,
              asignatura: nota.asignatura,
              habilitacion: nota.habilitacion,
              fecha: nota.fecha,
              acta: nota.acta,
              vigencia: this.$store.state.aLectivo,
              valores: []
            }
          }
          const valor = parseFloat(nota.notaFinal)
          if (!isNaN(valor)) {
            agrupado[key].valores.push(valor)
          }
        })
        // Construir array final con promedio y desempeño
        const resultado = Object.values(agrupado).map(item => {
          const meta = asignaturas.find(a => a.asignatura === item.asignatura)
          // 💡 Exclusión directa si no existe o si orden === 99
          if (!meta || meta.orden === 99) return null
          const suma = item.valores.reduce((a, b) => a + b, 0)
          const promedio = item.valores.length > 0 ? this.redondear(suma / item.valores.length).toFixed(1) : null
          const tipo = meta.idTipoEspecialidad
          let desempeno = ''
          if (promedio !== null) {
            if (tipo == 1)
              if (promedio < this.datosSeccion.minBas) desempeno = 'BAJO'
              else if (promedio < this.datosSeccion.minAlt) desempeno = 'BÁSICO'
              else if (promedio < this.datosSeccion.minSup) desempeno = 'ALTO'
              else desempeno = 'SUPERIOR'
            else {
              if (promedio < this.datosSeccion.minBasT) desempeno = 'BAJO'
              else if (promedio < this.datosSeccion.minAltT) desempeno = 'BÁSICO'
              else if (promedio < this.datosSeccion.minSupT) desempeno = 'ALTO'
              else desempeno = 'SUPERIOR'
            }
          }
          return {
            idMatricula: item.idMatricula,
            idAsignaturaCurso: meta?.idAsignaturaCurso || null,
            nombreAsignatura: meta?.nombreAsignatura || item.asignatura,
            promedioFinal: promedio ? promedio : '',
            desempeno,
            habilitacion: item.habilitacion,
            fecha: item.fecha,
            acta: item.acta,
            vigencia: item.vigencia,
            orden: meta.orden
          }
        }).filter(e => e !== null) // ❌ Filtra los excluidos
        // Ordenar por el campo "orden"
        return resultado.sort((a, b) => a.orden - b.orden)
      },
      async estudiantesNotas() {
        this.btnCargando = true
        this.notas = []
        this.nombreSede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
        if (this.idMatricula != null) { 
          this.nombreEstudiante = document.getElementById('estud')[document.getElementById('estud').selectedIndex].text
          this.nombreCurso = document.getElementById('cursos')[document.getElementById('cursos').selectedIndex].text
          this.$store.state.datosCursos.forEach(element => {
            if (element.id == this.idCurso) {
              this.idNivel = element.id_nivel
            }
          })
          await axios
          .get(CONFIG.ROOT_PATH + 'academico/notashabilitaciones/estudiante', {params: {idCurso: this.idCurso, idMatricula: this.idMatricula, vigencia: this.$store.state.aLectivo}})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consolidados asignaturas curso periodo')
              this.btnCargando = false
            } else{
              if (response.data.datos != 0) {
                this.notas = response.data.datos
              }
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consolidados asignaturas curso periodo. Intente más tarde.' + err)
            this.btnCargando = false
          })
          //console.log(JSON.stringify(this.notas))
          this.listaNotasAsignaturasCurso = this.notas.length ? this.generarPromediosFinalesConDesempeno(this.listaAsignaturasCurso, this.notas) : false
        }
        this.btnCargando = false
      },
      async consultaAsignaturasCurso() {
        this.listaAsignaturasCurso = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/asignacioncurso/habilitaciones', {params: {idCurso: this.idCurso}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista asignaturas curso')
          } else{
            if (response.data.datos != 0) {
              this.listaAsignaturasCurso = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista asignación docentes curso. Intente más tarde.' + err)
        })
        //console.log(JSON.stringify(this.listaAsignaturasCurso))
      },
      async ocuparComboEstudiantes() {
        this.comboEstudiantes = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/listacurso/habilitaciones', { params: { idCurso: this.idCurso }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Lista Curso')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboEstudiantes.push({ 'value': element.idMatricula, 'text': element.estudiante })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Lista Curso. Intente más tarde.' + err)
        })
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
      handleKeyNavigation(event, i, col) {
        if (event.key === "ArrowDown") {
          const nextInput = this.$refs[`${col}-${i + 1}`]
          if (nextInput) nextInput.focus()
        } else if (event.key === "ArrowUp") {
          const previousInput = this.$refs[`${col}-${i - 1}`]
          if (previousInput) previousInput.focus()
        }
      },
      redondear(num) {
        var m = Number((Math.abs(num) * 10).toPrecision(15))
        return Math.round(m) / 10 * Math.sign(num);
      },
      soloNumeros(e) {
        let key = window.Event ? e.which : e.keyCode
        if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key == 8) || (key == 9) || (key == 37) || (key == 39))) {
            e.preventDefault()
        }
      },
      soloDecimales(e) {
        let key = window.Event ? e.which : e.keyCode
        if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key == 8) || (key == 9) || (key == 37) || (key == 39) || (key == 110) || (key == 189) || (key == 190))) {
            e.preventDefault()
        }
      },
      tdClassFuncDiversa(fila) {
        if (fila.id_diversa == 'S') {
          return 'text-center alert alert-warning'
        }
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      if(this.$store.state.idRol == 1 || this.$store.state.idRol == 12 || this.$store.state.perActNotas == 1) {
        this.ocuparComboSedes()
        this.datosSeccion = this.$store.state.datosSecciones[this.$store.state.idSeccion - 1]
        //console.log(JSON.stringify(this.datosSeccion))
      } else {
        this.$router.push('/restringida')
      }
    },
    computed: {
    }
  }
</script>