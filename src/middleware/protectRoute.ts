import { NextFunction, Request, Response } from "express";

export const protectRoute = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.session.userEmail) {
		return res.status(401).json({ errors: [{ message: "Unauthorized" }] });
	}
	next();
};
