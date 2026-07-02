import { CommentStatus } from "../../../prisma/generated/prisma/enums";

export interface ICreateCommentPayload {
    postId: string;
    authorId: string;
    content: string;
}

export interface IupdateCommentPayload {
     content ?: string
     status ?: CommentStatus
}

export interface ImoderateComment{
     status ?: CommentStatus
}