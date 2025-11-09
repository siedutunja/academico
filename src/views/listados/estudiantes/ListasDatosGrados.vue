<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> LISTAS DE ESTUDIANTES POR GRADO</h5>
          </template>
          <b-card-text>
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
            <b-row>
              <b-col lg="9">
                <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                  <b-form-select id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="listarGradosSede(),gradosConsultados=null"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="3" class="mt-2">
                <b-button class="small mx-1 mt-4" variant="success" @click="seleccionarGrados()" :disabled="idSede!=null ? false : true">Seleccionar Grados</b-button>
              </b-col>
            </b-row>
            <b-row v-if="gradosConsultados">
              <b-col lg="12"><hr></b-col>
              <b-col lg="3">
                <b-card bg-variant="light" text-variant="">
                  <b-card-text>
                    <b-row>
                      <b-col lg="12">
                        <b-form-group>
                          <h5>Datos a adicionar:</h5>
                          <b-form-checkbox class="ml-4 m-2" v-for="campo in campos" v-model="camposSeleccionados" :key="campo.value" :value="campo.value" :disabled="campo.disabled">
                            {{ campo.text }}
                          </b-form-checkbox>
                        </b-form-group>
                        <!--<div>ORDEN DE LOS CAMPOS SELECCIONADOS: <strong>{{ camposSeleccionados }}</strong></div>-->
                      </b-col>
                    </b-row>
                    <b-row><b-col lg="12"><hr></b-col></b-row>
                    <b-row>
                      <b-col lg="12">
                        <b-form-group>
                          <h5>Genero:</h5>
                          <b-row class="m-1">
                            <b-col lg="12">
                              <b-form-select id="idgenero" ref="idgenero" v-model="idGenero" :options="comboGeneros"></b-form-select>
                            </b-col>
                          </b-row>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col lg="12">
                        <b-form-group>
                          <h5>Columnas Adicionales:</h5>
                          <b-row class="m-1">
                            <b-col lg="12">
                              <b-form-select id="numCol" ref="numCol" v-model="numeroColumnas" :options="comboNumeroColumnas"></b-form-select>
                            </b-col>
                          </b-row>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col lg="12">
                        <b-form-group>
                          <h5>Área para las Columnas:</h5>
                          <b-row class="m-1">
                            <b-col lg="12">
                              <b-form-select id="porcentajeArea" ref="porcentajeArea" v-model="porcentajeArea" :options="comboPorcentajeArea"></b-form-select>
                            </b-col>
                          </b-row>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col lg="12">
                        <b-form-group>
                          <h5>Retirados:</h5>
                          <b-form-checkbox id="estRetirados" ref="estRetirados" class="ml-4 m-3" v-model="retirados" name="check-button" switch>
                            <span class="ml-2">Listar estudiantes retirados</span>
                          </b-form-checkbox>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-col>
              <b-col lg="9">
                <b-card>
                  <b-card-text>
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
                    <b-row v-if="!btnCargando">
                      <b-col lg="12">
                        <div style="margin-bottom: 1rem">
                          <b-button class="small mx-1 mt-3" variant="primary" @click="imprimir">Imprimir</b-button>
                          <b-button class="small mx-1 mt-3" variant="outline-primary" @click="exportarAExcel">Exportar a Excel</b-button>
                        </div>
                        <div><hr></div>
                        <div class="informe-estudiantes">
                          <div ref="contenido">
                            <div v-for="(grado, index) in gradosSeleccionados" :key="grado.idGrado" class="bloque-grado">
                              <div class="encabezado">
                                <p>SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA<br><b>{{$store.state.nombreInstitucion}}</b><br>TUNJA - BOYACÁ<br>LISTAS DE ESTUDIANTES POR GRADO<br></p>
                              </div>
                              <table class="tabla-estudiantes">
                                <thead>
                                  <tr>
                                    <th>Sede: <b>{{ grado.sede }}</b></th>
                                    <th>Grado: <b>{{ grado.grado }}</b></th>
                                    <th>Año: <b>{{ $store.state.aLectivo }}</b></th>
                                  </tr>
                                </thead>
                              </table>
                              <table class="tabla-estudiantes" style="margin-top: -20px">
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>Estudiante</th>
                                    <th v-for="campo in camposSeleccionados" :key="campo">
                                      {{ convertirTitulo(campo) }}
                                    </th>
                                    <th v-for="colum in numeroColumnas" :key="colum" :style="'width: ' + porcentajeArea/numeroColumnas + '%'"></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="(est, i) in estudiantesPorGrado(grado.idGrado)" :key="i">
                                    <td>{{ i + 1 }}</td>
                                    <td><span v-if="est.estadoActual == 2" style="color: #9C2007">[R] {{ est.estudiante }}</span><span v-else>{{ est.estudiante }}</span></td>
                                    <td v-for="campo in camposSeleccionados" :key="campo">
                                      {{ est[campo] }}
                                    </td>
                                    <td v-for="colum in numeroColumnas" :key="colum"></td>
                                  </tr>
                                </tbody>
                              </table>
                              <p style="text-align: right; margin-top: -20px; font-size: 11px;" class="text-muted"><i>{{ fechaImpresion }}</i></p>
                              <div v-if="index < gradosSeleccionados.length - 1" class="page-break"></div>
                            </div>
                          </div>
                        </div>
                        <div><hr></div>
                        <div style="margin-bottom: 1rem">
                          <b-button class="small mx-1 mt-3" variant="primary" @click="imprimir">Imprimir</b-button>
                          <b-button class="small mx-1 mt-3" variant="outline-primary" @click="exportarAExcel">Exportar a Excel</b-button>
                        </div>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalSeleccionarGrados" size="xl" scrollable hide-footer title="Seleccionar Grados" ok-only>
      <div class="mx-3">
        <div>
          <vue-good-table ref="graditos" :columns="encabColumnasGrados" :rows="listaGrados" styleClass="vgt-table condensed bordered striped" :line-numbers="true" :search-options="{enabled: true,placeholder: 'Filtrar grados...'}"
            :select-options="{enabled: true,selectionText: 'grados seleccionados',clearSelectionText: 'Limpiar',}">
            <template #selected-row-actions>
              <button class="small btn btn-success" @click="procesarListasGrados()">Seleccionar >></button>
            </template>
            <div slot="emptystate">
              <h5 class="text-danger ml-5">No existen Grados en la Sede</h5>
            </div>
          </vue-good-table>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'
  import * as XLSX from 'xlsx'

  export default {
    name: 'listasdatosgrados',
    props: {
    },
    components: {
      VueGoodTable
    },
    data () {
      return {
        campos: [],
        camposSeleccionados: [],
        dataConsultada: [],
        btnCargando: false,
        datosSeccion: {},
        comboNumeroColumnas: [],
        numeroColumnas: null,
        porcentajeArea: null,
        comboPorcentajeArea: [],
        idGenero: null,
        comboGeneros: [],
        idSede: null,
        comboSedes: [],
        nombreSede: null,
        gradosConsultados: false,
        listaGrados: [],
        encabColumnasGrados: [
          { label: 'Grado', field: 'grado' },
          //{ label: '', field: 'idGrado', sortable: false }
        ],
        gradosSeleccionados: [],
        fechaImpresion: null,
        retirados: false,
      }
    },
    methods: {
      estudiantesPorGrado(idGrado) {
        //return this.dataConsultada.filter(e => e.idGrado === idGrado)
        return this.dataConsultada.filter(e =>
          e.idGrado == idGrado &&
          (this.idGenero ? e.genero === this.idGenero : true) &&
          (!this.retirados ? e.estadoActual == 1 : true)
        )
      },
      convertirTitulo(campo) {
        const mapa = {
          tipodoc: 'Tipo',
          documento: 'Documento',
          mexp: 'MunExp',
          fnace: 'FecNaceEst',
          mnace: 'MunNaceEst',
          edad: 'Edad',
          genero: 'Gen',
          pais: 'País',
          rh: 'Rh',
          estrato: 'Estra',
          sisben: 'Sisben',
          discapacidad: 'Discap',
          capacidad: 'CapaExcep',
          trastorno: 'Trastorno',
          apoyo: 'Apoyo',
          etnia: 'Etnia',
          victima: 'Victima',
          eps: 'Eps',
          dirE: 'DirecciónEst',
          mdirE: 'MunDirEst',
          barrio: 'BarrioEst',
          zona: 'ZonaEst',
          telefono1: 'Tel1Est',
          telefono2: 'Tel2Est',
          correo: 'CorreoEst',
          especialidad: 'Espec',
          nuevo: 'Nuevo',
          procedencia: 'Procedencia',
          repitente: 'Rep',
          ruta: 'Ruta',
          inclusion: 'Inclusión',
          codigo: 'CodEst',
          papa: 'Papá',
          documentoP: 'DocumPapá',
          fnaceP: 'NacePapá',
          direccionP: 'DirecciónPapá',
          mdirP: 'MunDirPapá',
          barrioP: 'BarrioPapá',
          telefono1P: 'Tel1Papá',
          telefono2P: 'Tel2Papá',
          correoP: 'CorreoPapá',
          ocupacionP: 'OcupaciónPapá',
          mama: 'Mamá',
          documentoM: 'DocumMamá',
          fnaceM: 'NaceMamá',
          direccionM: 'DireccionMamá',
          mdirM: 'MunDirMamá',
          barrioM: 'BarrioMamá',
          telefono1M: 'Tel1Mamá',
          telefono2M: 'Tel2Mamá',
          correoM: 'CorreoMamá',
          ocupacionM: 'OcupaciónMamá',
          acudiente: 'Acudiente',
          documentoA: 'DocumAcudiente',
          fnaceA: 'NaceAcudiente',
          direccionA: 'DirAcudiente',
          mdirA: 'MunDirAcudiente',
          barrioA: 'BarrioAcudiente',
          telefono1A: 'Tel1Acudiente',
          telefono2A: 'Tel2Acudiente',
          correoA: 'CorreoAcudiente',
          ocupacionA: 'OcupaciónAcudiente',
        }
        return mapa[campo] || campo.toUpperCase()
      },
      imprimir() {
        const contenido = this.$refs.contenido.innerHTML
        const estilos = `
          <style>
            .encabezado {
              text-align: center;
              font-size: 13px;
            }
            .informe-estudiantes {
              font-family: 'Segoe UI', sans-serif;
              margin: 5px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              font-size: 13px;
              margin-bottom: 20px;
            }
            th, td {
              border: 1px solid #999;
              padding: 3px;
              text-align: left;
            }
            thead {
              background-color: #f0f4fa;
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
        `
        const ventana = window.open('Listas por Grado', '_blank')
        ventana.document.write(`
          <html>
            <head><title>Listado de Estudiantes</title>${estilos}</head>
            <body">${contenido}</body>
          </html>
        `)
        ventana.document.close()
        ventana.print()
      },
      procesarListasGrados() {
        this.gradosConsultados = true
        this.gradosSeleccionados = this.$refs.graditos.selectedRows
        this.cargarDataEstudiantes()
        this.$refs['modalSeleccionarGrados'].hide()
      },
      seleccionarGrados() {
        this.$refs['modalSeleccionarGrados'].show()
      },
      calcularEdad(fecha) {
        var hoy = new Date()
        var cumpleanos = new Date(fecha)
        var edad = hoy.getFullYear() - cumpleanos.getFullYear()
        var m = hoy.getMonth() - cumpleanos.getMonth()
        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--
        }
        return edad
      },
      exportarAExcel() {
        const libro = XLSX.utils.book_new()
        this.gradosSeleccionados.forEach(grado => {
          const estudiantes = this.estudiantesPorGrado(grado.idGrado)
          const datos = estudiantes.map((e, i) => {
            const fila = { '#': i + 1, Estudiante: e.estudiante }
            this.camposSeleccionados.forEach(campo => {
              fila[this.convertirTitulo(campo)] = e[campo] ?? ''
            })
            return fila
          })
          const hoja = XLSX.utils.json_to_sheet(datos)
          XLSX.utils.book_append_sheet(libro, hoja, grado.grado.slice(0, 31))
        })
        XLSX.writeFile(libro, 'Listado Estudiantes Grado.xlsx')
      },
      listarGradosSede() {
        this.listaGrados = []
        this.nombreSede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
        this.$store.state.datosGrados.forEach(element => {
          if (element.id_sede == this.idSede) {
            this.listaGrados.push({ idGrado: element.id, grado: element.grado.toUpperCase(), sede: element.sede })
          }
        })
        //console.log(JSON.stringify(this.listaGrados))
      },
      async ocuparComboSedes() {
        this.comboSedes = []
        this.$store.state.datosSedes.forEach(element => {
          this.comboSedes.push({ 'value': element.id, 'text': element.sede.toUpperCase() })
        })
      },
      ocuparCombos() {
        this.comboGeneros = []
        this.comboGeneros.push({ 'value': null, 'text': 'TODOS' })
        this.$store.state.datosTablas.generos.forEach(element => {
          this.comboGeneros.push({ 'value': element.id, 'text': element.genero.toUpperCase() })
        })
      },
      async cargarDataEstudiantes() {
        this.btnCargando = true
        let cursillos = []
        this.gradosSeleccionados.forEach(element => {
          cursillos.push(element.idGrado)
        })
        let arraySinDuplicados = cursillos.filter((valor, indice, self) => {
          return self.indexOf(valor) === indice;
        })
        cursillos = arraySinDuplicados
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/data/estudiantes/grados/campos', { params: { idInstitucion: this.$store.state.idInstitucion, vigencia: this.$store.state.aLectivo, cursos: JSON.stringify(cursillos) }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Estudiantes')
            this.btnCargando = false
          } else{
            if(response.data.datos != 0) {
              this.dataConsultada = response.data.datos
              this.dataConsultada.forEach(element => {
                element.edad = this.calcularEdad(element.fnace) + " Años"
              })
              this.btnCargando = false
            } else {
              this.dataConsultada = []
              this.btnCargando = false
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Algo salio mal y no se pudo realizar: Consulta Data Estudiantes. Intente más tarde.' + err)
          this.btnCargando = false
        })
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    computed: {
    },
    beforeMount() {
      this.datosSeccion = this.$store.state.datosSecciones[this.$store.state.idSeccion - 1]
      this.fechaImpresion = 'Fecha: ' + new Date().toLocaleString()
      this.ocuparCombos()
      this.ocuparComboSedes()
      this.campos= [
        { value: 'estudiante', text: 'Estudiante', disabled: true },
        { value: 'tipodoc', text: 'Tipo Documento' },
        { value: 'documento', text: 'Documento' },
        { value: 'mexp', text: 'Municipio de Expedición'},
        { value: 'fnace', text: 'Fecha de Nacimiento' },
        { value: 'mnace', text: 'Municipio de Nacimiento' },
        { value: 'edad', text: 'Edad'},
        { value: 'genero', text: 'Genero'},
        { value: 'pais', text: 'País Nacimiento'},
        { value: 'rh', text: 'Grupo Sanguineo - Rh'},
        { value: 'estrato', text: 'Estrato'},
        { value: 'sisben', text: 'Sisben'},
        { value: 'discapacidad', text: 'Discapacidad'},
        { value: 'capacidad', text: 'Capacidad Excepcional'},
        { value: 'trastorno', text: 'Trastorno del Aprendizaje'},
        { value: 'apoyo', text: 'Apoyo Académico Especial'},
        { value: 'etnia', text: 'Grupo Étnico'},
        { value: 'victima', text: 'Victima del Conflicto'},
        { value: 'eps', text: 'Eps'},
        { value: 'dirE', text: 'Dirección'},
        { value: 'mdirE', text: 'Municipio Dirección'},
        { value: 'barrio', text: 'Barrio'},
        { value: 'zona', text: 'Zona'},
        { value: 'telefono1', text: 'Teléfono 1'},
        { value: 'telefono2', text: 'Teléfono 2'},
        { value: 'correo', text: 'Correo'},
        { value: 'especialidad', text: 'Especialidad'},
        { value: 'nuevo', text: 'Estudiante Nuevo'},
        { value: 'procedencia', text: 'Procedencia'},
        { value: 'repitente', text: 'Repitencia'},
        { value: 'ruta', text: 'Ruta'},
        { value: 'inclusion', text: 'Inclusión'},
        { value: 'codigo', text: 'Código Carpeta'},
        { value: 'papa', text: 'Papá'},
        { value: 'documentoP', text: 'Documento Papá'},
        { value: 'fnaceP', text: 'Fecha Nacimiento Papá'},
        { value: 'direccionP', text: 'Direccion Papá'},
        { value: 'mdirP', text: 'Municipio Dirección Papá'},
        { value: 'barrioP', text: 'Barrio Papá'},
        { value: 'telefono1P', text: 'Teléfono1 Papá'},
        { value: 'telefono2P', text: 'Teléfono2 Papá'},
        { value: 'correoP', text: 'Correo Papá'},
        { value: 'ocupacionP', text: 'Ocupación Papá'},
        { value: 'mama', text: 'Mamá'},
        { value: 'documentoM', text: 'Documento Mamá'},
        { value: 'fnaceM', text: 'Fecha Nacimiento Mamá'},
        { value: 'direccionM', text: 'Direccion Mamá'},
        { value: 'mdirM', text: 'Municipio Dirección Mamá'},
        { value: 'barrioM', text: 'Barrio Mamá'},
        { value: 'telefono1M', text: 'Teléfono1 Mamá'},
        { value: 'telefono2M', text: 'Teléfono2 Mamá'},
        { value: 'correoM', text: 'Correo Mamá'},
        { value: 'ocupacionM', text: 'Ocupación Mamá'},
        { value: 'acudiente', text: 'Acudiente'},
        { value: 'documentoA', text: 'Documento Acudiente'},
        { value: 'fnaceA', text: 'Fecha Nacimiento Acudiente'},
        { value: 'direccionA', text: 'Direccion Acudiente'},
        { value: 'mdirA', text: 'Municipio Dirección Acudiente'},
        { value: 'barrioA', text: 'Barrio Acudiente'},
        { value: 'telefono1A', text: 'Teléfono1 Acudiente'},
        { value: 'telefono2A', text: 'Teléfono2 Acudiente'},
        { value: 'correoA', text: 'Correo Acudiente'},
        { value: 'ocupacionA', text: 'Ocupación Acudiente'},
      ]
      this.comboNumeroColumnas = [
        {'value': 0, 'text': 'Sin columnas adicionales'},
        {'value': 1, 'text': '1 columna'},
        {'value': 2, 'text': '2 columnas'},
        {'value': 3, 'text': '3 columnas'},
        {'value': 4, 'text': '4 columnas'},
        {'value': 5, 'text': '5 columnas'},
        {'value': 6, 'text': '6 columnas'},
        {'value': 7, 'text': '7 columnas'},
        {'value': 8, 'text': '8 columnas'},
        {'value': 9, 'text': '9 columnas'},
        {'value': 10, 'text': '10 columnas'},
        {'value': 11, 'text': '11 columnas'},
        {'value': 12, 'text': '12 columnas'},
        {'value': 13, 'text': '13 columnas'},
        {'value': 14, 'text': '14 columnas'},
        {'value': 15, 'text': '15 columnas'},
      ]
      this.comboPorcentajeArea = [
        {'value': 10, 'text': '10%'},
        {'value': 20, 'text': '20%'},
        {'value': 30, 'text': '30%'},
        {'value': 40, 'text': '40%'},
        {'value': 50, 'text': '50%'},
        {'value': 60, 'text': '60%'},
      ]
      this.porcentajeArea = 60
      this.numeroColumnas = 0
    }
  }
</script>
<style scoped>
  .encabezado {
    text-align: center;
    font-size: 13px;
  }
  .informe-estudiantes {
    font-family: 'Segoe UI', sans-serif;
    margin: 5px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    margin-bottom: 20px;
  }
  th, td {
    border: 1px solid #999;
    padding: 3px;
    text-align: left;
  }
  thead {
    background-color: #f0f4fa;
  }
  .page-break {
    page-break-after: always;
  }
</style>
