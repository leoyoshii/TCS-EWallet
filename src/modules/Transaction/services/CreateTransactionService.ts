import { IUserRepository } from '@modules/Users/interfaces/IUserRepository';
import { inject, injectable } from 'tsyringe';
import { ICreateTransactionDto } from '../dtos/ICreateTransactionDto';
import { Transaction } from '../infra/typeorm/entities/Transaction';
import { EnumTransactionType } from '../interface/EnumTransactionType';
import { ITransactionRepository } from '../interface/ITransactionRepository';

@injectable()
export class CreateTransactionService {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository,

    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  public async execute({
    receiverId,
    senderId,
    value,
    categoryId,
    description,
  }: ICreateTransactionDto): Promise<Transaction> {
    await this.userRepository.updateUserBalance({
      userId: senderId,
      type: EnumTransactionType.SEND,
      value,
    });

    await this.userRepository.updateUserBalance({
      userId: receiverId,
      type: EnumTransactionType.RECEIVE,
      value,
    });

    const transaction = await this.transactionRepository.create({
      senderId,
      receiverId,
      value,
      categoryId,
      description,
    });

    return transaction;
  }
}
