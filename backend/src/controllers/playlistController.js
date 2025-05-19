const Playlist = require('../models/Playlist');
const Music = require('../models/Music');

exports.create = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    const playlist = await Playlist.create({ nome, descricao, usuarioId: req.userId, musicas: [] });
    res.status(201).json(playlist);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar playlist' });
  }
};

exports.list = async (req, res) => {
  try {
    const playlists = await Playlist.find({ usuarioId: req.userId }).populate('musicas');
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar playlists' });
  }
};

exports.detail = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate('musicas');
    if (!playlist) return res.status(404).json({ error: 'Playlist não encontrada' });
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar playlist' });
  }
};

exports.update = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    const playlist = await Playlist.findByIdAndUpdate(
      req.params.id,
      { nome, descricao },
      { new: true }
    );
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar playlist' });
  }
};

exports.delete = async (req, res) => {
  try {
    await Playlist.findByIdAndDelete(req.params.id);
    res.json({ message: 'Playlist removida' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover playlist' });
  }
};

exports.addMusic = async (req, res) => {
  try {
    const { musicId } = req.body;
    const playlist = await Playlist.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { musicas: musicId } },
      { new: true }
    ).populate('musicas');
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao adicionar música' });
  }
};

exports.removeMusic = async (req, res) => {
  try {
    const { musicId } = req.body;
    const playlist = await Playlist.findByIdAndUpdate(
      req.params.id,
      { $pull: { musicas: musicId } },
      { new: true }
    ).populate('musicas');
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover música' });
  }
};