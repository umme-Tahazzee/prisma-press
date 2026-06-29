import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller.js";
import { jwtUtils } from "../../utils/jwt.js";
import config from "../../config/index.js";
import { UserRole } from "../../../generated/prisma/enums.js";
import  HttpStatus  from "http-status";


const router = Router()

router.post("/register", userController.registerUser );
router.get("/me",(req:Request, res: Response, next : NextFunction)=>{
       const { accessToken } = req.cookies
       const verifyToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret)
       const {id, email, role} = verifyToken
       const requireRole = [UserRole.ADMIN, UserRole.AUTHOR]
  
       if(!requireRole.includes(role)){
           res.send({
             success: false,
             statusCode : HttpStatus.FORBIDDEN,
             message : "Forbidden , you dont permission to access"
           })
       }
     
       next()
}, userController.getMyProfile );


export const userRoutes = router