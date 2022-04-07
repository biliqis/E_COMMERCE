import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { UserModel } from "../user/models/user.model";

class authMiddleware {
	public requireAuth = async (req: any, res: Response, next: NextFunction) => {
		try {
			let auth: any = req.headers["authorization"];
			if (!auth) {
				return res
					.status(401)
					.json({ message: "Invalid token, login to access this resource" });
			}

			let token: string = auth.split("Bearer")[1].trim();
			const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
			console.log(decoded);
			const currentUser: any = await UserModel.findById(decoded.userId);
			// console.log(currentUser)
			if (!currentUser) {
				return res.status(401).json({ message: "logged out" });
			}
			req.user = currentUser;
			//next();
		} catch (err: any) {
			console.error(err);
			return res
				.status(401)
				.json({ message: "Invalid token, sign-in to access this resource" });
		}
		next();
	};

	checkIfUserIsAdmin = (req: any, res: Response, next: NextFunction) => {
		//if ( !req.user|| req.user.role === "user")
		if (!req.user || req.user.role !== "admin")
			return res.status(400).json({
				message: "Sorry you are not allowed to perform this operation",
			});
		next();
	};

	checkIfUserIsStaff = (req: any, res: Response, next: NextFunction) => {
		if (!req.user || req.user.role !== "staff")
			return res.status(400).json({ message: "Sorry you are not a staff" }); //REFACTOR this is supposed to be checking if the user to be edited is a staff not the logged in user
		next();
	};
}

export default new authMiddleware();
