import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller.js";
import { jwtUtils } from "../../utils/jwt.js";
import config from "../../config/index.js";
import { UserRole } from "../../../generated/prisma/enums.js";
import HttpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync.js";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../lib/prisma.js";
import { auth } from "../../middleware/auth.js";

const router = Router();


router.post("/register", userController.registerUser);

router.get( "/me",
  auth(UserRole.ADMIN, UserRole.AUTHOR, UserRole.USER),
  userController.getMyProfile,
);

router.put("/my-profile", auth(UserRole.ADMIN, UserRole.USER, UserRole.AUTHOR),
   userController.updateMyProfile)

export const userRoutes = router;
