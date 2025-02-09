<template>
  <div>
    <b-row>
      <b-col lg="12">
        <b-card>
          <template #header>
            <h3 class="mb-0 text-center">CONSULTA FICHA DE MATRICULA</h3>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <b-alert class="text-center" :variant="datosFichaE.id_estado_actual==1 ? 'success' : 'danger'" show>ESTUDIANTE<br><h4 class="mb-0"><b>{{ datosFichaE.estudiante }}</b></h4><span><b>ESTADO: {{ datosFichaE.estado }}</b></span><span v-if="codigo!='' && codigo!=null"><br><strong>CODIGO: {{ codigo }}</strong></span></b-alert>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="6">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <b-button @click="verFichaEstudiante()" class="small float-right" variant="dark" v-if="$store.state.idRol==1 || $store.state.idRol==12 || $store.state.perActEstudiante == 1">Editar Datos</b-button>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Datos del Estudiante</h5>
                  </template>
                  <b-card-text>
                    <b-row>
                      <b-col lg="12">
                        <b-table-simple striped hover responsive bordered fixed>
                          <b-tbody>
                            <b-tr><b-th>Número Documento</b-th><b-td>{{datosFichaE.documento}}</b-td></b-tr>
                            <b-tr><b-th>Tipo Documento</b-th><b-td>{{datosFichaE.tipodocumento}}</b-td></b-tr>
                            <b-tr><b-th>Expedición</b-th><b-td>{{datosFichaE.municipioDoc != null ? datosFichaE.municipioDoc.toUpperCase() : '-'}}</b-td></b-tr>
                            <b-tr><b-th>Fecha Nace</b-th><b-td>{{ datosFichaE.fecha_nacimiento != null ? datosFichaE.fecha_nacimiento.substr(0,10) : '-'}}</b-td></b-tr>
                            <b-tr><b-th>Nacionalidad</b-th><b-td>{{datosFichaE.pais}}</b-td></b-tr>
                            <b-tr><b-th>Municipio Nace</b-th><b-td>{{datosFichaE.municipioNac != null ? datosFichaE.municipioNac.toUpperCase() : '-'}}</b-td></b-tr>
                            <b-tr><b-th>Género</b-th><b-td>{{datosFichaE.genero}}</b-td></b-tr>
                            <b-tr><b-th>Rh</b-th><b-td>{{datosFichaE.rh}}</b-td></b-tr>
                            <b-tr><b-th>Sisben</b-th><b-td>{{datosFichaE.subgrupo}}</b-td></b-tr>
                            <b-tr><b-th>Estrato</b-th><b-td>{{datosFichaE.estrato}}</b-td></b-tr>
                            <b-tr><b-th>Etnia</b-th><b-td>{{datosFichaE.etnia}}</b-td></b-tr>
                            <b-tr><b-th>Discapacidad</b-th><b-td>{{datosFichaE.discapacidad}}</b-td></b-tr>
                            <b-tr><b-th>Capacidades</b-th><b-td>{{datosFichaE.capacidad}}</b-td></b-tr>
                            <b-tr><b-th>Victima</b-th><b-td>{{datosFichaE.victima}}</b-td></b-tr>
                            <b-tr><b-th>Municipio Expulsor</b-th><b-td>{{datosFichaE.municipioExp != null ? datosFichaE.municipioExp.toUpperCase() : '-'}}</b-td></b-tr>
                            <b-tr><b-th>EPS</b-th><b-td>{{datosFichaE.eps}}</b-td></b-tr>
                            <b-tr><b-th>Aseguradora</b-th><b-td>{{datosFichaE.aseguradora}}</b-td></b-tr>
                            <b-tr><b-th>Dirección</b-th><b-td>{{datosFichaE.direccion}}</b-td></b-tr>
                            <b-tr><b-th>Municipio</b-th><b-td>{{datosFichaE.municipioDir != null ? datosFichaE.municipioDir.toUpperCase() : '-'}}</b-td></b-tr>
                            <b-tr><b-th>Barrio</b-th><b-td>{{datosFichaE.barrio}}</b-td></b-tr>
                            <b-tr><b-th>Zona</b-th><b-td>{{datosFichaE.zona}}</b-td></b-tr>
                            <b-tr><b-th>Teléfono1</b-th><b-td>{{datosFichaE.telefono1}}</b-td></b-tr>
                            <b-tr><b-th>Teléfono2</b-th><b-td>{{datosFichaE.telefono2}}</b-td></b-tr>
                            <b-tr><b-th>Correo</b-th><b-td>{{datosFichaE.correo}}</b-td></b-tr>
                            <b-tr><b-th>ID</b-th><b-td>{{datosFichaE.idEstudiante}}</b-td></b-tr>
                          </b-tbody>
                        </b-table-simple>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-col>
              <b-col lg="6">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <b-button @click="verFichamatricula()" class="small float-right" variant="dark" v-if="$store.state.idRol==1 || $store.state.idRol==12 || $store.state.perActEstudiante == 1">Editar Datos</b-button>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Datos de la Matrícula</h5>
                  </template>
                  <b-card-text>
                    <b-row>
                      <b-col lg="12">
                        <b-table-simple striped hover responsive bordered fixed>
                          <b-tbody>
                            <b-tr><b-th>Estado Matrícula</b-th><b-td>{{datosFichaE.estado}}</b-td></b-tr>
                            <b-tr><b-th>Vigencia</b-th><b-td>{{datosFichaE.vigencia}}</b-td></b-tr>
                            <b-tr><b-th>Sede</b-th><b-td>{{datosFichaE.sede}}</b-td></b-tr>
                            <b-tr><b-th>Grado</b-th><b-td>{{datosFichaE.grado}}</b-td></b-tr>
                            <b-tr><b-th>Curso</b-th><b-td>{{datosFichaE.nomenclatura}}</b-td></b-tr>
                            <b-tr><b-th>Jornada</b-th><b-td>{{datosFichaE.jornada}}</b-td></b-tr>
                            <b-tr><b-th>Especialidad</b-th><b-td>{{datosFichaE.especialidad}}</b-td></b-tr>
                            <b-tr><b-th>Nuevo</b-th><b-td>{{datosFichaE.id_nuevo}}</b-td></b-tr>
                            <b-tr><b-th>Procedencia</b-th><b-td>{{datosFichaE.procedencia}}</b-td></b-tr>
                            <b-tr><b-th>Repitente</b-th><b-td>{{datosFichaE.id_repitente}}</b-td></b-tr>
                            <b-tr><b-th>Observaciones</b-th><b-td>{{datosFichaE.obs_matricula}}</b-td></b-tr>
                            <b-tr><b-th>ID</b-th><b-td>{{idMatricula}}</b-td></b-tr>
                          </b-tbody>
                        </b-table-simple>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col lg="12"><hr></b-col>
                      <b-col lg="12">
                        <b-button class="small mx-1 mt-2" variant="primary" @click="imprimirFormulario">Imprimir Ficha Matricula del Estudiante</b-button>
                        <b-button class="small mx-1 mt-2 float-right" variant="danger" @click="desvincularMatricula" v-if="$store.state.idRol==1 || $store.state.idRol==12">Desvincular Matricula del Estudiante</b-button>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Foto y Firmas</h5>
                  </template>
                  <b-card-text>
                    <b-row>
                      <b-col lg="12">
                        <b-tabs content-class="mt-3">
                          <b-tab title="Foto" active>
                            <CCard style="margin-top: -17">
                              <CCardBody>
                                <b-row class="p-3">
                                  <b-col lg="12" class="mt-1 text-center">
                                    <img :src="datosFichaE.foto" id="photo" alt="photo">
                                  </b-col>
                                  <b-col lg="12" class="mt-3 text-center">
                                    <b-button class="small mx-3" variant="info" @click="cambiarFoto" v-if="$store.state.idRol==1 || $store.state.idRol==12 || $store.state.perActEstudiante == 1">Cambiar Foto</b-button>
                                    <b-button class="small mx-3" variant="danger" @click="borrarFoto" v-if="$store.state.idRol==1 || $store.state.idRol==12 || $store.state.perActEstudiante == 1">Borrar Foto</b-button>
                                  </b-col>
                                </b-row>
                              </CCardBody>
                            </CCard>
                          </b-tab>
                          <b-tab title="Firma Estudiante" v-if="$store.state.idRol==1 || $store.state.idRol==12 || $store.state.perActEstudiante == 1">
                            <CCard style="margin-top: -17">
                              <CCardBody>
                                <b-row>
                                  <b-col lg="12" md="12" v-if="firmaEstudianteValida">
                                    <b-form-group label="Firma del Estudiante" label-for="firma" class="etiqueta">
                                      <img class="text-center mt-1" :src="datosFichaE.firma_estudiante" alt="Firma" width="100%">
                                    </b-form-group>
                                  </b-col>
                                  <b-col lg="12" md="12" v-if="!firmaEstudianteValida">
                                    <b-form-group label="Pegar la Firma del Estudiante" label-for="firmaE" class="etiqueta">
                                      <b-form-textarea id="firmaE" ref="firmaE" v-model.trim="nuevaFirmaEstudiante" aria-describedby="feedFirmaE" autocomplete="off" rows="6" :disabled="firmaEstudianteValida"></b-form-textarea>
                                    </b-form-group>
                                  </b-col>
                                  <b-col lg="12">
                                    <b-button class="small mx-2 mt-2" variant="outline-primary"  v-if="!firmaEstudianteValida" @click="validarFirmaEstudiante()">Validar Firma Estudiante</b-button>
                                    <b-button class="small mx-2 mt-2" variant="outline-danger"  v-if="cancelarFirmaEstudiante" @click="cancelarValidarFirmaEstudiante()">Cancelar</b-button>
                                    <b-button class="small mx-2 mt-2" variant="outline-info" v-if="firmaEstudianteValida" @click="borrarFirmaEstudiante()">Cambiar Firma Estudiante</b-button>
                                    <b-button class="small mx-2 mt-2" variant="outline-success" v-if="firmaEstudianteNoGuardada" @click="guardarFirmaEstudiante()">Guardar Firma Estudiante</b-button>
                                  </b-col>
                                </b-row>
                                <b-row>
                                  <b-col><hr></b-col>
                                  <b-col lg="12">
                                    <b-button variant="link" @click="abrirCapturadorFirmas">Abrir Capturador de Firmas</b-button>
                                  </b-col>
                                </b-row>                               
                              </CCardBody>
                            </CCard>
                          </b-tab>
                          <b-tab title="Firma Acudiente" v-if="$store.state.idRol==1 || $store.state.idRol==12 || $store.state.perActEstudiante == 1">
                            <CCard style="margin-top: -17">
                              <CCardBody>
                                <b-row>
                                  <b-col lg="12" md="12" v-if="firmaAcudienteValida">
                                    <b-form-group label="Firma del Acudiente" label-for="firma" class="etiqueta">
                                      <img class="text-center mt-1" :src="datosFichaE.firma_acudiente" alt="Firma" width="100%">
                                    </b-form-group>
                                  </b-col>
                                  <b-col lg="12" md="12" v-if="!firmaAcudienteValida">
                                    <b-form-group label="Pegar la Firma del Acudiente" label-for="firmaA" class="etiqueta">
                                      <b-form-textarea id="firmaA" ref="firmaA" v-model.trim="nuevaFirmaAcudiente" aria-describedby="feedFirmaA" autocomplete="off" rows="6" :disabled="firmaAcudienteValida"></b-form-textarea>
                                    </b-form-group>
                                  </b-col>
                                  <b-col lg="12">
                                    <b-button class="small mx-2 mt-2" variant="outline-primary"  v-if="!firmaAcudienteValida" @click="validarFirmaAcudiente()">Validar Firma Acudiente</b-button>
                                    <b-button class="small mx-2 mt-2" variant="outline-danger"  v-if="cancelarFirmaAcudiente" @click="cancelarValidarFirmaAcudiente()">Cancelar</b-button>
                                    <b-button class="small mx-2 mt-2" variant="outline-info" v-if="firmaAcudienteValida" @click="borrarFirmaAcudiente()">Cambiar Firma Acudiente</b-button>
                                    <b-button class="small mx-2 mt-2" variant="outline-success" v-if="firmaAcudienteNoGuardada" @click="guardarFirmaAcudiente()">Guardar Firma Acudiente</b-button>
                                  </b-col>
                                </b-row>
                                <b-row>
                                  <b-col><hr></b-col>
                                  <b-col lg="12">
                                    <b-button variant="link" @click="abrirCapturadorFirmas">Abrir Capturador de Firmas</b-button>
                                  </b-col>
                                </b-row>                               
                              </CCardBody>
                            </CCard>
                          </b-tab>
                        </b-tabs>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="4">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <h5 class="mb-0"><b-icon icon="person" aria-hidden="true"></b-icon> Acudiente</h5>
                  </template>
                  <b-card-text>
                    <b-row class="text-center">
                      <b-col lg="12">
                        <img :src="fotoA" id="photoA" alt="photo" width="30%">
                      </b-col>
                      <b-col lg="12">
                        <h5>{{ datosFichaE.acudiente != null ? datosFichaE.acudiente : 'SIN ASOCIAR' }}</h5>
                        <h6>{{ datosFichaE.telefonoA != null ? datosFichaE.telefonoA : '-'}}</h6>
                        <b-button @click="verFichaAcudiente()" class="small" variant="dark" v-if="$store.state.idRol==1 || $store.state.idRol==12 || $store.state.perActEstudiante == 1">Editar Datos</b-button>
                      </b-col>
                    </b-row>
                  </b-card-text>
                  <template #footer>
                    <span class="mb-0"> <i>Parentesco: {{ datosFichaE.parentesco }}</i></span>
                  </template>
                </b-card>
              </b-col>
              <b-col lg="4">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <h5 class="mb-0"><b-icon icon="person" aria-hidden="true"></b-icon> Papá</h5>
                  </template>
                  <b-card-text>
                    <b-row class="text-center">
                      <b-col lg="12">
                        <img :src="fotoP" id="photoA" alt="photo" width="30%">
                      </b-col>
                      <b-col lg="12">
                        <h5>{{ datosFichaE.padre != null ? datosFichaE.padre : 'SIN ASOCIAR' }}</h5>
                        <h6>{{ datosFichaE.telefonoP != null ? datosFichaE.telefonoP : '-' }}</h6>
                        <b-button @click="verFichaPapa()" class="small" variant="dark" v-if="$store.state.idRol==1 || $store.state.idRol==12 || $store.state.perActEstudiante == 1">Editar Datos</b-button>
                      </b-col>
                    </b-row>
                  </b-card-text>
                  <template #footer>
                    <span class="mb-0"> <i>-</i></span>
                  </template>
                </b-card>
              </b-col>
              <b-col lg="4">
                <b-card header-bg-variant="secondary">
                  <template #header>
                    <h5 class="mb-0"><b-icon icon="person" aria-hidden="true"></b-icon> Mamá</h5>
                  </template>
                  <b-card-text>
                    <b-row class="text-center">
                      <b-col lg="12">
                        <img :src="fotoM" id="photoA" alt="photo" width="30%">
                      </b-col>
                      <b-col lg="12">
                        <h5>{{ datosFichaE.madre != null ? datosFichaE.madre : 'SIN ASOCIAR' }}</h5>
                        <h6>{{ datosFichaE.telefonoM != null ? datosFichaE.telefonoM : '-' }}</h6>
                        <b-button @click="verFichaMama()" class="small" variant="dark" v-if="$store.state.idRol==1 || $store.state.idRol==12 || $store.state.perActEstudiante == 1">Editar Datos</b-button>
                      </b-col>
                    </b-row>
                  </b-card-text>
                  <template #footer>
                    <span class="mb-0"> <i>-</i></span>
                  </template>
                </b-card>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalEditarFoto" size="lg" scrollable hide-footer title="Editar Foto" ok-only>
      <div class="mx-3">
        <div>
          <EditarFoto @retorno="datosRecibidosFoto"/>
        </div>
      </div>
    </b-modal>
    <b-modal ref="modalAsociarAcudiente" size="xl" scrollable hide-footer title="Ficha del Acudiente" ok-only>
      <div class="mx-3">
        <div>
          <FichaAcudiente :datosAcudiente="datosFichaA" @retorno="datosRecibidosAcudiente"/>
        </div>
      </div>
    </b-modal>
    <b-modal ref="modalAsociarPapa" size="xl" scrollable hide-footer title="Ficha del Papá" ok-only>
      <div class="mx-3">
        <div>
          <FichaPapa :datosPapa="datosFichaP" @retorno="datosRecibidosPapa"/>
        </div>
      </div>
    </b-modal>
    <b-modal ref="modalAsociarMama" size="xl" scrollable hide-footer title="Ficha de la Mamá" ok-only>
      <div class="mx-3">
        <div>
          <FichaMama :datosMama="datosFichaM" @retorno="datosRecibidosMama"/>
        </div>
      </div>
    </b-modal>
    <b-modal ref="modalFichaEstudiante" size="xl" scrollable hide-footer title="Ficha del Estudiante" ok-only>
      <div class="mx-3">
        <div>
          <FichaEstudiante :datosEstudiante="datosEstudiante" @retorno="datosRecibidosEstudiante"/>
        </div>
      </div>
    </b-modal>
    <b-modal ref="modalFichaMatricula" size="xl" scrollable hide-footer title="Ficha de la Matricula" ok-only>
      <div class="mx-3">
        <div>
          <FichaMatricula :datosMatricula="datosFichaMatricula" @retorno="datosRecibidosMatricula"/>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import EditarFoto from '@/views/matriculas/EditarFoto'
  import FichaAcudiente from '@/views/matriculas/FichaAcudiente'
  import FichaPapa from '@/views/matriculas/FichaPapa'
  import FichaMama from '@/views/matriculas/FichaMama'
  import FichaEstudiante from '@/views/matriculas/FichaEstudiante'
  import FichaMatricula from '@/views/matriculas/FichaMatricula'

  export default {
    name: 'carpetamatricula',
    components: {
      EditarFoto,
      FichaAcudiente,
      FichaPapa,
      FichaMama,
      FichaEstudiante,
      FichaMatricula
    },
    data () {
      return {
        idMatricula: null,
        nuevaFirmaEstudiante: null,
        firmaEstudianteValida: true,
        firmaEstudianteNoGuardada: false,
        cancelarFirmaEstudiante: false,
        nuevaFirmaAcudiente: null,
        firmaAcudienteValida: true,
        firmaAcudienteNoGuardada: false,
        cancelarFirmaAcudiente: false,
        codigo: null,
        datosEstudiante: {},
        datosFichaE: {},
        datosFichaA: {},
        datosFichaP: {},
        datosFichaM: {},
        datosFichaMatricula: {},
        fotoA: CONFIG.FOTO,
        fotoP: CONFIG.FOTO,
        fotoM: CONFIG.FOTO,
      }
    },
    methods: {
      desvincularMatricula() {
        let titulo = 'Desvincular Estudiante'
        let pregunta = 'Al desvincular el Estudiante de la Institución Educativa se eliminará el registro de la matrícula para el actual Año Lectivo y el Estudiante quedará disponible para ser matriculado en otra Institución Educativa. ¿Esta seguro de desvincular el estudiante?'
        this.$bvModal.msgBoxConfirm(pregunta, {
          headerBgVariant: 'primary',
          headerTextVariant: 'light',
          bodyBgVariant: 'light',
          bodyBgClass: 'text-center',
          title: titulo,
          size: '',
          buttonSize: 'sm',
          okVariant: 'primary',
          okTitle: 'Si, ' + titulo,
          cancelVariant: 'danger',
          cancelTitle: 'Cancelar',
          footerClass: 'p-2',
          bodyClass: 'p-5',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.desvincularEstudiante()
          }
        })
      },
      async desvincularEstudiante() {
        await axios
        .delete(CONFIG.ROOT_PATH + 'academico/matriculas/desvincularestudiante', {params: {idMatricula: this.idMatricula}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Desvincular Estudiante')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'El estudiante se ha desvinculado correctamente.')
            this.cancelarFormulario()
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Desvincular Estudiante. Intente más tarde. ' + err)
        })
      },
      verFichamatricula() {
        this.datosFichaMatricula.idMatricula = this.idMatricula
        this.$refs['modalFichaMatricula'].show()
      },
      datosRecibidosMatricula(retorno) {
        if(retorno == 1) {
          this.consultaFichaMatricula()
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos de la Matricula del Estudiante se han actualizado correctamente.')
        }
        this.$refs['modalFichaMatricula'].hide()
      },
      verFichaEstudiante() {
        this.datosEstudiante.idEstudiante = this.datosFichaE.idEstudiante
        this.$refs['modalFichaEstudiante'].show()
      },
      datosRecibidosEstudiante(retorno) {
        if(retorno == 1) {
          this.consultaFichaMatricula()
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos del Estudiante se han actualizado correctamente.')
        }
        this.$refs['modalFichaEstudiante'].hide()
      },
      verFichaMama() {
        this.datosFichaM.idEstudiante = this.datosFichaE.idEstudiante
        this.datosFichaM.idMama = this.datosFichaE.id_mama
        this.$refs['modalAsociarMama'].show()
      },
      datosRecibidosMama(retorno) {
        if(retorno == 1) {
          this.consultaFichaMatricula()
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos de la Mamá se han actualizado correctamente.')
        }
        this.$refs['modalAsociarMama'].hide()
      },
      verFichaPapa() {
        this.datosFichaP.idEstudiante = this.datosFichaE.idEstudiante
        this.datosFichaP.idPapa = this.datosFichaE.id_papa
        this.$refs['modalAsociarPapa'].show()
      },
      datosRecibidosPapa(retorno) {
        if(retorno == 1) {
          this.consultaFichaMatricula()
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos del Papá se han actualizado correctamente.')
        }
        this.$refs['modalAsociarPapa'].hide()
      },
      verFichaAcudiente() {
        this.datosFichaA.idEstudiante = this.datosFichaE.idEstudiante
        this.datosFichaA.idAcudiente = this.datosFichaE.id_acudiente
        this.datosFichaA.idParentesco = this.datosFichaE.id_parentesco
        this.$refs['modalAsociarAcudiente'].show()
      },
      datosRecibidosAcudiente(retorno) {
        if(retorno == 1) {
          this.consultaFichaMatricula()
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos del Acudiente se han actualizado correctamente.')
        }
        this.$refs['modalAsociarAcudiente'].hide()
      },
      cancelarValidarFirmaEstudiante() {
        this.firmaEstudianteValida = true
        this.cancelarFirmaEstudiante = false
      },
      cancelarValidarFirmaAcudiente() {
        this.firmaAcudienteValida = true
        this.cancelarFirmaAcudiente = false
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
      abrirCapturadorFirmas() {
        window.open('https://www.sigplusweb.com/sigwebtablet_demo.html','_blank')
      },
      async actualizarFoto() {
        let infoFotoEstudiante = {}
        infoFotoEstudiante.foto = this.datosFichaE.foto
        infoFotoEstudiante.idEstudiante = this.datosFichaE.idEstudiante
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/matricula/fotoestudiante', JSON.stringify(infoFotoEstudiante), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Foto Estudiante')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'La foto del estudiente se ha actualizado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Foto Estudiante. Intente más tarde. ' + err)
        })
      },
      datosRecibidosFoto(retorno) {
        this.$store.state.foto = retorno
        this.datosFichaE.foto = retorno
        this.actualizarFoto()
        this.$refs['modalEditarFoto'].hide()
      },
      cambiarFoto() {
        this.$refs['modalEditarFoto'].show()
      },
      borrarFoto() {
        this.datosFichaE.foto = null
        this.actualizarFoto()
        this.$store.state.foto = CONFIG.FOTO
        this.datosFichaE.foto = CONFIG.FOTO
      },
      async guardarFirmaEstudiante() {
        this.firmaEstudianteNoGuardada = false
        let infoFirmaEstudiante = {}
        infoFirmaEstudiante.firma = this.datosFichaE.firma_estudiante
        infoFirmaEstudiante.idMatricula = this.idMatricula
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/matricula/firmaestudiante', JSON.stringify(infoFirmaEstudiante), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Firma Estudiante')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'La firma el estudiante se ha actualizado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Firma Estudiante. Intente más tarde. ' + err)
        })
      },
      async guardarFirmaAcudiente() {
        this.firmaAcudienteNoGuardada = false
        let infoFirmaAcudiente = {}
        infoFirmaAcudiente.firma = this.datosFichaE.firma_acudiente
        infoFirmaAcudiente.idMatricula = this.idMatricula
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/matricula/firmaacudiente', JSON.stringify(infoFirmaAcudiente), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Firma Acudiente')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'La firma el acudiente se ha actualizado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Firma Acudiente. Intente más tarde. ' + err)
        })
      },
      borrarFirmaEstudiante() {
        this.cancelarFirmaEstudiante = true
        this.firmaEstudianteValida = false
        this.firmaEstudianteNoGuardada = false
        this.nuevaFirmaEstudiante = null
      },
      borrarFirmaAcudiente() {
        this.cancelarFirmaAcudiente = true
        this.firmaAcudienteValida = false
        this.firmaAcudienteNoGuardada = false
        this.nuevaFirmaAcudiente = null
      },
      validarFirmaEstudiante() {
        if (this.nuevaFirmaEstudiante != null && this.nuevaFirmaEstudiante != '') {
          if (this.nuevaFirmaEstudiante.length > 256) {
            this.cancelarFirmaEstudiante = false
            this.firmaEstudianteValida = true
            this.firmaEstudianteNoGuardada = true
            this.datosFichaE.firma_estudiante = 'data:image/jpeg;base64,' + this.nuevaFirmaEstudiante
          } else {
            this.firmaEstudianteValida = false
            this.nuevaFirmaEstudiante = null
            this.firmaEstudianteNoGuardada = false
            this.$bvModal.msgBoxOk('¡La setimos.! Al parecer no es una firma válida. Vuelva a capturar la firma y copie el código: String Base64', {
              headerBgVariant: 'danger',
              headerTextVariant: 'light',
              bodyBgVariant: 'light',
              bodyBgClass: 'text-center',
              title: CONFIG.TITULO_MSG,
              size: '',
              buttonSize: 'sm',
              okVariant: 'success',
              okTitle: 'Aceptar',
              footerClass: 'p-2',
              bodyClass: 'p-5',
              hideHeaderClose: true,
              centered: true
            })
            .then(value => {
              return true
            })
          }
        } else {
          this.$bvModal.msgBoxOk('¡La setimos.! La firma esta vacia. Vuelva a capturar la firma y copie el código: String Base64', {
            headerBgVariant: 'danger',
            headerTextVariant: 'light',
            bodyBgVariant: 'light',
            bodyBgClass: 'text-center',
            title: CONFIG.TITULO_MSG,
            size: '',
            buttonSize: 'sm',
            okVariant: 'success',
            okTitle: 'Aceptar',
            footerClass: 'p-2',
            bodyClass: 'p-5',
            hideHeaderClose: true,
            centered: true
          })
          .then(value => {
            return true
          })
        }
      },
      validarFirmaAcudiente() {
        if (this.nuevaFirmaAcudiente != null && this.nuevaFirmaAcudiente != '') {
          if (this.nuevaFirmaAcudiente.length > 256) {
            this.cancelarFirmaAcudiente = false
            this.firmaAcudienteValida = true
            this.firmaAcudienteNoGuardada = true
            this.datosFichaE.firma_acudiente = 'data:image/jpeg;base64,' + this.nuevaFirmaAcudiente
          } else {
            this.firmaAcudienteValida = false
            this.nuevaFirmaAcudiente = null
            this.firmaAcudienteNoGuardada = false
            this.$bvModal.msgBoxOk('¡La setimos.! Al parecer no es una firma válida. Vuelva a capturar la firma y copie el código: String Base64', {
              headerBgVariant: 'danger',
              headerTextVariant: 'light',
              bodyBgVariant: 'light',
              bodyBgClass: 'text-center',
              title: CONFIG.TITULO_MSG,
              size: '',
              buttonSize: 'sm',
              okVariant: 'success',
              okTitle: 'Aceptar',
              footerClass: 'p-2',
              bodyClass: 'p-5',
              hideHeaderClose: true,
              centered: true
            })
            .then(value => {
              return true
            })
          }
        } else {
            this.$bvModal.msgBoxOk('¡La setimos.! La firma esta vacia. Vuelva a capturar la firma y copie el código: String Base64', {
              headerBgVariant: 'danger',
              headerTextVariant: 'light',
              bodyBgVariant: 'light',
              bodyBgClass: 'text-center',
              title: CONFIG.TITULO_MSG,
              size: '',
              buttonSize: 'sm',
              okVariant: 'success',
              okTitle: 'Aceptar',
              footerClass: 'p-2',
              bodyClass: 'p-5',
              hideHeaderClose: true,
              centered: true
            })
            .then(value => {
              return true
            })
        }
      },
      imprimirFormulario() {
        //window.open("https://siedutunja.gov.co/php/matriculas/FichaMatricula.php?token=" + this.idMatricula,"_blank")
        window.open("https://siedutunja.gov.co/" + this.$store.state.FichaMatricula + "?token=" + this.idMatricula,"_blank")
        return true
      },
      nuevoFormulario() {
        this.$router.push('/matriculas/ficharenovacionmatricula')
      },
      cancelarFormulario() {
        this.$router.push('/')
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.idMatricula = this.$store.state.idMatricula
      this.consultaFichaMatricula()
      this.fotoA = CONFIG.FOTO
    }
  }
</script>