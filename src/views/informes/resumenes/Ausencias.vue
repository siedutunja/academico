<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> RESÚMEN AUSENCIAS</h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="9">
                <b-form-group label="Seleccione la Sede:" label-for="sedes" class="etiqueta">
                  <b-form-select  id="sedes" ref="sedes" v-model="idSede" :options="comboSedes" @change="idPeriodo=null,ocuparListaCursosSede()"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group label="Periodo:" label-for="periodo" class="etiqueta">
                  <b-form-select id="periodo" ref="periodo" v-model="idPeriodo" :options="comboPeriodos" :disabled="idSede!=null ? false : true"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row v-if="idPeriodo!=null">
              <b-col>
                <vue-good-table ref="cursitos" :columns="encabColumnas" :rows="listaCursos" styleClass="vgt-table condensed bordered striped" :line-numbers="true" :search-options="{enabled: true,placeholder: 'Filtrar cursos...'}"
                  :select-options="{enabled: true,selectionText: 'cursos seleccionados',clearSelectionText: 'Limpiar',}">
                  <template #selected-row-actions>
                    <button class="small btn btn-primary" @click="generarListas()">Imprimir Cursos</button>
                  </template>
                  <div slot="emptystate">
                    <h5 class="text-danger ml-5">No existen Cursos en la Sede</h5>
                  </div>
                </vue-good-table>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <div class="informe" id="informe" style="display:none;" v-if="idPeriodo!=null">
      <div v-for="item in listasEstudiantes" :key="item.id">
        <div style="text-align: center">
            <div>REPUBLICA DE COLOMBIA</div>
            <div>SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA</div>
            <div><strong>{{$store.state.nombreInstitucion}}</strong></div>
            <div>TUNJA - BOYACÁ</div>
            <div>RESÚMEN DE AUSENCIAS AÑO LECTIVO {{$store.state.aLectivo}}</div>
        </div>
        <table class="table">
          <thead>
            <tr><th>Curso</th><th>{{item.idCurso}}</th></tr>
          </thead>
          <tbody>
            <tr v-for="item2 in item.estudiantes" :key="item2.id">
              <td>{{item2.estudiante}}</td>
            </tr>
          </tbody>
        </table>
        <div class="saltopagina"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'

  export default {
    name: 'ausencias',
    components: {
      VueGoodTable,
    },
    data () {
      return {
        idSede: null,
        comboSedes: [],
        idPeriodo: null,
        comboPeriodos: null,
        listaCursos: [],
        encabColumnas : [
          { label: 'Curso', field: 'nomenclatura' },
          { label: 'Jornada', field: 'jornada', sortable: false },
          //{ label: '', field: 'id', sortable: false }
        ],
        listasEstudiantes: [],
        listasAusencias: [],
  }
    },
    methods: {
      async generarListas() {
        let cursos = []
        this.$refs.cursitos.selectedRows.forEach(element => {
          cursos.push({idCurso: element.id, idPeriodo: this.idPeriodo})
        })
        await axios
        .post(CONFIG.ROOT_PATH + 'academico/listaestudiantes/cursos', JSON.stringify(cursos), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Cursos Ausencias')
            //this.btnCargando = false
          } else{
            if (response.data.datos != 0) {
              this.listasEstudiantes = response.data.datos
              //this.validarImprimir()
              //console.log(JSON.stringify(response.data.datos))
            } else {
              //this.btnCargando = false
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Cursos Ausencias-. Intente más tarde.' + err)
          this.btnCargando = false
        })
        await axios
        .post(CONFIG.ROOT_PATH + 'academico/resumen/ausenciasperiodo', JSON.stringify(cursos), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Cursos Ausencias-')
            //this.btnCargando = false
          } else{
            if (response.data.datos != 0) {
              console.log(JSON.stringify(response.data.datos))
              this.listasAusencias = response.data.datos
              this.validarImprimir()
            } else {
              //this.btnCargando = false
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Cursos Ausencias. Intente más tarde.' + err)
          this.btnCargando = false
        })
      },
      validarImprimir() {
        let titulo = 'Imprimir'
        let pregunta = '¿Esta seguro de imprimir el informe?'
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
          cancelVariant: '',
          cancelTitle: 'Cancelar',
          footerClass: 'p-2',
          bodyClass: 'p-5',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.imprimirListas()
          }
        })
      },
      imprimirListas() {
        document.getElementById("informe").style.display = "block";
        const printWindow = window.open("Resúmen Ausencias", "");
        const content = document.getElementById("informe").innerHTML;
        printWindow.document.write(`
          <html>
            <head>
              <title>Resúmen Ausencias</title>
              <style>
                @media all {
                  div.saltopagina{
                    display: none;
                  }
                }
                @media print{
                  div.saltopagina{
                    display:block; 
                    page-break-before:always;
                  }
                }	
                body { font-family: Arial, sans-serif; font-size: 12px }
                h2, h3 { margin-bottom: 5px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 3px; }
                th, td { border: 1px solid #000; padding: 1px; text-align: left; font-size: 10px  }
                th { background: #f0f0f0; }
                strong { display: block; margin-top: 0px; }
              </style>
            </head>
            <body>
              ${content}
            </body>
          </html>
        `);
        document.getElementById("informe").style.display = "none";
        //printWindow.document.close();
        //printWindow.print();
      },
      async ocuparListaCursosSede() {
        this.listaCursos = []
        this.$store.state.datosCursos.forEach(element => {
          if (element.id_sede == this.idSede) {
            this.listaCursos.push(element)
          }
        })
      },
      async ocuparComboSedes() {
        this.comboSedes = []
        this.$store.state.datosSedes.forEach(element => {
          this.comboSedes.push({ 'value': element.id, 'text': element.sede.toUpperCase() })
        })
      },
      async ocuparComboPeriodos() {
        this.comboPeriodos = []
        this.$store.state.datosTablas.periodos.forEach(element => {
          this.comboPeriodos.push({ 'value': element.id, 'text': element.periodo.toUpperCase() })
        })
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.ocuparComboSedes()
      this.ocuparComboPeriodos()
    }
  }
</script>