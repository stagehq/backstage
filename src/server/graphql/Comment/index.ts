import { builder } from '../builder';
import prisma from "../../db/prisma";
import { ParentEnumType } from '../Reaction';

builder.prismaNode('Comment', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (comment) => comment.id },
  fields: (t) => ({
    createdAt: t.string({ resolve: comment => comment.createdAt.toString()}),
    idea: t.relation('idea'),
    creator: t.relation('creator'),
    reactions: t.relation('reactions'),
    content: t.exposeString('content'),
    threadComment: t.relation('threadComment'),
    parentType: t.field({
      type: ParentEnumType,
      resolve: (parent) => parent.parentType
    }),
  }),
});

