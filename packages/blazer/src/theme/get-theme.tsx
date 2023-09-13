import { createTheme, PaletteMode, responsiveFontSizes, Theme } from '@mui/material'

const fontFamily = ['Fira Code', 'Arial'].join(',')
const getTheme = (mode: PaletteMode): Theme => {
  return responsiveFontSizes(
    createTheme({
      palette: {
        mode,
        primary: {
          main: '#99cc00',
        },
        secondary: {
          main: '#CC9900',
        },
        background: {
          default: mode === 'light' ? '#fcfcfc' : '#121212',
          paper: mode === 'light' ? '#f5f5f5' : '#1c1c1c',
        },
      },
      typography: {
        fontFamily,
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              fontFamily,
            },
          },
        },
        MuiAppBar: {
          defaultProps: {
            color: 'secondary',
            position: 'static',
          },
          styleOverrides: {
            root: {
              boxShadow: 'none',
              color: '#fcfcfc',
            },
          },
        },
      },
    })
  )
}

export { getTheme, fontFamily }
