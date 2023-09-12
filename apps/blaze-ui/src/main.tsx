import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeContainer } from '@ersanyamarya/blazer'
import '@fontsource-variable/fira-code'
import App from './app/app'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <ThemeContainer>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeContainer>
  </StrictMode>
)
