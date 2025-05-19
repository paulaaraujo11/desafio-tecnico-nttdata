const Music = require('../models/Music');

exports.create = async (req, res) => {
  try {
    const { titulo, artista, capaUrl, link } = req.body;
    const music = await Music.create({ titulo, artista, capaUrl, link });
    res.status(201).json(music);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar música' });
  }
};

exports.list = async (req, res) => {
  try {
    const musics = await Music.find();
    res.json(musics);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar músicas' });
  }
};

exports.update = async (req, res) => {
  try {
    const { titulo, artista, capaUrl, link } = req.body;
    const music = await Music.findByIdAndUpdate(
      req.params.id,
      { titulo, artista, capaUrl, link },
      { new: true }
    );
    res.json(music);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar música' });
  }
};

exports.delete = async (req, res) => {
  try {
    await Music.findByIdAndDelete(req.params.id);
    res.json({ message: 'Música removida' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover música' });
  }
};