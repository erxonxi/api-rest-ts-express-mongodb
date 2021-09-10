import { Schema, model, ObjectId } from "mongoose";

export interface commentInterface {
	_id?: ObjectId;
	user_email: String;
	post_id: ObjectId;
	comment: String;
}

const commentSchema = new Schema(
	{
		user_email: String,
		post_id: String,
		comment: String,
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default model("Comment", commentSchema);
