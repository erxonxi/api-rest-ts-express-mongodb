import { Request, Response } from "express";
import Post from "../../models/Post";
import UserFollower from "../../models/UserFollower";

export const createPost = async (req: Request, res: Response) => {
	const { content, color } = req.body;
	const newPost = new Post({
		user_email: req.session.userEmail,
		content,
		color,
	});
	const postSaved = await newPost.save();
	return res.status(201).json({
		post: postSaved,
		errors: null,
	});
};

export const listPostsFollowed = async (req: Request, res: Response) => {
	let usersFollowed = await UserFollower.find(
		{
			follower_email: req.session.userEmail,
		},
		{ followed_email: true, _id: false }
	);

	usersFollowed = usersFollowed.map((e: any) => {
		return e.followed_email;
	});

	const postsList = await Post.find({ user_email: usersFollowed });
	return res.status(200).json({
		posts: postsList,
		errors: null,
	});
};
