import { PostStatus } from "../../../prisma/generated/prisma/enums"
import { PostWhereInput } from "../../../prisma/generated/prisma/models"

type status = 'published'

export interface IcreatePostPayload {
     title: string
     content: string
     thumbnail?: string
     isFeature: boolean
     status?: PostStatus
     tags: string[]
}

export interface IUpdatePostPayload {
     title?: string
     content?: string
     thumbnail?: string
     isFeature?: boolean
     status?: PostStatus
     tags?: string[]
}

export interface IPostQuery extends PostWhereInput {

     searchTerm ?: string
     page?:string
     limit?: string
     sortOrder?:string
     sortBy?:string

}