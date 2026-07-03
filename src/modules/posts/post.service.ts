
import {
     CommentStatus,
     PostStatus,
} from "../../../prisma/generated/prisma/enums";
import { IcreatePostPayload, IPostQuery, IUpdatePostPayload } from "./posts.inerface";
import { prisma } from "../../lib/prisma";
import { PostWhereInput } from "../../../prisma/generated/prisma/models";

const createPostFromDb = async (
     payload: IcreatePostPayload,
     userId: string,
) => {
     const result = await prisma.post.create({

          data: {
               ...payload,
               authorId: userId,
          },
     });

     return result;
};

const getAllPostFromDb = async (query: IPostQuery) => {
     const limit = query.limit ? Number(query.limit) :10
     const page = query.page ? Number(query.page) : 1
     const skip = (page - 1) * limit
     const sortBy = query.sortBy ? query.sortBy : "createAt"
     const sortOrder = query.sortOrder ? query.sortOrder : 'desc'

      const tags = query.tags? JSON.parse(query.tags as string) : null
      const tagsArray = Array.isArray(tags) ? tags : []
     
     const andConditions : PostWhereInput[] = []

     if(query.searchTerm){
           andConditions.push({
                OR: [
                        { title: { contains: query.searchTerm, mode: "insensitive" } },
                        { content: { contains: query.searchTerm, mode: "insensitive" } },
                    ]
           })
     }

     if(query.title){
          andConditions.push({
                title: query.title
          })
     }

     if(query.content){
           andConditions.push({
                content : query.content
           })
     }

     if(query.authorId){
           andConditions.push({
               authorId : query.authorId
           })
     }

     if(query.isFeatured){
          andConditions.push({
                isFeatured : Boolean(query.isFeatured)
          })
     }

    if(query.tags){
        andConditions.push({
           tags:{
               hasSome : tagsArray
           }
        })
    }

     if(query.status){
            andConditions.push({
                status : query.status
            })
     }



     const post = await prisma.post.findMany({

       where : {
           AND: andConditions
       },


        take : limit,
        skip : skip,

        orderBy : {
           [sortBy] : sortOrder
        },

        include: {
            author: {
                omit: {
                    password: true,
                },
            },
            comments: true,
        },
     });

    return post;
};

const getPostByIdFromDb = async (postId: string) => {
     const transactionResult = await prisma.$transaction(async (tx) => {
          await tx.post.update({
               where: { id: postId },
               data: {
                    views: {
                         increment: 1,
                    },
               },
          });

          //     throw new Error(" fake found")

          const post = await tx.post.findUniqueOrThrow({
               where: { id: postId },
               include: {
                    author: {
                         omit: {
                              password: true,
                         },
                    },
                    comments: {
                         where: {
                              status: CommentStatus.APPROVED,
                         },
                         orderBy: {
                              createdAt: "desc",
                         },
                    },
                    _count: {
                         select: {
                              comments: true,
                         },
                    },
               },
          });

          return post;
     });

     return transactionResult;
};

const getPostsStats = async () => {
     const transactionResult = await prisma.$transaction(async (tx) => {
          const [
               totalPosts,
               totalPublishedPost,
               totalDarftPost,
               totalArchivePost,
               totalComment,
               totalApprovedComment,
               totalRejectedComment,
               postViewsAggregate,
          ] = await Promise.all([
               tx.post.count(),
               tx.post.count({ where: { status: PostStatus.PUBLISHED } }),
               tx.post.count({ where: { status: PostStatus.DRAFT } }),
               tx.post.count({ where: { status: PostStatus.ARCHIVE } }),
               tx.comment.count(),
               tx.comment.count({ where: { status: CommentStatus.APPROVED } }),
               tx.comment.count({ where: { status: CommentStatus.REJECT } }),
               tx.post.aggregate({ _sum: { views: true } }),
          ]);

          return {
               totalPosts,
               totalPublishedPost,
               totalDarftPost,
               totalArchivePost,
               totalComment,
               totalApprovedComment,
               totalRejectedComment,
               totalPostViews: postViewsAggregate._sum.views,
          };
     });

     return transactionResult;
};

const getMyPostsFromDb = async (authorId: string) => {
     const result = await prisma.post.findMany({
          where: {
               authorId,
          },
          orderBy: {
               createdAt: "desc",
          },
          include: {
               comments: true,
               author: {
                    omit: {
                         password: true,
                    },
               },
               _count: {
                    select: {
                         comments: true,
                    },
               },
          },
     });

     return result;
};

const updatePostFromDb = async (
     postId: string,
     payload: IUpdatePostPayload,
     authorId: string,
     isAdmin: boolean,
) => {
     const post = await prisma.post.findUniqueOrThrow({
          where: {
               id: postId,
          },
     });

     if (!isAdmin && post.authorId !== authorId) {
          throw new Error("You are not authorized to update this post");
     }
     const result = await prisma.post.update({
          where: {
               id: postId,
          },
          data: payload,
          include: {
               author: {
                    omit: {
                         password: true,
                    },
               },
          },
     });
     return result;
};

const deletePostFromDb = async (
     postId: string,
     authorId: string,
     isAdmin: boolean,
) => {
     const post = await prisma.post.findUniqueOrThrow({
          where: {
               id: postId,
          },
     });
     if (!isAdmin && post.authorId !== authorId) {
          throw new Error("You are not authorized to delete this post");
     }

     const result = await prisma.post.delete({
          where: {
               id: postId,
          },
     });

     return result;
};

export const postService = {
     createPostFromDb,
     getAllPostFromDb,
     getPostByIdFromDb,
     getPostsStats,
     getMyPostsFromDb,
     updatePostFromDb,
     deletePostFromDb,
};
