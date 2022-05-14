import { Request, Response, NextFunction } from "express";
import { OrderService } from "./order.service";
import { FlutterwaveDTO } from "../utils/types/futterwave.dto";
import { v4 as uuidv4 } from "uuid";
import { TransactionService } from "../transaction/transaction.service";
import { TransactionDto } from "../transaction/transaction.dto";
import { StatusEnum } from "../user/enums/transaction.enum";

const service = new OrderService();

export class Order {
  public createNewUserOrder = async (req: any | Request, res: Response) => {
    try {
      const userOrder = await service.myNewOrder(req.user._id, req.body);
      if (userOrder === "cart cannot be empty") {
        return res.status(404).json({ message: userOrder });
      }
      return res
        .status(200)
        .json({ message: "order succesfully created", userOrder });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  };
  public completeOrderController = async (
    req: any | Request,
    res: Response
  ) => {
    try {
      let fullname = `${req.user.firstName} ${req.user.lastName}`;
      let expiry = req.body.expiry;
      let expiryArray = expiry.split("/");
      //  get the single order
      let singleOrder = await service.getOrderById(req.params.id);

      const myOrder: FlutterwaveDTO = {
        card_number: req.body.card_number,
        cvv: req.body.cvv,
        expiry_month: expiryArray[0],
        expiry_year: expiryArray[1],
        email: req.user.email,
        fullname,
        phone_number: req.user.phone_number,
        tx_ref: uuidv4(),
        currency: "NGN",
      };
      // user's firstname
      // amount
      // order id
      const newOrder = await service.completeOrderService(
        myOrder,
        req.params.id
      );
      const transactioObj: TransactionDto = {
        userId: req.user._id,
        amount: singleOrder.amount,
        status: StatusEnum.COMPLETED,
      };

      await TransactionService.createNewTransaction(transactioObj);
      return res.status(201).json(newOrder);
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  };
}
