import { EnumTransactionType } from '@modules/Transaction/interface/EnumTransactionType';
import { CreateTransactionService } from '@modules/Transaction/services/CreateTransactionService';
import { ListAllTransactionService } from '@modules/Transaction/services/ListAllTransactionService';
import { PayPayRequestService } from '@modules/Transaction/services/PayPayRequestService';
import { RechargeService } from '@modules/Transaction/services/RechargeService';
import { parseTransactionToCSV } from '@shared/utils/parseTransactionToCSV';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class TransactionController {
  public async sendValue(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.user;
    const { receiverId, value, categoryId, description } = request.body;

    const createTransactionContainer = container.resolve(
      CreateTransactionService,
    );

    const transaction = await createTransactionContainer.execute({
      senderId: id,
      receiverId,
      value,
      ...(categoryId ? { categoryId } : {}),
      ...(description ? { description } : {}),
    });

    return response.status(201).json({ transaction });
  }

  public async payPayRequest(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { payRequestId } = request.params;

    const payPayRequestContainer = container.resolve(PayPayRequestService);

    const transaction = await payPayRequestContainer.execute(payRequestId);

    return response.status(201).json({ transaction });
  }

  public async recharge(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.user;
    const { value } = request.body;

    const rechargeContainer = container.resolve(RechargeService);

    const transaction = await rechargeContainer.execute({ userId: id, value });

    return response.status(201).json({ transaction });
  }

  public async listAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      page,
      pageSize,
      filterDateTo,
      filterDatefrom,
      transactionType,
      createCSV,
    } = request.query;
    const { id } = request.user;

    const listAllTransactionContainer = container.resolve(
      ListAllTransactionService,
    );

    const enumValue: EnumTransactionType = (<any>EnumTransactionType)[
      String(transactionType)
    ];

    const [transactions, total] = await listAllTransactionContainer.execute({
      userId: id,
      page: Number(page),
      pageSize: Number(pageSize),
      ...(transactionType ? { transactionType: enumValue } : {}),
      ...(filterDateTo ? { filterDateTo: String(filterDateTo) } : {}),
      ...(filterDatefrom ? { filterDatefrom: String(filterDatefrom) } : {}),
    });

    if (createCSV) {
      const path = await parseTransactionToCSV(transactions);

      return response.status(201).json({ transactions, total, path });
    }

    return response.status(201).json({ transactions, total });
  }
}
