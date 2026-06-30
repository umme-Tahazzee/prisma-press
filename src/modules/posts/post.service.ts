import { prisma } from "../../lib/prisma"
import { RegisterInterfacePayload } from "../user/user.interface"

const createPostFromDb = async(payload:RegisterInterfacePayload)=> {
          const post = await prisma.post

export const postService = {
     createPostFromDb
}