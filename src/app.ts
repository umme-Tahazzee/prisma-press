
import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from 'cors'
import config from "./config/index.js";
import { prisma } from "./lib/prisma.js";

const app: Application = express();


app.use(cors({
    origin: config.app_url,
    credentials: true
}))
app.use(express.json())
express.urlencoded({ extended: true })
app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
    const user = prisma.user.findMany()
    console.log(user);

    res.send("Hello world")
})

export default app;