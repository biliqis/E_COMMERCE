import { cartService } from "../Cart/cart..service";
import { newCustomFunction } from "../utils/custom.function";
import { cartModel } from "../Cart/cart.model";
import orderSchema from "./order.model";
import { FlutterwaveDTO } from "../utils/types/futterwave.dto";
import { paymentService } from "../utils/flutterwave/flutterwave.service";
import orderModel from "./order.model";

export class OrderService {
  public myNewOrder = async (id: string, data: any | object) => {
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
      address: data.address,
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
    if (orderToBeCompleted.status === "completed") {
      throw Error("order has already been completed!");
    }
    const Pay = await paymentService({
      ...details,
      amount: orderToBeCompleted.amount,
    });
    console.log(Pay);

    orderToBeCompleted.status = "completed";
    orderToBeCompleted.phonenumber = details.phone_number;
    await orderToBeCompleted.save();

    return { Pay, orderToBeCompleted };
  };

  public getOrderById = async (id: string) => {
    return await orderModel.findById(id);
  };
}
