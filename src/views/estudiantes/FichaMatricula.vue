<template>
  <div>
    <b-row>
      <b-col lg="12">
        <h3 class="ml-2"><b-icon icon="filter-square" aria-hidden="true"></b-icon> CONSULTA FICHA DE MATRICULA DE ESTUDIANTE</h3>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col lg="12">
        <BuscarEstudiante @retorno="datosRecibidosBusqueda"/>
      </b-col>
    </b-row>
    <b-row class="mt-2" v-if="verFicha">
      <b-col lg="12">
        <b-card header-bg-variant="secondary">
          <template #header>
            <h3 class="text-center">FICHA DE MATRICULA DE ESTUDIANTE<br> Año Lectivo {{ $store.state.aLectivo }}</h3>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <b-card>
                  <b-row>
                    <b-col lg="10">
                      <span>Apellidos y Nombres</span>
                      <h3>{{ datosFicha.estudiante }}</h3>
                    </b-col>
                    <b-col lg="2">
                      <b-alert class="text-center" :variant="datosFicha.estado==1 ? 'success' : 'danger'" show><b>{{ datosFicha.estado==1 ? 'ACTIVO' : 'INACTIVO' }}</b></b-alert>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col lg="12">
                      <span>{{ datosFicha.tipodocumento }}</span>
                      <h5>No. {{ datosFicha.documento }} de {{ datosFicha.mundocumento }}</h5>
                    </b-col>
                  </b-row>
                </b-card>
                <b-row>
                  <b-col>
                    <b-tabs content-class="mt-3">
                      <b-tab title="Datos de la Matricula" active>
                        <b-card style="margin-top: -17">
                          <b-card-text>
                            <b-col>
                              <b-table-simple striped hover responsive bordered fixed>
                                <b-tbody>
                                  <b-tr><b-th style="width: 25%">Año Lectivo:</b-th><b-td>{{ datosFicha.a_lectivo }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Sede:</b-th><b-td>{{ datosFicha.sede }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Grado-Curso:</b-th><b-td>{{ datosFicha.nomenclatura }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Especialidad:</b-th><b-td>{{ datosFicha.especialidad }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Ruta Transporte:</b-th><b-td>{{ datosFicha.ruta }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Estudiante es Nuevo:</b-th><b-td>{{ datosFicha.nuevo }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Institución de Procedencia:</b-th><b-td>{{ datosFicha.procedencia }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Tiene Seguro:</b-th><b-td>{{ datosFicha.seguro }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Aseguradora:</b-th><b-td>{{ datosFicha.aseguradora }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Repitente:</b-th><b-td>{{ datosFicha.repitente }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Observaciones:</b-th><b-td>{{ datosFicha.obs_matricula }}</b-td></b-tr>
                                </b-tbody>
                              </b-table-simple>
                            </b-col>
                          </b-card-text>
                        </b-card>
                      </b-tab>
                      <b-tab title="Datos Personales">
                        <b-card style="margin-top: -17">
                          <b-card-text>
                            <b-col>
                              <b-table-simple striped hover responsive bordered fixed>
                                <b-tbody>
                                  <b-tr><b-th style="width: 25%">Fecha Nacimiento:</b-th><b-td>{{ datosFicha.fecha_nacimiento!=null ? datosFicha.fecha_nacimiento.substr(0,10) : '-' }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Municipio Nacimiento:</b-th><b-td>{{ datosFicha.munNace }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Nacionalidad:</b-th><b-td>{{ datosFicha.pais }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Genero:</b-th><b-td>{{ datosFicha.genero }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Grupo Sanguineo:</b-th><b-td>{{ datosFicha.rh }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Discapacidad:</b-th><b-td>{{ datosFicha.discapacidad }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Capacidades:</b-th><b-td>{{ datosFicha.capacidad }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Victima Conflicto:</b-th><b-td>{{ datosFicha.victima }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Grupo Etnico:</b-th><b-td>{{ datosFicha.etnia }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Educación Diversa:</b-th><b-td>{{ datosFicha.diversa }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Sisben:</b-th><b-td>{{ datosFicha.subgrupo }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Enfermedades:</b-th><b-td>{{ datosFicha.enfermedades }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Eps:</b-th><b-td>{{ datosFicha.eps }}</b-td></b-tr>
                                </b-tbody>
                              </b-table-simple>
                            </b-col>
                          </b-card-text>
                        </b-card>
                      </b-tab>
                      <b-tab title="Datos de Ubicación">
                        <b-card style="margin-top: -17">
                          <b-card-text>
                            <b-col>
                              <b-table-simple striped hover responsive bordered fixed>
                                <b-tbody>
                                  <b-tr><b-th style="width: 25%">Dirección:</b-th><b-td>{{ datosFicha.direccion }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Barrio:</b-th><b-td>{{ datosFicha.barrio }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Municipio:</b-th><b-td>{{ datosFicha.munDireccion }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Teléfono:</b-th><b-td>{{ datosFicha.telefono1 }} | {{ datosFicha.telefono2 }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Correo:</b-th><b-td>{{ datosFicha.correo }}</b-td></b-tr>
                                </b-tbody>
                              </b-table-simple>
                            </b-col>
                          </b-card-text>
                        </b-card>
                      </b-tab>
                      <b-tab title="Acudiente">
                        <b-card style="margin-top: -17">
                          <b-card-text>
                            <b-col>
                              <b-table-simple striped hover responsive bordered fixed>
                                <b-tbody>
                                  <b-tr><b-th style="width: 25%">Apellidos y Nombres:</b-th><b-td>{{ datosFicha.acudiente }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Documento:</b-th><b-td>{{ datosFicha.acuddoc }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Dirección:</b-th><b-td>{{ datosFicha.acuddir }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Teléfono:</b-th><b-td>{{ datosFicha.acudtel1 }} | {{ datosFicha.papatel2 }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Correo:</b-th><b-td>{{ datosFicha.acudcorr }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Parentesco:</b-th><b-td>{{ datosFicha.parentesco }}</b-td></b-tr>
                                </b-tbody>
                              </b-table-simple>
                            </b-col>
                          </b-card-text>
                        </b-card>
                      </b-tab>
                      <b-tab title="Padre">
                        <b-card style="margin-top: -17">
                          <b-card-text>
                            <b-col>
                              <b-table-simple striped hover responsive bordered fixed>
                                <b-tbody>
                                  <b-tr><b-th style="width: 25%">Apellidos y Nombres:</b-th><b-td>{{ datosFicha.papi }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Documento:</b-th><b-td>{{ datosFicha.papadoc }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Dirección:</b-th><b-td>{{ datosFicha.papadir }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Teléfono:</b-th><b-td>{{ datosFicha.papatel1 }} | {{ datosFicha.papatel2 }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Correo:</b-th><b-td>{{ datosFicha.papacorr }}</b-td></b-tr>
                                </b-tbody>
                              </b-table-simple>
                            </b-col>
                          </b-card-text>
                        </b-card>
                      </b-tab>
                      <b-tab title="Madre">
                        <b-card style="margin-top: -17">
                          <b-card-text>
                            <b-col>
                              <b-table-simple striped hover responsive bordered fixed>
                                <b-tbody>
                                  <b-tr><b-th style="width: 25%">Apellidos y Nombres:</b-th><b-td>{{ datosFicha.mami }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Documento:</b-th><b-td>{{ datosFicha.mamadoc }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Dirección:</b-th><b-td>{{ datosFicha.mamadir }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Teléfono:</b-th><b-td>{{ datosFicha.mamatel1 }} | {{ datosFicha.papatel2 }}</b-td></b-tr>
                                  <b-tr><b-th style="width: 25%">Correo:</b-th><b-td>{{ datosFicha.mamacorr }}</b-td></b-tr>
                                </b-tbody>
                              </b-table-simple>
                            </b-col>
                          </b-card-text>
                        </b-card>
                      </b-tab>
                    </b-tabs>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <div>
              <b-button class="small" variant="primary" @click="imprimirFormulario">Imprimir Ficha de Matricula del Estudiante</b-button>
              <b-button class="small ml-3" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
            </div>
          </template>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import BuscarEstudiante from '@/views/componentes/BuscarEstudiante'

  export default {
    name: 'fichamatricula',
    components: {
      BuscarEstudiante,
    },
    data () {
      return {
        verFicha: false,
        resultadoBusqueda: {},
        datosFicha: {},
      }
    },
    methods: {
      async consultarFichaMatricula() {
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/fichamatricula', { params: { idMatricula: this.resultadoBusqueda.idMatricula, idEstudiante: this.resultadoBusqueda.idEstudiante }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Datos Ficha MAtricula')
          } else{
            if (response.data.datos != 0) {
              this.datosFicha = response.data.datos
            }
          }
        })
        .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Datos Ficha MAtricula. Intente más tarde. ' + err)
        })
      },
      imprimirFormulario() {
        alert("¡Lo sentimos!\nEn espera de formato de ficha de matricula para impresión.")
      },
      datosRecibidosBusqueda(retorno) {
        if (retorno == 0) {
          this.verFicha = false
        } else {
          this.resultadoBusqueda = retorno
          this.verFicha = true
          this.consultarFichaMatricula()
        }
      },
      cancelarFormulario() {
        this.$router.push('/')
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
    }
  }
</script>