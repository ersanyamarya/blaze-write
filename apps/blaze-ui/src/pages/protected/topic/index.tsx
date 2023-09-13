import { useTopicFindByIdQuery } from '@blaze-write/api-operations'
import { Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

export function Topic() {
  const topicID = useParams()['topicId']

  const { data, loading, error } = useTopicFindByIdQuery({
    variables: {
      topicFindByIdId: topicID,
    },
  })

  if (loading) return <Typography variant="h1"> Loading... </Typography>
  if (error) return <Typography variant="h1"> Error! </Typography>

  return (
    <Stack spacing={2} direction="column">
      <Typography variant="h4" component="h1">
        {data?.topicFindById?.name}
      </Typography>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Stack>
  )
}
