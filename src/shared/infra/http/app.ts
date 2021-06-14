import 'reflect-metadata';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import cors from 'cors';
import { errors } from 'celebrate';

import '@shared/infra/typeorm';
import '@shared/container';
import routes from './routes';
import AppErrors from '../errors/AppErrors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppErrors) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      code: err.statusCode,
    });
  }
  return response
    .status(500)
    .json({ status: 'error', massage: err.message, code: 500 });
});

app.listen(process.env.APP_PORT, () => {
  console.log(`💰 Server is running in Port: ${process.env.APP_PORT}`);
});
