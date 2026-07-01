import { Router } from "express";
import { auth } from "../../middleware/auth";
import { postController } from "./post.controller";
import { UserRole } from "../../../prisma/generated/prisma/enums";

const router = Router()

router.post("/", auth(UserRole.ADMIN, UserRole.USER, UserRole.AUTHOR), 
             postController.createPost)

router.get('/', auth(UserRole.ADMIN, UserRole.USER, UserRole.AUTHOR), postController.getAllPost)
router.get('/my-posts', auth(UserRole.ADMIN, UserRole.USER, UserRole.AUTHOR), postController.getMyPosts)
router.get('/:postId', postController.getPostById)
router.patch('/:postId',auth(UserRole.ADMIN, UserRole.USER, UserRole.AUTHOR), postController.updatePost)
router.delete('/:postId',auth(UserRole.ADMIN, UserRole.USER, UserRole.AUTHOR),postController.deletePost)
export const postRoutes = router