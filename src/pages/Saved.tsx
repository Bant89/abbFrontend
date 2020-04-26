import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Card from '../components/Card'
import { FavsData } from '../utils/Types'
import { LoginState } from '../utils/ReduxTypes'
import { useSelector } from 'react-redux'
import { RouteComponentProps } from '@reach/router'

const GET_FAVS = gql`
  query GetUserFavs($userId: String!) {
    userFavoritesListings(userId: $userId) {
      id
      name
      average
      costPerNightBase
      country
      images
    }
  }
`

interface RootState {
  loginState: LoginState
}

const Saved = (props: RouteComponentProps)  => {
  const selectLoginState = (state: RootState) => state.loginState
  const  { user_id } = useSelector(selectLoginState)

  const { data, loading, error } = useQuery<FavsData>(GET_FAVS, {
    variables: { userId: user_id },
    fetchPolicy: "no-cache"
  })

  console.log('Antes en Listings ', data)

  if (loading) return <p>Loading!</p>
  if (error) return <p>Error!</p>
  if (!data) return <p>Not Found!</p>

  console.log('Despues en Listings ', data)

  const cards = data.userFavoritesListings.map(listing => <Card props={listing} key={listing.id}/>)

  return (
    <div>
      {cards}
    </div>
  )
}

export default Saved