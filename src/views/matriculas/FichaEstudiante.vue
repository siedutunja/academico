<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> DATOS DEL ESTUDIANTE</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="3" md="6">
                <b-form-group label="Número de Documento*" label-for="doc" class="etiqueta">
                  <b-input-group>
                    <b-form-input id="doc" ref="doc" v-model="infoEstudiante.documento" aria-describedby="feedDoc" autocomplete="off" maxlength="50" @keydown="soloNumerosLetras" disabled></b-form-input>
                    <b-form-invalid-feedback id="feedDoc">Campo requerido.</b-form-invalid-feedback>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Tipo Documento*" label-for="tipoDoc" class="etiqueta">
                  <b-form-select  id="tipoDoc" ref="tipoDoc" v-model="$v.infoEstudiante.id_tipo_documento.$model" :options="comboTiposDoc" :state="validateStateD('id_tipo_documento')" aria-describedby="feedTipoDoc"></b-form-select>
                  <b-form-invalid-feedback id="feedTipoDoc">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Municipio de Expedición del Documento*" label-for="muniDoc" class="etiqueta">
                  <b-form-select  id="muniDoc" ref="muniDoc" v-model="$v.infoEstudiante.id_municipio_documento.$model" :options="comboMunicipios" :state="validateStateD('id_municipio_documento')" aria-describedby="feedMuniDoc"></b-form-select>
                  <b-form-invalid-feedback id="feedMuniDoc">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Primer Apellido*" label-for="ape1" class="etiqueta">
                  <b-form-input id="ape1" ref="ape1" v-model.trim="$v.infoEstudiante.apellido1.$model" :state="validateStateD('apellido1')" aria-describedby="feedApe1" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                  <b-form-invalid-feedback id="feedApe1" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Segundo Apellido" label-for="ape2" class="etiqueta">
                  <b-form-input id="ape2" ref="ape2" v-model.trim="$v.infoEstudiante.apellido2.$model" :state="validateStateD('apellido2')" aria-describedby="feedApe2" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                  <b-form-invalid-feedback id="feedApe2">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Primer Nombre*" label-for="nom1" class="etiqueta">
                  <b-form-input id="nom1" ref="nom1" v-model.trim="$v.infoEstudiante.nombre1.$model" :state="validateStateD('nombre1')" aria-describedby="feedNom1" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                  <b-form-invalid-feedback id="feedNom1">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Segundo Nombre" label-for="nom2" class="etiqueta">
                  <b-form-input id="nom2" ref="nom2" v-model.trim="$v.infoEstudiante.nombre2.$model" :state="validateStateD('nombre2')" aria-describedby="feedNom2" autocomplete="off" maxlength="30" @keydown="soloLetras"></b-form-input>
                  <b-form-invalid-feedback id="feedNom2">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Fecha de Nacimiento*" label-for="fechaN" class="etiqueta">
                  <b-form-input id="fechaN" ref="fechaN" type="date" v-model.trim="$v.infoEstudiante.fecha_nacimiento.$model" :state="validateStateD('fecha_nacimiento')" aria-describedby="feedFechaN"></b-form-input>
                  <b-form-invalid-feedback id="feedFechaN" >Campo requerido.</b-form-invalid-feedback>            
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Nacionalidad*" label-for="nacional" class="etiqueta">
                  <b-form-select  id="nacional" ref="nacional" v-model="$v.infoEstudiante.id_nacionalidad.$model" :options="comboPaises" :state="validateStateD('id_nacionalidad')" aria-describedby="feedNal"></b-form-select>
                  <b-form-invalid-feedback id="feedNal">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="6">
                <b-form-group label="Municipio de Nacimiento*" label-for="muniNace" class="etiqueta">
                  <b-form-select  id="muniNace" ref="muniNace" v-model="$v.infoEstudiante.id_municipio_nacimiento.$model" :options="comboMunicipios" :state="validateStateD('id_municipio_nacimiento')" aria-describedby="feedMuniNaceA"></b-form-select>
                  <b-form-invalid-feedback id="feedMuniNace">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>

              <b-col lg="3" md="6">
                <b-form-group label="Género*" label-for="genero" class="etiqueta">
                  <b-form-select  id="genero" ref="genero" v-model="$v.infoEstudiante.id_genero.$model" :options="comboGeneros" :state="validateStateD('id_genero')" aria-describedby="feedGenero"></b-form-select>
                  <b-form-invalid-feedback id="feedGenero">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Grupo y Factor RH*" label-for="rh" class="etiqueta">
                  <b-form-select  id="rh" ref="rh" v-model="$v.infoEstudiante.id_rh.$model" :options="comboRhs" :state="validateStateD('id_rh')" aria-describedby="feedRh"></b-form-select>
                  <b-form-invalid-feedback id="feedRh">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="6">
                <b-form-group label="Grupo Etnico*" label-for="etnia" class="etiqueta">
                  <b-form-select  id="etnia" ref="etnia" v-model="$v.infoEstudiante.id_etnia.$model" :options="comboEtnias" :state="validateStateD('id_etnia')" aria-describedby="feedEtnia"></b-form-select>
                  <b-form-invalid-feedback id="feedEtnia">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="6">
                <b-form-group label="Discapacidad*" label-for="discapacidad" class="etiqueta">
                  <b-form-select  id="discapacidad" ref="discapacidad" v-model="$v.infoEstudiante.id_discapacidad.$model" :options="comboDiscapacidades" :state="validateStateD('id_discapacidad')" aria-describedby="feedDiscapacidad" @change="infoEstudiante.id_discapacidad==='99' ? infoEstudiante.id_diversa='N' : infoEstudiante.id_diversa=null"></b-form-select>
                  <b-form-invalid-feedback id="feedDiscapacidad">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Capacidades Excepcionales*" label-for="capacidades" class="etiqueta">
                  <b-form-select  id="capacidades" ref="capacidades" v-model="$v.infoEstudiante.id_capacidades.$model" :options="comboCapacidades" :state="validateStateD('id_capacidades')" aria-describedby="feedCapacidad"></b-form-select>
                  <b-form-invalid-feedback id="feedCapacidad">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="6">
                <b-form-group label="Victima Conflicto*" label-for="victima" class="etiqueta">
                  <b-form-select  id="victima" ref="victima" v-model="$v.infoEstudiante.id_victima.$model" :options="comboVictimas" :state="validateStateD('id_victima')" aria-describedby="feedVictima" @change="habilitaMunicipioExpulsor"></b-form-select>
                  <b-form-invalid-feedback id="feedVictima">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="6">
                <b-form-group label="Municipio Expulsor*" label-for="muniExpulsor" class="etiqueta">
                  <b-form-select  id="muniExpulsor" ref="muniExpulsor" v-model="$v.infoEstudiante.id_municipio_expulsor.$model" :options="comboMunicipios" :state="validateStateD('id_municipio_expulsor')" aria-describedby="feedMuniExpulsor" :disabled="deshabMuniExpulsor"></b-form-select>
                  <b-form-invalid-feedback id="feedMuniExpulsor">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="6">
                <b-form-group label="Eps*" label-for="eps" class="etiqueta">
                  <b-form-select  id="eps" ref="eps" v-model="$v.infoEstudiante.id_eps.$model" :options="comboEps" :state="validateStateD('id_eps')" aria-describedby="feedEps"></b-form-select>
                  <b-form-invalid-feedback id="feedEps">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="12" md="12">
                <b-form-group label="Describa si tiene una enfermedad o tratamiento especial" label-for="enfermedad" class="etiqueta">
                  <b-form-textarea id="enfermedad" ref="enfermedad" v-model.trim="infoEstudiante.enfermedades" aria-describedby="feedEnfermedad" autocomplete="off" rows="2"></b-form-textarea>
                  <b-form-invalid-feedback id="feedEnfermedad">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Dirección de Residencia*" label-for="dir" class="etiqueta">
                  <b-form-input id="dir" ref="dir" v-model.trim="$v.infoEstudiante.direccion.$model" :state="validateStateD('direccion')" aria-describedby="feedDir" autocomplete="off" maxlength="100"></b-form-input>
                  <b-form-invalid-feedback id="feedDir" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Municipio de Residencia*" label-for="muniRes" class="etiqueta">
                  <b-form-select  id="muniRes" ref="muniRes" v-model="$v.infoEstudiante.id_municipio_direccion.$model" :options="comboMunicipios" :state="validateStateD('id_municipio_direccion')" aria-describedby="feedMuniRes"></b-form-select>
                  <b-form-invalid-feedback id="feedMuniRes">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Barrio*" label-for="barrio" class="etiqueta">
                  <b-form-input id="barrio" ref="barrio" v-model.trim="$v.infoEstudiante.barrio.$model" :state="validateStateD('barrio')" aria-describedby="feedBarrio" autocomplete="on" maxlength="50"></b-form-input>
                  <b-form-invalid-feedback id="feedBarrio">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Zona*" label-for="zona" class="etiqueta">
                  <b-form-select  id="zona" ref="zona" v-model="$v.infoEstudiante.id_zona.$model" :options="comboZonas" :state="validateStateD('id_zona')" aria-describedby="feedZona"></b-form-select>
                  <b-form-invalid-feedback id="feedZona">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Estrato*" label-for="estrato" class="etiqueta">
                  <b-form-select  id="estrato" ref="estrato" v-model="$v.infoEstudiante.id_estrato.$model" :options="comboEstratos" :state="validateStateD('id_estrato')" aria-describedby="feedEstrato"></b-form-select>
                  <b-form-invalid-feedback id="feedEstrato">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Sisben*" label-for="sisben" class="etiqueta">
                  <b-form-select  id="sisben" ref="sisben" v-model="$v.infoEstudiante.id_sisben.$model" :options="comboSisben" :state="validateStateD('id_sisben')" aria-describedby="feedSisben"></b-form-select>
                  <b-form-invalid-feedback id="feedSisben">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Teléfono Principal*" label-for="tel1" class="etiqueta">
                  <b-form-input id="tel1" ref="tel1" v-model.trim="$v.infoEstudiante.telefono1.$model" :state="validateStateD('telefono1')" aria-describedby="feedTel1" autocomplete="off" maxlength="15" @keydown="soloNumeros"></b-form-input>
                  <b-form-invalid-feedback id="feedTel1" >El número debe contener 10 dígitos.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Teléfono Opcional" label-for="tel2" class="etiqueta">
                  <b-form-input id="tel2" ref="tel2" v-model.trim="infoEstudiante.telefono2" aria-describedby="feedTel2" autocomplete="off" maxlength="15" @keydown="soloNumeros"></b-form-input>
                  <b-form-invalid-feedback id="feedTel2" >El número debe contener 10 dígitos.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Correo Electrónico*" label-for="correo" class="etiqueta">
                  <b-form-input id="correo" ref="correo" v-model.trim="infoEstudiante.correo" aria-describedby="feedCorreo" autocomplete="off" maxlength="50"></b-form-input>
                  <b-form-invalid-feedback id="feedCorreo" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <div class="float-right text-medium-emphasis text-info">* Campo requerido</div>
            <div>
              <b-button class="small" variant="primary" @click="validarDatosFormulario">Actualizar Datos del Estudiante</b-button>
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
    name: 'fichaestudiante',
    mixins: [validationMixin],
    props: {
      datosEstudiante: Object
    },
    components: {},
    data () {
      return {
        infoEstudiante: {
          documento: null,
          id_tipo_documento: null,
          id_municipio_documento: null,
          nombre1: null,
          nombre2: null,
          apellido1: null,
          apellido2: null,
          fecha_nacimiento: null,
          id_municipio_nacimiento: null,
          id_nacionalidad: null,
          id_genero: null,
          id_rh: null,
          id_etnia: null,
          id_discapacidad: null,
          id_capacidades: null,
          id_victima: null,
          id_municipio_expulsor: null,
          id_eps: null,
          enfermedades: null,
          barrio: null,
          id_zona: null,
          id_estrato: null,
          id_sisben: null,
          direccion: null,
          id_municipio_direccion: null,
          telefono1: null,
          telefono2: null,
          correo: null,
          idEstudiante: null
        },
        deshabMuniExpulsor: false,
        comboTiposDoc: [],
        comboMunicipios: [],
        comboPaises: [],
        comboGeneros: [],
        comboRhs: [],
        comboEtnias: [],
        comboDiscapacidades: [],
        comboCapacidades: [],
        comboVictimas: [],
        comboEps: [],
        comboZonas: [],
        comboEstratos: [],
        comboSisben: []
      }
    },
    validations: {
      infoEstudiante: {
        id_tipo_documento: { required },
        id_municipio_documento: { required },
        id_nacionalidad: { required },
        id_municipio_nacimiento: { required },
        nombre1: { required },
        nombre2: { minLength: minLength(0) },
        apellido1: { required },
        apellido2: { minLength: minLength(0) },
        fecha_nacimiento: { required },
        id_genero: { required },
        id_rh: { required },
        id_etnia: { required },
        id_discapacidad: { required },
        id_capacidades: { required },
        id_victima: { required },
        id_municipio_expulsor: { required },
        id_eps: { required },
        id_zona: { required },
        id_estrato: { required },
        id_sisben: { required },
        direccion: { required },
        barrio: { required },
        id_municipio_direccion: { required },
        telefono1: { required, minLength: minLength(10) }
      }
    },
    methods: {
      validarDatosFormulario() {
        this.$v.infoEstudiante.$touch()
        if (this.$v.infoEstudiante.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          let titulo = 'Actualizar Datos del Estudiante'
          let pregunta = '¿Esta seguro de Actualizar los Datos del Estudiante?'
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
              this.guardarDatosEstudiante()
            }
          })
        }
        return true
      },
      async guardarDatosEstudiante() {
        this.infoEstudiante.apellido1 = this.infoEstudiante.apellido1.toUpperCase()
        if (this.infoEstudiante.apellido2 == '' || this.infoEstudiante.apellido2 == null) {
          this.infoEstudiante.apellido2 = null
        } else {
          this.infoEstudiante.apellido2 = this.infoEstudiante.apellido2.toUpperCase()
        }
        this.infoEstudiante.nombre1 = this.infoEstudiante.nombre1.toUpperCase()
        if (this.infoEstudiante.nombre2 == '' || this.infoEstudiante.nombre2 == null) {
          this.infoEstudiante.nombre2 = null
        } else {
          this.infoEstudiante.nombre2 = this.infoEstudiante.nombre2.toUpperCase()
        }
        if (this.infoEstudiante.telefono2 == '' || this.infoEstudiante.telefono2 == null) {
          this.infoEstudiante.telefono2 == null
        }
        this.infoEstudiante.barrio = this.infoEstudiante.barrio.toUpperCase()
        if (this.infoEstudiante.correo == '' || this.infoEstudiante.correo == null) {
          this.infoEstudiante.correo == null
        } else {
          this.infoEstudiante.correo = this.infoEstudiante.correo.toLowerCase()
        }
        if (this.infoEstudiante.enfermedades == '' || this.infoEstudiante.enfermedades == null) {
          this.infoEstudiante.enfermedades == null
        } else {
          this.infoEstudiante.enfermedades = this.infoEstudiante.enfermedades.toUpperCase()
        }
        await axios
        .post(CONFIG.ROOT_PATH + 'academico/estudiante', JSON.stringify(this.infoEstudiante), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Estudiante')
          } else{
            this.$emit("retorno", 1)
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Estudiante. Intente más tarde. ' + err)
        })
      },
      async consultaDatosEstudianteId() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/estudiantes', { params: { idEstudiante: this.datosEstudiante.idEstudiante }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Datos Estudiante')
          } else{
            if (response.data.datos != 0) {
              this.infoEstudiante = response.data.datos
              if (this.infoEstudiante.fecha_nacimiento != null && this.infoEstudiante.fecha_nacimiento != '') {
                this.infoEstudiante.fecha_nacimiento = this.infoEstudiante.fecha_nacimiento.substr(0,10)
              }
              this.habilitaMunicipioExpulsor()
              this.infoEstudiante.idEstudiante = this.datosEstudiante.idEstudiante
            }
          }
        })
        .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Datos Estudiante. Intente más tarde. ' + err)
        })
      },
      habilitaMunicipioExpulsor() {
        if (this.infoEstudiante.id_victima == '1') {
          this.infoEstudiante.id_municipio_expulsor = null
          this.deshabMuniExpulsor = false
        } else {
          this.infoEstudiante.id_municipio_expulsor='00000'
          this.deshabMuniExpulsor = true
        }
      },
      ocuparCombos() {
        this.comboZonas = []
        this.$store.state.datosTablas.zonas.forEach(element => {
          this.comboZonas.push({ 'value': element.id, 'text': element.zona.toUpperCase() })
        })
        this.comboEps = []
        this.$store.state.datosTablas.eps.forEach(element => {
          this.comboEps.push({ 'value': element.id, 'text': element.eps.toUpperCase() })
        })
        this.comboEtnias = []
        this.$store.state.datosTablas.etnias.forEach(element => {
          this.comboEtnias.push({ 'value': element.id, 'text': element.etnia.toUpperCase() })
        })
        this.comboVictimas = []
        this.$store.state.datosTablas.victimas.forEach(element => {
          this.comboVictimas.push({ 'value': element.id, 'text': element.victima.toUpperCase() })
        })
        this.comboCapacidades = []
        this.$store.state.datosTablas.capacidades.forEach(element => {
          this.comboCapacidades.push({ 'value': element.id, 'text': element.capacidad.toUpperCase() })
        })
        this.comboDiscapacidades = []
        this.$store.state.datosTablas.discapacidades.forEach(element => {
          this.comboDiscapacidades.push({ 'value': element.id, 'text': element.discapacidad.toUpperCase() })
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
        this.comboMunicipios = []
        this.$store.state.datosTablas.municipios.forEach(element => {
          this.comboMunicipios.push({ 'value': element.id, 'text': element.municipio.toUpperCase() + ' - ' + element.departamento.toUpperCase() })
        })
        this.comboPaises = []
        this.$store.state.datosTablas.paises.forEach(element => {
          this.comboPaises.push({ 'value': element.id, 'text': element.pais.toUpperCase() })
        })
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
      validateStateD(name) {
        const { $dirty, $error } = this.$v.infoEstudiante[name]
        return $dirty ? !$error : null
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.consultaDatosEstudianteId()
      this.ocuparCombos()
    }
  }
</script>