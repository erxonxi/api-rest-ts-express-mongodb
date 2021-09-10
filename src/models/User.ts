import { Schema, model, ObjectId } from "mongoose";

export interface UserInterface {
	_id?: ObjectId;
	email?: String;
	full_name?: String;
	phone?: String;
	password?: String;
}

const userSchema = new Schema(
	{
		email: String,
		full_name: String,
		phone: String,
		password: String,
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default model("User", userSchema);
