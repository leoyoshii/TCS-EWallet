import { ICreateTransactionCategoryDto } from '../dtos/ICreateTransactionCategoryDto';
import { IFindAllTransactionCategoryFilterDto } from '../dtos/IFindAllTransactionCategoryFilterDto';
import { TransactionCategory } from '../infra/typeorm/entities/TransactionCategory';

export interface ITransactionCategoryRepository {
  create(data: ICreateTransactionCategoryDto): Promise<TransactionCategory>;
  findById(categoryId: string): Promise<TransactionCategory>;
  findAll(
    data: IFindAllTransactionCategoryFilterDto,
  ): Promise<[TransactionCategory[], number]>;
  save(data: TransactionCategory): Promise<TransactionCategory>;
}
