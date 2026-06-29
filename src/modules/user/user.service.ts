import { prisma } from "../../lib/prisma.js"
import bcrypt from "bcryptjs";
import config from "../../config/index.js";
import type {RegisterInterfacePayload} from '../user/user.interface.js'
import { JwtPayload } from "jsonwebtoken";




const registerUserIntoDb = async(payload: RegisterInterfacePayload) => {
   const  {name, email, password, profilePhoto , bio} = payload
    const isUserExist = await prisma.user.findUnique({
        where: { email }
    })

    if (isUserExist) {
       throw new Error("User already exists")
    }

    const hashedPassword = await bcrypt.hash(
        password, Number(config.bcrypt_salt_rounds)
    )


    const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            profile : {
                 create: {
                    profilePhoto,
                    bio
                 }
            }
        }
    })
    
    // option 2 for create profile 
    // await prisma.profile.create({
    //     data: {
    //         profilePhoto,
    //         userId: createdUser.id,
    //         bio

    //     }
    // })
    const user = await prisma.user.findUnique({
        where: {
            id: createdUser.id,
            email: createdUser.email || email
        },
        omit: {
            password: true
        },
        include: {
            profile: true,

        }
    })

    return user
}

const getProfileFromDb = async(userId: string )=>{
   const userProfile = await prisma.user.findUniqueOrThrow({
     where : { id : userId},
     omit : {password : true},
     include: {
         profile: true
     }  }) 

     return userProfile;
}

export const useService={
    registerUserIntoDb,
    getProfileFromDb
}