import { RequestHandler } from 'express';
import { CustomHTTPError } from '../../utils/custom-http-error.js';
import { Business, BusinessModel } from './busines-model.js';

const queryProjection = { __v: 0 };

export const createBusinessController: RequestHandler<
  unknown,
  unknown,
  Business
> = async (req, res) => {
  const business: Business = {
    ...req.body,
    profileUrl: res.locals.picture,
    creator: res.locals.email,
  };
  await BusinessModel.create(business);
  res.status(201).json(business);
};

export const getBusinessController: RequestHandler = async (
  _req,
  res,
  next,
) => {
  const foundBusiness = await BusinessModel.find({}, queryProjection).exec();

  if (foundBusiness !== null) {
    res.json(foundBusiness);
  }

  return next(
    new CustomHTTPError(404, 'Lo sentimos, no hay salones que mostrar'),
  );
};

export const getBusinessByIdController: RequestHandler = async (
  req,
  res,
  next,
) => {
  const { id } = req.params;
  const business = await BusinessModel.findById(id, queryProjection).exec();
  if (business === null) {
    return next(new CustomHTTPError(404, 'El salón buscado no existe'));
  }

  res.status(200).json(business);
};
