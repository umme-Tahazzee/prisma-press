import { prisma } from "../../lib/prisma";
import { ICreateCommentPayload } from "./comments.interface";

const createComment = async(authorId : string, payload:ICreateCommentPayload) => {
     
       console.log(payload.postId);
     
   
     await prisma.post.findUniqueOrThrow({
            where :{
                 id : payload.postId
            }
     })
 
       
     const comment = await prisma.comment.create({
          data: {
               ...payload,
                authorId : authorId
          },
     });

     return comment
}

export const commentService = {
      createComment
}