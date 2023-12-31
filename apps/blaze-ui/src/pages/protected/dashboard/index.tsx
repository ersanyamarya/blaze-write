import { EnumSortOrder, useTopicFindAllQuery } from '@blaze-write/api-operations'
import { Box, Button, Card, CardActions, CardContent, Chip, Divider, Stack, Typography } from '@mui/material'
import { Frame } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { datePrettify, timeDifference, timePrettify } from 'time-pocket'

export function Dashboard() {
  // Navigator
  const navigate = useNavigate()

  const { data, loading, error } = useTopicFindAllQuery({
    variables: {
      sort: EnumSortOrder.Desc,
    },
  })

  if (loading) return <Typography variant="h1"> Loading... </Typography>
  if (error) return <Typography variant="h1"> Error! </Typography>

  return (
    <Stack textAlign="center" spacing={2} direction="column">
      <Typography variant="h1">
        <Frame size={64} />
        Topics
      </Typography>
      <Stack gap={2} direction="row" justifyContent="center" flexWrap="wrap">
        {data?.topicFindAll?.map(topic => (
          <Card
            key={topic?._id}
            elevation={2}
            onClick={() => {
              navigate(`/topic/${topic?._id}`)
            }}
            sx={{
              width: '35vw',
              padding: '1rem 0.5rem 0rem 0rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
              // hover
              '&:hover': {
                boxShadow: '2px 2px 5px 2px rgba(0,0,0,0.25)',
              },
            }}
          >
            <CardContent>
              <Typography textOverflow={'ellipsis'} overflow={'hidden'} whiteSpace={'nowrap'} variant="h5" gutterBottom>
                {topic?.name}
              </Typography>
              <Divider
                sx={{
                  margin: '1rem 0',
                }}
              />
              <Typography variant="subtitle1">
                Created At: <Chip variant="outlined" label={prettyDate(topic?.createdAt)} />
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: '1rem',
                }}
              >
                <Typography variant="subtitle1">
                  Organic Links: <Chip variant="outlined" label={topic?.organicCount} />
                </Typography>
                <Typography variant="subtitle1">
                  People Asked For: <Chip variant="outlined" label={topic?.peopleAlsoAskCount} />
                </Typography>
              </Box>
            </CardContent>

            <CardActions>
              <Button size="small" color="error">
                Remove
              </Button>
              {/* <Button
                size="small"
                color="primary"
                onClick={() => {
                  setCurrentTopic(topic?.name || '')
                  setOpen(true)
                }}
              >
                Edit
              </Button> */}
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Stack>
  )
}

export function prettyDate(timestamp: number | string) {
  const date = new Date(timestamp)
  return `${datePrettify(date, { pretty: true, format: 'DD mm YY' }).pretty} (${timePrettify(date).pretty})`
}

export function timeAgo(timestamp: number | string, today = new Date(Date.now())) {
  const date = new Date(timestamp)
  return `${timeDifference(today, date).txt} ago`
}
