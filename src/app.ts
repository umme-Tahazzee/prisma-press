import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config/index.js";
import { userRoutes } from "./modules/user/user.route.js";
import { authRoutes } from "./auth/auth.routes.js";
import { postRoutes } from "./modules/posts/post.route.js";


const app: Application = express();

// middleware
app.use(
    cors({
        origin: config.app_url,
        credentials: true,
    }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ Fixed
app.use(cookieParser());

app.get("/", async (req: Request, res: Response) => {
    res.send("Hello world");
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes)

//posts 

app.post('api/posts',postRoutes)

export default app;
