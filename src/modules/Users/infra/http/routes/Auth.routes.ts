import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import AuthenticateController from '../controllers/AuthenticateController';

const authRouter = Router();

const authenticateController = new AuthenticateController();

authRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  authenticateController.login,
);

authRouter.post(
  '/register',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required(),
    },
  }),
  authenticateController.register,
);

export default authRouter;
