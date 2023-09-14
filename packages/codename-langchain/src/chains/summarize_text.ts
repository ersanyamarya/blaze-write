import { logger } from '@ersanyamarya/common-node-utils'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { OpenAI } from 'langchain/llms/openai'
import { getRetrievalChain } from '../utils'
import { PromptTemplate } from 'langchain/prompts'

const summarizeTemplatePrompt = `I want the following document to be summarized with context: {objective}.
The summary should be at least 200 words long.
Additionally, I want to find the following information in the document:
{question}
`
const promptTemplate = new PromptTemplate({
  template: summarizeTemplatePrompt,
  inputVariables: ['objective', 'question'],
})

export interface SummarizeInputType {
  objective: string
  question: string
  model: OpenAI
  embeddings: OpenAIEmbeddings
}

export async function getSummaryFromTextAndObjective(
  text: string,
  { objective, question, model, embeddings }: SummarizeInputType
): Promise<string> {
  logger.info('----------------- Summarize: Starting ----------------- ')
  const chain = await getRetrievalChain(model, text, embeddings)
  const query = await promptTemplate.format({ objective, question })

  const res = await chain.call({
    query,
  })
  logger.info('----------------- Summarize: Done ----------------- ')
  return res.text
}
