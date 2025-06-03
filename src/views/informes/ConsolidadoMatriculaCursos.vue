<template>
  <div>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <template #header>
            <b-button class="mx-2 float-right" size="sm" variant="info" @click="cargarDatosMatricula()" title="Actualizar"><b-icon icon="arrow-repeat"></b-icon></b-button>
            <h5 class="mb-0"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> CONSOLIDADO MATRICULA POR SEDE - GRADO - CURSO - {{ $store.state.aLectivo }}</h5>
          </template>
          <b-card-text>
            <div v-if="btnCargando">
              <div class="text-center m-5 text-primary">
                <b-spinner style="width: 3rem; height: 3rem;" label="Spinner"></b-spinner>
                <br><strong>Cargando planilla...</strong>
              </div>
            </div>
            <div v-else>
              <b-row id="contenedor">
                <b-col lg="12">
                  <div v-for="(sede, idSede) in agrupado" :key="idSede">
                    <h2>{{ sede.sede }}</h2>
                    <div v-for="(grado, idGrado) in sede.grados" :key="idGrado">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <th colspan="4">Grado: {{ grado.grado }}</th>
                          </tr>
                          <tr>
                            <th>Curso</th>
                            <th>Total Activos</th>
                            <th>Total Retiros</th>
                            <th>Total Curso</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="curso in grado.cursos" :key="curso.idCurso">
                            <td>{{ curso.nomenclatura }}</td>
                            <td>{{ curso.totalActivos }}</td>
                            <td>{{ curso.totalRetiros }}</td>
                            <td>{{ curso.totalActivos + curso.totalRetiros }}</td>
                          </tr>
                          <tr>
                            <th>Subtotales del Grado {{ grado.grado }}:</th>
                            <th>{{ grado.totalActivos }}</th>
                            <th>{{ grado.totalRetiros }}</th>
                            <th>{{ grado.totalActivos + grado.totalRetiros }}</th>
                          </tr>
                        </tbody>
                      </table>
                      <table class="table table-bordered">
                      </table>
                    </div>
                    <b-row ><b-col lg="12"><hr></b-col></b-row>
                    <h3>{{ sede.sede }}: Activos {{ sede.totalActivos }}, Retiros {{ sede.totalRetiros }}, Total Sede {{ sede.totalActivos + sede.totalRetiros }}</h3>
                    <b-row ><b-col lg="12"><hr></b-col></b-row>
                  </div>
                  <h2>Total General: {{ totalGeneral.totalActivos + totalGeneral.totalRetiros }}</h2>
                  <h4>Activos {{ totalGeneral.totalActivos }}<br>Retiros {{ totalGeneral.totalRetiros }}</h4>
                </b-col>
              </b-row>
              <b-row ><b-col lg="12"><hr></b-col></b-row>
              <b-row >
                <b-col lg="12">
                  <b-button class="small mx-1 mt-2" variant="primary" @click="imprimirConsolidadoCursos">Imprimir Consolidado</b-button>
                  <b-button class="small mx-1 mt-2" variant="primary" @click="exportarConsolidadoCursosExcel">Exportar Consolidado a Excel</b-button>
                </b-col>
              </b-row>
            </div>
          </b-card-text>
          <template #footer>
            <em>Consolidado de la matricula por Sede, Grados y Cursos.</em>
          </template>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import * as XLSX from "xlsx"

  export default {
    name: 'consolidadomatriculacursos',
    data() {
      return {
        datos: [],
        btnCargando: false
      }
    },
    computed: {
      agrupado() {
        let sedes = {}
        let totalGeneral = { totalActivos: 0, totalRetiros: 0 }

        this.datos.forEach(item => {
          if (!sedes[item.idSede]) {
            sedes[item.idSede] = { sede: item.sede, grados: {}, totalActivos: 0, totalRetiros: 0 }
          }
          if (!sedes[item.idSede].grados[item.idGrado]) {
            sedes[item.idSede].grados[item.idGrado] = { grado: item.grado, cursos: [], totalActivos: 0, totalRetiros: 0 }
          }
          sedes[item.idSede].grados[item.idGrado].cursos.push(item)
          // Calcular subtotales por grado
          sedes[item.idSede].grados[item.idGrado].totalActivos += item.totalActivos
          sedes[item.idSede].grados[item.idGrado].totalRetiros += item.totalRetiros
          // Calcular subtotales por sede
          sedes[item.idSede].totalActivos += item.totalActivos
          sedes[item.idSede].totalRetiros += item.totalRetiros
          // Calcular total general
          totalGeneral.totalActivos += item.totalActivos
          totalGeneral.totalRetiros += item.totalRetiros
        })
        this.totalGeneral = totalGeneral
        return sedes
      }
    },
    methods: {
      async cargarDatosMatricula() {
        this.btnCargando = true
        this.datos = []
        await axios
        .get(CONFIG.ROOT_PATH + 'academico/informes/consolidadomatriculacursos', {params: {idInstitucion: this.$store.state.idInstitucion, vigencia: this.$store.state.aLectivo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta datos matricula')
            this.btnCargando = false
          } else {
            if(response.data.datos != 0) {
              this.datos = response.data.datos
              //console.log(JSON.stringify(this.datos))
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta datos matricula. Intente más tarde. ' + err)
          this.btnCargando = false
        })
        this.btnCargando = false
      },
      imprimirConsolidadoCursos() {
        const printWindow = window.open("", "");
        const content = document.getElementById("contenedor").innerHTML;
        printWindow.document.write(`
          <html>
            <head>
              <title>Consolidado Matricula por Cursos</title>
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
                  <div>CONSOLIDADO DE MATRICULA AÑO LECTIVO ${this.$store.state.aLectivo}</div>
              </div>
              ${content}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      },
      exportarConsolidadoCursosExcel() {
        let datosExcel = [];

        Object.values(this.agrupado).forEach(sede => {
          datosExcel.push(["Sede:", sede.sede]);
          
          Object.values(sede.grados).forEach(grado => {
            datosExcel.push(["Grado:", grado.grado]);
              datosExcel.push([
                'Curso',
                'Total_Activos',
                'Total_Retiros',
                'Total Curso'
              ]);
            grado.cursos.forEach(curso => {
              datosExcel.push([
                curso.nomenclatura,
                curso.totalActivos,
                curso.totalRetiros,
                curso.totalActivos + curso.totalRetiros
              ]);
            });

            datosExcel.push(["Subtotal Grado", grado.totalActivos, grado.totalRetiros, grado.totalActivos + grado.totalRetiros]);
          });

          datosExcel.push(["Subtotal Sede", sede.totalActivos, sede.totalRetiros, sede.totalActivos + sede.totalRetiros]);
        });

        datosExcel.push(["Total General", this.totalGeneral.totalActivos, this.totalGeneral.totalRetiros, this.totalGeneral.totalActivos + this.totalGeneral.totalRetiros]);

        const ws = XLSX.utils.aoa_to_sheet(datosExcel);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Consolidado");

        XLSX.writeFile(wb, "ConsolidadoMatriculaCursos.xlsx");
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.cargarDatosMatricula()
    }
  }
</script>