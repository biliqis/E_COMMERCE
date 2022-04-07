import { NextFunction, Request, response, Response } from "express";
import mongoose from "mongoose";
import {
  LoginCredentials,
  Update,
  SearchMethod,
  WishListField
} from "../../utils/types/user.types";
import { User } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";
import { Multer } from "multer";
import { S3UploadResponse } from "../../utils/types/file.types";
import UserService from "../services/user.service";


class UserController {
  public userService = UserService;

  public userSignup = async (req: Request, res: Response) => {
    try {
      const userSignUpInformation: User = req.body;
      const user = await this.userService.userSignUp(userSignUpInformation);
      return res
        .status(200)
        .json({ message: "user Created successfully", user });
    } catch (err: any) {
      console.error(err);
      return res.status(500).send({ message: err.message });
    }
  };

  public userLogin = async (req: Request, res: Response) => {
    try {
      const credentials = req.body as LoginCredentials;
      const user = await this.userService.userLogin(credentials);
      return res.status(200).send({ message: "login successfully", user });
    } catch (err: any) {
      console.error(err);
 
      return res.status(500).json({ message: err.message });
    }
  };

  public updateUser = async (req: Request, res: Response) => {
    
    const updates = req.body as User
    updates.image = (req as any).file?.location
    console.log(req.file)
    const { id } = req.params;
    try {
      const updated = await UserService.updateUser(id, updates);
      return res.status(200).json({
        message: "user updated successfully",
        updated,
      });
    } catch (err: any) {
      console.error(err);
      res.status(500).send(err.message);
    }
  };

  public deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const data = await UserService.deleteUser(id);
      return res.status(200).json({
        message: "user deleted successfully",
        data: data,
      });
    } catch (err: any) {
      console.error(err);
      return res.status(403).send(err.message);
    }
  };

  public getAllUser = async (req: Request, res: Response) => {
    try {
      const getAll = await UserModel.find({ role: "user" });
      return res
        .status(200)
        .send({ message: "user details successful", getAll });
    } catch (err: any) {
      console.error(err);
      return res.status(500).send({ message: "err.message" });
    }
  };

  public logOut = async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", "none", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Your are logged out",
    });
  };

  public search = async (req: Request, res: Response) => {
   if (!req.query.search) return res.status(400).json({"message":"please enter a search query"});
    const user = await UserModel.find({
      $or: [
        { firstName: { $regex: req.query.search } },
        { lastName: { $regex: req.query.search } },
        { username: { $regex: req.query.search } },
        { email: { $regex: req.query.search } },
      ],
    });
    if (user.length === 0) {
      return res.status(400).json({"message":"no result found for this user"});
    }

    return res.status(200).json({message:"search succesful", user})
  };

  public getAllUserFromDataBase = async (req: Request, res: Response) => {
    const query = req.query.role;
    try {
      const users = query
        ? await UserModel.find({ role: query }).sort({ _id: -1 }).limit(5)
        : await UserModel.find();
      return res.status(200).json(users);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  };

  public promoteToAdmin = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const staffNewUpdate = await UserService.promoteToAdmin(id);
      return res.status(200).json({
        message: "congratulations! you are now an admin",
        data: staffNewUpdate,
      });
    } catch (err: any) {
      console.error(err);
      res.status(500).send(err.message);
    }
  }

  public makeAwishLsit = async (req:Request, res:Response)=>{
    try { 
    const myWishInformation = req.body as  WishListField
    const userId = (req as any).user._id
    const getAwishList = await this.userService.createAWishList(userId,myWishInformation)
    return res.status(200).json({"message":"wishList updated succsfully", getAwishList})
    } catch (err:any) {
      console.error(err)
      return res.status(500).json({"message":err.message})
      
    }
  }
  };


export default new UserController();
