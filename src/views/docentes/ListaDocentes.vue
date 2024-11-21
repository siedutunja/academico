<template>
  <div>
    <b-row>
      <b-col lg="12">
        <h3 class="ml-2"><b-icon icon="person-square" aria-hidden="true"></b-icon> GESTIÓN DE DOCENTES</h3>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <div class="card-header-actions float-right">
              <CLink href="#" class="card-header-action btn-setting mx-1 text-primary" @click="nuevoDocente" title="Nuevo Docente">
                <CIcon name="cilMedicalCross"/>
              </CLink>
            </div>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> LISTA DE DOCENTES</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <vue-good-table :columns="encabColumnas" :rows="listaDocentes" styleClass="vgt-table condensed bordered striped" :line-numbers="true" :search-options="{enabled: true,placeholder: 'Buscar docente...'}">
                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'idDocente'">
                      <span style="font-weight: bold; color: blue; cursor: pointer" @click="seleccionarDocente(props.row)" title="Consultar/Actualizar Datos del Docente"><CIcon name="cilPencil"/></span>
                    </span>
                  </template>
                  <div slot="emptystate">
                    <h5 class="text-danger ml-5">No existen docentes creados</h5>
                  </div>
                </vue-good-table>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Consulte o actualice los datos de un docente haciendo clic en el lapiz.</em>
          </template>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalCrearEditarDocente" size="xl" scrollable hide-footer :title="datosDocente.editarDocente ? 'Editar Datos del Docente' : 'Nuevo Docente'" ok-only>
      <div class="mx-3">
        <div>
          <FichaDocente :datosDocente="datosDocente"  @retorno="datosRecibidosDocente"/>
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
  import FichaDocente from '@/views/docentes/FichaDocente'

  export default {
    name: 'listadocentes',
    components: {
      VueGoodTable,
      FichaDocente
    },
    data () {
      return {
        listaDocentes: [],
        datosDocente: {
          idDocente: null,
          idDocenteIE: null,
          documento: null,
          id_tipo_documento: null,
          id_municipio_documento: null,
          nombre1: null,
          nombre2: null,
          apellido1: null,
          apellido2: null,
          id_genero: null,
          fecha_nacimiento: null,
          id_rh: null,
          id_escalafon: null,
          titulo: null,
          direccion: null,
          id_municipio_direccion: null,
          telefono1: null,
          telefono2: null,
          correo: null,
          idUsuario: null,
          usuario: null,
          clave: null,
          estado: null,
          editarDocente: true
        },
        encabColumnas : [
          { label: 'Docente', field: 'docente' },
          { label: 'Documento', field: 'documento', sortable: false },
          { label: 'Teléfono', field: 'telefono1', sortable: false },
          { label: 'Correo', field: 'correo', sortable: false, },
          { label: 'Usuario', field: 'usuario', sortable: false, },
          { label: 'Estado', field: 'estado', formatFn: this.formatFnE, tdClass: this.tdClassFuncE, sortable: false },
          { label: '', field: 'idDocente', sortable: false }
        ]
      }
    },
    methods: {
      nuevoDocente() {
        this.datosDocente.idDocente = null,
        this.datosDocente.idDocenteIE = null,
        this.datosDocente.documento = null,
        this.datosDocente.id_tipo_documento = null,
        this.datosDocente.id_municipio_documento = null,
        this.datosDocente.nombre1 = null,
        this.datosDocente.nombre2 = null,
        this.datosDocente.apellido1 = null,
        this.datosDocente.apellido2 = null,
        this.datosDocente.id_genero = null,
        this.datosDocente.fecha_nacimiento = null,
        this.datosDocente.id_rh = null,
        this.datosDocente.id_escalafon = null,
        this.datosDocente.titulo = null,
        this.datosDocente.direccion = null,
        this.datosDocente.id_municipio_direccion = null,
        this.datosDocente.telefono1 = null,
        this.datosDocente.telefono2 = null,
        this.datosDocente.correo = null,
        this.datosDocente.idUsuario = null,
        this.datosDocente.usuario = null,
        this.datosDocente.clave = null,
        this.datosDocente.estado = null,
        this.datosDocente.editarDocente = false
        this.$refs['modalCrearEditarDocente'].show()
      },
      seleccionarDocente(item) {
        this.datosDocente.idDocente = item.idDocente
        this.datosDocente.idDocenteIE = item.idDocenteIE
        this.datosDocente.documento = item.documento
        this.datosDocente.id_tipo_documento = item.id_tipo_documento
        this.datosDocente.id_municipio_documento = item.id_municipio_documento
        this.datosDocente.nombre1 = item.nombre1
        this.datosDocente.nombre2 = item.nombre2
        this.datosDocente.apellido1 = item.apellido1
        this.datosDocente.apellido2 = item.apellido2
        this.datosDocente.id_genero = item.id_genero
        if (item.fecha_nacimiento != null && item.fecha_nacimiento != '') {
          this.datosDocente.fecha_nacimiento = item.fecha_nacimiento.substr(0,10)
        }
        this.datosDocente.id_rh = item.id_rh
        this.datosDocente.id_escalafon = item.id_escalafon
        this.datosDocente.titulo = item.titulo
        this.datosDocente.direccion = item.direccion
        this.datosDocente.id_municipio_direccion = item.id_municipio_direccion
        this.datosDocente.telefono1 = item.telefono1
        this.datosDocente.telefono2 = item.telefono2
        this.datosDocente.correo = item.correo
        this.datosDocente.idUsuario = item.idUsuario
        this.datosDocente.usuario = item.usuario
        this.datosDocente.clave = item.clave
        this.datosDocente.estado = item.estado
        this.datosDocente.editarDocente = true
        this.$refs['modalCrearEditarDocente'].show()
      },
      datosRecibidosDocente(retorno) {
        if (retorno == 1) 
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'El docente se ha creado correctamente.')
        else if (retorno == 2)
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos del docente se han actualizado correctamente.')
        else if (retorno == 3)
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'El docente ha cambiado se estado correctamente.')

        this.consultarListaDocentes()
        this.$refs['modalCrearEditarDocente'].hide()
      },
      async consultarListaDocentes() {
        this.listaDocentes = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/docentes', {params: {idInstitucion: this.$store.state.idInstitucion}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Docentes')
          } else{
            if (response.data.datos != 0) {
              this.listaDocentes = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Docentes. Intente más tarde.' + err)
        })
      },
      formatFnE: function(value) {
        if (value == 0) {
          return 'INACTIVO'
        }
        return 'ACTIVO'
      },
      tdClassFuncE(row) {
        if (row.estado == 0) { 
          return 'text-danger text-left' 
        } else { 
          return 'text-success text-left' 
        }
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      if(this.$store.state.idRol == 1 || this.$store.state.idRol == 12) {
        this.consultarListaDocentes()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>