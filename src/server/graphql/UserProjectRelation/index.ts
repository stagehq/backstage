import { builder } from '../builder';
import prisma from "../../db/prisma";
import { ProjectRole } from '../../../client/graphql/types.generated';

export const ProjectRoleEnumType = builder.enumType('ProjectRole', {
  values: ['contributor', 'owner', 'core'],
});

builder.prismaNode('UserProjectRelation', {
  findUnique: (id) => ({id: id}),
  id: { resolve: (projectContributor) => projectContributor.userMail },
  fields: (t) => ({
    userMail: t.exposeString('userMail'),
    projectId: t.exposeString('projectId'),
    user: t.relation('user'),
    project: t.relation('project'),
    role: t.field({
      type: ProjectRoleEnumType,
      resolve: (parent) => parent.role
    }),
  }),
});

builder.mutationField('updateUserProjectRelationRole', (t) =>
  t.prismaField({
    type: "UserProjectRelation",
    args: {
      slug: t.arg.string({ required: true }),
      userMail: t.arg.string({ required: true }),
      role: t.arg({
        type: ProjectRoleEnumType,
        required: true
      }),
    },
    resolve: async (query, root, {slug, role, userMail}, ctx) => {
      if (!ctx.session?.user.email || !slug || !role || !userMail) return;
      
      const focusedUserProjectRelation = await prisma.userProjectRelation.findFirst({
        where: { 
          project: {
            slug: slug
          },
          userMail: userMail
        }
      });

      const myUserProjectRelation = await prisma.userProjectRelation.findFirst({
        where: { 
          project: {
            slug: slug
          },
          userMail: ctx.session.user.email
        }
      });

      //check if user has access to project and if focusedUser is in project
      if(!focusedUserProjectRelation || !myUserProjectRelation) throw new Error('The user cant be found in the project.');;

      //check if user has enough rights to make changes
      if(myUserProjectRelation.role === ProjectRole.Contributor) throw new Error('You are not allowed to change this type.');;
      
      return await prisma.userProjectRelation.update({
        where: {
          id: focusedUserProjectRelation.id,
        },
        data: { 
          role: role as ProjectRole
        }
      });
    },
  })
);
