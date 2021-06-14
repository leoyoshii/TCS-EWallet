import { EnumTransactionType } from '@modules/Transaction/interface/EnumTransactionType';
import { ICreateUserDto } from '@modules/Users/dtos/ICreateUserDto';
import { IFindAllFilterDto } from '@modules/Users/dtos/IFindAllFilterDto';
import { IUpdatedBalanceDto } from '@modules/Users/dtos/IUpdatedBalanceDto';
import { IUserRepository } from '@modules/Users/interfaces/IUserRepository';
import AppErrors from '@shared/infra/errors/AppErrors';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

export class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    email,
    name,
    password,
  }: Omit<ICreateUserDto, 'confirmPassword'>): Promise<User> {
    const user = await this.ormRepository.create({
      name,
      password,
      email,
    });

    return this.ormRepository.save(user);
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppErrors('User Not found.', 404);
    }

    return user;
  }

  public async findByEmailAuth(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
      select: ['password', 'id', 'email', 'isDeleted', 'name'],
    });

    return user;
  }

  public async findById(userId: string): Promise<User> {
    const user = await this.ormRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new AppErrors('User Not found.', 404);
    }

    return user;
  }

  public async findAll({
    page,
    pageSize,
  }: IFindAllFilterDto): Promise<[User[], number]> {
    const [users, total] = await this.ormRepository.findAndCount({
      skip: page * pageSize,
      take: pageSize,
      order: {
        name: 'ASC',
      },
    });

    return [users, total];
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async updateUserBalance({
    type,
    userId,
    value,
  }: IUpdatedBalanceDto): Promise<User> {
    const user = await this.ormRepository.findOne({
      where: { id: userId },
      select: ['id', 'name', 'balance'],
    });

    if (!user) {
      throw new AppErrors('User Not found.', 404);
    }

    if (type === EnumTransactionType.RECEIVE) {
      user.balance += value;
    } else if (type === EnumTransactionType.SEND) {
      if (user.balance - value < 0) {
        throw new AppErrors('Insufficient funds', 400);
      }
      user.balance -= value;
    }

    return this.ormRepository.save(user);
  }
}
