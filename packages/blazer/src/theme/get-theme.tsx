import { colors, createTheme, PaletteMode, responsiveFontSizes, Theme } from '@mui/material'
import type {} from '@mui/x-data-grid/themeAugmentation'
const fontFamily = ['Fira Code', 'Arial'].join(',')
const getTheme = (mode: PaletteMode): Theme => {
  let theme = responsiveFontSizes(
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
    })
  )
  theme = createTheme(theme, {
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
      MuiDataGrid: {
        defaultProps: {
          autoHeight: true,
          initialState: {
            pagination: {
              paginationModel: {
                pageSize: 15,
                page: 0,
              },
            },
          },
          pageSizeOptions: [10, 15, 20, 25, 30, 35, 40, 45, 50],
          checkboxSelection: true,
          disableRowSelectionOnClick: true,
          density: 'compact',
          disableColumnMenu: true,
          disableColumnSelector: true,
          showCellVerticalBorder: true,
          showColumnVerticalBorder: true,
        },
        styleOverrides: {
          root: {},
          columnHeader: {
            backgroundColor: theme.palette.secondary.light,
          },
        },
      },
    },
  })
  return theme
}

export { getTheme, fontFamily }
