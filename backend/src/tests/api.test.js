const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app"); // Certifique-se que exporta o app sem listen()

let token;
let playlistId;
let musicId;

beforeAll(async () => {
  // Conecte ao banco de teste
  // await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/streaming_test');
});

beforeEach(async () => {
  // Aguarda conexão antes de tentar limpar a coleção
  if (mongoose.connection.readyState !== 1) {
    await new Promise(resolve => mongoose.connection.once('open', resolve));
  }
  await mongoose.connection.db.collection('users').deleteMany({});
    // await User.deleteMany({});

});

afterAll(async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  }
});

describe("Fluxo completo: usuário, música e playlist", () => {
  it("Deve cadastrar um usuário", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ nome: "Teste", email: "teste@jest.com", senha: "123456" });
    console.log('CREATE USER RESPONSE:', res.statusCode, res.body); // <-- ADICIONE ISSO
    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe("teste@jest.com");
  });

  it("Deve autenticar e retornar um token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "teste@jest.com", senha: "123456" });
    console.log('LOGIN RESPONSE:', res.statusCode, res.body); // <-- ADICIONE ISSO
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it("Deve criar uma música", async () => {
    const res = await request(app)
      .post("/api/musics")
      .set("Authorization", `Bearer ${token}`)
      .send({
        titulo: "Música Teste",
        artista: "Artista",
        capaUrl: "http://img.com/capa.jpg",
        link: "http://musica.com",
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.titulo).toBe("Música Teste");
    musicId = res.body._id;
  });

  it("Deve criar uma playlist", async () => {
    const res = await request(app)
      .post("/api/playlists")
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: "Minha Playlist", descricao: "Playlist de teste" });
    expect(res.statusCode).toBe(201);
    expect(res.body.nome).toBe("Minha Playlist");
    playlistId = res.body._id;
  });

  it("Deve adicionar música à playlist", async () => {
    const res = await request(app)
      .post(`/api/playlists/${playlistId}/add-music`)
      .set("Authorization", `Bearer ${token}`)
      .send({ musicId });
    expect(res.statusCode).toBe(200);
    expect(res.body.musicas).toContainEqual(
      expect.objectContaining({ _id: musicId })
    );
  });

  it("Deve editar o nome da playlist", async () => {
    const res = await request(app)
      .put(`/api/playlists/${playlistId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: "Playlist Editada", descricao: "Nova descrição" });
    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe("Playlist Editada");
  });
});
