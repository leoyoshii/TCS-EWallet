import { IPayRequestRepository } from '@modules/PayRequest/interface/IPayRequestRepository';
import { EnumTransactionType } from '@modules/Transaction/interface/EnumTransactionType';
import { ITransactionRepository } from '@modules/Transaction/interface/ITransactionRepository';
import { IUserRepository } from '@modules/Users/interfaces/IUserRepository';
import { inject, injectable } from 'tsyringe';
import { Transaction } from '../infra/typeorm/entities/Transaction';

@injectable()
export class PayPayRequestService {
  constructor(
    @inject('PayRequestRepository')
    private payRequestRepository: IPayRequestRepository,

    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository,

    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  public async execute(payRequestId: string): Promise<Transaction> {
    const payRequest = await this.payRequestRepository.findById(payRequestId);

    await this.userRepository.updateUserBalance({
      type: EnumTransactionType.SEND,
      userId: payRequest.requestedId,
      value: payRequest.value,
    });

    await this.userRepository.updateUserBalance({
      type: EnumTransactionType.RECEIVE,
      userId: payRequest.requesterId,
      value: payRequest.value,
    });

    const transaction = await this.transactionRepository.create({
      senderId: payRequest.requestedId,
      receiverId: payRequest.requesterId,
      value: payRequest.value,
    });

    payRequest.paid = true;
    payRequest.transactionId = transaction.id;

    await this.payRequestRepository.save(payRequest);

    return transaction;
  }
}
