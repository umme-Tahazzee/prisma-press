import { Router } from "express";
import { userController } from "./user.controller.js";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../prisma/generated/prisma/enums";

const router = Router();


router.post("/register", userController.registerUser);

router.get( "/me",
  auth(UserRole.ADMIN, UserRole.AUTHOR, UserRole.USER),
  userController.getMyProfile,
);

router.put("/my-profile", auth(UserRole.ADMIN, UserRole.USER, UserRole.AUTHOR),
   userController.updateMyProfile)

export const userRoutes = router;
