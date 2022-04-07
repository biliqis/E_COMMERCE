import { Router } from 'express';
import cartRoutes from '../../../Cart/cart.routes';
import productRoutes from '../../product/routes/product.routes';
import userRoutes from '../../../user/routes/user.routes';
import orderRoutes from '../../../order/order.routes';

class indexRouter {
  public router: Router = Router();

  constructor() {
    this.router.post("/user", userRoutes)
    this.router.use('/product', productRoutes);
    this.router.use("/cart", cartRoutes)
    this.router.use("/order", orderRoutes)


  }
}

export default new indexRouter().router;
