import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  MongoID: { input: any; output: any; }
};

export enum EnumResourceType {
  Organic = 'ORGANIC',
  PeopleAlsoAsk = 'PEOPLE_ALSO_ASK',
  RelatedSearches = 'RELATED_SEARCHES'
}

export enum EnumSortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Mutation = {
  __typename?: 'Mutation';
  AdminTopicRemoveAll?: Maybe<Scalars['Boolean']['output']>;
  topicCopyQuestionToOrganic?: Maybe<Topic>;
  topicCreateOne?: Maybe<Topic>;
  topicDeleteOne?: Maybe<Topic>;
  topicDeleteResource?: Maybe<Topic>;
  topicScrapeLinks?: Maybe<Topic>;
  topicStartGoogleSearch?: Maybe<Topic>;
  topicWriteBlogPost?: Maybe<Topic>;
};


export type MutationTopicCopyQuestionToOrganicArgs = {
  id: Scalars['MongoID']['input'];
  indexes: Array<Scalars['Int']['input']>;
};


export type MutationTopicCreateOneArgs = {
  name: Scalars['String']['input'];
};


export type MutationTopicDeleteOneArgs = {
  id: Scalars['MongoID']['input'];
};


export type MutationTopicDeleteResourceArgs = {
  id: Scalars['MongoID']['input'];
  indexes: Array<Scalars['Int']['input']>;
  resourceType?: InputMaybe<EnumResourceType>;
};


export type MutationTopicScrapeLinksArgs = {
  id: Scalars['MongoID']['input'];
  indexes: Array<Scalars['Int']['input']>;
};


export type MutationTopicStartGoogleSearchArgs = {
  alternateTopic?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['MongoID']['input'];
};


export type MutationTopicWriteBlogPostArgs = {
  id: Scalars['MongoID']['input'];
};

export type Query = {
  __typename?: 'Query';
  topicFindAll?: Maybe<Array<Maybe<Topic>>>;
  topicFindById?: Maybe<Topic>;
};


export type QueryTopicFindAllArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<EnumSortOrder>;
};


export type QueryTopicFindByIdArgs = {
  id: Scalars['MongoID']['input'];
};

export type Topic = {
  __typename?: 'Topic';
  _id: Scalars['MongoID']['output'];
  blogPosts?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  name: Scalars['String']['output'];
  organic?: Maybe<Array<Maybe<TopicOrganic>>>;
  organicCount?: Maybe<Scalars['Int']['output']>;
  peopleAlsoAsk?: Maybe<Array<Maybe<TopicPeopleAlsoAsk>>>;
  peopleAlsoAskCount?: Maybe<Scalars['Int']['output']>;
  relatedSearches?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type TopicOrganic = {
  __typename?: 'TopicOrganic';
  date?: Maybe<Scalars['String']['output']>;
  link: Scalars['String']['output'];
  scraped?: Maybe<Scalars['String']['output']>;
  snippet: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type TopicPeopleAlsoAsk = {
  __typename?: 'TopicPeopleAlsoAsk';
  link: Scalars['String']['output'];
  question: Scalars['String']['output'];
  snippet: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type TopicCreateOneMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type TopicCreateOneMutation = { __typename?: 'Mutation', topicCreateOne?: { __typename?: 'Topic', _id: any } | null };

export type TopicDeleteResourceMutationVariables = Exact<{
  topicDeleteResourceId: Scalars['MongoID']['input'];
  indexes: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  resourceType?: InputMaybe<EnumResourceType>;
}>;


export type TopicDeleteResourceMutation = { __typename?: 'Mutation', topicDeleteResource?: { __typename?: 'Topic', _id: any } | null };

export type TopicStartGoogleSearchMutationVariables = Exact<{
  topicStartGoogleSearchId: Scalars['MongoID']['input'];
  alternateTopic?: InputMaybe<Scalars['String']['input']>;
}>;


export type TopicStartGoogleSearchMutation = { __typename?: 'Mutation', topicStartGoogleSearch?: { __typename?: 'Topic', _id: any } | null };

export type TopicDeleteOneMutationVariables = Exact<{
  topicDeleteOneId: Scalars['MongoID']['input'];
}>;


export type TopicDeleteOneMutation = { __typename?: 'Mutation', topicDeleteOne?: { __typename?: 'Topic', _id: any } | null };

export type TopicScrapeLinksMutationVariables = Exact<{
  topicScrapeLinksId: Scalars['MongoID']['input'];
  indexes: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type TopicScrapeLinksMutation = { __typename?: 'Mutation', topicScrapeLinks?: { __typename?: 'Topic', _id: any } | null };

export type TopicCopyQuestionToOrganicMutationVariables = Exact<{
  topicCopyQuestionToOrganicId: Scalars['MongoID']['input'];
  indexes: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type TopicCopyQuestionToOrganicMutation = { __typename?: 'Mutation', topicCopyQuestionToOrganic?: { __typename?: 'Topic', _id: any } | null };

export type TopicWriteBlogPostMutationVariables = Exact<{
  topicWriteBlogPostId: Scalars['MongoID']['input'];
}>;


export type TopicWriteBlogPostMutation = { __typename?: 'Mutation', topicWriteBlogPost?: { __typename?: 'Topic', _id: any } | null };

export type TopicFindAllQueryVariables = Exact<{
  sort?: InputMaybe<EnumSortOrder>;
}>;


export type TopicFindAllQuery = { __typename?: 'Query', topicFindAll?: Array<{ __typename?: 'Topic', name: string, _id: any, createdAt?: any | null, organicCount?: number | null, peopleAlsoAskCount?: number | null } | null> | null };

export type TopicFindByIdQueryVariables = Exact<{
  topicFindByIdId: Scalars['MongoID']['input'];
}>;


export type TopicFindByIdQuery = { __typename?: 'Query', topicFindById?: { __typename?: 'Topic', name: string, relatedSearches?: Array<string | null> | null, blogPosts?: Array<string | null> | null, _id: any, createdAt?: any | null, updatedAt?: any | null, organicCount?: number | null, peopleAlsoAskCount?: number | null, organic?: Array<{ __typename?: 'TopicOrganic', title: string, link: string, snippet: string, date?: string | null, scraped?: string | null } | null> | null, peopleAlsoAsk?: Array<{ __typename?: 'TopicPeopleAlsoAsk', question: string, snippet: string, title: string, link: string } | null> | null } | null };


export const TopicCreateOneDocument = gql`
    mutation TopicCreateOne($name: String!) {
  topicCreateOne(name: $name) {
    _id
  }
}
    `;
export type TopicCreateOneMutationFn = Apollo.MutationFunction<TopicCreateOneMutation, TopicCreateOneMutationVariables>;

/**
 * __useTopicCreateOneMutation__
 *
 * To run a mutation, you first call `useTopicCreateOneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTopicCreateOneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [topicCreateOneMutation, { data, loading, error }] = useTopicCreateOneMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useTopicCreateOneMutation(baseOptions?: Apollo.MutationHookOptions<TopicCreateOneMutation, TopicCreateOneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TopicCreateOneMutation, TopicCreateOneMutationVariables>(TopicCreateOneDocument, options);
      }
export type TopicCreateOneMutationHookResult = ReturnType<typeof useTopicCreateOneMutation>;
export type TopicCreateOneMutationResult = Apollo.MutationResult<TopicCreateOneMutation>;
export type TopicCreateOneMutationOptions = Apollo.BaseMutationOptions<TopicCreateOneMutation, TopicCreateOneMutationVariables>;
export const TopicDeleteResourceDocument = gql`
    mutation TopicDeleteResource($topicDeleteResourceId: MongoID!, $indexes: [Int!]!, $resourceType: EnumResourceType) {
  topicDeleteResource(
    id: $topicDeleteResourceId
    indexes: $indexes
    resourceType: $resourceType
  ) {
    _id
  }
}
    `;
export type TopicDeleteResourceMutationFn = Apollo.MutationFunction<TopicDeleteResourceMutation, TopicDeleteResourceMutationVariables>;

/**
 * __useTopicDeleteResourceMutation__
 *
 * To run a mutation, you first call `useTopicDeleteResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTopicDeleteResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [topicDeleteResourceMutation, { data, loading, error }] = useTopicDeleteResourceMutation({
 *   variables: {
 *      topicDeleteResourceId: // value for 'topicDeleteResourceId'
 *      indexes: // value for 'indexes'
 *      resourceType: // value for 'resourceType'
 *   },
 * });
 */
export function useTopicDeleteResourceMutation(baseOptions?: Apollo.MutationHookOptions<TopicDeleteResourceMutation, TopicDeleteResourceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TopicDeleteResourceMutation, TopicDeleteResourceMutationVariables>(TopicDeleteResourceDocument, options);
      }
export type TopicDeleteResourceMutationHookResult = ReturnType<typeof useTopicDeleteResourceMutation>;
export type TopicDeleteResourceMutationResult = Apollo.MutationResult<TopicDeleteResourceMutation>;
export type TopicDeleteResourceMutationOptions = Apollo.BaseMutationOptions<TopicDeleteResourceMutation, TopicDeleteResourceMutationVariables>;
export const TopicStartGoogleSearchDocument = gql`
    mutation TopicStartGoogleSearch($topicStartGoogleSearchId: MongoID!, $alternateTopic: String) {
  topicStartGoogleSearch(
    id: $topicStartGoogleSearchId
    alternateTopic: $alternateTopic
  ) {
    _id
  }
}
    `;
export type TopicStartGoogleSearchMutationFn = Apollo.MutationFunction<TopicStartGoogleSearchMutation, TopicStartGoogleSearchMutationVariables>;

/**
 * __useTopicStartGoogleSearchMutation__
 *
 * To run a mutation, you first call `useTopicStartGoogleSearchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTopicStartGoogleSearchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [topicStartGoogleSearchMutation, { data, loading, error }] = useTopicStartGoogleSearchMutation({
 *   variables: {
 *      topicStartGoogleSearchId: // value for 'topicStartGoogleSearchId'
 *      alternateTopic: // value for 'alternateTopic'
 *   },
 * });
 */
export function useTopicStartGoogleSearchMutation(baseOptions?: Apollo.MutationHookOptions<TopicStartGoogleSearchMutation, TopicStartGoogleSearchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TopicStartGoogleSearchMutation, TopicStartGoogleSearchMutationVariables>(TopicStartGoogleSearchDocument, options);
      }
export type TopicStartGoogleSearchMutationHookResult = ReturnType<typeof useTopicStartGoogleSearchMutation>;
export type TopicStartGoogleSearchMutationResult = Apollo.MutationResult<TopicStartGoogleSearchMutation>;
export type TopicStartGoogleSearchMutationOptions = Apollo.BaseMutationOptions<TopicStartGoogleSearchMutation, TopicStartGoogleSearchMutationVariables>;
export const TopicDeleteOneDocument = gql`
    mutation TopicDeleteOne($topicDeleteOneId: MongoID!) {
  topicDeleteOne(id: $topicDeleteOneId) {
    _id
  }
}
    `;
export type TopicDeleteOneMutationFn = Apollo.MutationFunction<TopicDeleteOneMutation, TopicDeleteOneMutationVariables>;

/**
 * __useTopicDeleteOneMutation__
 *
 * To run a mutation, you first call `useTopicDeleteOneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTopicDeleteOneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [topicDeleteOneMutation, { data, loading, error }] = useTopicDeleteOneMutation({
 *   variables: {
 *      topicDeleteOneId: // value for 'topicDeleteOneId'
 *   },
 * });
 */
export function useTopicDeleteOneMutation(baseOptions?: Apollo.MutationHookOptions<TopicDeleteOneMutation, TopicDeleteOneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TopicDeleteOneMutation, TopicDeleteOneMutationVariables>(TopicDeleteOneDocument, options);
      }
export type TopicDeleteOneMutationHookResult = ReturnType<typeof useTopicDeleteOneMutation>;
export type TopicDeleteOneMutationResult = Apollo.MutationResult<TopicDeleteOneMutation>;
export type TopicDeleteOneMutationOptions = Apollo.BaseMutationOptions<TopicDeleteOneMutation, TopicDeleteOneMutationVariables>;
export const TopicScrapeLinksDocument = gql`
    mutation TopicScrapeLinks($topicScrapeLinksId: MongoID!, $indexes: [Int!]!) {
  topicScrapeLinks(id: $topicScrapeLinksId, indexes: $indexes) {
    _id
  }
}
    `;
export type TopicScrapeLinksMutationFn = Apollo.MutationFunction<TopicScrapeLinksMutation, TopicScrapeLinksMutationVariables>;

/**
 * __useTopicScrapeLinksMutation__
 *
 * To run a mutation, you first call `useTopicScrapeLinksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTopicScrapeLinksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [topicScrapeLinksMutation, { data, loading, error }] = useTopicScrapeLinksMutation({
 *   variables: {
 *      topicScrapeLinksId: // value for 'topicScrapeLinksId'
 *      indexes: // value for 'indexes'
 *   },
 * });
 */
export function useTopicScrapeLinksMutation(baseOptions?: Apollo.MutationHookOptions<TopicScrapeLinksMutation, TopicScrapeLinksMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TopicScrapeLinksMutation, TopicScrapeLinksMutationVariables>(TopicScrapeLinksDocument, options);
      }
export type TopicScrapeLinksMutationHookResult = ReturnType<typeof useTopicScrapeLinksMutation>;
export type TopicScrapeLinksMutationResult = Apollo.MutationResult<TopicScrapeLinksMutation>;
export type TopicScrapeLinksMutationOptions = Apollo.BaseMutationOptions<TopicScrapeLinksMutation, TopicScrapeLinksMutationVariables>;
export const TopicCopyQuestionToOrganicDocument = gql`
    mutation TopicCopyQuestionToOrganic($topicCopyQuestionToOrganicId: MongoID!, $indexes: [Int!]!) {
  topicCopyQuestionToOrganic(id: $topicCopyQuestionToOrganicId, indexes: $indexes) {
    _id
  }
}
    `;
export type TopicCopyQuestionToOrganicMutationFn = Apollo.MutationFunction<TopicCopyQuestionToOrganicMutation, TopicCopyQuestionToOrganicMutationVariables>;

/**
 * __useTopicCopyQuestionToOrganicMutation__
 *
 * To run a mutation, you first call `useTopicCopyQuestionToOrganicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTopicCopyQuestionToOrganicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [topicCopyQuestionToOrganicMutation, { data, loading, error }] = useTopicCopyQuestionToOrganicMutation({
 *   variables: {
 *      topicCopyQuestionToOrganicId: // value for 'topicCopyQuestionToOrganicId'
 *      indexes: // value for 'indexes'
 *   },
 * });
 */
export function useTopicCopyQuestionToOrganicMutation(baseOptions?: Apollo.MutationHookOptions<TopicCopyQuestionToOrganicMutation, TopicCopyQuestionToOrganicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TopicCopyQuestionToOrganicMutation, TopicCopyQuestionToOrganicMutationVariables>(TopicCopyQuestionToOrganicDocument, options);
      }
export type TopicCopyQuestionToOrganicMutationHookResult = ReturnType<typeof useTopicCopyQuestionToOrganicMutation>;
export type TopicCopyQuestionToOrganicMutationResult = Apollo.MutationResult<TopicCopyQuestionToOrganicMutation>;
export type TopicCopyQuestionToOrganicMutationOptions = Apollo.BaseMutationOptions<TopicCopyQuestionToOrganicMutation, TopicCopyQuestionToOrganicMutationVariables>;
export const TopicWriteBlogPostDocument = gql`
    mutation TopicWriteBlogPost($topicWriteBlogPostId: MongoID!) {
  topicWriteBlogPost(id: $topicWriteBlogPostId) {
    _id
  }
}
    `;
export type TopicWriteBlogPostMutationFn = Apollo.MutationFunction<TopicWriteBlogPostMutation, TopicWriteBlogPostMutationVariables>;

/**
 * __useTopicWriteBlogPostMutation__
 *
 * To run a mutation, you first call `useTopicWriteBlogPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTopicWriteBlogPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [topicWriteBlogPostMutation, { data, loading, error }] = useTopicWriteBlogPostMutation({
 *   variables: {
 *      topicWriteBlogPostId: // value for 'topicWriteBlogPostId'
 *   },
 * });
 */
export function useTopicWriteBlogPostMutation(baseOptions?: Apollo.MutationHookOptions<TopicWriteBlogPostMutation, TopicWriteBlogPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TopicWriteBlogPostMutation, TopicWriteBlogPostMutationVariables>(TopicWriteBlogPostDocument, options);
      }
export type TopicWriteBlogPostMutationHookResult = ReturnType<typeof useTopicWriteBlogPostMutation>;
export type TopicWriteBlogPostMutationResult = Apollo.MutationResult<TopicWriteBlogPostMutation>;
export type TopicWriteBlogPostMutationOptions = Apollo.BaseMutationOptions<TopicWriteBlogPostMutation, TopicWriteBlogPostMutationVariables>;
export const TopicFindAllDocument = gql`
    query TopicFindAll($sort: EnumSortOrder) {
  topicFindAll(sort: $sort) {
    name
    _id
    createdAt
    organicCount
    peopleAlsoAskCount
  }
}
    `;

/**
 * __useTopicFindAllQuery__
 *
 * To run a query within a React component, call `useTopicFindAllQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopicFindAllQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopicFindAllQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useTopicFindAllQuery(baseOptions?: Apollo.QueryHookOptions<TopicFindAllQuery, TopicFindAllQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TopicFindAllQuery, TopicFindAllQueryVariables>(TopicFindAllDocument, options);
      }
export function useTopicFindAllLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TopicFindAllQuery, TopicFindAllQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TopicFindAllQuery, TopicFindAllQueryVariables>(TopicFindAllDocument, options);
        }
export type TopicFindAllQueryHookResult = ReturnType<typeof useTopicFindAllQuery>;
export type TopicFindAllLazyQueryHookResult = ReturnType<typeof useTopicFindAllLazyQuery>;
export type TopicFindAllQueryResult = Apollo.QueryResult<TopicFindAllQuery, TopicFindAllQueryVariables>;
export const TopicFindByIdDocument = gql`
    query TopicFindById($topicFindByIdId: MongoID!) {
  topicFindById(id: $topicFindByIdId) {
    name
    organic {
      title
      link
      snippet
      date
      scraped
    }
    peopleAlsoAsk {
      question
      snippet
      title
      link
    }
    relatedSearches
    blogPosts
    _id
    createdAt
    updatedAt
    organicCount
    peopleAlsoAskCount
  }
}
    `;

/**
 * __useTopicFindByIdQuery__
 *
 * To run a query within a React component, call `useTopicFindByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopicFindByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopicFindByIdQuery({
 *   variables: {
 *      topicFindByIdId: // value for 'topicFindByIdId'
 *   },
 * });
 */
export function useTopicFindByIdQuery(baseOptions: Apollo.QueryHookOptions<TopicFindByIdQuery, TopicFindByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TopicFindByIdQuery, TopicFindByIdQueryVariables>(TopicFindByIdDocument, options);
      }
export function useTopicFindByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TopicFindByIdQuery, TopicFindByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TopicFindByIdQuery, TopicFindByIdQueryVariables>(TopicFindByIdDocument, options);
        }
export type TopicFindByIdQueryHookResult = ReturnType<typeof useTopicFindByIdQuery>;
export type TopicFindByIdLazyQueryHookResult = ReturnType<typeof useTopicFindByIdLazyQuery>;
export type TopicFindByIdQueryResult = Apollo.QueryResult<TopicFindByIdQuery, TopicFindByIdQueryVariables>;