import cookieParser from "cookie-parser";
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./config/index";
import { userRoutes } from "./modules/user/user.route";
import { authRoutes } from "./auth/auth.routes.js";
import { postRoutes } from "./modules/posts/post.route";
import { commentRoutes } from "./modules/comments/comment.route";
import { notFound } from "./middleware/not-found";
import  httpStatus  from "http-status";



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

app.use(notFound)
app.use((err: any, req: Request, res: Response, next: NextFunction)=>{
       res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        StatusCodes: httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
        error : err
       
      });
})

export default app;
