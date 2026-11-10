import { Router } from "express";
import * as jogadorController from "../controllers/jogadorController.js";
import validarId from "../middlewares/validarId.js";

const router = Router();

router.get("/", jogadorController.listar);
router.get("/:id", validarId, jogadorController.obterPorId);
router.post("/", jogadorController.criar);
router.put("/:id", validarId, jogadorController.atualizar);
router.delete("/:id", validarId, jogadorController.excluir);

export default router;