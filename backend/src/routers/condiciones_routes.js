import { Router } from "express";
import { crearCondicion } from "../controllers/condiciones_controller.js";

const router = Router()

router.post('/condicion',crearCondicion)

export default router