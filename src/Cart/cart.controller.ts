import mongoose from "mongoose";
import { cartService } from "./cart..service";
import { Cart } from "../utils/types/schema.type";
import { Request, Response } from "express";
import productService from "../product/services/product.service";
import { myCart } from "../utils/types/find.cart";
import { ProductModel } from "../product/models/product.model";
import { userInfo } from "os";
//instantiate the class
const service = new cartService();

export class cartController {
     public createNew = async (req: Request, res: Response) => {
       try {
         const cartInformation: Cart = req.body as unknown as Cart;
         const newCart = await service.createCart(cartInformation);
       } catch (err: any) {
         console.error(err.message);
         return res.status(500).json({ message: err.message });
       }
     };
     public CreateNewCart = async (req: any | Request, res: Response) => {
       try {
         const cartData = req.body as myCart;
         const newCart = await service.findCart({
           productId: req.body.productId,
           userId: req.user._id,
         });
         const newProduct = await productService.getSingleProduct(req.body.productId);

         if (!newCart) {
          if (!newProduct) {
            return res.status(500).send({ message: "product not found" });
           }
           const totalPrice = newProduct.price * 1;
           let cartObject: Cart = {
             userId: req.user._id,
             productId: req.body.productId,
            totalPrice,
           };

         const newProductCart = await service.createCart(cartObject);
           return res.status(200).send({ message: "product added succesfully", newProductCart });
         }else{
             newCart.quantityInStock = Number(newCart.quantityInStock)+1;
             newCart.totalPrice = newProduct.price * newCart.quantityInStock
             await newCart.save()
             return res.status(200).send({ message: "cart created succesfully", newCart });
         }
       } catch (err: any) {
         console.error(err.message);
         return res.status(500).send({ message: err.message });
    }

     };

     public removingItemsFromCart = async (req:any |Request, res:Response)=>{
         const updatedCart = await service.findCartById(
           req.params.id
         )
         if (!updatedCart) {
          return res.status(500).json({message:"not found"})
         }
        if(updatedCart.quantityInStock===0)
         return res.status(500).send({message:"qty not found"})

         const unitPrice = Number(updatedCart.totalPrice / updatedCart.quantityInStock)
         updatedCart.quantityInStock = updatedCart.quantityInStock-1;
         updatedCart.totalPrice = updatedCart.totalPrice - unitPrice;
         await updatedCart.save()
         return res.status(200).send({message:"sucess",updatedCart})
   }
  }
