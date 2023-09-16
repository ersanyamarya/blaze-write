import {
  EnumResourceType,
  useTopicDeleteResourceMutation,
  useTopicUpdateBlogPostMutation,
} from '@blaze-write/api-operations'
import { useMemo, useState } from 'react'

interface UseServerDataProps {
  topicId: string
  onMutationCompleted: () => void
}

interface UseServerDataReturn {
  loading: boolean
  error: string
  handleDeleteBlog: (index: number) => void
  handleSaveBlog: (index: number, blogPost: string) => void
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

  const [deleteBlogPost] = useTopicDeleteResourceMutation({
    refetchQueries: ['TopicFindById'],
    onCompleted,
    onError,
  })

  const [updateBlogPost] = useTopicUpdateBlogPostMutation({
    refetchQueries: ['TopicFindById'],
    onCompleted,
    onError,
  })

  const handleDeleteBlog = (index: number) => {
    setLoading(true)
    deleteBlogPost({
      variables: {
        resourceType: EnumResourceType.BlogPosts,
        topicDeleteResourceId: topicId,
        indexes: [index],
      },
    })
  }

  const handleSaveBlog = (index: number, blogPost: string) => {
    setLoading(true)
    updateBlogPost({
      variables: {
        topicUpdateBlogPostId: topicId,
        index,
        blogPost,
      },
    })
  }

  return {
    loading,
    error,
    handleDeleteBlog,
    handleSaveBlog,
  }
}
