import { PaymentPlan } from './../../../client/graphql/types.generated';
import { builder } from '../builder';
import prisma from "../../db/prisma";

export const PaymentPlanEnumType = builder.enumType('PaymentPlan', {
  values: ['starter', 'extended', 'pro'],
});

builder.prismaNode('Payment', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (notification) => notification.id },
  fields: (t) => ({
    firstName: t.exposeString('firstName'),
    lastName: t.exposeString('lastName'),
    email: t.exposeString('email'),
    country: t.exposeString('country'),
    zip: t.exposeInt('zip'),
    annualBillingEnabled: t.exposeBoolean('annualBillingEnabled'),
    plan: t.field({
      type: PaymentPlanEnumType,
      resolve: (parent) => parent.plan
    })
  }),
});

builder.queryField('payment', (t) =>
  t.prismaField({
    type: 'Payment',
    nullable: true,
    resolve: (_, __, ___, ctx) => {
      if (!ctx.session?.user.email) return null;

      return prisma.payment.findUnique({
        where: {
          userMail: ctx.session.user.email
        }
      });
    },
  }),
);

builder.mutationField('updatePayment', (t) =>
  t.prismaField({
    type: "Payment",
    args: {
      firstName: t.arg.string(),
      lastName: t.arg.string(),
      email: t.arg.string(),
      country: t.arg.string(),
      zip: t.arg.int(),
      annualBillingEnabled: t.arg.boolean(),
      plan: t.arg({ type: PaymentPlanEnumType }),
    },
    resolve: async (_, __, { firstName, lastName, email, country, zip, annualBillingEnabled, plan }, ctx) => {
      if (!ctx.session?.user.email) return null;

      const userHasNotifications = await prisma.payment.findUnique({
        where: {
          userMail: ctx.session?.user.email
        },
      });

      if(userHasNotifications){
         // Check for examples https://www.prisma.io/docs/concepts/old/components/prisma-client/null-and-undefined
        return await prisma.payment.update({
          where: {
            userMail: ctx.session?.user.email
          },
          data: {
            firstName: firstName != null ? firstName : undefined, 
            lastName: lastName != null ? lastName : undefined, 
            email: email != null ? email : undefined, 
            country: country != null ? country : undefined, 
            zip: zip != null ? zip : undefined, 
            annualBillingEnabled: annualBillingEnabled != null ? annualBillingEnabled : undefined, 
            plan: plan as PaymentPlan
          }
        })
      } else {
        if(firstName && lastName && email && country && zip && annualBillingEnabled && plan) {
          return await prisma.payment.create({
            data: {
              firstName,
              lastName,
              email,
              country,
              zip,
              annualBillingEnabled,
              plan: plan as PaymentPlan,
              user: {
                connect: {
                  email: ctx.session?.user.email,
                },
              },
            },
          });
        } else {
          return null;
        }
      }
    },
  })
);