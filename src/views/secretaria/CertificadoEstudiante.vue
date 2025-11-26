<template>
  <div ref="certificado" class="certificado-institucional">
    <div class="modal-overlay" @click.self="cerrar">
      <div class="modal-certificado">
        <div class="titulo" v-if="$store.state.daneInstitucion !== '115001002017'">
          <div class="mt-2">
            <p style="font-size: 14px;">SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA<br><b>{{$store.state.nombreInstitucion}}</b><br><span style="font-size: 12px;">DANE: {{$store.state.daneInstitucion}} | NIT: {{$store.state.nitInstitucion}}</span><br>TUNJA - BOYACÁ</p>
          </div>
        </div>
        <div class="float-left" style="margin-top: -95px; margin-left: 20px;" v-if="$store.state.daneInstitucion !== '115001002017'">
            <img :src="escudoUrl" alt="Escudo" class="escudo" />
        </div>
        <div class="numero">
          <div v-if="$store.state.daneInstitucion === '115001002017'"><br><br><br><br><br><br><br><br><br><br></div>
          Certificado No.: <b>{{ numCert }}</b>
        </div>
        <div class="encabezado">
          {{ encabezado }}
        </div>
        <div class="certifican">
          <h2>{{ certifican }}</h2>
        </div>
        <div class="aquien">
          {{ aquien }}
        </div>
        <table class="tabla-certificado">
          <thead>
            <tr>
              <th>{{ tituloArea }}</th>
              <th>IH</th>
              <th>DEFINITIVA</th>
              <th>HABILITACIÓN</th>
              <th>FECHA</th>
              <th v-if="$store.state.idSeccion != 2">DESEMPEÑO</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="area in resumenPorArea" :key="area.area">
              <td style="text-align: left">{{ area.area }}</td>
              <td>{{ area.ihArea }}</td>
              <td>{{ area.notaFinalArea }} <span v-if="$store.state.daneInstitucion === '115001002017' && $store.state.idSeccion == 2"> - {{ area.notaFinalLetras }}</span></td>
              <td>{{ area.habilitacion }}</td>
              <td>{{ area.fechaHabilitacion }}</td>
              <td v-if="$store.state.idSeccion != 2">{{ area.desempenoArea }}</td>
            </tr>
            <tr class="fila-promedio">
              <td colspan="2"><strong>Promedio General</strong></td>
              <td><strong>{{ promedioGeneral }} <span v-if="$store.state.daneInstitucion === '115001002017' && $store.state.idSeccion == 2"> - {{ convertirALetras(promedioGeneral) }}</span></strong></td>
              <td colspan="4"></td>
            </tr>
          </tbody>
        </table>
        <table class="tabla-certificado">
          <tr>
            <td style="text-align: left">
              <li v-if="idEstadoFinal == 11 && $store.state.idInstitucion === '17ee4f30-fc80-11ec-a1d1-1dc2835404e5'">Cumplió con la asistencia a los seminarios programados para el semestre.</li>
              <li>Promoción: <b>{{ estadofinal }}</b></li>
            </td>
          </tr>
        </table>
        <p class="fecha-expedicion">{{ obtenerFechaExpedicion() }}</p>
        <div class="firmas">
          <div><p>_________________________________<br><strong>{{$store.state.NombreRector}}</strong><br>C.C. {{$store.state.DocumentoRector}}<br>{{$store.state.CargoRector}}</p></div>
          <div><p>_________________________________<br><strong>{{$store.state.NombreSecretaria}}</strong><br>C.C. {{$store.state.DocumentoSecretaria}}<br>{{$store.state.CargoSecretaria}}</p></div>
        </div>
        <div class="acciones">
          <b-button class="small ml-3" variant="primary" @click="imprimirCertificado">Imprimir Certificado</b-button>
          <b-button class="small ml-3" variant="danger" @click="cerrar">Cerrar</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'certificadoestudiante',
    props: {
      idMatricula: String,
      dataConsultada: Array,
      nombreEst: String,
      documentoEst: String,
      grupo: String,
      sede: String,
      vigencia: Number,
      escudoUrl: String,
      numCert: String,
      encabezado: String,
      certifican: String,
      aquien: String,
      tituloArea: String,
      umbrales: Array,
      estadofinal: String,
      idEstadoFinal: Number
    },
    components: {
    },
    data () {
      return {
      }
    },
    methods: {
      obtenerFechaExpedicion() {
        const fecha = new Date()
        const dia = fecha.getDate()
        const meses = [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ]
        const nombreMes = meses[fecha.getMonth()]
        return `Expedido en Tunja, a los ${dia} días del mes de ${nombreMes} de ${fecha.getFullYear()}.`
      },
      imprimirCertificado() {
        const contenidoCertificado = this.$refs.certificado.innerHTML // Asegúrate de tener un ref="certificado"
        
        const ventana = window.open('Certificado', '_blank', 'width=1000,height=600')

        const estilos = `
          <style>
            .titulo {
              text-align: center;
              margin-bottom: 20px;
            }
            .numero {
              text-align: right;
              margin-top: 30px;
              margin-bottom: 10px;
              font-size: 13px;
            }
            .encabezado {
              text-align: justify;
              margin-bottom: 20px;
              font-size: 13px;
            }
            .certifican {
              text-align: center;
              font-size: 14px;
              margin-bottom: 20px;
            }
            .aquien {
              text-align: justify;
              margin-bottom: 10px;
              font-size: 13px;
            }
            .fecha-expedicion {
              font-size: 13px;
            }
            .escudo {
              width: 80px;
              height: auto;
            }
            .tabla-certificado {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 10px;
              font-size: 13px;
            }
            .tabla-certificado th, .tabla-certificado td {
              border: 1px solid #ccc;
              padding: 6px;
              text-align: center;
            }
            .tabla-certificado thead {
              background-color: #f0f8ff;
            }
            .firmas {
              display: flex;
              justify-content: space-around;
              margin-top: 60px;
              font-size: 13px;
            }
            @media print {
              body {
                font-family: Arial, sans-serif;
                margin: 20px;
              }
              .acciones {
                display: none !important;
              }
            }
          </style>
        `
        ventana.document.open()
        ventana.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Certificado</title>
              ${estilos}
            </head>
            <body onload="window.print(); window.close();">
              ${contenidoCertificado}
            </body>
          </html>
        `)
        ventana.document.close()
      },
      cerrar() {
        this.$emit('cerrar')
      },
      convertirALetras(nota) {
        if (isNaN(nota)) return ''

        const letras = ['CERO', 'UNO', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE']
        const [entero, decimal] = nota.toFixed(1).split('.')

        const letraEntero = letras[parseInt(entero)] || entero
        const letraDecimal = letras[parseInt(decimal)] || decimal

        return `${letraEntero} ${letraDecimal}`
      },
      redondear(num) {
        var m = Number((Math.abs(num) * 10).toPrecision(15))
        return Math.round(m) / 10 * Math.sign(num);
      }
    },
    computed: {
      promedioGeneral() {
        const notas = this.resumenPorArea.map(a => a.notaFinalArea)
        const sumatoria = notas.reduce((a, b) => a + b, 0)
        return (notas.length > 0) ? +this.redondear(sumatoria / notas.length).toFixed(1) : '-'
      },
      resumenPorArea() {
        const filtradas = this.dataConsultada.filter(d => d.id_matricula === this.idMatricula)
        const agrupadas = {}
        filtradas.forEach(asig => {
          if (!agrupadas[asig.area]) agrupadas[asig.area] = []
          agrupadas[asig.area].push(asig)
        })
        return Object.entries(agrupadas).map(([area, asignaturas]) => {
          let notaAcumulada = 0
          let porcentajeAcumulado = 0
          let ihArea = 0
          let habilitacion = null
          let fecha = null
          asignaturas.forEach(asig => {
            //notaAcumulada += asig.nota_final * (asig.porcentaje / 100)
            notaAcumulada += asig.nota_definitiva * (asig.porcentaje / 100)
            porcentajeAcumulado += asig.porcentaje
            ihArea += asig.ih
            if (asig.habilitacion && habilitacion === null) {
              habilitacion = asig.habilitacion
              fecha = asig.fecha !== null ? asig.fecha.substr(0,10) : ''
            }
          })
          const notaFinalArea = notaAcumulada > 0 ? +this.redondear(notaAcumulada / (porcentajeAcumulado / 100)).toFixed(1) : 0
          const letra = this.convertirALetras(notaFinalArea)
          const desempeno = notaFinalArea < this.umbrales[0] ? 'BAJO'
                            : notaFinalArea < this.umbrales[1] ? 'BÁSICO'
                            : notaFinalArea < this.umbrales[2] ? 'ALTO'
                            : notaFinalArea < this.umbrales[3] ? 'SUPERIOR'
                            : ''

          return {
            area,
            ihArea,
            notaFinalArea,
            notaFinalLetras: letra,
            habilitacion,
            fechaHabilitacion: fecha,
            desempenoArea: desempeno
          }
        })
      }
    },
  }
</script>
<style scoped>
  .titulo {
    text-align: center;
    margin-bottom: 20px;
  }
  .numero {
    text-align: right;
    margin-bottom: 10px;
  }
  .encabezado {
    text-align: justify;
    margin-bottom: 20px;
  }
  .certifican {
    text-align: center;
    font-size: 14px;
    margin-bottom: 20px;
  }
  .aquien {
    text-align: justify;
    margin-bottom: 10px;
  }
  .modal-overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  .modal-certificado {
    background: white;
    padding: 30px;
    width: 850px;
    max-height: 95vh;
    overflow-y: auto;
    border-radius: 6px;
  }
  .escudo {
    width: 80px;
    height: auto;
  }
  .tabla-certificado {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
    font-size: 13px;
  }
  .tabla-certificado th, .tabla-certificado td {
    border: 1px solid #ccc;
    padding: 6px;
    text-align: center;
  }
  .tabla-certificado thead {
    background-color: #f0f8ff;
  }
  .firmas {
    display: flex;
    justify-content: space-around;
    margin-top: 40px;
  }
  .acciones {
    text-align: right;
    margin-top: 20px;
  }
  .acciones button {
    margin-left: 10px;
    padding: 6px 12px;
    font-size: 13px;
  }
  @media print {
    .modal-overlay, .acciones {
      display: none !important;
    }
    .modal-certificado {
      all: unset;
      padding: 0;
    }
  }
</style>