import { Schema, model, ObjectId } from "mongoose";

export interface PostInterface {
	_id?: ObjectId;
	user_email: String;
	content: String;
	color: String;
}

const postSchema = new Schema(
	{
		user_email: String,
		content: String,
		color: String,
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default model("Post", postSchema);
