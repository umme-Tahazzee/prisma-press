import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { authService } from "./auth.service.js";
import { sendResponse } from "../utils/sendResponse.js";
import  httpStatus  from "http-status";



const loginUser = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const payload = req.body

    const {acesstoken, refreshToken} = await authService.loginUser(payload)
   
    res.cookie("accessToken", acesstoken, {
         httpOnly: true,
         secure: false,
         sameSite: "none",
         maxAge: 1000 * 60 * 60  * 24 // 24 hour 1 day
    })
   res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
         secure: false,
         sameSite: "none",
         maxAge: 1000 * 60 * 60  * 24 * 7 // 7 days
   })

    sendResponse(res,{
        success : true,
        statusCode: httpStatus.OK,
        message: "user is login successfull",
        data : {
             acesstoken,
             refreshToken
        }
    })
})

const refreshToken = catchAsync(async(req:Request, res:Response, next:NextFunction) =>{
  const refreshToken = req.cookies.refreshToken
  
  
  const {accessToken} = await authService.refreshToken(refreshToken)

   
   res.cookie("accessToken", accessToken, {
         httpOnly: true,
         secure: false,
         sameSite: "none",
         maxAge: 1000 * 60 * 60  * 24 // 24 hour 1 day
    })

  sendResponse(res,{
       success: true,
       statusCode : httpStatus.OK,
       message: "token refesh Token successfully",
       data : {
           accessToken
       }
  })
})


export const authController = {
     loginUser,
     refreshToken 
}