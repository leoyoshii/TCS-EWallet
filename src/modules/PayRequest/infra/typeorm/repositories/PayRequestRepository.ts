import { ICreatePayRequestDto } from '@modules/PayRequest/dtos/ICreatePayRequestDto';
import { IFindAllPayRequestFilterDto } from '@modules/PayRequest/dtos/IFindAllPayRequestFilterDto';
import { IPayRequestRepository } from '@modules/PayRequest/interface/IPayRequestRepository';
import AppErrors from '@shared/infra/errors/AppErrors';
import { getRepository, Repository } from 'typeorm';
import { PayRequest } from '../entities/PayRequest';

export class PayRequestRepository implements IPayRequestRepository {
  private ormRepository: Repository<PayRequest>;

  constructor() {
    this.ormRepository = getRepository(PayRequest);
  }
  public async create({
    requestedId,
    requesterId,
    value,
    description,
  }: ICreatePayRequestDto): Promise<PayRequest> {
    const payRequest = await this.ormRepository.create({
      requestedId,
      requesterId,
      value,
      description,
    });

    return this.ormRepository.save(payRequest);
  }
  public async findAll({
    page,
    pageSize,
    requestedId,
    requesterId,
  }: IFindAllPayRequestFilterDto): Promise<[PayRequest[], number]> {
    const query = await this.ormRepository.createQueryBuilder('payrequest');
    query.leftJoinAndSelect('payrequest.requester', 'requester');
    query.leftJoinAndSelect('payrequest.requested', 'requested');

    if (requestedId) {
      query.andWhere('payrequest.requestedId =:requestedId', { requestedId });
    }
    if (requesterId) {
      query.andWhere('payrequest.requesterId =:requesterId', { requesterId });
    }
    query.skip(page * pageSize);
    query.take(pageSize);

    query.orderBy({
      'payrequest.createdAt': 'DESC',
    });

    const [payRequests, total] = await query.getManyAndCount();

    return [payRequests, total];
  }

  public async findById(payRequestId: string): Promise<PayRequest> {
    const payRequest = await this.ormRepository.findOne({
      where: { id: payRequestId },
    });

    if (!payRequest) {
      throw new AppErrors('PayRequest Not found.', 404);
    }

    return payRequest;
  }

  public async save(data: PayRequest): Promise<PayRequest> {
    return this.ormRepository.save(data);
  }
}
