<template>
  <div>
    <b-row>
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="search" aria-hidden="true"></b-icon> BUSCAR ACUDIENTE</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6" md="6">
                <b-form-group label="Criterio de Busqueda*" label-for="texto" class="etiqueta">
                  <b-form-input id="texto" ref="texto" v-model.trim="$v.buscarTexto.textoBusqueda.$model" :state="validateStateT('textoBusqueda')" aria-describedby="feedTextoB" autocomplete="off" maxlength="50" v-on:keyup.enter="buscarAcudiente()" autofocus></b-form-input>
                  <b-form-invalid-feedback id="feedTextoB" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
                <p>
                  Realice la busqueda de un Acudiente digitando el número de documento sin puntos ni comas o digitando el nombre y/o apellido del Acudiente.
                </p>
              </b-col>
              <b-col lg="6" md="6">
                <br>
                <b-button class="small mt-1" variant="primary" @click="buscarAcudiente()">Buscar Acudiente</b-button>
              </b-col>
            </b-row>
            <b-row v-if="listaPersonas.length">
              <b-col lg="12"><hr></b-col>
              <b-col lg="12">
                <vue-good-table :columns="encabColumnas" :rows="listaPersonas" styleClass="vgt-table condensed bordered striped" :line-numbers="true"
                  :search-options="{enabled: true,placeholder: 'Buscar...'}"
                  :pagination-options="{
                    enabled: true,
                    mode: 'records',
                    perPage: 25,
                    position: '',
                    perPageDropdown: [50, 100, 150, 200],
                    dropdownAllowAll: false,
                    setCurrentPage: 1,
                    nextLabel: 'Siguiente',
                    prevLabel: 'Anterior',
                    rowsPerPageLabel: 'Filas por página',
                    ofLabel: 'de',
                    pageLabel: 'Página', // for 'pages' mode
                    allLabel: 'Todo',
                    //infoFn: (params) => `my own page ${params.firstRecordOnPage}`, 
                  }">
                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'idPersona'">
                      <span style="font-weight: bold; color: blue; cursor: pointer" @click="consultaEstudiantes(props.row)" title="Ver Estudiantes"><CIcon name="cilZoom"/></span>
                    </span>
                  </template>
                  <div slot="emptystate">
                    <h5 class="text-danger ml-5">No se encontraron Acudientes</h5>
                  </div>
                </vue-good-table>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <div class="float-right text-medium-emphasis text-info">* Campo requerido</div>
          </template>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalVerEstudiantesAcudiente" size="xl" scrollable hide-footer title="Estudiantes por Acudiente" ok-only>
      <div ref="contenido" class="mx-3">
        <div class="encabezado">
          <p>SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA<br><b>{{$store.state.nombreInstitucion}}</b><br>TUNJA - BOYACÁ<br>LISTAS DE ESTUDIANTES POR ACUDIENTE<br>Acudiente: {{acudiente}}</p>
        </div>
        <table class="tabla-estudiantes" id="tablaEst" name="tablaEst">
          <thead>
            <tr>
              <th>#</th>
              <th>Estudiante</th>
              <th>Sede</th>
              <th>Curso</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(est, i) in estudiantesAcudiente()" :key="i">
              <td>{{ i + 1 }}</td>
              <td><span v-if="est.estadoActual == 2" style="color: #9C2007">[R] {{ est.estudiante }}</span><span v-else>{{ est.estudiante }}</span></td>
              <td>{{ est.sede }}</td>
              <td>{{ est.curso }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div><hr></div>
      <div style="margin-bottom: 1rem">
        <b-button class="small mx-1 mt-3" variant="primary" @click="imprimir">Imprimir</b-button>
        <b-button class="small mx-1 mt-3" variant="outline-primary" @click="exportarAExcel">Exportar a Excel</b-button>
        <b-button class="small mx-1 mt-3" variant="secondary" @click="cancelarFormulario">Cerrar</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import { validationMixin } from "vuelidate";
  import { required, minLength } from "vuelidate/lib/validators";
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'
  import * as XLSX from 'xlsx'

  export default {
    name: 'listasporacudiente',
    mixins: [validationMixin],
    components: {
      VueGoodTable
    },
    data () {
      return {
        idAcudiente: null,
        acudiente: null,
        buscarTexto: {
          textoBusqueda: null,
        },
        listaPersonas: [],
        encabColumnas : [
          { label: 'Nombre del Acudiente', field: 'persona', sortable: true },
          { label: 'Documento', field: 'documento', sortable: false },
          { label: '', field: 'idPersona', sortable: false }
        ]
      }
    },
    validations: {
      buscarTexto: {
        textoBusqueda: { required, minLength: minLength(0) }
      }
    },
    methods: {
      imprimir() {
        let fecha = 'Fecha: ' + new Date().toLocaleString()
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
              margin-bottom: 1px;
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
                margin-bottom: 1px;
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
        const ventana = window.open('Lista por Acudiente', '_blank')
        ventana.document.write(`
          <html>
            <head><title>Lista por Acudiente</title>${estilos}</head>
            <body">${contenido}</body>
            <div style="text-align: right; font-size: 12px;"><i>${fecha}</i></div>
          </html>
        `)
        ventana.document.close()
        ventana.print()
      },
      exportarAExcel() {
        const tabla = document.getElementById('tablaEst')
        const wb = XLSX.utils.table_to_book(tabla)
        XLSX.writeFile(wb, 'ListaporAcudiente.xlsx')
      },
      estudiantesAcudiente() {
        //console.log(JSON.stringify(this.$store.state.datosDataEstudiantes))
        return this.$store.state.datosDataEstudiantes.filter(e =>
          e.idAcudiente == this.idAcudiente &&
          (!this.retirados ? e.estadoActual == 1 : true)
        )
      },
      consultaEstudiantes(fila) {
        this.acudiente = fila.persona
        this.idAcudiente = fila.idAcudiente
        this.$refs['modalVerEstudiantesAcudiente'].show()
      },
      async buscarAcudiente() {
        this.listaPersonas = []
        this.$v.buscarTexto.$touch()
        if (this.$v.buscarTexto.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'El criterio de busqueda esta vacio.')
          this.$refs.texto.focus()
          return false
        } else {
          await axios
          .get(CONFIG.ROOT_PATH + 'academico/buscarpersona/acudiente', { params: { texto: this.buscarTexto.textoBusqueda }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Buscar acudiente')
            } else{
              if (response.data.datos != 0) {
                this.listaPersonas = response.data.datos
                //console.log(JSON.stringify(this.listaPersonas))
              } else {
                this.mensajeEmergente('info',CONFIG.TITULO_MSG,'No se encontraron registros en la busqueda.')
              }
            }
          })
          .catch(err => {
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Buscar acudiente. Intente más tarde. ' + err)
          })
        }
        return true
      },
      validateStateT(name) {
        const { $dirty, $error } = this.$v.buscarTexto[name]
        return $dirty ? !$error : null
      },
      cancelarFormulario () {
        this.$refs['modalVerEstudiantesAcudiente'].hide()
      },
      tdClassFunc(row) {
        if (row.id_estado_actual == 2) { 
          return 'text-danger' 
        }
        if (row.id_estado_actual == 3 || row.id_estado_actual == 4) { 
          return 'text-warning' 
        }
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
    }
  }
</script>
<style scoped>
  .encabezado {
    text-align: center;
    font-size: 13px;
  }
  .tabla-estudiantes {
    font-family: 'Segoe UI', sans-serif;
    margin: 5px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    margin-bottom: 1px;
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
