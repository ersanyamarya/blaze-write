import { serperAIConfig } from '@blaze-write/config'
import { Topic, TopicModel } from '@blaze-write/mongo-db'
import { GQLErrorHandler } from '@ersanyamarya/apollo-graphql-helper'
import { scrapeDataFromUrl, searchOnGoogle } from '@ersanyamarya/codename-langchain'
import { schemaComposer } from 'graphql-compose'
import { composeMongoose } from 'graphql-compose-mongoose'
const TopicTC = composeMongoose(TopicModel, {})

TopicTC.addFields({
  organicCount: {
    type: 'Int',
    resolve: async ({ organic }) => organic.length,
  },
  peopleAlsoAskCount: {
    type: 'Int',
    resolve: async ({ peopleAlsoAsk }) => peopleAlsoAsk.length,
  },
})

TopicTC.addResolver({
  kind: 'query',
  name: 'topicFindAll',
  type: [TopicTC],
  args: {
    limit: 'Int',
    skip: 'Int',
    sort: 'EnumSortOrder',
  },
  resolve: async ({ args }) => {
    const { limit, skip, sort } = args
    const topics = await TopicModel.find().limit(limit).skip(skip).sort({ createdAt: sort })
    return topics
  },
})

TopicTC.addResolver({
  kind: 'query',
  name: 'topicFindById',
  type: TopicTC,
  args: {
    id: 'MongoID!',
  },
  resolve: async ({ args }) => {
    const { id } = args
    const topic = await TopicModel.findById(id)
    if (!topic) GQLErrorHandler('Topic not found', 'NOT_FOUND', { location: 'topicFindById' })
    return topic
  },
})

TopicTC.addResolver({
  kind: 'mutation',
  name: 'topicCreateOne',
  type: TopicTC,
  args: {
    name: 'String!',
  },
  resolve: async ({ args }) => {
    const { name } = args
    try {
      const topic = await TopicModel.create({ name })
      return topic
    } catch (error) {
      GQLErrorHandler(error.message, 'UNKNOWN', { location: 'topicCreateOne' })
    }
  },
})

TopicTC.addResolver({
  kind: 'mutation',
  name: 'topicStartGoogleSearch',
  type: TopicTC,
  args: {
    id: 'MongoID!',
    alternateTopic: 'String',
  },
  resolve: async ({ args }) => {
    const { id, alternateTopic } = args
    const topic = await TopicModel.findById(id)
    if (!topic) GQLErrorHandler('Topic not found', 'NOT_FOUND', { location: 'topicStartGoogleSearch' })
    const searchKey = alternateTopic || topic.name

    const searchResult1 = await searchOnGoogle(searchKey, {
      apiKey: serperAIConfig.apiKey,
      gl: 'us',
    })

    const searchResult2 = await searchOnGoogle(searchKey, {
      apiKey: serperAIConfig.apiKey,
      gl: 'us',
      youtube: true,
    })

    // combine the results and handle the case when one of the results is undefined
    const searchResult = {
      organic: [...(searchResult1?.organic || []), ...(searchResult2?.organic || [])],
      peopleAlsoAsk: [...(searchResult1?.peopleAlsoAsk || []), ...(searchResult2?.peopleAlsoAsk || [])],
      relatedSearches: [...(searchResult1?.relatedSearches || []), ...(searchResult2?.relatedSearches || [])],
    }

    if (!searchResult || !searchResult.organic)
      GQLErrorHandler('Search result not found', 'NOT_FOUND', { location: 'topicStartGoogleSearch' })
    // Update database with search result and ensure that the search result is not already present in the database
    const { organic, peopleAlsoAsk, relatedSearches } = searchResult
    const organicLinks = topic.organic.map(item => item.link)
    const peopleAlsoAskLinks = topic.peopleAlsoAsk.map(item => item.link)
    const relatedSearchesLinks = topic.relatedSearches

    const newOrganic = organic.filter(item => !organicLinks.includes(item.link))
    const newPeopleAlsoAsk = peopleAlsoAsk.filter(item => !peopleAlsoAskLinks.includes(item.link))
    const newRelatedSearches = relatedSearches.reduce((acc, item) => {
      if (!relatedSearchesLinks.includes(item.query)) acc.push(item.query)
      return acc
    }, [])

    topic.organic = [...topic.organic, ...newOrganic]
    topic.peopleAlsoAsk = [...topic.peopleAlsoAsk, ...newPeopleAlsoAsk]
    topic.relatedSearches = [...topic.relatedSearches, ...newRelatedSearches]
    await topic.save()
    return topic
  },
})

TopicTC.addResolver({
  kind: 'mutation',
  name: 'topicDeleteOne',
  type: TopicTC,
  args: {
    id: 'MongoID!',
  },
  resolve: async ({ args }) => {
    const { id } = args
    const topic = await TopicModel.findByIdAndDelete(id)
    if (!topic) GQLErrorHandler('Topic not found', 'NOT_FOUND', { location: 'topicDeleteOne' })
    return topic
  },
})

const EnumResourceType = schemaComposer.createEnumTC({
  name: 'EnumResourceType',
  values: {
    ORGANIC: { value: 'organic' },
    PEOPLE_ALSO_ASK: { value: 'peopleAlsoAsk' },
    RELATED_SEARCHES: { value: 'relatedSearches' },
  },
})

TopicTC.addResolver({
  kind: 'mutation',
  name: 'topicDeleteResource',
  type: TopicTC,
  args: {
    id: 'MongoID!',
    indexes: '[Int!]!',
    resourceType: {
      type: EnumResourceType,
      defaultValue: 'organic',
    },
  },
  resolve: async ({ args }) => {
    const { id, indexes, resourceType } = args
    const topic = await TopicModel.findById(id)
    if (!topic) GQLErrorHandler('Topic not found', 'NOT_FOUND', { location: 'topicDeleteOrganic' })
    if (resourceType === 'organic') topic.deleteOrganic(indexes)
    else if (resourceType === 'peopleAlsoAsk') topic.deletePeopleAlsoAsk(indexes)
    else if (resourceType === 'relatedSearches') topic.deleteRelatedSearches(indexes)

    await topic.save()
    return topic
  },
})

TopicTC.addResolver({
  kind: 'mutation',
  name: 'topicScrapeLinks',
  type: TopicTC,
  args: {
    id: 'MongoID!',
    indexes: '[Int!]!',
  },
  resolve: async ({ args }) => {
    const { id, indexes } = args
    const topic = await TopicModel.findById(id)
    if (!topic) GQLErrorHandler('Topic not found', 'NOT_FOUND', { location: 'topicScrapeLinks' })
    const organic = topic.organic.filter((_, index) => indexes.includes(index))

    const scrapedData = await Promise.all(
      organic.map(async o => {
        if (o.scraped) return o.scraped
        else return await scrapeDataFromUrl(o.link)
      })
    )

    const organicWithScrapedData = organic.map((item, index) => {
      item.scraped = scrapedData[index]
      return item
    })
    topic.organic = topic.organic.map((item, index) => {
      if (indexes.includes(index)) return organicWithScrapedData.find(o => o.link === item.link)
      return item
    })
    await topic.save()
    return topic
  },
})

TopicTC.addResolver({
  kind: 'mutation',
  name: 'topicCopyQuestionToOrganic',
  type: TopicTC,
  args: {
    id: 'MongoID!',
    indexes: '[Int!]!',
  },
  resolve: async ({ args }) => {
    const { id, indexes } = args
    const topic = await TopicModel.findById(id)
    if (!topic) GQLErrorHandler('Topic not found', 'NOT_FOUND', { location: 'topicCopyQuestionToOrganic' })
    const newOrganic: Topic['organic'] = topic.peopleAlsoAsk
      .filter((_, index) => indexes.includes(index))
      .map(item => ({
        title: item.title,
        link: item.link,
        scraped: '',
        snippet: item.snippet,
      }))

    topic.organic = [...topic.organic, ...newOrganic]
    await topic.save()
    return topic
  },
})

const queries = {
  topicFindAll: TopicTC.getResolver('topicFindAll'),
  topicFindById: TopicTC.getResolver('topicFindById'),
}
const mutations = {
  topicCreateOne: TopicTC.getResolver('topicCreateOne'),
  topicDeleteOne: TopicTC.getResolver('topicDeleteOne'),
  topicDeleteResource: TopicTC.getResolver('topicDeleteResource'),
  topicStartGoogleSearch: TopicTC.getResolver('topicStartGoogleSearch'),
  topicScrapeLinks: TopicTC.getResolver('topicScrapeLinks'),
  topicCopyQuestionToOrganic: TopicTC.getResolver('topicCopyQuestionToOrganic'),
}

export default {
  ResourceTC: TopicTC,
  queries,
  mutations,
  ResourceModel: TopicModel,
  name: 'Topic',
}
