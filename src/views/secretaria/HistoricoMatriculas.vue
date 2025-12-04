<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> HISTÓRICO DE MATRICULA DE ESTUDIANTE</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12">
                <b-card bg-variant="secondary" text-variant="" class="text-center">
                  <b-card-text>
                    <h4>{{ nombreEstudiante }}</h4>
                    <h5>Documento: {{ documentoEstudiante }}</h5>
                  </b-card-text>
                </b-card>
              </b-col>
              <b-col lg="12">
                <h3>Renovaciones Vigencia {{ $store.state.aLectivo }}:</h3>
                <vue-good-table :columns="encabColumnas" :rows="listaHistoricoActual" styleClass="vgt-table condensed bordered striped">
                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'vigencia'">
                      <span>{{props.row.vigencia}}</span> 
                    </span>
                    <span v-if="props.column.field == 'curso'">
                      <span>{{props.row.curso}}<br><span class="text-muted" style="font-size: 12px;">{{props.row.sede}}</span></span> 
                    </span>
                    <span v-if="props.column.field == 'estadoActual'">
                      <span>{{props.row.estadoActual}}</span> 
                    </span>
                    <span v-if="props.column.field == 'obs_final'">
                      <span>{{props.row.obs_final}}</span> 
                    </span>
                  </template>
                  <div slot="emptystate">
                    <h5 class="text-danger ml-5">No se encontraron registros de renovación para la actual vigencia.</h5>
                  </div>
                </vue-good-table>
              </b-col>
              <b-col lg="12" class="mt-5">
                <h3>Histórico de Renovaciones:</h3>
                <vue-good-table :columns="encabColumnasPromovidos" :rows="listaHistorico" styleClass="vgt-table condensed bordered striped">
                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'vigencia'">
                      <span>{{props.row.vigencia}}</span> 
                    </span>
                    <span v-if="props.column.field == 'curso'">
                      <span>{{props.row.curso}}<br><span class="text-muted" style="font-size: 12px;">{{props.row.sede}}</span></span> 
                    </span>
                    <span v-if="props.column.field == 'estadoFinal'">
                      <span>{{props.row.estadoFinal}}<br><span class="text-muted" style="font-size: 12px;">{{props.row.estadoActual}}</span></span> 
                    </span>
                    <span v-if="props.column.field == 'obs_final'">
                      <span>{{props.row.obs_final}}</span> 
                    </span>
                    <span v-if="props.column.field == 'idMatricula'">
                      <span style="font-weight: bold; color: blue; cursor: pointer" @click="datosCertificado(props.row)">Certificado</span> 
                    </span>
                  </template>
                  <div slot="emptystate">
                    <h5 class="text-danger ml-5">No se encontraron registros de renovación de matricula</h5>
                  </div>
                </vue-good-table>
              </b-col>
            </b-row>
          </b-card-text>
          <template #footer>
            <em>Histórico de matriculas del estudiante.</em>
          </template>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalGenerarCertificado" size="" scrollable hide-footer :title="'Certificado Año ' + vigencia" ok-only>
      <div class="mx-3">
        <b-row>
          <b-col lg="12">
            <b-form-group label="Consecutivo:" label-for="consecutivo" class="etiqueta">
              <b-form-input id="consecutivo" ref="consecutivo" v-model.trim="numCertificado" autocomplete="off" maxlength="10"></b-form-input>
              <b-form-text id="consecutivo">Ingrese el consecutivo para ser visualizado en el documento, de lo contrario deje el campo vacio.</b-form-text>
            </b-form-group>
          </b-col>
        </b-row>
        <CertificadoEstudiante
          v-if="mostrarCertificado"
          :idMatricula="idMatricula"
          :dataConsultada="dataConsultada"
          :nombreEst="nombreEst"
          :documentoEst="documentoEst"
          :grupo="grupo"
          :sede="sede"
          :vigencia="vigencia"
          :escudoUrl="escudoUrl"
          :numCert="numCert"
          :encabezado="encabezado"
          :certifican="certifican"
          :aquien="aquien"
          :tituloArea="tituloArea"
          :umbrales="umbrales"
          :estadofinal="estadofinal"
          :idEstadoFinal="idEstadoFinal"
          @cerrar="mostrarCertificado = false"
        />
        <b-row>
          <b-col lg="12"><hr></b-col>
          <b-col lg="12">
            <b-button class="small ml-3" variant="primary" @click="generarCertificado">Generar Certificado</b-button>
            <b-button class="small ml-3" variant="secondary" @click="cancelarFormulario">Cancelar</b-button>
          </b-col>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'
  import CertificadoEstudiante from '@/views/secretaria/CertificadoEstudiante'

  export default {
    name: 'historicomatriculas',
    components: {
      VueGoodTable,
      CertificadoEstudiante,
    },
    props: {
      idEstudiante: String,
      nombreEstudiante: String,
      documentoEstudiante: String
    },
    data () {
      return {
        listaHistoricoActual: [],
        listaHistorico: [],
        numCertificado: null,
        encabColumnas: [
          { label: 'Vigencia', field: 'vigencia', sortable: false },
          { label: 'Curso_Sede', field: 'curso', sortable: false },
          { label: 'Estado Actual', field: 'estadoActual', sortable: false },
          { label: 'Observaciones', field: 'obs_final', sortable: false },
        ],
        encabColumnasPromovidos: [
          { label: 'Vigencia', field: 'vigencia', sortable: false },
          { label: 'Curso_Sede', field: 'curso', sortable: false },
          { label: 'Estado Final', field: 'estadoFinal', sortable: false },
          { label: 'Observaciones', field: 'obs_final', sortable: false },
          { label: '', field: 'idMatricula', sortable: false },
        ],
        idMatricula: null,
        dataConsultada: [],
        nombreEst: null,
        documentoEst: null,
        mostrarCertificado: false,
        grupo: null,
        sede: null,
        vigencia: null,
        escudoUrl: null,
        numCert: null,
        encabezado: null,
        certifican: null,
        aquien: null,
        tituloArea: null,
        umbrales: [],
        estadofinal: null,
        idEstadoFinal: null,
      }
    },
    methods: {
      generarCertificado() {
        if (this.$store.state.daneInstitucion == '115001002017') {
          this.encabezado = "El suscrito Rector y la Secretaria de la ESCUELA NORMAL SUPERIOR LEONOR ALVAREZ PINZÓN DE TUNJA - BOYACÁ, con aprobación oficial según Resolución No. 0552 del 04 de Octubre de 2023 emanada de la Secretaría de Educación Territorial de Tunja y Acreditación de Calidad y Desarrollo según Resolución No. 001470 del 07 de Febrero de 2019 del Ministerio de Educación Nacional."
          this.certifican = "CERTIFICAN"
          if (this.$store.state.idSeccion == 2) {
            this.tituloArea = "CAMPOS DE FORMACIÓN"
            this.aquien = "Que el(la) estudiante " + this.nombreEstudiante + " identificado(a) con " + this.documentoEstudiante + ", cursó en ésta Institución Educativa los estudios correspondientes al " + this.grupo + " del Programa de Formación Complementaria durante el año " + this.vigencia + ", con la intensidad horaria referida y obteniendo las siguientes calificaciones."
          } else {
            this.tituloArea = "ÁREAS DE FORMACIÓN"
            this.aquien = "Que el(la) estudiante " + this.nombreEstudiante + " identificado(a) con " + this.documentoEstudiante + ", cursó en ésta Institución Educativa los estudios correspondientes al grado " + this.grupo + " durante el año " + this.vigencia + ", con la intensidad horaria referida y obteniendo las siguientes calificaciones."
          }
        } else if (this.$store.state.daneInstitucion == '115001000430') {
          this.encabezado = "EL SUSCRITO RECTOR Y LA SECRETARIA DE LA INSTITUCIÓN EDUCATIVA NORMAL SUPERIOR SANTIAGO DE TUNJA, APROBADA POR RESOLUCIÓN No.0141 DEL VEINTICINCO (25) DE OCTUBRE DE DOS MIL CUATRO (2004), EMANADA DE LA SECRETARIA DE EDUCACIÓN TERRITORIAL DE TUNJA, QUE APRUEBA ESTUDIOS A LA INSTITUCIÓN EDUCATIVA NORMAL SUPERIOR SANTIAGO DE TUNJA, EN LOS NIVELES DE EDUCACIÓN PREESCOLAR, BÁSICA PRIMARIA, BASICA SECUNDARIA, MEDIA Y FORMACIÓN COMPLEMENTARIA."
          this.certifican = "CERTIFICAN"
          if (this.$store.state.idSeccion == 2) {
            this.tituloArea = "CAMPOS DE FORMACIÓN"
            this.aquien = "Que el(la) estudiante " + this.nombreEstudiante + " identificado(a) con " + this.documentoEstudiante + ", cursó en ésta Institución Educativa los estudios correspondientes al " + this.grupo + " del Programa de Formación Complementaria durante el año " + this.vigencia + ", con la intensidad horaria referida y obteniendo las siguientes calificaciones."
          } else {
            this.tituloArea = "ÁREAS DE FORMACIÓN"
            this.aquien = "Que " + this.nombreEstudiante + " identificado(a) con " + this.documentoEstudiante + ", cursó en ésta Institución Educativa los estudios correspondientes al grado " + this.grupo + " durante el año " + this.vigencia + ", con la intensidad horaria referida y obteniendo las siguientes calificaciones."
          }
        } else if (this.$store.state.daneInstitucion == '115001002602'){
          this.encabezado = "La suscrita Rectora y Secretaria Académica de la Institución Educativa ANTONIO JOSÉ SANDOVAL GÓMEZ de Tunja, aprobada por resolución No. 01090 del 14/11/2018, que en su parte resolutiva dice: 'Autorizar a la institución Educativa INSTITUCIÓN EDUCATIVA ANTONIO JOSÉ SANDOVAL GÓMEZ de Tunja, de Educación Formal, Básica, Secundaria y Media Vocacional en Jornada Mañana y Tarde, para que otorgue certificados de Educación Básica, títulos de Bachillerato Académico, Bachiller Técnico'."
          this.certifican = "CERTIFICAN"
          this.tituloArea = "ÁREAS DE FORMACIÓN"
          this.aquien = "Que el(la) estudiante " + this.nombreEstudiante + " identificado(a) con " + this.documentoEstudiante + ", cursó en ésta Institución Educativa los estudios correspondientes al grado " + this.grupo + " durante el año " + this.vigencia + ", con la intensidad horaria referida y obteniendo los siguientes desempeños:"
        } else if (this.$store.state.daneInstitucion == '115001002751'){
          this.encabezado = "EL SUSCRITO RECTOR Y SECRETARIA DE LA INSTITUCIÓN EDUCATIVA JULIUS SIEBER DE TUNJA, APROBADA POR RESOLUCIÓN No. 01075 DEL 24 DE NOVIEMBRE DE 2017 DE LA SECRETARÍA DE EDUCACIÓN DE TUNJA Y NÚMERO DANE: 115001002751."
          this.certifican = "CERTIFICAN"
          this.tituloArea = "ÁREAS DE FORMACIÓN"
          this.aquien = "Que el(la) estudiante " + this.nombreEstudiante + " identificado(a) con " + this.documentoEstudiante + ", cursó en ésta Institución Educativa los estudios correspondientes al grado " + this.grupo + " durante el año " + this.vigencia + ", con la intensidad horaria referida y obteniendo los siguientes desempeños:"
        } else if (this.$store.state.daneInstitucion == '115001000367'){
          this.encabezado = "El Rector y Auxiliar Administrativo de la Institución Educativa de Educación Media Diversificada 'INEM' Carlos Arturo Torres, creado por Decreto 1962 del 20 de noviembre de 1969 y Reglamentado por Decreto 1085 del 8 de junio de 1981, el Decreto 1860 del 3 de Agosto de 1994 que reglamenta la ley 115 de 1994, Decreto 1290 del 16 de abril de 2009, Acuerdo Institucional 05 del 01 de octubre de 2024, aprobado por la Resolución 0991 del 27 de noviembre de 2024 de la Secretaria de Educación de Tunja, que en su parte resolutiva dice 'Autorizar al Instituto para que otorgue certificados de estudios correspondientes a la Educación preescolar, Básica Primaria y Secundaria, Media Académica y Técnica' y número DANE: 115001000367."
          this.certifican = "CERTIFICAN"
          this.tituloArea = "ÁREAS DE FORMACIÓN"
          this.aquien = "Que el(la) estudiante " + this.nombreEstudiante + " identificado(a) con " + this.documentoEstudiante + ", cursó en ésta Institución Educativa los estudios correspondientes al grado " + this.grupo + " durante el año " + this.vigencia + ", con la intensidad horaria referida y obteniendo los siguientes desempeños:"
        } else {
          this.encabezado = "Los suscritos...."
          this.certifican = "CERTIFICAN"
          this.tituloArea = "ÁREAS DE FORMACIÓN"
          this.aquien = "Que el(la) estudiante " + this.nombreEstudiante + " identificado(a) con " + this.documentoEstudiante + ", cursó en ésta Institución Educativa los estudios correspondientes al grado " + this.grupo + " durante el año " + this.vigencia + ", con la intensidad horaria referida y obteniendo los siguientes desempeños:"
        }
        this.numCert = this.numCertificado
        this.mostrarCertificado = true
        //this.cancelarFormulario()
      },
      async datosCertificado(est) {
        this.idMatricula = est.idMatricula
        this.nombreEst = this.nombreEstudiante
        this.documentoEst = this.documentoEstudiante
        this.sede = est.sede
        this.grupo = est.curso
        this.vigencia = est.vigencia
        this.estadofinal = est.estadoFinal
        this.idEstadoFinal = est.idEstadoFinal
        this.dataConsultada = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/certificaciones/matricula', {params: {idMatricula: this.idMatricula}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Certificaciones')
            this.btnCargando = false
          } else{
            if (response.data.datos != 0) {
              this.dataConsultada = response.data.datos
              //console.log(JSON.stringify(this.dataConsultada))
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Certificaciones. Intente más tarde.' + err)
          this.btnCargando = false
        })
        this.$refs['modalGenerarCertificado'].show()
      },
      async buscarMatriculasEstudiante() {
        this.listaHistorico = []
        this.listaHistoricoActual = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/buscarestudiante/historico/ie', { params: { idEstudiante: this.idEstudiante, idInstitucion: this.$store.state.idInstitucion }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Buscar historico estudiante')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                if (element.idEstadoFinal === null) {
                  this.listaHistoricoActual.push(element)
                } else {
                  this.listaHistorico.push(element)
                }
              });
            } else {
              this.mensajeEmergente('info',CONFIG.TITULO_MSG,'No se encontraron registros en el histórico del estudiante.')
            }
          }
        })
        .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Buscar historico estudiante. Intente más tarde. ' + err)
        })
        return true
      },
      cancelarFormulario() {
        this.$refs['modalGenerarCertificado'].hide()
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.escudoUrl = "https://siedutunja.gov.co/api/colegios/escudos/" + this.$store.state.escudoInstitucion
      this.datosSeccion = this.$store.state.datosSecciones[0]
      this.umbrales = [this.datosSeccion.minBas,this.datosSeccion.minAlt,this.datosSeccion.minSup,this.datosSeccion.maxSup]
      this.buscarMatriculasEstudiante()
    }
  }
</script>