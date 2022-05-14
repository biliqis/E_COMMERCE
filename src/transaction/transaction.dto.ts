import { StatusEnum } from "../user/enums/transaction.enum";

export type TransactionDto = {
  userId: string;
  amount: number;
  status: StatusEnum;
};
