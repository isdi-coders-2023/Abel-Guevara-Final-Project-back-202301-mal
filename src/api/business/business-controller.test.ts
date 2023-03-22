import { Request, Response } from 'express';
import { BusinessModel } from './busines-model';
import { createBusinessController } from './business-controller';

describe('Given a business controller', () => {
  const request = {
    body: {
      categories: 'barberia',
      nameBusiness: 'barber',
      address: 'malaga',
      phone: '123456789',
      description: 'la mejor',
      reviews: 'muy bien atendido',
      score: 5,
    },
    profileUrl: { buffer: Buffer.from('mockBuffer') },
  } as Partial<Request>;

  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    locals: {
      email: 'test@example.com',
    },
  } as Partial<Response>;

  describe('When the user wants to register his business', () => {
    test.only('Then he should do it', async () => {
      BusinessModel.create = jest.fn().mockResolvedValue(request);

      await createBusinessController(
        request as Request,
        response as Response,
        jest.fn(),
      );

      expect(BusinessModel.create).toHaveBeenCalledWith({
        ...request.body,
      });
      expect(response.status).toHaveBeenCalledWith(201);
    });
  });
});
