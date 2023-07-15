import { Router } from "express";
import {
  getTarea,
  getTareas,
  crearTarea,
  actualizarTarea,
  borrarTarea,
} from "../controllers/tareas.controllers.js";

const router = Router();

router.get("/tareas", getTareas);

router.get("/tareas/:id", getTarea);

router.post("/tareas", crearTarea);

router.put("/tareas/:id", actualizarTarea);

router.delete("/tareas/:id", borrarTarea);

export default router;
