"use server";
import prismadb from "@/lib/prismabd";
import { currentUser } from "@clerk/nextjs";

export const ignoreKeys = (obj, keysToIgnore) => {
  const newObj = { ...obj };
  keysToIgnore.forEach((key) => delete newObj[key]);
  return newObj;
};

export const currentUserDb = async () => {
  const clerkUser = await currentUser();

  const user = await prismadb.user.findFirst({
    where: { id: clerkUser?.id || "" },
    include: { favourites: { select: { id: true } } },
  });

  return user;
};

export const currentClerkUser = async () => {
  const clerkUser = await currentUser();
  return clerkUser;
};

export const getListings = async () => {
  const user = await currentUserDb();

  const data =
    user &&
    (await prismadb.listing.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
    }));
  const userFavourites = new Set(user?.favourites.map((e) => e.id));
  const dataFiltered = data?.map((e) => ({
    ...e,
    isFavourated: userFavourites.has(e.id) || false,
    createdAt: e.createdAt.toDateString(),
  }));
  return dataFiltered;
};
