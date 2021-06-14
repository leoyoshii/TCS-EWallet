import { inject, injectable } from 'tsyringe';
import { PayRequest } from '../infra/typeorm/entities/PayRequest';
import { IPayRequestRepository } from '../interface/IPayRequestRepository';

@injectable()
export class DeletePayRequestService {
  constructor(
    @inject('PayRequestRepository')
    private payRequestRepository: IPayRequestRepository,
  ) {}

  public async execute(payRequestId: string): Promise<PayRequest> {
    const payRequest = await this.payRequestRepository.findById(payRequestId);

    payRequest.isDeleted = !payRequest.isDeleted;

    return this.payRequestRepository.save(payRequest);
  }
}
