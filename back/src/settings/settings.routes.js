import {Router} from "express";

import { validarCampos } from "../middlewares/validar-campos.js";

import { 
    getUserSetting, 
    usuariosPut,
    passwordPatch,
    listUser,
    transferencia
} from "./settingsUser.controller.js";

const router = Router()

router.get('/user', listUser)
router.post('/user', getUserSetting)
router.put('/user', [validarCampos], usuariosPut)
router.put('/transferencia', [validarCampos], transferencia)
router.patch('/user', passwordPatch)

export default router