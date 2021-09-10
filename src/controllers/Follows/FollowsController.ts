import { Request, Response } from "express";
import UserFollower from "../../models/UserFollower";

export const followUser = async (req: Request, res: Response) => {
	const { followed_email } = req.body;
	const newFollower = new UserFollower({
		followed_email,
		follower_email: req.session.userEmail,
	});
	const follower = await newFollower.save();
	return res.status(201).json({
		follower: follower,
		errors: null,
	});
};
