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
                  <b-form-select id="periodo" ref="periodo" v-model="periodoActual" :options="comboPeriodos" @change="idSede=null,idCurso=null,idAsignaturaCurso=null"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idCurso=null,idAsignaturaCurso=null,ocuparComboCursosSede()" :disabled="periodoActual!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Seleccione el Curso:" label-for="cursos" class="etiqueta">
                  <b-form-select  id="cursos" ref="cursos" v-model="idCurso" :options="comboCursosSede" @change="idAsignaturaCurso=null,ocuparAsignaturasCurso()" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group label="Seleccione la Asignatura:" label-for="asig" class="etiqueta">
                  <b-form-select  id="asig" ref="asig" v-model="idAsignaturaCurso" :options="comboAsignaturasCurso" @change="consultaListaCurso()" :disabled="idCurso!=null ? false : true"></b-form-select>
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
    <b-row v-if="!btnCargando && idAsignaturaCurso!=null">
      <b-col lg="12">
        <div class="planilla-criterios">
          <h3>Captura de Notas — Periodo {{ periodoActual }}</h3>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Estudiante</th>
                <template v-for="(config, criterio) in criteriosEvaluacion">
                  <th :colspan="config.cantidadNotas + 1" :key="criterio">{{ criterio }}</th>
                </template>
                <th>Nota Final</th>
              </tr>
              <tr>
                <th></th>
                <th></th>
                <template v-for="(config, criterio) in criteriosEvaluacion">
                  <template v-for="(n, i) in config.cantidadNotas">
                    <th :key="criterio + 'num-' + i">Nota {{ i + 1 }}</th>
                  </template>
                  <th :key="criterio + 'sub-' + criterio">Subtotal</th>
                </template>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(est, rowIndex) in listaEstudiantes" :key="est.idMatricula">
                <td>{{ rowIndex + 1 }}</td>
                <td>{{ est.estudiante }}</td>
                <template v-for="(config, criterio) in criteriosEvaluacion">
                  <template v-for="(n, colIndex) in config.cantidadNotas">
                    <td :key="`input-${rowIndex}-${criterio}-${colIndex}`">
                      <input
                        :ref="`input-${rowIndex}-${criterio}-${colIndex}`"
                        v-model.number="est.notas[criterio][colIndex]"
                        @keydown="navegar(rowIndex, criterio, colIndex, $event)"
                        @input="calcular(est)"
                        type="number"
                        step="0.1"
                        min="1"
                        max="5"
                        class="nota-input"
                        placeholder="–"
                      />
                    </td>
                  </template>
                  <td :key="'sub-' + criterio">{{ est.subtotales[criterio] }}</td>
                </template>
                <td><strong>{{ est.notaFinal }}</strong></td>
              </tr>
            </tbody>
          </table>
          <button @click="guardarNotas">💾 Guardar notas</button>
        </div>
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
        periodoActual: null,
        comboPeriodos: [],
        idSede: null,
        comboSedes: [],
        idCurso: null,
        comboCursosSede: [],
        idAsignaturaCurso: null,
        comboAsignaturasCurso: [],
        listaEstudiantes: [],
        criteriosEvaluacion: {},
        btnCargando: false,
        cambioActivo: false,
        botonGuardando: false,
      }
    },
    created() {
      this.listaEstudiantes.forEach(est => {
        est.notas = {}
        est.subtotales = {}
        est.notaFinal = 0
        Object.entries(this.criteriosEvaluacion).forEach(([criterio, config]) => {
          est.notas[criterio] = Array(config.cantidadNotas).fill(null)
          est.subtotales[criterio] = 0
        })
      })
      console.log(JSON.stringify(this.listaEstudiantes))
    },
    methods: {
      calcular(est) {
        let notaFinal = 0
        Object.entries(this.criteriosEvaluacion).forEach(([criterio, config]) => {
          const notas = est.notas[criterio]
          let subtotal = 0
          if (config.tipoCalculo === 1) {
            const validas = notas.filter(n => typeof n === 'number')
            const suma = validas.reduce((a, b) => a + b, 0)
            subtotal = validas.length ? suma / validas.length : 0
          } else if (config.tipoCalculo === 2) {
            subtotal = notas.reduce((acc, nota, i) => {
              const peso = config.porcentajesNotas[i] || 0
              return acc + (typeof nota === 'number' ? nota * peso : 0)
            }, 0)
            subtotal = subtotal / 100
          }
          est.subtotales[criterio] = subtotal
          notaFinal += subtotal * (config.porcentaje / 100)
        })

        est.notaFinal = notaFinal
      },
      navegar(row, criterio, col, e) {
        const dir = {
          ArrowRight: [row, criterio, col + 1],
          ArrowLeft: [row, criterio, col - 1],
          ArrowUp: [row - 1, criterio, col],
          ArrowDown: [row + 1, criterio, col]
        }[e.key]

        if (dir) {
          const ref = `input-${dir[0]}-${dir[1]}-${dir[2]}`
          this.$refs[ref]?.[0]?.focus()
          e.preventDefault()
        }
      },
      configuracionPlanilla() {
        this.criteriosEvaluacion = {
          SABER: {
            cantidadNotas: 2,
            tipoCalculo: 1, // 1 = promedio, 2 = ponderado
            porcentaje: 25,
            porcentajesNotas: [] // solo si tipoCalculo = 2
          },
          HACER: {
            cantidadNotas: 5,
            tipoCalculo: 2,
            porcentaje: 50,
            porcentajesNotas: [10, 20, 20, 25, 25]
          },
          SER: {
            cantidadNotas: 10,
            tipoCalculo: 1,
            porcentaje: 25,
            porcentajesNotas: []
          }
        }
      },
      guardarNotas() {
        const payload = this.listaEstudiantes.map(est => {
          return {
            idMatricula: est.idMatricula,
            idAsignaturaCurso: this.idAsignaturaCurso,
            periodo: this.periodoActual,
            criterios: Object.entries(this.criteriosEvaluacion).map(([criterio, config]) => ({
              criterio,
              notas: est.notas[criterio],
              subtotal: est.subtotales[criterio]
            })),
            notaFinal: est.notaFinal
          }
        })
        console.log('📦 Respuesta API:', JSON.stringify(payload))
        /*
        fetch('https://tuservidor.com/api/notas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })
        .then(res => {
          if (!res.ok) throw new Error('Error al guardar')
          return res.json()
        })
        .then(data => {
          alert('✅ Notas guardadas correctamente')
          console.log('📦 Respuesta API:', data)
        })
        .catch(err => {
          console.error('❌ Error al guardar notas:', err)
          alert('⚠️ Hubo un problema al guardar las notas')
        })
        */
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
              this.listaEstudiantes.forEach(est => {
                est.notas = {}
                est.subtotales = {}
                est.notaFinal = 0
                Object.entries(this.criteriosEvaluacion).forEach(([criterio, config]) => {
                  est.notas[criterio] = Array(config.cantidadNotas).fill(null)
                  est.subtotales[criterio] = 0
                })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Lista Curso. Intente más tarde.' + err)
        })
      },
      async ocuparAsignaturasCurso() {
        this.comboAsignaturasCurso = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/asignacioncurso', {params: {idCurso: this.idCurso, idInstitucion: this.$store.state.idInstitucion}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista asignaturas curso')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboAsignaturasCurso.push({ 'value': element.idAsignaturaCurso, 'text': element.asignatura.toUpperCase() })
              })
            }
          }
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
        this.configuracionPlanilla()
        this.ocuparComboPeriodos()
        this.ocuparComboSedes()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>
<style scoped>
  .planilla-criterios {
    font-family: Arial, sans-serif;
    margin: 20px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
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
</style>
