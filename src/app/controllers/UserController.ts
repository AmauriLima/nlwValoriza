import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcryptjs';

import { classToPlain } from 'class-transformer';
import usersRepository from '../repositories/UsersRepository';
import { generateToken } from '../../utils/generateToken';

class UserController {
  async index(request: Request, response: Response) {
    const UsersRepository = getCustomRepository(usersRepository);

    const users = await UsersRepository.find();

    const formattedUsers = classToPlain(users);

    response.status(200).json(formattedUsers);
  }

  async store(request: Request, response: Response) {
    const UsersRepository = getCustomRepository(usersRepository);
    const {
      name, email, admin = false, password,
    } = request.body;

    if (!name || !email || !password) {
      return response.status(400).json({ error: 'Required arguments missing' });
    }

    const userAlreadyExists = await UsersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = UsersRepository.create({
      name, email, admin, password: encryptedPassword,
    });

    await UsersRepository.save(user);
    user.password = undefined;

    response.status(201).json({
      user,
      token: generateToken(user),
    });
  }

  async login(request: Request, response: Response) {
    const UsersRepository = getCustomRepository(usersRepository);
    const { email, password } = request.body;

    const user = await UsersRepository.findOne({
      email,
    });

    if (!user) {
      return response.status(401).json({ error: 'Email or Password incorrect ' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return response.status(401).json({ erro: 'Email or Password incorrect ' });
    }

    user.password = undefined;

    response.status(200).json({
      user,
      token: generateToken(user),
    });
  }
}

export default new UserController();
