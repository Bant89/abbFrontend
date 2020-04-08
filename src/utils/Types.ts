
export interface ListingProps {
  id: string;
  images: string[];
  costPerNightBase: number;
  country: string;
  guests: number;
  baths: number;
  bedrooms: number;
  average: number;
  address: string;
  location: string;
  name: string;
  owner: UserProps
}

export interface UserProps {
  id: string;
  name: string;
  bio: string;
  email: string;
  country: string;
  languagues: string[];
  isHost: boolean;
}