export interface ICreatePayRequestDto {
  requesterId: string;
  requestedId: string;
  value: number;
  description?: string;
}
