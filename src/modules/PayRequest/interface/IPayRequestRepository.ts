import { ICreatePayRequestDto } from '../dtos/ICreatePayRequestDto';
import { IFindAllPayRequestFilterDto } from '../dtos/IFindAllPayRequestFilterDto';
import { PayRequest } from '../infra/typeorm/entities/PayRequest';

export interface IPayRequestRepository {
  create(data: ICreatePayRequestDto): Promise<PayRequest>;
  findAll(data: IFindAllPayRequestFilterDto): Promise<[PayRequest[], number]>;
  findById(payRequestId: string): Promise<PayRequest>;
  save(data: PayRequest): Promise<PayRequest>;
}
