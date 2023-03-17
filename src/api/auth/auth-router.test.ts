import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import connectDB from '../../database/conecction';
import app from '../../app';
import { UserModel } from '../users/user-schema';
import { encryptPassword } from './auth-utils';
import { AuthRequest } from './auth-types';
describe('Given an app with auth-router', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUrl = mongoServer.getUri();
    await connectDB(mongoUrl);
  });

  afterAll(async () => {
    await mongoServer.stop();
    await mongoose.connection.close();
  });

  describe('When a user wants to log in with an existing email and pasasword', () => {
    test('Then it should be logged in', async () => {
      const user = {
        email: 'abelito@gmail.com',
        password: 'abelito1234',
      };
      const userDb = { ...user, password: encryptPassword(user.password) };
      await UserModel.create(userDb);

      await request(app).post('/auth/login').send(user).expect(201);
    });
  });

  describe('When a user wants to log in with an unexisting email', () => {
    test('Then it should a 404', async () => {
      const notExistUser = {
        email: 'abel86@gmail.com',
        password: '1234',
      };
      await request(app).post('/auth/login').send(notExistUser).expect(404);
    });
  });

  describe('When a user wants to register with a valid data', () => {
    test('Then it should be registered', async () => {
      const user: AuthRequest = {
        name: 'Abelito',
        surname: 'Guevara',
        email: 'abelito86@gmail.com',
        password: 'abelito1234',
      };

      await request(app).post('/auth/register').send(user).expect(201);
    });
  });

  describe('When the user wants to register with an existing email address', () => {
    test('Then it should receive a 409 error', async () => {
      const user: AuthRequest = {
        name: 'Abelito',
        surname: 'Guevara',
        email: 'abelito@gmail.com',
        password: 'abelito1234',
      };
      await request(app).post('/auth/register').send(user).expect(409);
    });
  });

  describe('When a user wants to register with an invalid email', () => {
    test('Then it should not be registered', async () => {
      const invalidUser: AuthRequest = {
        name: 'Abelito',
        surname: 'Guevara',
        email: 'm@',
        password: 'abelito1234',
      };

      const response = await request(app)
        .post('/auth/register')
        .send(invalidUser)
        .expect(400);

      expect(response.body).toEqual({
        msg: '"email" must be a valid email',
      });
    });
  });
});
