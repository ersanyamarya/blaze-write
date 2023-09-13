import { Paper, Typography } from '@mui/material'
import React from 'react'

export function NotFound() {
  return (
    <Paper
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <br />
      <Typography variant="h1"> 404 </Typography>
      <Typography variant="h2"> Not Found </Typography>
    </Paper>
  )
}
