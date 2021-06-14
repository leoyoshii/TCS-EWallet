import { ICreateTransactionDto } from '../dtos/ICreateTransactionDto';
import { IFindAllTransactionFilterDto } from '../dtos/IFindAllTransactionFilterDto';
import { Transaction } from '../infra/typeorm/entities/Transaction';

export interface ITransactionRepository {
  create(data: ICreateTransactionDto): Promise<Transaction>;
  findById(transactionId: string): Promise<Transaction>;
  findAll(data: IFindAllTransactionFilterDto): Promise<[Transaction[], number]>;
  save(data: Transaction): Promise<Transaction>;
}
