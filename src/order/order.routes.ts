import { Router } from "express";
import authGuard from "../middleware/authGuard";
import { Order } from "./order.controller";
const newController = new Order();

class orderRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.post(
      "/get-order",
      authGuard.requireAuth,
      newController.createNewUserOrder
    );

    this.router.post(
      "/complete-order/:id",
      authGuard.requireAuth,
      newController.completeOrderController
    );
  }
}

export default new orderRouter().router;
