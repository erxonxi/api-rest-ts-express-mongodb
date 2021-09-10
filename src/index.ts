import express from "express";
import Routes from "./routes";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import "./db";

// environment variables
require("dotenv").config();

// create express app
const app = express();

// json
app.use(json());
app.use(urlencoded({ extended: true }));

// cors
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

// configure session and reddis
declare module "express-session" {
	export interface SessionData {
		userEmail: string | null;
	}
}
const RedisStore = connectRedis(session);
const redisClient = redis.createClient();
app.use(
	session({
		name: "qid",
		store: new RedisStore({
			client: redisClient,
			disableTouch: true,
		}),
		cookie: {
			maxAge: 1000 * 60 * 60 * 24, // 1 day
			httpOnly: true,
			sameSite: "lax", // csrf
			secure: false, // cookie only works in https
		},
		secret: String(process.env.SECRET_KEY),
		resave: false,
		saveUninitialized: false,
	})
);

// routes
app.use(Routes);

// init listener
app.listen(process.env.PORT, () =>
	console.log(`Server running on: http://localhost:${process.env.PORT}!`)
);
