import { GetReservations } from "@/actions";
import Heading from "@/components/Heading";
import ListingsGrid from "@/components/ListingsGrid";
import React from "react";
import { TbZoomCancel } from "react-icons/tb";

const page = async () => {
  const reservations = await GetReservations();
  const trips = reservations.map((e) => ({
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
      {trips?.length == 0 && (
        <>
          <div className="flexcenter h-[50dvh] flex-col text-center">
            <Heading
              title="No Trips Found"
              description="try getting some trips to your list later ."
            />
            <TbZoomCancel size={40} className=" mt-6" />
          </div>
        </>
      )}
      <ListingsGrid type="trip" listings={trips} />
    </div>
  );
};

export default page;
