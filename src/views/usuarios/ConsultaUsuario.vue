<template>
  <div>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader color="info" text-color="light">
            <h5 class="my-0">Consulta Usuario</h5>
          </CCardHeader>
          <CCardBody>
            <b-row>
              <b-col lg="3" md="4" class="mb-5">
                <b-row>
                  <b-col lg="12">
                    <div class="text-center">
                      <img :src="this.datosFuncionario.foto" width="250px">
                    </div>
                    <hr>
                  </b-col>
                </b-row>
              </b-col>
              <b-col lg="9" md="8">
                <b-row>
                  <b-col lg="12">
                    <div class="card-header-actions">
                      <CLink href="#" class="card-header-action btn-setting mr-2" @click="editarFuncionario" title="Editar Datos del Usuario">
                        <CIcon name="cilPencil"/>
                      </CLink>
                    </div>
                    <h2 class="text-info"><span>{{ datosFuncionario.apellido1 }} {{ datosFuncionario.apellido2 }}</span> <span class="text-muted">{{ datosFuncionario.nombre1 }} {{ datosFuncionario.nombre2 }}</span></h2>
                  </b-col>
                  <b-col lg="12">
                    <b-table-simple hover>
                      <b-tbody>
                        <b-tr>
                          <b-th>Documento:</b-th>
                          <b-td>{{ datosFuncionario.tipoDocumento }} #: {{ datosFuncionario.documento }} de {{ datosFuncionario.muniDocumento }}</b-td>
                        </b-tr>
                        <b-tr>
                          <b-th>Fecha de Nacimiento:</b-th>
                          <b-td>{{ fechaNacimiento }}</b-td>
                        </b-tr>
                        <b-tr>
                          <b-th>Genero:</b-th>
                          <b-td>{{ datosFuncionario.genero }}</b-td>
                        </b-tr>
                        <b-tr>
                          <b-th>Rh:</b-th>
                          <b-td>{{ datosFuncionario.rh }}</b-td>
                        </b-tr>
                        <b-tr>
                          <b-th>Dirección:</b-th>
                          <b-td>{{ datosFuncionario.direccion }}</b-td>
                        </b-tr>
                        <b-tr>
                          <b-th>Municipio:</b-th>
                          <b-td>{{ datosFuncionario.muniDireccion }}</b-td>
                        </b-tr>
                        <b-tr>
                          <b-th>Teléfono:</b-th>
                          <b-td>{{ telefonos }}</b-td>
                        </b-tr>
                        <b-tr>
                          <b-th>Correo:</b-th>
                          <b-td>{{ datosFuncionario.correo }}</b-td>
                        </b-tr>
                        <b-tr>
                          <b-th>Cargo:</b-th>
                          <b-td>{{ datosFuncionario.cargo }}</b-td>
                        </b-tr>
                        <b-tr>
                          <b-th>Id:</b-th>
                          <b-td>{{ datosFuncionario.idPersona }}</b-td>
                        </b-tr>
                        <b-tr>
                          <b-th>Estado:</b-th>
                          <b-td>
                            <b-button v-if="datosFuncionario.estado" class="small" variant="success" @click="cambiarEstadoFuncionario">ACTIVO</b-button>
                            <b-button v-else class="small" variant="danger" @click="cambiarEstadoFuncionario">INACTIVO</b-button>
                          </b-td>
                        </b-tr>
                      </b-tbody>
                    </b-table-simple>
                  </b-col>
                </b-row>
                <b-row v-if="datosFuncionario.estado" class="mt-5">
                  <b-col lg="12">
                    <div class="card-header-actions" v-if="$store.state.idRol==5">
                      <CLink href="#" class="card-header-action btn-setting mr-2" @click="editarPerfilUsuario" title="Editar Perfil del Usuario">
                        <CIcon name="cilPencil"/>
                      </CLink>
                    </div>
                    <h2>Perfil del Usuario</h2>
                  </b-col>
                  <b-col lg="12">
                    <b-table-simple hover>
                      <b-tbody>
                        <b-tr>
                          <b-th>Rol:</b-th>
                          <b-td>{{ datosPerfilUsuario.rol }}</b-td>
                        </b-tr>
                        <b-tr>
                          <b-th>Dependencia:</b-th>
                          <b-td>{{ datosPerfilUsuario.dependencia }}</b-td>
                        </b-tr>
                        <b-tr>
                          <b-th>Vigencia:</b-th>
                          <b-td>{{ datosPerfilUsuario.vigencia != null ? datosPerfilUsuario.vigencia.substr(0,10) : "Sin Asignar" }}</b-td>
                        </b-tr>
                        <b-tr>
                          <b-th>Id:</b-th>
                          <b-td>{{ datosPerfilUsuario.idUsuario }}</b-td>
                        </b-tr>
                      </b-tbody>
                    </b-table-simple>
                  </b-col>
                </b-row>
                <b-row class="mt-5">
                  <b-col lg="12">
                    <h2>Permisos</h2>
                    <hr>
                    <b-form-group label="Marque los procesos a los que va a tener acceso el Usuario:" v-slot="{ ariaDescribedby }" style="font-weight: bold; font-size: 16">
                      <b-form-checkbox-group class="ml-4 font-weight-normal" v-model="estadoPermisos" :options="opcionesPermisos" :aria-describedby="ariaDescribedby"></b-form-checkbox-group>
                    </b-form-group>
                  </b-col>
                  <b-col lg="12" md="12">
                    <b-button small variant="info" @click="actualizarPermisos">Actualizar Permisos</b-button>
                  </b-col>
                </b-row>
                <b-row class="mt-5">
                  <b-col lg="12">
                    <h2>Datos Inicio de Sesión</h2>
                  </b-col>
                  <b-col lg="12">
                    <b-table-simple hover>
                      <b-tbody>
                        <b-tr>
                          <b-th>Usuario:</b-th>
                          <b-td>{{ datosPerfilUsuario.usuario }}</b-td>
                        </b-tr>
                        <b-tr>
                          <b-th>Contraseña:</b-th>
                          <b-td>{{ datosPerfilUsuario.clave }}</b-td>
                        </b-tr>
                      </b-tbody>
                    </b-table-simple>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <b-modal ref="modalEditarFuncionario" size="xl" scrollable hide-footer title="Editar Datos del Usuario" ok-only>
      <div class="mx-3">
        <div>
          <EditarUsuario :datosFuncionario="datosFuncionario" @retorno="datosRecibidosFuncionario"/>
        </div>
      </div>
    </b-modal>
    <b-modal ref="modalEditarPerfilUsuario" scrollable hide-footer title="Editar Perfil del Usuario" ok-only>
      <div class="mx-3">
        <div>
          <EditarPerfilUsuario :datosPerfilUsuario="datosPerfilUsuario" @retorno="datosRecibidosPerfilUsuario"/>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import EditarUsuario from '@/views/usuarios/EditarUsuario'
  import EditarPerfilUsuario from '@/views/usuarios/EditarPerfilUsuario'

  export default {
    name: 'ConsultaUsuario',
    components: {
      EditarUsuario,
      EditarPerfilUsuario
    },
    data () {
      return {
        idUsuario: null,
        datosFuncionario: {
          idPersona: null,
          documento: null,
          id_tipo_documento: null,
          tipoDocumento: null,
          id_municipio_documento: null,
          muniDocumento: null,
          nombre1: null,
          nombre2: null,
          apellido1: null,
          apellido2: null,
          id_genero: null,
          fecha_nacimiento: null,
          genero: null,
          id_rh: null,
          rh: null,
          direccion: null,
          id_municipio_direccion: null,
          muniDireccion: null,
          telefono1: null,
          telefono2: null,
          correo: null,
          cargo: null,
          estado: null
        },
        estadoFuncionario: {
          id_funcionario: null,
          estado: null
        },
        datosPerfilUsuario: {
          idUsuario: null,
          id_rol: null,
          rol: null,
          id_dependencia: null,
          dependencia: null,
          vigencia: null,
          usuario: null,
          clave: null
        },
        telefonos: null,
        fechaNacimiento: null,
        estadoPermisos: [],
        opcionesPermisos: [],
        permisosUsuario: {},
      }
    },
    validations: {
    },
    methods: {
      cambiarEstadoFuncionario() {
        this.$bvModal.msgBoxConfirm('¿Esta seguro de cambiar el estado del usuario?', {
          title: 'Actualizar Datos del Usuario',
          size: '',
          buttonSize: '',
          okVariant: 'success',
          okTitle: 'Si, Actualizar Datos del Usuario',
          cancelTitle: 'Cancelar',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.actualizarEstadoFuncionario()
          }
        })
      },
      async actualizarEstadoFuncionario() {
        this.estadoFuncionario.idUsuario = this.idUsuario
        this.estadoFuncionario.idPersona = this.datosFuncionario.idPersona
        this.estadoFuncionario.estado = this.datosFuncionario.estado = !this.datosFuncionario.estado
        await axios
        .put(CONFIG.ROOT_PATH + 'personas/estado', JSON.stringify(this.estadoFuncionario), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Estado Funcionario')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Datos actualizados correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Estado Funcionario. Intente más tarde. ' + err)
        })
      },
      editarPerfilUsuario() {
        this.$refs['modalEditarPerfilUsuario'].show()
      },
      datosRecibidosPerfilUsuario(retorno) {
        this.$refs['modalEditarPerfilUsuario'].hide()
        if (retorno == 1) {
          this.consultaPersona()
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Datos actualizados correctamente.')
        }
      },
      editarFuncionario() {
        this.$refs['modalEditarFuncionario'].show()
      },
      datosRecibidosFuncionario(retorno) {
        this.$refs['modalEditarFuncionario'].hide()
        if (retorno == 1) {
          this.consultaPersona()
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Datos actualizados correctamente.')
        }
      },
      async consultaPersona() {
        this.idUsuario = sessionStorage.getItem("idUsuario")
        await axios
        .get(CONFIG.ROOT_PATH + 'usuarios/persona', { params: { idUsuario: this.idUsuario }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Funcionario')
          } else{
            if (response.data.datos != 0) {
              this.datosFuncionario.idPersona = response.data.datos.idPersona
              this.datosFuncionario.documento = response.data.datos.documento
              this.datosFuncionario.id_tipo_documento = response.data.datos.id_tipo_documento
              this.datosFuncionario.tipoDocumento = response.data.datos.tipoDocumento
              this.datosFuncionario.id_municipio_documento = response.data.datos.id_municipio_documento
              this.datosFuncionario.muniDocumento = response.data.datos.muniDocumento
              this.datosFuncionario.nombre1 = response.data.datos.nombre1
              this.datosFuncionario.nombre2 = response.data.datos.nombre2
              this.datosFuncionario.apellido1 = response.data.datos.apellido1
              this.datosFuncionario.apellido2 = response.data.datos.apellido2
              this.datosFuncionario.fecha_nacimiento = response.data.datos.fecha_nacimiento
              if (this.datosFuncionario.fecha_nacimiento != null) {
                this.fechaNacimiento = this.datosFuncionario.fecha_nacimiento.substr(0,10)
              }
              this.datosFuncionario.id_genero = response.data.datos.id_genero
              this.datosFuncionario.genero = response.data.datos.genero
              this.datosFuncionario.id_rh = response.data.datos.id_rh
              this.datosFuncionario.rh = response.data.datos.rh
              this.datosFuncionario.direccion = response.data.datos.direccion
              this.datosFuncionario.id_municipio_direccion = response.data.datos.id_municipio_direccion
              this.datosFuncionario.muniDireccion = response.data.datos.muniDireccion
              this.datosFuncionario.telefono1 = response.data.datos.telefono1
              this.datosFuncionario.telefono2 = response.data.datos.telefono2
              this.telefonos = this.datosFuncionario.telefono1
              if (this.datosFuncionario.telefono2 != null) {
                this.telefonos +=  " - " + this.datosFuncionario.telefono2
              }
              this.datosFuncionario.correo = response.data.datos.correo
              this.datosFuncionario.cargo = response.data.datos.cargo
              if (response.data.datos.foto == null || response.data.datos.foto == '') {
                this.datosFuncionario.foto = CONFIG.FOTO
              } else {
                this.datosFuncionario.foto = response.data.datos.foto
              }
              this.datosFuncionario.estado = response.data.datos.estado

              this.datosPerfilUsuario.idUsuario = this.idUsuario
              this.datosPerfilUsuario.id_rol = response.data.datos.id_rol
              this.datosPerfilUsuario.rol = response.data.datos.rol
              this.datosPerfilUsuario.id_dependencia = response.data.datos.id_dependencia
              this.datosPerfilUsuario.dependencia = response.data.datos.dependencia
              this.datosPerfilUsuario.vigencia = response.data.datos.vigencia
              this.datosPerfilUsuario.usuario = response.data.datos.usuario
              this.datosPerfilUsuario.clave = response.data.datos.clave
              this.consultaPermisosUsuario()
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Funcionario. Intente más tarde. ' + err)
        })
      },
      async actualizarPermisos() {
        if (this.estadoPermisos.includes('colpresupuesto')) this.permisosUsuario.colpresupuesto = 1; else this.permisosUsuario.colpresupuesto = 0
        if (this.estadoPermisos.includes('coltramites')) this.permisosUsuario.coltramites = 1; else this.permisosUsuario.coltramites = 0
        if (this.estadoPermisos.includes('colcobertura')) this.permisosUsuario.colcobertura = 1; else this.permisosUsuario.colcobertura = 0
        if (this.estadoPermisos.includes('colpmidirectiva')) this.permisosUsuario.colpmidirectiva = 1; else this.permisosUsuario.colpmidirectiva = 0
        if (this.estadoPermisos.includes('colpmiacademica')) this.permisosUsuario.colpmiacademica = 1; else this.permisosUsuario.colpmiacademica = 0
        if (this.estadoPermisos.includes('colpmiadmin')) this.permisosUsuario.colpmiadmin = 1; else this.permisosUsuario.colpmiadmin = 0
        if (this.estadoPermisos.includes('colpmicomunidad')) this.permisosUsuario.colpmicomunidad = 1; else this.permisosUsuario.colpmicomunidad = 0
        if (this.estadoPermisos.includes('colsiee')) this.permisosUsuario.colsiee = 1; else this.permisosUsuario.colsiee = 0
        if (this.estadoPermisos.includes('colpmi')) this.permisosUsuario.colpmi = 1; else this.permisosUsuario.colpmi = 0
        await axios
        .put(CONFIG.ROOT_PATH + 'usuarios/permisos/colegio', JSON.stringify(this.permisosUsuario), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Permisos')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Datos actualizados correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Permisos. Intente más tarde. ' + err)
        })
      },
      async consultaPermisosUsuario() {
        await axios
        .get(CONFIG.ROOT_PATH + 'usuarios/permisos/colegio', { params: { idUsuario: this.idUsuario }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Permisos Usuario')
          } else{
            if (response.data.datos != 0) {
              this.permisosUsuario = response.data.datos
              if (this.$store.state.idSectorInstitucion == 1) {
                if (this.permisosUsuario.colpresupuesto == 1) this.estadoPermisos.push("colpresupuesto")
                if (this.permisosUsuario.coltramites == 1) this.estadoPermisos.push("coltramites")
                if (this.permisosUsuario.colcobertura == 1) this.estadoPermisos.push("colcobertura")
                if (this.permisosUsuario.colpmidirectiva == 1) this.estadoPermisos.push("colpmidirectiva")
                if (this.permisosUsuario.colpmiacademica == 1) this.estadoPermisos.push("colpmiacademica")
                if (this.permisosUsuario.colpmiadmin == 1) this.estadoPermisos.push("colpmiadmin")
                if (this.permisosUsuario.colpmicomunidad == 1) this.estadoPermisos.push("colpmicomunidad")
                if (this.permisosUsuario.colsiee == 1) this.estadoPermisos.push("colsiee")
                if (this.permisosUsuario.colpmi == 1) this.estadoPermisos.push("colpmi")
              } else {
                this.estadoPermisos.push("coltramites")
              }
            } else {
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'El Usuario no tiene Permisos')
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Permisos Usuario. Intente más tarde. ' + err)
        })
      },
      iniciarVista() {
        if(this.$store.state.idRol == 5) {
          if (this.$store.state.idSectorInstitucion == 1) {
            this.opcionesPermisos = [
              { text: 'Presupuesto - Gestión de las transferencias asignadas a la Institución Educativa', value: 'colpresupuesto' },
              { text: 'Trámites en Línea - Gestión de solicitudes realizadas por las Instituciones Educativas', value: 'coltramites' },
              { text: 'Cobertura - Gestión de preinscripciones recibidas por las Instituciones Educativas', value: 'colcobertura' },
              { text: 'Calidad Educativa - Gestión del Sistema Institucional de Evaluación en las Instituciones Educativas', value: 'colsiee' },
              { text: 'Calidad Educativa - Gestión del Plan de Mejoramiento Institucional en las Instituciones Educativas', value: 'colpmi' },
              { text: 'Calidad Educativa - Pmi - Ruta de Mejoramiento Institucional - Gestión Directiva', value: 'colpmidirectiva' },
              { text: 'Calidad Educativa - Pmi - Ruta de Mejoramiento Institucional - Gestión Académica', value: 'colpmiacademica' },
              { text: 'Calidad Educativa - Pmi - Ruta de Mejoramiento Institucional - Gestión Administrativa y Financiera', value: 'colpmiadmin' },
              { text: 'Calidad Educativa - Pmi - Ruta de Mejoramiento Institucional - Gestión de la Comunidad', value: 'colpmicomunidad' },
            ]
          } else {
            this.opcionesPermisos = [{ text: 'Trámites en Línea - Gestión de solicitudes realizadas por las Instituciones Educativas', value: 'coltramites' }]
          }
          this.consultaPersona()
        } else {
          this.$router.push('/restringida')
        }
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.iniciarVista()
    }
  }
</script>
