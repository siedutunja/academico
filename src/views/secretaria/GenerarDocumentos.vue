<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> GENERACIÓN DE DOCUMENTOS</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-row>
                  <b-col lg="12">
                    <b-card header-bg-variant="secondary">
                      <template #header>
                        <h5 class="mb-0"><b-icon icon="person" aria-hidden="true"></b-icon> Estudiante</h5>
                      </template>
                      <b-card-text>
                        <b-row class="text-center">
                          <b-col lg="12">
                            <img :src="datosFichaE.foto" id="photoA" alt="photo" width="30%">
                          </b-col>
                          <b-col lg="12" class="mt-3">
                            <h5>{{ datosFichaE.estudiante }}</h5>
                            <h6>{{ datosFichaE.estado }}</h6>
                          </b-col>
                        </b-row>
                      </b-card-text>
                      <template #footer>
                        <b-table-simple striped hover responsive bordered fixed>
                          <b-tbody>
                            <b-tr><b-th>Sede</b-th><b-td>{{datosFichaE.sede}}</b-td></b-tr>
                            <b-tr><b-th>Grado</b-th><b-td>{{datosFichaE.grado}}</b-td></b-tr>
                            <b-tr><b-th>Curso</b-th><b-td>{{datosFichaE.nomenclatura}}</b-td></b-tr>

                            <b-tr><b-th>Número Documento</b-th><b-td>{{datosFichaE.documento}}</b-td></b-tr>
                            <b-tr><b-th>Tipo Documento</b-th><b-td>{{datosFichaE.tipodocumento}}</b-td></b-tr>
                            <b-tr><b-th>Expedición</b-th><b-td>{{datosFichaE.municipioDoc != null ? datosFichaE.municipioDoc.toUpperCase() : '-'}}</b-td></b-tr>
                            <b-tr><b-th>Fecha Nace</b-th><b-td>{{ datosFichaE.fecha_nacimiento != null ? datosFichaE.fecha_nacimiento.substr(0,10) : '-'}}</b-td></b-tr>
                            <b-tr><b-th>Nacionalidad</b-th><b-td>{{datosFichaE.pais}}</b-td></b-tr>
                            <b-tr><b-th>Género</b-th><b-td>{{datosFichaE.genero}}</b-td></b-tr>
                          </b-tbody>
                        </b-table-simple>
                      </template>
                    </b-card>
                  </b-col>
                </b-row>
                {{idMatricula}}
              </b-col>
              <b-col lg="6">
                <b-row>
                  <b-col lg="12">
                    <b-card header-bg-variant="secondary">
                      <template #header>
                        <h5 class="mb-0"><b-icon icon="filter-square" aria-hidden="true"></b-icon> Documentos</h5>
                      </template>
                      <b-card-text>
                        <b-card-group deck class="mt-5">
                          <b-card border-variant="light" class="text-center linkini" @click="irConstancia">
                            <b-card-text>
                              <span><b-icon icon="card-list" font-scale="3"></b-icon></span>
                              <h5 class="mt-2">Constancias</h5>
                            </b-card-text>
                            <b-card-text>Constancia de Matricula del Estudiante</b-card-text>
                          </b-card>
                          <b-card border-variant="light" class="text-center linkini" @click="irFichaMatricula">
                            <b-card-text>
                              <span><b-icon icon="filter-square" font-scale="3"></b-icon></span>
                              <h5 class="mt-2">Ficha de Matricula</h5>
                            </b-card-text>
                            <b-card-text>Ficha de Matricula del Estudiante</b-card-text>
                          </b-card>
                        </b-card-group>
                      </b-card-text>
                    </b-card>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Haga clic sobre el documento que desea generar.</em>
          </template>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'

  export default {
    name: 'generardocumentos',
    components: {
    },
    data () {
      return {
        idMatricula: null,
        datosFichaE: {},
      }
    },
    methods: {
      irConstancia() {
        let campos = []
        campos.push({ 
          'vig': this.$store.state.aLectivo, 
          'est': this.datosFichaE.estudiante, 
          'tip': this.datosFichaE.tipodocumento,
          'doc': this.datosFichaE.documento,
          'exp': this.datosFichaE.municipioDoc != null ? this.datosFichaE.municipioDoc.toUpperCase() : '-',
          'gra': this.datosFichaE.grado,
          'sed': this.datosFichaE.sede,
          'jor': this.datosFichaE.jornada,
          'nre': this.$store.state.NombreRector,
          'dre': this.$store.state.DocumentoRector,
          'cre': this.$store.state.CargoRector,
          'nse': this.$store.state.NombreSecretaria,
          'dse': this.$store.state.DocumentoSecretaria,
          'cse': this.$store.state.CargoSecretaria,

        })
        let uri = "?campos=" + JSON.stringify(campos)
        let encoded = encodeURI(uri);
        //window.open("http://localhost/siedutunja/php/documentos/constancia_01.php" + encoded,"_blank")
        window.open("https://siedutunja.gov.co/php/documentos/constancia_01.php" + encoded,"_blank")
        return true
      },
      irFichaMatricula() {
        window.open("https://siedutunja.gov.co/" + this.$store.state.FichaMatricula + "?token=" + this.idMatricula,"_blank")
      },
      async consultaFichaMatricula() {
        this.datosFichaE = {}
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/matriculas/consultacarpetamatricula', { params: { idMatricula: this.idMatricula }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Carpeta Matricula')
          } else{
            if (response.data.datos != 0) {
              this.datosFichaE = response.data.datos.estudiante
              if (this.datosFichaE.foto == null || this.datosFichaE.foto == '') {
                this.datosFichaE.foto = CONFIG.FOTO
              }
            } else {
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'No se encontró la Carpeta del Estudiante')
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Carpeta Matricula. Intente más tarde.' + err)
        })
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      if(this.$store.state.idRol == 1 || this.$store.state.idRol == 12) {
        this.idMatricula = this.$store.state.idMatricula
        this.consultaFichaMatricula()
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>