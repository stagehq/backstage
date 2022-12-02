import { GraphQLContext } from './../../pages/api/index';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from './pothos-types.generated';
import RelayPlugin from '@pothos/plugin-relay';
import SchemaBuilder from '@pothos/core';
import prisma from '../db/prisma';

export const builder = new SchemaBuilder<{ PrismaTypes: PrismaTypes; Context: GraphQLContext; DefaultFieldNullability: true }>({
  defaultFieldNullability: true,
  plugins: [PrismaPlugin, RelayPlugin],
  relayOptions: {},
  prisma: {
    client: prisma,
  },
});

builder.queryType({})
builder.mutationType({})