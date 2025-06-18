<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card header-bg-variant="secondary">
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> <span v-if="infoFamiliar.familiar==1">DATOS DEL PAPÁ</span><span v-else>DATOS DE LA MAMÁ</span></h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="3" md="6">
                <b-form-group label="Primer Apellido*" label-for="ape1A" class="etiqueta">
                  <b-form-input id="ape1A" ref="ape1A" v-model.trim="$v.infoFamiliar.apellido1A.$model" :state="validateStateD('apellido1A')" aria-describedby="feedApe1A" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                  <b-form-invalid-feedback id="feedApe1A" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Segundo Apellido" label-for="ape2A" class="etiqueta">
                  <b-form-input id="ape2A" ref="ape2A" v-model.trim="$v.infoFamiliar.apellido2A.$model" :state="validateStateD('apellido2A')" aria-describedby="feedApe2A" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                  <b-form-invalid-feedback id="feedApe2A">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Primer Nombre*" label-for="nom1A" class="etiqueta">
                  <b-form-input id="nom1A" ref="nom1A" v-model.trim="$v.infoFamiliar.nombre1A.$model" :state="validateStateD('nombre1A')" aria-describedby="feedNom1A" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                  <b-form-invalid-feedback id="feedNom1A">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Segundo Nombre" label-for="nom2A" class="etiqueta">
                  <b-form-input id="nom2A" ref="nom2A" v-model.trim="$v.infoFamiliar.nombre2A.$model" :state="validateStateD('nombre2A')" aria-describedby="feedNom2A" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                  <b-form-invalid-feedback id="feedNom2A">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Número de Documento*" label-for="docA" class="etiqueta">
                  <b-form-input id="docA" ref="docA" v-model="infoFamiliar.documentoA" :state="validateStateD('documentoA')" aria-describedby="feedDocA" autocomplete="off" maxlength="50" @keydown="soloNumerosLetras"></b-form-input>
                  <b-form-invalid-feedback id="feedDocA">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Tipo Documento*" label-for="tipoDocA" class="etiqueta">
                  <b-form-select  id="tipoDocA" ref="tipoDocA" v-model="$v.infoFamiliar.id_tipo_documentoA.$model" :options="comboTiposDoc" :state="validateStateD('id_tipo_documentoA')" aria-describedby="feedTipoDocA"></b-form-select>
                  <b-form-invalid-feedback id="feedTipoDocA">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="6">
                <b-form-group label="Municipio de Expedición del Documento*" label-for="muniDocA" class="etiqueta">
                  <b-form-select  id="muniDocA" ref="muniDocA" v-model="$v.infoFamiliar.id_municipio_documentoA.$model" :options="comboMunicipios" :state="validateStateD('id_municipio_documentoA')" aria-describedby="feedMuniDocA"></b-form-select>
                  <b-form-invalid-feedback id="feedMuniDocA">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Fecha de Nacimiento*" label-for="fechaNA" class="etiqueta">
                  <b-form-input id="fechaNA" ref="fechaNA" type="date" v-model.trim="$v.infoFamiliar.fecha_nacimientoA.$model" :state="validateStateD('fecha_nacimientoA')" aria-describedby="feedFechaNA"></b-form-input>
                  <b-form-invalid-feedback id="feedFechaNA" >Campo requerido.</b-form-invalid-feedback>            
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Nacionalidad*" label-for="paisA" class="etiqueta">
                  <b-form-select  id="paisA" ref="paisA" v-model="$v.infoFamiliar.id_nacionalidadA.$model" :options="comboPaises" :state="validateStateD('id_nacionalidadA')" aria-describedby="feedPaisA" @change="habilitaMunicipioNaceA"></b-form-select>
                  <b-form-invalid-feedback id="feedPaisA">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="6">
                <b-form-group label="Municipio de Nacimiento*" label-for="muniNaceA" class="etiqueta">
                  <b-form-select  id="muniNaceA" ref="muniNaceA" v-model="$v.infoFamiliar.id_municipio_nacimientoA.$model" :options="comboMunicipios" :state="validateStateD('id_municipio_nacimientoA')" aria-describedby="feedMuniNaceA" :disabled="deshabMunNaceA"></b-form-select>
                  <b-form-invalid-feedback id="feedMuniNaceA">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Género*" label-for="generoA" class="etiqueta">
                  <b-form-select  id="generoA" ref="generoA" v-model="$v.infoFamiliar.id_generoA.$model" :options="comboGeneros" :state="validateStateD('id_generoA')" aria-describedby="feedGeneroA"></b-form-select>
                  <b-form-invalid-feedback id="feedGeneroA">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Grupo y Factor RH*" label-for="rhA" class="etiqueta">
                  <b-form-select  id="rhA" ref="rhA" v-model="$v.infoFamiliar.id_rhA.$model" :options="comboRhs" :state="validateStateD('id_rhA')" aria-describedby="feedRhA"></b-form-select>
                  <b-form-invalid-feedback id="feedRhA">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="6">
                <b-form-group label="Eps*" label-for="epsA" class="etiqueta">
                  <b-form-select  id="epsA" ref="epsA" v-model="$v.infoFamiliar.id_epsA.$model" :options="comboEps" :state="validateStateD('id_epsA')" aria-describedby="feedEpsA"></b-form-select>
                  <b-form-invalid-feedback id="feedEpsA">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Municipio de Domicilio*" label-for="muniDirA" class="etiqueta">
                  <b-form-select  id="muniDirA" ref="muniDirA" v-model="$v.infoFamiliar.id_municipio_direccionA.$model" :options="comboMunicipios" :state="validateStateD('id_municipio_direccionA')" aria-describedby="feedMuniDirA"></b-form-select>
                  <b-form-invalid-feedback id="feedMuniDirA">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Dirección Domicilio*" label-for="direccionA" class="etiqueta">
                  <b-form-input id="direccionA" ref="direccionA" v-model.trim="$v.infoFamiliar.direccionA.$model" :state="validateStateD('direccionA')" aria-describedby="feedDirA" autocomplete="off" maxlength="100"></b-form-input>
                  <b-form-invalid-feedback id="feedDirA">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Barrio*" label-for="barrioA" class="etiqueta">
                  <b-form-input id="barrioA" ref="barrioA" v-model.trim="$v.infoFamiliar.barrioA.$model" :state="validateStateD('barrioA')" aria-describedby="feedBarrioA" autocomplete="off" maxlength="50"></b-form-input>
                  <b-form-invalid-feedback id="feedBarrioA">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Zona*" label-for="zonaA" class="etiqueta">
                  <b-form-select  id="zonaA" ref="zonaA" v-model="$v.infoFamiliar.id_zonaA.$model" :options="comboZonas" :state="validateStateD('id_zonaA')" aria-describedby="feedZonaA"></b-form-select>
                  <b-form-invalid-feedback id="feedZonaA">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Estrato*" label-for="estratoA" class="etiqueta">
                  <b-form-select  id="estratoA" ref="estratoA" v-model="$v.infoFamiliar.id_estratoA.$model" :options="comboEstratos" :state="validateStateD('id_estratoA')" aria-describedby="feedEstratoA"></b-form-select>
                  <b-form-invalid-feedback id="feedEstratoA">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Sisben*" label-for="sisbenA" class="etiqueta">
                  <b-form-select  id="sisbenA" ref="sisbenA" v-model="$v.infoFamiliar.id_sisbenA.$model" :options="comboSisben" :state="validateStateD('id_sisbenA')" aria-describedby="feedSisbenA"></b-form-select>
                  <b-form-invalid-feedback id="feedSisbenA">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Teléfono Principal*" label-for="tel1A" class="etiqueta">
                  <b-form-input id="tel1A" ref="tel1A" v-model.trim="$v.infoFamiliar.telefono1A.$model" :state="validateStateD('telefono1A')" aria-describedby="feedTel1A" autocomplete="off" maxlength="15" @keydown="soloNumeros"></b-form-input>
                  <b-form-invalid-feedback id="feedTel1A" >El número debe contener 10 dígitos.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Teléfono Opcional" label-for="tel2A" class="etiqueta">
                  <b-form-input id="tel2A" ref="tel2A" v-model.trim="infoFamiliar.telefono2A" aria-describedby="feedTel2A" autocomplete="off" maxlength="15" @keydown="soloNumeros"></b-form-input>
                  <b-form-invalid-feedback id="feedTel2A" >El número debe contener 10 dígitos.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="6">
                <b-form-group label="Correo Electrónico" label-for="correoA" class="etiqueta">
                  <b-form-input id="correoA" ref="correoA" v-model.trim="infoFamiliar.correoA" :state="validateStateD('correoA')" aria-describedby="feedCorreoA" autocomplete="off" maxlength="100"></b-form-input>
                  <b-form-invalid-feedback id="feedCorreoA" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="6">
                <b-form-group label="Ocupación Laboral" label-for="ocupacionA" class="etiqueta">
                  <b-form-input id="ocupacionA" ref="ocupacionA" v-model.trim="infoFamiliar.ocupacionA" aria-describedby="feedOcupacionA" autocomplete="on" maxlength="100"></b-form-input>
                  <b-form-invalid-feedback id="feedOcupacionA" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>

            </b-row>
          </b-card-text>
          <template #footer>
            <div class="float-right text-medium-emphasis text-info">* Campo requerido</div>
            <b-button class="small mx-1 mt-2" variant="primary" @click="validarDatosFormulario">Guardar Datos</b-button>
            <b-button class="small mx-1 mt-2" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
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
  import { uuid } from 'vue-uuid'

  export default {
    name: 'fichafamiliar',
    mixins: [validationMixin],
    props: {
      datosFamiliar: Object
    },
    components: {},
    data () {
      return {
        infoFamiliar: {
          familiar: null,
          idEstudiante: null,
          apellido1A: null,
          apellido2A: null,
          nombre1A: null,
          nombre2A: null,
          documentoA: null,
          id_tipo_documentoA: 1,
          id_municipio_documentoA: '15001',
          fecha_nacimientoA: null,
          id_nacionalidadA: '170',
          id_municipio_nacimientoA: null,
          id_generoA: null,
          id_rhA: null,
          id_epsA: null,
          id_municipio_direccionA: '15001',
          direccionA: null,
          barrioA: null,
          id_zonaA: null,
          id_estratoA: null,
          id_sisbenA: null,
          telefono1A: null,
          telefono2A: null,
          correoA: null,
          ocupacionA: null,
        },
        comboTiposDoc: [],
        comboMunicipios: [],
        comboPaises: [],
        comboGeneros: [],
        comboRhs: [],
        comboEstratos: [],
        comboSisben: [],
        comboEps: [],
        deshabMunNaceA: false,
      }
    },
    validations: {
      infoFamiliar: {
        nombre1A: { required },
        nombre2A: { minLength: minLength(0) },
        apellido1A: { required },
        apellido2A: { minLength: minLength(0) },
        documentoA: { required, minLength: minLength(6) },
        id_tipo_documentoA: { required },
        id_municipio_documentoA: { required },
        fecha_nacimientoA: { required },
        id_nacionalidadA: { required },
        id_municipio_nacimientoA: { required },
        id_generoA: { required },
        id_rhA: { required },
        id_epsA: { required },
        id_municipio_direccionA: { required },
        direccionA: { required },
        barrioA: { required },
        id_zonaA: { required },
        id_estratoA: { required },
        id_sisbenA: { required },
        telefono1A: { required, minLength: minLength(10) },
        correoA: { required }
      }
    },
    methods: {
      habilitaMunicipioNaceA() {
        if (this.infoFamiliar.id_nacionalidadA == '170') {
          this.infoFamiliar.id_municipio_nacimientoA = null
          this.deshabMunNaceA = false
        } else {
          this.infoFamiliar.id_municipio_nacimientoA='00000'
          this.deshabMunNaceA = true
        }
      },
      validarDatosFormulario() {
        this.$v.infoFamiliar.$touch()
        if (this.$v.infoFamiliar.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          let titulo = 'Asociar Familiar'
          let pregunta = '¿Esta seguro de guardar los datos del familiar del estudiante?'
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
            cancelVariant: '',
            cancelTitle: 'Cancelar',
            footerClass: 'p-2',
            bodyClass: 'p-5',
            hideHeaderClose: false,
            centered: true
          })
          .then(value => {
            if (value) {
              this.guardarDatosFamiliar()
            }
          })
        }
        return true
      },
      async guardarDatosFamiliar() {
        this.infoFamiliar.idFamiliar = uuid.v1()
        this.infoFamiliar.apellido1A = this.infoFamiliar.apellido1A.toUpperCase()
        if (this.infoFamiliar.apellido2A == '' || this.infoFamiliar.apellido2A == null) {
          this.infoFamiliar.apellido2A = null
        } else {
          this.infoFamiliar.apellido2A = this.infoFamiliar.apellido2A.toUpperCase()
        }
        this.infoFamiliar.nombre1A = this.infoFamiliar.nombre1A.toUpperCase()
        if (this.infoFamiliar.nombre2A == '' || this.infoFamiliar.nombre2A == null) {
          this.infoFamiliar.nombre2A = null
        } else {
          this.infoFamiliar.nombre2A = this.infoFamiliar.nombre2A.toUpperCase()
        }
        if (this.infoFamiliar.telefono2A == '' || this.infoFamiliar.telefono2A == null) {
          this.infoFamiliar.telefono2A = null
        }
        if (this.infoFamiliar.ocupacionA != '' && this.infoFamiliar.ocupacionA != null) {
          this.infoFamiliar.ocupacionA = this.infoFamiliar.ocupacionA.toUpperCase()
        }
        this.infoFamiliar.barrioA = this.infoFamiliar.barrioA.toUpperCase()
        this.infoFamiliar.correoA = this.infoFamiliar.correoA.toLowerCase()
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/datosfamiliar', JSON.stringify(this.infoFamiliar), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Familiar')
          } else{
            this.infoFamiliar.desTipoDocumentoA = document.getElementById('tipoDocA')[document.getElementById('tipoDocA').selectedIndex].text
            this.infoFamiliar.desMunicipioDocumentoA = document.getElementById('muniDocA')[document.getElementById('muniDocA').selectedIndex].text
            this.infoFamiliar.desMunicipioNaceA = document.getElementById('muniNaceA')[document.getElementById('muniNaceA').selectedIndex].text
            this.infoFamiliar.desPaisA = document.getElementById('paisA')[document.getElementById('paisA').selectedIndex].text
            this.infoFamiliar.desGeneroA = document.getElementById('generoA')[document.getElementById('generoA').selectedIndex].text
            this.infoFamiliar.desRhA = document.getElementById('rhA')[document.getElementById('rhA').selectedIndex].text
            this.infoFamiliar.desEstratoA = document.getElementById('estratoA')[document.getElementById('estratoA').selectedIndex].text
            this.infoFamiliar.desSisbenA = document.getElementById('sisbenA')[document.getElementById('sisbenA').selectedIndex].text
            this.infoFamiliar.desEpsA = document.getElementById('epsA')[document.getElementById('epsA').selectedIndex].text
            this.infoFamiliar.desMunicipioDireccionA = document.getElementById('muniDirA')[document.getElementById('muniDirA').selectedIndex].text
            this.infoFamiliar.desZonaA = document.getElementById('zonaA')[document.getElementById('zonaA').selectedIndex].text
            this.$emit("retorno", this.infoFamiliar)
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Familiar. Intente más tarde. ' + err)
        })
      },
      consultaInfoFamiliar() {
        this.infoFamiliar.familiar = this.datosFamiliar.familiar
        this.infoFamiliar.idEstudiante = this.datosFamiliar.idEstudiante
        this.infoFamiliar.id_generoA = this.infoFamiliar.familiar==1 ? 'M' : 'F'
      },
      soloLetras(e) {
        let key = window.Event ? e.which : e.keyCode
        if (!((key >= 65 && key <= 90) || (key >= 97 && key <= 122) || (key == 193) || (key == 201) || (key == 205) || (key == 211) || (key == 218) || (key == 225) || (key == 233) || (key == 237) || (key == 243) || (key == 250) || (key == 192) || (key == 32) || (key == 8) || (key == 9) || (key == 37) || (key == 39))) {
            e.preventDefault()
        }
      },
      soloNumeros(e) {
        let key = window.Event ? e.which : e.keyCode
        if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key == 8) || (key == 9) || (key == 37) || (key == 39))) {
            e.preventDefault()
        }
      },
      soloNumerosLetras(e) {
        let key = window.Event ? e.which : e.keyCode
        if (!((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 96 && key <= 122) || (key == 193) || (key == 201) || (key == 205) || (key == 211) || (key == 218) || (key == 225) || (key == 233) || (key == 237) || (key == 243) || (key == 250) || (key == 192) || (key == 32) || (key == 8) || (key == 9) || (key == 37) || (key == 39))) {
            e.preventDefault()
        }
      },
      cancelarFormulario() {
        this.$emit("retorno", 0)
      },
      ocuparCombos() {
        this.comboEps = []
        this.$store.state.datosTablas.eps.forEach(element => {
          this.comboEps.push({ 'value': element.id, 'text': element.eps.toUpperCase() })
        })
        this.comboEstratos = []
        this.$store.state.datosTablas.estratos.forEach(element => {
          this.comboEstratos.push({ 'value': element.id, 'text': element.estrato.toUpperCase() })
        })
        this.comboSisben = []
        this.$store.state.datosTablas.sisben.forEach(element => {
          this.comboSisben.push({ 'value': element.id, 'text': element.subgrupo.toUpperCase() })
        })
        this.comboRhs = []
        this.$store.state.datosTablas.rhs.forEach(element => {
          this.comboRhs.push({ 'value': element.id, 'text': element.rh.toUpperCase() })
        })
        this.comboGeneros = []
        this.$store.state.datosTablas.generos.forEach(element => {
          this.comboGeneros.push({ 'value': element.id, 'text': element.genero.toUpperCase() })
        })
        this.comboTiposDoc = []
        this.$store.state.datosTablas.tiposdocumentos.forEach(element => {
          this.comboTiposDoc.push({ 'value': element.id, 'text': element.tipodocumento.toUpperCase() })
        })
        this.comboZonas = []
        this.$store.state.datosTablas.zonas.forEach(element => {
          this.comboZonas.push({ 'value': element.id, 'text': element.zona.toUpperCase() })
        })
        this.comboMunicipios = []
        this.$store.state.datosTablas.municipios.forEach(element => {
          this.comboMunicipios.push({ 'value': element.id, 'text': element.municipio.toUpperCase() + ' - ' + element.departamento.toUpperCase() })
        })
        this.comboPaises = []
        this.$store.state.datosTablas.paises.forEach(element => {
          this.comboPaises.push({ 'value': element.id, 'text': element.pais.toUpperCase() })
        })
      },
      validateStateD(name) {
        const { $dirty, $error } = this.$v.infoFamiliar[name]
        return $dirty ? !$error : null
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.consultaInfoFamiliar()
      this.habilitaMunicipioNaceA()
      this.ocuparCombos()
    }
  }
</script>