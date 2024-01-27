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
}
