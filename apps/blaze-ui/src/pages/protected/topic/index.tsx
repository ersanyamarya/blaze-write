import { TopicOrganic, useTopicFindByIdQuery } from '@blaze-write/api-operations'
import { AppBar, Box, Link, Stack, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import { useState } from 'react'

import { useParams } from 'react-router-dom'
import { Organic } from './organic'

const drawerWidth = 320
export function Topic() {
  const topicID = useParams()['topicId']

  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const { data, loading, error } = useTopicFindByIdQuery({
    variables: {
      topicFindByIdId: topicID,
    },
  })

  if (loading) return <Typography variant="h1"> Loading... </Typography>
  if (error) return <Typography variant="h1"> Error! </Typography>

  return (
    <>
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {data?.topicFindById?.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Stack gap={0} rowGap={0} direction="row" flexWrap="wrap" justifyContent="start">
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Main topic sections"
              centered
              variant="fullWidth"
              sx={{
                width: '100%',
              }}
            >
              <Tab label="Organic Links" />
              <Tab label="Questions to be answered" />
              <Tab label="Related Search" />
            </Tabs>
          </Box>
        </Box>

        <CustomTabPanel value={value} index={0}>
          {data?.topicFindById?.organic && data?.topicFindById?.organic.length && (
            <Organic topic={data?.topicFindById?.organic as TopicOrganic[]} />
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Stack>
    </>
  )
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  )
}
