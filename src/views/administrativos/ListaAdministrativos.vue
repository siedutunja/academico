<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="person-square" aria-hidden="true"></b-icon> ADMINISTRADORES DE LA INSTITUCIÓN EDUCATIVA</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <b-button class="small float-right" variant="dark" @click="nuevoAdministrativo" v-if="$store.state.idRol==1 || $store.state.idRol==12">Nuevo Administrador</b-button>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Lista de Administradores</h5>
                  </template>
                  <b-card-text>
                    <vue-good-table :columns="encabColumnas" :rows="listaAdministrativos" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                      <template slot="table-row" slot-scope="props">
                        <span v-if="props.column.field == 'idPersona'">
                          <span style="font-weight: bold; color: blue; cursor: pointer" @click="seleccionarFuncionario(props.row)" title="Consultar/Actualizar Datos del Funcionario"><CIcon name="cilPencil"/></span>
                        </span>
                      </template>
                      <div slot="emptystate">
                        <h5 class="text-danger ml-5">No existen Administrativos creados</h5>
                      </div>
                    </vue-good-table>
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Consulte o actualice los datos de un administrativo haciendo clic en el lapiz.</em>
          </template>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalCrearEditarAdministrativo" size="xl" scrollable hide-footer :title="datosAdministrativo.editarAdministrativo ? 'Editar Datos del Administrativo' : 'Nuevo Administrativo'" ok-only>
      <div class="mx-3">
        <div>
          <FichaAdministrativo :datosAdministrativo="datosAdministrativo"  @retorno="datosRecibidosAdministrativo"/>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'
  import FichaAdministrativo from '@/views/administrativos/FichaAdministrativo'

  export default {
    name: 'listaadministrativos',
    components: {
      VueGoodTable,
      FichaAdministrativo
    },
    data () {
      return {
        listaAdministrativos: [],
        datosAdministrativo: {
          id: null,
          documento: null,
          id_tipo_documento: null,
          id_municipio_documento: null,
          nombre1: null,
          nombre2: null,
          apellido1: null,
          apellido2: null,
          id_genero: null,
          fecha_nacimiento: null,
          id_municipio_nacimiento: null,
          id_nacionalidad: null,
          id_rh: null,
          id_estrato: null,
          id_sisben: null,
          id_eps: null,
          direccion: null,
          id_municipio_direccion: null,
          barrio: null,
          id_zona: null,
          telefono1: null,
          telefono2: null,
          correo: null,
          vigencia: null,
          id_rol: null,
          idUsuario: null,
          usuario: null,
          clave: null,
          perMatricular: null,
          perActEstudiante: null,
          perActDocente: null,
          perActDatosCurso: null,
          perActDirCurso: null,
          perSecretaria: null,
          perAsigCarga: null,
          perActNotas: null,
          editarAdministrativo: true
        },
        encabColumnas : [
          { label: 'Apellidos y Nombres', field: 'funcionario' },
          { label: 'Documento', field: 'documento', sortable: false },
          { label: 'Rol', field: 'rol', sortable: false },
          { label: 'Teléfono', field: 'telefono1', sortable: false },
          { label: 'Correo', field: 'correo', sortable: false, },
          { label: 'Usuario', field: 'usuario', sortable: false, },
          { label: '', field: 'idPersona', sortable: false }
        ]
      }
    },
    methods: {
      nuevoAdministrativo() {
        this.datosAdministrativo.editarAdministrativo = false
        this.$refs['modalCrearEditarAdministrativo'].show()
      },
      seleccionarFuncionario(item) {
        this.datosAdministrativo.id = item.id
        this.datosAdministrativo.documento = item.documento
        this.datosAdministrativo.id_tipo_documento = item.id_tipo_documento
        this.datosAdministrativo.id_municipio_documento = item.id_municipio_documento
        this.datosAdministrativo.nombre1 = item.nombre1
        this.datosAdministrativo.nombre2 = item.nombre2
        this.datosAdministrativo.apellido1 = item.apellido1
        this.datosAdministrativo.apellido2 = item.apellido2
        this.datosAdministrativo.id_genero = item.id_genero
        if (item.fecha_nacimiento != null && item.fecha_nacimiento != '') {
          this.datosAdministrativo.fecha_nacimiento = item.fecha_nacimiento.substr(0,10)
        }
        this.datosAdministrativo.id_municipio_nacimiento = item.id_municipio_nacimiento
        this.datosAdministrativo.id_nacionalidad = item.id_nacionalidad
        this.datosAdministrativo.id_rh = item.id_rh
        this.datosAdministrativo.id_estrato = item.id_estrato
        this.datosAdministrativo.id_sisben = item.id_sisben
        this.datosAdministrativo.id_eps = item.id_eps
        this.datosAdministrativo.direccion = item.direccion
        this.datosAdministrativo.id_municipio_direccion = item.id_municipio_direccion
        this.datosAdministrativo.barrio = item.barrio
        this.datosAdministrativo.id_zona = item.id_zona
        this.datosAdministrativo.telefono1 = item.telefono1
        this.datosAdministrativo.telefono2 = item.telefono2
        this.datosAdministrativo.correo = item.correo
        //this.datosAdministrativo.cargo = item.cargo
        if (item.vigencia != null && item.vigencia != '') {
          this.datosAdministrativo.vigencia = item.vigencia.substr(0,10)
        }
        this.datosAdministrativo.id_rol = item.id_rol
        this.datosAdministrativo.idUsuario = item.idUsuario
        this.datosAdministrativo.usuario = item.usuario
        this.datosAdministrativo.clave = item.clave
        this.datosAdministrativo.perMatricular = item.perMatricular
        this.datosAdministrativo.perActEstudiante = item.perActEstudiante
        this.datosAdministrativo.perActDocente = item.perActDocente
        this.datosAdministrativo.perActDatosCurso = item.perActDatosCurso
        this.datosAdministrativo.perActDirCurso = item.perActDirCurso
        this.datosAdministrativo.perSecretaria = item.perSecretaria
        this.datosAdministrativo.perAsigCarga = item.perAsigCarga
        this.datosAdministrativo.perActNotas = item.perActNotas
        this.datosAdministrativo.editarAdministrativo = true
        this.$refs['modalCrearEditarAdministrativo'].show()
      },
      datosRecibidosAdministrativo(retorno) {
        if (retorno == 1) 
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'El funcionario se ha creado correctamente.')
        else if (retorno == 2)
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos del funcionario se han actualizado correctamente.')
        else if (retorno == 3)
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'El funcionario se ha desvinculado correctamente.')

        this.consultarListaAdministrativos()
        this.$refs['modalCrearEditarAdministrativo'].hide()
      },
      async consultarListaAdministrativos() {
        this.listaAdministrativos = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/administrativos', {params: {idInstitucion: this.$store.state.idInstitucion}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista admnistrativos')
          } else{
            if (response.data.datos != 0) {
              this.listaAdministrativos = response.data.datos
            }
          }
          //console.log(JSON.stringify(this.listaAdministrativos))
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista admnistrativos. Intente más tarde.' + err)
        })
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      if(this.$store.state.idRol == 1 || this.$store.state.idRol == 12) {
        this.consultarListaAdministrativos()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>