import { Router } from "express";

import { 
    newService, 
    listServiceFactura
} from "./service.controller.js";

const router = Router()

router.post("/", newService);
router.get("/:id", listServiceFactura);

export default router;