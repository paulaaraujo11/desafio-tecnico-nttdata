const User = require('../models/User');

exports.update = async (req, res) => {
  try {
    const { nome, email } = req.body;
    const user = await User.findByIdAndUpdate(req.userId, { nome, email }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};

exports.delete = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.userId);
    res.json({ message: 'Usuário removido' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover usuário' });
  }
};