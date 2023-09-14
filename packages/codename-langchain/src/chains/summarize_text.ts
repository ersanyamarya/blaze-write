import { logger } from '@ersanyamarya/common-node-utils'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { OpenAI } from 'langchain/llms/openai'
import { PromptTemplate } from 'langchain/prompts'
import { getRetrievalChain } from '../utils'

const summarizeTemplatePrompt = `I want the following document to be summarized with context: {objective}.
The summary should be at least 500 words long.
Don't skip any important details. Keep the names of any people, places, things or companies mentioned in the document.
Importantly, Try to answer the following question in the summary:
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
