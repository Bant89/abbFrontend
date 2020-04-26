import React, { CSSProperties, useState, useEffect } from 'react'
import { RouteComponentProps, Link } from '@reach/router';
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { LoginState } from '../../utils/ReduxTypes'
import { fetchUserRequest, fetchUserError, fetchUserSuccess } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import { User } from '../../utils/Types';

interface RootState {
  loginState: LoginState
}

type returnValue = {
  userDetail: User
}

const GET_USER_DETAIL = gql`
  query GetUserDetail($userId: String!) {
    userDetail(id: $userId) {
      id
      email
      name
      bio
      languagues
      isHost
      favoritesListing
    }
  }
`

const Nav = (props: RouteComponentProps)  => {

  const dispatch = useDispatch()
  const selectLoginState = (state: RootState) => state.loginState
  const  { user_id } = useSelector(selectLoginState)
  const [isLogged, setIsLogged] = useState(false)
  const getName = () => {
    return data?.userDetail.name.split(' ')[0].toLocaleUpperCase()
  }

  console.log(`User id: ${user_id}`)
  dispatch(fetchUserRequest(user_id))

  // TODO: MAKE IT SO THAT WHILE THERE'S THE USER_ID IN THE SESSIONSTORAGE YOU RETRIEVE THE USER DATA EVEN THOUGHT YOU MAY DON'T GO TO THE LOGIN ROUTE
  const { error, data } = useQuery<returnValue | undefined>(GET_USER_DETAIL, {
      variables: { userId: user_id },
      fetchPolicy: "no-cache"
  })
  console.log('Is logged ? ', isLogged)
  console.log(`Error: ${error} Data: ${JSON.stringify(data?.userDetail)}`)

  if (error)
    dispatch(fetchUserError(error.message))
  
  if (data) {
    dispatch(fetchUserSuccess(data.userDetail))
  }

  useEffect(() => {
    if(data?.userDetail)
      setIsLogged(true)
  }, [data])

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
  {!isLogged ? <Link to="/login">LOG IN</Link> : <Link to="/profile">{getName()}</Link>}
    </nav>
  )
}

export default Nav;