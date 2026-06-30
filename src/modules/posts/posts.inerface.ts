import { PostStatus } from "../../../prisma/generated/prisma/enums"

type status = 'published'

export interface IcreatePostPayload {
     title : string
     content: string
     thumbnail ?: string
     isFeature : boolean
     status ?: PostStatus
     tags : string[]
}