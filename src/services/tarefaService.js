import pool from "../config/db.js";


//lista todas as tarefas
export const todasTarefas = async ()=>{
        const dados = await pool.query('SELECT * FROM tarefas');
        return dados.rows
}

//cria nova tarefa
export const criarTarefa = async (nomeTarefa, dataTarefa, usuario_id)=>{
        const dados = await pool.query('INSERT INTO tarefas (nomeTarefa, dataTarefa, usuario_id) VALUES($1, $2, $3) RETURNING *', [nomeTarefa, dataTarefa, usuario_id]);
        return dados.rows[0]
}

//muda o status da tarefa
export const atualizarTarefa = async (estagioTarefa, id)=>{
        const dados = await pool.query('UPDATE tarefas SET estagioTarefa= $1 WHERE id= $2 RETURNING *', [estagioTarefa, id]);
        return dados.rows[0]
}

//deleta a tarefa
export const deletarTarefa = async (id)=>{
        const dados = await pool.query ('DELETE from tarefas WHERE id=$1', [id])
}