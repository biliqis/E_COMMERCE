 		import { NextFunction, Request, response, Response } from "express";
import mongoose from "mongoose";
import { ProductModel } from "../models/product.model";
import { Multer } from "multer";
import { CreateProductDto } from "../dtos/product.dto";
import productService from "../../services/product.service";
import upload from "../../../utils/upload";
import productRoutes from "../routes/product.routes";

class ProductController {
	//public UserController = ProductController;

	public createProduct = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const createProductDetails= req.body as CreateProductDto
			let fileArray = req.files as any
            const images = [];
            for (let i = 0; i < fileArray!.length; i++) {
                    let fileLocation:string = fileArray[i]!.location;
                    console.log('filename', fileLocation);
                    images.push(fileLocation)
				}
			createProductDetails.images = images
			
			const productInformation = await productService.createNewProduct(
				createProductDetails
			);
			return res
				.status(200)
				.send({ message: "product successfully created", productInformation });
		} catch (err: any) {
			console.error(err.message);
			return res.status(500).send({ message: err.message });
		}
	};

	public UpdateAProduct = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const updateProduct = req.body as CreateProductDto;
			const updateProductDetails = await productService.UpdateProduct(
				id,
				updateProduct
			);
			return res
				.status(200)
				.send({
					message: "Product updated successfully",
					updateProductDetails,
				});
		} catch (err: any) {
			console.error(err.message);
			return res.status(500).send({ message: err.message });
		}
	};



	public getProductById = async (id: string) => {
		return await ProductModel.findById(id);
	};

	public deleteProduct = async (req: Request, res: Response) => {
		const { id } = req.params;
		const deleteProductDetails = await productService.deleteAProduct(id);
		return res
			.status(200)
			.send({ message: "product deleted succesfully", deleteProductDetails });
	};

	public search = async (req: Request, res: Response) => {
		if (!req.query.search) return res.status(400).json({"message":"please enter a search query"});
		 const product = await ProductModel.find({
		   $or: [
			 { productName: { $regex: req.query.search } },
			 { Description: { $regex: req.query.search } },
		   ],
		 });
		 if (product.length === 0) {
		   return res.status(400).json({"message":"no result found for this product"});
		 }
	 
		 return res.status(200).json({message:"search succesful", product})
	   };
	 
}

export default new ProductController();
