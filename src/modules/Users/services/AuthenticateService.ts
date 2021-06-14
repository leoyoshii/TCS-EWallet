import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import auth from '@config/auth';
import AppErrors from '@shared/infra/errors/AppErrors';
import { IUserRepository } from '../interfaces/IUserRepository';
import { IHashProvider } from '@shared/container/providers/HashProvider/interface/IHashProvider';
import {
  IAuthenticateUserdto,
  IAuthenticateUserResponse,
} from '../dtos/IAuthenticateUserDto';

@injectable()
export default class AuthenticateService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: IAuthenticateUserdto): Promise<IAuthenticateUserResponse> {
    const user = await this.userRepository.findByEmailAuth(email);

    if (user.isDeleted) {
      throw new AppErrors('Usuário desativado.', 400);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppErrors('Login/Senha incorreta.', 400);
    }

    const { expiresIn, secret } = auth.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { token, user: { id: user.id, name: user.name, email: user.email } };
  }
}
