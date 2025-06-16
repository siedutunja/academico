<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> CERTIFICADOS</h5>
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
                  <b-form-select  id="cursos" ref="cursos" v-model="idCurso" :options="comboCursosSede" @change="consultaListaCurso()" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <div v-if="idCurso!=null">
              <b-row>
                <b-col lg="12"><hr></b-col>
              </b-row>
              <b-row>
                <b-col lg="7" class="mb-5">
                  <div>
                    <vue-good-table ref="estudia" :columns="encabColumnas" :rows="listaEstudiantesCurso" styleClass="vgt-table condensed bordered striped" :line-numbers="true"
                      :select-options="{enabled: true,selectionText: 'estudiantes seleccionados',clearSelectionText: 'Limpiar',}">
                      <template #selected-row-actions>
                        <button class="small btn btn-primary" @click="imprimirPazySalvos()">Imprimir Paz y Salvos</button>
                      </template>
                      <div slot="emptystate">
                        <h5 class="text-danger ml-5">No existen estudiantes en el curso</h5>
                      </div>
                    </vue-good-table>
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-card-text>
          <template #footer>
            <em>Imprima Paz y Salvos seleccionando la Sede, el Cursos y luego los Estudiantes.</em>
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

  export default {
    name: 'pazysalvos',
    components: {
      VueGoodTable,
    },
    data () {
      return {
        idSede: null,
        comboSedes: [],
        idCurso: null,
        comboCursosSede: [],
        camposSeleccionados: [],
        listaEstudiantesCurso: [],
        encabColumnas : [
          { label: 'Apellidos y Nombres del Estudiante', field: 'estudiante', tdClass: this.tdClassFuncE },
          { label: 'Documento', field: 'documento', tdClass: this.tdClassFuncE },
          { label: 'Estado', field: 'estado', tdClass: this.tdClassFuncE },
        ],
        estudSeleccionados: [],
        campos: [
          { value: 1, text: 'Coordinación' },
          { value: 2, text: 'Secretaría' },
          { value: 3, text: 'Almacén'},
          { value: 4, text: 'Pagaduría'},
          { value: 5, text: 'Biblioteca'},
          { value: 6, text: 'Director de Curso'},
          { value: 7, text: 'Coordinador de Sede'},
          { value: 8, text: 'Rectoría' },
        ],
      }
    },
    methods: {
      imprimirPazySalvos() {
        let sede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
        let curso = document.getElementById('cursos')[document.getElementById('cursos').selectedIndex].text
        this.estudSeleccionados = []
        this.$refs.estudia.selectedRows.forEach(element => {
          this.estudSeleccionados.push({ 'estudiante': element.estudiante, 'documento': element.documento, 'estado': element.estado })
        });
        let uri = "?estudiantes=" + JSON.stringify(this.estudSeleccionados) + "&ie=" + this.$store.state.nombreInstitucion + "&vigencia=" + this.$store.state.aLectivo + '&campos=' + JSON.stringify(this.camposSeleccionados) + "&escudo=" + this.$store.state.escudoInstitucion + "&sede=" + sede + "&curso=" + curso
        let encoded = encodeURI(uri);
        //window.open("http://localhost/siedutunja/php/documentos/pazysalvos-01.php" + encoded,"_blank")
        window.open("https://siedutunja.gov.co/php/documentos/pazysalvos-01.php" + encoded,"_blank")
        //console.log(JSON.stringify(this.estudSeleccionados))
        return true
      },
      tdClassFuncE(row) {
        if (row.id_estado_actual == 2) { 
          return 'text-danger' 
        }
      },
      async consultaListaCurso() {
        this.listaEstudiantesCurso = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/listacurso/pazysalvo', { params: { idCurso: this.idCurso }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Lista Curso')
          } else{
            if (response.data.datos != 0) {
              this.listaEstudiantesCurso = response.data.datos
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
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    computed: {
    },
    beforeMount() {
      this.ocuparComboSedes()
    }
  }
</script>