import { Router } from "express";
import productController from "../controllers/product.controller";
import productService from "../../services/product.service";
import bodyValidator from "../../../middleware/body.validator";
import userController from "../../../user/controllers/user.controller";
import { ProductValidator } from "../validators/product.validator";

//import authMiddleware from '../../middleware/authGuard';
import upload from "../../../utils/upload";

class productRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.post(
      "/create-product",
      bodyValidator.useBodyValidator(ProductValidator.createProductValidator),
      upload.array("image",5),
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

    this.router.get("/search-all-field", productController.search);

    this.router.delete("/delete-product/:id", productController.deleteProduct);
  }
}

export default new productRouter().router;
