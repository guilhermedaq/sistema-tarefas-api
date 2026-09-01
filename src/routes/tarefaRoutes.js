import {Router} from 'express'
import { getTarefas, criarTarefaController, atualizarTarefaController, deletarTarefaController } from '../controllers/tarefaControllers.js'
import { autenticarToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get('/', autenticarToken, getTarefas);
router.post('/', autenticarToken, criarTarefaController);
router.put('/:id', autenticarToken, atualizarTarefaController);
router.delete('/:id', autenticarToken, deletarTarefaController);

export default router;