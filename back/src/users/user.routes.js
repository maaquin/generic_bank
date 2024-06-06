import {Router} from "express";

import { 
    getUserHome
    
} from "./user.Controller.js"

const router = Router()

router.get('/user', getUserHome)


export default router