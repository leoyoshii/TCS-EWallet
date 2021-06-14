export interface ICreateTransactionDto {
  receiverId: string;
  senderId: string;
  value: number;
  categoryId?: string;
  description?: string;
}
