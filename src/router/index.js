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
            // 2024-10-26 ????????????????????
            {
              path: 'nuevavigencia',
              beforeEnter: autenticar,
              name: 'Nuevo Año Lectivo',
              component: () => import('@/views/configuracion/NuevaVigencia')
            },
            /*
            // 2024-02-24
            // 2024-02-27
            {
              path: 'listaareas',
              beforeEnter: autenticar,
              name: 'Lista de Areas',
              component: () => import('@/views/configuracion/ListaAreas')
            },
            // 2024-02-28
            {
              path: 'listaasignaturas',
              beforeEnter: autenticar,
              name: 'Lista de Asignaturas',
              component: () => import('@/views/configuracion/ListaAsignaturas')
            },
            // 2024-02-28
            {
              path: 'planestudios',
              beforeEnter: autenticar,
              name: 'Plan de Estudios',
              component: () => import('@/views/configuracion/PlanEstudios')
            },
            */
          ]
        },





        //---------
        // 2024-03-10
        {
          path: 'listados',
          redirect: '/listados/listados',  
          name: 'Listados',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            // 2024-03-06
            {
              path: 'listados',
              beforeEnter: autenticar,
              name: 'Lista General de Estudiantes',
              component: () => import('@/views/listados/Listados')
            },
          ]
        },
        // 2024-03-06
        {
          path: 'estudiantes',
          redirect: '/estudiantes/matricula',  
          name: 'Estudiantes',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            // 2024-03-06
            {
              path: 'fichamatricula',
              beforeEnter: autenticar,
              name: 'Ficha de Matricula Estudiante',
              component: () => import('@/views/estudiantes/FichaMatricula')
            },
            // 22024-03-07
            {
              path: 'matricula',
              beforeEnter: autenticar,
              name: 'Matricula Estudiantes',
              component: () => import('@/views/estudiantes/Matricula')
            },
          ]
        },
        // 2024-02-25
        {
          path: 'docentes',
          redirect: '/docentes/consultadocente',  
          name: 'Docentes',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            // 2024-03-05
            {
              path: 'directoriodocentes',
              beforeEnter: autenticar,
              name: 'Directorio de Docentes',
              component: () => import('@/views/docentes/DirectorioDocentes')
            },
            // 2024-03-05
            {
              path: 'consultadocente',
              beforeEnter: autenticar,
              name: 'Consulta Docente',
              component: () => import('@/views/docentes/ConsultaDocente')
            },
            // 2024-03-05
            {
              path: 'directorescurso',
              beforeEnter: autenticar,
              name: 'Directores de Curso',
              component: () => import('@/views/docentes/DirectoresCurso')
            },
            // 2024-02-29
            {
              path: 'asignacioncurso',
              beforeEnter: autenticar,
              name: 'Asignación Académica',
              component: () => import('@/views/docentes/AsignacionCurso')
            },
            // 2024-02-17
            {
              path: 'listadocentes',
              beforeEnter: autenticar,
              name: 'Gestión Docentes',
              component: () => import('@/views/docentes/ListaDocentes')
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

