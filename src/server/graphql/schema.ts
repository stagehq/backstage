import './User'
import './Site'
import './Extension'
import './Api'
import './StoreExtension'
import './ApiResponse'
import './ApiConnector'
import './ApiConnectorRoute'
import './Preference'
import './OAuth'


import { lexicographicSortSchema, printSchema } from 'graphql'

import { builder } from './builder'
import { writeFileSync } from 'fs'
import { join } from 'path'

// the toSchema() method converts our resolver first code into a SDL // schema
export const schema = builder.toSchema({})

// Only generate in development or when the yarn run generate:schema command is run
// This fixes deployment on Netlify, otherwise you'll run into an EROFS error during building
const shouldGenerateArtifacts =
  process.env.NODE_ENV === "development" || !!process.env.GENERATE;

if (shouldGenerateArtifacts) {
  const schemaAsString = printSchema(lexicographicSortSchema(schema));

  writeFileSync(join(__dirname, "./schema.graphql"), schemaAsString);
}

