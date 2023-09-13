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
          default: mode === 'light' ? '#f5f5f5' : '#121212',
          paper: mode === 'light' ? '#fcfcfc' : '#1c1c1c',
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
        MuiTextField: {
          defaultProps: {
            variant: 'outlined',
            InputLabelProps: {
              shrink: true,
            },
          },
          styleOverrides: {
            root: {
              marginTop: '1.2rem',
            },
          },
        },
      },
    })
  )
}

export { getTheme, fontFamily }
