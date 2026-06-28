import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";
import { IloginUser } from "./interface.js";
import jwt, { SignOptions } from "jsonwebtoken";
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
    password: user.password,
    role: user.role,
  };


  const acesstoken = jwtUtils.createToken(
    payload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions
  )

  const refreshToken = jwtUtils.createToken(
    payload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions
  )


  return {
    acesstoken,
    refreshToken,
  };
};

export const authService = {
  loginUser,
};
