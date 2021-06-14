import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { TransactionCategoryController } from '../controllers/TransactionCategoryController';

const transactionCategoryRouter = Router();

const transactionCategoryController = new TransactionCategoryController();

transactionCategoryRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  transactionCategoryController.create,
);

transactionCategoryRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().required(),
      pageSize: Joi.number().default(10),
    },
  }),
  transactionCategoryController.findAll,
);

transactionCategoryRouter.get(
  '/:categoryId',
  celebrate({
    [Segments.PARAMS]: {
      categoryId: Joi.string().required(),
    },
  }),
  transactionCategoryController.findOne,
);

transactionCategoryRouter.put(
  '/:categoryId',
  celebrate({
    [Segments.PARAMS]: {
      categoryId: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  transactionCategoryController.update,
);

export default transactionCategoryRouter;
