import { AppBar, Toolbar, Typography } from '@mui/material'
import { useOutlet } from 'react-router-dom'

export function NavBarLayout() {
  const outlet = useOutlet()
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h4" component="h1">
            Blaze UI
          </Typography>
        </Toolbar>
      </AppBar>
      <div
        style={{
          height: 'calc(100vh - 64px)',
          overflow: 'hidden',
        }}
      >
        {outlet}
      </div>
    </>
  )
}
