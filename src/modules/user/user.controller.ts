import { NextFunction, Request, RequestHandler, Response } from "express";

import httpStatus, {
  INTERNAL_SERVER_ERROR,
  StatusCodes,
} from "http-status-codes";
import { useService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

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

  const profile = await useService.getProfileFromDb(req.user?.id as string)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User profile fetched successfully',
    data: { profile }
  })
})

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string
  const payload = req.body
  const updateProfile = await useService.updateMyProfileFromDb(userId, payload)
  sendResponse(res, {
     success: true,
     statusCode: httpStatus.OK,
     message : 'user profile update successfully',
     data : {updateProfile}
  })
})

export const userController = {
  registerUser,
  getMyProfile,
   updateMyProfile
};
