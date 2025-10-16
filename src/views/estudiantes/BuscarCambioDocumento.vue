<template>
  <div>
    <b-row>
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="search" aria-hidden="true"></b-icon> BUSCAR ESTUDIANTE</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6" md="6">
                <b-form-group label="Criterio de Busqueda*" label-for="texto" class="etiqueta">
                  <b-form-input id="texto" ref="texto" v-model.trim="$v.buscarTexto.textoBusqueda.$model" :state="validateStateT('textoBusqueda')" aria-describedby="feedTextoB" autocomplete="off" maxlength="50" v-on:keyup.enter="buscarEstudiante()" autofocus></b-form-input>
                  <b-form-invalid-feedback id="feedTextoB" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
                <p>
                  Realice la busqueda de un estudiante digitando el número de documento sin puntos ni comas o digitando el nombre y/o apellido del estudiante.
                </p>
              </b-col>
              <b-col lg="6" md="6">
                <br>
                <b-button class="small mt-1" variant="primary" @click="buscarEstudiante()">Buscar Estudiante</b-button>
              </b-col>
            </b-row>
            <b-row v-if="listaEstudiantes.length">
              <b-col lg="12"><hr></b-col>
              <b-col lg="12">
                <vue-good-table :columns="encabColumnas" :rows="listaEstudiantes" styleClass="vgt-table condensed bordered striped" :line-numbers="true"
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
                    <span v-if="props.column.field == 'estudiante'">
                      <span v-if="props.row.estado=='RETIRADO'" style="font-weight: bold; color: white; cursor: pointer" @click="verMatricula(props.row)">{{props.row.estudiante}}</span> 
                      <span v-else style="font-weight: bold; color: blue; cursor: pointer" @click="verMatricula(props.row)">{{props.row.estudiante}}</span> 
                    </span>
                  </template>
                  <div slot="emptystate">
                    <h5 class="text-danger ml-5">No se encontraron estudiantes</h5>
                  </div>
                </vue-good-table>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <div class="float-right text-medium-emphasis text-info">* Campo requerido</div>
            <div>
              <b-button class="small ml-3" variant="secondary" @click="cancelarFormulario">Cerrar</b-button>
            </div>
          </template>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import { validationMixin } from "vuelidate";
  import { required, minLength } from "vuelidate/lib/validators";
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'

  export default {
    name: 'buscarcambiodocumento',
    mixins: [validationMixin],
    components: {
      VueGoodTable
    },
    data () {
      return {
        buscarTexto: {
          textoBusqueda: null,
        },
        listaEstudiantes: [],
        encabColumnas : [
          { label: 'Apellidos y Nombres del Estudiante', field: 'estudiante', tdClass: this.tdClassFunc, sortable: true },
          { label: 'Documento', field: 'documento', tdClass: this.tdClassFunc, sortable: false },
          { label: 'Sede', field: 'sede', tdClass: this.tdClassFunc, sortable: true },
          { label: 'Grado', field: 'grado', tdClass: this.tdClassFunc, sortable: true },
          { label: 'Curso', field: 'nomenclatura', tdClass: this.tdClassFunc, sortable: true },
          { label: 'Jornada', field: 'jornada', tdClass: this.tdClassFunc, sortable: true },
          { label: 'Estado', field: 'estado', tdClass: this.tdClassFunc, sortable: true },
          //{ label: '', field: 'idMatricula', sortable: false }
        ]
      }
    },
    validations: {
      buscarTexto: {
        textoBusqueda: { required, minLength: minLength(0) }
      }
    },
    methods: {
      verMatricula(fila) {
        //alert(JSON.stringify(fila))
        this.$store.commit('set', ['idMatricula', fila.idMatricula])
        this.$router.push('/estudiantes/CambiarDocumento')
      },
      async buscarEstudiante() {
        this.listaEstudiantes = []
        this.$v.buscarTexto.$touch()
        if (this.$v.buscarTexto.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'El criterio de busqueda esta vacio.')
          this.$refs.texto.focus()
          return false
        } else {
          await axios
          .get(CONFIG.ROOT_PATH + 'academico/buscarestudiante/carpetamatricula', { params: { texto: this.buscarTexto.textoBusqueda, idInstitucion: this.$store.state.idInstitucion, vigencia: this.$store.state.aLectivo }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Buscar carpeta estudiante')
            } else{
              if (response.data.datos != 0) {
                this.listaEstudiantes = response.data.datos
                //console.log(JSON.stringify(this.listaEstudiantes))
              } else {
                this.mensajeEmergente('info',CONFIG.TITULO_MSG,'No se encontraron estudiantes en la busqueda.')
              }
            }
          })
          .catch(err => {
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Buscar carpeta estudiante. Intente más tarde. ' + err)
          })
        }
        return true
      },
      validateStateT(name) {
        const { $dirty, $error } = this.$v.buscarTexto[name]
        return $dirty ? !$error : null
      },
      tdClassFunc(row) {
        if (row.estado == 'RETIRADO') { 
          return 'text-white bg-danger' 
        }
      },
      cancelarFormulario() {
        this.$router.push('/')
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      if(this.$store.state.idRol == 1 || this.$store.state.idRol == 12 || this.$store.state.perMatricular == 1) {
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>