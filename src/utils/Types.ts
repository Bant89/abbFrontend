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

export type User = {
  id: string
  name: string
  bio: string
  email: string
  country: string
  languagues: string[]
  isHost: boolean
}

export type UserCredentials = {
  email: string
  password: string
}
