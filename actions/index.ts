"use server";
import prismadb from "@/lib/prismabd";

import { ListingByIdType, LocationValueType } from "..";
import getCurrentUser from "./getCurrentUser";
const continentsList = ["America", "Oceania", "Europe", "Africa", "Asia"];
export const ignoreKeys = (obj, keysToIgnore) => {
  const newObj = { ...obj };
  keysToIgnore.forEach((key) => delete newObj[key]);
  return newObj;
};

export const currentUserDb = async () => {
  const userData = await getCurrentUser();

  const user = await prismadb.user.findFirst({
    where: { id: userData?.id || "" },
    include: { favourites: { select: { id: true } } },
  });

  return user;
};


export const getListings = async ({
  guestCount = 1,
  continent = "",
  bathsCount = 1,
  category = "",
}: {
  guestCount?: number;
  continent?: string;
  bathsCount?: number;
  category?: string;
}) => {
  const user = await currentUserDb();
  const isInList = continentsList.some(
    (e) => e.toLocaleLowerCase() === continent.toLocaleLowerCase()
  );
  const locationSearch = isInList ? { search: continent } : {};
  const data = await prismadb.listing.findMany({
    where: {
      guestCount: { gte: guestCount },
      bathroomCount: { gte: bathsCount },
      locationValue: { ...locationSearch, mode: "insensitive" },
      category: { contains: category.toLocaleLowerCase() },
    },

    take: 10,
    orderBy: { createdAt: "desc" },
    include: {
      reservations: { select: { review: { select: { stars: true } } } },
    },
  });
  const userFavourites = new Set(user?.favourites.map((e) => e.id));
  const dataFiltered = data?.map((e) => ({
    ...e,
    isFavourated: userFavourites.has(e.id) || false,
    createdAt: e.createdAt.toDateString(),
    reviews: e.reservations.map((e) => e.review?.stars!).filter((e) => e && e),
  }));
  return dataFiltered;
};
export const getListingsFavourated = async () => {
  const user = await currentUserDb();

  const data =
    user &&
    (await prismadb.listing.findMany({
      take: 10,
      where: { favouritedBy: { some: { id: user.id } } },
      orderBy: { createdAt: "desc" },
      include: {
        reservations: { select: { review: { select: { stars: true } } } },
      },
    }));
  const userFavourites = new Set(user?.favourites.map((e) => e.id));
  const dataFiltered = data?.map((e) => ({
    ...e,
    isFavourated: userFavourites.has(e.id) || false,
    createdAt: e.createdAt.toDateString(),
    reviews: e.reservations.map((e) => e.review?.stars!),
  }));
  return dataFiltered;
};
export const getListingById = async (id: string) => {
  const user = await currentUserDb();

  const data = await prismadb.listing.findFirst({
    where: { id },
    include: {
      owner: { select: { username: true, imageUrl: true } },
      reservations: { take: 1, orderBy: { createdAt: "desc" } },
    },
  });

  const reviews = await prismadb.review.findMany({
    where: { reservation: { listingId: id } },
    select: { stars: true, message: true },
  });

  const userFavourites = new Set(user?.favourites.map((e) => e.id));
  const dataReturned: ListingByIdType = {
    ...data!,
    isFavourated: userFavourites.has(data?.id || "") || false,
    owner: { ...data?.owner } as any,
    locationValue: JSON.parse(data?.locationValue || "") as string &
      LocationValueType,
    reviews: reviews.map((e) => e.stars),
  };

  return dataReturned;
};

export const GetReservations = async () => {
  const user = await currentUserDb();
  const data = await prismadb.reservation.findMany({
    where: { ownerId: user?.id },
    include: {
      listing: {
        select: {
          title: true,
          images: true,
          category: true,
          favouritedBy: { select: { id: true } },
          id: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  const userFavourites = new Set(user?.favourites.map((e) => e.id));
  const dataFiltered = data?.map((e) => ({
    ...e,

    listing: {
      ...e.listing,
      isFavourated: userFavourites.has(e.listing.id) || false,
    },
  }));

  return dataFiltered;
};
export const GetOrders = async () => {
  const user = await currentUserDb();
  const data = await prismadb.reservation.findMany({
    where: { listing: { owner: { id: user?.id } } },
    include: {
      listing: {
        select: {
          title: true,
          images: true,
          category: true,
          favouritedBy: { select: { id: true } },
          id: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  const userFavourites = new Set(user?.favourites.map((e) => e.id));
  const dataFiltered = data?.map((e) => ({
    ...e,

    listing: {
      ...e.listing,
      isFavourated: userFavourites.has(e.listing.id) || false,
    },
  }));

  return dataFiltered;
};
export const GetReservationById = async (id: string) => {
  const user = await currentUserDb();
  const data = await prismadb.reservation.findFirst({
    where: { id, ownerId: user?.id },
    include: {
      listing: true,
      review: true,
      owner: { select: { username: true, imageUrl: true } },
    },
  });

  return data;
};
