import { inject, injectable } from 'tsyringe';
import { IFindAllTransactionFilterDto } from '../dtos/IFindAllTransactionFilterDto';
import { Transaction } from '../infra/typeorm/entities/Transaction';
import { ITransactionRepository } from '../interface/ITransactionRepository';

@injectable()
export class ListAllTransactionService {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository,
  ) {}

  public async execute({
    page,
    pageSize,
    userId,
    transactionType,
    filterDateTo,
    filterDatefrom,
  }: IFindAllTransactionFilterDto): Promise<[Transaction[], number]> {
    const [transactions, total] = await this.transactionRepository.findAll({
      page,
      pageSize,
      userId,
      transactionType,
      filterDateTo,
      filterDatefrom,
    });

    return [transactions, total];
  }
}
