import React, { CSSProperties, useState } from 'react';
import { Listing } from '../../utils/Types'
import { UserState, LoginState } from '../../utils/ReduxTypes';
import { useSelector } from 'react-redux';
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks';

interface RootState {
  userState: UserState
}

const ADD_FAVORITE = gql`
  mutation AddFavoriteListing($favoritesInput: AddFavoritesInput!) {
    addFavorites(input: $favoritesInput) {
      result
    }
  }
`

const DELETE_FAVORITE = gql`
  mutation RemoveFavoriteListing($favoritesInput: RemoveFavoritesInput!) {
    removeFavorites(input: $favoritesInput) {
      result
    }
  }
`

const Card: React.FC<{props: Listing, key: string}>  = ( { props } ) => {
  let { id, name, average, costPerNightBase, country, images } = props;
  const selectUserState = (state: RootState) => state.userState
  const  { user } = useSelector(selectUserState)
  const [isFavorite, setIsFavorite] = useState(user.favoritesListing.includes(id) ? true : false)
  const [addFavorite] = useMutation(ADD_FAVORITE, { variables: { favoritesInput: { userId: user.id, listingId: id } } })
  const [deleteFavorite] = useMutation(DELETE_FAVORITE,  { variables: { favoritesInput: { userId: user.id, listingId: id } } })

  const style: CSSProperties = {
    color: isFavorite ? "red" : "black"
  }

  return(
    <div id={id} style={style}>
      <img src={images[0]} alt="listing"/>
      <h3><strong>{country.toLocaleUpperCase()}</strong></h3>
      <h3>{name}</h3>
      <h3>From {costPerNightBase}/night!</h3>
      <h3>{average}</h3>
      <button onClick={() => { 
        isFavorite ? deleteFavorite() : addFavorite()
        setIsFavorite(!isFavorite)
      }}>{isFavorite ? "Add to favorite" : "Remove favorite"}</button>
    </div>
  )
}

export default Card;