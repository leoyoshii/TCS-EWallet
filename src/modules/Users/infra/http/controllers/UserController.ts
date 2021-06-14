import { DeleteUserService } from '@modules/Users/services/DeleteUserService';
import { ListAllUserService } from '@modules/Users/services/ListAllUserService';
import { ListOneUserService } from '@modules/Users/services/ListOneUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UserController {
  public async listAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { page, pageSize } = request.query;

    const listAllUserContainer = container.resolve(ListAllUserService);

    const [users, total] = await listAllUserContainer.execute({
      page: Number(page),
      pageSize: Number(pageSize),
    });

    return response.status(201).json({ users, total });
  }

  public async listOne(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { userId } = request.params;

    const listOneUserContainer = container.resolve(ListOneUserService);

    const user = await listOneUserContainer.execute(userId);

    return response.status(201).json({ user });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;

    const deleteUserContainer = container.resolve(DeleteUserService);

    const user = await deleteUserContainer.execute(userId);

    return response.status(201).json({ user });
  }
}
