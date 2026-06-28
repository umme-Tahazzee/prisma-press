import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus, {
  INTERNAL_SERVER_ERROR,
  StatusCodes,
} from "http-status-codes";

export const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        StatusCodes: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Failed to register",
        error: (error as Error).message,
      });
    }
  };
};
