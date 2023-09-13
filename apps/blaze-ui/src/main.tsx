import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { serverConfig } from '@blaze-write/config'
import { ThemeContainer } from '@ersanyamarya/blazer'
import { CssBaseline } from '@mui/material'
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import Routing from './routing'

const cache = new InMemoryCache()
const client = new ApolloClient({
  uri: serverConfig.graphqlURL,
  cache: cache,
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
console.log('serverConfig', serverConfig)
root.render(
  <StrictMode>
    <ThemeContainer>
      <CssBaseline />
      <ApolloProvider client={client}>
        <Routing />
      </ApolloProvider>
    </ThemeContainer>
  </StrictMode>
)
