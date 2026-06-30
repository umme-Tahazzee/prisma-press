import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { UserRole } from "../../../generated/prisma/enums.js";
import { postController } from "./post.controller.js";

const router = Router()

router.post("/post", auth(UserRole.ADMIN, UserRole.USER, UserRole.AUTHOR), 
             postController.createPost)


export const postRoutes = router