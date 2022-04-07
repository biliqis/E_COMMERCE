import { Router } from "express";
import UserController from "../controllers/user.controller";
import UserService from "../services/user.service";
import bodyValidator from "../../middleware/body.validator";
import {
  UserValidator,
  promoteToAdminValidator,
  wishListValidator
} from "../validators/user.validator";
import useGuard from "../../middleware/guard";
import userGuard from "../guards/user.guard";
import authMiddleware from "../../middleware/authGuard";
import upload from "../../utils/upload";

class userRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.get("/search-all-field", UserController.search);

    this.router.post(
      "/user-signup",
      bodyValidator.useBodyValidator(UserValidator.createUserValidator),
      useGuard(userGuard.userSignUpGuard),
      useGuard(userGuard.checkIfPhoneNum),
      UserController.userSignup
    );

    this.router.post(
      "/user-login",
      bodyValidator.useBodyValidator(UserValidator.loginUserValidator),
      useGuard(userGuard.userLoginGuard),
      UserController.userLogin
    );

    // this.router.patch(
    //   "/update-profile-picture/:id",
    //   upload.single("image"),
    //   bodyValidator.useBodyValidator(UserValidator.editUserValidator),
    //   authMiddleware.requireAuth,
    //   UserController.updateUser
    // );

    this.router.patch(
      "/update-user/:id",
      upload.single("image"),
      bodyValidator.useBodyValidator(UserValidator.editUserValidator),
      authMiddleware.requireAuth,
      UserController.updateUser
    );

    this.router.put(
      "/update-staff-to-admin/:id",
      bodyValidator.useBodyValidator(promoteToAdminValidator),
      authMiddleware.requireAuth,
      authMiddleware.checkIfUserIsAdmin,
      UserController.promoteToAdmin
    );

    this.router.delete(
      "/delete-user/:id",
      bodyValidator.useBodyValidator(UserValidator.editUserValidator),
      authMiddleware.requireAuth,
      authMiddleware.checkIfUserIsAdmin,
      UserController.deleteUser
    );

    this.router.get(
      "/get-all-user",
      authMiddleware.requireAuth,
      authMiddleware.checkIfUserIsAdmin,
      UserController.getAllUserFromDataBase
    );

    this.router.put(
      "/add-wishlist",
      bodyValidator.useBodyValidator(wishListValidator),
      authMiddleware.requireAuth,
      UserController.makeAwishLsit
    );
  }
}

export default new userRouter().router;
