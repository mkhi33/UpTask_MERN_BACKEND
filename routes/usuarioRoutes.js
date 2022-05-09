import express from 'express'
import { 
        registrar,
        autenticar, 
        confirmar, 
        olvidePassword, 
        comprobarToquen, 
        nuevoPassword,
        perfil
     } from '../controllers/usuarioController.js'
import checkAuth from '../middleware/checkAuth.js'
const router = express.Router()

// Autenticación, registro y confirmación de usuarios

router.post('/', registrar ) // Crea un nuevo usuario
router.post('/login', autenticar ) // Autenticar un usuario
router.get('/confirmar/:token', confirmar) // Confirmar usuario
router.post('/olvide-password', olvidePassword)
router.route('/olvide-password/:token')
    .get(comprobarToquen)
    .post(nuevoPassword)

router.get('/perfil', checkAuth, perfil)



export default router