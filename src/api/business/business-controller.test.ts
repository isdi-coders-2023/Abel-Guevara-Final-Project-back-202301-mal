import { Request, Response } from 'express';
import { CustomHTTPError } from '../../utils/custom-http-error';
import { BusinessModel } from './busines-model';
import {
  createBusinessController,
  deleteBusinessByIdController,
  getBusinessByIdController,
  getBusinessController,
} from './business-controller';

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
          remove: jest.fn().mockResolvedValue({
            error: null,
            data: {},
          }),
        }),
      },
    })),
  };
});

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

describe('Given a getByIdcontroller business', () => {
  const request = {
    params: { id: 'mockId' },
  } as Partial<Request>;
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;
  const next = jest.fn();

  const business = {
    id: 'mockId',
    categories: 'barberia',
    nameBusiness: 'barber',
    address: 'malaga',
    phone: '123456789',
    profileUrl: 'mockPicture.jpg.com',
    description: 'la mejor',
    reviews: ['muy bien atendido'],
    score: [5],
    creator: 'abelito@gmail.com',
  };
  BusinessModel.findById = jest.fn().mockImplementation(() => ({
    exec: jest.fn().mockResolvedValue(business),
  }));

  describe('When the user tries to search for a business by id', () => {
    test('Then it should be found', async () => {
      await getBusinessByIdController(
        request as Request,
        response as Response,
        next,
      );

      expect(response.json).toHaveBeenCalledWith(business);
      expect(response.status).toHaveBeenCalledWith(200);
      expect(BusinessModel.findById).toHaveBeenCalledWith('mockId', {
        __v: 0,
      });
    });
  });
  describe('When the user tries to search  for a business by id and dont exist', () => {
    test('Then it should recived a 404 error', async () => {
      BusinessModel.findById = jest.fn().mockImplementation(() => ({
        exec: jest.fn().mockResolvedValue(null),
      }));
      await getBusinessByIdController(
        request as Request,
        response as Response,
        next,
      );
      expect(next).toHaveBeenCalledWith(
        new CustomHTTPError(404, 'El salón buscado no existe'),
      );
    });
  });
});

describe('Given a deleteByIdBusinessController', () => {
  const request = {
    params: { id: 'mockId' },
  } as Partial<Request>;
  const response = {
    status: jest.fn().mockReturnThis(),
    sendStatus: jest.fn(),
    json: jest.fn(),
  } as Partial<Response>;
  const next = jest.fn();

  const business = {
    id: 'mockId',
    categories: 'barberia',
    nameBusiness: 'barber',
    address: 'malaga',
    phone: '123456789',
    profileUrl: 'mockPicture.jpg.com',
    description: 'la mejor',
    reviews: ['muy bien atendido'],
    score: [5],
    creator: 'abelito@gmail.com',
  };
  describe('When the creator wants delete her business', () => {
    test('Then the business should be deleted', async () => {
      BusinessModel.findByIdAndDelete = jest.fn().mockImplementation(() => ({
        exec: jest.fn().mockResolvedValue(business),
      }));

      await deleteBusinessByIdController(
        request as Request<{ id: 'mockIde' }>,
        response as Response,
        next,
      );
      expect(response.sendStatus).toHaveBeenCalledWith(204);
    });
  });
  describe('when the business for delete dont exist', () => {
    test('Then should be throw an error 404', async () => {
      BusinessModel.findByIdAndDelete = jest.fn().mockImplementation(() => ({
        exec: jest.fn().mockResolvedValue(null),
      }));
      await deleteBusinessByIdController(
        request as Request<{ id: 'mockIde' }>,
        response as Response,
        next,
      );
      expect(next).toHaveBeenCalledWith(
        new CustomHTTPError(404, 'El salón no existe'),
      );
    });
  });
});
