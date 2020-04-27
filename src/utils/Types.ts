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

export type UserListingsData = {
  getUserListings: Listing[]
}

export type UserReviewsData = {
  getUserReviews: Review[]
}

export type Review = {
  id: string
  comment: string
  dateMade: string
  listingId: string
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
