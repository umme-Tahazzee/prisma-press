import { Router } from "express";
import { auth } from "../../middleware/auth";
import { postController } from "./post.controller";
import { UserRole } from "../../../prisma/generated/prisma/enums";

const router = Router()

router.post("/", auth(UserRole.ADMIN, UserRole.USER, UserRole.AUTHOR), 
             postController.createPost)

router.get('/', auth(UserRole.ADMIN, UserRole.USER, UserRole.AUTHOR), postController.getAllPost)
router.get('/:postId', postController.getPostById)
router.get('/my-post', postController.getMypost)


export const postRoutes = router