import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import tagsRepository from '../repositories/TagsRepository';

class TagController {
  async store(request: Request, response: Response) {
    const TagsRepository = getCustomRepository(tagsRepository);
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const tagAlreadyExists = await TagsRepository.findOne({
      name,
    });

    if (tagAlreadyExists) {
      return response.status(400).json({ error: 'Tag already exists' });
    }

    const tag = TagsRepository.create({
      name,
    });

    await TagsRepository.save(tag);

    response.status(201).json(tag);
  }
}

export default new TagController();
