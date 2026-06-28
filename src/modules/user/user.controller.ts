import { Request, Response } from "express";

import httpStatus, { INTERNAL_SERVER_ERROR, StatusCodes } from "http-status-codes";
import { useService } from "./user.service.js";

const registerUser = async (req: Request, res: Response) => {
  const payload = req.body;

  try {
    const user = await useService.registerUserIntoDb(payload);

    res.status(httpStatus.CREATED).json({
      success: true,
      StatusCodes: httpStatus.CREATED,
      message: "user registration succefully",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      StatusCodes: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Failed to register",
      error: (error as Error).message
    });
  }
};

export const userController = {
  registerUser,
};
