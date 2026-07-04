import cookieParser from "cookie-parser";
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./config/index";
import { userRoutes } from "./modules/user/user.route";
import { authRoutes } from "./auth/auth.routes.js";
import { postRoutes } from "./modules/posts/post.route";
import { commentRoutes } from "./modules/comments/comment.route";
import { notFound } from "./middleware/not-found";
import { globalError } from "./middleware/globalError";
import { subscriptionRoutes } from "./modules/subscription/subsription.interface";




const app: Application = express();

// middleware
app.use(
    cors({
        origin: config.app_url,
        credentials: true,
    }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", async (req: Request, res: Response) => {
    res.send("Hello world");
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes)
app.use('/api/posts',postRoutes)
app.use('/api/comments', commentRoutes )
app.use('/api/subcription', subscriptionRoutes)



app.use(notFound)
app.use(globalError)
export default app;
