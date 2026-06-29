import { NextFunction, Request, RequestHandler, Response } from "express";

import httpStatus, {
  INTERNAL_SERVER_ERROR,
  StatusCodes,
} from "http-status-codes";
import { useService } from "./user.service.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import jwt from 'jsonwebtoken'
import config from "../../config/index.js";
import { jwtUtils } from "../../utils/jwt.js";


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


const getMyProfile = catchAsync(async (req: Request, res: Response) => {

  // const userProfile = await useService.getProfileFromDb()
  const { accessToken } = req.cookies
  const verifyToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret)
  const profile = await useService.getProfileFromDb(verifyToken.id as string)
   sendResponse(res,{
     success : true,
     statusCode : httpStatus.OK,
     message : 'User profile fetched successfully',
     data : {profile}
   })
})

export const userController = {
  registerUser,
  getMyProfile
};
