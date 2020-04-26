import React, { useEffect, useState } from 'react'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'
import { Router } from '@reach/router'
import Register from './pages/Register'
import Main from './pages/Main'
import Inbox from './pages/Inbox'
import Profile from './pages/Profile'
import Saved from './pages/Saved'
import Search from './pages/Search'
import Nav from './components/Nav'
import ResetPasswordForm from './components/ResetPasswordForm'
import { LoginState } from './utils/ReduxTypes'
import { useSelector } from 'react-redux'

const cache = new InMemoryCache()
const link = new HttpLink({
  // uri: 'https://evening-crag-41126.herokuapp.com/graphql'
  uri: 'http://localhost:3000/graphql',
})

interface RootState {
  loginState: LoginState
}


function App() {

  const selectLoginState = (state: RootState) => state.loginState
  const  { access_token } = useSelector(selectLoginState)
  const [authToken, setAuthToken] = useState<string | null>(access_token)

  useEffect(() => {
    setAuthToken(access_token)
  }, [access_token])

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
    </>
  )
}

export default App
