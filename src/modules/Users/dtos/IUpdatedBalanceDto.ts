import { EnumTransactionType } from '@modules/Transaction/interface/EnumTransactionType';

export interface IUpdatedBalanceDto {
  userId: string;
  value: number;
  type: EnumTransactionType;
}
