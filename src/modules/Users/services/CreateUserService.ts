import { IHashProvider } from '@shared/container/providers/HashProvider/interface/IHashProvider';
import AppErrors from '@shared/infra/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { ICreateUserDto } from '../dtos/ICreateUserDto';
import { User } from '../infra/typeorm/entities/User';
import { IUserRepository } from '../interfaces/IUserRepository';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    password,
    email,
    confirmPassword,
  }: ICreateUserDto): Promise<User> {
    const checkEmailInUse = await this.userRepository.findByEmailAuth(email);

    if (checkEmailInUse) {
      throw new AppErrors('Email em uso', 400);
    }

    if (password !== confirmPassword) {
      throw new AppErrors('As senhas estão diferentes', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
