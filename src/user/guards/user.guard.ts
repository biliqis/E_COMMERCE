import { Request, Response, NextFunction } from "express";
import UserService from "../services/user.service";
import { UserModel } from "../models/user.model";

class validate {
  public checkIfEmailExist = async (req: Request): Promise<void> => {
    try {
      const checkEmail = await UserService.findByEmail(req.body.email);
      if (checkEmail) throw new Error("Email already Exist");
    } catch (err: any) {
      console.error(err);
      throw new Error(err.message);
    }
  };

  public userSignUpGuard = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const EmailOrUsername = await UserModel.findOne({
      $or: [
        {
          email: req.body.email,
        },
        {
          username: req.body.username,
        },
      ],
    });

    if (EmailOrUsername) throw new Error("email or username already exist");
  };

  public checkIfUserIdExist = async (req: Request): Promise<void> => {
    const result = await UserModel.findById(req.params.id);
    if (!result) throw new Error("user with this Id not found");
  };

  public userLoginGuard = async (req: Request, next: NextFunction) => {
    try {
      const verify = await UserService.propExists({
        $or: [
          {
            email: req.body.email,
          },
          {
            username: req.body.username,
          },
        ],
      });
    } catch (err: any) {
      console.error(err);
    }
  };

  public checkIfPhoneNum = async (req: Request, res: Response) => {
    const checkIfPhoneNumExist = await UserModel.findOne({
      phonenumber: req.body.phonenumber,
    });
    if (checkIfPhoneNumExist) throw Error("Phonenunber must be unique");
  };
}

export default new validate();
