import express from "express";
import { createPost, listPostsFollowed } from "./PostsController";

const app = express();

app.post("/create", createPost);
app.get("/list", listPostsFollowed);

export default app;
