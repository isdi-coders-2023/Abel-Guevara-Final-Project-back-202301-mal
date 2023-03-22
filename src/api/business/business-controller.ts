import { RequestHandler } from 'express';
import { Business, BusinessModel } from './busines-model.js';

export const createBusinessController: RequestHandler<
  unknown,
  unknown,
  Business
> = async (req, res) => {
  const business: Business = {
    ...req.body,
    profileUrl: res.locals.picture,
  };
  await BusinessModel.create(business);
  res.status(201).json(business);
};
