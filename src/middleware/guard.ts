import { Request,Response,NextFunction } from "express";

const useGuard = (guard:any) => {
	return async (req:Request, res:Response, next:NextFunction) => {
		try {
			await guard(req);
			next()
		} catch (e:any) {
			console.error(e)
			return res.json({ message: e.message });
		}

	};
};

export default useGuard
