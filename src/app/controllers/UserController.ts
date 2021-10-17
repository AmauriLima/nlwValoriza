import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import usersRepository from '../repositories/UsersRepository';

class UserController {
  async store(request: Request, response: Response) {
    const UsersRepository = getCustomRepository(usersRepository);
    const {
      name, email, admin, password,
    } = request.body;

    const userAlreadyExists = await UsersRepository.findOne({
      email,
    });

    if (!email) {
      return response.status(400).json({ error: 'E-mail is required' });
    }

    if (!password) {
      return response.status(400).json({ error: 'Password is required' });
    }

    if (userAlreadyExists) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = UsersRepository.create({
      name, email, admin, password: encryptedPassword,
    });

    await UsersRepository.save(user);
    user.password = undefined;

    response.status(201).json(user);
  }
}

export default new UserController();
