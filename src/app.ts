import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config/index.js";
import { userRoutes } from "./modules/user/user.route.js";


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

export default app;
