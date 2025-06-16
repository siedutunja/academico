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
                        <h5 class="mb-0"><b-icon icon="person" aria-hidden="true"></b-icon> Datos del Estudiante</h5>
                      </template>
                      <b-card-text>
                        <b-row class="text-center">
                          <b-col lg="12">
                            <img :src="datosFichaE.foto" id="photoA" alt="photo" width="30%">
                          </b-col>
                          <b-col lg="12" class="mt-3">
                            <div v-if="datosFichaE.estado=='RETIRADO'">
                              <h4 class="text-danger">{{ datosFichaE.estudiante }}</h4>
                              <h5 class="text-danger">{{ datosFichaE.estado }}</h5>
                            </div>
                            <div v-else>
                              <h4 class="text-success">{{ datosFichaE.estudiante }}</h4>
                              <h5 class="text-success">{{ datosFichaE.estado }}</h5>
                            </div>
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
                          <!--
                          <b-card border-variant="light" class="text-center linkini" @click="irPazySalvo">
                            <b-card-text>
                              <span><b-icon icon="filter-square" font-scale="3"></b-icon></span>
                              <h5 class="mt-2">Paz y Salvo</h5>
                            </b-card-text>
                            <b-card-text>Paz y Salvo del Estudiante</b-card-text>
                          </b-card>
                          -->
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
    <b-modal ref="modalSeleccionarDestinoConstancia" size="" scrollable hide-footer title="Seleccionar Destino Constancia" ok-only>
      <div class="mx-3">
        <b-row>
          <b-col lg="12">
            <b-form-group label="Destino de la Constancia:" label-for="destinito" class="etiqueta">
              <b-form-input id="destinito" ref="destinito" v-model.trim="destinoConstancia" aria-describedby="feedDest" maxlength="100"></b-form-input>
              <b-form-text id="destinito">Ingrese el destino para ser visualizado en el documento, de lo contrario deje el campo vacio.</b-form-text>
            </b-form-group>

            <!--
            <b-form-group label="Destinos*" label-for="destinoC" class="etiqueta">
              <b-form-select  id="destinoC" ref="destinoC" v-model="idDestinoC" :options="comboDestinos" aria-describedby="feedDestinoC"></b-form-select>
            </b-form-group>
            -->
          </b-col>
          <b-col lg="12">
            <b-form-group label="Consecutivo:" label-for="consecutivo" class="etiqueta">
              <b-form-input id="consecutivo" ref="consecutivo" v-model.trim="consecutivoConstancia" autocomplete="off" maxlength="10"></b-form-input>
              <b-form-text id="consecutivo">Ingrese el consecutivo para ser visualizado en el documento, de lo contrario deje el campo vacio.</b-form-text>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="12"><hr></b-col>
          <b-col lg="12">
            <b-button class="small ml-3" variant="primary" @click="generarConstancia">Generar Constancia</b-button>
            <b-button class="small ml-3" variant="secondary" @click="cancelarFormularioConstancia">Cancelar</b-button>
          </b-col>
        </b-row>
      </div>
    </b-modal>
    <!--
    <b-modal ref="modalSeleccionarPazySalvo" size="" scrollable hide-footer title="Seleccionar Firmas" ok-only>
      <div class="mx-3">
        <b-row>
          <b-col lg="12">
            <b-form-group>
              <h5>Firmas:</h5>
              <b-form-checkbox class="ml-4 m-2" v-for="firma in firmas" v-model="firmasSeleccionadas" :key="firma.value" :value="firma.value">
                {{ firma.text }}
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="12"><hr></b-col>
          <b-col lg="12">
            <b-button class="small ml-3" variant="primary" @click="generarPazySalvo">Generar Paz y Salvo</b-button>
            <b-button class="small ml-3" variant="secondary" @click="cancelarFormularioPazySalvo">Cancelar</b-button>
          </b-col>
        </b-row>
      </div>
    </b-modal>
    <b-row id="contenedor">
      <b-col lg="12">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Estudiante</th><th>{{ datosFichaE.estudiante }}</th>
              <th>Documento</th><th>{{ datosFichaE.documento }}</th>
              <th>Jornada</th><th>{{ datosFichaE.jornada }}</th>
            </tr>
            <tr>
              <th>Sede</th><th>{{ datosFichaE.sede }}</th>
              <th>Curso</th><th>{{ datosFichaE.grado }}</th>
              <th>Año</th><th>{{ $store.state.aLectivo }}</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </b-col>
    </b-row>
    -->
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
        idDestinoC: 1,
        destinoConstancia: null,
        consecutivoConstancia: null,
        comboDestinos: [],
        firmasSeleccionadas: [],
        firmas: [
          { value: 1, text: 'Rectoría' },
          { value: 2, text: 'Coordinación'},
          { value: 3, text: 'Secretaría' },
          { value: 4, text: 'Almacén'},
          { value: 5, text: 'Pagaduría'},
          { value: 6, text: 'Biblioteca'},
          { value: 7, text: 'Director de Curso'},
          { value: 8, text: 'Coordinador de Sede'},
          { value: 9, text: 'Director de Modalidad'},
        ],
      }
    },
    methods: {
      irPazySalvo() {
        this.$refs['modalSeleccionarPazySalvo'].show()
      },
      irConstancia() {
        this.$refs['modalSeleccionarDestinoConstancia'].show()
      },
      generarPazySalvo() {
        const printWindow = window.open("", "");
        const content = document.getElementById("contenedor").innerHTML;
        printWindow.document.write(`
          <html>
            <head>
              <title>Paz y Salvo</title>
              <style>
                body { font-family: Arial, sans-serif; font-size: 12px }
                h2, h3 { margin-bottom: 5px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 3px; }
                th, td { border: 1px solid #000; padding: 8px; text-align: left; font-size: 12px  }
                th { background: #f0f0f0; }
                strong { display: block; margin-top: 0px; }
              </style>
            </head>
            <body>
              <div style="text-align: center">
                  <div>REPUBLICA DE COLOMBIA</div>
                  <div>SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA</div>
                  <div><strong>${this.$store.state.nombreInstitucion}</strong></div>
                  <div>TUNJA - BOYACÁ</div>
                  <div>PAZ Y SALVO ESTUDIANTIL</div>
              </div>
              ${content}
            </body>
          </html>
        `);
        printWindow.document.close();
        //printWindow.print();
        this.cancelarFormularioPazySalvo()
      },
     generarConstancia() {
        let campos = []
        if (this.destinoConstancia != null || this.destinoConstancia != '') {
          this.destinoConstancia = this.destinoConstancia.toUpperCase()
        }
        //let destino = document.getElementById('destinoC')[document.getElementById('destinoC').selectedIndex].text
        campos.push({ 
          'token': this.$store.state.idInstitucion,
          //'destino': destino,
          'destino': this.destinoConstancia,
          'consecutivo': this.consecutivoConstancia,
          'esc' : this.$store.state.escudoInstitucion,
          'ieo': this.$store.state.nombreInstitucion, 
          'nit': this.$store.state.nitInstitucion, 
          'dane': this.$store.state.daneInstitucion, 
          'vig': this.$store.state.aLectivo, 
          'est': this.datosFichaE.estudiante, 
          'tip': this.datosFichaE.tipodocumento,
          'doc': this.datosFichaE.documento,
          'exp': this.datosFichaE.municipioDoc != null ? this.datosFichaE.municipioDoc.toUpperCase() : '-',
          'gra': this.datosFichaE.grado,
          'sed': this.datosFichaE.sede,
          'jor': this.datosFichaE.jornada,
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
      async ocuparComboDestinos() {
        this.comboDestinos = []
        this.$store.state.datosTablas.destinos.forEach(element => {
          this.comboDestinos.push({ 'value': element.id, 'text': element.destino.toUpperCase() })
        })
      },
      cancelarFormularioConstancia() {
        this.$refs['modalSeleccionarDestinoConstancia'].hide()
      },
      cancelarFormularioPazySalvo() {
        this.$refs['modalSeleccionarPazySalvo'].hide()
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.idMatricula = this.$store.state.idMatricula
      this.consultaFichaMatricula()
      this.ocuparComboDestinos()
    }
  }
</script>