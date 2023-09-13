import { EnumSortOrder, useTopicFindAllQuery } from '@blaze-write/api-operations'
import { Box, Card, CardContent, Chip, Divider, IconButton, Stack, Typography } from '@mui/material'
import { Frame, PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { datePrettify, timeDifference, timePrettify } from 'time-pocket'
import AddTopicDialog from './add-topic'

export function Dashboard() {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleAddTopic = (topic: string) => {
    console.log(topic)
    setOpen(false)
  }

  const { data, loading, error } = useTopicFindAllQuery({
    variables: {
      sort: EnumSortOrder.Desc,
    },
  })

  if (loading) return <Typography variant="h1"> Loading... </Typography>
  if (error) return <Typography variant="h1"> Error! </Typography>

  return (
    <Stack textAlign="center" spacing={2} direction="column">
      <AddTopicDialog open={open} handleClose={handleClose} handleAddTopic={handleAddTopic} />
      <IconButton
        onClick={handleClickOpen}
        sx={{
          position: 'absolute',
          bottom: '2rem',
          right: '2rem',
        }}
        aria-label="delete"
      >
        <PlusCircle size={64} />
      </IconButton>
      <Typography variant="h1">
        <Frame size={64} />
        Topics
      </Typography>
      <Stack spacing={2} direction="row" justifyContent="center" flexWrap="wrap">
        {data?.topicFindAll?.map(topic => (
          <Card
            key={topic?._id}
            elevation={2}
            sx={{
              width: '35vw',
              padding: '1rem 0.5rem 0rem 0rem',
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
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
