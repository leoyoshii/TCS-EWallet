import { getRepository, Repository } from 'typeorm';
import { format, parseISO } from 'date-fns';

import { ICreateTransactionDto } from '@modules/Transaction/dtos/ICreateTransactionDto';
import { IFindAllTransactionFilterDto } from '@modules/Transaction/dtos/IFindAllTransactionFilterDto';
import { ITransactionRepository } from '@modules/Transaction/interface/ITransactionRepository';
import AppErrors from '@shared/infra/errors/AppErrors';
import { Transaction } from '../entities/Transaction';
import { EnumTransactionType } from '@modules/Transaction/interface/EnumTransactionType';

export class TransactionRepository implements ITransactionRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  public async create({
    receiverId,
    senderId,
    value,
    categoryId,
    description,
  }: ICreateTransactionDto): Promise<Transaction> {
    const transaction = await this.ormRepository.create({
      receiverId,
      senderId,
      value,
      categoryId,
      description,
    });

    return this.ormRepository.save(transaction);
  }

  public async findById(transactionId: string): Promise<Transaction> {
    const transaction = await this.ormRepository.findOne({
      where: { id: transactionId },
    });

    if (!transaction) {
      throw new AppErrors('Transaction Not found.', 404);
    }

    return transaction;
  }

  public async findAll({
    page,
    pageSize,
    userId,
    transactionType,
    filterDateTo,
    filterDatefrom,
  }: IFindAllTransactionFilterDto): Promise<[Transaction[], number]> {
    const query = await this.ormRepository.createQueryBuilder('transactions');
    query.leftJoinAndSelect('transactions.sender', 'sender');

    query.leftJoinAndSelect('transactions.receiver', 'receiver');

    if (transactionType === EnumTransactionType.SEND) {
      query.andWhere('transactions.senderId =:userId', { userId });
    } else if (transactionType === EnumTransactionType.RECEIVE) {
      query.andWhere('transactions.receiverId =:userId', { userId });
    } else {
      query.andWhere('transactions.senderId =:userId', { userId });
      query.orWhere('transactions.receiverId =:userId', { userId });
    }

    if (filterDatefrom && !filterDateTo) {
      query.andWhere(
        `to_char(transactions.createdAt, 'YYYY-MM-DD') >= :filterDatefrom`,
        { filterDatefrom: format(parseISO(filterDatefrom), 'yyy-MM-dd') },
      );
    } else if (!filterDatefrom && filterDateTo) {
      query.andWhere(
        `to_char(transactions.createdAt, 'YYYY-MM-DD') <= :filterDateTo`,
        { filterDateTo: format(parseISO(filterDateTo), 'yyyy-MM-dd') },
      );
    } else if (filterDatefrom && filterDateTo) {
      query.andWhere(
        `to_char(transactions.createdAt, 'YYYY-MM-DD') BETWEEN :filterDatefrom AND :filterDateTo`,
        {
          filterDatefrom: format(parseISO(filterDatefrom), 'yyyy-MM-dd'),
          filterDateTo: format(parseISO(filterDateTo), 'yyyy-MM-dd'),
        },
      );
    }

    query.skip(page * pageSize);
    query.take(pageSize);

    query.orderBy({
      'transactions.createdAt': 'DESC',
    });

    const [transactions, total] = await query.getManyAndCount();

    return [transactions, total];
  }

  public async save(data: Transaction): Promise<Transaction> {
    return this.ormRepository.save(data);
  }
}
