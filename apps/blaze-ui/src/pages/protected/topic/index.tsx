import {
  TopicOrganic,
  TopicPeopleAlsoAsk,
  useTopicDeleteOneMutation,
  useTopicFindByIdQuery,
  useTopicStartGoogleSearchMutation,
} from '@blaze-write/api-operations'
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import { useState } from 'react'

import { FolderSearch, SearchCode, Trash2 } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { Organic } from './organic'
import { Question } from './people-asked'
import { RelatedSearch } from './related-searches'

const drawerWidth = 320
export function Topic() {
  const topicID = useParams()['topicId']
  const [value, setValue] = useState(0)
  const theme = useTheme()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const { data, loading, error } = useTopicFindByIdQuery({
    variables: {
      topicFindByIdId: topicID,
    },
  })

  const [deleteTopic, { loading: deleteLoad }] = useTopicDeleteOneMutation({
    refetchQueries: ['TopicFindAll'],
  })

  const [grabGoogleSearchResults, { loading: searchLoad }] = useTopicStartGoogleSearchMutation({
    refetchQueries: ['TopicFindById'],
  })

  const handleGrabGoogleSearchResults = (alternateTopic = '') => {
    grabGoogleSearchResults({
      variables: {
        alternateTopic,
        topicStartGoogleSearchId: topicID,
      },
    })
  }

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDeleteTopic = () => {
    deleteTopic({
      variables: {
        topicDeleteOneId: topicID,
      },
    })
    setOpen(false)
  }

  if (loading || deleteLoad || searchLoad) return <Skeleton variant="rectangular" height={'100vh'} />
  if (error || !topicID)
    return (
      <Typography variant="h2" component="h1" gutterBottom>
        Error! <br /> {error?.graphQLErrors[0].message}{' '}
      </Typography>
    )

  return (
    <>
      <DeleteTopicDialog open={open} handleClose={handleClose} handleDeleteTopic={handleDeleteTopic} />
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {data?.topicFindById?.name}
          </Typography>
          <Stack direction="row" justifyContent="flex-end" alignItems="center">
            <Tooltip title="Delete Topic" placement="right-start" arrow>
              <IconButton aria-label="delete" onClick={handleClickOpen}>
                <Trash2 />
              </IconButton>
            </Tooltip>
            <Tooltip title="Go to google search results" placement="right-start" arrow>
              <IconButton
                aria-label="edit"
                onClick={() => window.open(`https://google.com/search?q=${data?.topicFindById?.name}`, '_blank')}
              >
                <SearchCode />
              </IconButton>
            </Tooltip>
            <Tooltip title="Grab google Search Results" placement="right-start" arrow>
              <IconButton aria-label="edit" onClick={() => handleGrabGoogleSearchResults()}>
                <FolderSearch />
              </IconButton>
            </Tooltip>
          </Stack>
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
            <Organic organicLinks={data?.topicFindById?.organic as TopicOrganic[]} topicId={topicID} />
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {data?.topicFindById?.peopleAlsoAsk && data?.topicFindById?.peopleAlsoAsk.length && (
            <Question questions={data?.topicFindById?.peopleAlsoAsk as TopicPeopleAlsoAsk[]} topicId={topicID} />
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {data?.topicFindById?.relatedSearches && data?.topicFindById?.relatedSearches.length && (
            <RelatedSearch relatedSearch={data?.topicFindById?.relatedSearches as string[]} topicId={topicID} />
          )}
        </CustomTabPanel>
      </Stack>
    </>
  )
}

interface DeleteTopicDialogProps {
  open: boolean
  handleClose: () => void
  handleDeleteTopic: () => void
}
function DeleteTopicDialog({ open, handleClose, handleDeleteTopic }: DeleteTopicDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-topic-dialog-title"
      aria-describedby="delete-topic-dialog-description"
    >
      <DialogTitle>{' Are you sure you want to delete this topic? '}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Deleting this topic will delete all the data associated with it. This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Do not Delete
        </Button>
        <Button variant="outlined" onClick={handleDeleteTopic} autoFocus color="error">
          Delete Anyway
        </Button>
      </DialogActions>
    </Dialog>
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
