import { EnumSortOrder, useTopicCreateOneMutation, useTopicFindAllQuery } from '@blaze-write/api-operations'
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material'
import { Frame, PlusCircleIcon } from 'lucide-react'
import { useState } from 'react'
import { NavLink, useLocation, useNavigate, useOutlet } from 'react-router-dom'
import AddTopicDialog from './components/add-topic'
const drawerWidth = 320
const pathRegexp = (route: string): RegExp => new RegExp(`${route}.*`)
export function NavBarLayout() {
  const theme = useTheme()
  const location = useLocation()
  const outlet = useOutlet()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [currentTopic, setCurrentTopic] = useState<string>('apple')
  const { data, loading, error } = useTopicFindAllQuery({
    variables: {
      sort: EnumSortOrder.Asc,
    },
  })

  const [addTopic] = useTopicCreateOneMutation({
    refetchQueries: ['TopicFindAll'],
    onCompleted: data => {
      navigate(`/topic/${data.topicCreateOne?._id}`)
    },
  })
  const handleClose = () => {
    setOpen(false)
  }
  const handleAddTopic = (topic: string) => {
    addTopic({
      variables: {
        name: topic,
      },
    })
    setOpen(false)
  }

  if (loading) return <Typography variant="h1"> Loading... </Typography>
  if (error) return <Typography variant="h1"> Error! </Typography>

  return (
    <Box sx={{ display: 'flex' }}>
      <AddTopicDialog open={open} handleClose={handleClose} handleAddTopic={handleAddTopic} name={currentTopic} />
      <Drawer
        sx={{
          width: drawerWidth,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <AppBar>
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Blaze Writer
            </Typography>
          </Toolbar>
        </AppBar>

        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setCurrentTopic('')
                setOpen(true)
              }}
            >
              <ListItemIcon>{<PlusCircleIcon />}</ListItemIcon>
              <ListItemText primary="Add new Topic" />
            </ListItemButton>
          </ListItem>
          <Divider
            sx={{
              height: '1rem',
              width: '100%',
            }}
          />
          {data?.topicFindAll?.map((topic, index) => {
            const isActive = location.pathname.match(pathRegexp(`/topic/${topic?._id}`))
            return (
              <ListItem key={topic?._id} disablePadding>
                <NavLink
                  to={`/topic/${topic?._id}`}
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: isActive ? theme.palette.primary.dark : 'inherit',
                    color: isActive ? theme.palette.primary.contrastText : 'inherit',
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      {<Frame color={isActive ? theme.palette.primary.contrastText : theme.palette.text.primary} />}
                    </ListItemIcon>
                    <ListItemText primary={topic?.name} />
                  </ListItemButton>
                </NavLink>
              </ListItem>
            )
          })}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        {outlet}
      </Box>
    </Box>
  )
}
