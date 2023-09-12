import { mongoDbConfig, serverConfig } from '@blaze-write/config'
import { logger } from '@ersanyamarya/common-node-utils'
import { exceptions } from '@ersanyamarya/essential-server-utils'
import { connectMongoDB } from '@blaze-write/mongo-db'

const start = async (): Promise<void> => {
  exceptions()

  const mongoDB = connectMongoDB(mongoDbConfig.uri, mongoDbConfig.options)

  console.log({
    serverConfig,
    health: mongoDB.healthCheck(),
  })
}

start()
