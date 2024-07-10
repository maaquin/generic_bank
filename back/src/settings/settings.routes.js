import {Router} from "express";

import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { 
    getUserSetting, 
    usuariosPut,
    passwordPatch,
    listUser,
    transferencia,
    addFav,
    deleteFav,
    listFav,
    listEmail,
    getAdditionalUserInfo,
    deleteUser
} from "./settingsUser.controller.js";

const router = Router()

router.get('/user', listUser)
router.post('/user', getUserSetting)
router.put('/transferencia', [validarCampos], transferencia)
router.patch('/user', passwordPatch)
router.post('/email', listEmail)
router.post('/additionalUserInfo', getAdditionalUserInfo)
router.delete('/user/:id', deleteUser)


router.get('/fav/:id', listFav)
router.post('/fav', addFav)
router.delete('/fav/:id', deleteFav)

router.put('/update', usuariosPut);

export default router