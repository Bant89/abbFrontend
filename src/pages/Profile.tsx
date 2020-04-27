import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { User, UserListingsData, UserReviewsData } from '../utils/Types'
import { useSelector, useDispatch } from 'react-redux'
import { LoginState } from '../utils/ReduxTypes'
import { fetchUserRequest, fetchUserError, fetchUserSuccess } from '../actions'
import UserProfile from '../components/UserProfile'
import InfoTable from '../components/InfoTable'

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

const GET_USER_LISTINGS = gql`
query GetUserListing($userId: String!) {
  getUserListings(userId: $userId) {
    id
    name
    description
    average
    costPerNightBase
  }
}
`

const GET_USER_REVIEWS = gql`
query GetUserReview($userId: String!) {
  getUserReviews(userId: $userId) {
    id
    comment
    dateMade
    listingId
  }
}
`

const Profile = (props: RouteComponentProps)  => {

  const dispatch = useDispatch()
  const selectLoginState = (state: RootState) => state.loginState
  const  { user_id } = useSelector(selectLoginState)
  const [isLogged, setIsLogged] = useState(user_id ? true : false)
  
  console.log(`User id: ${user_id}`)
  dispatch(fetchUserRequest(user_id))

  // TODO: MAKE IT SO THAT WHILE THERE'S THE USER_ID IN THE SESSIONSTORAGE YOU RETRIEVE THE USER DATA EVEN THOUGHT YOU MAY DON'T GO TO THE LOGIN ROUTE

  const { error: userListingError, data: userListingData } = useQuery<UserListingsData | undefined>(GET_USER_LISTINGS, {
      variables: { userId: user_id },
      fetchPolicy: "no-cache"
  })

  const { error: userReviewError, data: userReviewData } = useQuery<UserReviewsData | undefined>(GET_USER_REVIEWS, {
    variables: { userId: user_id },
    fetchPolicy: "no-cache"
  })

  const { error: userDetailError, data: userDetailData } = useQuery<returnValue | undefined>(GET_USER_DETAIL, {
      variables: { userId: user_id },
      fetchPolicy: "no-cache"
  })


  console.log('Is logged ? ', isLogged)
  console.log(`userDetailError: ${userDetailError} Data: ${JSON.stringify(userDetailData?.userDetail)}`)

  if (userDetailError)
    dispatch(fetchUserError(userDetailError.message))
  
  if (userDetailData) {
    dispatch(fetchUserSuccess(userDetailData.userDetail))
  }

  useEffect(() => {
    if(userDetailData?.userDetail)
      setIsLogged(true)
  }, [userDetailData])

  return (
  <div>
    <h1>Profile</h1>
    {userDetailData?.userDetail && <UserProfile userDetail={userDetailData?.userDetail}/>}
    {userListingData?.getUserListings && <InfoTable getUserListings={userListingData?.getUserListings}/>}
  </div>
  )
}

export default Profile