import ensureAuthenticated from '@modules/Users/infra/http/middlewares/ensureAuthenticate';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { TransactionController } from '../controllers/TransactionController';

const transactionRouter = Router();

const transactionController = new TransactionController();

transactionRouter.use(ensureAuthenticated);
transactionRouter.post(
  '/recharge',
  celebrate({
    [Segments.BODY]: {
      value: Joi.number().required(),
    },
  }),
  transactionController.recharge,
);

transactionRouter.post(
  '/send',
  celebrate({
    [Segments.BODY]: {
      receiverId: Joi.string().required(),
      value: Joi.number().required(),
    },
  }),
  transactionController.sendValue,
);

transactionRouter.patch(
  '/pay/:payRequestId',
  celebrate({
    [Segments.PARAMS]: {
      payRequestId: Joi.string().required(),
    },
  }),
  transactionController.payPayRequest,
);

transactionRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().required(),
      pageSize: Joi.number().default(10),
      filterDateTo: Joi.string(),
      filterDatefrom: Joi.string(),
      transactionType: Joi.string().valid('SEND', 'RECEIVE'),
      createCSV: Joi.boolean().default(false),
    },
  }),
  transactionController.listAll,
);

export default transactionRouter;
