import { NextFunction, Request, RequestHandler, Response } from "express";

import httpStatus, {
  INTERNAL_SERVER_ERROR,
  StatusCodes,
} from "http-status-codes";
import { useService } from "./user.service.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";


const registerUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const user = await useService.registerUserIntoDb(payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "user registration succefully",
    data: {
      user,
    },
  });
});


const getMyProfile = catchAsync(async(req:Request, res: Response)=>{
    const payload = req.body
    const userProfile = await useService.getProfileFromDb()
})

export const userController = {
  registerUser,
  getMyProfile
};
