import styled from '@emotion/styled'

import { Link, Route, Routes } from 'react-router-dom'

const StyledApp = styled.div`
  // Your style here
`

export function App() {
  return (
    <StyledApp>
      <h1>
        <span role="img" aria-label="Welcome to blaze-ui!">
          🔥
        </span>
      </h1>
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
