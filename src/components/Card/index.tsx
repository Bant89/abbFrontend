import React from 'react';
import { Listing } from '../../utils/Types'

const Card: React.FC<{props: Listing, key: string}>  = ( { props } ) => {
  let { id, name, average, costPerNightBase, country, images } = props;

  return(
    <div id={id}>
      <img src={images[0]} alt="listing"/>
      <h3><strong>{country.toLocaleUpperCase()}</strong></h3>
      <h3>{name}</h3>
      <h3>From {costPerNightBase}/night!</h3>
      <h3>{average}</h3>
    </div>
  )
}


export default Card;