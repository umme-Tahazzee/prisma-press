
import { prisma } from "../../lib/prisma"
import { IcreatePostPayload, IUpdatePostPayload } from "./posts.inerface"


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
     const post = await prisma.post.findUniqueOrThrow({
          where: { id: postId }

     })

     const updatedPost = await prisma.post.update({
          where: { id: postId },
          data: {
               views: {
                    increment: 1
               }
          },
          include: {
               author: {
                    omit: {
                         password: true
                    }
               },
               comments: true
          }
     })
     return updatedPost
}

const getMyPostsFromDb = async (authorId: string) => {

     const result = await prisma.post.findMany({
          where: {
               authorId
          },
          orderBy: {
               createdAt: "desc"
          },
          include: {
               comments: true,
               author: {
                    omit: {
                         password: true
                    }
               },
               _count: {
                    select: {
                         comments: true
                    }
               }
          }
     })

     return result
}

const updatePostFromDb = async(postId: string, 
     payload : IUpdatePostPayload, authorId : string, isAdmin : boolean)=>{
     const post = await prisma.post.findUniqueOrThrow({
            where : {
                id : postId
            }
     })
     
     if(!isAdmin && post.authorId !== authorId){
          throw new Error("You are not authorized to update this post")
     }
     const result = await prisma.post.update({
           where : {
                id : postId
           },
           data : payload,
           include: {
                 author : {
                      omit : {
                          password : true
                      }
                 }
           }
     })
     return post
}


const deletePostFromDb = async (postId: string , authorId : string , isAdmin :boolean) =>{
     const post = await prisma.post.findUniqueOrThrow({
            where : {
                id : postId
            }
     })
      if(!isAdmin && post.authorId !== authorId){
          throw new Error("You are not authorized to delete this post")
     }

     const result = await prisma.post.delete({
            where : {
                id: postId
            }
     })

     return result
}

export const postService = {
     createPostFromDb,
     getAllPostFromDb,
     getPostByIdFromDb,
     getMyPostsFromDb,
     updatePostFromDb,
     deletePostFromDb
}