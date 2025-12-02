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
    escalaPreescolar: Object,
    nuevaEscalaPreescolar: Array,
    firmasBoletin: String,
  },
  data () {
    return {
      escudo: null,
      asignatur: null,
      orden: null
    }
  },
  methods: {
    generarHTMLBoletines() {
      const estudiantes = this.estudiantesSeleccionados.map(sel =>
        this.datosEstudiantes.find(e => e.idMatricula === sel.idMatricula)
      )
      const estructura = this.estructurarNotasPorEstudiante()
      const html = `
        <html>
        <head>
          <title>Boletines</title>
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
      const cuerpo = `
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
          ${this.generarHTMLBoletinPreescolar(data)}
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
    generarHTMLBoletinPreescolar(est) {
      const periodos = this.periodosVisibles
      const areas = [...new Set(this.listaAreasAsignaturas.map(a => a.area))]
      const nombreArea = area => {
        const meta = this.listaAreasAsignaturas.find(a => a.area === area)
        return meta?.nombreArea || area
      }
      let html = `
        <style>
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
          .fila-insuficiente { background-color: #fdecea; }
          .fila-bueno        { background-color: #fff9db; }
          .fila-aceptable    { background-color: #eaf4fc; }
          .fila-sobresaliente{ background-color: #eafaf1; }
          .resumen-final     { margin-top: 2rem; font-size: 15px; }
        </style>
        <table class="tabla-boletin">
          <thead>
            <tr>
              <th rowspan="2">Área / Asignatura</th>
              <th rowspan="2">IH</th>
              <th colspan="${this.periodosVisibles.length + 1}">Historial</th>
              <th colspan="4">Desempeño Definitivo</th>
            </tr>
            <tr>
              ${periodos.map(p => `<th>P${p}</th>`).join('')}
              <th>Definitiva</th>
              <th>Desempeño</th>
              <th>AusJ</th>
              <th>AusS</th>
            </tr>
          </thead>
          <tbody>
      `

      areas.forEach(area => {
        const asigns = this.listaAreasAsignaturas.filter(a => a.area === area)
        const notasArea = this.periodosVisibles.map(p => `<td></td>`).join('') //this.periodosVisibles.map(p => `<td>${this.orden !== 99 ? this.letraDesdeValor(this.promedioAreaPorPeriodo(est, area, p)) : this.promedioAreaPorPeriodoComportamiento(est, area, p)}</td>`).join('')
        const desempeño = '' //this.datosDesempenoPorLetra(this.letraDesdeValor(this.promedioAreaPorPeriodo(est, area, this.periodoActual)))
        html += `
          <tr class="fila-area">
            <td style="text-align: left"><strong>${nombreArea(area)}</strong></td>
            <td></td>
            ${ notasArea }
            <td></td>
            <td></td> 
            <td></td>
            <td></td>
          </tr>
        `
        asigns.forEach(({ asignatura, ih, orden, nombreAsignatura, docente }) => {
          this.orden = orden
          const datos = est.areas?.[area]?.asignaturas?.[asignatura]
          if (!datos) return
          const promedio = this.letraDesdeValor(this.promedioAsignaturaPreescolar(datos,orden),orden)
          const notaActual = datos.periodos?.[this.periodoActual] || ''
          const desempeño = this.datosDesempenoPorLetra(promedio,orden)
          html += `
            <tr>
              <td style="text-align: left"><strong>${nombreAsignatura}</strong> <br> <i style="font-size: 10px;">${docente}</i></td>
              <td>${ih}</td>
              ${periodos.map(p => `<td>${orden === 98 ? '' : datos.periodos?.[p] != 0 ? datos.periodos?.[p] : '' || ''}</td>`).join('')}
              <td>${orden === 98 ? '' : promedio}</td>
              <td>${orden === 98 ? '' : desempeño.texto} </td>
              <td>${datos.ausJ || 0}</td>
              <td>${datos.ausS || 0}</td>
            </tr>
          `
          html += `<tr><td colspan="10" class="descriptor" style="text-align: left">${ this.descriptorDesdeLetraFlexible(est, area, asignatura, this.periodoActual, orden)}</td></tr>`
        })
      })
      html += `
          </tbody>
        </table>
        <table class="tabla-boletin">
          <thead>
            <tr>
              <th style="width:40%; text-align: left"><strong>APROBÓ EL GRADO</strong></th>
              <th style="width:30%; text-align: left">Aus.Justificadas: <strong>${est.ausJ}</strong></th>
              <th style="width:30%; text-align: left">Aus.SinJustificar: <strong>${est.ausJ}</strong></th>
            </tr>
          </thead>
        </table>
      `
      return html
    },
    valorNumericoDesdeLetra(letra,orden) {
      if (orden==99) {
        if (this.$store.state.idInstitucion == 'bd226a20-fc82-11ec-a1d1-1dc2835404e5') { // Julius
          if (letra == 'J') return 2
          else if (letra == 'B') return 3
          else if (letra == 'S') return 4
          else if (letra == 'E') return 5
          
        } else if (this.$store.state.idInstitucion == 'f5529ba0-fcb3-11ec-8267-536b07c743c4') { // Gustavo Rojas
          if (letra == 'I') return 2
          else if (letra == 'A') return 3
          else if (letra == 'S') return 4
          else if (letra == 'E') return 5
        } else {
          if (letra == 'J') return 2
          else if (letra == 'B') return 3
          else if (letra == 'A') return 4
          else if (letra == 'S') return 5
        }
      } else {
        const escala = this.nuevaEscalaPreescolar.find(e => e.letra === letra)
        return escala?.umbral || null
      }
    },
    //ok
    conceptoDesdeValor(valor,orden) {
      if (orden == 99) {
        if (this.$store.state.idInstitucion == 'bd226a20-fc82-11ec-a1d1-1dc2835404e5') { // JULIUS
          //console.log('* ' + valor)
          if (valor < 3) {
            return { id_concepto_valorativo: 1, letra: 'J', texto: 'BAJO' }
          } else if (valor < 4) {
            return { id_concepto_valorativo: 2, letra: 'B', texto: 'BÁSICO' }
          } else if (valor < 5) {
            return { id_concepto_valorativo: 3, letra: 'S', texto: 'SOBRESALIENTE' }
          } else if (valor == 5) {
            return { id_concepto_valorativo: 4, letra: 'E', texto: 'EXCELENTE' }
          } else {
            return ''
          }
        } else {
          if (valor < 3) {
            return { id_concepto_valorativo: 1, letra: 'J', texto: 'BAJO' }
          } else if (valor < 4) {
            return { id_concepto_valorativo: 2, letra: 'B', texto: 'BÁSICO' }
          } else if (valor < 5) {
            return { id_concepto_valorativo: 3, letra: 'S', texto: 'SOBRESALIENTE' }
          } else if (valor == 5) {
            return { id_concepto_valorativo: 4, letra: 'E', texto: 'EXCELENTE' }
          } else {
            return ''
          }
        }
      } else {
        for (let i = 0; i < this.nuevaEscalaPreescolar.length; i++) {
          const actual = this.nuevaEscalaPreescolar[i]
          const siguiente = this.nuevaEscalaPreescolar[i + 1]

          // Valor menor al siguiente umbral, cae en el rango actual
          if (!siguiente || valor < siguiente.umbral) {
            return {
              id_concepto_valorativo: i + 1, // 1=Bajo, 2=Básico, etc.
              letra: actual.letra,
              texto: actual.desempeno
            }
          }
        }
      }
      return null
    },
    letraDesdeValor(valor,orden) {
      const concepto = this.conceptoDesdeValor(valor,orden)
      if (orden == 99) {
        //console.log(valor + '-' + concepto?.letra || '')
      }
      return concepto?.letra || ''
    },
    datosDesempenoPorLetra(letra,orden) {
      let desempe = ''
      if(orden == 99) {
        if (this.$store.state.idInstitucion == 'bd226a20-fc82-11ec-a1d1-1dc2835404e5') { // Julius
          if (letra == 'J') desempe = 'BAJO'
          else if (letra == 'B') desempe = 'BÁSICO'
          else if (letra == 'S') desempe = 'SOBRESALIENTE'
          else if (letra == 'E') desempe = 'EXCELENTE'
        } else if (this.$store.state.idInstitucion == 'f5529ba0-fcb3-11ec-8267-536b07c743c4') { // Gustavo Rojas
          if (letra == 'I') desempe = 'INSUFICIENTE'
          else if (letra == 'A') desempe = 'ACEPTABLE'
          else if (letra == 'S') desempe = 'SOBRESALIENTE'
          else if (letra == 'E') desempe = 'EXCELENTE'
        } else {
          desempe = ''
        }
        return {
          emoji: '',
          texto: desempe,
          color: '#555' // opcional
        }
      } else {
        const mapaEmoji = ['😞', '🙂', '😊', '😄']
        const index = this.nuevaEscalaPreescolar.findIndex(e => e.letra === letra)
        if (index === -1) {
          return { emoji: '', texto: '', color: '#aaa' }
        }
        const escala = this.nuevaEscalaPreescolar[index]
        return {
          emoji: mapaEmoji[index],
          texto: escala.desempeno || 'Sin descripción',
          color: this.colorPorIndice?.[index] || '#555' // opcional
        }
      }
    },
    descriptorDesdeLetraFlexible(est, area, asignatura, periodo, orden) {
      const meta = this.listaAreasAsignaturas.find(
        a => a.area === area && a.asignatura === asignatura
      )
      const datos = est.areas?.[area]?.asignaturas?.[asignatura]
      if (!meta || !datos) return ''

      if (datos.pd === 'S' || datos.concep === 'S') {
        return datos.inclusion || ''
      }
      const letra = datos.periodos?.[periodo] || ''
      const valor = this.valorNumericoDesdeLetra(letra,orden)
      if (valor === null) return ''
      const concepto = this.conceptoDesdeValor(valor,orden)
      if (!concepto) return ''

      const descriptorObj = this.listaDescriptores.find(
        d =>
          d.idAsignaturaCurso === meta.idAsignaturaCurso &&
          d.id_concepto_valorativo === concepto.id_concepto_valorativo
      )
      return descriptorObj?.descriptor || '*'
    },
    promedioAreaPorPeriodo(est, area, periodo) {
      const asigns = this.listaAreasAsignaturas.filter(a => a.area === area && a.orden !== 99)
      let total = 0
      let pesoTotal = 0

      asigns.forEach(({ asignatura, porcentaje }) => {
        const datos = est.areas?.[area]?.asignaturas?.[asignatura]
        const letra = datos?.periodos?.[periodo] || ''
        const valor = this.escalaPreescolar?.[letra]

        if (valor !== undefined) {
          total += valor * (porcentaje / 100)
          pesoTotal += porcentaje
        }
      })

      return pesoTotal > 0 ? this.redondear(total).toFixed(1) : ''
    },
    promedioAreaPorAsignaturas(est, area) {
      const asigns = this.listaAreasAsignaturas.filter(a => a.area === area && a.orden !== 99)
      let total = 0
      let pesoTotal = 0

      asigns.forEach(({ asignatura, porcentaje }) => {
        const datos = est.areas?.[area]?.asignaturas?.[asignatura]
        if (!datos) return

        const periodos = Object.values(datos.periodos || {})
        const valores = periodos
          .map(letra => this.escalaPreescolar?.[letra])
          .filter(v => v !== undefined)

        if (valores.length > 0) {
          const prom = valores.reduce((a, b) => a + b, 0) / valores.length
          total += prom * (porcentaje / 100)
          pesoTotal += porcentaje
        }
      })

      return pesoTotal > 0 ? total.toFixed(2) : ''
    },
    promedioAsignaturaPreescolar(asig,orden) {
      const periodos = Object.values(asig.periodos || {})
      const valores = periodos.map(p => this.valorNumericoDesdeLetra(p,orden)).filter(v => v !== null)
      if (!valores.length) return ''
      const prom = valores.reduce((a, b) => a + b, 0) / valores.length
      return prom.toFixed(2)
    },
    notaFinalAreaPreescolar(est, area) {
      const asigns = this.listaAreasAsignaturas.filter(
        a => a.area === area && a.orden !== 99
      )
      let total = 0
      let pesoTotal = 0
      asigns.forEach(({ asignatura, porcentaje }) => {
        const datos = est.areas?.[area]?.asignaturas?.[asignatura]
        if (!datos) return
        const notaLetra = datos.periodos?.[this.periodoActual] || ''
        const valor = this.valorNumericoDesdeLetra(notaLetra)
        if (valor !== null) {
          total += valor * (porcentaje / 100)
          pesoTotal += porcentaje
        }
      })
      return pesoTotal > 0 ? total.toFixed(2) : ''
    },
    promedioGeneralPreescolar(est) {
      const areas = [...new Set(this.listaAreasAsignaturas.map(a => a.area))]
      let total = 0, cantidad = 0
      areas.forEach(area => {
        const valor = parseFloat(this.notaFinalAreaPreescolar(est, area))
        if (!isNaN(valor)) {
          total += valor
          cantidad++
        }
      })
      return cantidad > 0 ? (total / cantidad).toFixed(2) : ''
    },
    puestoEstudiantePreescolar(nombre) {
      const lista = Object.entries(this.estudiantesNotas).map(([n, est]) => ({
        nombre: n,
        promedio: parseFloat(this.promedioGeneralPreescolar(est))
      })).sort((a, b) => b.promedio - a.promedio)
      let puesto = 1
      for (let i = 0; i < lista.length; i++) {
        if (i > 0 && lista[i].promedio === lista[i - 1].promedio) {
          lista[i].puesto = lista[i - 1].puesto
        } else {
          lista[i].puesto = puesto
        }
        puesto++
      }
      const encontrado = lista.find(e => e.nombre === nombre)
      return encontrado?.puesto || ''
    },
    getEmojiPromedio(promedio) {
      if (promedio < 3.5) return '😞'
      if (promedio < 4.0) return '🙂'
      if (promedio < 4.6) return '😊'
      return '😄'
    },

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
    desempeno(nota, area, asignatura) {
      if (this.orden == 99) {
        if (this.$store.state.idInstitucion == 'bd226a20-fc82-11ec-a1d1-1dc2835404e5') { // JULIUS
          if (nota == 'J') return 'BAJO'
          if (nota == 'B') return 'BÁSICO'
          if (nota == 'S') return 'SOBRESALIENTE'
          if (nota == 'E') return 'EXCELENTE'
          return ''
        } else {
          if (nota == 'J') return 'Bajo'
          if (nota == 'B') return 'Básico'
          if (nota == 'S') return 'Sobresaliente'
          if (nota == 'E') return 'Excelente'
          return ''
        }
      } else {
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
      }
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
    promedioAreaPorPeriodoComportamiento(est, area, periodo) {
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
          definitivapree,
          fechaR,
          inclusion,
          observaciones,
          pd,
          concep,
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
            definitivapree: null,
            fechaR: null,
            inclusion: null,
            observaciones: null,
            pd: null,
            concep: null,
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
          asig.concep = concep
        } else {
          asig.periodos[periodo] = definitivapree
          asig.definitivas[periodo] = definitivapree
          asig.recuperaciones[periodo] = ''
          asig.definitiva = definitivapree
          asig.recuperacion = ''
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
    this.escudo = "https://siedutunja.gov.co/api/colegios/escudos/" + this.$store.state.escudoInstitucion
  }
}
</script>
<style scoped>
</style>