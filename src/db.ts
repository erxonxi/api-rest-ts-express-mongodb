import mongoose from "mongoose";

mongoose
	.connect("mongodb://localhost:27018/db_test")
	.then((db) => console.log("DB is connected"))
	.catch((e) => console.log(e));
