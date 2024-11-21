<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <div class="card-header-actions float-right" v-if="!mostrarBuscar">
              <CLink href="#" class="card-header-action btn-setting mx-1 text-primary" @click="idSede=null,idGrado=null,idCurso=null,mostrarBuscar=!mostrarBuscar,$emit('retorno', 0)">
                <CIcon name="cilArrowThickFromTop"/>
              </CLink>
            </div>
            <h5 class="mb-0"><b-icon icon="search" aria-hidden="true"></b-icon> SELECCIONAR CURSO</h5>
          </template>
          <b-card-text v-if="mostrarBuscar">
            <b-row>
              <b-col lg="6">
                <b-form-group label="Sedes" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idGrado=null,idCurso=null,ocuparComboGradosSede()"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Grados" label-for="grados" class="etiqueta">
                  <b-form-select  id="grados" ref="grados" v-model="idGrado" :options="comboGrados" @change="idCurso=null,ocuparComboCursosGrado()" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Cursos" label-for="grados" class="etiqueta">
                  <b-form-select  id="cursos" ref="cursos" v-model="idCurso" :options="comboCursos" @change="mostrarBuscar=false,generarListadoCurso()" :disabled="idGrado!=null ? false : true"></b-form-select>
                </b-form-group>
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

  export default {
    name: 'gradosedecurso',
    components: {
    },
    data () {
      return {
        datosEnviar: {},
        mostrarBuscar: true,
        idSede: null,
        comboSedes: [],
        idGrado: null,
        comboGrados: [],
        idCurso: null,
        comboCursos: [],
        textoSede: null,
        textoGrado: null,
        textoCurso: null,
      }
    },
    methods: {
      async generarListadoCurso() {
        this.datosEnviar.idSede = this.idSede
        this.datosEnviar.idGrado = this.idGrado
        this.datosEnviar.idCurso = this.idCurso
        this.datosEnviar.textoSede = document.getElementById('sedes')[document.getElementById('sedes').selectedIndex].text
        this.datosEnviar.textoGrado = document.getElementById('grados')[document.getElementById('grados').selectedIndex].text
        this.datosEnviar.textoCurso = document.getElementById('cursos')[document.getElementById('cursos').selectedIndex].text
        this.mostrarBuscar = false  //Solo si se selecciona el curso
        this.$emit("retorno", this.datosEnviar)
      },
      async ocuparComboCursosGrado() {
        this.comboCursos = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/combo/cursosgrado', {params: {idGrado: this.idGrado}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Combo Cursos')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboCursos.push({ 'value': element.idCursoGrado, 'text': element.nomenclatura.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Combo Cursos. Intente más tarde.' + err)
        })
      },
      async ocuparComboGradosSede() {
        this.comboGrados = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/combo/gradossede', {params: {idSede: this.idSede}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Combo grados')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboGrados.push({ 'value': element.idGradoSede, 'text': element.descripcion.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Combo grados. Intente más tarde.' + err)
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
      cancelarFormulario() {
        this.$router.push('/')
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      //this.ocuparComboSedes()
    }
  }
</script>