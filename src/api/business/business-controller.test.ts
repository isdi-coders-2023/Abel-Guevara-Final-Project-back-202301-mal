import { Request, Response } from 'express';
import { CustomHTTPError } from '../../utils/custom-http-error';
import { BusinessModel } from './busines-model';
import {
  createBusinessController,
  getBusinessController,
} from './business-controller';

describe('Given a create business controller', () => {
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
    creator: 'test@example.com',
  } as Partial<Request>;

  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    locals: {
      email: 'test@example.com',
    },
  } as Partial<Response>;

  describe('When the user wants to register his business', () => {
    test('Then he should do it', async () => {
      BusinessModel.create = jest.fn().mockResolvedValue(request);

      await createBusinessController(
        request as Request,
        response as Response,
        jest.fn(),
      );

      expect(BusinessModel.create).toHaveBeenCalledWith({
        ...request.body,
        profileUrl: undefined,
        creator: 'test@example.com',
      });
      expect(response.status).toHaveBeenCalledWith(201);
    });
  });
});

describe('Given a get business controller', () => {
  const request = {} as Request;
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;
  const next = jest.fn();

  const business = {
    _id: 'mockId',
    categories: 'barberia',
    nameBusiness: 'barber',
    address: 'malaga',
    phone: '123456789',
    profileUrl: 'mockPicture.jpg.com',
    description: 'la mejor',
    reviews: ['muy bien atendido'],
    score: [5],
  };
  describe('When the user wants get all business', () => {
    test('Then should get all business', async () => {
      BusinessModel.find = jest.fn().mockImplementation(() => ({
        exec: jest.fn().mockResolvedValue(business),
      }));

      await getBusinessController(request, response as Response, next);

      expect(response.json).toHaveBeenCalledWith(business);
      expect(BusinessModel.find).toHaveBeenCalledWith({}, { __v: 0 });
    });
  });
  describe('When dont exist business', () => {
    test('Then the user should recive a 404 error', async () => {
      BusinessModel.find = jest.fn().mockImplementation(() => ({
        exec: jest.fn().mockResolvedValue(null),
      }));

      await getBusinessController(request, response as Response, next);

      expect(next).toHaveBeenCalledWith(
        new CustomHTTPError(404, 'Lo sentimos, no hay salones que mostrar'),
      );
    });
  });
});
