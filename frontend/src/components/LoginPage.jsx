import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../services/api';
import AnimatedLogo from './AnimatedLogo';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/login', { email, senha });
      onLogin(res.data.token);
    } catch (err) {
      setError('E-mail ou senha inválidos.');
    }
  };

  return (
    <div className="login-container">
      <AnimatedLogo />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input placeholder="Senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} required />
        <button type="submit">Entrar</button>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </form>
      <p>
        Ainda não tem conta? <Link to="/register">Registre-se</Link>
      </p>
    </div>
  );
}