import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from '../services/api';
import AnimatedLogo from './AnimatedLogo';


export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('api/auth/login', { email, senha });
      const { token, user } = res.data;
      onLogin(token);      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify({ id: user.id, name: user.nome, email: user.email }));

      navigate('/dashboard'); 
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