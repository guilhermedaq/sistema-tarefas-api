import { useState } from 'react';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';

export default function App() {
  const [autenticado, setAutenticado] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAutenticado(false);
  };

  return (
    <div>
      {autenticado ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Auth onLoginSucesso={() => setAutenticado(true)} />
      )}
    </div>
  );
}