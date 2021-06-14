import { CreatePayRequestService } from '@modules/PayRequest/services/CreatePayRequestService';
import { DeletePayRequestService } from '@modules/PayRequest/services/DeletePayRequestService';
import { ListAllRequestedPayRequestByUserIdService } from '@modules/PayRequest/services/ListAllRequestedPayRequestByUserIdService';
import { ListAllRequesterPayRequestByUserIdService } from '@modules/PayRequest/services/ListAllRequesterPayRequestByUserIdService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class PayRequestController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { requestedId, value, description } = request.body;

    const createPayRequestContainer = container.resolve(
      CreatePayRequestService,
    );

    const payRequest = await createPayRequestContainer.execute({
      ...(description ? { description } : {}),
      requesterId: id,
      requestedId,
      value,
    });

    return response.status(201).json({ payRequest });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { payRequestId } = request.params;

    const deletePayRequestContainer = container.resolve(
      DeletePayRequestService,
    );

    const payRequest = await deletePayRequestContainer.execute(payRequestId);

    return response.status(201).json({ payRequest });
  }

  public async myPayRequested(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.user;
    const { page, pageSize } = request.query;

    const listAllRequestedPayRequestByUserIdContainer = container.resolve(
      ListAllRequestedPayRequestByUserIdService,
    );

    const [payRequests, total] =
      await listAllRequestedPayRequestByUserIdContainer.execute({
        page: Number(page),
        pageSize: Number(pageSize),
        requestedId: id,
      });

    return response.status(201).json({ payRequests, total });
  }

  public async myPayRequester(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.user;
    const { page, pageSize } = request.query;

    const listAllRequesterPayRequestByUserIdContainer = container.resolve(
      ListAllRequesterPayRequestByUserIdService,
    );

    const [payRequests, total] =
      await listAllRequesterPayRequestByUserIdContainer.execute({
        page: Number(page),
        pageSize: Number(pageSize),
        requesterId: id,
      });

    return response.status(201).json({ payRequests, total });
  }
}
