import { Router } from "express";
import productRoutes from "../../product/routes/product.routes";
import userRoutes from "../../user/routes/user.routes";
import cartRoutes from "../../Cart/cart.routes";
import orderRoutes from "../../order/order.routes";
import transactionRoutes from "../../transaction/transaction.routes";
class indexRouter {
  public router: Router = Router();

  constructor() {
  this.router.use("/user", userRoutes);
  this.router.use("/product", productRoutes);
  this.router.use('/cart',cartRoutes)
  this.router.use("/order", orderRoutes)
  this.router.use("/transaction", transactionRoutes)

  }
}

export default new indexRouter().router;
