import { Request, Response } from "express";
import Comment from "../../models/Comment";

export const creteComment = async (req: Request, res: Response) => {
	const { post_id, comment } = req.body;
	const newComment = new Comment({
		user_email: req.session.userEmail,
		post_id,
		comment,
	});
	const commentSaved = newComment.save();
	return res.status(201).json({
		post: commentSaved,
		errors: null,
	});
};
