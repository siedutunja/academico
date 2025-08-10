<template>
  <div>
    <div class="informe-estudiantes">
      <div ref="contenido">
        <div v-for="(est, index) in estudiantesSeleccionados" :key="est.idMatricula" class="bloque-est">
          <div class="encabezado">
            <p>SECRETARÍA DE EDUCACIÓN TERRITORIAL DE TUNJA<br><b>{{$store.state.nombreInstitucion}}</b><br>TUNJA - BOYACÁ<br>OBSERVADOR DEL ESTUDIANTE<br></p>
          </div>
          <table class="tabla-estudiantes">
            <thead>
              <tr>
                <th>Sede: <b>{{ est.estudiante }}</b></th>
                <th>Curso: <b>{{ est.documento }}</b></th>
                <th>Jornada: <b>{{ est.pais }}</b></th>
                <th>Año: <b>{{ $store.state.aLectivo }}</b></th>
              </tr>
            </thead>
          </table>
          <p style="text-align: right; margin-top: -20px; font-size: 11px;" class="text-muted"><i>{{ fechaImpresion }}</i></p>
          <div v-if="index < estudiantesSeleccionados.length - 1" class="page-break"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'formatoobservador',
    props: {
      estudiantesSeleccionados: Array
    },
    components: {
    },
    data () {
      return {

      }
    },
    methods: {
    },
    beforeMount() {
    }
  }
</script>