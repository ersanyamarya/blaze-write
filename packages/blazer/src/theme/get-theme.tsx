import { colors, createTheme, PaletteMode, responsiveFontSizes, Theme } from '@mui/material'

const fontFamily = ['Fira Code', 'Arial'].join(',')
const getTheme = (mode: PaletteMode): Theme => {
  return responsiveFontSizes(
    createTheme({
      palette: {
        mode,
        primary: colors.blueGrey,
        secondary: colors.teal,
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
            color: 'primary',
            position: 'static',
          },
          styleOverrides: {
            root: {
              boxShadow: 'none',
              color: '#fcfcfc',
            },
          },
        },
        MuiDrawer: {
          defaultProps: {
            variant: 'permanent',
            anchor: 'left',
            color: 'primary',
          },
          styleOverrides: {
            root: {
              width: '100%',
              height: '100%',
              backgroundColor: 'red',
            },
            paper: {
              width: 'inherit',
              height: 'inherit',
              backgroundColor: 'primary.dark',
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
