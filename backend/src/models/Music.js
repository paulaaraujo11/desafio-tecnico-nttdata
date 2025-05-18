const mongoose = require('mongoose');

const MusicSchema = new mongoose.Schema({
  titulo: String,
  artista: String,
  capaUrl: String,
  link: String
});

module.exports = mongoose.model('Music', MusicSchema);