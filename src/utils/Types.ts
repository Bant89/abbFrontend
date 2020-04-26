export type Listing = {
  id: string
  name: string
  average: number
  costPerNightBase: number
  country: string
  images: string[]
}

export type ListingsData = {
  listings: Listing[]
}

export type FavsData = {
  userFavoritesListings: Listing[]
}

export type User = {
  id: string
  name: string
  bio: string
  email: string
  country: string
  languagues: string[]
  isHost: boolean
  favoritesListing: string[]
}

export type UserCredentials = {
  email: string
  password: string
}

export type LoginSuccessData = {
  access_token: string
  user_id: string
}
