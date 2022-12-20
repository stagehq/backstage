import { builder } from '../builder';
import prisma from "../../db/prisma";

builder.prismaNode('ApiResponse', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (apiResponse) => apiResponse.id },
  fields: (t) => ({
    createdAt: t.string({ resolve: apiResponse => apiResponse.createdAt.toString()}),
    modifiedAt: t.string({ resolve: apiResponse => apiResponse.modifiedAt.toString()}),
    
    response: t.field({ type: 'JSON', resolve: apiResponse => apiResponse.response}),
    apiConnectorRoute: t.relation('apiConnectorRoute'),
    extension: t.relation('extension')
  }),
});

builder.mutationField('upsertApiResponse', (t) => 
  t.prismaField({
    type: "ApiResponse",
    args: {
      apiConnectorRouteId: t.arg.string(),
      response: t.arg.string(),
      extensionId: t.arg.string(), 
    },
    resolve: async (query, root, args, ctx) => {
      if (!ctx.session.user.email || args.apiConnectorRouteId == null || args.response == null || args.extensionId == null) return null;

      const OldApiResponse = await prisma.apiResponse.findFirst({
        where: {
          apiConnectorRoute: {
            id: args.apiConnectorRouteId
          },
          extension: {
            id: args.extensionId
          }
        },
      })

      if(OldApiResponse){
        const NewApiResponse = await prisma.apiResponse.update({
          where: {
            id: OldApiResponse.id
          },
          data: {
            response: args.response
          }
        })
        return NewApiResponse;
      } else {
        const NewApiResponse = await prisma.apiResponse.create({
          data: {
            apiConnectorRoute: {
              connect: {
                id: args.apiConnectorRouteId
              }
            },
            extension: {
              connect: {
                id: args.extensionId
              }
            },
            response: args.response
          }
        })
        return NewApiResponse;
      }
    }
  })
);
   