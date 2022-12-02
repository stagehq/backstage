import { builder } from '../builder';
import prisma from "../../db/prisma";
import ThreadCommentItem from '../../../client/components/02_AppGlobal/Threading/threadComment';

builder.prismaNode('ThreadComment', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (threadComment) => threadComment.id },
  fields: (t) => ({
    createdAt: t.string({ resolve: threadComment => threadComment.createdAt.toString()}),
    modifiedAt: t.string({ resolve: threadComment => threadComment.modifiedAt.toString()}),
    parentComment: t.relation('parentComment'),
    creator: t.relation('creator'),
    reactions: t.relation('reactions'),
    content: t.exposeString('content'),
  }),
});

builder.mutationField('createThreadComment', (t) => 
  t.prismaField({
    type: "ThreadComment",
    args: {
      content: t.arg.string(),
      commentId: t.arg.string(),
    },
    resolve: async (query, root, args, ctx) => {
      if (!ctx.session.user.email || !args.content || !args.commentId) return null;

      return await prisma.threadComment.create({
        data: {
          content: args.content,
          creator: {
            connect: {
              email: ctx.session.user.email
            }
          },
          parentComment: {
            connect: {
              id: args.commentId
            }
          }
        }
      })
    }
  })
);

builder.mutationField('deleteThreadComment', (t) => 
  t.prismaField({
    type: "ThreadComment",
    args: {
      threadCommentId: t.arg.string(),
    },
    resolve: async (query, root, args, ctx) => {
      if (!ctx.session.user.email || !args.threadCommentId) return null;
        const threadComment = await prisma.threadComment.findFirst({
          where: {
            id: args.threadCommentId,
            creator: {
              email: ctx.session.user.email
            }
          }
        })
        if(!threadComment) return null;
        await prisma.threadComment.delete({
          where: {
            id: threadComment?.id,
          }
        })
        return threadComment;
    }
  })
);

builder.mutationField('updateThreadComment', (t) =>
  t.prismaField({
    type: "ThreadComment",
    args: {
      content: t.arg.string(),
      threadCommentId: t.arg.string(),
    },
    resolve: async (_, __, { threadCommentId, content }, ctx) => {
      if (!ctx.session?.user.email || !threadCommentId || !content ) return null;

      const threadComment = await prisma.threadComment.findFirst({
        where: {
          id: threadCommentId,
          creator: {
            email: ctx.session.user.email
          }
        }
      })

      if(threadComment){
        return await prisma.threadComment.update({
          where: {
            id: threadComment.id
          },
          data: {
            content: content
          },
        })
      } else {
        return null;
      }
        
    },
  })
);

