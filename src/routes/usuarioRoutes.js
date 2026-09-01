import { Router } from "express";
import { criarUsuarioController, loginUsuarioController } from "../controllers/usuarioController.js";

const router = Router()

router.post('/cadastro', criarUsuarioController);
router.post('/login', loginUsuarioController);

export default router
