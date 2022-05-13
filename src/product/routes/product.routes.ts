import { Router } from "express";
import productController from "../controllers/product.controller";
import bodyValidator from "../../middleware/body.validator";
import { ProductValidator } from "../validators/product.validator";

//import authMiddleware from '../../middleware/authGuard';
import upload from "../../utils/upload";
import authGuard from "../../middleware/authGuard";

class productRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.post(
      "/create-product",
      upload.array("image",5),
      authGuard.requireAuth,
      bodyValidator.useBodyValidator(ProductValidator.createProductValidator),
      productController.createProduct
    );

    //     this.router.patch(
    //       "/update-profile-picture/:id",
    //       upload.single("image"),
    //       bodyValidator.useBodyValidator(promoteToAdminValidator),
    //       authMiddleware.requireAuth,
    //       UserController.promoteToAdmin
    //     );

    this.router.patch("/update-product/:id", productController.UpdateAProduct);
    this.router.get("/get-all", productController.getAllProduct)

    this.router.get("/search-all-field", productController.search);

    this.router.delete("/delete-product/:id", productController.deleteProduct);
  }
}

export default new productRouter().router;
