import React from 'react'
import faker from 'faker'
export const SideCarrousel = () => {
  console.log(faker.image.imageUrl(300, 400))
  return (
      <img src={faker.image.imageUrl(300, 400)} />
  )
}
