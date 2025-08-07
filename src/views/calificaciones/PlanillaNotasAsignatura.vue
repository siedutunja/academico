<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> PLANILLA DE NOTAS POR ASIGNATURA</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="2">
                <b-form-group label="Seleccione el Periodo:" label-for="periodo" class="etiqueta">
                  <b-form-select id="periodo" ref="periodo" v-model="idPeriodo" :options="comboPeriodos" @change="idSede=null,idCurso=null,idAsignatura=null"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idCurso=null,idAsignatura=null,ocuparComboCursosSede()" :disabled="idPeriodo!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Seleccione el Curso:" label-for="cursos" class="etiqueta">
                  <b-form-select  id="cursos" ref="cursos" v-model="idCurso" :options="comboCursosSede" @change="idAsignatura=null,ocuparAsignaturasCurso()" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="Seleccione la Asignatura:" label-for="asig" class="etiqueta">
                  <b-form-select  id="asig" ref="asig" v-model="idAsignatura" :options="comboAsignaturasCurso" @change="consultaListaCurso()" :disabled="idCurso!=null ? false : true"></b-form-select>
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
    <b-row v-if="!btnCargando && idAsignatura!=null">
      <b-col lg="12">
        <table border="1" cellspacing="0" cellpadding="1" class="planilla-notas">
          <thead>
            <tr>
              <th>#</th>
              <th>Estudiante</th>
              <th v-for="(n, i) in numeroNotas" :key="i">Nota {{ i + 1 }}</th>
              <th>Definitiva</th>
              <th>Desempeño</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(est, rowIndex) in listaEstudiantes" :key="est.idMatricula">
              <td>{{ rowIndex + 1 }}</td>
              <td>{{ est.estudiante }}</td>
              <td v-for="(nota, colIndex) in est.notas" :key="colIndex">
                <input
                  :ref="`input-${rowIndex}-${colIndex}`"
                  v-model.number="est.notas[colIndex]"
                  @keydown="navegar(rowIndex, colIndex, $event)"
                  @input="calcular(est)"
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  class="nota-input"
                  placeholder="–"
                />
              </td>
              <td>{{ est.definitiva > 0 ? est.definitiva.toFixed(2) : '' }}</td>
              <td>{{ est.desempeño }}</td>
            </tr>
          </tbody>
        </table>
        <button @click="entregarPlanilla">📤 Entregar planilla</button>

      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'

  export default {
    name: 'notasperiodo',
    components: {
    },
    data () {
      return {
        idPeriodo: null,
        comboPeriodos: [],
        idSede: null,
        comboSedes: [],
        idCurso: null,
        comboCursosSede: [],
        idAsignatura: null,
        comboAsignaturasCurso: [],
        listaAsignaturasCurso: [],
        listaEstudiantes: [],
        numeroNotas: 3,
        tipoCalculo: 2, // 1 = promedio, 2 = ponderado
        porcentajes: [30, 30, 40], // solo si tipoCalculo = 2


        planillita: 0,
        configuracionPlanilla: {},
        btnCargando: false,
        cambioActivo: false,
        notasPlanilla: [],
        notasPlanillaCompor: [],
        botonGuardando: false,
        colEncabezados: null,
      }
    },
    created() {
      // Inicializar campos
      this.listaEstudiantes.forEach(est => {
        est.notas = Array(this.numeroNotas).fill(null)
        est.definitiva = 0
        est.desempeño = ''
      })
    },
    methods: {
      calcular(est) {
        const notasValidas = est.notas.filter(n => typeof n === 'number' && n >= 1 && n <= 5)

        let definitiva = 0

        if (this.tipoCalculo === 1) {
          const suma = notasValidas.reduce((a, b) => a + b, 0)
          definitiva = notasValidas.length ? suma / notasValidas.length : 0
        } else if (this.tipoCalculo === 2) {
          let suma = 0
          let totalPeso = 0

          est.notas.forEach((n, i) => {
            const peso = this.porcentajes[i] || 0
            if (typeof n === 'number') {
              suma += n * peso
              totalPeso += peso
            }
          })

          definitiva = totalPeso ? suma / totalPeso : 0
        }

        est.definitiva = definitiva

        // Clasificación
        est.desempeño =
          definitiva < 3 ? 'Bajo' :
          definitiva < 4 ? 'Básico' :
          definitiva < 4.6 ? 'Alto' :
          'Superior'
      },
      navegar(row, col, e) {
        const dir = {
          ArrowRight: [row, col + 1],
          ArrowLeft: [row, col - 1],
          ArrowUp: [row - 1, col],
          ArrowDown: [row + 1, col]
        }[e.key]

        if (dir) {
          const ref = `input-${dir[0]}-${dir[1]}`
          this.$refs[ref]?.[0]?.focus()
          e.preventDefault()
        }
      },
      entregarPlanilla() {
        const resultado = this.listaEstudiantes.map(est => ({
          idMatricula: est.idMatricula,
          estudiante: est.estudiante,
          notas: est.notas,
          definitiva: est.definitiva,
          desempeño: est.desempeño
        }))
        console.log('📦 Resultado final:', resultado)
        alert('✅ Planilla capturada. Revisa la consola para ver los datos.')
      },
      async consultaListaCurso() {
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

      },
      async ocuparAsignaturasCurso() {
        this.comboAsignaturasCurso = []
        this.listaAsignaturasCurso = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/asignacioncurso', {params: {idCurso: this.idCurso, idInstitucion: this.$store.state.idInstitucion}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista asignaturas curso')
          } else{
            if (response.data.datos != 0) {
              this.listaAsignaturasCurso = response.data.datos
              this.listaAsignaturasCurso.forEach(element => {
                this.comboAsignaturasCurso.push({ 'value': element.idAsignaturaCurso, 'text': element.asignatura.toUpperCase() })
              })
            }
          }
          //console.log(JSON.stringify(this.listaAsignaturasCurso))
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista asignación docentes curso. Intente más tarde.' + err)
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
    beforeMount() {
      if(this.$store.state.idRol == 1 || this.$store.state.idRol == 12 || this.$store.state.perActNotas == 1) {
        this.ocuparComboPeriodos()
        this.ocuparComboSedes()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>
<style scoped>
  .planilla-notas {
    font-family: Arial, sans-serif;
    margin: 20px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    margin-bottom: 15px;
  }
  th, td {
    border: 1px solid #ccc;
    padding: 6px;
    text-align: center;
  }
  .nota-input {
    width: 60px;
    text-align: center;
  }
  button {
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
  }
</style>
