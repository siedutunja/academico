<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> ESPECIALIDADES DE LA INSTITUCIÓN EDUCATIVA</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <b-button class="small float-right" variant="dark" @click="nuevaEspecialidad" v-if="$store.state.idRol==1 || $store.state.idRol==12">Nueva Especialidad</b-button>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Lista de Especialidades</h5>
                  </template>
                  <b-card-text>
                    <vue-good-table :columns="encabColumnas" :rows="listaEspecialidades" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                      <template slot="table-row" slot-scope="props">
                        <span v-if="props.column.field == 'id'">
                          <span style="font-weight: bold; color: blue; cursor: pointer" @click="seleccionarEspecialidad(props.row)" title="Consultar/Actualizar Datos de la Especialidad"><CIcon name="cilPencil"/></span>
                        </span>
                      </template>
                      <div slot="emptystate">
                        <h5 class="text-danger ml-5">No existen Especialidades creadas</h5>
                      </div>
                    </vue-good-table>
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Consulte o actualice los datos de una especialidad haciendo clic en el lapiz.</em>
          </template>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalCrearEditarEspecialidad" size="xl" scrollable hide-footer :title="datosEspecialidad.editarEspecialidad ? 'Editar Datos de la Especialidad' : 'Nueva Especialidad'" ok-only>
      <div class="mx-3">
        <div>
          <FichaEspecialidad :datosEspecialidad="datosEspecialidad"  @retorno="datosRecibidosEspecialidad"/>
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
  import FichaEspecialidad from '@/views/configuracion/FichaEspecialidad'

  export default {
    name: 'especialidadesie',
    components: {
      VueGoodTable,
      FichaEspecialidad
    },
    data () {
      return {
        listaEspecialidades: [],
        datosEspecialidad: {
          id: null,
          especialidad: null,
          id_institucion: null,
          id_tipo: null,
          estado: null,
          editarEspecialidad: true
        },
        encabColumnas : [
          { label: 'Nombre de la Especialidad o Técnica', field: 'especialidad' },
          { label: 'Tipo', field: 'id_tipo', formatFn: this.formatFnT, sortable: false },
          { label: 'Estado', field: 'estado', formatFn: this.formatFnE, tdClass: this.tdClassFuncE, sortable: false },
          { label: '', field: 'id', sortable: false }
        ]
      }
    },
    methods: {
      nuevaEspecialidad() {
        this.datosEspecialidad.id = null
        this.datosEspecialidad.especialidad = null
        this.datosEspecialidad.id_institucion = this.$store.state.idInstitucion
        this.datosEspecialidad.id_tipo = null
        this.datosEspecialidad.estado = 1
        this.datosEspecialidad.editarEspecialidad = false
        this.$refs['modalCrearEditarEspecialidad'].show()
      },
      seleccionarEspecialidad(item) {
        this.datosEspecialidad.id = item.id
        this.datosEspecialidad.especialidad = item.especialidad
        this.datosEspecialidad.id_institucion = item.id_institucion
        this.datosEspecialidad.id_tipo = item.id_tipo
        this.datosEspecialidad.estado = item.estado
        this.datosEspecialidad.editarEspecialidad = true
        this.$refs['modalCrearEditarEspecialidad'].show()
      },
      datosRecibidosEspecialidad(retorno) {
        if (retorno == 1) 
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'La Especialidad se ha creado correctamente.')
        else if (retorno == 2)
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos de la Especialidad se han actualizado correctamente.')
        this.verEspecialidades()
        this.$refs['modalCrearEditarEspecialidad'].hide()
      },
      async verEspecialidades() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/cargueespecialidadesconfig', {params: {idInstitucion: this.$store.state.idInstitucion}})
        .then(response => {
          if (response.data.error){
            alert(response.data.mensaje + ' - Consulta datos Especialidades')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
          } else {
            if(response.data.datos != 0) {
              this.listaEspecialidades =  response.data.datos
            } else {
              this.listaEspecialidades =  []
            }
          }
        })
        .catch(err => {
          alert('Algo salio mal y no se pudo realizar: Consulta datos Especialidades. Intente más tarde. ' + err)
          location.replace(CONFIG.ROOT_WEBSITE)
        })
      },
      formatFnE: function(value) {
        if (value == 0) {
          return 'INACTIVO'
        }
        return 'ACTIVO'
      },
      formatFnT: function(value) {
        if (value == 1) {
          return 'ACADÉMICA'
        } else if (value == 2) {
          return 'TÉCNICA'
        } else {
          return ''
        }
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
        this.verEspecialidades()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>