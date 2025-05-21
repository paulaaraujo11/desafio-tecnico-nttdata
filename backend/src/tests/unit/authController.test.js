
const authController = require('../../controllers/authController');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

jest.mock('../../models/User');
jest.mock('jsonwebtoken');
jest.mock('bcryptjs');

describe('authController', () => {
  describe('login', () => {
    it('deve retornar um token ao autenticar com sucesso', async () => {
      const req = { body: { email: 'teste@jest.com', senha: '123456' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      User.findOne.mockResolvedValue({ _id: '123', email: 'teste@jest.com', senha: 'hashedPassword' });
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('mockToken');

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token: 'mockToken' });
    });

    it('deve retornar 401 se o usuário não for encontrado', async () => {
      const req = { body: { email: 'naoexiste@jest.com', senha: '123456' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      User.findOne.mockResolvedValue(null);

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Usuário não encontrado' });
    });
  });
});