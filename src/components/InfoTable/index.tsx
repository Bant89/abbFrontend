import React from 'react'
import { UserListingsData } from '../../utils/Types'

const InfoTable = ({ getUserListings }: UserListingsData) => {
  console.log("Info Table Data", getUserListings);
  return <h1>InfoTable</h1>
}



export default InfoTable