import { inject, injectable } from 'tsyringe';
import { ICreateTransactionCategoryDto } from '../dtos/ICreateTransactionCategoryDto';
import { TransactionCategory } from '../infra/typeorm/entities/TransactionCategory';
import { ITransactionCategoryRepository } from '../interface/ITransactionCategoryRepository';

@injectable()
export class CreateTransactionCategoryService {
  constructor(
    @inject('TransactionCategoryRepository')
    private transactionCategoryRepository: ITransactionCategoryRepository,
  ) {}

  public async execute({
    name,
  }: ICreateTransactionCategoryDto): Promise<TransactionCategory> {
    const category = await this.transactionCategoryRepository.create({
      name,
    });

    return category;
  }
}
