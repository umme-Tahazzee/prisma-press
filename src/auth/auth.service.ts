import bcrypt from "bcryptjs"
import { prisma } from "../lib/prisma.js"
import { IloginUser } from "./interface.js"

const loginUser = async(payload: IloginUser) =>{
      
     const {email, password} = payload
     const user = await prisma.user.findUniqueOrThrow({
           where : {email}
     })
   
     
     const isPassword = await bcrypt.compare
     (password, user.password);

     if(!isPassword) {
           throw new Error("Password is incorrect")
     }
}

export const authService = {
     loginUser
}