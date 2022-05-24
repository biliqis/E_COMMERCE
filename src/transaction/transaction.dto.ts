import { StatusEnum } from "../transaction/transaction.enum

export type TransactionDto = {
  userId: string;
  amount: number;
  status: StatusEnum;
};
