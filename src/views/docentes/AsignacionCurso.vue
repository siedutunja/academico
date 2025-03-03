<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> ASIGNACIÓN ACADÉMICA POR CURSO</h5>
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
                  <b-form-select id="cursos" ref="cursos" v-model="idCurso" :options="comboCursos" @change="verificarAsignacionCurso()" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mt-2" v-if="idCurso!=null">
              <b-col lg="12">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Asignación Académica del Curso .:. {{descripcionCurso}}</h5>
                  </template>
                  <b-card-text>
                    <b-row>
                      <b-col lg="12">
                        <vue-good-table :columns="encabColumnas" :rows="listaAsignaturasDocentes" styleClass="vgt-table condensed bordered striped " :line-numbers="true">
                          <template slot="table-row" slot-scope="props">
                            <span v-if="props.column.field == 'asignatura'" :style="(colorArea(props.row.orden))">
                              <span style="font-size: 10px;">{{props.row.area}}</span><br><strong>{{props.row.asignatura}}</strong>
                            </span>
                            <span v-if="props.column.field == 'ih'" :style="(colorArea(props.row.orden))">
                              {{props.row.ih}}
                            </span>
                            <span v-if="props.column.field == 'porcentaje'" :style="(colorArea(props.row.orden))">
                              {{props.row.porcentaje}}
                            </span>
                            <span v-if="props.column.field == 'id_docente'">
                              <b-form-select v-model="props.row.id_docente" @change="actualizarItem(props.row)" :options="comboDocentes" :style="(colorArea(props.row.orden))" :disabled="$store.state.idRol==1 || $store.state.idRol==12 || $store.state.perAsigCarga == 1 ? false : true"></b-form-select>
                            </span>
                          </template>
                          <div slot="emptystate">
                            <h5 class="text-danger ml-5">No existen Asignaturas asignadas al curso</h5>
                          </div>
                        </vue-good-table>
                      </b-col>
                      <b-col lg="12">
                        <b-alert class="text-center" show><h5>I.H. Total = {{ totalIH }} horas</h5></b-alert>
                      </b-col>
                    </b-row>
                  </b-card-text>
                  <template #footer>
                    <b-button class="small mx-1 mt-2" variant="primary" v-if="$store.state.idRol==1 || $store.state.idRol==12 || $store.state.perAsigCarga == 1 " @click="confirmarAsignacionAcademica">Actualizar Asignación Académica</b-button>
                    <b-button class="small mx-1 mt-2" variant="outline-primary" @click="imprimirInforme">Imprimir Asignación Académica</b-button>
                  </template>
                </b-card>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Seleccione la Sede y el Curso, asigne los Docente a las Asignaturas y actualice los datos haciendo clic en Actualizar Asignación Académica.</em>
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
          { label: 'Área/Asignatura', field: 'asignatura' },
          { label: 'IH', field: 'ih', sortable: false },
          { label: '%', field: 'porcentaje', sortable: false },
          { label: 'Docente Titular', field: 'id_docente', sortable: false }
        ],
        descripcionCurso: null,
        totalIH: 0
      }
    },
    methods: {
      imprimirInforme() {
        let materias =[]
        let sede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
        this.listaAsignaturasDocentes.forEach(element => {
          let profe = this.comboDocentes.find((profe) => profe.value == element.id_docente)
          materias.push({'area': element.area, 'asignatura': element.asignatura, 'ih': element.ih, 'porcentaje': element.porcentaje, 'docente': profe.text})
        })
        let uri = "?ie=" + this.$store.state.nombreInstitucion + "&vigencia=" + this.$store.state.aLectivo + "&curso=" + this.descripcionCurso + "&sede=" + sede + "&totalIH=" + this.totalIH + "&datos=" + JSON.stringify(materias)
        let encoded = encodeURI(uri);
        //window.open("http://localhost/siedutunja/php/informes/asignacion-curso.php" + encoded,"_blank")
        window.open("https://siedutunja.gov.co/php/informes/asignacion-curso.php" + encoded,"_blank")
        return true
      },
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
            this.guardarAsignacionAcademica()
          }
        })
        return true
      },
      actualizarItem(item) {
        let indice = this.listaAsignaturasDocentes.findIndex(asigna => asigna.idAsignaturaCurso === item.idAsignaturaCurso)
        this.listaAsignaturasDocentes[indice].id_docente = item.id_docente
      },
      async ocuparComboDocentes() {
        this.comboDocentes = []
        this.$store.state.datosDocentes.forEach(element => {
          this.comboDocentes.push({ 'value': element.id, 'text': element.docente.toUpperCase() })
        })
        this.comboDocentes.push({ 'value': '99999', 'text': '--- SIN ASIGNAR DOCENTE' })
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
        this.descripcionCurso = this.idCurso != null ? document.getElementById('cursos')[document.getElementById('cursos').selectedIndex].text : ''
        this.listaAsignaturasDocentes = []
        this.totalIH = 0
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/asignaciondocentescurso', {params: {idCurso: this.idCurso}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista asignación docentes curso')
          } else{
            if (response.data.datos != 0) {
              this.listaAsignaturasDocentes = response.data.datos
              this.listaAsignaturasDocentes.forEach(element => {
                this.totalIH += element.ih
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista asignación docentes curso. Intente más tarde.' + err)
        })
      },
      async ocuparComboCursosSede() {
        this.comboCursos = []
        this.$store.state.datosCursos.forEach(element => {
          if (element.id_sede == this.idSede) {
            this.comboCursos.push({ 'value': element.id, 'text': element.nomenclatura.toUpperCase() })
          }
        })
      },
      async ocuparComboSedes() {
        this.comboSedes = []
        this.$store.state.datosSedes.forEach(element => {
          this.comboSedes.push({ 'value': element.id, 'text': element.sede.toUpperCase() })
        })
      },
      colorArea(orden) {
        let color = ['#CC9900','#0033CC','#009900','#CCCC00','#006699','#FF00CC','#9933CC','#FF6600','#0033FF','#666600','#CC3300','#607d8b','#4a148c','#afb42b','#f57c00','#795548','#8e24aa','#c2185b','#f44336','#CC9900','#0033CC','#009900','#CCCC00','#006699','#FF00CC','#9933CC','#FF6600','#0033FF','#666600','#CC3300','#607d8b','#4a148c','#afb42b','#f57c00','#795548','#8e24aa','#c2185b','#f44336','#CC9900','#0033CC','#009900','#CCCC00','#006699','#FF00CC','#9933CC','#FF6600','#0033FF','#666600','#CC3300','#607d8b','#4a148c','#afb42b','#f57c00','#795548','#8e24aa','#c2185b','#f44336','#CC9900','#0033CC','#009900','#CCCC00','#006699','#FF00CC','#9933CC','#FF6600','#0033FF','#666600','#CC3300','#607d8b','#4a148c','#afb42b','#f57c00','#795548','#8e24aa','#c2185b','#f44336']
        return 'color: ' + color[orden]
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