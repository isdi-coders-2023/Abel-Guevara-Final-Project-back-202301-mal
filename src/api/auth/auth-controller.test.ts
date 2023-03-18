import { Request, Response } from 'express';
import { encryptPassword, generateJWTToken } from './auth-utils';
import { UserModel } from '../users/user-schema';
import { loginUserController, registerUserController } from './auth-controller';
import { CustomHTTPError } from '../../utils/custom-http-error';

describe('Given a login controller', () => {
  const request = {
    body: {
      email: 'abelito@gmail.com',
      password: 'abelito1234',
    },
  } as Partial<Request>;
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    sendStatus: jest.fn(),
  } as Partial<Response>;
  const next = jest.fn();
  const tokenJWT = {
    accessToken: generateJWTToken(request.body.email),
  };
  const encrypRequest = {
    email: 'abelito@gmail.com',
    password: encryptPassword('abelito1234'),
  };
  test('When the user tries to login and the response is successful, a token is returned', async () => {
    UserModel.findOne = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(1),
    }));
    await loginUserController(request as Request, response as Response, next);
    expect(UserModel.findOne).toHaveBeenCalledWith(encrypRequest);
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith(tokenJWT);
  });

  test('When the user tries to login and the user is not found, a 404 is returned', async () => {
    UserModel.findOne = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(null),
    }));
    await loginUserController(request as Request, response as Response, next);
    expect(next).toHaveBeenCalledWith(
      new CustomHTTPError(404, 'Su correo o contraseña no existe'),
    );
  });
});

describe('Given a register controller', () => {
  const request = {
    body: {
      name: 'Abelito',
      surname: 'Guevara',
      email: 'abelito@gmail.com',
      password: 'abelito1234',
    },
  } as Partial<Request>;
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    sendStatus: jest.fn(),
  } as Partial<Response>;

  const newUser = { ...request.body, password: encryptPassword('abelito1234') };

  describe('When a user wants to register with a correct data', () => {
    test('Then the user will be registered', async () => {
      UserModel.create = jest.fn();
      UserModel.findOne = jest.fn().mockImplementation(() => ({
        exec: jest.fn().mockResolvedValue(null),
      }));

      await registerUserController(
        request as Request,
        response as Response,
        jest.fn(),
      );

      expect(response.status).toHaveBeenCalledWith(201);
      expect(UserModel.create).toHaveBeenCalledWith(newUser);
    });
  });

  describe('When the user already exists', () => {
    test('Then you should receive a 409 error', async () => {
      UserModel.findOne = jest.fn().mockImplementation(() => ({
        exec: jest.fn().mockResolvedValue(1),
      }));
      const next = jest.fn();
      await registerUserController(
        request as Request,
        response as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(
        new CustomHTTPError(409, 'Su usuario ya está registrado'),
      );
    });
  });
});
