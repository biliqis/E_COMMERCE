import { Request, Response } from "express";
import { TransactionModel } from "./transaction.model";
import { TransactionService } from "./transaction.service";

export const TransactionController = {
  async viewTransaction(req: Request, res: Response) {
    const transactionResult = await TransactionService.viewATransaction(
      req.params.id
    );
    return res.status(200).json(transactionResult);
  },

  async getAllTransactions(req: Request, res: Response){
    const getTransaction = await TransactionModel.find();
	return res.status(200).json({message:'transaction succesful',data: getTransaction})
  }
}