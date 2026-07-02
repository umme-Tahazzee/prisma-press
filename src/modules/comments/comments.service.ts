import { prisma } from "../../lib/prisma";
import { ICreateCommentPayload } from "./comments.interface";

const createComment = async (authorId: string, payload: ICreateCommentPayload) => {

     await prisma.post.findUniqueOrThrow({
          where: {
               id: payload.postId
          }
     })


     const comment = await prisma.comment.create({
          data: {
               ...payload,
               authorId: authorId
          },
     });

     return comment
}

const getAllCommentFromDb = async () => {
     const result = await prisma.comment.findMany()
     return result
}

const getAllCommentFromByDb = async (authorId: string) => {
     const comments = await prisma.comment.findUniqueOrThrow({
          where: {
               id: authorId
          },
          include: {
               post: {
                    select: {
                         id: true,
                         title: true,
                         views: true
                    }
               }

          }

     })
     return comments
}

const updateCommentsFromDb = async (commentId: string, authorId: string, data: ICreateCommentPayload) => {
     const commentData = await prisma.comment.findUniqueOrThrow({
          where: {
               id: commentId,
               authorId
          },
          select: {
               id: true
          }
     })

     if (!commentData) {
          throw new Error("Your provide input is not valid")
     }

     const comment = await prisma.comment.update({
          where: {
               id: commentId,
               authorId
          },
          data

     })
     return comment

}

const deleteCommentFromDb = async (commentId: string, authorId : string) => {
   const result = await prisma.comment.delete({
      where : {
            id: commentId,
            authorId
      }
   })

   return result
}
 

export const commentService = {
     createComment,
     getAllCommentFromDb,
     getAllCommentFromByDb,
     updateCommentsFromDb,
     deleteCommentFromDb
}