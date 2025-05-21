import React, { useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';


export default function RegistrationPage({ onRegister }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('api/auth/register', { nome, email, senha });
      onRegister();
      alert('Registro realizado com sucesso!');
      navigate('/login'); // Redireciona para o login
    } catch (err) {
      setError('Erro ao registrar. Tente outro e-mail.');
    }
  };

  return (
    <div className="register-container">
      <h2>Registrar</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required />
        <input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input placeholder="Senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} required />
        <button type="submit">Registrar</button>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </form>
    </div>
  );
}