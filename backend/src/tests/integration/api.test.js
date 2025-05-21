const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app');

let mongoServer;
let token;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

describe('Fluxo completo: usuário, música e playlist', () => {
  it('Deve registrar um usuário', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ nome: 'Teste', email: 'teste@jest.com', senha: '123456' });

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe('teste@jest.com');
  });

  it('Deve autenticar e retornar um token', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ nome: 'Teste', email: 'teste@jest.com', senha: '123456' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'teste@jest.com', senha: '123456' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it('Deve criar uma música', async () => {
    const res = await request(app)
      .post('/api/musicas')
      .set('Authorization', `Bearer ${token}`)
      .send({ titulo: 'Música Teste', artista: 'Artista Teste', link: 'http://teste.com' });

    expect(res.statusCode).toBe(201);
    expect(res.body.titulo).toBe('Música Teste');
  });

  it('Deve criar uma playlist', async () => {
    const res = await request(app)
      .post('/api/playlists')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Playlist Teste', descricao: 'Descrição Teste' });

    expect(res.statusCode).toBe(201);
    expect(res.body.nome).toBe('Playlist Teste');
  });
});