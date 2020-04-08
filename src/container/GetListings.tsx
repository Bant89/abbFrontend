import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { RouteComponentProps } from '@reach/router'
import { ListingProps } from '../utils/Types'

const GET_LISTINGS = gql`
  query getListings {
    listings {
      id
      name
      description
      average
      costPerNightBase
      country
      guests
      baths
      bedrooms
      owner {
        id
        name
        bio
        languagues
      }
    }
  }
`;

export const Listings: React.FC<ListingProps> = () => {
  const {
    data,
    loading,
    error
  } = useQuery<
    ListingProps
  >(GET_LISTINGS)

  if (loading) return <p>Loading!</p>
  if (error) return <p>Error!</p>
  if (!data) return <p>Not Found!</p>

  
  console.log(data)

  return <p>All good</p>

}
