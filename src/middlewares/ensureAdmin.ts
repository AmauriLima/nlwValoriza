import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import usersRepository from '../app/repositories/UsersRepository';

async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const UsersRepository = getCustomRepository(usersRepository);
  const { user_id } = request;

  const { admin } = await UsersRepository.findOne(user_id);

  return admin
    ? next()
    : response.status(401).json({
      error: 'Unauthorized user',
    });
}

export default ensureAdmin;
