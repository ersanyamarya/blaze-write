import { CircularProgress } from '@mui/material'
import { Suspense } from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import { NavBarLayout } from './templates'

import { Dashboard, NotFound, Topic } from './pages'

function LazyLoaded({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<CircularProgress size={256} thickness={2} />}>{children}</Suspense>
}
export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LazyLoaded>
              <NavBarLayout />
            </LazyLoaded>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/topic/:topicId" element={<Topic />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}
