import { builder } from '../builder';
import prisma from "../../db/prisma";
import { ParentType } from '../../../client/graphql/types.generated';

export const ParentEnumType = builder.enumType('ParentType', {
  values: ['idea', 'initiative', 'comment', 'threadComment'],
});

builder.prismaNode('Reaction', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (reaction) => reaction.id },
  fields: (t) => ({
    content: t.exposeString('content'),
    idea: t.relation('idea'),
    comment: t.relation('comment'),
    threadComment: t.relation('threadComment'),
    reactionGroup: t.relation('reactionGroup'),
    parentType: t.field({
      type: ParentEnumType,
      resolve: (parent) => parent.parentType
    }),
  }),
});

builder.mutationField('createReaction', (t) => 
  t.prismaField({
    type: "Reaction",
    args: {
      content: t.arg.string(),
      ideaId: t.arg.string({ required: false }),
      commentId: t.arg.string({ required: false }),
      threadCommentId: t.arg.string({ required: false }),
      type: t.arg({ type: ParentEnumType })
    },
    resolve: async (query, root, args, ctx) => {
      if (!ctx.session.user.email || !args.content || !args.type) return null;

      switch(args.type){
        case ParentType.Idea:
          if(!args.ideaId) return null;
          return await prisma.reaction.create({
            data: {
              content: args.content,
              idea: {
                connect: {
                  id: args.ideaId,
                }
              },
              parentType: ParentType.Idea,
              reactionGroup: {
                connect: {
                  email: ctx.session.user.email
                }
              }
            }
          })
        case ParentType.Comment:
          if(!args.commentId) return null;
          return await prisma.reaction.create({
            data: {
              content: args.content,
              comment: {
                connect: {
                  id: args.commentId,
                }
              },
              parentType: ParentType.Comment,
              reactionGroup: {
                connect: {
                  email: ctx.session.user.email
                }
              }
            }
          })
        case ParentType.ThreadComment:
          if(!args.threadCommentId) return null;
          return await prisma.reaction.create({
            data: {
              content: args.content,
              threadComment: {
                connect: {
                  id: args.threadCommentId,
                }
              },
              parentType: ParentType.ThreadComment,
              reactionGroup: {
                connect: {
                  email: ctx.session.user.email
                }
              }
            }
          })
      }
    }
  })
);

builder.mutationField('deleteReaction', (t) => 
  t.prismaField({
    type: "Reaction",
    args: {
      content: t.arg.string(),
      ideaId: t.arg.string({ required: false }),
      commentId: t.arg.string({ required: false }),
      threadCommentId: t.arg.string({ required: false }),
      type: t.arg({ type: ParentEnumType })
    },
    resolve: async (query, root, args, ctx) => {
      if (!ctx.session.user.email || !args.type || !args.content) return null;

      switch(args.type){
        case ParentType.Idea:
          {
            if(!args.ideaId) return null;
            const reaction = await prisma.reaction.findFirst({
              where: {
                idea: {
                  id: args.ideaId
                },
                content: args.content
              }
            })
            if(!reaction) return null;
            await prisma.reaction.delete({
              where: {
                id: reaction?.id,
              }
            })
            return reaction;
          }
        case ParentType.Comment:
          {
            if(!args.commentId) return null;
            const reaction = await prisma.reaction.findFirst({
              where: {
                comment: {
                  id: args.commentId
                },
                content: args.content
              }
            })
            if(!reaction) return null;
            await prisma.reaction.delete({
              where: {
                id: reaction?.id,
              }
            })
            return reaction;
          }
        case ParentType.ThreadComment:
          {
            if(!args.threadCommentId) return null;
            const reaction = await prisma.reaction.findFirst({
              where: {
                threadComment: {
                  id: args.threadCommentId
                },
                content: args.content
              }
            })
            if(!reaction) return null;
            await prisma.reaction.delete({
              where: {
                id: reaction?.id,
              }
            })
            return reaction;
          }
      }
    }
  })
);

builder.mutationField('updateReaction', (t) =>
  t.prismaField({
    type: "Reaction",
    args: {
      content: t.arg.string(),
      ideaId: t.arg.string(),
      commentId: t.arg.string({ required: false }),
      threadCommentId: t.arg.string({ required: false }),
      type: t.arg({ type: ParentEnumType })
    },
    resolve: async (_, __, { ideaId, commentId, threadCommentId, content, type }, ctx) => {
      if (!ctx.session?.user.email || !type || !content ) return null;
      
      switch(type){
        case ParentType.Idea:
          {
            if(!ideaId) return null;
            const userCheck = await prisma.reaction.findFirst({
              where: {
                idea: {
                  id: ideaId
                },
                content: content,
                reactionGroup: {
                  some: {
                    email: ctx.session.user.email
                  }
                }
              }
            })
            const reaction = await prisma.reaction.findFirst({
              where: {
                idea: {
                  id: ideaId
                },
                content: content
              }
            })
      
            if(reaction){
              return await prisma.reaction.update({
                where: {
                  id: reaction.id
                },
                data: {
                  reactionGroup: userCheck ? {
                    disconnect: [{
                      email: ctx.session.user.email
                    }]
                  } : {
                    connect: [{
                      email: ctx.session.user.email
                    }]
                  }
                },
              })
            } else {
              return null;
            }
          }
        case ParentType.Comment:
          {
            if(!commentId) return null;
            const userCheck = await prisma.reaction.findFirst({
              where: {
                comment: {
                  id: commentId
                },
                content: content,
                reactionGroup: {
                  some: {
                    email: ctx.session.user.email
                  }
                }
              }
            })
            const reaction = await prisma.reaction.findFirst({
              where: {
                comment: {
                  id: commentId
                },
                content: content
              }
            })
      
            if(reaction){
              return await prisma.reaction.update({
                where: {
                  id: reaction.id
                },
                data: {
                  reactionGroup: userCheck ? {
                    disconnect: [{
                      email: ctx.session.user.email
                    }]
                  } : {
                    connect: [{
                      email: ctx.session.user.email
                    }]
                  }
                },
              })
            } else {
              return null;
            }
          }
        case ParentType.ThreadComment:
          {
            if(!threadCommentId) return null;
            const userCheck = await prisma.reaction.findFirst({
              where: {
                threadComment: {
                  id: threadCommentId
                },
                content: content,
                reactionGroup: {
                  some: {
                    email: ctx.session.user.email
                  }
                }
              }
            })
            const reaction = await prisma.reaction.findFirst({
              where: {
                threadComment: {
                  id: threadCommentId
                },
                content: content
              }
            })
      
            if(reaction){
              return await prisma.reaction.update({
                where: {
                  id: reaction.id
                },
                data: {
                  reactionGroup: userCheck ? {
                    disconnect: [{
                      email: ctx.session.user.email
                    }]
                  } : {
                    connect: [{
                      email: ctx.session.user.email
                    }]
                  }
                },
              })
            } else {
              return null;
            }
          }
      }
    },
  })
);