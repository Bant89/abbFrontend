import React, { useEffect, useState } from 'react'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'
import { Router } from '@reach/router'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { mergedReducers } from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import Register from './pages/Register'
import Main from './pages/Main'
import Inbox from './pages/Inbox'
import Profile from './pages/Profile'
import Saved from './pages/Saved'
import Search from './pages/Search'
import Nav from './components/Nav'
import ResetPasswordForm from './components/ResetPasswordForm'

const cache = new InMemoryCache()
const link = new HttpLink({
  // uri: 'https://evening-crag-41126.herokuapp.com/graphql'
  uri: 'http://localhost:3000/graphql',
})

const appStore = createStore(mergedReducers, composeWithDevTools())

function App() {
  const [authToken, setAuthToken] = useState<string | null>('')

  useEffect(() => {
    setAuthToken(sessionStorage.getItem('access_token'))
  }, [])

  const authLink = setContext((_, { headers }) => {

    return {
      headers: {
        ...headers,
        authorization: authToken ? `Bearer ${authToken}` : '',
      },
    }
  })

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link: authLink.concat(link),
  })

  return (
    <>
    <Provider store={appStore}>
     <ApolloProvider client={client}>
        <Router>
          <Register path="register" />
          <Register path="login" default />
          <Main path="main" />
          <Inbox path="inbox" />
          <Profile path="profile" />
          <Search path="search" />
          <Saved path="saved" />
          <ResetPasswordForm path="forgot" />
        </Router>
        <Nav />
      </ApolloProvider>
    </Provider>
    </>
  )
}

export default App
