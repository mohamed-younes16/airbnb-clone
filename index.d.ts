import { Listing } from "@prisma/client";

interface AuthenticationModalType {
  open: "login" | "register" | "";
  setOpen: (v: "login" | "register" | "") => void;
}

interface ListingType {
  category: string;
  title: string;
  images: string[];
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  price: number;
  locationValue: {
    value: string;
    flag: string;
    latlang: number[];
    region: string;
    label: string;
  };
}
interface FetchedListingType {
  isFavourated: boolean;
  createdAt: string;
  id: string;
  ownerId: string;
  title: string;
  images: string[];
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  price: number;
  category: string;
  locationValue: string;
  updatedAt: Date;
  reviews: number[];
}
interface LocationValueType {
  value: string;
  flag: string;
  latlang: number[];
  region: string;
  label: string;
}

interface ReservationInputType {
  endDate: Date;
  startDate: Date;
  listingId: string;
  totalPrice: number;
  totalDays: number;
}
interface FetchedTripsType {
  totalPrice: number;
  isFavourated: boolean;
  title: string;
  id: string;
  images: string[];
  category: string;
  createdAt: Date;
  favouritedBy: {
    id: string;
  }[];
  isActive: boolean;
  isEnded: boolean;
}

interface ListingByIdType extends Listing {
  owner: { username?: string | undefined; imageUrl?: string | undefined };
  locationValue: LocationValueType;
  isFavourated: boolean;
  reservations: Reservation[];
  reviews: number[];
}

interface continentsType {
  continent: string;
  image: string;
}

