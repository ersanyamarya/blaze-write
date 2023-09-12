import { env } from '../utils'

export const serverConfig = {
  port: Number.parseInt(env('NX_API_PORT')),
  host: env('NX_API_HOST'),
  debugStackTrace: true,
  logLevel: process.env['NX_API_LOG_LEVEL'] || 'debug',
}
