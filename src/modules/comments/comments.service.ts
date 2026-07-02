import { prisma } from "../../lib/prisma";
import { ICreateCommentPayload, ImoderateComment } from "./comments.interface";

const createComment = async (
     authorId: string,
     payload: ICreateCommentPayload,
) => {
     const post = await prisma.post.findUnique({
          where: {
               id: payload.postId,
          },
     });

     if (!post) {
          throw new Error("Post not found");
     }

     const comment = await prisma.comment.create({
          data: {
               content: payload.content,
               postId: payload.postId,
               authorId: authorId,
          },
     });

     return comment;
};

const getAllCommentFromDb = async () => {
     const result = await prisma.comment.findMany();
     return result;
};

const getCommentsByAuthorFromDb = async (authorId: string) => {
     const comments = await prisma.comment.findMany({
          where: {
               id: authorId,
          },
          include: {
               post: {
                    select: {
                         id: true,
                         title: true,
                         views: true,
                    },
               },
          },
     });
     return comments;
};

const updateCommentsFromDb = async (
     commentId: string,
     authorId: string,
     data: ICreateCommentPayload,
) => {
     const commentData = await prisma.comment.findUniqueOrThrow({
          where: {
               id: commentId,
               authorId,
          },
          select: {
               id: true,
          },
     });

     if (!commentData) {
          throw new Error("Your provide input is not valid");
     }

     const comment = await prisma.comment.update({
          where: {
               id: commentId,
               authorId,
          },
          data,
     });
     return comment;
};

const deleteCommentFromDb = async (commentId: string, authorId: string) => {
     const commentData = await prisma.comment.findUniqueOrThrow({
          where: {
               id: commentId,
               authorId,
          },
          select: {
               id: true,
          },
     });

     if (!commentData) throw new Error("Your provided input is not valid");

     const result = await prisma.comment.delete({
          where: {
               id: commentId,
               authorId,
          },
     });

     return result;
};

const moderateCommentByDb = async (
     commentId: string,
     data: ImoderateComment,
) => {
     const commentData = await prisma.comment.findUnique({
          where: {
               id: commentId,
          },
          select: {
               id: true,
               status: true,
          },
     });
     if (commentData?.status === data.status) {
          throw new Error(`Your provide ${data.status} is already up to date`);
     }

     const comment = await prisma.comment.update({
          where: {
               id: commentId
          },
          data
     })

     return comment
};

export const commentService = {
     createComment,
     getAllCommentFromDb,
     getCommentsByAuthorFromDb,
     updateCommentsFromDb,
     deleteCommentFromDb,
     moderateCommentByDb,
};
