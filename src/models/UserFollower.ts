import { Schema, model, ObjectId } from "mongoose";

export interface UserFollowerInterface {
	_id?: ObjectId;
	followed_email?: String;
	follower_email?: String;
}

const userFollowerSchema = new Schema(
	{
		followed_email: String,
		follower_email: String,
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default model("UserFollower", userFollowerSchema);
