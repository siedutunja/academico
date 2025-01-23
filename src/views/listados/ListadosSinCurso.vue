<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> LISTAS DE ESTUDIANTES SIN CURSO</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Seleccione la Sede" label-for="sedes" class="etiqueta">
                  <b-form-select id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="ocuparlistaGradosSede()"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <div v-if="idSede!=null">
              <b-row>
                <b-col lg="12"><hr></b-col>
              </b-row>
              <b-row>
                <b-col lg="6">
                  <vue-good-table ref="graditos" :columns="encabColumnas" :rows="listaGrados" styleClass="vgt-table condensed bordered striped" :line-numbers="true"
                    :select-options="{
                        enabled: true,
                        selectionText: 'cursos seleccionados',
                        clearSelectionText: 'Limpiar',
                      }">
                    <template #selected-row-actions>
                      <button @click="imprimirListas()">Imprimir Listas</button>
                    </template>
                    <div slot="emptystate">
                      <h5 class="text-danger ml-5">No existen Cursos en la Sede</h5>
                    </div>
                  </vue-good-table>
                </b-col>
                <b-col lg="6">
                  <p>*</p>
                </b-col>
              </b-row>
            </div>
          </b-card-text>
          <template #footer>
            <em>Imprima las Listas de Estudiantes seleccionando la Sede y luego seleccionando el o los Grados.</em>
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
    name: 'listadossincurso',
    components: {
      VueGoodTable
    },
    data () {
      return {
        idSede: null,
        idCurso: null,
        comboSedes: [],
        listaGrados: [],
        encabColumnas : [
          { label: 'Grado', field: 'grado' },
        ],
        gradosSeleccionados: []
      }
    },
    methods: {
      imprimirListas() {
        this.gradosSeleccionados = []
        this.$refs.graditos.selectedRows.forEach(element => {
          this.gradosSeleccionados.push({ 'id': element.id, 'gr': element.grado, 'se': element.sede })
        });
        //console.log(JSON.stringify(this.gradosSeleccionados))
        let uri = "?datos=" + JSON.stringify(this.gradosSeleccionados) + "&ie=" + this.$store.state.nombreInstitucion + "&vigencia=" + this.$store.state.aLectivo
        let encoded = encodeURI(uri);
        //window.open("http://localhost/siedutunja/php/listas/listas-02.php" + encoded,"_blank")
        window.open("https://siedutunja.gov.co/php/listas/listas-02.php" + encoded,"_blank")
        return true
      },
      async ocuparlistaGradosSede() {
        this.listaGrados = []
        this.$store.state.datosGrados.forEach(element => {
          if (element.id_sede == this.idSede) {
            this.listaGrados.push(element)
          }
        })
        //console.log(JSON.stringify(this.$store.state.datosGrados))
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
    beforeMount() {
      this.ocuparComboSedes()
    }
  }
</script>