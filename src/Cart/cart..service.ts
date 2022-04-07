import mongoose from "mongoose";
import { NextFunction, Request, response, Response } from "express";
import { cartModel } from "./cart.model";
import { Cart } from "../utils/types/schema.type";
import { myCart } from "../utils/types/find.cart";
export class cartService {

 public createCart = async (cartDetails: Cart) => {
    const createNewCart = await cartModel.create(cartDetails);
    return createNewCart;
  };

 public findCart = async (cartDetails:myCart)=>{
  return await cartModel.findOne(cartDetails)
}



 public findCartById = async(id:string)=>{
  return await cartModel.findById(id)

}

static getUserCart = async (id:string)=>{
  const Usercart = await cartModel.find({userId:id})
  return Usercart

}

}

