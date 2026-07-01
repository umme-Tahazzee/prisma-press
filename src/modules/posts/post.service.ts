import { includes } from "zod"
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
     } )

     return post
}

export const postService = {
     createPostFromDb,
     getAllPostFromDb
}