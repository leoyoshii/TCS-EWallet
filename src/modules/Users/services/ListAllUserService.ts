import { inject, injectable } from 'tsyringe';
import { IFindAllFilterDto } from '../dtos/IFindAllFilterDto';
import { User } from '../infra/typeorm/entities/User';
import { IUserRepository } from '../interfaces/IUserRepository';

@injectable()
export class ListAllUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  public async execute({
    page,
    pageSize,
  }: IFindAllFilterDto): Promise<[User[], number]> {
    const [users, total] = await this.userRepository.findAll({
      page,
      pageSize,
    });

    return [users, total];
  }
}
