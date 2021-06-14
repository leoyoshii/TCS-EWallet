import payRequestRouter from '@modules/PayRequest/infra/http/routes/PayRequest.routes';
import transactionCategoryRouter from '@modules/Transaction/infra/http/routes/TransactionCategory.routes';
import transactionRouter from '@modules/Transaction/infra/http/routes/Transactions.routes';
import authRouter from '@modules/Users/infra/http/routes/Auth.routes';
import userRouter from '@modules/Users/infra/http/routes/User.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/users', userRouter);
routes.use('/transactions-categories', transactionCategoryRouter);
routes.use('/transactions', transactionRouter);
routes.use('/payrequest', payRequestRouter);

export default routes;
