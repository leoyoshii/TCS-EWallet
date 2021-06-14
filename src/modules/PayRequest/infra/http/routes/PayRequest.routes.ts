import ensureAuthenticated from '@modules/Users/infra/http/middlewares/ensureAuthenticate';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { PayRequestController } from '../controllers/PayRequestController';

const payRequestRouter = Router();

const payRequestController = new PayRequestController();

payRequestRouter.use(ensureAuthenticated);

payRequestRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      requestedId: Joi.string().required(),
      value: Joi.number().required(),
      description: Joi.string(),
    },
  }),
  payRequestController.create,
);

payRequestRouter.delete(
  '/:payRequestId',
  celebrate({
    [Segments.PARAMS]: {
      payRequestId: Joi.string().required(),
    },
  }),
  payRequestController.delete,
);

payRequestRouter.get(
  '/requested',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().required(),
      pageSize: Joi.number().default(10),
    },
  }),
  payRequestController.myPayRequested,
);

payRequestRouter.get(
  '/requester',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().required(),
      pageSize: Joi.number().default(10),
    },
  }),
  payRequestController.myPayRequester,
);

export default payRequestRouter;
