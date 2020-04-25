import React, { CSSProperties } from 'react'
import { RouteComponentProps, Link } from '@reach/router';
import { fetchUserRequest, fetchUserError, fetchUserSuccess, LoginState } from '../../utils/ReduxTypes'
import { useDispatch, useSelector } from 'react-redux'


const Nav = (props: RouteComponentProps)  => {

  interface RootState {
    loginState: LoginState
  }

  const dispatch = useDispatch()
  const token = useSelector(state: RootState => state.loginState.user_id)

  const navStyle: CSSProperties = {
    display: "flex", 
    justifyContent: "space-around"
  }

  return (
    <nav style={navStyle}>
      <Link to="/main">EXPLORE</Link>
      <Link to="/saved">SAVED</Link>
      <Link to="/search">SEARCH</Link>
      <Link to="/inbox">INBOX</Link>
      <Link to="/login">LOG IN</Link>
    </nav>
  )
}

export default Nav;