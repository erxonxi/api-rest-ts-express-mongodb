import express from "express";
import { followUser } from "./FollowsController";

const app = express();

app.post("/user", followUser);

export default app;
