import { Request, Response } from "express";
import { TransactionService } from "./transaction.service";

export const TransactionController = {
  async viewTransaction(req: Request, res: Response) {
    const transactionResult = await TransactionService.viewAllUserTransaction(
      req.params.id
    );
    return res.status(200).json(transactionResult);
  },
};
