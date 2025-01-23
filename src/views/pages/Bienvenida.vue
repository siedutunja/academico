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
        tokenDecodificado: {}
      }
    },
    methods: {
      continuar() {
        this.$router.push('/')
      },
      async trazaProceso(descProceso) {
        let traza = { idUsuario: this.tokenDecodificado.id, descProceso: descProceso, ip: null}
        await axios
        .post(CONFIG.ROOT_PATH + 'academico/trazaproceso', JSON.stringify(traza), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            alert('¡Lo sentimos!, se presento un problema al registrar la traza de la sesión.! Es necesario iniciar una nueva sesión.')
            location.replace(CONFIG.ROOT_WEBSITE)
          }
        })
        .catch(err => {
          alert('Algo salio mal y no se pudo registrar la traza de la Sesión. Intente más tarde. ' + err)
          location.replace(CONFIG.ROOT_WEBSITE)
        })
      },
      async cargarDatosTablas() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/carguetablas')
        .then(response => {
          if (response.data.error){
            alert(response.data.mensaje + ' - Consulta datos tablas de la Sesión')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
          } else {
            if(response.data.datos != 0) {
              this.$store.commit('set', ['datosTablas', response.data.datos])
            } else {
              this.$store.commit('set', ['datosTablas', []])
            }
          }
        })
        .catch(err => {
          alert('Algo salio mal y no se pudo realizar: Consulta datos tablas de la Sesión. Intente más tarde. ' + err)
          location.replace(CONFIG.ROOT_WEBSITE)
        })
      },
      async cargarDatosSedes() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/carguesedes', {params: {idInstitucion: this.$store.state.idInstitucion, idSeccion: this.$store.state.idSeccion}})
        .then(response => {
          if (response.data.error){
            alert(response.data.mensaje + ' - Consulta datos Sedes Activas')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
          } else {
            if(response.data.datos != 0) {
              this.$store.commit('set', ['datosSedes', response.data.datos])
            } else {
              this.$store.commit('set', ['datosSedes', []])
            }
          }
        })
        .catch(err => {
          alert('Algo salio mal y no se pudo realizar: Consulta datos Sedes Activas. Intente más tarde. ' + err)
          location.replace(CONFIG.ROOT_WEBSITE)
        })
      },
      async cargarDatosGrados() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/carguegrados', {params: {idInstitucion: this.$store.state.idInstitucion, vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            alert(response.data.mensaje + ' - Consulta datos Grados Activos')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
          } else {
            if(response.data.datos != 0) {
              this.$store.commit('set', ['datosGrados', response.data.datos])
            } else {
              this.$store.commit('set', ['datosGrados', []])
            }
          }
        })
        .catch(err => {
          alert('Algo salio mal y no se pudo realizar: Consulta datos Grados Activos. Intente más tarde. ' + err)
          location.replace(CONFIG.ROOT_WEBSITE)
        })
      },
      async cargarDatosCursos() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/carguecursos', {params: {idInstitucion: this.$store.state.idInstitucion, vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            alert(response.data.mensaje + ' - Consulta datos Cursos Activos')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
          } else {
            if(response.data.datos != 0) {
              this.$store.commit('set', ['datosCursos', response.data.datos])
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
      async cargarDatosAsignaturas() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/cargueasignaturas', {params: {idInstitucion: this.$store.state.idInstitucion, vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            alert(response.data.mensaje + ' - Consulta datos Asignaturas')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
          } else {
            if(response.data.datos != 0) {
              this.$store.commit('set', ['datosAsignaturas', response.data.datos])
            } else {
              this.$store.commit('set', ['datosAsignaturas', []])
            }
            //console.log(JSON.stringify(response.data.datos))
          }
        })
        .catch(err => {
          alert('Algo salio mal y no se pudo realizar: Consulta datos Asignaturas. Intente más tarde. ' + err)
          location.replace(CONFIG.ROOT_WEBSITE)
        })
      },
      async cargarDatosAreas() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/cargueareas', {params: {idInstitucion: this.$store.state.idInstitucion, vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            alert(response.data.mensaje + ' - Consulta datos Areas')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
          } else {
            if(response.data.datos != 0) {
              this.$store.commit('set', ['datosAreas', response.data.datos])
            } else {
              this.$store.commit('set', ['datosAreas', []])
            }
            //console.log(JSON.stringify(response.data.datos))
          }
        })
        .catch(err => {
          alert('Algo salio mal y no se pudo realizar: Consulta datos Areas. Intente más tarde. ' + err)
          location.replace(CONFIG.ROOT_WEBSITE)
        })
      },
      async cargarDatosSecciones() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/carguesecciones', {params: {idInstitucion: this.$store.state.idInstitucion}})
        .then(response => {
          if (response.data.error){
            alert(response.data.mensaje + ' - Consulta datos Secciones')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
          } else {
            if(response.data.datos != 0) {
              this.$store.commit('set', ['datosSecciones', response.data.datos])
              this.$store.state.datosSecciones.forEach(element => {
                if (element.id_seccion == this.$store.state.idSeccion) {
                  this.$store.commit('set', ['nombreSeccion', element.seccion])
                }
              })
            } else {
              this.$store.commit('set', ['datosSecciones', []])
              this.$store.commit('set', ['nombreSeccion', 'SIN SECCIÓN ACTIVA'])
            }
            //console.log(JSON.stringify(response.data.datos))
          }
        })
        .catch(err => {
          alert('Algo salio mal y no se pudo realizar: Consulta datos Secciones. Intente más tarde. ' + err)
          location.replace(CONFIG.ROOT_WEBSITE)
        })
      },
      async cargarDatosDocentes() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/carguedocentes', {params: {idInstitucion: this.$store.state.idInstitucion}})
        .then(response => {
          if (response.data.error){
            alert(response.data.mensaje + ' - Consulta datos Docentes Activos')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
          } else {
            if(response.data.datos != 0) {
              this.$store.commit('set', ['datosDocentes', response.data.datos])
            } else {
              this.$store.commit('set', ['datosDocentes', []])
            }
          }
        })
        .catch(err => {
          alert('Algo salio mal y no se pudo realizar: Consulta datos Docentes Activos. Intente más tarde. ' + err)
          location.replace(CONFIG.ROOT_WEBSITE)
        })
      },
      async cargarDatosRutas() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/carguerutas', {params: {idInstitucion: this.$store.state.idInstitucion}})
        .then(response => {
          if (response.data.error){
            alert(response.data.mensaje + ' - Consulta datos Rutas IE')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
          } else {
            if(response.data.datos != 0) {
              this.$store.commit('set', ['datosRutas', response.data.datos])
            } else {
              this.$store.commit('set', ['datosRutas', []])
            }
          }
          //console.log(JSON.stringify(response.data.datos))
        })
        .catch(err => {
          alert('Algo salio mal y no se pudo realizar: Consulta datos Rutas IE. Intente más tarde. ' + err)
          location.replace(CONFIG.ROOT_WEBSITE)
        })
      },
      async cargarDatosEspecialidades() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/cargueespecialidades', {params: {idInstitucion: this.$store.state.idInstitucion}})
        .then(response => {
          if (response.data.error){
            alert(response.data.mensaje + ' - Consulta datos Especialidades IE')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
          } else {
            if(response.data.datos != 0) {
              this.$store.commit('set', ['datosEspecialidades', response.data.datos])
            } else {
              this.$store.commit('set', ['datosEspecialidades', []])
            }
          }
        })
        .catch(err => {
          alert('Algo salio mal y no se pudo realizar: Consulta datos Especialidades IE. Intente más tarde. ' + err)
          location.replace(CONFIG.ROOT_WEBSITE)
        })
      },
      async cargarDatosEscalafones() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/cargueescalafones')
        .then(response => {
          if (response.data.error){
            alert(response.data.mensaje + ' - Consulta datos Escalafones')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
          } else {
            if(response.data.datos != 0) {
              this.$store.commit('set', ['datosEscalafones', response.data.datos])
            } else {
              this.$store.commit('set', ['datosEscalafones', []])
            }
          }
        })
        .catch(err => {
          alert('Algo salio mal y no se pudo realizar: Consulta datos Escalafones. Intente más tarde. ' + err)
          location.replace(CONFIG.ROOT_WEBSITE)
        })
      },
      async cargarDatosSesionUsuario() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/iniciosesion', { params: { idPersona: this.tokenDecodificado.id_persona, idRol: this.tokenDecodificado.id_rol, idIE: this.tokenDecodificado.id_institucion }})
        .then(response => {
          if (response.data.error){
            alert(response.data.mensaje + ' - Consulta datos del Usuario de la Sesión')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
          } else{
            //console.log('Sesion: ' + JSON.stringify(response.data.datos))
            if (response.data.datos == 0) {
              alert('¡Lo sentimos!. El Usuario no tiene permisos asignados.')
              location.replace(CONFIG.ROOT_MODULO_LOGIN)
            } else {
              this.$store.commit('set', ['nombreUsuario', response.data.datos.usuario.nombre1])
              this.$store.commit('set', ['apellidoUsuario', response.data.datos.usuario.apellido1])
              this.$store.commit('set', ['generoUsuario', response.data.datos.usuario.id_genero])
              this.$store.commit('set', ['rol', response.data.datos.usuario.rol])
              this.$store.commit('set', ['nemoRol', response.data.datos.usuario.nemo])
              if (response.data.datos.usuario.foto == null || response.data.datos.usuario.foto == '') {
                this.$store.commit('set', ['foto', CONFIG.FOTO])
              } else {
                this.$store.commit('set', ['foto', response.data.datos.usuario.foto])
              }
              this.$store.commit('set', ['correoUsuario', response.data.datos.usuario.correo])

              this.$store.commit('set', ['nombreInstitucion', response.data.datos.ie.institucion])
              this.$store.commit('set', ['nemoInstitucion', response.data.datos.ie.nemo])
              this.$store.commit('set', ['escudoInstitucion', response.data.datos.ie.escudo])
              this.$store.commit('set', ['correoInstitucion', response.data.datos.ie.correo])
              this.$store.commit('set', ['sectorInstitucion', response.data.datos.ie.sector])
              this.$store.commit('set', ['daneInstitucion', response.data.datos.ie.dane])
              this.$store.commit('set', ['nitInstitucion', response.data.datos.ie.nit])

              this.$store.commit('set', ['aLectivo', response.data.datos.configuracion.a_lectivo])
              this.$store.commit('set', ['aMatriculas', response.data.datos.configuracion.a_matriculas])
              this.$store.commit('set', ['FichaMatricula', response.data.datos.configuracion.ficha_matricula])
              this.$store.commit('set', ['NombreRector', response.data.datos.configuracion.rector])
              this.$store.commit('set', ['DocumentoRector', response.data.datos.configuracion.documento_rector])
              this.$store.commit('set', ['CargoRector', response.data.datos.configuracion.cargo_rector])
              this.$store.commit('set', ['NombreSecretaria', response.data.datos.configuracion.secretaria])
              this.$store.commit('set', ['DocumentoSecretaria', response.data.datos.configuracion.documento_secretaria])
              this.$store.commit('set', ['CargoSecretaria', response.data.datos.configuracion.cargo_secretaria])
                            
              this.cargarDatosDocentes()
              this.cargarDatosSedes()
              this.cargarDatosGrados()
              this.cargarDatosCursos()
              this.cargarDatosRutas()
              this.cargarDatosEspecialidades()
              this.cargarDatosAreas()
              this.cargarDatosAsignaturas()
              this.cargarDatosSecciones()
              this.cargarDatosEscalafones()

              this.trazaProceso('Inicio de Sesión')
            }
          }
        })
        .catch(err => {
          alert('Algo salio mal y no se pudo realizar: Consulta datos del Usuario de la Sesión. Intente más tarde. ' + err)
          location.replace(CONFIG.ROOT_WEBSITE)
        })
      },
      async iniciarVista() {
        let idSeccion = sessionStorage.getItem('idSeccion')
        if ( idSeccion == null ) {
          idSeccion = 1
          sessionStorage.setItem('idSeccion', idSeccion)
        }
        this.$store.commit('set', ['idSeccion', idSeccion])
        let token = sessionStorage.getItem('token')
        jwt.verify(token, CONFIG.SECRET_KEY, (err, data) => {
          if (err) {
            alert('¡Lo sentimos!, el token no es válido o el token ha expirado.! Es necesario iniciar una nueva sesión.')
            location.replace(CONFIG.ROOT_WEBSITE)
          } else {
            this.tokenDecodificado = jwt.decode(token)
            //console.log(JSON.stringify(this.tokenDecodificado))
            this.$store.commit('set', ['idUsuario', this.tokenDecodificado.id])
            this.$store.commit('set', ['usuario', this.tokenDecodificado.usuario])
            this.$store.commit('set', ['clave', this.tokenDecodificado.clave])
            this.$store.commit('set', ['idPersona', this.tokenDecodificado.id_persona])
            this.$store.commit('set', ['idRol', this.tokenDecodificado.id_rol])
            this.$store.commit('set', ['idEntorno', this.tokenDecodificado.id_entorno])
            this.$store.commit('set', ['idInstitucion', this.tokenDecodificado.id_institucion])
            this.$store.commit('set', ['idSector', this.tokenDecodificado.id_sector])
            this.$store.commit('set', ['perMatricular', this.tokenDecodificado.permisos.perMatricular])
            this.$store.commit('set', ['perOrgaListas', this.tokenDecodificado.permisos.perOrgaListas])
            this.$store.commit('set', ['perProgPeriodos', this.tokenDecodificado.permisos.perProgPeriodos])
            this.$store.commit('set', ['perActDocente', this.tokenDecodificado.permisos.perActDocente])
            this.$store.commit('set', ['perActEstudiante', this.tokenDecodificado.permisos.perActEstudiante])
            this.$store.commit('set', ['perAsigCarga', this.tokenDecodificado.permisos.perAsigCarga])
            this.escudoI = CONFIG.ROOT_ESCUDOS
            this.cargarDatosSesionUsuario()
            this.cargarDatosTablas()
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
