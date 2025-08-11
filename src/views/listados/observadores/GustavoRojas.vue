<template>
  <div>
    <div style="margin-bottom: 1rem">
      <b-button class="small mx-1 mt-3" variant="primary" @click="imprimir">Imprimir</b-button>
      <!--<b-button class="small mx-1 mt-3" variant="outline-primary" @click="exportarAExcel">Exportar a Excel</b-button>-->
    </div>
    <div><hr></div>
    <div class="informe-estudiantes">
      <div ref="contenido">
        <div v-for="(est, index) in estudiantesSeleccionados" :key="est.idMatricula" class="bloque-est">
          <div class="encabezado">
            <p>SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA<br><b>{{$store.state.nombreInstitucion}}</b><br>TUNJA - BOYACÁ<br>OBSERVADOR DEL ESTUDIANTE AÑO LECTIVO {{$store.state.aLectivo}}<br></p>
          </div>
          <div class="float-left" style="margin-top: -90px; margin-left: 20px;">
              <img :src="escudoUrl" alt="Escudo" class="escudo" width="65px" />
          </div>
          <table class="table" style="margin-top: 15px;">
            <thead>
              <tr>
                <th colspan="7" style="text-align: center">DATOS DEL ESTUDIANTE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Estudiante</th>
                <td colspan="2">{{est.estudiante}}</td>
                <th>Documento</th>
                <td>{{est.tipodoc}} {{est.documento}}</td>
                <th>F. Nace</th>
                <td>{{est.fnace}}</td>
              </tr>
              <tr>
                <th>Dirección</th>
                <td colspan="2">{{est.dirE}} {{est.munDirE}}</td>
                <th>Teléfono</th>
                <td>{{est.telefono1}}</td>
                <th>Edad</th>
                <td>{{est.edad}}</td>
              </tr>
              <tr>
                <th>Sede</th>
                <td colspan="2">{{sede}}</td>
                <th>Grado-Curso</th>
                <td>{{curso}}</td>
                <th>Jornada</th>
                <td>{{jornada}}</td>
              </tr>
            </tbody>
          </table>
          <table class="table">
            <thead>
              <tr>
                <th colspan="7" style="text-align: center">DATOS FAMILIARES</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Padre</th>
                <td>{{est.papa}}</td>
                <th>Dirección</th>
                <td>{{est.direccionP}} {{est.mdirP}}</td>
                <th>Tel.</th>
                <td>{{est.telefono1P}}</td>
              </tr>
              <tr>
                <th>Madre</th>
                <td>{{est.mama}}</td>
                <th>Dirección</th>
                <td>{{est.direccionM}} {{est.mdirM}}</td>
                <th>Tel.</th>
                <td>{{est.telefono1M}}</td>
              </tr>
              <tr>
                <th>Acudiente</th>
                <td>{{est.acudiente}}</td>
                <th>Dirección</th>
                <td>{{est.direccionA}} {{est.mdirA}}</td>
                <th>Tel.</th>
                <td>{{est.telefono1A}}</td>
              </tr>
              <tr>
                <th>Correo</th>
                <td>{{est.correoA}}</td>
                <th>Ocupación</th>
                <td>{{est.ocupacionA}}</td>
                <th>Fecha</th>
                <td>{{fechaImpresion}}</td>
              </tr>
            </tbody>
          </table>
          <table class="table">
            <thead>
              <tr>
                <th colspan="7" style="text-align: center">ASPECTOS OBSERVADOS</th>
              </tr>
            </thead>
            <tbody >
              <tr>
                <td style="text-align: center; width: 4%">FECHA</td>
                <td style="text-align: center; width: 27%">ASPECTO OBSERVADO</td>
                <td style="text-align: center; width: 27%">PROCEDIMIENTO Y RECOMENDACIONES</td>
                <td style="text-align: center; width: 27%">COMPROMISOS</td>
                <td style="text-align: center; width: 5%">FIRMA ESTUDIANTE</td>
                <td style="text-align: center; width: 5%">FIRMA PADRE DE FAMILIA</td>
                <td style="text-align: center; width: 5%">FIRMA DOCENTE</td>
              </tr>
              <tr v-for="n in 9" :key="n">
                <td style="height: 48px"></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
            </tbody>
          </table>
          <div class="firmas">
            <div><span>DIRECTOR DE CURSO_________________________________________________ Vo.Bo. PSICOORIENTACIÓN_________________________________________________ Vo.Bo. COORDINACIÓN_________________________________________________</span></div>
          </div>
          <div v-if="index < estudiantesSeleccionados.length - 1" class="page-break"></div>
        </div>
      </div>
    </div>
    <div><hr></div>
    <div style="margin-bottom: 1rem">
      <b-button class="small mx-1 mt-3" variant="primary" @click="imprimir">Imprimir</b-button>
      <!--<b-button class="small mx-1 mt-3" variant="outline-primary" @click="exportarAExcel">Exportar a Excel</b-button>-->
    </div>
  </div>
</template>

<script>
  import * as XLSX from 'xlsx'

  export default {
    name: 'formatoobservador',
    props: {
      estudiantesSeleccionados: Array,
      sede: String,
      curso: String,
      jornada: String,
    },
    components: {
    },
    data () {
      return {
        escudoUrl: null,
      }
    },
    methods: {
      imprimir() {
        const contenido = this.$refs.contenido.innerHTML
        const estilos = `
          <style>
            .encabezado {
              text-align: center;
              font-size: 13px;
            }
            .informe-estudiantes {
              font-family: 'Segoe UI', sans-serif;
              margin: 5px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              font-size: 10px;
              margin-bottom: 5px;
            }
            th, td {
              border: 1px solid #000;
              padding: 3px;
              text-align: left;
            }
            .firmas {
              display: flex;
              justify-content: space-around;
              margin-top: 40px;
              font-size: 13px;
            }
            thead {
              background-color: #f0f4fa;
            }
            @media print {
              .page-break {
                page-break-after: always;
              }
              .firmas {
                display: flex;
                justify-content: space-around;
                margin-top: 40px;
                font-size: 13px;
              }
              body {
                font-family: 'Segoe UI', sans-serif;
                margin: 5px;
                color: #000;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                font-size: 10px;
                margin-bottom: 5px;
              }
              th, td {
                border: 1px solid #000;
                padding: 2px;
                text-align: left;
              }
              thead {
                background-color: #f0f4fa;
              }
            }
          </style>
        `
        const ventana = window.open('Listas por Curso', '_blank')
        ventana.document.write(`
          <html>
            <head><title>Listado de Estudiantes</title>${estilos}</head>
            <body">${contenido}</body>
          </html>
        `)
        ventana.document.close()
        ventana.print()
      },
      exportarAExcel() {
      },
    },
    beforeMount() {
      this.escudoUrl = "https://siedutunja.gov.co/api/colegios/escudos/" + this.$store.state.escudoInstitucion
      this.fechaImpresion = new Date().toLocaleDateString() //toLocaleString()
    }
  }
</script>
<style scoped>
  .encabezado {
    text-align: center;
    font-size: 13px;
  }
  .informe-estudiantes {
    font-family: 'Segoe UI', sans-serif;
    margin: 5px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 10px;
    margin-bottom: 5px;
  }
  th, td {
    border: 1px solid #999;
    padding: 3px;
    text-align: left;
  }
  thead {
    background-color: #f0f4fa;
  }
  .firmas {
    display: flex;
    justify-content: space-around;
    margin-top: 40px;
    font-size: 13px;
  }
  .page-break {
    page-break-after: always;
  }
</style>
