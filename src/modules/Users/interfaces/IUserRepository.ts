import { ICreateUserDto } from '../dtos/ICreateUserDto';
import { IFindAllFilterDto } from '../dtos/IFindAllFilterDto';
import { IUpdatedBalanceDto } from '../dtos/IUpdatedBalanceDto';
import { User } from '../infra/typeorm/entities/User';

export interface IUserRepository {
  create(data: Omit<ICreateUserDto, 'confirmPassword'>): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByEmailAuth(email: string): Promise<User | undefined>;
  findById(userId: string): Promise<User>;
  findAll(data: IFindAllFilterDto): Promise<[User[], number]>;
  save(user: User): Promise<User>;
  updateUserBalance(data: IUpdatedBalanceDto): Promise<User>;
}
