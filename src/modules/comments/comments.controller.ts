import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { commentService } from "./comments.service"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from 'http-status'


const createComment = catchAsync(async(req:Request, res:Response)=>{
      const authorId = req.user?.id as string
      const payload = req.body
    
      const result = await commentService.createComment(authorId ,payload)

      sendResponse(res, {
              success : true,
              statusCode : httpStatus.CREATED,
               message : "Comment created successfully",
              data : result
      })
})

const getAllComments = catchAsync(async(req:Request, res:Response) => {
       const result = await commentService.getAllCommentFromDb() 

        sendResponse(res, {
              success : true,
              statusCode : httpStatus.OK,
              message : "get all comment succesfully",
              data : result
      })
})

const getCommentsById = catchAsync(async(req:Request, res:Response) => {
     const authorId = req.params.authorId as string

     const result = await commentService.getAllCommentFromByDb(authorId)
     sendResponse(res, {
              success : true,
              statusCode : httpStatus.OK,
              message : `get ${authorId} comments successfully`,
              data : result
      })
})

const updateComments = catchAsync(async(req:Request, res:Response) => {
    const authorId = req.user?.id as string
    const commentId = req.params.commentId as string
    const data = req.body
    const result = await commentService.updateCommentsFromDb(commentId , authorId, data)
     sendResponse(res, {
              success : true,
              statusCode : httpStatus.OK,
              message : `update ${authorId} comments successfully`,
              data : result
      })
    
})


const deletedComments = catchAsync(async(req:Request, res:Response) => {
       const authorId = req.user?.id as string
       const commentId = req.params.commentId as string
       await commentService.deleteCommentFromDb( commentId, authorId)

       sendResponse(res, {
              success : true,
              statusCode : httpStatus.OK,
              message : `delete  comments successfully`,
              data : null
      })
})

const moderateComment = catchAsync(async(req:Request, res:Response) => {

})




export const commentController = {
     createComment,
     getAllComments,
     getCommentsById,
     updateComments,
     deletedComments,
     moderateComment
}