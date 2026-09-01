import { useState, useEffect } from 'react';
import api from '../services/api';

export function Dashboard({ onLogout }) {
  const [tarefas, setTarefas] = useState([]);
  const [nomeTarefa, setNomeTarefa] = useState('');
  const [dataTarefa, setDataTarefa] = useState('');

  const carregarTarefas = async () => {
    try {
      const resposta = await api.get('/tarefas');
      setTarefas(resposta.data);
    } catch (err) {
      console.error('Erro ao buscar tarefas:', err);
    }
  };

  useEffect(() => {
    carregarTarefas();
  }, []);

  const handleCriarTarefa = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tarefas', { nomeTarefa, dataTarefa });
      setNomeTarefa('');
      setDataTarefa('');
      carregarTarefas();
    } catch (err) {
      alert('Erro ao criar tarefa');
    }
  };

  const handleDeletar = async (id) => {
    try {
      await api.delete(`/tarefas/${id}`);
      carregarTarefas();
    } catch (err) {
      alert('Erro ao deletar tarefa');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Minhas Tarefas</h2>
        <button onClick={onLogout} style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Sair
        </button>
      </div>

      <form onSubmit={handleCriarTarefa} style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
        <input 
          type="text" 
          placeholder="Nome da tarefa" 
          value={nomeTarefa} 
          onChange={(e) => setNomeTarefa(e.target.value)} 
          required 
          style={{ flex: 2, padding: '8px' }}
        />
        <input 
          type="date" 
          value={dataTarefa} 
          onChange={(e) => setDataTarefa(e.target.value)} 
          required 
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Adicionar
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ddd' }}>
            <span>
              <strong>{tarefa.nometarefa || tarefa.nomeTarefa}</strong> - {new Date(tarefa.datatarefa || tarefa.dataTarefa).toLocaleDateString()}
            </span>
            <button onClick={() => handleDeletar(tarefa.id)} style={{ backgroundColor: '#ff4d4d', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px' }}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}