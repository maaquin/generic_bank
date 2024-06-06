import { Router } from "express";

import { validarCampos } from "../middlewares/validar-campos.js";

import { 
    newProduct, 
    listProducts, 
    listProductId, 
    deleteProduct, 
} from "./product.controller.js";

const router = Router()

router.post("/", [ validarCampos ], newProduct);
router.get("/", listProducts);
router.get("/:id", listProductId);
router.put("/delete", deleteProduct);
export default router;