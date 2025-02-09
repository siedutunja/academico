<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> DIRECTORES DE CURSO</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                  <b-form-select id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="ocuparlistaCursosSede()"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <div v-if="idSede!=null">
              <b-row> <b-col lg="12"><hr></b-col></b-row>
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
                        <b-form-select v-model="props.row.id_director" @change="actualizarItem(props.row)" :options="comboDocentes" :disabled="$store.state.idRol==1 || $store.state.idRol==12 || $store.state.perActDirCurso == 1 ? false : true"></b-form-select>
                      </span>
                    </template>
                    <div slot="emptystate">
                      <h5 class="text-danger ml-5">No existen cursos creados en la sede</h5>
                    </div>
                  </vue-good-table>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col>
                  <b-button class="small mx-1 mt-2" variant="primary" v-if="$store.state.idRol==1 || $store.state.idRol==12 || $store.state.perActDirCurso == 1" @click="confirmarDirectoresCurso">Actualizar Directores de Curso</b-button>
                  <b-button class="small mx-1 mt-2" variant="outline-primary" @click="imprimirInforme">Imprimir Directores de Curso</b-button>
                </b-col>
              </b-row>
            </div>
          </b-card-text>
          <template #footer>
            <em>Cambie los directores de curso seleccionando el director y actualice los datos haciendo clic en Actualizar Directores de Curso.</em>
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
      imprimirInforme() {
        let cursos =[]
        let sede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
        this.listaCursos.forEach(element => {
          cursos.push({'curso': element.nomenclatura, 'jornada': element.jornada, 'docente': element.docente})
        })
        let uri = "?ie=" + this.$store.state.nombreInstitucion + "&vigencia=" + this.$store.state.aLectivo + "&sede=" + sede + "&datos=" + JSON.stringify(cursos)
        let encoded = encodeURI(uri);
        //window.open("http://localhost/siedutunja/php/informes/directores-curso.php" + encoded,"_blank")
        window.open("https://siedutunja.gov.co/php/informes/directores-curso.php" + encoded,"_blank")
        return true
      },
      async guardarDirectoresCurso() {
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/docentes/directores', JSON.stringify(this.listaCursos), { headers: {"Content-Type": "application/json; charset=utf-8" }})
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
          headerBgVariant: 'primary',
          headerTextVariant: 'light',
          bodyBgVariant: 'light',
          bodyBgClass: 'text-center',
          title: titulo,
          size: '',
          buttonSize: 'sm',
          okVariant: 'primary',
          okTitle: 'Si, ' + titulo,
          cancelVariant: 'danger',
          cancelTitle: 'Cancelar',
          footerClass: 'p-2',
          bodyClass: 'p-5',
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
        let indice = this.listaCursos.findIndex(curso => curso.id === item.id)
        this.listaCursos[indice].id_director = item.id_director
      },
      async ocuparlistaCursosSede() {
        this.listaCursos = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/carguecursos', {params: {idInstitucion: this.$store.state.idInstitucion, vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            alert(response.data.mensaje + ' - Consulta datos Cursos Activos')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
          } else {
            if(response.data.datos != 0) {
              this.$store.commit('set', ['datosCursos', response.data.datos])
              this.$store.state.datosCursos.forEach(element => {
                if (element.id_sede == this.idSede) {
                  this.listaCursos.push(element)
                }
              })
            } else {
              this.$store.commit('set', ['datosCursos', []])
            }
          }
        })
        .catch(err => {
          alert('Algo salio mal y no se pudo realizar: Consulta datos Cursos Activos. Intente más tarde. ' + err)
          location.replace(CONFIG.ROOT_WEBSITE)
        })
      },
      async ocuparComboSedes() {
        this.comboSedes = []
        this.$store.state.datosSedes.forEach(element => {
          this.comboSedes.push({ 'value': element.id, 'text': element.sede.toUpperCase() })
        })
      },
      async ocuparComboDocentes() {
        this.comboDocentes = []
        this.$store.state.datosDocentes.forEach(element => {
          this.comboDocentes.push({ 'value': element.id, 'text': element.docente.toUpperCase() })
        })
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.ocuparComboSedes()
      this.ocuparComboDocentes()
    }
  }
</script>