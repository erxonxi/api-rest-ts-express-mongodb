import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import User from "../../models/User";

const encryptPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

const comparePassword = async (password: string, receivedPassword: string) => {
	return await bcrypt.compare(password, receivedPassword);
};

export const singUp = async (req: Request, res: Response) => {
	const { email, full_name, password, phone } = req.body;

	// check if email is already exist
	const userFound = await User.find({ email });
	console.log(userFound);
	if (userFound.length > 0) {
		return res.status(406).json({
			user: null,
			errors: [{ field: "email", message: "Already exist" }],
		});
	}

	// encrypt password
	const passwordEncrypted = await encryptPassword(password);

	// create user
	const newUser = new User({
		email,
		full_name,
		phone,
		password: passwordEncrypted,
	});
	const userSaved: any = await newUser.save();

	// return email and full_name
	return res.status(201).json({
		user: { email: userSaved.email, full_name: userSaved.full_name },
		errors: null,
	});
};

export const singIn = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	// check user exist
	const userFound: any = await User.findOne({ email: email });
	console.log(userFound);
	if (!userFound) {
		return res.status(404).json({
			user: null,
			errors: [{ field: "email", message: "No exist" }],
		});
	}

	// check password is correct
	const matchPassword = await comparePassword(password, userFound.password);
	if (!matchPassword)
		return res.status(402).json({
			user: null,
			errors: [
				{
					field: "password",
					message: "No match",
				},
			],
		});

	req.session.userEmail = userFound.email;

	// return email and full_name
	return res.status(200).json({
		user: { email: userFound.email, full_name: userFound.full_name },
		errors: null,
	});
};

export const me = async (req: Request, res: Response) => {
	if (req.session.userEmail) {
		const userFound: any = await User.findOne({ email: req.session.userEmail });
		return res.status(200).json({
			user: {
				email: userFound?.email,
				full_name: userFound?.full_name,
				phone: userFound?.phone,
			},
			errors: null,
		});
	} else {
		return res.status(401).json({
			user: null,
			errors: [{ field: "qid", message: "You are not logged" }],
		});
	}
};
