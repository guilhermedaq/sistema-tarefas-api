import { todasTarefas, criarTarefa, atualizarTarefa, deletarTarefa } from "../services/tarefaService.js";


export const getTarefas = async (req, res)=>{
    try{
        const resultado = await todasTarefas();
        return res.status(200).json(resultado);
    } catch(err){
        return res.status(500).json({mensagem:"Erro ao buscar tarefas"});
    }
};


export const criarTarefaController = async (req, res)=>{
    try{
        const {nomeTarefa, dataTarefa, usuario_id} = req.body;
        const resultado = await criarTarefa(nomeTarefa, dataTarefa, usuario_id)
        return res.status(201).json(resultado);
    } catch(err){
        return res.status(500).json({mensagem:"Erro ao criar tarefa"});
    }
};

export const atualizarTarefaController = async (req, res)=> {
    try{
        const {estagioTarefa} = req.body;
        const {id} = req.params.id;
        const resultado = await atualizarTarefa(estagioTarefa, id);
        return res.status(200).json(resultado);       
    } catch(err){
        return res.status(500).json({mensagem:"erro ao atualizar"});
    }
};

export const deletarTarefaController = async (req, res)=>{
    try{
        const id = req.params.id;
        await deletarTarefa(id);
        return res.status(200).json({message:"item deletado com sucesso"});
    } catch(err){
        return res.status(500).json({messagem: "erro ao deletar"});
    }
};