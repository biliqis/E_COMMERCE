import { TransactionStatusEnum } from "../transaction/transaction.enum"

export type TransactionDto = {
  userId: string;
  TransactionId:string;
  amount: number;
  transactionStatus: TransactionStatusEnum;
}
