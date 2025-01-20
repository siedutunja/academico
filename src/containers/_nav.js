import * as CONFIG from '@/assets/config.js'
import jwt from 'jsonwebtoken'

let menu = []
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
    if (tokenDecodificado.id_rol == 1 || tokenDecodificado.id_rol == 12 || tokenDecodificado.permisos.perMatricular == 1) {
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
      menu[0]._children[indice].items.push({ name: 'Matriculados Sin Curso', to: '/matriculas/matriculadossincurso'})
      menu[0]._children[indice].items.push({ name: 'Renovación Masiva Antiguos', to: '/matriculas/renovacionmasiva2024'})
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
    if (tokenDecodificado.id_rol == 1 || tokenDecodificado.id_rol == 12) {
      menu[0]._children[indice].items.push({ name: 'Cambiar de Curso', to: '/estudiantes/cambiocurso'})
    }
    if (tokenDecodificado.id_rol == 1 || tokenDecodificado.id_rol == 12) {
      menu[0]._children.push(
        {
          _name: 'CSidebarNavDropdown',
          name: 'Docentes',
          icon: 'cilPeople',
          items: []
        }
      )
      indice++
      //menu[0]._children[indice].items.push({ name: 'Consulta Docente', to: '/docentes/consultadocente'})
      //menu[0]._children[indice].items.push({ name: 'Directores de Curso', to: '/docentes/directorescurso'})
      //menu[0]._children[indice].items.push({ name: 'Asignación Académica', to: '/docentes/asignacioncurso'})
      //menu[0]._children[indice].items.push({ name: 'Directorio Docentes', to: '/docentes/directoriodocentes'})
      menu[0]._children[indice].items.push({ name: 'Gestión de Docentes', to: '/docentes/listadocentes'})
    }
    menu[0]._children.push(
      {
        _name: 'CSidebarNavDropdown',
        name: 'Listas y Planillas',
        icon: 'cilListRich',
        items: []
      }
    )
    indice++
    menu[0]._children[indice].items.push({ name: 'Generador de Listas', to: '/listados/listados'})

    menu[0]._children.push(
      {
        _name: 'CSidebarNavDropdown',
        name: 'Informes',
        icon: 'cilBarChart',
        items: []
      }
    )
    indice++
    menu[0]._children[indice].items.push({ name: 'Consolidado Matricula', to: '/informes/consolidadomatricula'})

  }
})

export default menu