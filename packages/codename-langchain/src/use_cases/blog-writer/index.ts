import { RetrievalQAChain, loadQAStuffChain } from 'langchain/chains'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { HNSWLib } from 'langchain/vectorstores/hnswlib'
import { chainBlogWriterPromptTemplate } from './template'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { logger } from '@ersanyamarya/common-node-utils'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'

interface WriteBlogPostInput {
  subject: string
  context: string
  peopleAlsoAsk: string[]
  chatModel: ChatOpenAI
  embeddings: OpenAIEmbeddings
}

export async function writeBlogPost({ subject, context, peopleAlsoAsk, chatModel, embeddings }: WriteBlogPostInput) {
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 500, chunkOverlap: 20 })
  const docs = await textSplitter.createDocuments([context])
  const vectorStore = await HNSWLib.fromDocuments(docs, embeddings)

  const chain = new RetrievalQAChain({
    combineDocumentsChain: loadQAStuffChain(chatModel, { prompt: chainBlogWriterPromptTemplate }),
    retriever: vectorStore.asRetriever(),
  })
  const res = await chain.call(
    {
      query: subject,
      peopleAlsoAsk: peopleAlsoAsk.join('\n'),
    },
    {
      callbacks: [
        {
          handleChainStart: () => {
            logger.info('----------------- Blog Writer: Starting ----------------- ')
          },
          handleChainEnd: () => {
            logger.info('----------------- Blog Writer: Complete ----------------- ')
          },
          handleChainError: e => {
            logger.error(e)
          },
        },
      ],
    }
  )

  return res.text
}
