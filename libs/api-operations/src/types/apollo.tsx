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
  topicCreateOne?: Maybe<Topic>;
  topicDeleteOne?: Maybe<Topic>;
  topicDeleteResource?: Maybe<Topic>;
  topicStartGoogleSearch?: Maybe<Topic>;
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


export type MutationTopicStartGoogleSearchArgs = {
  alternateTopic?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['MongoID']['input'];
};

export type Query = {
  __typename?: 'Query';
  topicFindAll?: Maybe<Array<Maybe<Topic>>>;
};


export type QueryTopicFindAllArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<EnumSortOrder>;
};

export type Topic = {
  __typename?: 'Topic';
  _id: Scalars['MongoID']['output'];
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

export type TopicFindAllQueryVariables = Exact<{
  sort?: InputMaybe<EnumSortOrder>;
}>;


export type TopicFindAllQuery = { __typename?: 'Query', topicFindAll?: Array<{ __typename?: 'Topic', name: string, _id: any, createdAt?: any | null, organicCount?: number | null, peopleAlsoAskCount?: number | null } | null> | null };


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