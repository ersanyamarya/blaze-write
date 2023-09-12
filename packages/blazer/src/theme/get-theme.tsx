import { createTheme, PaletteMode, responsiveFontSizes, Theme } from '@mui/material'

const fontFamily = ['Fira Code', 'Arial'].join(',')
const getTheme = (mode: PaletteMode): Theme => {
  return responsiveFontSizes(
    createTheme({
      palette: {
        mode,
        primary: {
          main: '#1976d2',
        },
        secondary: {
          main: '#dc004e',
        },
        background: {
          default: mode === 'light' ? '#fff' : '#121212',
          paper: mode === 'light' ? '#fff' : '#1c1c1c',
        },
      },
      typography: {
        fontFamily,
      },
    })
  )
}

export { getTheme, fontFamily }
