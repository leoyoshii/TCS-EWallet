import { CreateTransactionCategoryService } from '@modules/Transaction/services/CreateTransactionCategoryService';
import { ListAllTransactionCategoryService } from '@modules/Transaction/services/ListAllTransactionCategoryService';
import { ListOneTransactionCategoryService } from '@modules/Transaction/services/ListOneTransactionCategoryService';
import { UpdateTransactionCategoryService } from '@modules/Transaction/services/UpdateTransactionCategoryService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class TransactionCategoryController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createTransactionCategoryContainer = container.resolve(
      CreateTransactionCategoryService,
    );

    const category = await createTransactionCategoryContainer.execute({
      name,
    });

    return response.status(201).json({ category });
  }

  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { page, pageSize } = request.query;

    const listAllTransactionCategoryContainer = container.resolve(
      ListAllTransactionCategoryService,
    );

    const [categories, total] =
      await listAllTransactionCategoryContainer.execute({
        page: Number(page),
        pageSize: Number(pageSize),
      });

    return response.status(201).json({ categories, total });
  }

  public async findOne(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { categoryId } = request.params;

    const listOneTransactionCategoryService = container.resolve(
      ListOneTransactionCategoryService,
    );

    const category = await listOneTransactionCategoryService.execute(
      categoryId,
    );

    return response.status(201).json({ category });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { categoryId } = request.params;
    const { name } = request.body;

    const updateTransactionCategoryContainer = container.resolve(
      UpdateTransactionCategoryService,
    );

    const category = await updateTransactionCategoryContainer.execute({
      categoryId,
      name,
    });

    return response.status(201).json({ category });
  }
}
