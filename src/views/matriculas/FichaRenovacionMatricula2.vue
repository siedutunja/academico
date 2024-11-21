<template>
  <div>
    <b-row>
      <b-col lg="12">
        <b-card>
          <template #header>
            <h3 class="mb-0 text-center">FORMULARIO DE MATRICULA DE ESTUDIANTE<br> Año Lectivo {{ $store.state.aLectivo }}</h3>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <b-alert class="text-center" show>ESTUDIANTE<br><h4 class="mb-0"><b>{{ nombreEstudiante }}</b></h4><span>{{ idEstudiante }}</span><span v-if="infoMatricula.codigo!='' && infoMatricula.codigo!=null"><br><strong>CODIGO: {{ infoMatricula.codigo }}</strong></span></b-alert>
              </b-col>
              <b-col lg="12">
                <b-tabs content-class="mt-3">
                  <b-tab title="Datos del Estudiante" active>
                    <CCard style="margin-top: -17">
                      <CCardBody>
                        <b-row>
                          <b-col lg="6">
                            <span>Número del Documento:</span>
                            <h6 class="mb-2">{{infoMatricula.documento}}</h6>
                            <span>Tipo del Documento:</span>
                            <h6 class="mb-2">{{infoMatricula.desTipoDocumento}}</h6>
                            <span>Municipio de Expedición del Documento:</span>
                            <h6 class="mb-2">{{infoMatricula.desMunicipioDocumento}}</h6>
                            <span>Fecha de Nacimiento:</span>
                            <h6 class="mb-2">{{infoMatricula.fecha_nacimiento}}</h6>
                            <span>Pais de Nacimiento:</span>
                            <h6 class="mb-2">{{infoMatricula.desPais}}</h6>
                            <span>Municipio de Nacimiento:</span>
                            <h6 class="mb-2">{{infoMatricula.desMunicipioNace}}</h6>
                            <span>Genero:</span>
                            <h6 class="mb-2">{{infoMatricula.desGenero}}</h6>
                          </b-col>
                          <b-col lg="6">
                            <span>Factor RH:</span>
                            <h6 class="mb-2">{{infoMatricula.desRh}}</h6>
                            <span>Grupo Etnico:</span>
                            <h6 class="mb-2">{{infoMatricula.desEtnia}}</h6>
                            <span>Eps:</span>
                            <h6 class="mb-2">{{infoMatricula.desEps}}</h6>
                            <span>Discapacidad:</span>
                            <h6 class="mb-2">{{infoMatricula.desDiscapacidad}}</h6>
                            <span>Educación Diversa/Inclusiva:</span>
                            <h6 class="mb-2">{{infoMatricula.desDiversa}}</h6>
                            <span>Capacidades Excepcionales:</span>
                            <h6 class="mb-2">{{infoMatricula.desCapacidades}}</h6>
                            <span>Población Victima:</span>
                            <h6 class="mb-2">{{infoMatricula.desVictima}}</h6>
                          </b-col>
                        </b-row>
                        <b-row><b-col lg="12"><hr></b-col></b-row>
                        <b-row>
                          <b-col lg="6">
                            <span>Dirección del Domicilio:</span>
                            <h6 class="mb-2">{{infoMatricula.direccion}}</h6>
                            <span>Municipio Domicilio:</span>
                            <h6 class="mb-2">{{infoMatricula.desMunicipioDireccion}}</h6>
                            <span>Barrio:</span>
                            <h6 class="mb-2">{{infoMatricula.barrio}}</h6>
                          </b-col>
                          <b-col lg="6">
                            <span>Estrato:</span>
                            <h6 class="mb-2">{{infoMatricula.desEstrato}}</h6>
                            <span>Teléfono Contacto:</span>
                            <h6 class="mb-2">{{infoMatricula.telefono1}}</h6>
                            <span>Correo:</span>
                            <h6 class="mb-2">{{infoMatricula.correo}}</h6>
                          </b-col>
                        </b-row>
                      </CCardBody>
                    </CCard>
                  </b-tab>
                  <b-tab title="Datos del Acudiente">
                    <CCard style="margin-top: -17">
                      <CCardBody>
                        <b-row>
                          <b-col lg="6">
                            <span>Nombre del Acudiente:</span>
                            <h6 class="mb-2">{{nombreAcudiente}}</h6>
                          </b-col>
                          <b-col lg="6">
                            <span>Parentesco con el Estudiante:</span>
                            <h6 class="mb-2">{{infoMatricula.desParentesco}}</h6>
                          </b-col>
                          <b-col lg="12"><hr></b-col>
                        </b-row>
                        <b-row>
                          <b-col lg="6">
                            <span>Número del Documento:</span>
                            <h6 class="mb-2">{{infoMatricula.documentoA}}</h6>
                            <span>Tipo del Documento:</span>
                            <h6 class="mb-2">{{infoMatricula.desTipoDocumentoA}}</h6>
                            <span>Municipio de Expedición del Documento:</span>
                            <h6 class="mb-2">{{infoMatricula.desMunicipioDocumentoA}}</h6>
                            <span>Fecha de Nacimiento:</span>
                            <h6 class="mb-2">{{infoMatricula.fecha_nacimientoA}}</h6>
                            <span>Pais de Nacimiento:</span>
                            <h6 class="mb-2">{{infoMatricula.desPaisA}}</h6>
                            <span>Municipio de Nacimiento:</span>
                            <h6 class="mb-2">{{infoMatricula.desMunicipioNaceA}}</h6>
                            <span>Genero:</span>
                            <h6 class="mb-2">{{infoMatricula.desGeneroA}}</h6>
                            <span>Factor RH:</span>
                            <h6 class="mb-2">{{infoMatricula.desRhA}}</h6>
                          </b-col>
                          <b-col lg="6">
                            <span>Eps:</span>
                            <h6 class="mb-2">{{infoMatricula.desEpsA}}</h6>
                            <span>Dirección del Domicilio:</span>
                            <h6 class="mb-2">{{infoMatricula.direccionA}}</h6>
                            <span>Municipio Domicilio:</span>
                            <h6 class="mb-2">{{infoMatricula.desMunicipioDireccionA}}</h6>
                            <span>Barrio:</span>
                            <h6 class="mb-2">{{infoMatricula.barrioA}}</h6>
                            <span>Estrato:</span>
                            <h6 class="mb-2">{{infoMatricula.desEstratoA}}</h6>
                            <span>Teléfono Contacto:</span>
                            <h6 class="mb-2">{{infoMatricula.telefono1A}}</h6>
                            <span>Correo:</span>
                            <h6 class="mb-2">{{infoMatricula.correoA}}</h6>
                            <span>Ocupación Laboral:</span>
                            <h6 class="mb-2">{{infoMatricula.ocupacionA}}</h6>
                          </b-col>
                        </b-row>
                      </CCardBody>
                    </CCard>
                  </b-tab>
                  <b-tab title="Datos del Papá">
                    <CCard style="margin-top: -17">
                      <CCardBody>
                        <b-row v-if="infoMatricula.idPapa == null">
                          <b-col lg="12">
                            <h6>La información del Papá no se ha asociado al Estudiante.</h6>
                            <b-button class="small mx-1 mt-2" variant="primary" @click="asociarFamiliar(1)">Asociar Papá</b-button>
                          </b-col>
                        </b-row>
                        <b-row v-else>
                          <b-col lg="12">
                            <b-row>
                              <b-col lg="12">
                                <span>Nombre del Papá:</span>
                                <h6 class="mb-2">{{nombrePadre}}</h6>
                              </b-col>
                              <b-col lg="12"><hr></b-col>
                            </b-row>
                            <b-row>
                              <b-col lg="6">
                                <span>Número del Documento:</span>
                                <h6 class="mb-2">{{infoMatricula.documentoP}}</h6>
                                <span>Tipo del Documento:</span>
                                <h6 class="mb-2">{{infoMatricula.desTipoDocumentoP}}</h6>
                                <span>Municipio de Expedición del Documento:</span>
                                <h6 class="mb-2">{{infoMatricula.desMunicipioDocumentoP}}</h6>
                                <span>Fecha de Nacimiento:</span>
                                <h6 class="mb-2">{{infoMatricula.fecha_nacimientoP}}</h6>
                                <span>Pais de Nacimiento:</span>
                                <h6 class="mb-2">{{infoMatricula.desPaisP}}</h6>
                                <span>Municipio de Nacimiento:</span>
                                <h6 class="mb-2">{{infoMatricula.desMunicipioNaceP}}</h6>
                                <span>Genero:</span>
                                <h6 class="mb-2">{{infoMatricula.desGeneroP}}</h6>
                                <span>Factor RH:</span>
                                <h6 class="mb-2">{{infoMatricula.desRhP}}</h6>
                              </b-col>
                              <b-col lg="6">
                                <span>Eps:</span>
                                <h6 class="mb-2">{{infoMatricula.desEpsP}}</h6>
                                <span>Dirección del Domicilio:</span>
                                <h6 class="mb-2">{{infoMatricula.direccionP}}</h6>
                                <span>Municipio Domicilio:</span>
                                <h6 class="mb-2">{{infoMatricula.desMunicipioDireccionP}}</h6>
                                <span>Barrio:</span>
                                <h6 class="mb-2">{{infoMatricula.barrioP}}</h6>
                                <span>Estrato:</span>
                                <h6 class="mb-2">{{infoMatricula.desEstratoP}}</h6>
                                <span>Teléfono Contacto:</span>
                                <h6 class="mb-2">{{infoMatricula.telefono1P}}</h6>
                                <span>Correo:</span>
                                <h6 class="mb-2">{{infoMatricula.correoP}}</h6>
                                <span>Ocupación Laboral:</span>
                                <h6 class="mb-2">{{infoMatricula.ocupacionP}}</h6>
                              </b-col>
                            </b-row>
                          </b-col>
                        </b-row>
                      </CCardBody>
                    </CCard>
                  </b-tab>
                  <b-tab title="Datos de la Mamá">
                    <CCard style="margin-top: -17">
                      <CCardBody>
                        <b-row v-if="infoMatricula.idMama == null">
                          <b-col lg="12">
                            <h6>La información de la Mamá no se ha asociado al Estudiante.</h6>
                            <b-button class="small mx-1 mt-2" variant="primary" @click="asociarFamiliar(2)">Asociar Mamá</b-button>
                          </b-col>
                        </b-row>
                        <b-row v-else>
                          <b-col lg="12">
                            <b-row>
                              <b-col lg="12">
                                <span>Nombre de la Mamá: </span>
                                <h6 class="mb-2">{{nombreMadre}}</h6>
                              </b-col>
                              <b-col lg="12"><hr></b-col>
                            </b-row>
                            <b-row>
                              <b-col lg="6">
                                <span>Número del Documento:</span>
                                <h6 class="mb-2">{{infoMatricula.documentoM}}</h6>
                                <span>Tipo del Documento:</span>
                                <h6 class="mb-2">{{infoMatricula.desTipoDocumentoM}}</h6>
                                <span>Municipio de Expedición del Documento:</span>
                                <h6 class="mb-2">{{infoMatricula.desMunicipioDocumentoM}}</h6>
                                <span>Fecha de Nacimiento:</span>
                                <h6 class="mb-2">{{infoMatricula.fecha_nacimientoM}}</h6>
                                <span>Pais de Nacimiento:</span>
                                <h6 class="mb-2">{{infoMatricula.desPaisM}}</h6>
                                <span>Municipio de Nacimiento:</span>
                                <h6 class="mb-2">{{infoMatricula.desMunicipioNaceM}}</h6>
                                <span>Genero:</span>
                                <h6 class="mb-2">{{infoMatricula.desGeneroM}}</h6>
                                <span>Factor RH:</span>
                                <h6 class="mb-2">{{infoMatricula.desRhM}}</h6>
                              </b-col>
                              <b-col lg="6">
                                <span>Eps:</span>
                                <h6 class="mb-2">{{infoMatricula.desEpsM}}</h6>
                                <span>Dirección del Domicilio:</span>
                                <h6 class="mb-2">{{infoMatricula.direccionM}}</h6>
                                <span>Municipio Domicilio:</span>
                                <h6 class="mb-2">{{infoMatricula.desMunicipioDireccionM}}</h6>
                                <span>Barrio:</span>
                                <h6 class="mb-2">{{infoMatricula.barrioM}}</h6>
                                <span>Estrato:</span>
                                <h6 class="mb-2">{{infoMatricula.desEstratoM}}</h6>
                                <span>Teléfono Contacto:</span>
                                <h6 class="mb-2">{{infoMatricula.telefono1M}}</h6>
                                <span>Correo:</span>
                                <h6 class="mb-2">{{infoMatricula.correoM}}</h6>
                                <span>Ocupación Laboral:</span>
                                <h6 class="mb-2">{{infoMatricula.ocupacionM}}</h6>
                              </b-col>
                            </b-row>
                          </b-col>
                        </b-row>
                      </CCardBody>
                    </CCard>
                  </b-tab>
                  <b-tab title="Firmas">
                    <CCard style="margin-top: -17">
                      <CCardBody>
                        <b-row>
                          <b-col lg="6" md="12">
                            <b-form-group label="Pegar la Firma del Estudiante" label-for="firmaE" class="etiqueta">
                              <b-form-textarea id="firmaE" ref="firmaE" v-model.trim="firmaEstudiante" aria-describedby="feedFirma" autocomplete="off" rows="6" :disabled="firmaEstudianteValida"></b-form-textarea>
                            </b-form-group>
                          </b-col>
                          <b-col lg="6" md="12" v-if="firmaEstudianteValida">
                            <b-form-group label="Vista Previa de la Firma del Estudiante" label-for="firma" class="etiqueta">
                              <img class="text-center mt-3" :src="firmaEstudiante" alt="Firma" width="100%">
                            </b-form-group>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col lg="12">
                            <b-button class="small mx-2 mt-2" variant="outline-primary"  v-if="!firmaEstudianteValida" @click="validarFirmaEstudiante()">Validar Firma</b-button>
                            <b-button class="small mx-2 mt-2" variant="outline-danger" v-if="firmaEstudianteValida" @click="borrarFirmaEstudiante()">Borrar Firma</b-button>
                            <b-button class="small mx-2 mt-2" variant="outline-success" v-if="firmaEstudianteNoGuardada" @click="guardarFirmaEstudiante()">Guardar Firma</b-button>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col lg="12"><hr></b-col>
                        </b-row>
                        <b-row>
                          <b-col lg="6" md="12">
                            <b-form-group label="Pegar la Firma del Acudiente" label-for="firmaA" class="etiqueta">
                              <b-form-textarea id="firmaA" ref="firmaA" v-model.trim="firmaAcudiente" aria-describedby="feedFirmaA" autocomplete="off" rows="6" :disabled="firmaAcudienteValida"></b-form-textarea>
                            </b-form-group>
                          </b-col>
                          <b-col lg="6" md="12" v-if="firmaAcudienteValida">
                            <b-form-group label="Vista Previa de la Firma del Acudiente" label-for="firmaA" class="etiqueta">
                              <img class="text-center mt-3" :src="firmaAcudiente" alt="Firma" width="100%">
                            </b-form-group>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col lg="12">
                            <b-button class="small mx-2 mt-2" variant="outline-primary"  v-if="!firmaAcudienteValida" @click="validarFirmaAcudiente()">Validar Firma</b-button>
                            <b-button class="small mx-2 mt-2" variant="outline-danger" v-if="firmaAcudienteValida" @click="borrarFirmaAcudiente()">Borrar Firma</b-button>
                            <b-button class="small mx-2 mt-2" variant="outline-success" v-if="firmaAcudienteNoGuardada" @click="guardarFirmaAcudiente()">Guardar Firma</b-button>
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
                  <b-tab title="Foto">
                    <CCard style="margin-top: -17">
                      <CCardBody>
                        <b-row class="p-3">
                          <b-col lg="12" class="mt-3 text-center">
                            <img :src="foto" id="photo" alt="photo">
                          </b-col>
                          <b-col lg="12" class="mt-3 text-center">
                            <b-button class="small mx-3" variant="info" @click="cambiarFoto">Cambiar Foto</b-button>
                            <b-button class="small mx-3" variant="danger" @click="borrarFoto">Borrar Foto</b-button>
                          </b-col>
                        </b-row>
                      </CCardBody>
                    </CCard>
                  </b-tab>
                  <b-tab title="Datos de la Matrícula">
                    <CCard style="margin-top: -17">
                      <CCardBody>
                        <b-row>
                          <b-col lg="6">
                            <span>Sede:</span>
                            <h6 class="mb-2">{{infoMatricula.desSede}}</h6>
                            <span>Grado/Curso:</span>
                            <h6 class="mb-2">{{infoMatricula.desCurso}}</h6>
                            <span>Especialidad:</span>
                            <h6 class="mb-2">{{infoMatricula.desEspecialidad}}</h6>
                            <span>Metodología:</span>
                            <h6 class="mb-2">{{infoMatricula.desMetodologia}}</h6>
                            <span>Estudiante Repitente:</span>
                            <h6 class="mb-2">{{infoMatricula.desRepitente}}</h6>
                          </b-col>
                          <b-col lg="6">
                            <span>Estudiante Nuevo:</span>
                            <h6 class="mb-2">{{infoMatricula.desNuevo}}</h6>
                            <span>Institución de Procedencia:</span>
                            <h6 class="mb-2">{{infoMatricula.procedencia}}</h6>
                            <span>Ruta Transporte:</span>
                            <h6 class="mb-2">{{infoMatricula.desRuta}}</h6>
                            <span>Tiene Seguro:</span>
                            <h6 class="mb-2">{{infoMatricula.desSeguro}}</h6>
                            <span>Aseguradora:</span>
                            <h6 class="mb-2">{{infoMatricula.aseguradora}}</h6>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col lg="12">
                            <span>Observaciones de la Matrícula:</span>
                            <h6 class="mb-2">{{infoMatricula.obs_matricula}}</h6>
                          </b-col>
                        </b-row>
                        <b-row><b-col lg="12"><hr></b-col></b-row>
                        <b-row>
                          <b-col lg="12">
                            <b-button class="small mx-1 mt-2" variant="primary" @click="imprimirFormulario">Imprimir Formulario de la Matricula del Estudiante</b-button>
                            <b-button class="small mx-1 mt-2" variant="primary" @click="nuevoFormulario">Realizar otra Matricula</b-button>
                            <b-button class="small mx-1 mt-2" variant="secondary" @click="cancelarFormulario">Cerrar Formulario de Matricula</b-button>
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
    <b-modal ref="modalEditarFoto" size="lg" scrollable hide-footer title="Editar Foto" ok-only>
      <div class="mx-3">
        <div>
          <EditarFoto @retorno="datosRecibidosFoto"/>
        </div>
      </div>
    </b-modal>
    <b-modal ref="modalAsociarFamiliar" size="xl" scrollable hide-footer :title="datosFamiliar.familiar==1 ? 'Asociar el Papá del Estudiante' : 'Asociar la Mamá del Estudiante'" ok-only>
      <div class="mx-3">
        <div>
          <FichaFamiliar :datosFamiliar="datosFamiliar"  @retorno="datosRecibidosFamiliar"/>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import EditarFoto from '@/views/matriculas/EditarFoto'
  import FichaFamiliar from '@/views/matriculas/FichaFamiliar'

  export default {
    name: 'fichamatriculapreinscrito2',
    components: {
      EditarFoto,
      FichaFamiliar
    },
    data () {
      return {
        idEstudiante: null,
        idMatricula: null,
        nombreEstudiante: null,
        nombreAcudiente: null,
        nombrePadre: null,
        nombreMadre: null,
        infoMatricula: {},
        firmaEstudiante: null,
        firmaEstudianteValida: false,
        firmaEstudianteNoGuardada: false,
        firmaAcudiente: null,
        firmaAcudienteValida: false,
        firmaAcudienteNoGuardada: false,
        foto: null,
        datosFamiliar: {
          familiar: null,
          idEstudiante: null
        }
      }
    },
    methods: {
      abrirCapturadorFirmas() {
        window.open('https://www.sigplusweb.com/sigwebtablet_demo.html','_blank')
      },
      asociarFamiliar(fam) {
        this.datosFamiliar.familiar = fam
        this.datosFamiliar.idEstudiante = this.infoMatricula.idEstudiante
        this.$refs['modalAsociarFamiliar'].show()
      },
      datosRecibidosFamiliar(retorno) {
        this.$refs['modalAsociarFamiliar'].hide()
        if (retorno != 0) {
          if (retorno.familiar == 1) {
            this.nombrePadre = retorno.apellido1A
            this.nombrePadre += retorno.apellido2A!=null ? ' ' + retorno.apellido2A : ''
            this.nombrePadre +=  ' ' + retorno.nombre1A
            this.nombrePadre += retorno.nombre2A!==null ? ' ' + retorno.nombre2A : ''
            this.infoMatricula.idPapa = retorno.idFamiliar
            this.infoMatricula.nombreP = this.nombrePadre
            this.infoMatricula.documentoP = retorno.documentoA
            this.infoMatricula.desTipoDocumentoP = retorno.desTipoDocumentoA
            this.infoMatricula.desMunicipioDocumentoP = retorno.desMunicipioDocumentoA
            this.infoMatricula.fecha_nacimientoP = retorno.fecha_nacimientoA
            this.infoMatricula.desPaisP = retorno.desPaisA
            this.infoMatricula.desMunicipioNaceP = retorno.desMunicipioNaceA
            this.infoMatricula.desGeneroP = retorno.desGeneroA
            this.infoMatricula.desRhP = retorno.desRhA
            this.infoMatricula.desEpsP = retorno.desEpsA
            this.infoMatricula.direccionP = retorno.direccionA
            this.infoMatricula.desMunicipioDireccionP = retorno.desMunicipioDireccionA
            this.infoMatricula.barrioP = retorno.barrioA
            this.infoMatricula.desEstratoP = retorno.desEstratoA
            this.infoMatricula.telefono1P = retorno.telefono1A
            this.infoMatricula.telefono2P = retorno.telefono2A
            this.infoMatricula.correoP = retorno.correoA
            this.infoMatricula.desSisbenP = retorno.desSisbenA
            this.infoMatricula.desZonaP = retorno.desZonaA
            this.infoMatricula.ocupacionP = retorno.ocupacionA
            alert('Los datos del Papá del estudiente se han actualizado correctamente.')
          } else {
            this.nombreMadre = retorno.apellido1A
            this.nombreMadre += retorno.apellido2A!=null ? ' ' + retorno.apellido2A : ''
            this.nombreMadre +=  ' ' + retorno.nombre1A
            this.nombreMadre += retorno.nombre2A!==null ? ' ' + retorno.nombre2A : ''
            this.infoMatricula.idMama = retorno.idFamiliar
            this.infoMatricula.nombreM = this.nombreMadre
            this.infoMatricula.documentoM = retorno.documentoA
            this.infoMatricula.desTipoDocumentoM = retorno.desTipoDocumentoA
            this.infoMatricula.desMunicipioDocumentoM = retorno.desMunicipioDocumentoA
            this.infoMatricula.fecha_nacimientoM = retorno.fecha_nacimientoA
            this.infoMatricula.desPaisM = retorno.desPaisA
            this.infoMatricula.desMunicipioNaceM = retorno.desMunicipioNaceA
            this.infoMatricula.desGeneroM = retorno.desGeneroA
            this.infoMatricula.desRhM = retorno.desRhA
            this.infoMatricula.desEpsM = retorno.desEpsA
            this.infoMatricula.direccionM = retorno.direccionA
            this.infoMatricula.desMunicipioDireccionM = retorno.desMunicipioDireccionA
            this.infoMatricula.barrioM = retorno.barrioA
            this.infoMatricula.desEstratoM = retorno.desEstratoA
            this.infoMatricula.telefono1M = retorno.telefono1A
            this.infoMatricula.telefono2M = retorno.telefono2A
            this.infoMatricula.correoM = retorno.correoA
            this.infoMatricula.desSisbenM = retorno.desSisbenA
            this.infoMatricula.desZonaM = retorno.desZonaA
            this.infoMatricula.ocupacionM = retorno.ocupacionA
            alert('Los datos de la Mamá del estudiente se han actualizado correctamente.')
          }
        }
      },
      async actualizarFoto() {
        let infoFotoEstudiante = {}
        infoFotoEstudiante.foto = this.foto
        infoFotoEstudiante.idEstudiante = this.idEstudiante
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
        this.foto = retorno
        this.actualizarFoto()
        this.$refs['modalEditarFoto'].hide()
      },
      cambiarFoto() {
        this.$refs['modalEditarFoto'].show()
      },
      borrarFoto() {
        this.foto = null
        this.actualizarFoto()
        this.$store.state.foto = CONFIG.FOTO
        this.foto = CONFIG.FOTO
      },
      capturarFoto() {
        this.$bvModal.msgBoxOk('No se detectó la cámara para captura de fotos. Instale y configure una webcam e intente nuevamente.', {
          headerBgVariant: 'warning',
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
      },
      async guardarFirmaEstudiante() {
        this.firmaEstudianteNoGuardada = false
        let infoFirmaEstudiante = {}
        infoFirmaEstudiante.firma = this.firmaEstudiante
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
      borrarFirmaEstudiante() {
        this.firmaEstudianteValida = false
        this.firmaEstudianteNoGuardada = false
        this.firmaEstudiante = null
      },
      validarFirmaEstudiante() {
        if (this.firmaEstudiante != null && this.firmaEstudiante != '') {
          if (this.firmaEstudiante.length > 256) {
            this.firmaEstudianteValida = true
            this.firmaEstudianteNoGuardada = true
            this.firmaEstudiante = 'data:image/jpeg;base64,' + this.firmaEstudiante
          } else {
            this.firmaEstudianteValida = false
            this.firmaEstudiante = null
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
      async guardarFirmaAcudiente() {
        this.firmaAcudienteNoGuardada = false
        let infoFirmaAcudiente = {}
        infoFirmaAcudiente.firma = this.firmaAcudiente
        infoFirmaAcudiente.idMatricula = this.idMatricula
        await axios
        .put(CONFIG.ROOT_PATH + 'academico/matricula/firmaacudiente', JSON.stringify(infoFirmaAcudiente), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Firma Acudiente')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Se ha actualizado la firma el acudiente correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Firma Acudiente. Intente más tarde. ' + err)
        })
      },
      borrarFirmaAcudiente() {
        this.firmaAcudienteValida = false
        this.firmaAcudienteNoGuardada = false
        this.firmaAcudiente = null
      },
      validarFirmaAcudiente() {
        if (this.firmaAcudiente != null && this.firmaAcudiente != '') {
          if (this.firmaAcudiente.length > 256) {
            this.firmaAcudienteValida = true
            this.firmaAcudienteNoGuardada = true
            this.firmaAcudiente = 'data:image/jpeg;base64,' + this.firmaAcudiente
          } else {
            this.firmaAcudienteValida = false
            this.firmaAcudiente = null
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
        this.$store.commit('set', ['datosMatriculaPreinscrito', this.infoMatricula])
        sessionStorage.setItem('datosMatriculaPreinscrito', JSON.stringify(this.infoMatricula))
        //window.open("http://localhost/siedutunja/php/matriculas/FichaMatricula.php?token=" + this.idMatricula,"_blank")
        window.open("https://siedutunja.gov.co/php/matriculas/FichaMatricula.php?token=" + this.idMatricula,"_blank")
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
      if((this.$store.state.idRol == 1 || this.$store.state.idRol == 12)) {
        this.infoMatricula = this.$store.state.datosMatriculaPreinscrito
        this.infoMatricula = JSON.parse(sessionStorage.getItem('datosMatriculaPreinscrito'))
        this.idEstudiante = this.infoMatricula.idEstudiante
        this.idMatricula = this.infoMatricula.idMatricula
        this.nombreEstudiante = this.infoMatricula.apellido1 
        this.nombreEstudiante += this.infoMatricula.apellido2!=null ? ' ' + this.infoMatricula.apellido2 : ''
        this.nombreEstudiante +=  ' ' + this.infoMatricula.nombre1
        this.nombreEstudiante += this.infoMatricula.nombre2!==null ? ' ' + this.infoMatricula.nombre2 : ''
        this.nombreAcudiente = this.infoMatricula.apellido1A
        this.nombreAcudiente += this.infoMatricula.apellido2A!=null ? ' ' + this.infoMatricula.apellido2A : ''
        this.nombreAcudiente +=  ' ' + this.infoMatricula.nombre1A
        this.nombreAcudiente += this.infoMatricula.nombre2A!==null ? ' ' + this.infoMatricula.nombre2A : ''
        this.infoMatricula.idPapa = null
        this.infoMatricula.idMama = null
        this.infoMatricula.nombreP = null
        this.infoMatricula.documentoP = null
        this.infoMatricula.desTipoDocumentoP = null
        this.infoMatricula.desMunicipioDocumentoP = null
        this.infoMatricula.fecha_nacimientoP = null
        this.infoMatricula.desPaisP = null
        this.infoMatricula.desMunicipioNaceP = null
        this.infoMatricula.desGeneroP = null
        this.infoMatricula.desRhP = null
        this.infoMatricula.desEpsP = null
        this.infoMatricula.direccionP = null
        this.infoMatricula.desMunicipioDireccionP = null
        this.infoMatricula.barrioP = null
        this.infoMatricula.desEstratoP = null
        this.infoMatricula.telefono1P = null
        this.infoMatricula.telefono2P = null
        this.infoMatricula.correoP = null
        this.infoMatricula.desSisbenP = null
        this.infoMatricula.desZonaP = null
        this.infoMatricula.ocupacionP = null
        this.infoMatricula.nombreM = null
        this.infoMatricula.documentoM = null
        this.infoMatricula.desTipoDocumentoM = null
        this.infoMatricula.desMunicipioDocumentoM = null
        this.infoMatricula.fecha_nacimientoM = null
        this.infoMatricula.desPaisM = null
        this.infoMatricula.desMunicipioNaceM = null
        this.infoMatricula.desGeneroM = null
        this.infoMatricula.desRhM = null
        this.infoMatricula.desEpsM = null
        this.infoMatricula.direccionM = null
        this.infoMatricula.desMunicipioDireccionM = null
        this.infoMatricula.barrioM = null
        this.infoMatricula.desEstratoM = null
        this.infoMatricula.telefono1M = null
        this.infoMatricula.telefono2M = null
        this.infoMatricula.correoM = null
        this.infoMatricula.desSisbenM = null
        this.infoMatricula.desZonaM = null
        this.infoMatricula.ocupacionM = null
        if (this.infoMatricula.id_parentesco == 1) { 
          this.nombrePadre = this.infoMatricula.apellido1A
          this.nombrePadre += this.infoMatricula.apellido2A!=null ? ' ' + this.infoMatricula.apellido2A : ''
          this.nombrePadre +=  ' ' + this.infoMatricula.nombre1A
          this.nombrePadre += this.infoMatricula.nombre2A!==null ? ' ' + this.infoMatricula.nombre2A : ''
          this.infoMatricula.idPapa = this.infoMatricula.idAcudiente
          this.infoMatricula.nombreP = this.nombrePadre
          this.infoMatricula.documentoP = this.infoMatricula.documentoA
          this.infoMatricula.desTipoDocumentoP = this.infoMatricula.desTipoDocumentoA
          this.infoMatricula.desMunicipioDocumentoP = this.infoMatricula.desMunicipioDocumentoA
          this.infoMatricula.fecha_nacimientoP = this.infoMatricula.fecha_nacimientoA
          this.infoMatricula.desPaisP = this.infoMatricula.desPaisA
          this.infoMatricula.desMunicipioNaceP = this.infoMatricula.desMunicipioNaceA
          this.infoMatricula.desGeneroP = this.infoMatricula.desGeneroA
          this.infoMatricula.desRhP = this.infoMatricula.desRhA
          this.infoMatricula.desEpsP = this.infoMatricula.desEpsA
          this.infoMatricula.direccionP = this.infoMatricula.direccionA
          this.infoMatricula.desMunicipioDireccionP = this.infoMatricula.desMunicipioDireccionA
          this.infoMatricula.barrioP = this.infoMatricula.barrioA
          this.infoMatricula.desEstratoP = this.infoMatricula.desEstratoA
          this.infoMatricula.telefono1P = this.infoMatricula.telefono1A
          this.infoMatricula.telefono2P = this.infoMatricula.telefono2A
          this.infoMatricula.correoP = this.infoMatricula.correoA
          this.infoMatricula.desSisbenP = this.infoMatricula.desSisbenA
          this.infoMatricula.desZonaP = this.infoMatricula.desZonaA
          this.infoMatricula.ocupacionP = this.infoMatricula.ocupacionA
        }
        if (this.infoMatricula.id_parentesco == 2) {
          this.nombreMadre = this.infoMatricula.apellido1A
          this.nombreMadre += this.infoMatricula.apellido2A!=null ? ' ' + this.infoMatricula.apellido2A : ''
          this.nombreMadre +=  ' ' + this.infoMatricula.nombre1A
          this.nombreMadre += this.infoMatricula.nombre2A!==null ? ' ' + this.infoMatricula.nombre2A : ''
          this.infoMatricula.idMama = this.infoMatricula.idAcudiente
          this.infoMatricula.nombreM = this.nombreMadre
          this.infoMatricula.documentoM = this.infoMatricula.documentoA
          this.infoMatricula.desTipoDocumentoM = this.infoMatricula.desTipoDocumentoA
          this.infoMatricula.desMunicipioDocumentoM = this.infoMatricula.desMunicipioDocumentoA
          this.infoMatricula.fecha_nacimientoM = this.infoMatricula.fecha_nacimientoA
          this.infoMatricula.desPaisM = this.infoMatricula.desPaisA
          this.infoMatricula.desMunicipioNaceM = this.infoMatricula.desMunicipioNaceA
          this.infoMatricula.desGeneroM = this.infoMatricula.desGeneroA
          this.infoMatricula.desRhM = this.infoMatricula.desRhA
          this.infoMatricula.desEpsM = this.infoMatricula.desEpsA
          this.infoMatricula.direccionM = this.infoMatricula.direccionA
          this.infoMatricula.desMunicipioDireccionM = this.infoMatricula.desMunicipioDireccionA
          this.infoMatricula.barrioM = this.infoMatricula.barrioA
          this.infoMatricula.desEstratoM = this.infoMatricula.desEstratoA
          this.infoMatricula.telefono1M = this.infoMatricula.telefono1A
          this.infoMatricula.telefono2M = this.infoMatricula.telefono2A
          this.infoMatricula.correoM = this.infoMatricula.correoA
          this.infoMatricula.desSisbenM = this.infoMatricula.desSisbenA
          this.infoMatricula.desZonaM = this.infoMatricula.desZonaA
          this.infoMatricula.ocupacionM = this.infoMatricula.ocupacionA
        }
        this.foto = this.$store.state.foto
        //console.log(JSON.stringify(this.infoMatricula))
      } else {
        this.$router.push('/restringida')
      }
    }
  }
</script>