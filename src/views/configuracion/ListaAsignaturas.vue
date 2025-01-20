<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> ASIGNATURAS DEL PEI</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Seleccione el Área*" label-for="areas" class="etiqueta">
                  <b-form-select  id="areas" ref="areas" v-model="idArea" :options="comboAreas" @change="verAsignaturasArea"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mt-0" v-if="idArea!=null">
              <b-col lg="12"><hr></b-col>
              <b-col lg="12">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <b-button class="small float-right" variant="dark" @click="nuevaAsignatura" v-if="$store.state.idRol==1">Nueva Asignatura</b-button>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Lista de Asignaturas</h5>
                  </template>
                  <b-card-text>
                    <b-row>
                      <b-col lg="12">
                        <vue-good-table :columns="encabColumnas" :rows="listaAsignaturas" styleClass="vgt-table condensed bordered striped " :line-numbers="true">
                          <template slot="table-row" slot-scope="props">
                            <span v-if="props.column.field == 'id'">
                              <span style="font-weight: bold; color: blue; cursor: pointer" @click="seleccionarAsignatura(props.row)" title="Actualizar Datos de la Asignatura"><CIcon name="cilPencil"/></span>
                            </span>
                          </template>
                          <div slot="emptystate">
                            <h5 class="text-danger ml-5">No existen asignaturas creadas</h5>
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
            <em>Consulte o actualice los datos de una asignatura haciendo clic en el lapiz.</em>
          </template>
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
        idArea: null,
        comboAreas: [],
        listaAsignaturas: [],
        hayAsignaturas: null,
        datosAsignatura: {
          id: null,
          asignatura: null,
          id_area: null,
          id_modalidad: null,
          nemo: null,
          estado: null,
          editarAsignatura: true
        },
        encabColumnas : [
          { label: 'Asignatura', field: 'asignatura' },
          { label: 'Nemo', field: 'nemo', sortable: false },
          { label: 'Area', field: 'area' },
          { label: 'Modalidad', field: 'modalidad', sortable: false },
          { label: 'Estado', field: 'estado', formatFn: this.formatFnE, tdClass: this.tdClassFuncE, sortable: false },
          { label: '', field: 'id', sortable: false }
        ]
      }
    },
    methods: {
      nuevaAsignatura() {
        this.datosAsignatura.id = null
        this.datosAsignatura.asignatura = null
        this.datosAsignatura.id_area = this.idArea
        this.datosAsignatura.id_modalidad = null
        this.datosAsignatura.nemo = null
        this.datosAsignatura.estado = 1
        this.datosAsignatura.editarAsignatura = false
        this.$refs['modalCrearEditarAsignatura'].show()
      },
      seleccionarAsignatura(item) {
        this.datosAsignatura.id = item.id
        this.datosAsignatura.asignatura = item.asignatura
        this.datosAsignatura.id_area = item.id_area
        this.datosAsignatura.id_modalidad = item.id_modalidad
        this.datosAsignatura.nemo = item.nemo
        this.datosAsignatura.estado = item.estado
        this.datosAsignatura.editarAsignatura = true
        this.$refs['modalCrearEditarAsignatura'].show()
      },
      datosRecibidosAsignatura(retorno) {
        if (retorno == 1) {
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'La Asignatura se ha creado correctamente.')
        } else if (retorno == 2) {
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos de la Asigntura se han actualizado correctamente.')
        }
        this.verAsignaturasArea()
        this.$refs['modalCrearEditarAsignatura'].hide()
      },
      async verAsignaturasArea() {
        this.listaAsignaturas = []
        this.hayAsignaturas = false
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/asignaturas/area', {params: {idArea: this.idArea}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista asignaturas')
          } else{
            if (response.data.datos != 0) {
              this.listaAsignaturas = response.data.datos
              this.hayAsignaturas = true
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista asignaturas. Intente más tarde.' + err)
        })
      },
      async ocuparComboAreas() {
        this.comboAreas = []
        this.$store.state.datosAreas.forEach(element => {
          this.comboAreas.push({ 'value': element.id, 'text': element.area.toUpperCase() })
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
        this.ocuparComboAreas()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>