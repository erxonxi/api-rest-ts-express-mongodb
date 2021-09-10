import express from "express";
import AuthRoutes from "./controllers/Auth/AuthRoutes";
import PostRoutes from "./controllers/Posts/PostsRoutes";
import FollowRoutes from "./controllers/Follows/FollowsRoutes";
import { protectRoute } from "./middleware/protectRoute";

const app = express();

// implement routes
app.use("/auth", AuthRoutes);
app.use("/post", protectRoute, PostRoutes);
app.use("/follow", FollowRoutes);

export default app;
