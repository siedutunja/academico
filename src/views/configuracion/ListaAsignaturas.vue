<template>
  <div>
    <b-row>
      <b-col lg="12">
        <h3 class="ml-2"><b-icon icon="filter-square" aria-hidden="true"></b-icon> ASIGNATURAS DE LA INSTITUCIÓN EDUCATIVA</h3>
      </b-col>
    </b-row>
    <b-row class="mt-2" v-if="hayAsignaturas">
      <b-col lg="12">
        <b-card>
          <template #header>
            <div class="card-header-actions float-right" v-if="$store.state.idRol == 1">
              <CLink href="#" class="card-header-action btn-setting mx-1 text-primary" @click="nuevaAsignatura" title="Nueva Area">
                <CIcon name="cilMedicalCross"/>
              </CLink>
            </div>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> LISTA DE ASIGNATURAS</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <vue-good-table :columns="encabColumnas" :rows="listaAsignaturas" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'idAsignatura'">
                      <span style="font-weight: bold; color: blue; cursor: pointer" @click="seleccionarAsignatura(props.row)" title="Consultar/Actualizar Datos del Area"><CIcon name="cilPencil"/></span>
                    </span>
                  </template>
                  <div slot="emptystate">
                    <h5 class="text-danger ml-5">No existen asignaturas creadas</h5>
                  </div>
                </vue-good-table>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Consulte o actualice los datos de la asignatura haciendo clic en el lapiz.</em>
          </template>
        </b-card>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col lg="12">
        <b-card>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <h5>No se han creado las asignaturas para la Institución Educativa.</h5>
                <b-button class="small mt-5" variant="primary" @click="validarCrearAsignaturas" v-if="$store.state.idRol==1">Crear Asignaturas</b-button>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalCrearEditarAsignatura" size="xl" scrollable hide-footer :title="datosAsignatura.editarAsignatura ? 'Editar Datos de la Asignatura' : 'Nueva Asignatura'" ok-only>
      <div class="mx-3">
        <div>
          <FichaAsignatura :datosAsignatura="datosAsignatura"  @retorno="datosRecibidosAsignatura"/>
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
  import FichaAsignatura from '@/views/configuracion/FichaAsignatura'

  export default {
    name: 'listaasignaturas',
    components: {
      VueGoodTable,
      FichaAsignatura
    },
    data () {
      return {
        listaAsignaturas: [],
        hayAsignaturas: null,
        datosAsignatura: {
          idAsignatura: null,
          asignatura: null,
          id_area_vigencia: null,
          nemo: null,
          id_institucion: null,
          vigencia: null,
          estado: null,
          editarAsignatura: true
        },
        encabColumnas : [
          { label: 'Asignatura', field: 'asignatura' },
          { label: 'Nemo', field: 'nemo', sortable: false },
          { label: 'Area', field: 'area' },
          { label: 'Vigencia', field: 'vigencia', sortable: false },
          { label: 'Estado', field: 'estado', formatFn: this.formatFnE, tdClass: this.tdClassFuncE, sortable: false },
          { label: '', field: 'idAsignatura', sortable: false }
        ]
      }
    },
    methods: {
      validarCrearAsignaturas() {
        let titulo = 'Crear Asignaturas'
        let pregunta = '¿Esta seguro de Crear las Asignaturas para la Institución Educativa?'
        this.$bvModal.msgBoxConfirm(pregunta, {
          title: titulo,
          size: '',
          buttonSize: 'sm',
          okVariant: 'success',
          okTitle: 'Si, ' + titulo,
          cancelVariant: 'danger',
          cancelTitle: 'Cancelar',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.crearAsignaturas()
          }
        })
      },
      async crearAsignaturas() {
        let datosAsignaturasBloque = {}
        datosAsignaturasBloque.idInstitucion = this.$store.state.idInstitucion
        datosAsignaturasBloque.vigencia = this.$store.state.aLectivo
        await axios
        .post(CONFIG.ROOT_PATH + 'academico/asignaturas/bloque', JSON.stringify(datosAsignaturasBloque), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Crear Asignaturas en Bloque')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos de las asignaturas se han actualizado correctamente.')
            this.consultarListaAsignaturas()
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Crear Asignaturas en Bloque. Intente más tarde. ' + err)
        })
      },
      nuevaAsignatura() {
        this.datosAsignatura.idAsignatura = null
        this.datosAsignatura.asignatura = null
        this.datosAsignatura.id_area_vigencia = null
        this.datosAsignatura.nemo = null
        this.datosAsignatura.id_institucion = this.$store.state.idInstitucion
        this.datosAsignatura.vigencia = this.$store.state.aLectivo
        this.datosAsignatura.estado = 1
        this.datosAsignatura.editarAsignatura = false
        this.$refs['modalCrearEditarAsignatura'].show()
      },
      seleccionarAsignatura(item) {
        this.datosAsignatura.idAsignatura = item.idAsignatura
        this.datosAsignatura.asignatura = item.asignatura
        this.datosAsignatura.id_area_vigencia = item.id_area_vigencia
        this.datosAsignatura.nemo = item.nemo
        this.datosAsignatura.estado = item.estado
        this.datosAsignatura.editarAsignatura = true
        this.$refs['modalCrearEditarAsignatura'].show()
      },
      datosRecibidosAsignatura(retorno) {
        if (retorno == 1) 
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'La Asignatura se ha creado correctamente.')
        else if (retorno == 2)
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos de la Asigntura se han actualizado correctamente.')
        this.consultarListaAsignaturas()
        this.$refs['modalCrearEditarAsignatura'].hide()
      },
      async consultarListaAsignaturas() {
        this.hayAsignaturas = false
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/asignaturas', {params: {idInstitucion: this.$store.state.idInstitucion, vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista areas')
          } else{
            if (response.data.datos != 0) {
              this.listaAsignaturas = response.data.datos
              this.hayAsignaturas = true
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista areas. Intente más tarde.' + err)
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
        this.consultarListaAsignaturas()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>