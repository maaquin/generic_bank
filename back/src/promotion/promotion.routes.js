import { Router } from 'express';

import { 
    newPromotion, 
    listPromotions, 
    redeemPromotion, 
    deletePromotion 
} from './promotion.controller.js';

import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.post("/", newPromotion);
router.get("/", listPromotions);
router.post("/redeem", redeemPromotion);
router.put("/delete", [validarJWT], deletePromotion);

export default router;
