import { inject, injectable } from 'tsyringe';
import { ICreatePayRequestDto } from '../dtos/ICreatePayRequestDto';
import { PayRequest } from '../infra/typeorm/entities/PayRequest';
import { IPayRequestRepository } from '../interface/IPayRequestRepository';

@injectable()
export class CreatePayRequestService {
  constructor(
    @inject('PayRequestRepository')
    private payRequestRepository: IPayRequestRepository,
  ) {}

  public async execute({
    description,
    requestedId,
    requesterId,
    value,
  }: ICreatePayRequestDto): Promise<PayRequest> {
    const payRequest = await this.payRequestRepository.create({
      description,
      requestedId,
      requesterId,
      value,
    });

    return payRequest;
  }
}
