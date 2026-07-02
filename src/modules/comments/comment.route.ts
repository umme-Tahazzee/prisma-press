import { Router } from "express";
import { commentController } from "./comments.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../prisma/generated/prisma/enums";


const router = Router()

router.post('/',auth(UserRole.ADMIN, UserRole.USER, UserRole.AUTHOR), commentController.createComment)
router.get('/',  commentController.getAllComments)
router.get('/author/:authorId', commentController.getCommentsById)
router.patch('/:commentId',auth(UserRole.ADMIN, UserRole.USER, UserRole.AUTHOR),  commentController.updateComments)
router.delete('/:commentId', auth(UserRole.ADMIN, UserRole.USER, UserRole.AUTHOR), commentController.deletedComments)
router.put('/:commentId/moderate', auth(UserRole.ADMIN), commentController.moderateComment)

export const commentRoutes = router