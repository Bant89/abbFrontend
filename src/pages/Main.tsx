import React from 'react'
import { RouteComponentProps } from '@reach/router'

import { Listings } from '../container/GetListings' 

const Main = (props: RouteComponentProps)  => {

  return (
    <div>
      <h1>Main</h1>
      {Listings}
    </div>
  )
}

export default Main