import AppErrors from '@shared/infra/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { User } from '../infra/typeorm/entities/User';
import { IUserRepository } from '../interfaces/IUserRepository';

@injectable()
export class DeleteUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  public async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppErrors('User not found.', 404);
    }

    user.isDeleted = !user.isDeleted;

    const userUpdated = await this.userRepository.save(user);

    return userUpdated;
  }
}
