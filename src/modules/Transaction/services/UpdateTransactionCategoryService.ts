import { inject, injectable } from 'tsyringe';
import { IUpdateTransactionCategoryDto } from '../dtos/IUpdateTransactionCategoryDto';
import { TransactionCategory } from '../infra/typeorm/entities/TransactionCategory';
import { ITransactionCategoryRepository } from '../interface/ITransactionCategoryRepository';

@injectable()
export class UpdateTransactionCategoryService {
  constructor(
    @inject('TransactionCategoryRepository')
    private transactionCategoryRepository: ITransactionCategoryRepository,
  ) {}

  public async execute({
    categoryId,
    name,
  }: IUpdateTransactionCategoryDto): Promise<TransactionCategory> {
    const category = await this.transactionCategoryRepository.findById(
      categoryId,
    );

    category.name = name;

    return this.transactionCategoryRepository.save(category);
  }
}
