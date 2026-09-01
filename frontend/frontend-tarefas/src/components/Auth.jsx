import { useState } from 'react';
import api from '../services/api';

export function Auth({ onLoginSucesso }) {
  const [isLogin, setIsLogin] = useState(true);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      if (isLogin) {
        const resposta = await api.post('/usuarios/login', { email, senha });
        localStorage.setItem('token', resposta.data.token);
        onLoginSucesso();
      } else {
        await api.post('/usuarios/cadastro', { nome, email, senha });
        alert('Usuário cadastrado com sucesso! Faça login.');
        setIsLogin(true);
      }
    } catch (err) {
      setErro(err.response?.data?.message || err.response?.data?.mensagem || 'Erro ao processar requisição');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>{isLogin ? 'Login' : 'Criar Conta'}</h2>
      
      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div style={{ marginBottom: '10px' }}>
            <label>Nome:</label>
            <input 
              type="text" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              required 
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
        )}

        <div style={{ marginBottom: '10px' }}>
          <label>E-mail:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Senha:</label>
          <input 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
          {isLogin ? 'Entrar' : 'Cadastrar'}
        </button>
      </form>

      <button 
        onClick={() => setIsLogin(!isLogin)} 
        style={{ marginTop: '15px', background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}
      >
        {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
      </button>
    </div>
  );
}