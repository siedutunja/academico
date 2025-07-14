<template>
  <div>
    <button class="btn btn-success float-right btn-block" @click="generarPDF">📄 {{ estudiantesSeleccionados.length }} boletines procesados... Imprimir Boletines o Generar Boletines en PDF</button>
  </div>
</template>

<script>
export default {
  name: 'BoletinPeriodo',
  props: {
    estudiantesSeleccionados: Array, // [{ idMatricula: '...' }]
    listaAreasAsignaturas: Array,
    notas: Array,
    datosEstudiantes: Array, // [{ idMatricula, nombre, sede, grado, curso }]
    listaDescriptores: Array,
    anio: Number,
    periodoActual: Number,
    periodosVisibles: Array, // [1, 2, 3, 4]
    nombreSede: String,
    nombreCurso: String,
    nombrePeriodo: String,
    nombreJornada: String,
    nombreDirector: String,
    idNivel: Number,
    umbralesA: Array,
    umbralesT: Array,
    pesosPeriodos: Array,
    tipoValComp: Number,
    directorCurso: String,
    coordinador: String,
    promCompor: Number,
  },
  data () {
    return {
      escudo: null,
      asignatur: null,
    }
  },
  methods: {
    nombreDelArea(area) {
      const registro = this.listaAreasAsignaturas.find(a => a.area === area && a.nombreArea)
      return registro?.nombreArea || area
    },
    tieneNotasAsignatura(est, area, asignatura) {
      const asig = est.areas?.[area]?.asignaturas?.[asignatura]
      if (!asig || !asig.periodos) return false
      return true //Object.values(asig.periodos).some(n => typeof n === 'number' && !isNaN(n))
    },
    tieneNotasArea(est, area) {
      const asignaturas = Object.keys(est.areas?.[area]?.asignaturas || {})
      return asignaturas.some(asig => this.tieneNotasAsignatura(est, area, asig))
    },
    generarPDF() {
      const ventana = window.open('', '_blank')
      const contenido = this.generarHTMLBoletines()
      ventana.document.write(contenido)
      ventana.document.close()
      ventana.focus()
    },
    generarHTMLBoletines() {
      const estudiantes = this.estudiantesSeleccionados.map(sel =>
        this.datosEstudiantes.find(e => e.idMatricula === sel.idMatricula)
      )
      const estructura = this.estructurarNotasPorEstudiante()
      const html = `
        <html>
        <head>
          <title>Boletines</title>
          <style>
            ${this.estilosBoletin()}
          </style>
        </head>
        <body>
          ${estudiantes.map(est => this.renderBoletin(est, estructura[est.nombre])).join('<div class="page-break"></div>')}
        </body>
        </html>
      `
      return html
    },
    renderBoletin(estudiante, data) {
      if (!data) return `<p>No hay datos para ${estudiante.nombre}</p>`
      return `
        <div class="boletin">
          <div class="text-center mt-2">
            <p style="text-align: center; font-size: 14px;">SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA<br><b>${this.$store.state.nombreInstitucion}</b><br>TUNJA - BOYACÁ<br>BOLETIN DE EVALUACIONES POR PERIODO</p>
          </div>
          <div class="float-left" style="margin-top: -80px;">
              <img src="${this.escudo}" width="70px"></img>
          </div>
          <table class="tabla-boletin">
            <thead>
              <tr>
                <th style="width:10%; text-align: left">Estudiante:</th><th style="text-align: left">${estudiante.nombre}</th>
                <th colspan="2" style="text-align: left">Modalidad:</th><th colspan="2" style="text-align: left">ACADÉMICA</th>
                <th style="text-align: left">Vigencia:</th><th style="text-align: left">${this.anio}</th>
              </tr>
              <tr>
                  <th style="text-align: left">Sede:</th><th style="text-align: left">${this.nombreSede}</th>
                  <th style="text-align: left">Jornada:</th><th style="text-align: left">${this.nombreJornada}</th>
                  <th style="text-align: left">Curso:</th><th style="text-align: left">${this.nombreCurso}</th>
                  <th style="text-align: left">Periodo:</th><th style="text-align: left">${this.nombrePeriodo}</th>
              </tr>
            </thead>
          </table>
          <table class="tabla-boletin">
            <thead>
              <tr>
                <th rowspan="2">Área / Asignatura</th>
                <th rowspan="2">IH</th>
                <th colspan="${this.periodosVisibles.length + 1}">Historial</th>
                <th colspan="6">Desempeño en el Periodo</th>
              </tr>
              <tr>
                ${this.periodosVisibles.map(p => `<th>P${p}</th>`).join('')}
                <th>PR</th>
                <th>Evalu</th>
                <th>Recup</th>
                <th>Defin</th>
                <th>Desemp</th>
                <th>AJ</th>
                <th>AS</th>
              </tr>
            </thead>
            <tbody>
              ${this.renderCuerpoTabla(estudiante, data)}
            </tbody>
          </table>
          <table class="tabla-boletin">
            <thead>
              <tr>
                <th style="width:20%; text-align: left">Promedio: <strong>${this.calcularPromedioGeneralPorAreasFinales(data)}</strong></th>
                <th style="width:20%; text-align: left">Puesto: <strong>${this.puestoEstudiante(estudiante.nombre)}</strong></th>
                <th style="width:20%; text-align: left">Aus.Justificadas: <strong>${this.estudiantesNotas[estudiante.nombre].ausJ}</strong></th>
                <th style="width:20%; text-align: left">Aus.SinJustificar: <strong>${this.estudiantesNotas[estudiante.nombre].ausS}</strong></th>
              </tr>
            </thead>
          </table>
          <table class="tabla-boletin observacion-comportamiento">
            <thead>
              <tr>
                <th style="text-align: left; height:100px; padding-left: 10px; vertical-align: top;"><h3>🧠 Observaciones:</h3>${ this.observacionComportamiento(data) }</th>
              </tr>
            </thead>
          </table>
          <table class="firmas" style="width: 100%;">
            <tr>
              <td style="width: 50%;">
                <p>________________________________________<br>${this.directorCurso}<br>Firma Director(a) de Curso</p>
              </td>
              <!--
              <td style="width: 50%;">
                <p>________________________________________<br>${this.coordinador}<br>Firma Coordinador(a)</p>
              </td>
              -->
            </tr>
          </table>
      `
    },
    renderCuerpoTabla(estudiante, data) {
      const areas = [...new Set(this.listaAreasAsignaturas.map(a => a.area))]
      .filter(area => this.tieneNotasArea(data, area))
      return areas.map(area => {
        const asigns = this.listaAreasAsignaturas.filter(a => a.area === area && this.tieneNotasAsignatura(data, area, a.asignatura))
        const filasAsignaturas = asigns.map(asig => {
          const a = asig.asignatura
          this.asignatur = a
          const nombreAsignatura = asig.nombreAsignatura
          const notas = this.periodosVisibles.map(p => `<td>${this.notaPeriodo(data, area, a, p)}</td>`).join('')
          const prom = this.promedioAsignatura(data, area, a)
          const def = this.definitivaPeriodo(data, area, a, this.periodoActual)
          const rec = this.recuperacion(data, area, a, this.periodoActual)
          const final = this.notaFinal(data, area, a, this.periodoActual)
          const des = this.desempeno(final, area, a) //this.desempeño(final)
          const ausJ = this.ausencias(data, area, a, 'ausJ')
          const ausS = this.ausencias(data, area, a, 'ausS')
          const docente = asig.docente != null ? asig.docente : ''

          return `
            <tr>
              <td style="text-align: left"><strong>${nombreAsignatura}</strong> <br> <i style="font-size: 10px;">${docente}</i></td>
              <td>${asig.ih}</td>
              ${notas}
              <td>${prom}</td>
              <td>${def}</td>
              <td>${rec}</td>
              <td>${final > 0 ? final : final}</td>
              <td>${des}</td>
              <td>${ausJ}</td>
              <td>${ausS}</td>
            </tr>
            <tr><td colspan="11" class="descriptor" style="text-align: left">${this.descriptorAsignatura(data, area, a, this.periodoActual)}</td></tr>
          `
        }).join('')

        const notasArea = this.periodosVisibles.map(p => `<td>${this.promedioAreaPorPeriodo(data, area, p)}</td>`).join('')
        const promArea = this.promedioArea(data, area)
        const finalArea = this.notaFinalArea(data, area)
        const desArea = this.desempeno(finalArea, area, this.asignatur) //this.desempeño(finalArea)
        const ausJArea = this.ausenciasArea(data, area, 'ausJ')
        const ausSArea = this.ausenciasArea(data, area, 'ausS')
        const ihArea = this.intensidadHorariaArea(data, area)

        return `
          <tr class="fila-area">
            <td style="text-align: left"><strong>${this.nombreDelArea(area)}</strong></td>
            <td>${ihArea}</td>
            ${notasArea}
            <td>${promArea}</td>
            <td></td><td></td>
            <td>${finalArea > 0 ? finalArea : finalArea}</td>
            <td>${desArea}</td>
            <td>${ausJArea}</td>
            <td>${ausSArea}</td>
          </tr>
          ${filasAsignaturas}
        `
      }).join('')
    },
    estilosBoletin() {
      return `
        body { font-family: Arial, sans-serif; margin: 5px; }
        .boletin { page-break-after: always; }
        .tabla-boletin { width: 100%; border-collapse: collapse; font-size: 0.7rem; margin-top: 0.5rem; }
        .tabla-boletin th, .tabla-boletin td { border: 1px solid #ccc; padding: 1px 1px; text-align: center; }
        .fila-area { background-color: #f0f0f0; font-weight: bold; }
        .descriptor { font-style: italic; background-color: #f9f9f9; text-align: left; }
        .firmas { margin-top: 5rem; font-size: 0.8rem; }
        .page-break { page-break-before: always; }
        .observacion-comportamiento {
          margin-top: 0.5rem;
          background-color: #f3f3f3;
          border-left: 4px solid #888;
          font-style: italic;
        }
      `
    },
    esSoloDescriptor(area, asignatura) {
      alert()
      const meta = this.listaAreasAsignaturas.find(
        a => a.area === area && a.asignatura === asignatura
      )
      return meta?.orden === 98
    },

    descriptorAsignatura(est, area, asignatura, periodo) {
      const datos = est.areas?.[area]?.asignaturas?.[asignatura]
      const meta = this.listaAreasAsignaturas.find(
        a => a.area === area && a.asignatura === asignatura
      )

      if (!datos || !meta) return ''

      // Si la asignatura tiene pd === "S", usamos el campo inclusion directamente
      if (datos.pd === 'S') {
        return datos.inclusion || ''
      }


      /*
      // Buscar metadatos de la asignatura
      const meta = this.listaAreasAsignaturas.find(
        a => a.area === area && a.asignatura === asignatura
      )
      if (!meta) return ''
      */
      // Obtener la nota final del estudiante
      const notaFinal = parseFloat(this.notaFinal(est, area, asignatura, periodo))
      if (isNaN(notaFinal)) return ''
      // Determinar desempeño real
      const tipo = meta.idTipoEspecialidad
      const umbralBajo = tipo === 2 ? this.umbralesT[0] : this.umbralesA[0]
      const umbralBasico = tipo === 2 ? this.umbralesT[1] : this.umbralesA[1]
      const umbralAlto = tipo === 2 ? this.umbralesT[2] : this.umbralesA[2]
      const umbralSuperior = tipo === 2 ? this.umbralesT[3] : this.umbralesA[3]
      let conceptoValorativo = null
      if (notaFinal < umbralBajo) conceptoValorativo = 1
      else if (notaFinal < umbralBasico) conceptoValorativo = 2
      else if (notaFinal < umbralAlto) conceptoValorativo = 3
      else if (notaFinal <= umbralSuperior) conceptoValorativo = 4
      else conceptoValorativo = 999
      // Buscar descriptor correspondiente
      const descriptorObj = this.listaDescriptores.find(d => d.idAsignaturaCurso === meta.idAsignaturaCurso && d.id_concepto_valorativo === conceptoValorativo)
      return descriptorObj?.descriptor || ''
    },
    desempeno(nota, area, asignatura) {
      const meta = this.listaAreasAsignaturas.find(
        a => a.area === area && a.asignatura === asignatura
      )
      const tipo = meta?.idTipoEspecialidad || 1
      const valor = parseFloat(nota)
      if (isNaN(valor)) return ''
      const umbralBajo = tipo === 2 ? this.umbralesT[0] : this.umbralesA[0]
      const umbralBasico = tipo === 2 ? this.umbralesT[1] : this.umbralesA[1]
      const umbralAlto = tipo === 2 ? this.umbralesT[2] : this.umbralesA[2]
      const umbralSuperior = tipo === 2 ? this.umbralesT[3] : this.umbralesA[3]
      if (valor < umbralBajo) return 'Bajo'
      if (valor < umbralBasico) return 'Básico'
      if (valor < umbralAlto) return 'Alto'
      if (valor <= umbralSuperior) return 'Superior'
      return ''
    },
    notaFinalArea(est, area) {
      /*
      const asignsx = Object.keys(est.areas?.[area]?.asignaturas || {})
      if (!asignsx.length) return ''
      const orden = est.areas?.[area]?.asignaturas?.[asignsx]?.orden
      const asignatura = asignsx.reduce((asig) => asig)
      if (orden == 99 && this.tipoValComp == 1) return this.promedioAreaPorPeriodo(est, area, this.periodoActual) //this.promedioAsignatura(est, area, asignatura)
*/
      let asigns = ''
      if (this.promCompor == 1) { // Promedia comportamiento
        asigns = this.listaAreasAsignaturas.filter(a => a.area === area && a.orden !== 98)
      } else {
        asigns = this.listaAreasAsignaturas.filter(a => a.area === area && a.orden !== 99 && a.orden !== 98)
      }
      if (!asigns.length) return ''       
      let total = 0
      let pesoTotal = 0
      asigns.forEach(asigMeta => {
        const { asignatura, porcentaje, orden } = asigMeta
        if (orden === 99 && this.tipoValComp == 0) return orden //this.definitivaPeriodo(est, area, asignatura, this.periodoActual)
        const datos = est.areas?.[area]?.asignaturas?.[asignatura]
        if (!datos) return
        const notaFinal = this.notaFinal(est, area, asignatura, this.periodoActual)
        if (!isNaN(notaFinal)) {
          total += notaFinal * (porcentaje / 100)
          pesoTotal += porcentaje
        }
      })
      // Aseguramos que el peso total sea > 0
      return total > 0 ? this.redondear(total).toFixed(1) : ''
    },
    calcularPromedioGeneralPorAreasFinales(est) {
      let areasEvaluativas = ''
      if (this.promCompor == 1) { // Promedia comportamiento
        areasEvaluativas = [...new Set(
          this.listaAreasAsignaturas
            .filter(a => a.orden !== 98)
            .map(a => a.area)
        )]
      } else {
        areasEvaluativas = [...new Set(
          this.listaAreasAsignaturas
            .filter(a => a.orden !== 99 && a.orden !== 98)
            .map(a => a.area)
        )]
      }
      let total = 0
      let cantidad = 0
      areasEvaluativas.forEach(area => {
        const notaFinalArea = parseFloat(this.notaFinalArea(est, area))
        if (!isNaN(notaFinalArea)) {
          total += notaFinalArea
          cantidad++
        }
      })
      return cantidad > 0 ? (total / cantidad).toFixed(3) : '0.000'
    },
    generarRankingCurso() {
      const ranking = []
      Object.entries(this.estudiantesNotas).forEach(([nombre, est]) => {
        const promedio = parseFloat(this.calcularPromedioGeneralPorAreasFinales(est))
        if (!isNaN(promedio)) {
          ranking.push({ nombre, promedio })
        }
      })
      // Ordenar por promedio descendente
      ranking.sort((a, b) => b.promedio - a.promedio)
      // Asignar puestos (con empates)
      let puesto = 1
      for (let i = 0; i < ranking.length; i++) {
        if (i > 0 && ranking[i].promedio === ranking[i - 1].promedio) {
          ranking[i].puesto = ranking[i - 1].puesto // mismo puesto por empate
        } else {
          ranking[i].puesto = puesto
        }
        puesto++
      }
      return ranking
    },
    puestoEstudiante(nombre) {
      const ranking = this.generarRankingCurso()
      const encontrado = ranking.find(e => e.nombre === nombre)
      return encontrado?.puesto || ''
    },
    ausencias(est, area, asignatura, tipo) {
      return est.areas?.[area]?.asignaturas?.[asignatura]?.[tipo] || ''
    },
    ausenciasArea(est, area, tipo) {
      const asigns = Object.keys(est.areas?.[area]?.asignaturas || {})
      return asigns.reduce((sum, asig) => sum + this.ausencias(est, area, asig, tipo), '')
    },
    definitivaPeriodo(est, area, asignatura, periodo) {
      const orden = est.areas?.[area]?.asignaturas?.[asignatura]?.orden
      const nota = est.areas?.[area]?.asignaturas?.[asignatura]?.definitivas?.[periodo]
      if (orden == 99 && this.tipoValComp == 0)
        return nota
      else
        return typeof nota === 'number' && nota > 0 ? nota.toFixed(1) : ''
    },
    recuperacion(est, area, asignatura, periodo) {
      const rec = est.areas?.[area]?.asignaturas?.[asignatura]?.recuperaciones?.[periodo]
      //const rec = est.areas?.[area]?.asignaturas?.[asignatura]?.recuperacion
      return typeof rec === 'number' && rec > 0 ? rec.toFixed(1) : ''
    },
    notaFinal(est, area, asignatura, periodo) {
      const orden = est.areas?.[area]?.asignaturas?.[asignatura]?.orden
      const def = parseFloat(this.definitivaPeriodo(est, area, asignatura, periodo))
      const rec = parseFloat(this.recuperacion(est, area, asignatura, periodo))
      if (orden == 99 && this.tipoValComp == 0) return this.definitivaPeriodo(est, area, asignatura, periodo)
      if (isNaN(def) && isNaN(rec)) return ''
      if (!isNaN(rec) && rec > def) return rec.toFixed(1)
      return def > 0 ? def.toFixed(1) : def
    },
    promedioAsignatura(est, area, asignatura) {
      const orden = est.areas?.[area]?.asignaturas?.[asignatura]?.orden
      const asig = est.areas?.[area]?.asignaturas?.[asignatura]
      if (!asig) return ''
      let total = 0
      let cant = 0
      const letrasCompor = ['J','B','A','S']
      if (orden == 99 && this.tipoValComp == 0) {
        for (const p in asig.periodos) {
          const nota = asig.periodos[p]
          let encontrarLetra = letrasCompor.findIndex(valor => valor === nota)
          total += this.umbralesA[encontrarLetra]
          cant++
        }
        let promedioLetras = cant > 0 ? this.redondear(total / cant).toFixed(1): 0
        if (promedioLetras <= this.umbralesA[0]) return letrasCompor[0]
        else if (promedioLetras <= this.umbralesA[1]) return letrasCompor[1]
        else if (promedioLetras <= this.umbralesA[2]) return letrasCompor[2]
        else if (promedioLetras <= this.umbralesA[3]) return letrasCompor[3]
        else return promedioLetras
      } else {
        for (const p in asig.periodos) {
          const nota = asig.periodos[p]
          if (typeof nota === 'number') {
            total += nota
            cant++
          }
        }
        return cant > 0 ? this.redondear(total).toFixed(1) : ''
      }
      /*   PONDERADO PARA EMILIANI
      for (const p in asig.periodos) {
        const nota = asig.periodos[p]
        if (typeof nota === 'number') {
          total += (nota * this.pesosPeriodos[p-1]) / 100
        }
      }
      return total > 0 ? this.redondear(total).toFixed(1) : ''
      */
    },
    promedioArea(est, area) {
      const asigns = Object.keys(est.areas?.[area]?.asignaturas || {})
      if (!asigns.length) return ''
      const orden = est.areas?.[area]?.asignaturas?.[asigns]?.orden
      const asignatura = asigns.reduce((asig) => asig)
      if (orden == 99 && this.tipoValComp == 0) return this.promedioAsignatura(est, area, asignatura)
      const total = asigns.reduce((sum, asig) => sum + parseFloat(this.promedioAsignatura(est, area, asig) * est.areas?.[area]?.asignaturas?.[asig]?.porcentaje / 100), 0)
      return total > 0 ?  this.redondear(total).toFixed(1) : ''
      //return this.redondear(total / asigns.length).toFixed(1)
      /*
      const asigns = Object.keys(est.areas?.[area]?.asignaturas || {})
      if (!asigns.length) return '0.00'
      let total = 0
      asigns.forEach(asig => {
        if (asig.orden === 99) return '-'
        total += parseFloat((this.promedioAsignatura(est, area, asig) * asig.porcentaje) / 100)
      })
      return total > 0 ?  this.redondear(total).toFixed(1) : ''
      */
    },
    promedioAreaPorPeriodo(est, area, periodo) {
      const asigns = Object.keys(est.areas?.[area]?.asignaturas || {})
      if (!asigns.length) return ''
      const orden = est.areas?.[area]?.asignaturas?.[asigns]?.orden
      if (orden == 99 && this.tipoValComp == 0) return est.areas?.[area]?.asignaturas?.[asigns]?.periodos?.[periodo] || ''
      const total = asigns.reduce((sum, asig) => {
        const nota = est.areas?.[area]?.asignaturas?.[asig]?.periodos?.[periodo] * est.areas?.[area]?.asignaturas?.[asig]?.porcentaje / 100
        return sum + (typeof nota === 'number' ? nota : 0)
      }, 0)
      return total > 0 ?  this.redondear(total).toFixed(1) : ''
      // return this.redondear(total / asigns.length).toFixed(1)
    },
    intensidadHorariaAsignatura(area, asignatura) {
      const meta = this.listaAreasAsignaturas.find(a => a.area === area && a.asignatura === asignatura)
      return meta?.intensidadHoraria || 0
    },
    intensidadHorariaArea(est, area) {
      const asigns = Object.keys(est.areas?.[area]?.asignaturas || {})
      return asigns.reduce((sum, asig) => sum + this.intensidadHorariaAsignatura(area, asig), 0)
    },
    notaPeriodo(est, area, asignatura, periodo) {
      const orden = est.areas?.[area]?.asignaturas?.[asignatura]?.orden
      if (orden == 99 && this.tipoValComp == 0) return est.areas?.[area]?.asignaturas?.[asignatura]?.periodos?.[periodo] || ''
      return est.areas?.[area]?.asignaturas?.[asignatura]?.periodos?.[periodo]?.toFixed(1) || ''
    },
    observacionComportamiento(est) {
      // Busca la asignatura de orden 99
      const compo = this.listaAreasAsignaturas.find(a => a.orden === 99)
      if (!compo) return ''
      const datos = est.areas?.[compo.area]?.asignaturas?.[compo.asignatura]
      return datos?.observaciones || ''
    },

    estructurarNotasPorEstudiante() {
      const mapa = {}
      this.notas.forEach(nota => {
        const {
          estudiante,
          documento,
          area,
          asignatura,
          periodo,
          definitiva,
          recuperacion,
          definitivacompor,
          fechaR,
          inclusion,
          observaciones,
          pd,
          ausJ,
          ausS
        } = nota
        if (!mapa[estudiante]) {
          mapa[estudiante] = {
            documento,
            ausJ: 0,
            ausS: 0,
            areas: {}
          }
        }
        const est = mapa[estudiante]
        if (!est.areas[area]) {
          est.areas[area] = { asignaturas: {} }
        }
        if (!est.areas[area].asignaturas[asignatura]) {
          const meta = this.listaAreasAsignaturas.find(a => a.area === area && a.asignatura === asignatura)
          est.areas[area].asignaturas[asignatura] = {
            intensidadHoraria: meta?.ih || 0,
            orden: meta?.orden || 0,
            porcentaje: meta?.porcentaje || 100,
            docente: meta?.docente || '',
            periodos: {},
            definitivas: {},
            recuperaciones: {},
            definitiva: null,
            recuperacion: null,
            definitivacompor: null,
            fechaR: null,
            inclusion: null,
            observaciones: null,
            pd: null,
            ausJ: 0,
            ausS: 0
          }
        }
        const asig = est.areas[area].asignaturas[asignatura]
        if (asig.orden == 99 && this.tipoValComp == 0) {
          asig.periodos[periodo] = definitivacompor
          asig.definitivas[periodo] = definitivacompor
          asig.recuperaciones[periodo] = ''
          asig.definitiva = definitivacompor
          asig.recuperacion = ''
          asig.fechaR = fechaR
          asig.inclusion = inclusion
          asig.observaciones = observaciones
          asig.pd = pd
        } else {
          asig.periodos[periodo] = recuperacion > definitiva ? recuperacion : definitiva
          asig.definitivas[periodo] = definitiva
          asig.recuperaciones[periodo] = recuperacion
          asig.definitiva = definitiva
          asig.recuperacion = recuperacion
          asig.fechaR = fechaR
          asig.inclusion = inclusion
          asig.observaciones = observaciones
          asig.pd = pd
        }
        asig.ausJ += ausJ || 0
        asig.ausS += ausS || 0

        est.ausJ += ausJ || 0
        est.ausS += ausS || 0
      })
      //console.log(JSON.stringify(mapa))
      return mapa
    },
    redondear(num) {
      var m = Number((Math.abs(num) * 10).toPrecision(15))
      return Math.round(m) / 10 * Math.sign(num);
    }
  },
  computed: {
    estudiantesNotas() {
      return this.estructurarNotasPorEstudiante()
    }
  },
  beforeMount() {
    this.escudo = "https://siedutunja.gov.co/api/colegios/escudos/" + this.$store.state.escudoInstitucion
  }
}
</script>
<style scoped>
</style>