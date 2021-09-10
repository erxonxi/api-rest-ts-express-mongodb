import express from "express";
import { me, singIn, singUp } from "./AuthController";

const app = express();

app.post("/singup", singUp);
app.post("/singin", singIn);
app.post("/me", me);

export default app;
