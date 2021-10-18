import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import complimentsRepository from '../repositories/ComplimentsRepository';
import tagsRepository from '../repositories/TagsRepository';
import usersRepository from '../repositories/UsersRepository';

class ComplimentController {
  async store(request: Request, response: Response) {
    const ComplimentsRepository = getCustomRepository(complimentsRepository);
    const UsersRepository = getCustomRepository(usersRepository);
    const TagsRepository = getCustomRepository(tagsRepository);

    const {
      tag_id,
      user_sender,
      user_receiver,
      message,
    } = request.body;

    const tagExists = await TagsRepository.findOne({
      id: tag_id,
    });

    if (!tagExists) {
      return response.status(404).json({ error: 'Tag not found' });
    }

    const userReceiverExists = await UsersRepository.findOne(user_receiver);

    if (user_sender === user_receiver) {
      return response.status(401).json({ error: 'Incorrect user receiver' });
    }

    if (!userReceiverExists) {
      return response.status(404).json({ error: 'Users receiver does not exists!' });
    }

    const compliment = ComplimentsRepository.create({
      tag_id,
      user_receiver,
      user_sender,
      message,
    });

    await ComplimentsRepository.save(compliment);

    response.status(201).json(compliment);
  }
}

export default new ComplimentController();
