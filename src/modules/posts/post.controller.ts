import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { postService } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";
import  httpStatus  from "http-status";

const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id
    const payload = req.body
    const result = await postService.createPostFromDb(payload, id as string)

    sendResponse(res, {
         success : true,
         statusCode : httpStatus.OK,
         message : "Post successfully created",
         data : result
    })
})

const getAllPost = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
     const result = await postService.getAllPostFromDb()

     sendResponse(res, {
           success : true,
           statusCode : httpStatus.OK,
           message : "Successfully get all posts",
           data : result
     })
})


const getPostById = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
  const postId = req.params.postId

  if(!postId){
    throw new Error("Post id required in params")
  }

  const result = await postService.getPostByIdFromDb(postId as string)


  sendResponse(res, {
           success : true,
           statusCode : httpStatus.OK,
           message : "Successfully get posts for user",
           data : result
     })


})

export const postController = {
    createPost,
    getAllPost,
    getPostById
}