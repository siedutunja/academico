<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> LISTADO GENERAL DE DOCENTES</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="4">
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
                          <h5>Genero:</h5>
                          <b-row class="m-1">
                            <b-col lg="12">
                              <b-form-select id="idgenero" ref="idgenero" v-model="idGenero" :options="comboGeneros"></b-form-select>
                            </b-col>
                          </b-row>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-col>
              <b-col lg="8">
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
                        <h3>Listado de Docentes</h3>
                        <table border="1" cellspacing="0" cellpadding="1" responsive class="tabla-docentes">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Docente</th>
                              <th v-for="campo in camposSeleccionados" :key="campo">
                                {{ convertirTitulo(campo) }}
                              </th>
                              <th v-for="colum in numeroColumnas" :key="colum" style="width: 10%"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(docente, index) in docentesFiltrados" :key="index">
                              <td>{{ index + 1 }}</td>
                              <td>{{ docente.docente }}</td>
                              <td v-for="campo in camposSeleccionados" :key="campo">
                                {{ docente[campo] }}
                              </td>
                              <td v-for="colum in numeroColumnas" :key="colum"></td>
                            </tr>
                          </tbody>
                        </table>
                        <div style="margin-bottom: 1rem">
                          <b-button class="small mx-1 mt-3" variant="primary" @click="imprimir">Imprimir Listado</b-button>
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
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import * as XLSX from 'xlsx'

  export default {
    name: 'listageneral',
    props: {
    },
    components: {
    },
    data () {
      return {
        campos: [],
        camposSeleccionados: [],
        listaDocentes: [],
        btnCargando: false,
        datosSeccion: {},
        comboNumeroColumnas: [],
        numeroColumnas: null,
        idGenero: null,
        comboGeneros: [],
      }
    },
    methods: {
      convertirTitulo(campo) {
        // Convierte nombres técnicos a títulos legibles
        const mapa = {
          documento: 'Documento',
          direccion: 'Dirección',
          correo: 'Correo',
          telefono1: 'Tel1',
          telefono2: 'Tel2',
          genero: 'Gén',
          estado: 'Estado',
          tipodoc: 'Tip',
          fnace: 'F.Nace',
          edad: 'Edad',
          mexp: 'Lugar Exp.',
          escalafon: 'Esca',
          titulo: 'Título',
          rh: 'Rh',
          mdir: 'Municipio'
        }
        return mapa[campo] || campo.toUpperCase()
      },
      async generarListadoDocentes() {
        this.btnCargando = true
        this.listaDocentes = []
        await axios
        .get(CONFIG.ROOT_PATH + 'docentes/listageneral', { params: { idInstitucion: this.$store.state.idInstitucion }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Lista General Docentes')
            this.btnCargando = false
          } else{
            if (response.data.datos != 0) {
              this.listaDocentes = response.data.datos
              this.listaDocentes.forEach(element => {
                element.edad = this.calcularEdad(element.fnace) + " Años"
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Lista General Docentes. Intente más tarde.' + err)
          this.btnCargando = false
        })
        //console.log(JSON.stringify(this.listaDocentes))
        this.btnCargando = false
      },
      imprimir() {
        let fecha = 'Fecha: ' + new Date().toLocaleString()
        let tituloInforme = 'LISTA GENERAL DE DOCENTES'
        const contenido = document.querySelector('table').outerHTML
        const ventana = window.open("Docentes", "_blank")
        ventana.document.write(`<html><head><title>Docentes</title></head>
        <style scoped>
          .tabla-docentes {
            font-family: Arial, sans-serif;
            margin: 5px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 2px;
            text-align: left;
          }
          thead {
            background-color: #f0f8ff;
          }
        </style>
          <body class="container">
            <p style="text-align: center; font-size: 12px;">SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA<br><b>${this.$store.state.nombreInstitucion}</b><br>TUNJA - BOYACÁ<br>${tituloInforme}<br>Año Lectivo ${this.$store.state.aLectivo}</p>
            ${contenido}
            <div style="text-align: right; font-size: 12px;"><i>${fecha}</i></div>
          </body>
        </html>`)
        ventana.document.close()
        ventana.print()
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
        const tabla = document.querySelector('table')
        const wb = XLSX.utils.table_to_book(tabla)
        XLSX.writeFile(wb, 'ListaDocentes.xlsx')
      },
      ocuparCombos() {
        this.comboGeneros = []
        this.comboGeneros.push({ 'value': null, 'text': 'TODOS' })
        this.$store.state.datosTablas.generos.forEach(element => {
          this.comboGeneros.push({ 'value': element.id, 'text': element.genero.toUpperCase() })
        })
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    computed: {
      docentesFiltrados() {
        return this.listaDocentes.filter(doc => {
          const porGenero = this.idGenero ? doc.genero === this.idGenero : true
          return porGenero
        })
      },
    },
    beforeMount() {
      this.datosSeccion = this.$store.state.datosSecciones[this.$store.state.idSeccion - 1]
      this.generarListadoDocentes()
      this.ocuparCombos()
      this.campos= [
        { value: 'docente', text: 'Apellidos y Nombres', disabled: true },
        { value: 'tipodoc', text: 'Tipo Documento' },
        { value: 'documento', text: 'Documento' },
        { value: 'mexp', text: 'Municipio de Expedición'},
        { value: 'fnace', text: 'Fecha de Nacimiento' },
        { value: 'edad', text: 'Edad'},
        { value: 'genero', text: 'Genero'},
        { value: 'rh', text: 'Grupo Sanguineo - Rh'},
        { value: 'direccion', text: 'Dirección Residencia'},
        { value: 'mdir', text: 'Municipio Residencia'},
        { value: 'telefono1', text: 'Telefono 1'},
        { value: 'telefono2', text: 'Telefono 2'},
        { value: 'correo', text: 'Correo'},
        { value: 'escalafon', text: 'Escalafón'},
        { value: 'titulo', text: 'Último Título'},
        { value: 'estado', text: 'Estado'},
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
      this.numeroColumnas = 0
    }
  }
</script>
<style scoped>
  .tabla-docentes {
    font-family: Arial, sans-serif;
    margin: 5px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  th, td {
    border: 1px solid #ccc;
    padding: 6px;
    text-align: left;
  }
  thead {
    background-color: #f0f8ff;
  }
  .filtros {
    display: flex;
    gap: 20px;
    margin-bottom: 15px;
  }
  .filtros label {
    font-size: 13px;
  }
  .filtros select {
    margin-left: 5px;
  }
</style>
