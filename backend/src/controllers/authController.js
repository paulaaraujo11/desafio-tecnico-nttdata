const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (await User.findOne({ email })) return res.status(400).json({ error: 'Email já cadastrado' });

    const user = await User.create({ nome, email, senha }); 
    res.status(201).json({ id: user._id, nome: user.nome, email: user.email });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ error: 'Erro ao cadastrar usuário: ' + err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(senha, user.senha)))
      return res.status(401).json({ error: 'Credenciais inválidas' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'segredo', { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, nome: user.nome, email: user.email } });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ error: 'Erro ao autenticar' });
  }
};
