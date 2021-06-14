import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { UserController } from '../controllers/UserController';

const userRouter = Router();
const userController = new UserController();

userRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().required(),
      pageSize: Joi.number().default(10),
    },
  }),
  userController.listAll,
);

userRouter.get(
  '/:userId',
  celebrate({
    [Segments.PARAMS]: {
      userId: Joi.string().required(),
    },
  }),
  userController.listOne,
);

userRouter.delete(
  '/:userId',
  celebrate({
    [Segments.PARAMS]: {
      userId: Joi.string().required(),
    },
  }),
  userController.delete,
);

export default userRouter;
