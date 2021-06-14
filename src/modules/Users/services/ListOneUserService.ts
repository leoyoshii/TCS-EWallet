import { inject, injectable } from 'tsyringe';
import { User } from '../infra/typeorm/entities/User';
import { IUserRepository } from '../interfaces/IUserRepository';

@injectable()
export class ListOneUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  public async execute(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);

    return user;
  }
}
