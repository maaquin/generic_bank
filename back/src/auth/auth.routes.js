import { Router } from "express";

import { validarCampos } from "../middlewares/validar-campos.js";

import { 
    login, 
    register,
    continuar
} from "./auth.controller.js";

const router = Router()

router.post('/login', [validarCampos], login)
router.post('/register', [validarCampos], register)
router.put('/continuar', [validarCampos], continuar)

export default router;