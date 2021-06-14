import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateService from '@modules/Users/services/AuthenticateService';
import { CreateUserService } from '@modules/Users/services/CreateUserService';

export default class AuthenticateController {
  public async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateContainer = container.resolve(AuthenticateService);

    const { token, user } = await authenticateContainer.execute({
      email,
      password,
    });

    return response.status(202).json({ user, token });
  }

  public async register(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name, password, confirmPassword, email } = request.body;

    const createUserContainer = container.resolve(CreateUserService);

    const user = await createUserContainer.execute({
      name,
      password,
      confirmPassword,
      email,
    });

    return response.status(201).json({ user });
  }
}
