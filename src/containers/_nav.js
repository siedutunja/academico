import * as CONFIG from '@/assets/config.js'
import jwt from 'jsonwebtoken'

let menu = []
let idSeccion = sessionStorage.getItem('idSeccion')
if ( idSeccion == null ) {
  idSeccion = 1
}
let token = sessionStorage.getItem('token')
if ( token == null ) {
  let valores = window.location.search
  let urlParams = new URLSearchParams(valores)
  token = urlParams.get('token')
}
jwt.verify(token, CONFIG.SECRET_KEY, (err, data) => {
  if (err) {
    alert('¡Nav. Lo sentimos, el token no es válido o el token ha expirado.! Es necesario iniciar una nueva sesión.')
    location.replace(CONFIG.ROOT_WEBSITE)
  } else {
    window.history.replaceState({},'','/academico/')
    sessionStorage.setItem('token', token)
    let tokenDecodificado = jwt.decode(token)
    let tokenPermisos = tokenDecodificado.permisos
    //console.log(tokenDecodificado)
    let indice = 0
    menu = [
      {
        _name: 'CSidebarNav',
        _children: [
          {
            _name: 'CSidebarNavTitle',
            _children: ['Menú Principal']
          }
        ]
      }
    ]
    if (tokenDecodificado.id_rol == 1 || tokenDecodificado.id_rol == 12 || tokenPermisos.perMatricular == 1) {
      menu[0]._children.push(
        {
          _name: 'CSidebarNavDropdown',
          name: 'Matriculas',
          icon: 'cilUserPlus',
          items: []
        }
      )
      indice++
      menu[0]._children[indice].items.push({ name: 'Matricular Preinscrito', to: '/matriculas/preinscritos'})
      menu[0]._children[indice].items.push({ name: 'Renovar Matricula', to: '/matriculas/buscarrenovacion'})
      menu[0]._children[indice].items.push({ name: 'Promoción Anticipada', to: '/matriculas/promocionanticipada'})
      menu[0]._children[indice].items.push({ name: 'Ubicación o Reubicación', to: '/matriculas/reubicacion'})
      menu[0]._children[indice].items.push({ name: 'Matriculados Sin Curso', to: '/matriculas/matriculadossincurso'})
      menu[0]._children[indice].items.push({ name: 'Renovación Masiva Antiguos', to: '/matriculas/renovacionmasiva2024'})
    }
    if (tokenDecodificado.id_rol == 1 || tokenDecodificado.id_rol == 12 || tokenPermisos.perSecretaria == 1) {
      menu[0]._children.push(
        {
          _name: 'CSidebarNavDropdown',
          name: 'Secretaría',
          icon: 'cilUserPlus',
          items: []
        }
      )
      indice++
      menu[0]._children[indice].items.push({ name: 'Documentos por Estudiante', to: '/secretaria/buscargenerardocumentos'})
    }
    menu[0]._children.push(
      {
        _name: 'CSidebarNavDropdown',
        name: 'Estudiantes',
        icon: 'cilEducation',
        items: []
      }
    )
    indice++
    menu[0]._children[indice].items.push({ name: 'Consultar Carpeta Matricula', to: '/matriculas/buscarcarpetamatricula'})
    if (tokenDecodificado.id_rol == 1 || tokenDecodificado.id_rol == 12 || tokenPermisos.perActDatosCurso == 1) {
      menu[0]._children[indice].items.push({ name: 'Actualizar Datos por Curso', to: '/estudiantes/actualizardatoscurso'})
    }
    if (tokenDecodificado.id_rol == 1 || tokenDecodificado.id_rol == 12) {
      menu[0]._children[indice].items.push({ name: 'Cambiar de Curso', to: '/estudiantes/cambiocurso'})
    }
    if (tokenDecodificado.id_rol == 1 || tokenDecodificado.id_rol == 12 || tokenPermisos.perMatricular == 1) {
      menu[0]._children[indice].items.push({ name: 'Cambiar Documento', to: '/estudiantes/buscarcambiodocumento'})
    }
    menu[0]._children[indice].items.push({ name: 'Observador', to: '/estudiantes/listaobservadores'})
    menu[0]._children[indice].items.push({ name: 'Entrevista Familiar', to: '/estudiantes/listaentrevistasfamiliares'})
    menu[0]._children.push(
      {
        _name: 'CSidebarNavDropdown',
        name: 'Docentes',
        icon: 'cilPeople',
        items: []
      }
    )
    indice++
    if (tokenDecodificado.id_rol == 1 || tokenDecodificado.id_rol == 12 || tokenPermisos.perActDocente == 1) {
      menu[0]._children[indice].items.push({ name: 'Gestión de Docentes', to: '/docentes/listadocentes'})
    }
    menu[0]._children[indice].items.push({ name: 'Asig. Académica por Docente', to: '/docentes/asignaciondocente'})
    menu[0]._children[indice].items.push({ name: 'Asig. Académica por Curso', to: '/docentes/asignacioncurso'})
    menu[0]._children[indice].items.push({ name: 'Directores de Curso', to: '/docentes/directorescurso'})
    menu[0]._children[indice].items.push({ name: 'Consulta Asig. Académica', to: '/docentes/consultaasignacion'})
    menu[0]._children[indice].items.push({ name: 'Directorio', to: '/docentes/directoriodocentes'})
    menu[0]._children.push(
      {
        _name: 'CSidebarNavDropdown',
        name: 'Listas y Planillas',
        icon: 'cilListRich',
        items: []
      }
    )
    indice++
    menu[0]._children[indice].items.push({ name: 'Listas por Grado/Curso', to: '/listados/listadoscurso'})
    menu[0]._children[indice].items.push({ name: 'Listas por Docente', to: '/listados/listadosdocente'})
    menu[0]._children[indice].items.push({ name: 'Auxiliar con Notas', to: '/listados/planillasnotas'})
    menu[0]._children[indice].items.push({ name: 'Planillas/Formatos por Curso', to: '/listados/planillascurso'})
    menu[0]._children[indice].items.push({ name: 'Listas Sin Curso', to: '/listados/listadossincurso'})
    menu[0]._children.push(
      {
        _name: 'CSidebarNavDropdown',
        name: 'Informes y Estadísticas',
        icon: 'cilBarChart',
        items: []
      }
    )
    indice++
    menu[0]._children[indice].items.push({ name: 'Boletines por Periodo', to: '/reportes/reportesperiodos'})
    menu[0]._children[indice].items.push({ name: 'Consolidados por Periodo', to: '/informes/consolidadoscurso'})
    menu[0]._children[indice].items.push({ name: 'Puestos Estudiantes', to: '/informes/puestoscurso'})
    menu[0]._children[indice].items.push({ name: 'Rendimiento Academico', to: '/informes/rendimientoacademico'})
    menu[0]._children[indice].items.push({ name: 'Informes por Agrupación', to: '/informes/informesagrupacion'})
    menu[0]._children[indice].items.push({ name: 'Consolidado Matricula', to: '/informes/consolidadomatricula'})
    menu[0]._children[indice].items.push({ name: 'Consolidado Matricula Cursos', to: '/informes/consolidadomatriculacursos'})
    if (tokenDecodificado.id_rol == 1 || tokenDecodificado.id_rol == 12 || tokenDecodificado.id_rol == 14) {
      menu[0]._children.push(
        {
          _name: 'CSidebarNavDropdown',
          name: 'Calificaciones',
          icon: 'cilCalendar',
          items: []
        }
      )
      indice++
      if (tokenDecodificado.id_rol == 1 || tokenDecodificado.id_rol == 12) {
      menu[0]._children[indice].items.push({ name: 'Calificaciones por Periodo', to: '/calificaciones/notasperiodo'})
      menu[0]._children[indice].items.push({ name: 'Recuperaciones por Periodo', to: '/calificaciones/recuperacionesperiodo'})
      }
    }
    if (tokenDecodificado.id_rol == 1 || tokenDecodificado.id_rol == 12) {
      menu[0]._children.push(
        {
          _name: 'CSidebarNavDropdown',
          name: 'Programar Periodos',
          icon: 'cilCalendar',
          items: []
        }
      )
      indice++   
      menu[0]._children[indice].items.push({ name: 'Evaluaciones por Periodo', to: '/periodos/evaluacionesperiodo'})
      menu[0]._children[indice].items.push({ name: 'Recuperaciones por Periodo', to: '/periodos/recuperacionesperiodo'})
    }
  }
})

export default menu