import { TransactionModel, TransactionSchema } from "./transaction.model";
import { TransactionDto } from "./transaction.dto";


export const transactionService = {
    async createNewTransaction (transactionData:TransactionDto){
        
       const newTransaction = new TransactionModel({
           ...transactionData
       })
       return await newTransaction.save()
        
    },

    async viewAllUserTransaction(userId:string){
        const getUserAllTransaction = await TransactionModel.find({userId})
        if(!getUserAllTransaction.length){
            throw new Error("No transaction found")
        }
        return getUserAllTransaction


    }
}
