import { RequestHandler } from 'express';
import { CustomHTTPError } from '../../utils/custom-http-error.js';
import { UserModel } from '../users/user-schema.js';
import { AuthRequest, LoginResponse } from './auth-types.js';
import { encryptPassword, generateJWTToken } from './auth-utils.js';

export const registerUserController: RequestHandler<
  unknown,
  unknown,
  AuthRequest
> = async (req, res, next) => {
  const { name, surname, email, password } = req.body;

  const existingDbUser = await UserModel.findOne({ email }).exec();
  if (existingDbUser !== null) {
    return next(new CustomHTTPError(409, 'Su usuario ya está registrado'));
  }

  const user = {
    name,
    surname,
    email,
    password: encryptPassword(password),
  };

  await UserModel.create(user);
  res.status(201).json('Su usuario ha sido registrado');
};

export const loginUserController: RequestHandler<
  unknown,
  LoginResponse,
  AuthRequest
> = async (req, res, next) => {
  const { email, password } = req.body;
  const filterUser = {
    email,
    password: encryptPassword(password),
  };

  const existingUser = await UserModel.findOne(filterUser).exec();

  if (existingUser === null) {
    return next(new CustomHTTPError(404, 'Su correo o contraseña no existe'));
  }

  const tokenJWT = generateJWTToken(email);
  res.status(201).json({
    accessToken: tokenJWT,
  });
};
