import { Router } from "express";
import { cartController } from "./cart.controller";
import authGuard from "../middleware/authGuard";
const newController = new cartController();
class cartRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.post(
      "/add-cart",
      authGuard.requireAuth,
      newController.CreateNewCart
    );
  }
}

export default new cartRouter().router;
