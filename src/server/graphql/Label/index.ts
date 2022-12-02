import { builder } from '../builder';
import prisma from "../../db/prisma";

builder.prismaNode('Label', {
  findUnique: (id) => ({id: id}),
  id: { resolve: (label) => label.id },
  fields: (t) => ({
    name: t.exposeString('name'),
    description: t.exposeString('description'),
    color: t.exposeString('color'),
    ideas: t.relation('ideas'),
    project: t.relation('project')
  }),
});

// createLabel mutation
builder.mutationField('createLabel', (t) => 
  t.prismaField({
    type: 'Label',
    args: {
      name: t.arg.string({ required: true }),
      description: t.arg.string({ required: true }),
      color: t.arg.string({ required: true }),
      projectId: t.arg.string({ required: true }),
    },
    resolve: async (_, __, args, ctx) => {
      if ( !args.projectId) return null;
      // check if label with same name already exists before creating new
      const labelExists = await prisma.label.findFirst({
        where: {
          name: args.name,
          projectId: args.projectId
        }
      });
      if (labelExists) return null;
      return await prisma.label.create({
        data: {
          name: args.name,
          color: args.color,
          description: args.description,
          project: {
            connect: {
              id: args.projectId
            }
          }
        }
      });
    },
  }
));

// updateLabel mutation to update name, description and color
builder.mutationField('updateLabel', (t) => 
  t.prismaField({
    type: 'Label',
    args: {
      projectId: t.arg.string({ required: true }),
      nameOld: t.arg.string({ required: true }),
      nameNew: t.arg.string({ required: true }),
      description: t.arg.string({ required: true }),
      color: t.arg.string({ required: true }),
    },
    resolve: async (_, __, args, ctx) => {
      // check if label with same name already exists before updating
      const label = await prisma.label.findFirst({
        where: {
          name: args.nameOld,
          projectId: args.projectId
        }
      });
      if(!label) return null;
      return await prisma.label.update({
        where: {
          id: label?.id,
        },
        data: {
          name: args.nameNew,
          description: args.description,
          color: args.color
        }
      });
    },
  }
));

// updateLabel mutation to add ideas to label

// deleteLabel mutation
builder.mutationField('deleteLabel', (t) => 
  t.prismaField({
    type: 'Label',
    args: {
      name: t.arg.string({ required: true }),
      projectId: t.arg.string({ required: true }),
    },
    resolve: async (_, __, args, ctx) => {
      if ( !args.projectId) return null;
      const label = await prisma.label.findFirst({
        where: {
          name: args.name,
          projectId: args.projectId
        }
      });
      if(!label) return null;
      await prisma.label.delete({
        where: {
          id: label?.id,
        }
      })
    },
  }
));
