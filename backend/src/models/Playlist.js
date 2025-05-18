const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  musicas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Music' }]
});

module.exports = mongoose.model('Playlist', PlaylistSchema);