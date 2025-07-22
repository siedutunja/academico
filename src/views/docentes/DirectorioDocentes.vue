<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="person-square" aria-hidden="true"></b-icon> DIRECTORIO DE DOCENTES</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Lista de Docentes</h5>
                  </template>
                  <b-card-text>
                    <vue-good-table :columns="encabColumnas" :rows="listaDocentes" styleClass="vgt-table condensed bordered striped" :line-numbers="true" :search-options="{enabled: true,placeholder: 'Buscar docente...'}">
                      <div slot="emptystate">
                        <h5 class="text-danger ml-5">No existen Docentes creados</h5>
                      </div>
                    </vue-good-table>
                    <b-row>
                      <b-col lg="12" class="mt-5">
                        <vue-excel-xlsx class="small mx-1 mt-2 btn btn-outline-primary" :data="listaDocentes" :columns="encabColumnas" :file-name="'Docentes- ' + new Date().toLocaleDateString()" :file-type="'xlsx'" :sheet-name="'Docentes ' + $store.state.aLectivo">
                          Exportar Directorio a Excel
                        </vue-excel-xlsx>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Directorio de Docentes.</em>
          </template>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'

  export default {
    name: 'directoriodocentes',
    components: {
      VueGoodTable
    },
    data () {
      return {
        listaDocentes: [],
        datosDocente: {
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
          edad: null,
          id_rh: null,
          direccion: null,
          id_municipio_direccion: null,
          telefono1: null,
          telefono2: null,
          correo: null,
          idDocente: null,
          id_escalafon: null,
          titulo: null,
          estado: null,
          idUsuario: null,
          usuario: null,
          clave: null,
          editarDocente: true
        },
        encabColumnas : [
          { label: 'Docente', field: 'docente' },
          { label: 'Documento', field: 'documento', sortable: false },
          { label: 'Tipo', field: 'nomenclatura', sortable: false },
          { label: 'Genero', field: 'id_genero', sortable: false },
          { label: 'Fecha_Nace', field: 'fechaNace', sortable: false },
          { label: 'Edad', field: 'edad', sortable: false },
          { label: 'Dirección', field: 'direccion', sortable: false },
          { label: 'Municipio', field: 'munDireccion', sortable: false },
          { label: 'Teléfono', field: 'telefono1', sortable: false },
          { label: 'Correo', field: 'correo', sortable: false, },
          { label: 'Estado', field: 'estado', tdClass: this.tdClassFuncE, sortable: false },
        ]
      }
    },
    methods: {
      async consultarListaDocentes() {
        this.listaDocentes = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/docentes/directorio', {params: {idInstitucion: this.$store.state.idInstitucion}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Directorio Docentes')
          } else{
            if (response.data.datos != 0) {
              this.listaDocentes = response.data.datos
              this.listaDocentes.forEach(element => {
                let isValidDate = Date.parse(element.fechaNace)
                element.edad = !isNaN(isValidDate) ? this.calcularEdad(element.fechaNace.substr(0,10)) : '*'
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Directorio Docentes. Intente más tarde.' + err)
        })
      },
      tdClassFuncE(row) {
        if (row.estado == 'INACTIVO') { 
          return 'text-danger text-left' 
        } else { 
          return 'text-success text-left' 
        }
      },
      calcularEdad(fecha) {
        var hoy = new Date();
        var cumpleanos = new Date(fecha);
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();
    
        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }
    
        return edad;
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.consultarListaDocentes()
    }
  }
</script>