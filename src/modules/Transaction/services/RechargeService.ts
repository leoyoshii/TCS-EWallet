import { EnumTransactionType } from '@modules/Transaction/interface/EnumTransactionType';
import { IUserRepository } from '@modules/Users/interfaces/IUserRepository';
import { inject, injectable } from 'tsyringe';
import { IRechargeDto } from '../dtos/IRechargeDto';
import { Transaction } from '../infra/typeorm/entities/Transaction';
import { ITransactionRepository } from '../interface/ITransactionRepository';

@injectable()
export class RechargeService {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository,

    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  public async execute({ userId, value }: IRechargeDto): Promise<Transaction> {
    await this.userRepository.updateUserBalance({
      type: EnumTransactionType.RECEIVE,
      userId,
      value,
    });

    const transaction = await this.transactionRepository.create({
      receiverId: userId,
      senderId: userId,
      value,
      description: 'Recarga',
    });

    return transaction;
  }
}
