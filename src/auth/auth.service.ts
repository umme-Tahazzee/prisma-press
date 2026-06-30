import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";
import { IloginUser } from "./interface.js";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import config from "../config/index.js";
import { jwtUtils } from "../utils/jwt.js";


const loginUser = async (payload: IloginUser) => {
  const { email, password } = payload;
  
  
  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  });

  const isPassword = await bcrypt.compare(password, user.password);

  if (!isPassword) {
    throw new Error("Password is incorrect");
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };


  const acesstoken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions
  )
  
  

  const refreshToken = jwtUtils.createToken(
     jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions
  )


  return {
    acesstoken,
    refreshToken,
  };
};

const refreshToken = async (refreshToken : string) => {
     const verifyRefreshedToken  = jwtUtils.verifyToken(refreshToken, config.jwt_refresh_secret)
     if(!verifyRefreshedToken.success){
        throw  Error(verifyRefreshedToken.error)
     }

     const {id} = verifyRefreshedToken.data as JwtPayload
     const user = await prisma.user.findFirstOrThrow({
       where : {id}
     })
     if(user.active_status === 'BLOCKED'){
        throw new Error('user is bloocked')
     }

     const jwtPayload = {
      id,
      name : user.name, 
      email :user.email,
      role : user.role

     }

     const accessToken = jwtUtils.createToken(
       jwtPayload,
       config.jwt_access_secret,
       config.jwt_access_expires_in as SignOptions
     )

     return {
         accessToken
        }

}

export const authService = {
  loginUser,
  refreshToken
  
};
