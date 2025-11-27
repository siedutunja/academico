import Vue from 'vue'
import Router from 'vue-router'
import autenticar from "@/auth/autenticar.js";


Vue.use(Router)
export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [
    // 2024-10-21
    {
      path: '/',
      redirect: '/inicio',
      name: 'Inicio',
      component: () => import('@/containers/TheContainer'),
      children: [
        // 2024-10-21
        {
          path: 'inicio',
          //beforeEnter: autenticar,
          component: () => import('@/views/Inicio')
        },
        // 2024-10-22
        {
          path: 'matriculas',
          redirect: '/matriculas/matriculax',  
          name: 'Matriculas',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            // 2025-01-27
            {
              path: 'fichamatriculanueva',
              beforeEnter: autenticar,
              name: 'Ficha Matricula Nueva',
              component: () => import('@/views/matriculas/FichaMatriculaNueva')
            },
            // 2024-11-22
            {
              path: 'carpetamatricula',
              beforeEnter: autenticar,
              name: 'Consultar Carpeta Matricula',
              component: () => import('@/views/matriculas/CarpetaMatricula')
            },
            // 2024-11-19
            {
              path: 'buscarrenovacion',
              beforeEnter: autenticar,
              name: 'Buscar Estudiante Renovación',
              component: () => import('@/views/matriculas/BuscarRenovacion')
            },
            // 2025-01-27
            {
              path: 'buscarnuevo',
              beforeEnter: autenticar,
              name: 'Consultar Documento',
              component: () => import('@/views/matriculas/BuscarNuevo')
            },
            // 2024-11-19
            {
              path: 'buscarcarpetamatricula',
              beforeEnter: autenticar,
              name: 'Buscar Carpeta Matricula',
              component: () => import('@/views/matriculas/BuscarCarpetaMatricula')
            },
            // 2024-11-18
            {
              path: 'ficharenovacionmatricula',
              beforeEnter: autenticar,
              name: 'Ficha Renovación Matricula',
              component: () => import('@/views/matriculas/FichaRenovacionMatricula')
            },
            // 2024-11-18
            {
              path: 'ficharenovacionmatricula2',
              beforeEnter: autenticar,
              name: 'Ficha Renovación',
              component: () => import('@/views/matriculas/FichaRenovacionMatricula2')
            },
            // 2024-10-22
            {
              path: 'preinscritos',
              beforeEnter: autenticar,
              name: 'Matricula de Estudiante Preinscrito',
              component: () => import('@/views/matriculas/Preinscritos')
            },
            // 2024-10-22
            {
              path: 'fichamatriculapreinscrito',
              beforeEnter: autenticar,
              name: 'Ficha Matricula Preinscrito',
              component: () => import('@/views/matriculas/FichaMatriculaPreinscrito')
            },
            // 2024-10-22
            {
              path: 'fichamatriculapreinscrito2',
              beforeEnter: autenticar,
              name: 'Ficha Matricula Preinscrito2',
              component: () => import('@/views/matriculas/FichaMatriculaPreinscrito2')
            },
            // 2024-10-22
            {
              path: 'matriculadossincurso',
              beforeEnter: autenticar,
              name: 'Matriculados Sin Curso',
              component: () => import('@/views/matriculas/MatriculadosSinCurso')
            },
            // 2025-01-19
            {
              path: 'renovacionmasiva',
              beforeEnter: autenticar,
              name: 'Renovación Masiva Estudiantes',
              component: () => import('@/views/matriculas/RenovacionMasiva')
            },
            // 2025-05-05
            {
              path: 'promocionanticipada',
              beforeEnter: autenticar,
              name: 'Promoción Anticipada',
              component: () => import('@/views/matriculas/PromocionAnticipada')
            },
            // 2025-11-14
            {
              path: 'estadosfinales',
              beforeEnter: autenticar,
              name: 'Gestión Estados Finales',
              component: () => import('@/views/matriculas/EstadosFinales')
            },
            // 2025-07-20
            {
              path: 'promocion',
              beforeEnter: autenticar,
              name: 'Promoción',
              component: () => import('@/views/matriculas/Promocion')
            },
            // 2025-05-29
            {
              path: 'reubicacion',
              beforeEnter: autenticar,
              name: 'Ubicación o Reubicación',
              component: () => import('@/views/matriculas/Reubicacion')
            },
          ]
        },
        // 2024-10-26
        {
          path: 'configuracion',
          redirect: '/configuracion/sedesie',  
          name: 'Configuracion',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            // 2024-10-26
            {
              path: 'sedesie',
              beforeEnter: autenticar,
              name: 'Sedes',
              component: () => import('@/views/configuracion/SedesIE')
            },
            // 2024-10-29
            {
              path: 'gradossedeie',
              beforeEnter: autenticar,
              name: 'Grados por Sede',
              component: () => import('@/views/configuracion/GradosSedeIE')
            },
            // 2024-10-31
            {
              path: 'cursosgrado',
              beforeEnter: autenticar,
              name: 'Cursos por Grados',
              component: () => import('@/views/configuracion/CursosGrado')
            },
            // 2024-11-16
            {
              path: 'superadmin',
              beforeEnter: autenticar,
              name: 'Super Administrador',
              component: () => import('@/views/configuracion/SuperAdmin')
            },
            // 2025-01-03
            {
              path: 'listaareas',
              beforeEnter: autenticar,
              name: 'Lista de Areas',
              component: () => import('@/views/configuracion/ListaAreas')
            },
            // 2025-01-06
            {
              path: 'listaasignaturas',
              beforeEnter: autenticar,
              name: 'Lista de Asignaturas',
              component: () => import('@/views/configuracion/ListaAsignaturas')
            },
            // 2025-01-06
            {
              path: 'planestudios',
              beforeEnter: autenticar,
              name: 'Plan de Estudios',
              component: () => import('@/views/configuracion/PlanEstudios')
            },
            // 2025-01-08
            {
              path: 'seccionesie',
              beforeEnter: autenticar,
              name: 'Secciones',
              component: () => import('@/views/configuracion/SeccionesIE')
            },
            // 2025-01-09
            {
              path: 'especialidadesie',
              beforeEnter: autenticar,
              name: 'Especialidades',
              component: () => import('@/views/configuracion/EspecialidadesIE')
            },
            // 2025-01-09
            {
              path: 'rutasie',
              beforeEnter: autenticar,
              name: 'Rutas',
              component: () => import('@/views/configuracion/RutasIE')
            },
            // 2025-01-28
            {
              path: 'configurardocumentos',
              beforeEnter: autenticar,
              name: 'Configurar Documentos',
              component: () => import('@/views/configuracion/ConfigurarDocumentos')
            },
            // 2025-01-28
            {
              path: 'criteriosevaluacion',
              beforeEnter: autenticar,
              name: 'Criterios de Evaluación',
              component: () => import('@/views/configuracion/CriteriosEvaluacion')
            },
            // 2025-10-02
            {
              path: 'configurarconsultaacudiente',
              beforeEnter: autenticar,
              name: 'Configurar Consulta Acudiente',
              component: () => import('@/views/configuracion/ConfigurarConsultaAcudiente')
            },


            // 2024-10-26 ????????????????????
            {
              path: 'nuevavigencia',
              beforeEnter: autenticar,
              name: 'Nuevo Año Lectivo',
              component: () => import('@/views/configuracion/NuevaVigencia')
            },
          ]
        },
        // 2024-12-12
        {
          path: 'informes',
          redirect: '/informes/consolidadomatricula',  
          name: 'Informes y Estadísticas',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            // 2025-05-19
            {
              path: 'consolidadomatriculacursos',
              beforeEnter: autenticar,
              name: 'Consolidado Matricula Cursos',
              component: () => import('@/views/informes/ConsolidadoMatriculaCursos')
            },
            // 2025-02-22
            {
              path: 'consolidadomatricula',
              beforeEnter: autenticar,
              name: 'Consolidado Matricula',
              component: () => import('@/views/informes/ConsolidadoMatricula')
            },
            // 2025-02-22
            {
              path: 'informesagrupacion',
              beforeEnter: autenticar,
              name: 'Informes por Agrupación',
              component: () => import('@/views/informes/InformesAgrupacion')
            },
            // 2025-02-22
            {
              path: 'infoespecialidades',
              beforeEnter: autenticar,
              name: 'Informe por Especialidades',
              component: () => import('@/views/informes/InfoEspecialidades')
            },
            // 2025-02-22
            {
              path: 'inforetirados',
              beforeEnter: autenticar,
              name: 'Informe Retirados',
              component: () => import('@/views/informes/InfoRetirados')
            },
            // 2025-06-02
            {
              path: 'consolidados',
              beforeEnter: autenticar,
              name: 'Consolidados',
              component: () => import('@/views/informes/Consolidados')
            },
            // 2025-06-02
            {
              path: 'estadisticas',
              beforeEnter: autenticar,
              name: 'Estadisticas',
              component: () => import('@/views/informes/Estadisticas')
            },
          ]
        },
        // 2024-12-10
        {
          path: 'listados',
          redirect: '/listados/listadoscurso',  
          name: 'Listas y Planillas',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            // 2024-12-10
            {
              path: 'listadoscurso',
              beforeEnter: autenticar,
              name: 'Listas por Curso',
              component: () => import('@/views/listados/ListadosCurso')
            },
            // 2025-03-16
            {
              path: 'listadosdocente',
              beforeEnter: autenticar,
              name: 'Listas por Docente',
              component: () => import('@/views/listados/ListadosDocente')
            },
            // 2025-01-22
            {
              path: 'listadossincurso',
              beforeEnter: autenticar,
              name: 'Listas Sin Curso',
              component: () => import('@/views/listados/ListadosSinCurso')
            },
            // 2025-01-26
            {
              path: 'planillascurso',
              beforeEnter: autenticar,
              name: 'Planillas y Formatos por Curso',
              component: () => import('@/views/listados/PlanillasCurso')
            },
            // 2025-01-26
            {
              path: 'planillasnotas',
              beforeEnter: autenticar,
              name: 'Auxiliar con Notas',
              component: () => import('@/views/listados/PlanillasNotas')
            },
            // 2025-08-07
            {
              path: 'listadosdocentes',
              beforeEnter: autenticar,
              name: 'Listados Docentes',
              component: () => import('@/views/listados/ListadosDocentes')
            },
            // 2025-08-07
            {
              path: 'listadosestudiantes',
              beforeEnter: autenticar,
              name: 'Listados Estudiantes',
              component: () => import('@/views/listados/ListadosEstudiantes')
            },
            // 2025-08-11
            {
              path: 'descriptores',
              beforeEnter: autenticar,
              name: 'Descriptores',
              component: () => import('@/views/listados/Descriptores')
            },
            // 2025-10-23
            {
              path: 'planillamanualparcial',
              beforeEnter: autenticar,
              name: 'Planilla Manual Notas',
              component: () => import('@/views/listados/PlanillaManualParcial')
            },
          ]
        },
        // 2025-01-19
        {
          path: 'estudiantes',
          redirect: '/estudiantes/cambiocurso',  
          name: 'Estudiantes',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            // 2025-01-30
            {
              path: 'buscarcambiodocumento',
              beforeEnter: autenticar,
              name: 'Cambio de Documento',
              component: () => import('@/views/estudiantes/BuscarCambioDocumento')
            },
            // 2025-01-30
            {
              path: 'cambiardocumento',
              beforeEnter: autenticar,
              name: 'Cambiar Documento',
              component: () => import('@/views/estudiantes/CambiarDocumento')
            },
            // 2024-03-06
            {
              path: 'cambiocurso',
              beforeEnter: autenticar,
              name: 'Cambio de Curso',
              component: () => import('@/views/estudiantes/CambioCurso')
            },
            // 2024-03-06
            {
              path: 'actualizardatoscurso',
              beforeEnter: autenticar,
              name: 'Actualizar Datos Curso',
              component: () => import('@/views/estudiantes/ActualizarDatosCurso')
            },
            // 2024-04-06
            {
              path: 'listaobservadores',
              beforeEnter: autenticar,
              name: 'Observador',
              component: () => import('@/views/estudiantes/ListaObservadores')
            },
            // 2025-04-06
            {
              path: 'observador',
              beforeEnter: autenticar,
              name: 'Observador del Estudiante',
              component: () => import('@/views/estudiantes/Observador')
            },
            // 2024-04-06
            {
              path: 'listaentrevistasfamiliares',
              beforeEnter: autenticar,
              name: 'Entrevista Familiar',
              component: () => import('@/views/estudiantes/ListaEntrevistasFamiliares')
            },
          ]
        },
        // 2025-01-19
        {
          path: 'secretaria',
          redirect: '/secretaria/buscargenerardocumentos',  
          name: 'Secretaria',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            // 2025-07-28
            {
              path: 'buscarestudiante',
              beforeEnter: autenticar,
              name: 'Buscar Estudiante',
              component: () => import('@/views/secretaria/BuscarEstudiante')
            },
            // 2024-03-06
            {
              path: 'buscargenerardocumentos',
              beforeEnter: autenticar,
              name: 'Documentos',
              component: () => import('@/views/secretaria/BuscarGenerarDocumentos')
            },
            // 2024-03-06
            {
              path: 'generardocumentos',
              beforeEnter: autenticar,
              name: 'Generar Documentos',
              component: () => import('@/views/secretaria/GenerarDocumentos')
            },
            // 2024-03-06
            {
              path: 'constancia',
              beforeEnter: autenticar,
              name: 'Constancias',
              component: () => import('@/views/secretaria/Constancia')
            },
            // 2025-06-12
            {
              path: 'pazysalvos',
              beforeEnter: autenticar,
              name: 'Paz y Salvos',
              component: () => import('@/views/secretaria/PazySalvos')
            },
            // 2025-06-16
            {
              path: 'certificados',
              beforeEnter: autenticar,
              name: 'Certificados',
              component: () => import('@/views/secretaria/Certificados')
            },
            // 2025-06-16
            {
              path: 'comisionevaluacion',
              beforeEnter: autenticar,
              name: 'Comisión de Evaluación',
              component: () => import('@/views/secretaria/ComisionEvaluacion')
            },
          ]
        },
        // 2025-01-16
        {
          path: 'docentes',
          redirect: '/docentes/consultadocente',  
          name: 'Docentes',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            // 2025-01-16
            {
              path: 'listadocentes',
              beforeEnter: autenticar,
              name: 'Gestión Docentes',
              component: () => import('@/views/docentes/ListaDocentes')
            },
            // 2025-02-04
            {
              path: 'directorescurso',
              beforeEnter: autenticar,
              name: 'Directores de Curso',
              component: () => import('@/views/docentes/DirectoresCurso')
            },
            // 2025-02-07
            {
              path: 'asignacioncurso',
              beforeEnter: autenticar,
              name: 'Asignación Académica por Curso',
              component: () => import('@/views/docentes/AsignacionCurso')
            },
            // 2025-02-07
            {
              path: 'asignaciondocente',
              beforeEnter: autenticar,
              name: 'Asignación Académica por Docente',
              component: () => import('@/views/docentes/AsignacionDocente')
            },
            // 2025-02-07
            {
              path: 'consultaasignacion',
              beforeEnter: autenticar,
              name: 'Consulta Asignación Académica',
              component: () => import('@/views/docentes/ConsultaAsignacion')
            },
            // 2025-02-28
            {
              path: 'directoriodocentes',
              beforeEnter: autenticar,
              name: 'Directorio de Docentes',
              component: () => import('@/views/docentes/DirectorioDocentes')
            },
          ]
        },
        // 2024-02-18
        {
          path: 'administrativos',
          redirect: '/administrativos/listaadministrativos',  
          name: 'Administrativos',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            // 2024-02-17
            {
              path: 'listaadministrativos',
              beforeEnter: autenticar,
              name: 'Gestión Administrativos',
              component: () => import('@/views/administrativos/ListaAdministrativos')
            },
          ]
        },
        // 2024-02-17
        {
          path: 'perfiles',
          redirect: '/perfiles/perfilusuario',  
          name: 'Perfiles',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            // 2024-02-17
            {
              path: 'perfilusuario',
              beforeEnter: autenticar,
              name: 'Perfil del Usuario',
              component: () => import('@/views/perfiles/PerfilUsuario')
            },
            // 2024-02-17
            {
              path: 'cambioclave',
              beforeEnter: autenticar,
              name: 'Cambiar Contraseña del Usuario',
              component: () => import('@/views/perfiles/CambioClave')
            },
          ]
        },
        // 2025-04-08
        {
          path: 'periodos',
          redirect: '/periodos/evaluacionesperiodo',  
          name: 'Periodos',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            // 2025-04-08
            {
              path: 'evaluacionesperiodo',
              beforeEnter: autenticar,
              name: 'Evaluaciones Periodo',
              component: () => import('@/views/periodos/EvaluacionesPeriodo')
            },
            // 2025-04-08
            {
              path: 'recuperacionesperiodo',
              beforeEnter: autenticar,
              name: 'Recuperaciones Periodo',
              component: () => import('@/views/periodos/RecuperacionesPeriodo')
            },
            // 2025-04-08
            {
              path: 'superacionesfinales',
              beforeEnter: autenticar,
              name: 'Superaciones Finales',
              component: () => import('@/views/periodos/SuperacionesFinales')
            },
          ]
        },
        // 2025-04-06
        {
          path: 'calificaciones',
          redirect: '/calificaciones/notasperiodo',
          name: 'Calificaciones',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            // 2025-04-07
            {
              path: 'notasperiodo',
              beforeEnter: autenticar,
              name: 'Notas por Periodo',
              component: () => import('@/views/calificaciones/NotasPeriodo')
            },
            // 2025-05-04
            {
              path: 'recuperacionesperiodo',
              beforeEnter: autenticar,
              name: 'Recuperaciones por Periodo',
              component: () => import('@/views/calificaciones/RecuperacionesPeriodo')
            },
            // 2025-06-16
            {
              path: 'consultaplanillas',
              beforeEnter: autenticar,
              name: 'Consulta Planillas',
              component: () => import('@/views/calificaciones/ConsultaPlanillas')
            },
            // 2025-07-11
            {
              path: 'habilitaciones',
              beforeEnter: autenticar,
              name: 'Habilitaciones',
              component: () => import('@/views/calificaciones/Habilitaciones')
            },
            // 2025-07-11
            /*
            {
              path: 'planillanotasasignatura',
              beforeEnter: autenticar,
              name: 'Notas Asignatura',
              component: () => import('@/views/calificaciones/PlanillaNotasAsignatura')
            },
            */
          ]
        },
        // 2024-04-06
        {
          path: 'reportes',
          redirect: '/reportes/reportesperiodos',
          name: 'Reportes',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            // 2025-04-07
            {
              path: 'reportesperiodos',
              beforeEnter: autenticar,
              name: 'Reportes por Periodo',
              component: () => import('@/views/reportes/ReportesPeriodos')
            },
            // 2025-06-16
            {
              path: 'reportesparciales',
              beforeEnter: autenticar,
              name: 'Informes Parciales',
              component: () => import('@/views/reportes/ReportesParciales')
            },
            // 2025-07-08
            {
              path: 'boletines',
              beforeEnter: autenticar,
              name: 'Boletines',
              component: () => import('@/views/reportes/Boletines')
            },
          ]
        },



        //---------
        // 2024-10-21
        {
          path: 'restringida',
          component: () => import('@/views/pages/Restringida')
        },    
        // 2024-12-03
        {
          path: 'manuales',
          component: () => import('@/views/pages/Manuales')
        },    
      ]
    },
    // 2024-10-21
    {
      path: "*",
      component: () => import('@/views/pages/Extraviada')
    },
    // 2024-10-21
    {
      path: '/bienvenida',
      component: () => import('@/views/pages/Bienvenida')
    }
  ]
}

