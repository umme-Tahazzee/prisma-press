import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { postService } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";

const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id
    const payload = req.body
    const result = await postService.createPostFromDb(payload, id as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Post successfully created",
        data: result
    })
})

const getAllPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await postService.getAllPostFromDb()

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully get all posts",
        data: result
    })
})

const getPostById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId

    if (!postId) {
        throw new Error("Post id required in params")
    }

    const result = await postService.getPostByIdFromDb(postId as string)


    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully get posts for user",
        data: result
    })


})

const getMyPosts = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
      const authorId = req.user?.id 
      const result = await postService.getMyPostsFromDb(authorId as string)

       sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully get my all posts",
        data: result
    })
})

const updatePost = catchAsync(async(req:Request, res:Response,  next: NextFunction)=>{

    const postId = req.params.postId
    const authorId = req.user?.id
    const isAdmin = req.user?.role === "ADMIN"
    const payload = req.body

   const result = await postService.updatePostFromDb(postId as string, payload, authorId as string, isAdmin)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Post Update Successfuuly",
        data: result
    })


})

const deletePost = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
        
    const postId = req.params.postId  as string
    const authorId = req.user?.id as string
    const isAdmin = req.user?.role === 'ADMIN'

    if(!postId) throw new Error("This is not exists ")

       await postService.deletePostFromDb(postId, authorId, isAdmin)
        sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Post deleted Successfuuly",
        data: null
    })
})


export const postController = {
    createPost,
    getAllPost,
    getPostById,
    getMyPosts,
    updatePost,
    deletePost
}