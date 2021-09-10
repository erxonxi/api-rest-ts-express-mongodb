import express from "express";
import { creteComment } from "./CommentsController";

const app = express();

app.post("/create", creteComment);

export default app;
