import {
  EnumResourceType,
  useTopicCopyQuestionToOrganicMutation,
  useTopicDeleteResourceMutation,
} from '@blaze-write/api-operations'
import { useMemo, useState } from 'react'

interface UseServerDataProps {
  topicId: string
  onMutationCompleted: () => void
}

interface UseServerDataReturn {
  loading: boolean
  error: string
  handleDeleteQuestion: (indexes: number[]) => void
  handleCopyQuestionToOrganic: (indexes: number[]) => void
}

export default function useServerData({ topicId, onMutationCompleted }: UseServerDataProps): UseServerDataReturn {
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

  const [deleteQuestion] = useTopicDeleteResourceMutation({
    refetchQueries: ['TopicFindById'],
    onCompleted,
    onError,
  })

  const [copyQuestionToOrganic] = useTopicCopyQuestionToOrganicMutation({
    refetchQueries: ['TopicFindById'],
    onCompleted,
    onError,
  })

  const handleDeleteQuestion = (indexes: number[]) => {
    setLoading(true)
    deleteQuestion({
      variables: {
        resourceType: EnumResourceType.PeopleAlsoAsk,
        topicDeleteResourceId: topicId,
        indexes,
      },
    })
  }

  const handleCopyQuestionToOrganic = (indexes: number[]) => {
    setLoading(true)
    copyQuestionToOrganic({
      variables: {
        topicCopyQuestionToOrganicId: topicId,
        indexes,
      },
    })
  }

  return {
    loading,
    error,
    handleDeleteQuestion,
    handleCopyQuestionToOrganic,
  }
}
