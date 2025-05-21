const playlistController = require('../../controllers/playlistController');
const Playlist = require('../../models/Playlist');

jest.mock('../../models/Playlist');

describe('playlistController', () => {
  describe('createPlaylist', () => {
    it('deve criar uma playlist com sucesso', async () => {
      const req = { body: { nome: 'Playlist Teste', descricao: 'Descrição Teste' }, userId: '123' };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Playlist.create.mockResolvedValue({ ...req.body, owner: req.userId });

      await playlistController.createPlaylist(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ ...req.body, owner: req.userId });
    });

    it('deve retornar 500 se ocorrer um erro ao criar a playlist', async () => {
      const req = { body: { nome: 'Playlist Teste', descricao: 'Descrição Teste' }, userId: '123' };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Playlist.create.mockRejectedValue(new Error('Erro ao criar playlist'));

      await playlistController.createPlaylist(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao criar playlist' });
    });
  });

  describe('addMusicToPlaylist', () => {
    it('deve adicionar uma música à playlist', async () => {
      const req = { params: { id: 'playlistId' }, body: { musicId: 'musicId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Playlist.findByIdAndUpdate.mockResolvedValue({ _id: 'playlistId', musicas: ['musicId'] });

      await playlistController.addMusicToPlaylist(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ _id: 'playlistId', musicas: ['musicId'] });
    });

    it('deve retornar 404 se a playlist não for encontrada', async () => {
      const req = { params: { id: 'playlistId' }, body: { musicId: 'musicId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Playlist.findByIdAndUpdate.mockResolvedValue(null);

      await playlistController.addMusicToPlaylist(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Playlist não encontrada' });
    });
  });
});
