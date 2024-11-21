<template>
  <div>
    <b-row>
      <b-col lg="12">
        <h3 class="ml-2"><b-icon icon="filter-square" aria-hidden="true"></b-icon> ASIGNACIÓN ACADÉMICA POR CURSO</h3>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Sedes*" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idCurso=null,ocuparComboCursosSede()"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="Cursos*" label-for="cursos" class="etiqueta">
                  <b-form-select  id="cursos" ref="cursos" v-model="idCurso" :options="comboCursos" @change="verificarAsignacionCurso()" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-2" v-if="idCurso!=null">
      <b-col lg="12">
        <b-card >
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> LISTA DE ASIGNATURAS DEL CURSO .:. {{descripcionCurso}}</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <vue-good-table :columns="encabColumnas" :rows="listaAsignaturasDocentes" styleClass="vgt-table condensed bordered striped " :line-numbers="true">
                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'asignatura'">
                      {{props.row.asignatura}}
                    </span>
                    <span v-if="props.column.field == 'ih'">
                      {{props.row.ih}}
                    </span>
                    <span v-if="props.column.field == 'porcentaje'">
                      {{props.row.porcentaje}}
                    </span>
                    <span v-if="props.column.field == 'id_docente'">
                      <b-form-select v-model="props.row.id_docente" @change="actualizarItem(props.row)" :options="comboDocentes"></b-form-select>
                    </span>
                  </template>
                  <div slot="emptystate">
                    <h5 class="text-danger ml-5">No existen asignaturas creados en el curso</h5>
                  </div>
                </vue-good-table>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <b-button variant="primary" @click="confirmarAsignacionAcademica">Actualizar la Asignación Académica del Curso {{descripcionCurso}}</b-button>
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
    name: 'asignacioncurso',
    components: {
      VueGoodTable,
    },
    data () {
      return {
        idSede: null,
        comboSedes: [],
        idCurso: null,
        comboCursos: [],
        listaAsignaturasDocentes: [],
        comboDocentes: [],
        encabColumnas : [
          { label: 'Asignatura', field: 'asignatura' },
          { label: 'IH', field: 'ih', sortable: false },
          { label: 'Porcentaje', field: 'porcentaje', sortable: false },
          { label: 'Docente Titular', field: 'id_docente', sortable: false }
        ],
        descripcionCurso: null
      }
    },
    methods: {
      async guardarAsignacionAcademica() {
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/asignaciondocentescurso', JSON.stringify(this.listaAsignaturasDocentes), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Asignación Académica')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'La Asignación Académica se han actualizado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Asignación Académica. Intente más tarde. ' + err)
        })
      },
      confirmarAsignacionAcademica() {
        let titulo = 'Actualizar Asignación Académica del Curso'
        let pregunta = '¿Esta seguro de Actualizar la Asignación Académica del Curso?'
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
            this.guardarAsignacionAcademica()
          }
        })
        return true
      },
      actualizarItem(item) {
        let indice = this.listaAsignaturasDocentes.findIndex(asigna => asigna.idAsignaturaDocente === item.idAsignaturaDocente)
        this.listaAsignaturasDocentes[indice].id_docente = item.id_docente
      },
      async verificarAsignacionCurso() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/verificarasignacioncurso', {params: {idCurso: this.idCurso}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Verifica asignacion cursos')
          } else{
            if (response.data.datos != 0) {
              this.verAsignacionDocentesCurso()
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Verifica asignacion cursos. Intente más tarde.' + err)
        })
      },
      async verAsignacionDocentesCurso() {
        this.listaAsignaturasDocentes = []
        this.descripcionCurso = document.getElementById('cursos')[document.getElementById('cursos').selectedIndex].text
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/asignaciondocentescurso', {params: {idCurso: this.idCurso}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista asignación docentes curso')
          } else{
            if (response.data.datos != 0) {
              this.listaAsignaturasDocentes = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista asignación docentes curso. Intente más tarde.' + err)
        })
      },
      async ocuparComboCursosSede() {
        this.comboCursos = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/combo/cursossede', {params: {idSede: this.idSede}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Combo Cursos Sede')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboCursos.push({ 'value': element.idCursoGrado, 'text': element.nomenclatura.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Combo Cursos Sede. Intente más tarde.' + err)
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