import { Router } from "express";

import { TransactionController } from "./transaction.controller";



class transactionRouter {
    public router: Router;
  
    constructor() {
      this.router = Router();
      this.routes();
    }

    private routes(): void {
        this.router.get("/view-all-user-Transaction/:id", TransactionController.viewTransaction);
}  
}

export default new transactionRouter().router;
