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
    api: t.relation('api')
  }),
});

builder.mutationField('upsertApiResponse', (t) => 
  t.prismaField({
    type: "ApiResponse",
    args: {
      apiConnectorRouteId: t.arg.string(),
      response: t.arg({ type: 'JSON' }),
      apiId: t.arg.string(), 
    },
    resolve: async (query, root, args, ctx) => {
      if (!ctx.session.user.email || args.apiConnectorRouteId == null || args.response == null || args.apiId == null) return null;

      const OldApiResponse = await prisma.apiResponse.findFirst({
        where: {
          apiConnectorRoute: {
            id: args.apiConnectorRouteId
          },
          api: {
            id: args.apiId
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
            api: {
              connect: {
                id: args.apiId
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
   