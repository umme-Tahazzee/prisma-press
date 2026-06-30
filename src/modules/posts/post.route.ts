import { Router } from "express";
import { auth } from "../../middleware/auth";
import { postController } from "./post.controller";
import { UserRole } from "../../../prisma/generated/prisma/enums";

const router = Router()

router.post("/", auth(UserRole.ADMIN, UserRole.USER, UserRole.AUTHOR), 
             postController.createPost)


export const postRoutes = router