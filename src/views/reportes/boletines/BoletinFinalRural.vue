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
    promCompor: Number,
    letrasCompor: Array,
    firmasBoletin: String,
    descC1: String,
    descC2: String,
    descC3: String,
    listaHabilitaciones: Array,
  },
  data () {
    return {
      escudo: null,
      asignatur: null,
      orden: 0,
      conceptual: null,
      datosSeccion: {},
      colDesem: 0,
      escala: 0,
      tipoArea: 1,
      perdioPorHabilitacion: 0,
    }
  },
  methods: {
    nombreDelArea(area) {
      const registro = this.listaAreasAsignaturas.find(a => a.area === area && a.nombreArea)
      return registro?.nombreArea || area
    },
    tieneNotasAsignatura(est, area, asignatura) {
      const asig = est.areas?.[area]?.asignaturas?.[asignatura]
      const orden = est.areas?.[area]?.asignaturas?.[asignatura]?.orden
      if (orden == 99) return true
      if (!asig || !asig.periodos) return false
      return Object.values(asig.periodos).some(n => typeof n === 'number' && !isNaN(n) && n > 0)
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
      const idMatricula = estudiante.idMatricula
      this.perdioPorHabilitacion = 0
      let cuerpo = `
        <div class="boletin">
          <div class="text-center mt-2">
            <p style="text-align: center; font-size: 14px;">SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA<br><b>${this.$store.state.nombreInstitucion}</b><br>TUNJA - BOYACÁ<br>INFORME VALORATIVO DEFINITIVO</p>
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
                <th colspan="${this.colDesem}">Desempeño Definitivo</th>
              </tr>
              <tr>
                ${this.periodosVisibles.map(p => `<th>P${p}</th>`).join('')}
                <th>PR</th>
        `
        if (this.colDesem == 7) {
          cuerpo += `
                  <th>Fecha</th>
                  <th>Acta</th>
                  <th>Supera</th>
                  <th>Def</th>
                  <th>Desemp</th>
                  <th>AJ</th>
                  <th>AS</th>
          `
        } else {
          cuerpo += `
                  <th>EvP</th>
                  <th>Rec</th>
                  <th>Def</th>
                  <th>Desemp</th>
                  <th>AJ</th>
                  <th>AS</th>
          `
        }
        cuerpo += `
              </tr>
            </thead>
            <tbody>
              ${this.renderCuerpoTabla(estudiante, data)}
            </tbody>
          </table>
          <table class="tabla-boletin">
            <thead>
              <tr>
                <th style="width:30%; text-align: left">${this.estadosFinalesEstudiante(data,idMatricula)}</th>
                <th style="width:15%; text-align: left">Promedio: <strong>${this.calcularPromedioGeneralPorAreasFinales(data,idMatricula)}</strong></th>
                <th style="width:15%; text-align: left">Puesto: <strong>${this.puestoEstudiante(estudiante.nombre,idMatricula)}</strong></th>
                <th style="width:20%; text-align: left">Aus.Justificadas: <strong>${this.estudiantesNotas[estudiante.nombre].ausJ}</strong></th>
                <th style="width:20%; text-align: left">Aus.SinJustificar: <strong>${this.estudiantesNotas[estudiante.nombre].ausS}</strong></th>
              </tr>
            </thead>
          </table>
          <table class="tabla-boletin">
            <tr>
              <th>Desempeños: BAJO [${(this.datosSeccion.minBaj).toFixed(1)} : ${(this.datosSeccion.maxBaj).toFixed(1)}] | BÁSICO [${(this.datosSeccion.minBas).toFixed(1)} : ${(this.datosSeccion.maxBas).toFixed(1)}] | ALTO [${(this.datosSeccion.minAlt).toFixed(1)} : ${(this.datosSeccion.maxAlt).toFixed(1)}] | SUPERIOR [${(this.datosSeccion.minSup).toFixed(1)} : ${(this.datosSeccion.maxSup).toFixed(1)}]</th>
            </tr>
          </table>
          <table class="tabla-boletin observacion-comportamiento">
            <thead>
              <tr>
                <th style="text-align: left; height:100px; padding-left: 10px; vertical-align: top;"><h3>🧠 Observaciones:</h3>${ this.observacionComportamiento(data) }</th>
              </tr>
            </thead>
          </table>
        `
      return cuerpo + this.firmasBoletin
    },
    renderCuerpoTabla(estudiante, data) {
      const idMatricula = estudiante.idMatricula
      const areas = [...new Set(this.listaAreasAsignaturas.map(a => a.area))]
      .filter(area => this.tieneNotasArea(data, area))
      return areas.map(area => {
        const asigns = this.listaAreasAsignaturas.filter(a => a.area === area && this.tieneNotasAsignatura(data, area, a.asignatura))
        const filasAsignaturas = asigns.map(asig => {
          this.orden = asig.orden
          const a = asig.asignatura
          this.asignatur = a
          const tipoAsig = asig.idTipoEspecialidad
          this.tipoArea = asig.idTipoArea
          const nombreAsignatura = asig.nombreAsignatura
          const ih = this.orden !== 98 ? asig.ih : ''
          const notas = this.periodosVisibles.map(p => `<td>${this.orden !== 98 ? this.notaPeriodo(data, area, a, p) : ''}</td>`).join('')
          const c1 = this.orden == 98 ? '' : this.criterio1Periodo(data, area, a, this.periodoActual) > 0 ? this.criterio1Periodo(data, area, a, this.periodoActual) : ''
          const c2 = this.orden == 98 ? '' : this.criterio2Periodo(data, area, a, this.periodoActual) > 0 ? this.criterio2Periodo(data, area, a, this.periodoActual) : ''
          const c3 = this.orden == 98 ? '' : this.criterio3Periodo(data, area, a, this.periodoActual) > 0 ? this.criterio3Periodo(data, area, a, this.periodoActual) : ''
          const prom = this.orden !== 98 ? this.promedioAsignatura(data, area, a) : ''
          const def = this.orden !== 98 ? this.definitivaPeriodo(data, area, a, this.periodoActual) : ''
          const rec = this.orden !== 98 ? this.recuperacion(data, area, a, this.periodoActual) : ''
          const final = this.orden !== 98 ? this.notaFinal(data, area, a, this.periodoActual) : ''
          const ausJ = this.ausencias(data, area, a, 'ausJ')
          const ausS = this.ausencias(data, area, a, 'ausS')
          const ausJAsig = this.orden == 98 ? '' : ausJ > 0 ? ausJ : ''
          const ausSAsig = this.orden == 98 ? '' : ausS > 0 ? ausS : ''
          const docente = asig.docente != null ? asig.docente : ''
          const idAsignaturaCurso = asig.idAsignaturaCurso
          const habilit = this.mostrarHabilitacion(idMatricula,idAsignaturaCurso)
          const umbralBajo = tipoAsig === 2 ? this.umbralesT[0] : this.umbralesA[0]
          if (habilit.habilitacion > 0 && habilit.habilitacion < umbralBajo) {
             this.perdioPorHabilitacion = 1
          }
          const des = this.orden !== 98 ? this.desempeno(habilit.habilitacion > prom ? habilit.habilitacion : prom, area, tipoAsig, this.orden) : '' //this.desempeño(final)
          if (this.colDesem == 7) {
            return `
              <tr>
                <td style="text-align: left"><strong>${nombreAsignatura}</strong> <br> <i style="font-size: 10px;">${docente}</i></td>
                <td>${ih}</td>
                ${notas}
                <td>${prom}</td>
                <td>${habilit.fecha}</td>
                <td>${habilit.acta}</td>
                <td>${habilit.habilitacion}</td>
                <td>${habilit.habilitacion > prom ? habilit.habilitacion : prom}</td>
                <td>${des}</td>
                <td>${ausJAsig}</td>
                <td>${ausSAsig}</td>
              </tr>
              <tr><td colspan="12" class="descriptor" style="text-align: left"></td></tr>
            `
          } else {
            return `
              <tr>
                <td style="text-align: left"><strong>${nombreAsignatura}</strong> <br> <i style="font-size: 10px;">${docente}</i></td>
                <td>${ih}</td>
                ${notas}
                <td>${prom}</td>
                <td></td>
                <td></td>
                <td>${final > 0 ? final : final}</td>
                <td>${des}</td>
                <td>${ausJAsig}</td>
                <td>${ausSAsig}</td>
              </tr>
              <tr><td colspan="${this.colDesem + 6}" class="descriptor" style="text-align: left">${this.descriptorAsignatura(data, area, a, 5,this.orden)}</td></tr>
            `
          }
        }).join('')
        const ausJ = this.ausenciasArea(data, area, 'ausJ')
        const ausS = this.ausenciasArea(data, area, 'ausS')
        const notasArea = this.periodosVisibles.map(p => `<td>${this.orden !== 98 ? this.promedioAreaPorPeriodo(data, area, p) : ''}</td>`).join('')
        const promArea = this.orden !== 98 ? this.promedioArea(data, area) : ''
        const finalArea = this.orden !== 98 && this.orden != 99 ? this.promedioFinalArea(data, area, idMatricula) : this.orden === 99 ? this.promedioArea(data, area) : ''
        const desArea = this.orden !== 98 ? this.desempenoArea(finalArea, area, this.tipoArea,this.orden) : '' //this.desempeño(finalArea)
        const ausJArea = this.orden == 98 ? '' : ausJ > 0 ? ausJ : ''
        const ausSArea = this.orden == 98 ? '' : ausS > 0 ? ausS : ''
        const ihArea = this.orden !== 98 ? this.intensidadHorariaArea(data, area) : ''
        if (this.colDesem == 7) {
          return `
            <tr class="fila-area">
              <td style="text-align: left"><strong>${this.nombreDelArea(area)}</strong></td>
              <td>${ihArea}</td>
              ${notasArea}
              <td>${promArea}</td>
              <td></td><td></td><td></td>
              <td>${finalArea > 0 ? finalArea : finalArea}</td>
              <td>${desArea}</td>
              <td>${ausJArea}</td>
              <td>${ausSArea}</td>
            </tr>
            ${filasAsignaturas}
          `
        } else {
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
        }
      }).join('')
    },
    mostrarHabilitacion(idMatricula,idAsignaturaCurso) {
      const meta = this.listaHabilitaciones.find(h => h.id_matricula === idMatricula && h.id_asignatura_curso === idAsignaturaCurso)
      if (!(meta === undefined)) {
        const valor = meta.habilitacion > 0 ? meta.habilitacion.toFixed(1) : ''
        const fechita = meta.fecha !== null && meta.fecha !== '' ? meta.fecha.substr(0,10) : ''
        const actica = meta.acta != null ? meta.acta : ''
        return {habilitacion: valor, acta: actica, fecha: fechita }
      } else {
        return {habilitacion: '', acta: '', fecha: ''}
      }
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
    descriptorAsignatura(est, area, asignatura, periodo, ordencito) {
      const datos = est.areas?.[area]?.asignaturas?.[asignatura]
      const meta = this.listaAreasAsignaturas.find(
        a => a.area === area && a.asignatura === asignatura
      )
      if (!datos || !meta) return ''
      // Si la asignatura tiene pd === "S", usamos el campo inclusion directamente
      if (datos.pd === 'S' || datos.concep === 'S' ) {
        return datos.inclusion || ''
      }
      let notaFinal = 0
      if (ordencito === 99 && this.tipoValComp == 0) {
        notaFinal = parseFloat(this.notaFinal(est, area, asignatura, periodo))
        notaFinal = this.escala
      } else {
        // Obtener la nota final del estudiante
        notaFinal = parseFloat(this.notaFinal(est, area, asignatura, periodo))
      }
      //console.log(notaFinal)
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
    desempeno(nota, area, tipo, orden) {
      if (orden == 99) {
        if (nota == 'I') return 'Insuficiente'
        else if (nota == 'A') return 'Aceptable'
        else if (nota == 'B') return 'Bueno'
        else if (nota == 'E') return 'Excelente'
        else return ''
      } else {
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
      }
    },
    desempenoArea(nota, area, tipo, orden) {
      if (orden == 99) {
        if (nota == 'I') return 'Insuficiente'
        else if (nota == 'A') return 'Aceptable'
        else if (nota == 'B') return 'Bueno'
        else if (nota == 'E') return 'Excelente'
        else return ''
      } else {
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
      }
    },
    calcularPromedioGeneralPorAreasFinales(est,idMatricula) {
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
        const notaFinalArea = parseFloat(this.promedioArea(est, area, idMatricula)) // parseFloat(this.notaFinalArea(est, area))
        if (!isNaN(notaFinalArea)) {
          total += notaFinalArea
          cantidad++
        }
      })
      return cantidad > 0 ? (total / cantidad).toFixed(3) : '0.000'
    },
    estadosFinalesEstudiante(est,idMatricula) {
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
      let cantPerdidas = 0
      areasEvaluativas.forEach(area => {
        const meta = this.listaAreasAsignaturas.find( a => a.area === area)
        const idTipoEspecialidadArea = meta?.idTipoArea
        const notaFinalArea = parseFloat(this.promedioFinalArea(est, area, idMatricula)) // parseFloat(this.notaFinalArea(est, area))
        if (!isNaN(notaFinalArea)) {
          if (idTipoEspecialidadArea === 1) {
            if (notaFinalArea < this.umbralesA[0]) cantPerdidas++
          } else {
            if (notaFinalArea < this.umbralesT[0]) cantPerdidas++
          }
        }
      })
      if (this.perdioPorHabilitacion == 1) cantPerdidas = 100
      return cantPerdidas == 0 ? 'EL ESTUDIANTE APROBÓ EL GRADO' : 'ESTUDIANTE REPROBADO'
    },
    generarRankingCurso(idMatricula) {
      const ranking = []
      Object.entries(this.estudiantesNotas).forEach(([nombre, est]) => {
        const promedio = parseFloat(this.calcularPromedioGeneralPorAreasFinales(est,idMatricula))
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
          puesto++
        }
        
      }
      return ranking
    },
    puestoEstudiante(nombre,idMatricula) {
      const ranking = this.generarRankingCurso(idMatricula)
      const encontrado = ranking.find(e => e.nombre === nombre)
      return encontrado?.puesto || ''
    },
    definitivaPeriodo(est, area, asignatura, periodo) {
      const concep = est.areas?.[area]?.asignaturas?.[asignatura]?.concep
      if (concep === "S") return ''
      const orden = est.areas?.[area]?.asignaturas?.[asignatura]?.orden
      const nota = est.areas?.[area]?.asignaturas?.[asignatura]?.definitivas?.[periodo]
      if (orden == 99 && this.tipoValComp == 0) {
        this.escala = this.letrasCompor.findIndex(valor => valor === nota)
        if (this.escala == 1) this.escala = 3.5
        else if (this.escala == 2) this.escala = 4
        else if (this.escala == 3) this.escala = 5
        else this.escala = 2
        return nota
      } else {
        return typeof nota === 'number' && nota > 0 ? nota.toFixed(1) : ''
      }
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
      const concep = est.areas?.[area]?.asignaturas?.[asignatura]?.concep
      if (concep === "S") return ''
      const orden = est.areas?.[area]?.asignaturas?.[asignatura]?.orden
      const asig = est.areas?.[area]?.asignaturas?.[asignatura]
      if (!asig) return ''
      let total = 0
      let cant = 0
      if (orden == 99 && this.tipoValComp == 0) {
        for (const p in asig.periodos) {
          const nota = asig.periodos[p]
          let encontrarLetra = this.letrasCompor.findIndex(valor => valor === nota)
          total += this.umbralesA[encontrarLetra]
          cant++
        }
        let promedioLetras = cant > 0 ? this.redondear(total / cant).toFixed(1): 0
        if (promedioLetras <= this.umbralesA[0]) return this.letrasCompor[0]
        else if (promedioLetras <= this.umbralesA[1]) return this.letrasCompor[1]
        else if (promedioLetras <= this.umbralesA[2]) return this.letrasCompor[2]
        else if (promedioLetras <= this.umbralesA[3]) return this.letrasCompor[3]
        else return promedioLetras
      } else {
        if (this.$store.state.idInstitucion == 'acaa36d0-fcb1-11ec-8267-536b07c743c4') { // Emiliani
          const pesos = [20,20,30,30]
          if( orden == 12) {
            let cantidad = 0 
            for (let p = 1; p <= 4; p++) {
              const nota = asig.periodos[p] ?? 0
              if (nota > 0) {
                total += nota
                cantidad++
              }
            }
            if (total === 0) return ''
            total = total / cantidad
            return this.redondear(total).toFixed(1) > 0 ? this.redondear(total).toFixed(1) : ''
          } else {
            for (let p = 1; p <= 4; p++) {
              const nota = asig.periodos[p] ?? 0
              total += nota * pesos[p-1] / 100
            }
            return this.redondear(total).toFixed(1) > 0 ? this.redondear(total).toFixed(1) : '*'
          }
        } else if (this.$store.state.idInstitucion == 'eb58bf60-fc83-11ec-a1d1-1dc2835404e5') { // Inem
          const pesos = [20,35,35,0]
          if (orden == 55) {
            let cantidad = 0
            for (let p = 1; p <= 4; p++) {
              const nota = asig.periodos[p] ?? 0
              if (nota > 0) {
                total += nota
                cantidad++
              }
            }
            if (total === 0) return ''
            total = total / cantidad
            return this.redondear(total).toFixed(1) > 0 ? this.redondear(total).toFixed(1) : ''
          } else {
            for (let p = 1; p <= 4; p++) {
              const nota = asig.periodos[p] ?? 0
              total += nota * pesos[p-1] / 100
            }
            return this.redondear(total).toFixed(1) > 0 ? this.redondear(total).toFixed(1) : ''
          }
        } else if (this.$store.state.idInstitucion == 'c50f3d80-fca0-11ec-8267-536b07c743c4') { // Silvino
          const nota = asig.periodos[5] ?? 0
          return nota > 0 ? nota.toFixed(1) : ''
        } else if (this.$store.state.idInstitucion == '8a1bd1e0-fcb2-11ec-8267-536b07c743c4') { // Libertador
          const nota = asig.periodos[5] ?? 0
          return nota > 0 ? nota.toFixed(1) : ''
        } else {
          let cantidad = 0 
          for (let p = 1; p <= 4; p++) {
            const nota = asig.periodos[p] ?? 0
            if (nota > 0) {
              total += nota
              cantidad++
            }
          }
          if (total === 0) return ''
          const promedio = total / cantidad
          return this.redondear(promedio).toFixed(1) > 0 ? this.redondear(promedio).toFixed(1) : ''
        }
      }
    },
    notaFinalArea(est, area) {
      let asigns = ''
      if (this.promCompor == 1) { // Promedia comportamiento
        asigns = this.listaAreasAsignaturas.filter(a => a.area === area && a.orden !== 98)
      } else {
        asigns = this.listaAreasAsignaturas.filter(a => a.area === area && a.orden !== 99 && a.orden !== 98)
      }
      if (!asigns.length) return '*'       
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
    promedioAsignaturaDefinitivo(est, area, asignatura,idMatricula) {
      const concep = est.areas?.[area]?.asignaturas?.[asignatura]?.concep
      if (concep === "S") return ''
      const orden = est.areas?.[area]?.asignaturas?.[asignatura]?.orden
      const asig = est.areas?.[area]?.asignaturas?.[asignatura]
      const idAsignaturaCurso = est.areas?.[area]?.asignaturas?.[asignatura]?.idAsignaturaCurso
      const habilit = this.mostrarHabilitacion(idMatricula,idAsignaturaCurso)
      const habilitacion = habilit.habilitacion > 0 ? habilit.habilitacion : 0
      if (!asig) return '' 
      let total = 0
      let cant = 0
      if (orden == 99 && this.tipoValComp == 0) {
        for (const p in asig.periodos) {
          const nota = asig.periodos[p]
          let encontrarLetra = this.letrasCompor.findIndex(valor => valor === nota)
          total += this.umbralesA[encontrarLetra]
          cant++
        }
        let promedioLetras = cant > 0 ? this.redondear(total / cant).toFixed(1): 0
        if (promedioLetras <= this.umbralesA[0]) return this.letrasCompor[0]
        else if (promedioLetras <= this.umbralesA[1]) return this.letrasCompor[1]
        else if (promedioLetras <= this.umbralesA[2]) return this.letrasCompor[2]
        else if (promedioLetras <= this.umbralesA[3]) return this.letrasCompor[3]
        else return promedioLetras
      } else {
        if (this.$store.state.idInstitucion == 'acaa36d0-fcb1-11ec-8267-536b07c743c4') { // Emiliani
          const pesos = [20,20,30,30]
          if( orden == 12) {
            let cantidad = 0 
            for (let p = 1; p <= 4; p++) {
              const nota = asig.periodos[p] ?? 0
              if (nota > 0) {
                total += nota
                cantidad++
              }
            }
            if (total === 0) return ''
            total = total / cantidad
            return this.redondear(total).toFixed(1) > 0 ? this.redondear(total).toFixed(1) : ''
          } else {
            for (let p = 1; p <= 4; p++) {
              const nota = asig.periodos[p] ?? 0
              total += nota * pesos[p-1] / 100
            }
            return this.redondear(total).toFixed(1) > 0 ? this.redondear(total).toFixed(1) : '*'
          }
        } else if (this.$store.state.idInstitucion == 'eb58bf60-fc83-11ec-a1d1-1dc2835404e5') { // Inem
          const pesos = [20,35,35,0]
          if (orden == 55) {
            let cantidad = 0
            for (let p = 1; p <= 4; p++) {
              const nota = asig.periodos[p] ?? 0
              if (nota > 0) {
                total += nota
                cantidad++
              }
            }
            if (total === 0) return ''
            total = total / cantidad
            return this.redondear(total).toFixed(1) > 0 ? this.redondear(total).toFixed(1) : ''
          } else {
            for (let p = 1; p <= 4; p++) {
              const nota = asig.periodos[p] ?? 0
              total += nota * pesos[p-1] / 100
            }
            return this.redondear(total).toFixed(1) > 0 ? this.redondear(total).toFixed(1) : ''
          }
        } else if (this.$store.state.idInstitucion == 'c50f3d80-fca0-11ec-8267-536b07c743c4') { // Silvino
          const nota = asig.periodos[5] ?? 0
          return nota > 0 ? nota.toFixed(1) : ''
        } else if (this.$store.state.idInstitucion == '8a1bd1e0-fcb2-11ec-8267-536b07c743c4') { // Libertador
          const nota = asig.periodos[5] ?? 0
          return nota > 0 ? nota.toFixed(1) : ''
        } else {
          let cantidad = 0 
          for (let p = 1; p <= 4; p++) {
            const nota = asig.periodos[p] ?? 0
            if (nota > 0) {
              total += nota
              cantidad++
            }
          }
          if (total === 0) return ''
          const promedio = total / cantidad
          return this.redondear(promedio).toFixed(1) > 0 ? habilitacion > this.redondear(promedio).toFixed(1) ? habilitacion : this.redondear(promedio).toFixed(1) : ''
        }
      }
    },
    promedioFinalArea(est, area, idMatricula) {
      const asigns = Object.keys(est.areas?.[area]?.asignaturas || {})
      if (!asigns.length) return ''
      const orden = est.areas?.[area]?.asignaturas?.[asigns]?.orden
      const asignatura = asigns.reduce((asig) => asig)
      if (orden == 99 && this.tipoValComp == 0) return this.promedioAsignaturaDefinitivo(est, area, asignatura, idMatricula)
      if (this.$store.state.idInstitucion == 'acaa36d0-fcb1-11ec-8267-536b07c743c4' && this.orden == 12) { // Emiliani
        return '*'
      } 
      const total = asigns.reduce((sum, asig) => sum + parseFloat(this.promedioAsignaturaDefinitivo(est, area, asig, idMatricula) * est.areas?.[area]?.asignaturas?.[asig]?.porcentaje / 100), 0)
      return total > 0 ?  this.redondear(total).toFixed(1) : ''
    },
    promedioArea(est, area) {
      const asigns = Object.keys(est.areas?.[area]?.asignaturas || {})
      if (!asigns.length) return ''
      const orden = est.areas?.[area]?.asignaturas?.[asigns]?.orden
      const asignatura = asigns.reduce((asig) => asig)
      if (orden == 99 && this.tipoValComp == 0) return this.promedioAsignatura(est, area, asignatura)
      if (this.$store.state.idInstitucion == 'acaa36d0-fcb1-11ec-8267-536b07c743c4' && this.orden == 12) { // Emiliani
        return '*'
      } 
      const total = asigns.reduce((sum, asig) => sum + parseFloat(this.promedioAsignatura(est, area, asig) * est.areas?.[area]?.asignaturas?.[asig]?.porcentaje / 100), 0)
      return total > 0 ?  this.redondear(total).toFixed(1) : ''
    },
    promedioAreaPorPeriodo(est, area, periodo) {
      const asigns = Object.keys(est.areas?.[area]?.asignaturas || {})
      if (!asigns.length) return ''
      const concep = est.areas?.[area]?.asignaturas?.[asigns]?.concep
      if (concep === "S") return ''
      const orden = est.areas?.[area]?.asignaturas?.[asigns]?.orden
      if (orden == 99 && this.tipoValComp == 0) return est.areas?.[area]?.asignaturas?.[asigns]?.periodos?.[periodo] || ''
      if (this.$store.state.idInstitucion == 'acaa36d0-fcb1-11ec-8267-536b07c743c4' && this.orden == 12) { // Emiliani
        return '*'
      } 
      const total = asigns.reduce((sum, asig) => {
        const nota = est.areas?.[area]?.asignaturas?.[asig]?.periodos?.[periodo] * est.areas?.[area]?.asignaturas?.[asig]?.porcentaje / 100
        return sum + (typeof nota === 'number' ? nota : 0)
      }, 0)
      return total > 0 ?  this.redondear(total).toFixed(1) : ''
    },
    ausencias(est, area, asignatura, tipo) {
      return Number(est.areas?.[area]?.asignaturas?.[asignatura]?.[tipo]) || 0
    },
    ausenciasArea(est, area, tipo) {
      const asigns = Object.keys(est.areas?.[area]?.asignaturas || {})
      return asigns.reduce((sum, asig) => sum + Number(this.ausencias(est, area, asig, tipo)), 0)
    },
    intensidadHorariaAsignatura(est, area, asignatura) {
      return est.areas?.[area]?.asignaturas?.[asignatura]?.intensidadHoraria || ''
    },
    intensidadHorariaArea(est, area) {
      const asigns = Object.keys(est.areas?.[area]?.asignaturas || {})
      return asigns.reduce((sum, asig) => sum + this.intensidadHorariaAsignatura(est, area, asig), 0)
    },
    notaPeriodo(est, area, asignatura, periodo) {
      const concep = est.areas?.[area]?.asignaturas?.[asignatura]?.concep
      if (concep === "S") return ''
      const orden = est.areas?.[area]?.asignaturas?.[asignatura]?.orden
      if (orden == 99 && this.tipoValComp == 0) return est.areas?.[area]?.asignaturas?.[asignatura]?.periodos?.[periodo] || ''
      return est.areas?.[area]?.asignaturas?.[asignatura]?.periodos?.[periodo]?.toFixed(1) > 0 ? est.areas?.[area]?.asignaturas?.[asignatura]?.periodos?.[periodo]?.toFixed(1) : ''
    },
    criterio1Periodo(est, area, asignatura, periodo) {
      const concep = est.areas?.[area]?.asignaturas?.[asignatura]?.concep
      if (concep === "S") return ''
      const orden = est.areas?.[area]?.asignaturas?.[asignatura]?.orden
      if (orden == 99 && this.tipoValComp == 0) return est.areas?.[area]?.asignaturas?.[asignatura]?.c1?.[periodo] || ''
      return est.areas?.[area]?.asignaturas?.[asignatura]?.c1?.[periodo]?.toFixed(1) || ''
    },
    criterio2Periodo(est, area, asignatura, periodo) {
      const concep = est.areas?.[area]?.asignaturas?.[asignatura]?.concep
      if (concep === "S") return ''
      const orden = est.areas?.[area]?.asignaturas?.[asignatura]?.orden
      if (orden == 99 && this.tipoValComp == 0) return est.areas?.[area]?.asignaturas?.[asignatura]?.c2?.[periodo] || ''
      return est.areas?.[area]?.asignaturas?.[asignatura]?.c2?.[periodo]?.toFixed(1) || ''
    },
    criterio3Periodo(est, area, asignatura, periodo) {
      const concep = est.areas?.[area]?.asignaturas?.[asignatura]?.concep
      if (concep === "S") return ''
      const orden = est.areas?.[area]?.asignaturas?.[asignatura]?.orden
      if (orden == 99 && this.tipoValComp == 0) return est.areas?.[area]?.asignaturas?.[asignatura]?.c3?.[periodo] || ''
      return est.areas?.[area]?.asignaturas?.[asignatura]?.c3?.[periodo]?.toFixed(1) || ''
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
          C1,
          C2,
          C3,
          definitivacompor,
          fechaR,
          inclusion,
          observaciones,
          pd,
          concep,
          ausJ,
          ausS,
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
            idAsignaturaCurso: meta?.idAsignaturaCurso,
            intensidadHoraria: meta?.ih || 0,
            orden: meta?.orden || 0,
            porcentaje: meta?.porcentaje || 100,
            docente: meta?.docente || '',
            periodos: {},
            definitivas: {},
            recuperaciones: {},
            c1: {},
            c2: {},
            c3: {},
            definitiva: null,
            recuperacion: null,
            C1: null,
            C2: null,
            C3: null,
            definitivacompor: null,
            fechaR: null,
            inclusion: null,
            observaciones: null,
            pd: null,
            concep: null,
            ausJ: 0,
            ausS: 0,
          }
        }
        const asig = est.areas[area].asignaturas[asignatura]
        if (asig.orden == 99 && this.tipoValComp == 0) {
          asig.periodos[periodo] = definitivacompor
          asig.definitivas[periodo] = definitivacompor
          asig.recuperaciones[periodo] = ''
          asig.c1[periodo] = ''
          asig.c2[periodo] = ''
          asig.c3[periodo] = ''
          asig.definitiva = definitivacompor
          asig.recuperacion = ''
          asig.fechaR = fechaR
          asig.inclusion = inclusion
          asig.observaciones = observaciones
          asig.pd = pd
          asig.concep = concep
        } else {
          asig.periodos[periodo] = recuperacion > definitiva ? recuperacion : definitiva
          asig.definitivas[periodo] = definitiva
          asig.recuperaciones[periodo] = recuperacion
          asig.c1[periodo] = C1
          asig.c2[periodo] = C2
          asig.c3[periodo] = C3
          asig.definitiva = definitiva
          asig.recuperacion = recuperacion
          asig.fechaR = fechaR
          asig.inclusion = inclusion
          asig.observaciones = observaciones
          asig.pd = pd
          asig.concep = concep
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
    this.letrasCompor = ['J','B','A','S'] //Aqui van las letrs del comportamiento
    this.escudo = "https://siedutunja.gov.co/api/colegios/escudos/" + this.$store.state.escudoInstitucion
    this.colDesem = 7
    this.datosSeccion = this.$store.state.datosSecciones[this.$store.state.idSeccion - 1]
  }
}
</script>
<style scoped>
</style>