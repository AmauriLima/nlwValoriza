import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import usersRepository from '../repositories/UsersRepository';

class UserController {
  async store(request: Request, response: Response) {
    const UsersRepository = getCustomRepository(usersRepository);
    const { name, email, admin } = request.body;

    const userAlreadyExists = await UsersRepository.findByEmail(email);

    if (!email) {
      return response.status(400).json({ error: 'E-mail is required' });
    }

    if (userAlreadyExists) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const user = UsersRepository.create({
      name, email, admin,
    });

    await UsersRepository.save(user);

    response.status(201).json(user);
  }
}

export default new UserController();
