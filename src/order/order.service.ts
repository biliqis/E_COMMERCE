import { Order } from "./order.controller";
import { cartService } from "../Cart/cart..service";
import { newCustomFunction } from "../utils/custom.function";
import { cartModel } from "../Cart/cart.model";
import orderSchema from "./order.model";
import { FlutterwaveDTO } from "../utils/types/futterwave.dto";
import { paymentService } from "../utils/flutterwave/flutterwave.service";
import orderModel from "./order.model";

export class OrderService {
  public myNewOrder = async (id: string) => {
    let userCart = [];
    const newUserCart = await cartService.getUserCart(id);
    if (newUserCart.length === 0) {
      return "cart cannot be empty";
    }
    console.log(newUserCart);
    const newOrder = new orderSchema({
      amount: newCustomFunction(newUserCart),
      quantity: newUserCart.length,
      userId: id,
      products: newUserCart,
    });
    await newOrder.save();
    await cartModel.deleteMany({ userId: id });
    return newOrder;
  };

  public completeOrderService = async (
    details: FlutterwaveDTO,
    orderId: string
  ) => {
    const orderToBeCompleted = await orderModel.findById(orderId);
    if (!orderToBeCompleted) {
      return "not found";
    }
    const Pay = await paymentService(details);
    if (Pay.status === "success") {
      Pay.message = "transaction successful";
      // wallet.balance = wallet.balance + Number(req.body.amount);
      //await wallet.save();
      orderToBeCompleted.status = "completed";
      await orderToBeCompleted.save();
      // const transactionObj: object = {
      //   user: user.userId,
      //   amount: req.body.amount,
      //   type: 'CREDIT',
      //   status: 'SUCCESS',
      //   reference: ref,
      // };
    }

    return { status: Pay.status, message: Pay.message, orderToBeCompleted};
  };

  public cancelOrder = async () => {};
}
