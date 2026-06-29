import { NextFunction, Request, Response } from "express";
import { UserRole } from "../../generated/prisma/enums.js";
import { catchAsync } from "../utils/catchAsync.js";
import { jwtUtils } from "../utils/jwt.js";
import config from "../config/index.js";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";


declare global {
  namespace Express {
    interface Request {
      user?: {
        email: string;
        id: string;
        role: UserRole;
      };
    }
  }
}


export const auth = (...requireRole: UserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.cookies.accessToken ? 
      req.cookies.accessToken
      :req.headers.authorization?.startsWith("Bearer")
      ? req.headers.authorization?.split(" ")[1]
      : req.headers.authorization 

    if (!token) {
      throw new Error("You are not loged out");
    }

    const verifyToken = jwtUtils.verifyToken(token, config.jwt_access_secret);

    if (!verifyToken.success) {
      throw new Error(verifyToken.error);
    }

    const { id, email, role } = verifyToken.data as JwtPayload;
    if (requireRole.length && !requireRole.includes(role)) {
      throw new Error(
        "Forbiden you dont have permission to acess this resource",
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
        email,
        role,
      },
    });

    if (!user) {
      throw new Error("user not found");
    }

    if (user.active_status === "BLOCKED") {
      throw new Error("Your account has been blocked");
    }

    req.user = {
      id,
      email,
      role,
    };
    next()
  });
};