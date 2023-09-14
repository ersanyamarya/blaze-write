import styled from '@emotion/styled'
import { Box } from '@mui/material'

const StyledActionSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: '100%',
  height: '3rem',
  backgroundColor: 'transparent',
  gap: '1rem',
}))

export { StyledActionSection }
