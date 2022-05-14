import { TransactionModel, TransactionSchema } from "./transaction.model";
import { TransactionDto } from "./transaction.dto";


export class TransactionService {
    static async createNewTransaction (transactionData:TransactionDto){
        
       const newTransaction = new TransactionModel({
           ...transactionData
       })
       return await newTransaction.save()
        
    }

    static async viewAllUserTransaction(userId:string){
        const getUserAllTransaction = await TransactionModel.find({userId})
        if(!getUserAllTransaction.length){
            throw new Error("No transaction found")
        }
        return getUserAllTransaction


    }
}
