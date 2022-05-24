import { Router } from "express";
import authGuard from "../../middleware/authGuard";
import { commentController } from "../controller/comment.controller";



class commentRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.post("/add-comment", authGuard.requireAuth,commentController.getUserComment
    )
  }
}

export default new commentRouter().router;

