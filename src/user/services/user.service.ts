import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { UserModel } from "../models/user.model";
import { Request, Response } from "express";
import { FilterQuery } from "mongoose";
import { User } from "../interfaces/user.interface";
import { WishListField } from "../../utils/types/user.types";
import { LoginCredentials, SearchMethod } from "../../utils/types/user.types";
import { Update } from "../../utils/types/user.types";
const expiresIn = process.env.JWT_EXP || "1d";
const jwtSecretKey = process.env.JWT_SECRET! || "secret";

class UserService {
  public users = UserModel;

  public generateJwt = (userObj: object): string => {
    return jwt.sign(userObj, jwtSecretKey, {
      expiresIn: process.env.JWT_EXP,
    });
  };

  public userSignUp = async (
    userInformation: User
  ): Promise<typeof UserModel> => {
    const user = await this.users.create(userInformation);
    user.password = bcrypt.hashSync(userInformation.password, 10);
    await user.save();
    const userToken = this.generateJwt({
      userId: user._Id,
      roles: userInformation.role,
    });
    return user;
  };

  public userLogin = async (credentials: LoginCredentials): Promise<object> => {
    const user = await this.users
      .findOne({
        $or: [{ username: credentials.username }, { email: credentials.email }],
      })
      .select("+password");
    if (!user) throw new Error("wrong credentials!");
    const token = this.generateJwt({
      userId: user._id,
      roles: user.role,
    });
    return { user, token };
  };

  public updateUser = async (
    id: string,
    userInformation: User
  ): Promise<User> => {
    const user = await this.users.findByIdAndUpdate(id, userInformation, {
      new: true,
    });
    return user;
  };

  public deleteUser = async (id: string | any): Promise<void | any> => {
    const user = await this.users.findByIdAndDelete(id);
    if (!user) throw new Error("user not found");
    return user;
  };

  public findByEmail = async (email: string) => {
    return this.users.findOne({ email: email });
  };

  public createAWishList = async(id:string,myWish: WishListField)=>{
    const newWishList = await this.users.findByIdAndUpdate(id,myWish,{new:true})
    return newWishList
  }



  // public async findAllUser():Promise<User[]>{
  // 	const users:User[] = await this.users.find()
  // 	return  users
  // }

  public async findUserById(id: string) {
    return await this.users.findById(id);
  }

  public propExists = (props: FilterQuery<User>) => {
    return this.users.countDocuments(props).then((count: any) => count > 0);
  };

  public promoteToAdmin = async (id: string) => {
    return await this.users.findByIdAndUpdate(
      id,
      { role: "admin" },
      { new: true }
    );
  };

  public async updateProfilePicture(id: string, imageLocation: string) {
    const update = await this.users.findByIdAndUpdate(
      id,
      { image: imageLocation },
      { new: true }
    );
    if (!update) {
      throw new Error("user does not exist");
    }
    return update;
  }
}

export default new UserService();
