<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> DIRECTORIO DE DOCENTES</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
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
                        <table border="1" cellspacing="0" cellpadding="1" responsive class="tabla-docentes">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Docente</th>
                              <th v-for="campo in camposSeleccionados" :key="campo">
                                {{ convertirTitulo(campo) }}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(docente, index) in listaDocentes" :key="index">
                              <td>{{ index + 1 }}</td>
                              <td>{{ docente.docente }}</td>
                              <td v-for="campo in camposSeleccionados" :key="campo">
                                {{ docente[campo] }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div style="margin-bottom: 1rem">
                          <b-button class="small mx-1 mt-3" variant="primary" @click="imprimir">Imprimir Directorio</b-button>
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
    name: 'directorio',
    props: {
    },
    components: {
    },
    data () {
      return {
        camposSeleccionados: [],
        listaDocentes: [],
        btnCargando: false,
        datosSeccion: {},
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
          estado: 'Estado',
          mdir: 'Municipio'
        }
        return mapa[campo] || campo
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
        let tituloInforme = 'DIRECTORIO DE DOCENTES'
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
            padding: 6px;
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
      exportarAExcel() {
        const tabla = document.querySelector('table')
        const wb = XLSX.utils.table_to_book(tabla)
        XLSX.writeFile(wb, 'DirectorioDocentes.xlsx')
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    computed: {
    },
    beforeMount() {
      this.datosSeccion = this.$store.state.datosSecciones[this.$store.state.idSeccion - 1]
      this.generarListadoDocentes()
      this.camposSeleccionados= ['direccion','mdir','telefono1','telefono2','correo','estado']
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
</style>
