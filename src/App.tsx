import React from 'react'
import { Router } from '@reach/router'

import Register from './pages/Register'
import Main from './pages/Main'
import Inbox from './pages/Inbox'
import Profile from './pages/Profile'
import Saved from './pages/Saved'
import Search from './pages/Search'
import Nav from './components/Nav'
import ResetPasswordForm from './components/ResetPasswordForm'

function App() {
  return (
    <>
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
    </>
  )
}

export default App
