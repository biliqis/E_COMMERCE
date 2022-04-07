import * as bcrypt from "bcrypt";
import { ProductModel, ProductSchema } from "../product/models/product.model";
import { CreateProductDto } from "../product/dtos/product.dto";
import { Request, Response } from "express";
import { FilterQuery } from "mongoose";
const expiresIn = process.env.JWT_EXP || "1d";
const jwtSecretKey = process.env.JWT_SECRET! || "secret";

class ProductService {
  public product = ProductModel;
  public createNewProduct = async (
    productData: CreateProductDto
  ): Promise<typeof ProductModel | void> => {
    const newProduct = await this.product.create(productData);
    return newProduct;
  };

  public UpdateProduct = async (
    id: string,
    productData: CreateProductDto
  ): Promise<typeof ProductModel | void> => {
    const updateNewProduct = await this.product.findByIdAndUpdate(
      id,
      productData,
      { new: true }
    );
    return updateNewProduct;
  };

  public getSingleProduct = async (id: string) => {
    return await ProductModel.findById(id);
  };

  public deleteAProduct = async (id: string) => {
    const deleteExistingProduct = await this.product.findByIdAndDelete(id);
    if (!deleteExistingProduct) {
      throw new Error("product not found");
    }
    return deleteExistingProduct;
  };
}

export default new ProductService();
