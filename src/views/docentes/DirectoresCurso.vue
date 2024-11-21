<template>
  <div>
    <b-row>
      <b-col lg="12">
        <h3 class="ml-2"><b-icon icon="filter-square" aria-hidden="true"></b-icon> DIRECTORES DE CURSO</h3>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Sedes*" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="verListaCursosSede()"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-2" v-if="idSede!=null">
      <b-col lg="12">
        <b-card >
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> LISTA DE CURSOS Y DIRECTORES .:. {{descripcionSede}}</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <vue-good-table :columns="encabColumnas" :rows="listaCursos" styleClass="vgt-table condensed bordered striped " :line-numbers="true">
                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'nomenclatura'">
                      {{props.row.nomenclatura}}
                    </span>
                    <span v-if="props.column.field == 'jornada'">
                      {{props.row.jornada}}
                    </span>
                    <span v-if="props.column.field == 'id_director'">
                      <b-form-select v-model="props.row.id_director" @change="actualizarItem(props.row)" :options="comboDocentes"></b-form-select>
                    </span>
                  </template>
                  <div slot="emptystate">
                    <h5 class="text-danger ml-5">No existen cursos creados en la sede</h5>
                  </div>
                </vue-good-table>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <b-button variant="primary" @click="confirmarDirectoresCurso">Actualizar los Directores de Curso</b-button>
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
    name: 'directorescurso',
    components: {
      VueGoodTable,
    },
    data () {
      return {
        idSede: null,
        comboSedes: [],
        listaCursos: [],
        comboDocentes: [],
        encabColumnas : [
          { label: 'Curso', field: 'nomenclatura' },
          { label: 'Jornada', field: 'jornada', sortable: false },
          { label: 'Docente Director', field: 'id_director', sortable: false }
        ],
        descripcionSede: null
      }
    },
    methods: {
      async guardarDirectoresCurso() {
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/cursossede/directores', JSON.stringify(this.listaCursos), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Directores de Curso')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,' Los Directores de Curso se han actualizado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Directores de Curso. Intente más tarde. ' + err)
        })
      },
      confirmarDirectoresCurso() {
        let titulo = 'Actualizar los Directores de Curso'
        let pregunta = '¿Esta seguro de Actualizar los Directores de Curso?'
        this.$bvModal.msgBoxConfirm(pregunta, {
          title: titulo,
          size: '',
          buttonSize: 'sm',
          okVariant: 'success',
          okTitle: 'Si, ' + titulo,
          cancelVariant: 'danger',
          cancelTitle: 'Cancelar',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.guardarDirectoresCurso()
          }
        })
        return true
      },
      actualizarItem(item) {
        let indice = this.listaCursos.findIndex(asigna => asigna.idCurso === item.idCurso)
        this.listaCursos[indice].id_director = item.id_director
      },
      async verListaCursosSede() {
        this.listaCursos = []
        this.descripcionSede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/cursossede', {params: {idSede: this.idSede}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Cursos Sede')
          } else{
            if (response.data.datos != 0) {
              this.listaCursos = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Cursos Sede. Intente más tarde.' + err)
        })
      },
      async ocuparComboSedes() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/combo/sedes', {params: {idInstitucion: this.$store.state.idInstitucion, vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Combo sedes')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboSedes.push({ 'value': element.idSedeVigencia, 'text': element.sede.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Combo sedes. Intente más tarde.' + err)
        })
      },
      async consultarListaDocentes() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/combo/docentes', {params: {idInstitucion: this.$store.state.idInstitucion}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Docentes')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboDocentes.push({ 'value': element.idDocente, 'text': element.docente })
              })
              this.comboDocentes.push({ 'value': '99999', 'text': '--- SIN ASIGNAR DIRECTOR' })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Docentes. Intente más tarde.' + err)
        })
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      if(this.$store.state.idRol == 1 || this.$store.state.idRol == 12) {
        //this.ocuparComboSedes()
        this.consultarListaDocentes()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>