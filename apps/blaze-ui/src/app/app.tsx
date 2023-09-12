import styled from '@emotion/styled'
import { Typography } from '@mui/material'

import { Link, Route, Routes } from 'react-router-dom'

const StyledApp = styled.div`
  // Your style here
`

export function App() {
  return (
    <StyledApp>
      <Typography variant="h1" component="h1" gutterBottom>
        Blaze UI
      </Typography>
      <Typography variant="h2" gutterBottom>
        Welcome to Blaze UI!
      </Typography>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route. <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </StyledApp>
  )
}

export default App
