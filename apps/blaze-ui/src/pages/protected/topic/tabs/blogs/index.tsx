import { Box, Stack, Typography } from '@mui/material'
import MDEditor from '@uiw/react-md-editor'
import { useState } from 'react'

interface BlogTabPanelProps {
  blogs: string[]
  topicId: string
}

export function BlogsTab({ blogs, topicId }: BlogTabPanelProps) {
  const [value, setValue] = useState<string>(blogs[0] || '')
  return (
    <Stack direction="column" spacing={2}>
      {blogs.map((blog, index) => {
        return (
          <>
            <Typography variant="h4" component="h2" gutterBottom>
              Number: {index + 1}
            </Typography>
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
                value={value}
                toolbarBottom={false}
                onChange={value => {
                  setValue(value || '')
                }}
              />
            </Box>
          </>
        )
      })}
    </Stack>
  )
}
