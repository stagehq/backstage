import { GraphQLContext } from './../../pages/api/index';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from './pothos-types.generated';
import RelayPlugin from '@pothos/plugin-relay';
import SchemaBuilder from '@pothos/core';
import prisma from '../db/prisma';
import { Prisma } from '@prisma/client';

export const builder = new SchemaBuilder<{ PrismaTypes: PrismaTypes; Context: GraphQLContext; DefaultFieldNullability: true; Scalars: {JSON: {
  Input: Prisma.JsonValue
  Output: Prisma.JsonValue
},} }>({
  defaultFieldNullability: true,
  plugins: [PrismaPlugin, RelayPlugin],
  relayOptions: {},
  prisma: {
    client: prisma,
  },
});

builder.scalarType("JSON", {
	serialize: (value: any) => JSON.parse(JSON.stringify(value)),
	parseValue: (value: any) => JSON.parse(JSON.stringify(value))
});
builder.queryType({})
builder.mutationType({})