<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> PROMOCIÓN ESCOLAR</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <b-card>
                  <b-row>
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
                <vue-good-table ref="table" :columns="encabColumnas" :rows="estadoFinalPorEstudiante" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'estudiante'">
                      <span>{{props.row.estudiante}}</span>
                    </span>
                    <span v-if="props.column.field == 'estado'">
                      <span><b>{{props.row.estado}}</b></span>
                    </span>
                    <span v-if="props.column.field == 'idEstadoFinal'">
                      <b-form-select v-model="props.row.idEstadoFinal" @change="actualizarItem(props.row)" :options="comboEstadosFinales"></b-form-select>
                    </span>
                    <span v-if="props.column.field == 'perdidas'">
                      <span><b>{{props.row.perdidas}}</b></span>
                    </span>
                    <span v-if="props.column.field == 'estadoPromocion'">
                      <span><b>{{props.row.estadoPromocion}}</b></span>
                    </span>
                  </template>
                  <div slot="emptystate">
                    <h5 class="text-danger ml-5">No existen estudiantes en la promoción</h5>
                  </div>
                </vue-good-table>
              </b-col>
              <b-col lg="12">
                <div style="margin-bottom: 1rem">
                  <b-button class="small mx-1 mt-3" variant="primary" @click="confirmarPromocion">Realizar Promoción</b-button>
                </div>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import * as XLSX from 'xlsx'
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'

  export default {
    name: 'promocionescolar',
    props: {
    },
    components: {
      VueGoodTable,
    },
    data () {
      return {
        idSede: null,
        comboSedes: [],
        idPeriodosSeccion: null,
        idCurso: null,
        comboCursosSede: [],
        nombreSede: null,
        nombreCurso: null,
        idNivel: null,
        idGrado: null,
        btnCargando: false,
        dataConsultada: [],
        datosSeccion: {},
        listaAreasAsignaturas: [],
        listaEstudiantes: [],
        encabColumnas: [
          { label: 'Estudiante', field: 'estudiante', sortable: false },
          { label: 'Matrícula', field: 'estado', sortable: false },
          { label: 'Resultado Final', field: 'idEstadoFinal', sortable: false },
          { label: 'Areas Perd.', field: 'perdidas', sortable: false },
          { label: 'Estado', field: 'estadoPromocion', sortable: false },
        ],
        idEstadoFinal: null,
        comboEstadosFinales: [],
      }
    },
    methods: {
      actualizarItem(item) {
        let indice = this.estadoFinalPorEstudiante.findIndex(estud => estud.idMatricula === item.idMatricula)
        this.estadoFinalPorEstudiante[indice].idEstadoFinal = item.idEstadoFinal
      },
      generarDetallePromocionPorAsignatura() {
        const vigencia = this.$store.state.aLectivo
        const resultado = []
        this.listaEstudiantes.forEach(est => {
          const notasEst = this.dataConsultada.filter(n => n.idMatricula === est.idMatricula)
          this.listaAreasAsignaturas.forEach(asig => {
            if (asig.orden === 98 || asig.orden === 99) return
            const notasAsig = notasEst.filter(n =>
              n.asignatura === asig.asignatura &&
              n.area === asig.area
            )
            if (!notasAsig.length) return
            // 📘 Paso 1: calcular promedio de periodos
            let sumaNotas = 0
            let habilitacion = null
            let fecha = null
            let acta = null
            notasAsig.forEach(nota => {
              let base = parseFloat(nota.definitiva) || 0
              const recu = parseFloat(nota.recuperacion)
              const hab = parseFloat(nota.habilitacion)
              const fec = nota.fecha
              const act = nota.acta
              let parcial = (!isNaN(recu) && recu > base) ? recu : base
              sumaNotas += parcial
              if (!isNaN(hab)) habilitacion = hab // solo tomamos habilitación disponible
              if (fec !== null) fecha = fec // solo tomamos fecha disponible
              if (act !== null) acta = act // solo tomamos acta disponible
            })
            const promedioAsignatura = sumaNotas > 0 ? this.redondear(sumaNotas / this.idPeriodosSeccion).toFixed(1) : 0
            const notaFinal = (!isNaN(habilitacion) && habilitacion > promedioAsignatura)
              ? habilitacion
              : promedioAsignatura
            // 🧠 Evaluar desempeño según especialidad
            const tipo = asig.idTipoEspecialidad
            let desempeno = ''
            if (tipo === 2) { // nivel técnico
              if (notaFinal < this.datosSeccion.minBasT) desempeno = 'BAJO'
              else if (notaFinal < this.datosSeccion.minAltT) desempeno = 'BÁSICO'
              else if (notaFinal < this.datosSeccion.minSupT) desempeno = 'ALTO'
              else if (notaFinal <= this.datosSeccion.maxSupT) desempeno = 'SUPERIOR'
              else desempeno = ''
            } else { // nivel general
              if (notaFinal < this.datosSeccion.minBas) desempeno = 'BAJO'
              else if (notaFinal < this.datosSeccion.minAlt) desempeno = 'BÁSICO'
              else if (notaFinal < this.datosSeccion.minSup) desempeno = 'ALTO'
              else if (notaFinal <= this.datosSeccion.maxSup) desempeno = 'SUPERIOR'
              else desempeno = ''
            }
            resultado.push({
              idMatricula: est.idMatricula,
              vigencia,
              area: asig.nombreArea,
              asignatura: asig.nombreAsignatura,
              ih: asig.ih,
              porcentaje: asig.porcentaje,
              notaDefinitiva: promedioAsignatura,
              habilitacion: habilitacion ?? null,
              fecha: fecha ?? null,
              acta: acta ?? null,
              notaFinal: notaFinal,
              desempeno,
              observaciones: null
            })
          })
        })
        return resultado
      },
      async consultarEstudiantes() {
        this.btnCargando = true
        this.nombreSede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
        if (this.idCurso != null) { 
          this.nombreCurso = document.getElementById('cursos')[document.getElementById('cursos').selectedIndex].text
          this.$store.state.datosCursos.forEach(element => {
            if (element.id == this.idCurso) {
              this.idNivel = element.id_nivel
              this.idGrado = element.id_grado
            }
          })
          this.listaEstudiantes = []
          await axios
          .get(CONFIG.ROOT_PATH + 'consolidado/listaestudiantes/curso/estadofinal', { params: { idCurso: this.idCurso, vigencia: this.$store.state.aLectivo }})
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
          .get(CONFIG.ROOT_PATH + 'academico/notaspromocion/curso', {params: {idCurso: this.idCurso, vigencia: this.$store.state.aLectivo}})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consolidados notas curso promoción')
              this.btnCargando = false
            } else{
              if (response.data.datos != 0) {
                this.dataConsultada = response.data.datos
              }
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consolidados notas curso promoción. Intente más tarde.' + err)
            this.btnCargando = false
          })
        }
        //console.log(JSON.stringify(this.listaEstudiantes))
        //console.log(JSON.stringify(this.listaAreasAsignaturas))
        //console.log(JSON.stringify(this.dataConsultada))
        this.btnCargando = false
      },
      confirmarPromocion() {
        let titulo = 'Promocionar los Estudiantes'
        let pregunta = 'Recuerde que este proceso se hace solo una vez. Revise que los estados de promoción esten correctamente asignados a los estudiantes. ¿Esta seguro de promocionar los estudiante?'
        this.$bvModal.msgBoxConfirm(pregunta, {
          headerBgVariant: 'primary',
          headerTextVariant: 'light',
          bodyBgVariant: 'light',
          bodyBgClass: 'text-center',
          title: titulo,
          size: '',
          buttonSize: 'sm',
          okVariant: 'primary',
          okTitle: 'Si, ' + titulo,
          cancelVariant: 'danger',
          cancelTitle: 'Cancelar',
          footerClass: 'p-2',
          bodyClass: 'p-5',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.guardarPromocion()
          }
        })
      },
      async guardarPromocion() {
        this.btnCargando = true
        const listaPromo = this.generarDetallePromocionPorAsignatura()
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/matriculas/renovacion/estadosfinales', JSON.stringify(this.estadoFinalPorEstudiante), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Estados finales')
            this.btnCargando = false
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los estados de promoción de los estudiantes se han realizado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Estados finales. Intente más tarde. ' + err)
          this.btnCargando = false
        })
        await axios
        .post(CONFIG.ROOT_PATH + 'academico/matriculas/certificaciones', JSON.stringify(listaPromo), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Certificaciones')
            this.btnCargando = false
          } else{
            this.consultarEstudiantes()
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Las certificaciones de los estudiantes se han actualizado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Certificaciones. Intente más tarde. ' + err)
          this.btnCargando = false
        })
        this.btnCargando = false
      },
      exportarAExcel() {
        const tabla = document.querySelector('table')
        const wb = XLSX.utils.table_to_book(tabla)
        XLSX.writeFile(wb, 'Promocion.xlsx')
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
      async ocuparComboEstadosFinales() {
        this.comboEstadosFinales = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/estadosfinales', {params: {idInstitucion: this.$store.state.idInstitucion}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta datos estados finales')
            this.btnCargando = false
          } else {
            if(response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboEstadosFinales.push({ 'value': element.id, 'text': element.estado.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta datos estados finales. Intente más tarde. ' + err)
          this.btnCargando = false
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
      estadoFinalPorEstudiante() {
        const agrupado = this.listaEstudiantes.map(est => {
          // Filtrar notas del estudiante
          const notasEst = this.dataConsultada.filter(n => n.idMatricula === est.idMatricula)
          // Agrupar asignaturas válidas por área
          const areasAsignaturas = {}
          this.listaAreasAsignaturas.forEach(asig => {
            if (asig.orden === 98 || asig.orden === 99) return
            if (!areasAsignaturas[asig.area]) areasAsignaturas[asig.area] = []
            areasAsignaturas[asig.area].push(asig)
          })
          let areasPerdidas = 0
          Object.entries(areasAsignaturas).forEach(([area, asignaturas]) => {
            let sumaPonderada = 0
            let totalPorcentaje = 0
            asignaturas.forEach(asig => {
              const notasDeAsig = notasEst.filter(n =>
                n.asignatura === asig.asignatura &&
                n.area === asig.area
              )
              if (!notasDeAsig.length) return
              let sumaNotas = 0
              console.log(JSON.stringify(notasDeAsig))
              notasDeAsig.forEach(nota => {
                let base = parseFloat(nota.definitiva) || 0
                const recu = parseFloat(nota.recuperacion)
                let parcial = (!isNaN(recu) && recu > base) ? recu : base
                sumaNotas += parcial
              })
              let promedioAsignatura = sumaNotas > 0 ? this.redondear(sumaNotas / this.idPeriodosSeccion).toFixed(1) : 0
              const notaHab = parseFloat(notasDeAsig[0].habilitacion) // por asignatura
              if (!isNaN(notaHab) && notaHab > promedioAsignatura) {
                promedioAsignatura = notaHab
              }
              if (!isNaN(promedioAsignatura)) {
                sumaPonderada += promedioAsignatura * (asig.porcentaje / 100)
                totalPorcentaje += asig.porcentaje
              }
            })
            if (totalPorcentaje > 0) {
              const promedioArea = this.redondear(sumaPonderada).toFixed(1)
              const tipoEsp = asignaturas[0].idTipoEspecialidad
              const limiteBajo = tipoEsp === 2 ? this.datosSeccion.minBasT : this.datosSeccion.minBas
              if (promedioArea < limiteBajo) areasPerdidas++
            }
          })
          let estadoFinal = 1
          if (this.idNivel == 6) {
            areasPerdidas > 0 ? estadoFinal = 12 : estadoFinal = 11
          } else {
            areasPerdidas > 0 ? estadoFinal = 2 : this.idGrado == '11' ? estadoFinal = 7 : estadoFinal = 1
          }
          return {
            idMatricula: est.idMatricula,
            estudiante: est.estudiante,
            estado: est.estado,
            idEstadoFinal: estadoFinal,
            perdidas: areasPerdidas,
            estadoPromocion: est.estadoPromocion
          }
        })
        return agrupado
      },
    },
    beforeMount() {
      this.ocuparComboSedes()
      this.ocuparComboEstadosFinales()
      this.datosSeccion = this.$store.state.datosSecciones[this.$store.state.idSeccion - 1]
      this.idPeriodosSeccion = this.datosSeccion.numPeriodos
      console.log(JSON.stringify(this.$store.state.datosCursos))
    }
  }
</script>
<style scoped>
  .tabla-estado-final {
    border-collapse: collapse;
    width: 100%;
    text-align: center;
    font-size: 12px;
  }
  .tabla-estado-final th {
    background: #eee;
  }
</style>
