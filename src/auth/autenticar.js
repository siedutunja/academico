import jwt from 'jsonwebtoken'
import * as CONFIG from '@/assets/config.js'

export default (to, from, next) => {
    let token = sessionStorage.getItem('token')
    jwt.verify(token, CONFIG.SECRET_KEY, (err, data) => {
        if (!err) {
            next()
        } else {
            alert('¡Auth. Lo sentimos, el token no es válido o el token ha expirado.! Es necesario iniciar una nueva sesión.')
            location.replace(CONFIG.ROOT_WEBSITE)
        }
    })
}