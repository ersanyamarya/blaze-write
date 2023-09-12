/* eslint-disable @typescript-eslint/no-empty-function */
import { PaletteMode, ThemeProvider } from '@mui/material'
import { ReactElement, ReactNode, createContext, useContext, useState } from 'react'
import { getTheme } from './get-theme'

interface IThemeProvider {
  mode: PaletteMode
  setTheme: (state: PaletteMode) => unknown
  toggleTheme: () => unknown
}
const defaultProvider: IThemeProvider = {
  mode: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
}
const defaultTheme: PaletteMode = 'light'
const ThemeContext = createContext<IThemeProvider>(defaultProvider)
type PropsContainer = {
  children: ReactNode
}

const useThemeState = (): IThemeProvider => useContext<IThemeProvider>(ThemeContext)

const ThemeContainer = ({ children }: PropsContainer): ReactElement => {
  const [mode, setTheme] = useState<PaletteMode>(defaultTheme)

  const toggleTheme = () => {
    setTheme(mode === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ mode, setTheme, toggleTheme }}>
      <ThemeProvider theme={getTheme(mode)}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContainer, useThemeState }
export type { IThemeProvider }
