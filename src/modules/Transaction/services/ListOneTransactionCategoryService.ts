import { inject, injectable } from 'tsyringe';
import { TransactionCategory } from '../infra/typeorm/entities/TransactionCategory';
import { ITransactionCategoryRepository } from '../interface/ITransactionCategoryRepository';

@injectable()
export class ListOneTransactionCategoryService {
  constructor(
    @inject('TransactionCategoryRepository')
    private transactionCategoryRepository: ITransactionCategoryRepository,
  ) {}

  public async execute(categoryId: string): Promise<TransactionCategory> {
    const category = await this.transactionCategoryRepository.findById(
      categoryId,
    );

    return category;
  }
}
