import { inject, injectable } from 'tsyringe';
import { IFindAllTransactionCategoryFilterDto } from '../dtos/IFindAllTransactionCategoryFilterDto';
import { TransactionCategory } from '../infra/typeorm/entities/TransactionCategory';
import { ITransactionCategoryRepository } from '../interface/ITransactionCategoryRepository';

@injectable()
export class ListAllTransactionCategoryService {
  constructor(
    @inject('TransactionCategoryRepository')
    private transactionCategoryRepository: ITransactionCategoryRepository,
  ) {}

  public async execute({
    page,
    pageSize,
  }: IFindAllTransactionCategoryFilterDto): Promise<
    [TransactionCategory[], number]
  > {
    const [categories, total] =
      await this.transactionCategoryRepository.findAll({
        page,
        pageSize,
      });

    return [categories, total];
  }
}
