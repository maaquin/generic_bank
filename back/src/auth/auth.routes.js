import { Router } from "express";

import { validarCampos } from "../middlewares/validar-campos.js";

import { 
    login, 
    register,
    continuar,
    firstAdmin,
    newUser
} from "./auth.controller.js";

const router = Router()

router.post('/login', [validarCampos], login)
router.post('/register', [validarCampos], register)
router.put('/continuar', [validarCampos], continuar)
router.post('/first', firstAdmin )
router.post('/new', newUser)

export default router;