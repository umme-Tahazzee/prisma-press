
import { prisma } from "../../lib/prisma"
import { IcreatePostPayload } from "./posts.inerface"


const createPostFromDb = async (payload: IcreatePostPayload, userId: string) => {
     const result = await prisma.post.create({
          data: {
               ...payload,
               authorId: userId
          }
     })

     return result
}

const getAllPostFromDb = async () => {
     const post = await prisma.post.findMany({
          include: {
               author: {
                    omit: {
                         password: true
                    }
               },
               comments: true
          }
     })

     return post
}

const getPostByIdFromDb = async (postId: string) => {
     const post = await prisma.post.findUnique({
          where: {
               id : postId
          },
          include: {
               author: {
                    omit: {
                         password: true
                    }
               },
               comments: true
          },
     })

     if(!post){
           throw new Error("Post not found")
     }

     return post

}

export const postService = {
     createPostFromDb,
     getAllPostFromDb,
     getPostByIdFromDb
}