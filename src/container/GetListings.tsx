import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Card from '../components/Card'
import { ListingsData } from '../utils/Types'

const GET_LISTINGS = gql`
  query getListings {
    listings {
      id
      name
      average
      costPerNightBase
      country
      images
    }
  }
`

export const Listings: React.FC<{}> = () => {
  const { data, loading, error } = useQuery<ListingsData>(GET_LISTINGS)

  console.log('Antes en Listings ', data)

  if (loading) return <p>Loading!</p>
  if (error) return <p>Error!</p>
  if (!data) return <p>Not Found!</p>

  console.log('Despues en Listings ', data)

  const cards = data.listings.map(listing => <Card props={listing} key={listing.id}/>)

  return (
    <div>
      {cards}
    </div>
  )
}
