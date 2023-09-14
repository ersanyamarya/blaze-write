import { env } from '../utils'

export const serverConfig = {
  port: Number.parseInt(env('NX_API_PORT') || '3000'),
  host: env('NX_API_HOST'),
  graphqlURL: env('NX_API_HOST') + '/graphql',
  debugStackTrace: true,
  logLevel: process.env['NX_API_LOG_LEVEL'] || 'debug',
}
