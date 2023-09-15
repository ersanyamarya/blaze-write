import {
  TopicFindByIdQuery,
  useTopicDeleteOneMutation,
  useTopicFindByIdQuery,
  useTopicStartGoogleSearchMutation,
  useTopicWriteBlogPostMutation,
} from '@blaze-write/api-operations'
import { useMemo, useState } from 'react'

interface UseServerDataProps {
  topicID: string
  onMutationCompleted: () => void
}

interface UseServerDataReturn {
  loading: boolean
  error: string
  topicQueryData: TopicFindByIdQuery
  handleDeleteTopic: () => void
  handleGrabGoogleSearchResults: (alternateTopic?: string) => void
  handleWriteBlog: () => void
}

export default function useServerData({ topicID, onMutationCompleted }: UseServerDataProps): UseServerDataReturn {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const onCompleted = useMemo(() => {
    return () => {
      onMutationCompleted()
      setLoading(false)
    }
  }, [onMutationCompleted])

  const onError = useMemo(() => {
    return (error: any) => {
      setError(error.message)
      setLoading(false)
    }
  }, [])

  const { data } = useTopicFindByIdQuery({
    variables: {
      topicFindByIdId: topicID,
    },
    onCompleted,
    onError,
  })

  const [deleteTopic] = useTopicDeleteOneMutation({
    refetchQueries: ['TopicFindAll'],
    onCompleted,
    onError,
  })

  const [grabGoogleSearchResults] = useTopicStartGoogleSearchMutation({
    refetchQueries: ['TopicFindById'],
    onCompleted,
    onError,
  })

  const [writeBlog] = useTopicWriteBlogPostMutation({
    refetchQueries: ['TopicFindById'],
    onCompleted,
    onError,
  })

  const handleDeleteTopic = () => {
    setLoading(true)
    deleteTopic({
      variables: {
        topicDeleteOneId: topicID,
      },
    })
  }

  const handleGrabGoogleSearchResults = (alternateTopic = '') => {
    setLoading(true)
    grabGoogleSearchResults({
      variables: {
        alternateTopic,
        topicStartGoogleSearchId: topicID,
      },
    })
  }

  const handleWriteBlog = () => {
    setLoading(true)
    writeBlog({
      variables: {
        topicWriteBlogPostId: topicID,
      },
    })
  }

  return {
    loading,
    error,
    topicQueryData: data as TopicFindByIdQuery,
    handleDeleteTopic,
    handleGrabGoogleSearchResults,
    handleWriteBlog,
  }
}
