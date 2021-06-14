import { ICreateTransactionCategoryDto } from '@modules/Transaction/dtos/ICreateTransactionCategoryDto';
import { IFindAllTransactionCategoryFilterDto } from '@modules/Transaction/dtos/IFindAllTransactionCategoryFilterDto';
import { ITransactionCategoryRepository } from '@modules/Transaction/interface/ITransactionCategoryRepository';
import AppErrors from '@shared/infra/errors/AppErrors';

import { getRepository, Repository } from 'typeorm';
import { TransactionCategory } from '../entities/TransactionCategory';

export class TransactionCategoryRepository
  implements ITransactionCategoryRepository
{
  private ormRepository: Repository<TransactionCategory>;

  constructor() {
    this.ormRepository = getRepository(TransactionCategory);
  }

  public async create({
    name,
  }: ICreateTransactionCategoryDto): Promise<TransactionCategory> {
    const category = await this.ormRepository.create({
      name,
    });

    return this.ormRepository.save(category);
  }

  public async findById(categoryId: string): Promise<TransactionCategory> {
    const category = await this.ormRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new AppErrors('Category Not found.', 404);
    }

    return category;
  }

  public async findAll({
    page,
    pageSize,
  }: IFindAllTransactionCategoryFilterDto): Promise<
    [TransactionCategory[], number]
  > {
    const [categories, total] = await this.ormRepository.findAndCount({
      skip: page * pageSize,
      take: pageSize,
      order: {
        createdAt: 'DESC',
      },
    });

    return [categories, total];
  }
  public async save(data: TransactionCategory): Promise<TransactionCategory> {
    return this.ormRepository.save(data);
  }
}
