import React from 'react'
import { User } from '../../utils/Types'

type returnValue = {
  userDetail: User
}

const UserProfile = ({ userDetail }: returnValue) => {
  let { name, bio, email, country, languagues } = userDetail
  console.log("User detail ", JSON.stringify(userDetail))
  return (
    <div>
      <h2>Name: {name}</h2>
      <p>Bio: {bio}</p>
      <p>Email: {email}</p>
      <p>Country: {country}</p>
      <p>Languagues: {languagues}</p>
    </div>
  )
}

export default UserProfile