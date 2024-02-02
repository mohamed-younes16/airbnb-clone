import { GetReservations } from "@/actions";
import ListingsGrid from "@/components/ListingsGrid";
import React from "react";

const page = async () => {
  const reservations = await GetReservations();
  const listingReserved = reservations.map((e) => ({
    ...e.listing,
    totalPrice: e.totalPrice,
    createdAt: e.createdAt,
    isActive:
      e.startDate.getTime() < new Date().getTime() &&
      e.endDate.getTime() > new Date().getTime(),
    id: e.id,
    isEnded: e.endDate.getTime() < new Date().getTime(),
  }));
  return (
    <div>
      <ListingsGrid type="trip" listings={listingReserved} />
    </div>
  );
};

export default page;
