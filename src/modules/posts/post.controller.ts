import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { prisma } from "../../lib/prisma.js";
import { postService } from "./post.service.js";

const createPost = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{

const post = await postService.createPostFromDb()
   

})

export const postController = {
    createPost
}