import { Router } from "express";
import authGuard from "../middleware/authGuard";

import { TransactionController } from "./transaction.controller";




class transactionRouter {
    public router: Router;
  
    constructor() {
      this.router = Router();
      this.routes();
    }

    private routes(): void {
        this.router.get("/view-transaction/:id", authGuard.requireAuth, TransactionController.viewTransaction);
        this.router.get("/view-user-transactions", TransactionController.getAllTransactions);
}  
}

export default new transactionRouter().router;
