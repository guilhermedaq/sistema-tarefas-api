import { Router } from "express";
import { criarUsuarioController, loginUsuarioController } from "../controllers/usuarioController.js";

export const router = Router()

router.post('/cadastro', criarUsuarioController);
router.post('/login', loginUsuarioController);
