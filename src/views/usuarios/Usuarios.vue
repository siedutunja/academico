<template>
  <div>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader color="info" text-color="light">
            <div class="card-header-actions float-right">
              <CLink href="#" class="card-header-action btn-setting mx-1 text-light" @click="nuevoUsuario" title="Nuevo Usuario">
                <CIcon name="cilUserPlus"/>
              </CLink>
            </div>
            <h5 class="my-0">Gestión de Usuarios - Institución Educativa</h5>
          </CCardHeader>
          <CCardBody>
            <h3>Lista de Usuarios</h3>
            <vue-good-table :columns="encabColumnas" :rows="listaUsuarios" styleClass="vgt-table condensed bordered striped" :line-numbers="true"
              :sort-options="{enabled: true,initialSortBy: {field: 'nombreUsuario', type: 'asc'}}"
              :search-options="{enabled: true,placeholder: 'Buscar...'}"
              :pagination-options="{
                enabled: true,
                mode: 'records',
                perPage: 20,
                position: '',
                perPageDropdown: [30, 40, 50],
                dropdownAllowAll: false,
                setCurrentPage: 1,
                nextLabel: 'Siguiente',
                prevLabel: 'Anterior',
                rowsPerPageLabel: 'Filas por página',
                ofLabel: 'de',
                pageLabel: 'Página', // for 'pages' mode
                allLabel: 'Todo',
                //infoFn: (params) => `my own page ${params.firstRecordOnPage}`, 
              }">
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'nombreUsuario'">
                  <span style="font-weight: bold; color: blue; cursor: pointer" @click="seleccionarUsuario(props.row)">{{props.row.nombreUsuario}}</span> 
                </span>
              </template>
              <div slot="emptystate">
                <h5 class="text-danger ml-5">No existen Usuarios</h5>
              </div>
            </vue-good-table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <b-modal ref="modalDocumentoNuevoUsuario" size="lg" scrollable hide-footer title="Validar Documento Usuario" ok-only>
      <div class="mx-3">
        <div>
          <ValidarNuevoDocumento @retorno="datosRecibidosValidarDocumento"/>
        </div>
      </div>
    </b-modal>
    <b-modal ref="modalNuevoUsuario" size="xl" scrollable hide-footer title="Nuevo Usuario" ok-only>
      <div class="mx-3">
        <div>
          <CrearUsuario :datosUsuario="datosUsuario" @retorno="datosRecibidosUsuario"/>
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
  import ValidarNuevoDocumento from '@/views/usuarios/ValidarNuevoDocumento'
  import CrearUsuario from '@/views/usuarios/CrearUsuario'

  export default {
    name: 'GestionUsuarios',
    components: {
      VueGoodTable,
      ValidarNuevoDocumento,
      CrearUsuario
    },
    data () {
      return {
        listaUsuarios: [],
        datosUsuario: {
          idFuncionario: null,
          documento: null
        },
        encabColumnas : [
          { label: 'Apellidos y Nombres', field: 'nombreUsuario' },
          { label: 'Usuario', field: 'usuario', sortable: false },
          { label: 'Rol', field: 'rol', sortable: false },
          { label: 'Dependencia', field: 'dependencia', sortable: false },
          { label: 'Estado', field: 'estado', formatFn: this.formatFnE, tdClass: this.tdClassFuncE, sortable: false },
          { label: 'Vigencia', field: 'vigencia', formatFn: this.formatFnF, tdClass: this.tdClassFuncF, sortable: false }
        ]
      }
    },
    methods: {
      nuevoUsuario() {
        this.$refs['modalDocumentoNuevoUsuario'].show()
      },
      datosRecibidosUsuario(retorno) {
        this.$refs['modalNuevoUsuario'].hide()
        if (retorno != 0) {
          this.verUsuarios()
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'El usuario se ha registrado correctamente.')
        }
      },
      datosRecibidosValidarDocumento(retorno) {
        this.$refs['modalDocumentoNuevoUsuario'].hide()
        if (retorno != 0) {
          this.datosUsuario.idPersona = retorno.idPersona
          this.datosUsuario.documento = retorno.documento
          this.$refs['modalNuevoUsuario'].show()
        }
      },
      seleccionarUsuario(fila) {
        sessionStorage.setItem('idUsuario', fila.idUsuario)
        this.$router.push('./consultausuario')
      },
      async verUsuarios() {
        this.listaUsuarios = []
        await axios
        .get(CONFIG.ROOT_PATH + 'usuarios/personas/colegio', { params: { idColegio: this.$store.state.idInstitucion }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista de Personas')
          } else{
            if (response.data.datos != 0) {
              this.listaUsuarios = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista de Personas. Intente más tarde. ' + err)
        })
      },
      formatFnE: function(value) {
        if (value == 0) {
          return 'Inactivo'
        }
        return 'Activo'
      },
      tdClassFuncE(row) {
        if (row.estado == 0) { 
          return 'text-danger text-left' 
        } else { 
          return 'text-success text-left' 
        }
      },
      formatFnF: function(value) {
        if (value != null && value != '') {
          return value.substr(0,10)
        }
        return '-'
      },
      tdClassFuncF(row) {
        let fechaAhora = new Date()
        let fechaVigencia = new Date(row.vigencia)
        if (fechaVigencia.getTime() >= fechaAhora.getTime())
            return 'text-success text-left'
        else 
            return 'text-danger text-left'
      },
      tdClassFuncV() {
        return 'text-center'
      },
      iniciarVista() {
        if(this.$store.state.idRol == 5) {
          this.verUsuarios()
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
