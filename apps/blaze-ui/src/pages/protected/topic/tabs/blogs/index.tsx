import { Box, Button, Card, CardActions, CardContent, CardHeader, Stack, Typography } from '@mui/material'
import MDEditor from '@uiw/react-md-editor'
import { Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import useServerData from './use-server-data'

interface BlogTabPanelProps {
  blogs: string[]
  topicId: string
}

export function BlogsTab({ blogs, topicId }: BlogTabPanelProps) {
  const [currentBlog, setCurrentBlog] = useState<string>(blogs[0])
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const { loading, error, handleDeleteBlog, handleSaveBlog } = useServerData({
    topicId,
    onMutationCompleted: () => {
      setSelectedIndex(0)
      setCurrentBlog(blogs[0])
    },
  })

  function handleChooseBlog(index: number) {
    setSelectedIndex(index)
    setCurrentBlog(blogs[index])
  }

  if (loading)
    return (
      <Typography variant="h2" component="h1" gutterBottom>
        Loading...
      </Typography>
    )
  if (error)
    return (
      <Typography variant="h2" component="h1" gutterBottom>
        Error!: {error}
      </Typography>
    )

  return (
    <>
      <Stack direction="row" spacing={2} gap={2} flexWrap={'wrap'}>
        {blogs.map((blog, index) => {
          return (
            <Card
              key={index}
              sx={{
                width: 'calc(50% - 32px)',
              }}
            >
              <CardHeader title={`Number ${index + 1}`} />
              <CardContent>
                <Typography variant="body2">{blog.split('---')[2].split(' ').splice(0, 15).join(' ')}</Typography>
              </CardContent>

              <CardActions>
                {/* Edit button */}
                <Button variant="outlined" color="primary" startIcon={<Pencil />} onClick={() => handleChooseBlog(index)}>
                  Edit
                </Button>
                <Button variant="outlined" color="error" startIcon={<Trash2 />} onClick={() => handleDeleteBlog(index)}>
                  Delete
                </Button>
                {selectedIndex === index && (
                  <Button
                    variant="outlined"
                    color="success"
                    startIcon={<Trash2 />}
                    onClick={() => handleSaveBlog(index, currentBlog)}
                  >
                    Save
                  </Button>
                )}
              </CardActions>
            </Card>
          )
        })}
      </Stack>
      {currentBlog && (
        <Box
          sx={{
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '10px',
            height: '80vh',
          }}
        >
          <MDEditor
            height={'100%'}
            value={currentBlog}
            toolbarBottom={false}
            onChange={value => {
              setCurrentBlog(value || '')
            }}
          />
        </Box>
      )}
    </>
  )
}
