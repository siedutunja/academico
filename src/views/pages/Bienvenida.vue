<template>
  <CContainer class="d-flex align-items-center min-vh-100">
    <CRow class="w-100 justify-content-center">
      <CCol md="6">
        <div class="w-100">
          <div class="clearfix text-primary">
            <b-card class="text-center">
              <div v-if="!btnHabilitado">
                <div class="text-center m-5">
                  <b-spinner style="width: 3rem; height: 3rem;" label="Spinner"></b-spinner>
                  <br><strong>Cargando configuración...</strong>
                </div>
              </div>
              <div v-else>
                <div class="text-center">
                  <img :src="escudoI + $store.state.escudoInstitucion" height="80"/>
                </div>
                <h4>{{ $store.state.nemoInstitucion }}</h4>
                <h6>INSTITUCIÓN EDUCATIVA {{ $store.state.sectorInstitucion }}</h6>
                <h5 class="text-muted">{{ $store.state.generoUsuario==1 ? 'BIENVENIDO' : 'BIENVENIDA' }} {{ $store.state.nombreUsuario }}</h5>
                <b-button type="submit" class="btn mb-2 mt-4" variant="primary" @click="continuar">Continuar</b-button>
              </div>
            </b-card>
          </div>
        </div>
      </CCol>
    </CRow>
  </CContainer> 
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import jwt from 'jsonwebtoken'

  export default {
    name: 'Bienvenida',
    data () {
      return {
        btnHabilitado: false,
        escudoI: null,
        idUsuario: null,
        datosPermisos: {},
        idInstitucion: null
      }
    },
    methods: {
      continuar() {
        this.$router.push('/')
      },
      async cargarDatosSesion() {
        await axios
        .get(CONFIG.ROOT_PATH + 'login/usuario/institucion', { params: { idUsuario: this.idUsuario }})
        .then(response => {
          if (response.data.error){
            alert(response.data.mensaje + ' - Consulta Usuario Login')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
          } else{
            if (response.data.datos == 0) {
              alert('¡Lo sentimos!. El Usuario no tiene permisos asignados.')
              location.replace(CONFIG.ROOT_MODULO_LOGIN)
            } else {
              this.$store.commit('set', ['idUsuario', response.data.datos.id])
              this.$store.commit('set', ['usuario', response.data.datos.usuario])
              this.$store.commit('set', ['clave', response.data.datos.clave])
              this.$store.commit('set', ['idPersona', response.data.datos.id_persona])
              this.$store.commit('set', ['idRol', response.data.datos.id_rol])
              this.$store.commit('set', ['idDependencia', response.data.datos.id_dependencia])
              this.$store.commit('set', ['nombreUsuario', response.data.datos.nombre1])
              this.$store.commit('set', ['apellidoUsuario', response.data.datos.apellido1])
              this.$store.commit('set', ['generoUsuario', response.data.datos.id_genero])
              this.$store.commit('set', ['rol', response.data.datos.rol])
              this.$store.commit('set', ['nemoRol', response.data.datos.nemo])
              this.$store.commit('set', ['dependencia', response.data.datos.dependencia])
              if (response.data.datos.foto == null || response.data.datos.foto == '') {
                this.$store.commit('set', ['foto', CONFIG.FOTO])
              } else {
                this.$store.commit('set', ['foto', response.data.datos.foto])
              }
              this.$store.commit('set', ['idEntorno', response.data.datos.id_entorno])
              this.$store.commit('set', ['correoUsuario', response.data.datos.correo])
            }
          }
        })
        .catch(err => {
          alert('Algo salio mal y no se pudo realizar: Consulta Usuario Login. Intente más tarde. ' + err)
          location.replace(CONFIG.ROOT_WEBSITE)
        })
      },
      async cargarConfiguracionesAdmon() {
        await axios
        .get(CONFIG.ROOT_PATH + 'configuraciones/admon')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Datos de configuración del Admon')
          } else{
            if (response.data.datos != 0) {
              this.$store.commit('set', ['idCuatrienio', response.data.datos.id])
              this.$store.commit('set', ['descCuatrienio', response.data.datos.descripcion])
              this.$store.commit('set', ['aIniCuatrienio', response.data.datos.a_inicial])
              this.$store.commit('set', ['aFinCuatrienio', response.data.datos.a_final])
              this.$store.commit('set', ['aLectivoAdmon', response.data.datos.a_lectivo])
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Datos de configuración del Admon. Intente más tarde.' + err)
        })
      },
      async cargarConfiguracionesColegio() {
        await axios
        .get(CONFIG.ROOT_PATH + 'configuraciones/institucion', { params: { idInstitucion: this.idInstitucion }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Datos de configuración del Colegio')
          } else{
            if (response.data.datos != 0) {
              this.$store.commit('set', ['idInstitucion', this.idInstitucion])
              this.$store.commit('set', ['nombreInstitucion', response.data.datos.institucion])
              this.$store.commit('set', ['nemoInstitucion', response.data.datos.nemo])
              this.$store.commit('set', ['aLectivo', response.data.datos.a_lectivo])
              this.$store.commit('set', ['escudoInstitucion', response.data.datos.escudo])
              this.$store.commit('set', ['correoInstitucion', response.data.datos.correo])
              this.$store.commit('set', ['idSectorInstitucion', response.data.datos.id_sector])
              this.$store.commit('set', ['sectorInstitucion', response.data.datos.sector])
              this.$store.commit('set', ['daneInstitucion', response.data.datos.dane])
              this.$store.commit('set', ['nitInstitucion', response.data.datos.nit])
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Datos de configuración del Colegio. Intente más tarde.' + err)
        })
      },
      async cargarPermisos() {
        this.$store.commit('set', ['colpresupuesto', this.datosPermisos.colpresupuesto])
        this.$store.commit('set', ['coltramites', this.datosPermisos.coltramites])
        this.$store.commit('set', ['colcobertura', this.datosPermisos.colcobertura])
        this.$store.commit('set', ['colpmidirectiva', this.datosPermisos.colpmidirectiva])
        this.$store.commit('set', ['colpmiacademica', this.datosPermisos.colpmiacademica])
        this.$store.commit('set', ['colpmiadmin', this.datosPermisos.colpmiadmin])
        this.$store.commit('set', ['colpmicomunidad', this.datosPermisos.colpmicomunidad])
        this.$store.commit('set', ['colsiee', this.datosPermisos.colsiee])
        this.$store.commit('set', ['colpmi', this.datosPermisos.colpmi])
      },
      async iniciarVista() {
        let token = sessionStorage.getItem('token')
        jwt.verify(token, CONFIG.SECRET_KEY, (err, data) => {
          if (err) {
            alert('¡Bienvenida. Lo sentimos, el token no es válido o el token ha expirado.! Es necesario iniciar una nueva sesión.')
            location.replace(CONFIG.ROOT_WEBSITE)
          } else {
            let tokenDecodificado = jwt.decode(token)
            this.idUsuario = tokenDecodificado.id
            this.idInstitucion = tokenDecodificado.id_institucion
            this.datosPermisos = tokenDecodificado.permisos
            console.log(JSON.stringify(tokenDecodificado))
            this.cargarDatosSesion()
            this.cargarConfiguracionesAdmon()
            this.cargarConfiguracionesColegio()
            this.cargarPermisos()
            this.escudoI = CONFIG.ROOT_ESCUDOS
            setTimeout(()=>{
              this.btnHabilitado = true
            },1500)
          }
        })
      }
    },
    beforeMount() {
      this.iniciarVista()
    }
  }
</script>
