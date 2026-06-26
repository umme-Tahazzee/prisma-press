import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config/index.js";
import { prisma } from "./lib/prisma.js";
import httpStatus, { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { profile } from "node:console";

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

app.post("/api/users/register", async (req: Request, res: Response) => {
    const { name, email, password, profilePhoto, bio } = req.body

    const isUserExist = await prisma.user.findUnique({
        where: { email }
    })

    if (isUserExist) {
        return res.status(409).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(
        password, Number(config.bcrypt_salt_rounds)
    )


    const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })




    await prisma.profile.create({
        data: {
            profilePhoto,
            userId: createdUser.id,
            bio

        }
    })
    const user = await prisma.user.findUnique({
        where: {
            id: createdUser.id,
            email: createdUser.email || email
        },
        omit: {
            password: true
        },
        include: {
            profile: true,

        }
    })
    res.status(httpStatus.CREATED)
        .json({
            success: true,
            StatusCodes: httpStatus.CREATED,
            message: "user registration succefully",
            data: {
                user
            }
        });


});

export default app;
