import { inject, injectable } from 'tsyringe';
import { IFindAllPayRequestFilterDto } from '../dtos/IFindAllPayRequestFilterDto';
import { PayRequest } from '../infra/typeorm/entities/PayRequest';
import { IPayRequestRepository } from '../interface/IPayRequestRepository';

@injectable()
export class ListAllRequesterPayRequestByUserIdService {
  constructor(
    @inject('PayRequestRepository')
    private payRequestRepository: IPayRequestRepository,
  ) {}

  public async execute({
    page,
    pageSize,
    requesterId,
  }: IFindAllPayRequestFilterDto): Promise<[PayRequest[], number]> {
    const [payRequest, total] = await this.payRequestRepository.findAll({
      page,
      pageSize,
      requesterId,
    });

    return [payRequest, total];
  }
}
