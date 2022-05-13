import { TransactionDto } from "./transaction.dto";
import { NextFunction, Request, Response } from "express";
import { transactionService } from "./transaction.service";

export const TransactionController = {
   async viewTransaction(req:Request, res:Response){
       const transactionResult = await transactionService.viewAllUserTransaction(req.params.id)
       return transactionResult
   }
}
