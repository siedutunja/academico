<template>
  <div>
    <b-row>
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0 text-center">FORMULARIO DE MATRICULA DE ESTUDIANTE<br> Año Lectivo {{ $store.state.aLectivo }}</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col>
                <b-alert class="text-center" show>ESTUDIANTE<br><h4 class="mb-0"><b>{{ infoMatricula.estudiante }}</b></h4><span>{{ idMatricula }}</span></b-alert>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="12">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <div class="card-header-actions float-right">
                      <CLink href="#" class="card-header-action btn-setting mx-1 text-primary" @click="asociarAcudiente" title="Asociar el Acudiente">
                        <CIcon name="cilMedicalCross"/>
                      </CLink>
                    </div>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> INFORMACIÓN ACUDIENTE DEL ESTUDIANTE</h5>
                  </template>
                  <b-card-text>
                    <b-row>
                      <b-col lg="12">
                        <vue-good-table :columns="encabColumnasAcudiente" :rows="listaAcudientes" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                          <template slot="table-row" slot-scope="props">
                            <span v-if="props.column.field == 'idAcudiente'">
                              <span style="font-weight: bold; color: blue; cursor: pointer" @click="seleccionarAcudiente(props.row)" title="Consultar/Actualizar Datos del Acudiente"><CIcon name="cilPencil"/></span>
                            </span>
                          </template>
                          <div slot="emptystate">
                            <h5 class="text-danger ml-5">Aún no se ha asociado el Acudiente a la Matricula del Estudiante.</h5>
                          </div>
                        </vue-good-table>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
            <br>
            <b-row>
              <b-col lg="12">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <div class="card-header-actions float-right">
                      <CLink href="#" class="card-header-action btn-setting mx-1 text-primary" @click="asociarPapa" title="Asociar el Padre">
                        <CIcon name="cilMedicalCross"/>
                      </CLink>
                    </div>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> INFORMACIÓN DEL PADRE DEL ESTUDIANTE</h5>
                  </template>
                  <b-card-text>
                    <b-row>
                      <b-col lg="12">
                        <vue-good-table :columns="encabColumnasPapa" :rows="listaPapas" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                          <template slot="table-row" slot-scope="props">
                            <span v-if="props.column.field == 'idPapa'">
                              <span style="font-weight: bold; color: blue; cursor: pointer" @click="seleccionarPapa(props.row)" title="Consultar/Actualizar Datos del Padre"><CIcon name="cilPencil"/></span>
                            </span>
                          </template>
                          <div slot="emptystate">
                            <h5 class="text-danger ml-5">Aún no se ha asociado el Padre a la Matricula del Estudiante.</h5>
                          </div>
                        </vue-good-table>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
            <br>
            <b-row>
              <b-col lg="12">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <div class="card-header-actions float-right">
                      <CLink href="#" class="card-header-action btn-setting mx-1 text-primary" @click="asociarMama" title="Asociar la Madre">
                        <CIcon name="cilMedicalCross"/>
                      </CLink>
                    </div>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> INFORMACIÓN DE LA MADRE DEL ESTUDIANTE</h5>
                  </template>
                  <b-card-text>
                    <b-row>
                      <b-col lg="12">
                        <vue-good-table :columns="encabColumnasMama" :rows="listaMamas" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                          <template slot="table-row" slot-scope="props">
                            <span v-if="props.column.field == 'idMama'">
                              <span style="font-weight: bold; color: blue; cursor: pointer" @click="seleccionarMama(props.row)" title="Consultar/Actualizar Datos de la Madre"><CIcon name="cilPencil"/></span>
                            </span>
                          </template>
                          <div slot="emptystate">
                            <h5 class="text-danger ml-5">Aún no se ha asociado la Madre a la Matricula del Estudiante.</h5>
                          </div>
                        </vue-good-table>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <div class="float-right text-medium-emphasis text-info">* Campo requerido</div>
            <b-button class="small" variant="info" @click="imprimirFormulario">Imprimir Formulario de la Matricula del Estudiante</b-button>
            <b-button class="small ml-3" variant="primary" @click="nuevoFormulario">Ir a Nueva Matricula</b-button>
            <b-button class="small ml-3" variant="secondary" @click="cancelarFormulario">Cerrar Formulario de Matricula</b-button>
          </template>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalCrearEditarAcudiente" size="xl" scrollable hide-footer :title="datosAcudiente.editarAcudiente ? 'Editar Datos del Acudiente' : 'Asociar Acudiente'" ok-only>
      <div class="mx-3">
        <div>
          <FichaAcudiente :datosAcudiente="datosAcudiente"  @retorno="datosRecibidosAcudiente"/>
        </div>
      </div>
    </b-modal>
    <b-modal ref="modalCrearEditarPapa" size="xl" scrollable hide-footer :title="datosPapa.editarPapa ? 'Editar Datos del Padre' : 'Asociar Padre'" ok-only>
      <div class="mx-3">
        <div>
          <FichaPapa :datosPapa="datosPapa"  @retorno="datosRecibidosPapa"/>
        </div>
      </div>
    </b-modal>
    <b-modal ref="modalCrearEditarMama" size="xl" scrollable hide-footer :title="datosMama.editarMama ? 'Editar Datos de la Madre' : 'Asociar Madre'" ok-only>
      <div class="mx-3">
        <div>
          <FichaMama :datosMama="datosMama"  @retorno="datosRecibidosMama"/>
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
  import FichaAcudiente from '@/views/estudiantes/FichaAcudiente'
  import FichaPapa from '@/views/estudiantes/FichaPapa'
  import FichaMama from '@/views/estudiantes/FichaMama'

  export default {
    name: 'matricula2',
    components: {
      VueGoodTable,
      FichaAcudiente,
      FichaPapa,
      FichaMama
    },
    data () {
      return {
        idMatricula: null,
        idEstudiante: null,
        infoMatricula: {
          id_papa: null,
          id_mama: null,
          id_acudiente: null,
          id_parentesco: null
        },
        listaAcudientes: [],
        listaPapas: [],
        listaMamas: [],
        datosAcudiente: {},
        datosPapa: {},
        datosMama: {},
        encabColumnasAcudiente : [
          { label: 'Acudiente', field: 'acudiente', sortable: false },
          { label: 'Documento', field: 'documento', sortable: false },
          { label: 'Parentesco', field: 'parentesco', sortable: false, },
          { label: 'Direccion', field: 'direccion', sortable: false, },
          { label: 'Telefono1', field: 'telefono1', sortable: false },
          { label: 'Teléfono2', field: 'telefono2', sortable: false },
          { label: 'Correo', field: 'correo', sortable: false, },
          { label: '', field: 'idAcudiente', sortable: false }
        ],
        encabColumnasPapa : [
          { label: 'Padre', field: 'papa', sortable: false },
          { label: 'Documento', field: 'documento', sortable: false },
          { label: 'Direccion', field: 'direccion', sortable: false, },
          { label: 'Telefono1', field: 'telefono1', sortable: false },
          { label: 'Teléfono2', field: 'telefono2', sortable: false },
          { label: 'Correo', field: 'correo', sortable: false, },
          { label: '', field: 'idPapa', sortable: false }
        ],
        encabColumnasMama : [
          { label: 'Madre', field: 'mama', sortable: false },
          { label: 'Documento', field: 'documento', sortable: false },
          { label: 'Direccion', field: 'direccion', sortable: false, },
          { label: 'Telefono1', field: 'telefono1', sortable: false },
          { label: 'Teléfono2', field: 'telefono2', sortable: false },
          { label: 'Correo', field: 'correo', sortable: false, },
          { label: '', field: 'idMama', sortable: false }
        ]
      }
    },
    methods: {
      seleccionarAcudiente(item) {
        this.datosAcudiente = item
        if (item.fecha_nacimiento != null && item.fecha_nacimiento != '') {
          this.datosAcudiente.fecha_nacimiento = item.fecha_nacimiento.substr(0,10)
        }
        this.datosAcudiente.idAcudiente = item.idAcudiente
        this.datosAcudiente.idEstudiante = this.infoMatricula.idEstudiante,
        this.datosAcudiente.idParentesco = this.infoMatricula.id_parentesco,
        this.datosAcudiente.editarAcudiente = true
        this.$refs['modalCrearEditarAcudiente'].show()
      },
      seleccionarPapa(item) {
        this.datosPapa = item
        if (item.fecha_nacimiento != null && item.fecha_nacimiento != '') {
          this.datosPapa.fecha_nacimiento = item.fecha_nacimiento.substr(0,10)
        }
        this.datosPapa.idPapa = item.idPapa
        this.datosPapa.idEstudiante = this.infoMatricula.idEstudiante,
        this.datosPapa.editarPapa = true
        this.$refs['modalCrearEditarPapa'].show()
      },
      seleccionarMama(item) {
        this.datosMama = item
        if (item.fecha_nacimiento != null && item.fecha_nacimiento != '') {
          this.datosMama.fecha_nacimiento = item.fecha_nacimiento.substr(0,10)
        }
        this.datosMama.idMama = item.idMama
        this.datosMama.idEstudiante = this.infoMatricula.idEstudiante,
        this.datosMama.editarMama = true
        this.$refs['modalCrearEditarMama'].show()
      },
      imprimirFormulario() {
        alert("¡Lo sentimos!\nEn espera de formato de ficha de matricula para impresión.")
      },
      nuevoFormulario() {
        this.$router.push('/estudiantes/matricula')
      },
      asociarAcudiente() {
        this.datosAcudiente.idEstudiante = this.infoMatricula.idEstudiante,
        this.datosAcudiente.idParentesco = this.infoMatricula.id_parentesco,
        this.datosAcudiente.editarAcudiente = false
        this.$refs['modalCrearEditarAcudiente'].show()
      },
      asociarPapa() {
        this.datosPapa.idEstudiante = this.infoMatricula.idEstudiante,
        this.datosPapa.editarPapa = false
        this.$refs['modalCrearEditarPapa'].show()
      },
      asociarMama() {
        this.datosMama.idEstudiante = this.infoMatricula.idEstudiante,
        this.datosMama.editarMama = false
        this.$refs['modalCrearEditarMama'].show()
      },
      datosRecibidosAcudiente(retorno) {
        if (retorno == 1) 
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'El Acudiente se ha asociado correctamente.')
        else if (retorno == 2)
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos del acudiente se han actualizado correctamente.')
        this.consultarMatricula()
        this.$refs['modalCrearEditarAcudiente'].hide()
      },
      datosRecibidosPapa(retorno) {
        if (retorno == 1) 
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'El Padre se ha asociado correctamente.')
        else if (retorno == 2)
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos del Padre se han actualizado correctamente.')
        this.consultarMatricula()
        this.$refs['modalCrearEditarPapa'].hide()
      },
      datosRecibidosMama(retorno) {
        if (retorno == 1) 
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'La Madre se ha asociado correctamente.')
        else if (retorno == 2)
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos de la Madre se han actualizado correctamente.')
        this.consultarMatricula()
        this.$refs['modalCrearEditarMama'].hide()
      },
      async consultarAcudiente() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/acudientes', {params: {idAcudiente: this.infoMatricula.id_acudiente, idParentesco: this.infoMatricula.id_parentesco}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Acudiente')
          } else{
            if (response.data.datos != 0) {
              this.listaAcudientes = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Acudiente. Intente más tarde.' + err)
        })
      },
      async consultarPapa() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/papas', {params: {idPapa: this.infoMatricula.id_papa}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Papa')
          } else{
            if (response.data.datos != 0) {
              this.listaPapas = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Papa. Intente más tarde.' + err)
        })
      },
      async consultarMama() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/mamas', {params: {idMama: this.infoMatricula.id_mama}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Mama')
          } else{
            if (response.data.datos != 0) {
              this.listaMamas = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Mama. Intente más tarde.' + err)
        })
      },
      async consultarMatricula() {
        this.infoMatricula = {}
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/matricula/familiares', {params: {idMatricula: this.idMatricula}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Familiares')
          } else{
            if (response.data.datos != 0) {
              this.infoMatricula = response.data.datos
              this.consultarAcudiente()
              this.consultarPapa()
              this.consultarMama()
            } else {
              this.$router.push('/')
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Familiares. Intente más tarde.' + err)
        })
      },
      cancelarFormulario() {
        this.$router.push('/')
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.idMatricula = sessionStorage.getItem('idMatricula')
      if((this.$store.state.idRol == 1 || this.$store.state.idRol == 12) && this.idMatricula != null) {
        this.consultarMatricula()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>