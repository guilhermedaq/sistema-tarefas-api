import {Router} from 'express'
import { getTarefas, criarTarefaController, atualizarTarefaController, deletarTarefaController } from '../controllers/tarefaControllers.js'

const router = Router();

router.get('/', getTarefas);
router.post('/', criarTarefaController);
router.put('/:id', atualizarTarefaController);
router.delete('/:id', deletarTarefaController);

export default router;