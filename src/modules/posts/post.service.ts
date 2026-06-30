import { prisma } from "../../lib/prisma"
import { RegisterInterfacePayload } from "../user/user.interface"
import { IcreatePostPayload } from "./posts.inerface"

const createPostFromDb = async(payload:IcreatePostPayload, userId:string)=> {
          const result = await prisma.post.create({
                  data : {
                       ...payload,
                       authorId : userId
                  }
          })

          return result
}

export const postService = {
     createPostFromDb
}