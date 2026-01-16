<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <b-button class="mx-2 float-right" size="sm" variant="info" @click="cargarDatosSedes" title="Actualizar"><b-icon icon="arrow-repeat"></b-icon></b-button>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> CONSOLIDADO MATRICULA - {{ $store.state.aLectivo }}</h5>
          </template>
          <b-card-text>
            <div v-if="btnCargando">
              <div class="text-center m-5 text-primary">
                <b-spinner style="width: 3rem; height: 3rem;" label="Spinner"></b-spinner>
                <br><strong>Cargando planilla...</strong>
              </div>
            </div>
            <div v-else>
              <b-row>
                <!--
                <b-col lg="2">
                  <b-alert class="text-center" variant="success" show>
                    <p>Total Activos</p>
                    <h2>{{ totalIEActivos }}</h2>
                  </b-alert>
                </b-col>
                <b-col lg="2">
                  <b-alert class="text-center" variant="danger" show>
                    <p>Total Retirados</p>
                    <h2>{{ totalIERetiros }}</h2>
                  </b-alert>
                </b-col>
                -->
                <b-col lg="12">
                  <b-alert class="text-center" variant="success" show>
                    <p>Total Matriculados</p>
                    <h2>{{ totalIE }}</h2>
                  </b-alert>
                </b-col>
                <!--
                <b-col lg="2">
                  <b-alert class="text-center" variant="primary" show>
                    <p>Total Nuevos</p>
                    <h2>{{ totalIENuevos }}</h2>
                  </b-alert>
                </b-col>
                <b-col lg="2">
                  <b-alert class="text-center" variant="info" show>
                    <p>Total Repitentes</p>
                    <h2>{{ totalIERepitentes }}</h2>
                  </b-alert>
                </b-col>
                -->
              </b-row>
              <b-row>
                <b-col lg="12">
                  <b-card header-bg-variant="secondary">
                    <template #header>
                      <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> Matriculados por Sede</h5>
                    </template>
                    <b-card-text>
                      <vue-good-table :columns="encabColumnas" :rows="listaSedes" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                        <template slot="table-row" slot-scope="props">
                          <span v-if="props.column.field == 'id'">
                            <span style="font-weight: bold; color: blue; cursor: pointer" @click="seleccionarSede(props.row)" title="Datos de la Sede"><CIcon name="cilZoom"/></span>
                          </span>
                        </template>
                        <div slot="emptystate">
                          <h5 class="text-danger ml-5">No existen sedes creadas</h5>
                        </div>
                      </vue-good-table>
                    </b-card-text>
                  </b-card>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-button class="small mx-1 mt-2" variant="primary" @click="imprimirFormulario">Imprimir Consolidado</b-button>
                  <vue-excel-xlsx class="mx-1 mt-2 small btn btn-outline-primary" variant="primary" :data="listaExportar" :columns="encabColumnasExcel" :file-name="'ConsolidadoMatricula-' + this.$store.state.aLectivo" :file-type="'xlsx'" :sheet-name="'Matriculados-' + this.$store.state.aLectivo">
                    Exportar Consolidado a Excel
                  </vue-excel-xlsx>
                  <vue-excel-xlsx class="mx-1 mt-2 small btn btn-outline-primary" variant="primary" :data="listaMatriculadosDetallado" :columns="encabColumnasDetalladoExcel" :file-name="'DetalladoMatricula-' + $store.state.aLectivo + '-' + new Date().toLocaleDateString()" :file-type="'xlsx'" :sheet-name="'Matricula-' + $store.state.aLectivo">
                    Exportar Matricula Detallada a Excel
                  </vue-excel-xlsx>
                </b-col>
              </b-row>
            </div>
          </b-card-text>
          <template #footer>
            <em>Consulte la matricula por Grados de una Sede haciendo clic en la lupa.</em>
          </template>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalConsolidadoMatriculaSede" size="xl" scrollable hide-footer title="Consolidado de Matricula por Sede" ok-only>
      <div class="mx-3">
        <div>
          <ConsolidadoMatriculaSede :datosMatriculaSede="datosMatriculaSede" @retorno="datosRecibidos"/>
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
  import ConsolidadoMatriculaSede from '@/views/informes/ConsolidadoMatriculaSede'

  export default {
    name: 'consolidadomatricula',
    components: {
      ConsolidadoMatriculaSede,
      VueGoodTable
    },
    data () {
      return {
        listaSedes: [],
        totalIE: 0,
        totalIEActivos: 0,
        totalIERetiros: 0,
        encabColumnas : [
          { label: 'Nombre de la Sede', field: 'sede', sortable: false },
          { label: 'Matriculados', field: 'totalSedeActivos', sortable: false },
          { label: 'Retirados', field: 'totalSedeRetiros', sortable: false },
          //{ label: 'Sin Curso', field: 'totalSedeSinCurso', sortable: false },
          { label: 'Total', field: 'totalSede', sortable: false },
          //{ label: 'Nuevos', field: 'totalSedeNuevos', sortable: false },
          //{ label: 'Repitentes', field: 'totalSedeRepitentes', sortable: false },
          { label: '', field: 'id', sortable: false }
        ],
        encabColumnasExcel : [
          { label: 'Estudiante', field: 'estudiante' },
          { label: 'Documento', field: 'documento' },
          { label: 'Tipo', field: 'nomenclatura' },
          { label: 'Expedido', field: 'mundoce' },
          { label: 'Genero', field: 'id_genero' },
          { label: 'FechaNace', field: 'fechanace' },
          { label: 'Edad', field: 'edad' },
          { label: 'MunicNace', field: 'munnace' },
          { label: 'Pais', field: 'pais' },
          { label: 'Rh', field: 'rh' },
          { label: 'Estrato', field: 'id_estrato' },
          { label: 'Discapacidad', field: 'discapacidad' },
          { label: 'Capacidades', field: 'capacidad' },
          { label: 'Trastorno', field: 'trastorno' },
          { label: 'Apoyo', field: 'apoyo' },
          { label: 'Etnia', field: 'etnia' },
          { label: 'Victima', field: 'victima' },
          { label: 'MunExpulsor', field: 'munex' },
          { label: 'Eps', field: 'eps' },
          { label: 'Seguro', field: 'id_seguro' },
          { label: 'Aseguradora', field: 'aseguradora' },
          { label: 'Tratamiento', field: 'enfermedades' },
          { label: 'Dirección', field: 'direccion' },
          { label: 'MunicDirección', field: 'mundire' },
          { label: 'Barrio', field: 'barrio' },
          { label: 'Zona', field: 'zona' },
          { label: 'Teléfono1', field: 'telefono1' },
          { label: 'Teléfono2', field: 'telefono2' },
          { label: 'Correo', field: 'correo' },
          { label: 'Código', field: 'codigo' },
          { label: 'Papá', field: 'papa' },
          { label: 'DocPapá', field: 'docpapa' },
          { label: 'TipoDocPapá', field: 'tipodocpa' },
          { label: 'ExpedidoPapá', field: 'mundocpa' },
          { label: 'GeneroPapá', field: 'generopa' },
          { label: 'FechaNacePapá', field: 'fechanacepa' },
          { label: 'MunicNacePapá', field: 'munnacepa' },
          { label: 'PaísPapá', field: 'paispa' },
          { label: 'RhPapá', field: 'rhpa' },
          { label: 'EstratoPapá', field: 'estratopa' },
          { label: 'DirecciónPapá', field: 'dirpa' },
          { label: 'MunicDirecciónPapá', field: 'mundirpa' },
          { label: 'BarrioPapá', field: 'barriopa' },
          { label: 'MunicDirecciónPapá', field: 'mundirpa' },
          { label: 'TelPapá1', field: 'tel1pa' },
          { label: 'TelPapá2', field: 'tel2pa' },
          { label: 'CorreoPapá', field: 'correopa' },
          { label: 'Mamá', field: 'mama' },
          { label: 'DocMamá', field: 'docmama' },
          { label: 'TipoDocMamá', field: 'tipodocma' },
          { label: 'ExpedidoMamá', field: 'mundocma' },
          { label: 'GeneroMamá', field: 'generoma' },
          { label: 'FechaNaceMamá', field: 'fechanacema' },
          { label: 'MunicNaceMamá', field: 'munnacema' },
          { label: 'PaísMamá', field: 'paisma' },
          { label: 'RhMamá', field: 'rhma' },
          { label: 'EstratoMamá', field: 'estratoma' },
          { label: 'DirecciónMamá', field: 'dirma' },
          { label: 'MunicDirecciónMamá', field: 'mundirma' },
          { label: 'BarrioMamá', field: 'barrioma' },
          { label: 'MunicDirecciónMamá', field: 'mundirma' },
          { label: 'TelMamá1', field: 'tel1ma' },
          { label: 'TelMamá2', field: 'tel2ma' },
          { label: 'CorreoMamá', field: 'correoma' },
          { label: 'Acudiente', field: 'acudiente' },
          { label: 'DocAcudiente', field: 'docac' },
          { label: 'TipoDocAcudiente', field: 'tipodocac' },
          { label: 'ExpedidoAcudiente', field: 'mundocac' },
          { label: 'GeneroAcudiente', field: 'generoac' },
          { label: 'FechaNaceAcudiente', field: 'fechanaceac' },
          { label: 'MunicNaceAcudiente', field: 'munnaceac' },
          { label: 'PaísAcudiente', field: 'paisac' },
          { label: 'RhAcudiente', field: 'rhac' },
          { label: 'EstratoAcudiente', field: 'estratoac' },
          { label: 'DirecciónAcudiente', field: 'dirac' },
          { label: 'MunicDirecciónAcudiente', field: 'mundirac' },
          { label: 'BarrioAcudiente', field: 'barrioac' },
          { label: 'MunicDirecciónAcudiente', field: 'mundirac' },
          { label: 'TelAcudiente1', field: 'tel1ac' },
          { label: 'TelAcudiente2', field: 'tel2ac' },
          { label: 'CorreoAcudiente', field: 'correoac' },
          { label: 'Parentesco', field: 'parentesco' },
          { label: 'Sede', field: 'sede' },
          { label: 'Grado', field: 'grado' },
          { label: 'Curso', field: 'curso' },
          { label: 'Jornada', field: 'jornada' },
          { label: 'Estado', field: 'estado' },
          { label: 'Nuevo', field: 'id_nuevo' },
          { label: 'Repitente', field: 'id_repitente' },
          { label: 'Fecha Renovación', field: 'creado' },
          { label: 'Prematricula', field: 'prematricula' },
        ],
        encabColumnasDetalladoExcel : [
          { label: 'ANO', field: 'ano' },
          { label: 'ETC', field: 'etc' },
          { label: 'ESTADO', field: 'estado' },
          { label: 'JERARQUIA', field: 'jerarquia' },
          { label: 'INSTITUCION', field: 'institucion' },
          { label: 'DANE', field: 'dane' },
          { label: 'CALENDARIO', field: 'calendario' },
          { label: 'SECTOR', field: 'sector' },
          { label: 'SEDE', field: 'sede' },
          { label: 'CODIGO_DANE_SEDE', field: 'danesede' },
          { label: 'CONSECUTIVO', field: 'consecutivo' },
          { label: 'ZONA_SEDE', field: 'zona' },
          { label: 'JORNADA', field: 'jornada' },
          { label: 'GRADO_COD', field: 'grado' },
          { label: 'GRUPO', field: 'grupo' },
          { label: 'ESTRATO', field: 'estrato' },
          { label: 'SISBEN IV', field: 'sisben' },
          { label: 'DOC', field: 'documento' },
          { label: 'TIPODOC', field: 'tipodoc' },
          { label: 'APELLIDO1', field: 'apellido1' },
          { label: 'APELLIDO2', field: 'apellido2' },
          { label: 'NOMBRE1', field: 'nombre1' },
          { label: 'NOMBRE2', field: 'nombre2' },
          { label: 'GENERO', field: 'genero' },
          { label: 'FECHA_NACIMIENTO', field: 'fechanacimiento' },
          { label: 'EDAD', field: 'edad' },
          { label: 'BARRIO', field: 'barrio' },
          { label: 'EPS', field: 'eps' },
          { label: 'TIPO DE SANGRE', field: 'rh' },
          { label: 'MATRICULACONTRATADA', field: 'contratada' },
          { label: 'FUENTE_RECURSOS', field: 'fuente' },
          { label: 'INTERNADO', field: 'internado' },
          { label: 'APOYO_ACADEMICO_ESPECIAL', field: 'apoyo' },
          { label: 'SRPA', field: 'srpa' },
          { label: 'TIPO DE SANGRE', field: 'rh' },
          { label: 'DISCAPACIDAD', field: 'discapacidad' },
          { label: 'POB_VICT_CONF_RUV', field: 'victima' },
          { label: 'PAIS_ORIGEN', field: 'pais' },
          { label: 'CORREO', field: 'correo' },
        ],
        datosMatriculaSede: [],
        listaExportar: [],
        listaMatriculadosDetallado: [],
        btnCargando: false,
      }
    },
    methods: {
      async exportarExcel() {
        this.listaExportar = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/informes/consolidadomatricula/excel', {params: {idInstitucion: this.$store.state.idInstitucion, vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta datos matricula Excel Sedes Activas++++')
          } else {
            if(response.data.datos != 0) {
              this.listaExportar = response.data.datos
              this.listaExportar.forEach(element => {
                let isValidDate = Date.parse(element.fechanace)
                element.edad = !isNaN(isValidDate) ? this.calcularEdad(element.fechanace.substr(0,10)) : '*'
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta datos matricula Excel Sedes Activas. Intente más tarde. ' + err)
        })
      },
      imprimirFormulario() {
        let uri = "?datos=" + JSON.stringify(this.listaSedes) + "&ie=" + this.$store.state.nombreInstitucion + "&vigencia=" + this.$store.state.aLectivo
        let encoded = encodeURI(uri);
        //window.open("http://localhost/siedutunja/php/informes/consolidado-matricula.php" + encoded,"_blank")
        window.open("https://siedutunja.gov.co/php/informes/consolidado-matricula.php" + encoded,"_blank")
        return true
      },
      seleccionarSede(item) {
        this.datosMatriculaSede = item
        this.$refs['modalConsolidadoMatriculaSede'].show()
      },
      async cargarDatosSedes() {
        this.btnCargando = true
        this.listaSedes = []
        this.totalIE = 0
        this.totalIEActivos = 0
        this.totalIERetiros = 0
        this.totalIENuevos = 0
        this.totalIERepitentes = 0
        this.totalIESinCurso = 0
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/informes/consolidadomatricula', {params: {idInstitucion: this.$store.state.idInstitucion, vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta datos matricula Sedes Activas****')
            this.btnCargando = false
          } else {
            if(response.data.datos != 0) {
              this.listaSedes = response.data.datos
              //console.log(JSON.stringify(this.listaSedes))
              this.listaSedes.forEach(element => {
                element.totalSede = 0
                element.totalSedeActivos = 0
                element.totalSedeRetiros = 0
                element.totalSedeNuevos = 0
                element.totalSedeRepitentes = 0
                element.totalSedeSinCurso = 0
                element.grados.forEach(element2 => {
                  element.totalSede += element2.totalMatGrado
                  element.totalSedeActivos += element2.totalActivosGrado
                  element.totalSedeRetiros += element2.totalRetirosGrado
                  element.totalSedeNuevos += element2.totalNuevosGrado
                  element.totalSedeRepitentes += element2.totalRepitentesGrado
                  element.totalSedeSinCurso += element2.totalSinCursoGrado
                  this.totalIE += element2.totalMatGrado
                  this.totalIEActivos += element2.totalActivosGrado
                  this.totalIERetiros += element2.totalRetirosGrado
                  this.totalIENuevos += element2.totalNuevosGrado
                  this.totalIERepitentes += element2.totalRepitentesGrado
                  this.totalIESinCurso += element2.totalSinCursoGrado
                })
              })
            }
          }
          this.exportarExcel()
          this.consultaMatriculaDetallado()
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta datos matricula Sedes Activas****. Intente más tarde. ' + err)
          this.btnCargando = false
        })
      },
      datosRecibidos() {
        this.$refs['modalConsolidadoMatriculaSede'].hide()
      },
      async consultaMatriculaDetallado() {
        this.btnCargando = true
        let registro = {}
        this.listaMatriculadosDetallado = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/detallado/vigencia/ie', { params: { vigencia: this.$store.state.aLectivo, idInstitucion: this.$store.state.idInstitucion }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Detallado Matricula')
            this.btnCargando = false
          } else{
            if (response.data.datos != 0) {
              //console.log(response.data.datos)
              response.data.datos.forEach(element => {
                registro = {}
                registro.ano = this.$store.state.aLectivo
                registro.etc = 'TUNJA'
                registro.estado = element.estado
                if (element.estado == 'EN CURSO') {
                  registro.estado = 'MATRICULADO'
                }
                registro.jerarquia = 'TUNJA'
                registro.institucion = element.institucion
                registro.dane = element.dane
                registro.calendario = 'A'
                registro.sector = 'OFICIAL'
                registro.sede = element.sede
                registro.danesede = element.codigo_anterior
                registro.consecutivo = element.consecutivo_sede
                registro.zona = element.zona
                registro.jornada = element.jornada
                if (Number(element.id_grado) < 0) {
                  registro.grado = element.id_grado
                  registro.grupo = element.id_grado + '0' + element.curso
                } else {
                  registro.grado = Number(element.id_grado)
                  registro.grupo = Number(element.id_grado + '0' + element.curso)
                }
                if (element.id_estrato != 9) {
                  registro.estrato = 'ESTRATO ' + element.id_estrato
                } else {
                  registro.estrato = 'NO APLICA'
                }
                registro.sisben = element.subgrupo
                registro.documento = element.documento
                registro.tipodoc = element.nomenclatura
                registro.apellido1 = element.apellido1
                registro.apellido2 = element.apellido2
                registro.nombre1 = element.nombre1
                registro.nombre2 = element.nombre2
                registro.genero = element.genero
                if (element.fecha_nacimiento != null && element.fecha_nacimiento != '') {
                  registro.fechanacimiento = element.fecha_nacimiento.substr(8,2) + '/' + element.fecha_nacimiento.substr(5,2) + '/' + element.fecha_nacimiento.substr(0,4)
                } else {
                  registro.fechanacimiento = ''
                }
                let isValidDate = Date.parse(element.fecha_nacimiento)
                registro.edad = !isNaN(isValidDate) ? this.calcularEdad(element.fecha_nacimiento.substr(0,10)) : '*'
                registro.barrio = element.barrio
                if (element.eps == ' SIN ASIGNAR') {
                  registro.eps = ''
                } else {
                  registro.eps = element.eps
                }
                if (element.rh == 'NO REPORTA') {
                  registro.rh = ''
                } else {
                  registro.rh = element.rh
                }
                registro.contratada = 'N'
                registro.fuente = 'SGP'
                registro.internado = 'NINGUNO'
                registro.apoyo = element.apoyo
                registro.srpa = 'NO APLICA'
                registro.discapacidad = element.discapacidad
                if (element.id_victima == 99) {
                  registro.victima = 'NO'
                } else {
                  registro.victima = 'SI'
                }
                registro.pais = element.pais
                registro.correo = element.correo
                this.listaMatriculadosDetallado.push(registro)
              })
              this.btnCargando = false
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Detallado Matricula. Intente más tarde.' + err)
          this.btnCargando = false
        })
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
      this.cargarDatosSedes()
    }
  }
</script>