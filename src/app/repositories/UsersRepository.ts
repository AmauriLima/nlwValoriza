import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../entities/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  async findByEmail(email: string) {
    const user = await this.findOne({ email });
    return user;
  }
}

export default UsersRepository;
