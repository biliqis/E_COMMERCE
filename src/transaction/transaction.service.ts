import { TransactionModel, TransactionSchema } from "./transaction.model";
import { TransactionDto } from "./transaction.dto";

export class TransactionService {
    static async createNewTransaction (transactionData:TransactionDto){
        
       const newTransaction = new TransactionModel({
           ...transactionData
       })
       return await newTransaction.save()
        
    }

    static async viewATransaction(id:string){
        const getSIngleUserTransaction = await TransactionModel.findById(id)
        return getSIngleUserTransaction
      
        }
   
        }
   


    
      // if(!getSIngleUserTransaction.length){
        //     throw new Error("No transaction found")
    // static async getAllUserTransaction(){
    //     const getAll = await TransactionModel.find()
    //     return
    // }

