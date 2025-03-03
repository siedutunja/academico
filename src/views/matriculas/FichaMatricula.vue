<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> DATOS DE LA MATRICULA</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6" md="12">
                <b-form-group label="Seleccione la Sede*" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="$v.infoMatricula.idSede.$model" :options="comboSedes" @change="infoMatricula.idGrado=null,infoMatricula.id_curso=null,ocuparComboGradosSede()" :state="validateStateD('idSede')" aria-describedby="feedSede"></b-form-select>
                  <b-form-invalid-feedback id="feedSede">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Seleccione el Grado*" label-for="grados" class="etiqueta">
                  <b-form-select  id="grados" ref="grados" v-model="$v.infoMatricula.id_grado.$model" :options="comboGrados" @change="infoMatricula.id_curso=null,ocuparComboCursosGradosSede()" :state="validateStateD('id_grado')" aria-describedby="feedGrado"></b-form-select>
                  <b-form-invalid-feedback id="feedGrado">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Seleccione el Curso*" label-for="cursos" class="etiqueta">
                  <b-form-select  id="cursos" ref="cursos" v-model="$v.infoMatricula.id_curso.$model" :options="comboCursos" :state="validateStateD('id_curso')" aria-describedby="feedCurso"></b-form-select>
                  <b-form-invalid-feedback id="feedCurso">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Especialidad*" label-for="especialidad" class="etiqueta">
                  <b-form-select  id="especialidad" ref="especialidad" v-model="$v.infoMatricula.id_especialidad.$model" :options="comboEspecialidades" :state="validateStateD('id_especialidad')" aria-describedby="feedEspecial"></b-form-select>
                  <b-form-invalid-feedback id="feedEspecial">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="12">
                <b-form-group label="Estudiante Nuevo*" label-for="nuevo" class="etiqueta">
                  <b-form-select  id="nuevo" ref="nuevo" v-model="$v.infoMatricula.id_nuevo.$model" :options="comboNuevo" :state="validateStateD('id_nuevo')" aria-describedby="feedNuevo"></b-form-select>
                  <b-form-invalid-feedback id="feedNuevo">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Repitente*" label-for="repitente" class="etiqueta">
                  <b-form-select  id="repitente" ref="repitente" v-model="$v.infoMatricula.id_repitente.$model" :options="comboRepitente" :state="validateStateD('id_repitente')" aria-describedby="feedRepite"></b-form-select>
                  <b-form-invalid-feedback id="feedRepite">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="12" md="12">
                <b-form-group label="Observaciones de la Matrícula" label-for="observ" class="etiqueta">
                  <b-form-textarea id="observ" ref="observ" v-model.trim="infoMatricula.obs_matricula" aria-describedby="feedObserv" autocomplete="off" rows="2"></b-form-textarea>
                  <b-form-invalid-feedback id="feedObserv">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Educación Diversa/Inclusión*" label-for="diversa" class="etiqueta">
                  <b-form-select  id="diversa" ref="diversa" v-model="$v.infoMatricula.id_diversa.$model" :options="comboDiversa" :state="validateStateD('id_diversa')"></b-form-select>
                  <b-form-invalid-feedback id="feedDiversa">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <div class="float-right text-medium-emphasis text-info">* Campo requerido</div>
            <div>
              <b-button class="small" variant="primary" @click="validarDatosFormulario">Actualizar Datos de la Matricula</b-button>
              <b-button class="small ml-3" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
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

  export default {
    name: 'fichamamatricula',
    mixins: [validationMixin],
    props: {
      datosMatricula: Object
    },
    components: {},
    data () {
      return {
        infoMatricula: {
          idMatricula: null,
          idSede: null,
          id_grado: null,
          id_curso: null,
          id_especialidad: null,
          id_nuevo: null,
          id_repitente: null,
          id_diversa: null,
          obs_matricula: null
        },
        comboSedes: [],
        comboGrados: [],
        comboCursos: [],
        comboEspecialidades: [],
        comboRepitente: [],
        comboNuevo: [],
        comboDiversa: [],
      }
    },
    validations: {
      infoMatricula: {
        idSede: { required },
        id_grado: { required },
        id_curso: { required },
        id_especialidad: { required },
        id_nuevo: { required },
        id_repitente: { required },
        id_diversa: { required },
      }
    },
    methods: {
      validarDatosFormulario() {
        this.$v.infoMatricula.$touch()
        if (this.$v.infoMatricula.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          let titulo = 'Actualizar la Matricula del Estudiante'
          let pregunta = '¿Esta seguro de actualizar la Matricula del Estudiante?'
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
              this.guardarMatricula()
            }
          })
        }
        return true
      },
      async guardarMatricula() {
        if (this.infoMatricula.obs_matricula == '' || this.infoMatricula.obs_matricula == null) {
          this.infoMatricula.obs_matricula = null
        } else {
          this.infoMatricula.obs_matricula = this.infoMatricula.obs_matricula.toUpperCase()
        }
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/matriculas/datosmatricula/ficha', JSON.stringify(this.infoMatricula), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Matricula')
          } else{
            this.$emit("retorno", 1)
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Matricula. Intente más tarde. ' + err)
        })
      },
      async consultaDatosMatriculaId() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/matriculas/datosmatricula/ficha', { params: { idMatricula: this.datosMatricula.idMatricula }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Datos Matricula')
          } else{
            if (response.data.datos != 0) {
              this.infoMatricula = response.data.datos
              this.ocuparComboGradosSede()
              this.ocuparComboCursosGradosSede()
            } else {
              this.infoMatricula = {}
            }
          }
        })
        .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Datos Matricula. Intente más tarde. ' + err)
        })
      },
      ocuparCombos() {
        this.comboDiversa = []
        this.$store.state.datosTablas.sino.forEach(element => {
          this.comboDiversa.push({ 'value': element.id, 'text': element.sino.toUpperCase() })
        })
        this.comboEspecialidades = []
        this.$store.state.datosEspecialidades.forEach(element => {
          this.comboEspecialidades.push({ 'value': element.id, 'text': element.especialidad.toUpperCase() })
        })
        this.comboRepitente = []
        this.$store.state.datosTablas.sino.forEach(element => {
          this.comboRepitente.push({ 'value': element.id, 'text': element.sino.toUpperCase() })
        })
        this.comboNuevo = []
        this.$store.state.datosTablas.sino.forEach(element => {
          this.comboNuevo.push({ 'value': element.id, 'text': element.sino.toUpperCase() })
        })
      },
      ocuparComboSedes() {
        this.comboSedes = []
        this.$store.state.datosSedes.forEach(element => {
          this.comboSedes.push({ 'value': element.id, 'text': element.sede.toUpperCase() })
        })
      },
      ocuparComboGradosSede() {
        this.comboGrados = []
        this.$store.state.datosGrados.forEach(element => {
          if (element.id_sede == this.infoMatricula.idSede) {
            this.comboGrados.push({ 'value': element.id, 'text': element.grado.toUpperCase() })
          }
        })
      },
      ocuparComboCursosGradosSede() {
        this.comboCursos = []
        this.$store.state.datosCursos.forEach(element => {
          if (element.id_grado_sede == this.infoMatricula.id_grado) {
            this.comboCursos.push({ 'value': element.id, 'text': element.nomenclatura.toUpperCase() })
          }
        })
        this.comboCursos.push({ 'value': 0, 'text': ' --- SIN CURSO (BOLSA) ---' })
      },
      cancelarFormulario() {
        this.$emit("retorno", 0)
      },
      validateStateD(name) {
        const { $dirty, $error } = this.$v.infoMatricula[name]
        return $dirty ? !$error : null
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.consultaDatosMatriculaId()
      this.ocuparCombos()
      this.ocuparComboSedes()
    }
  }
</script>