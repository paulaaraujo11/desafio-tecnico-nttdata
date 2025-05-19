const express = require('express');
const mongoose = require('mongoose');

const app = express();
const mongoUri = process.env.MONGO_URI || 'mongodb://mongo:27017/streaming';

// Middleware para JSON
app.use(express.json());

// Rota de teste
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});


app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/playlists', require('./routes/playlists'));
app.use('/api/musics', require('./routes/musics'));

mongoose.connect(mongoUri, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
  .then(() => console.log('MongoDB conectado!'))
  .catch(err => {
    console.error('Erro ao conectar:', err);
    process.exit(1);
  });

// app.listen(5000, () => {
//   console.log('Backend rodando na porta 5000');
// });

if (process.env.NODE_ENV !== 'test') {
  app.listen(5000, () => {
    console.log('Backend rodando na porta 5000');
  });
}

module.exports = app;

// Conexão com o MongoDB e criação de usuário teste
// mongoose.connect(mongoUri, {
//   serverSelectionTimeoutMS: 5000,
//   socketTimeoutMS: 45000,
// })
//   .then(async () => {
//     console.log('MongoDB conectado!');
//     const User = require('./models/User');
//     const existe = await User.findOne({ email: 'teste@email.com' });
//     if (!existe) {
//       await User.create({
//         nome: 'Usuário Teste',
//         email: 'teste@email.com',
//         senha: '123456'
//       });
//       console.log('Usuário teste criado!');
//     } else {
//       console.log('Usuário teste já existe.');
//     }
//   })
//   .catch(err => {
//     console.error('Erro ao conectar:', err);
//     process.exit(1);
//   });

// // Inicia o servidor Express
// app.listen(5000, () => {
//   console.log('Backend rodando na porta 5000');
// });