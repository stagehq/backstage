import { PushNotification } from '../../../client/graphql/types.generated';
import { builder } from '../builder';
import prisma from "../../db/prisma";

export const PushNotificationEnumType = builder.enumType('PushNotification', {
  values: ['never', 'same_as_notification', 'always'],
});

builder.prismaNode('Notification', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (notification) => notification.id },
  fields: (t) => ({
    idea: t.exposeBoolean('idea'),
    initiative: t.exposeBoolean('initiative'),
    meeting: t.exposeBoolean('meeting'),
    chat: t.exposeBoolean('chat'),
    push: t.field({
      type: PushNotificationEnumType,
      resolve: (parent) => parent.push
    })
  }),
});

builder.queryField('notification', (t) =>
  t.prismaField({
    type: 'Notification',
    nullable: true,
    resolve: (_, __, ___, ctx) => {
      if (!ctx.session?.user.email) return null;

      return prisma.notification.findUnique({
        where: {
          userMail: ctx.session.user.email
        }
      });
    },
  }),
);

builder.mutationField('updateNotification', (t) =>
  t.prismaField({
    type: "Notification",
    args: {
      idea: t.arg.boolean(),
      initiative: t.arg.boolean(),
      meeting: t.arg.boolean(),
      chat: t.arg.boolean(),
      push: t.arg({ type: PushNotificationEnumType }),
    },
    resolve: async (_, __, { idea, initiative, meeting, chat, push }, ctx) => {
      if (!ctx.session?.user.email) return null;

      const userHasNotifications = await prisma.notification.findUnique({
        where: {
          userMail: ctx.session?.user.email
        },
      });

      if(userHasNotifications){
        // Check for examples https://www.prisma.io/docs/concepts/old/components/prisma-client/null-and-undefined
        return await prisma.notification.update({
          where: {
            userMail: ctx.session?.user.email
          },
          data: {
            idea: idea != null ? idea : undefined, 
            initiative: initiative != null ? initiative : undefined, 
            meeting: meeting != null ? meeting : undefined, 
            chat: chat != null ? chat : undefined,
            push: push as PushNotification,
          }
        })
      } else {
        return await prisma.notification.create({
          data: {
            idea: idea != null ? idea : undefined, 
            initiative: initiative != null ? initiative : undefined, 
            meeting: meeting != null ? meeting : undefined, 
            chat: chat != null ? chat : undefined, 
            push: push as PushNotification,
            user: {
              connect: {
                email: ctx.session?.user.email,
              },
            },
          },
        });
      }
    },
  })
);