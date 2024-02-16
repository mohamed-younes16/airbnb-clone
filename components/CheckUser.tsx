"use client";

import { User } from "@prisma/client";
import { redirect, usePathname } from "next/navigation";
import { FetchedUser } from "..";

const CheckUser = ({ userData }:{userData:FetchedUser}) => {
  const pathName = usePathname();

  if (!userData.onboarded && pathName != "/profile") {
    redirect("/profile");
  }

  return null;
};

export default CheckUser;
