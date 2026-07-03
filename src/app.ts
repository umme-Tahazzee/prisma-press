import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config/index";
import { userRoutes } from "./modules/user/user.route";
import { authRoutes } from "./auth/auth.routes.js";
import { postRoutes } from "./modules/posts/post.route";
import { commentRoutes } from "./modules/comments/comment.route";


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

app.use((req: Request, res: Response)=>{
     res.status(404).json({
         message : "Route not found"
     })
})


export default app;
