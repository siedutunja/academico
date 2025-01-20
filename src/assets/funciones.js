import axios from "axios"
import * as CONFIG from '@/assets/config.js'

// Solo aplicar para calculos matemáticos y no consultas a la base de datos
async function cargarDatosSecciones(idInstitucion) {
    let datos = null
    await axios
    .get(CONFIG.ROOT_PATH + 'academico/cargueespecialidades', {params: {idInstitucion: idInstitucion}})
    .then(response => {
        if (response.data.error){
            alert(response.data.mensaje + ' - Consulta datos Especialidades IE')
            location.replace(CONFIG.ROOT_MODULO_LOGIN)
        } else {
            if(response.data.datos != 0) {
                datos = response.data.datos
            } else {
                datos = []
            }
        }
    })
    .catch(err => {
      alert('Algo salio mal y no se pudo realizar: Consulta datos Especialidades IE. Intente más tarde. ' + err)
      location.replace(CONFIG.ROOT_WEBSITE)
    })
    return datos
}
export {cargarDatosSecciones};