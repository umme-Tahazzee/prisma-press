import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { authService } from "./auth.service.js";
import { sendResponse } from "../utils/sendResponse.js";
import  httpStatus  from "http-status";
const loginUser = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const payload = req.body

    const loginResult = await authService.loginUser(payload)
    sendResponse(res,{
        success : true,
        statusCode: httpStatus.OK,
        message: "user is login successfull",
        data : loginResult
    })
})

export const authController = {
     loginUser
}