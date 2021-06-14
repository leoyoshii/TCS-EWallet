import { inject, injectable } from 'tsyringe';
import { IFindAllPayRequestFilterDto } from '../dtos/IFindAllPayRequestFilterDto';
import { PayRequest } from '../infra/typeorm/entities/PayRequest';
import { IPayRequestRepository } from '../interface/IPayRequestRepository';

@injectable()
export class ListAllRequestedPayRequestByUserIdService {
  constructor(
    @inject('PayRequestRepository')
    private payRequestRepository: IPayRequestRepository,
  ) {}

  public async execute({
    page,
    pageSize,
    requestedId,
  }: IFindAllPayRequestFilterDto): Promise<[PayRequest[], number]> {
    const [payRequest, total] = await this.payRequestRepository.findAll({
      page,
      pageSize,
      requestedId,
    });

    return [payRequest, total];
  }
}
