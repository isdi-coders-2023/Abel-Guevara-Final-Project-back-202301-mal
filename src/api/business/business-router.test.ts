import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../../app';
import connectDB from '../../database/conecction';
import { Business } from './busines-model';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

jest.mock('@supabase/supabase-js', () => {
  const data = {
    publicUrl: 'https://example.com/photo.png',
  };
  return {
    createClient: jest.fn().mockImplementation(() => ({
      storage: {
        from: jest.fn().mockReturnValue({
          upload: jest.fn().mockResolvedValue({
            error: null,
            data: {
              ...data,
            },
          }),
          getPublicUrl: jest.fn().mockReturnValue({
            error: null,
            data: {
              ...data,
            },
          }),
        }),
      },
    })),
  };
});

describe('Given an app with businesss-router', () => {
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

  describe('When the user wants create his business', () => {
    test('Then it should be created', async () => {
      process.env.JWT_SECRET = 'mySecretToken';

      const token = jwt.sign(
        { email: 'barber@inked.com' },
        process.env.JWT_SECRET,
      );

      // Const mockSupaBase = { file: { buffer: Buffer.from('mockedBuffer') } };

      const business: Business = {
        categories: 'barberia',
        nameBusiness: 'barber',
        address: 'malaga',
        phone: '123456789',
        profileUrl: 'mockPicture.jpg.com',
        description: 'la mejor',
        reviews: ['muy bien atendido'],
        score: [5],
        creator: 'test@example.com',
      };

      await request(app)
        .post('/api/v1/business')
        .set('Authorization', `Bearer ${token}`)
        .send(business)
        .expect(201);
    });
  });

  describe('When the user wants create his business', () => {
    test('Then it should receive a 401 error', async () => {
      const business: Business = {
        categories: 'barberia',
        nameBusiness: 'barber',
        address: 'malaga',
        phone: '123456789',
        profileUrl: 'mockPicture.jpg.com',
        description: 'la mejor',
        reviews: ['muy bien atendido'],
        score: [5],
        creator: 'test@example.com',
      };
      await request(app).post('/api/v1/business').send(business).expect(401);
    });
  });
});
