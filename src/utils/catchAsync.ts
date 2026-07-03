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
       next(error)
    }
  };
};
