import { container } from 'tsyringe';
import './providers';

import { UserRepository } from '@modules/Users/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/Users/interfaces/IUserRepository';

import { TransactionRepository } from '@modules/Transaction/infra/typeorm/repositories/TransactionRepository';
import { ITransactionRepository } from '@modules/Transaction/interface/ITransactionRepository';

import { TransactionCategoryRepository } from '@modules/Transaction/infra/typeorm/repositories/TransactionCategoryRepository';
import { ITransactionCategoryRepository } from '@modules/Transaction/interface/ITransactionCategoryRepository';

import { IPayRequestRepository } from '@modules/PayRequest/interface/IPayRequestRepository';
import { PayRequestRepository } from '@modules/PayRequest/infra/typeorm/repositories/PayRequestRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<ITransactionRepository>(
  'TransactionRepository',
  TransactionRepository,
);
container.registerSingleton<ITransactionCategoryRepository>(
  'TransactionCategoryRepository',
  TransactionCategoryRepository,
);

container.registerSingleton<IPayRequestRepository>(
  'PayRequestRepository',
  PayRequestRepository,
);
