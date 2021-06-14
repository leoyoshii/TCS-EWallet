import { EnumTransactionType } from '../interface/EnumTransactionType';

export interface IFindAllTransactionFilterDto {
  page: number;
  pageSize: number;
  userId: string;
  filterDateTo?: string;
  filterDatefrom?: string;
  transactionType?: EnumTransactionType;
}
