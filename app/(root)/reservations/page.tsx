import { GetOrders } from "@/actions";
import Heading from "@/components/Heading";
import ListingsGrid from "@/components/ListingsGrid";
import React from "react";
import { TbZoomCancel } from "react-icons/tb";

const page = async () => {
  const reservations = await GetOrders();
  const orders = reservations.map((e) => ({
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
    <div className=" px-4 "> 
          <Heading title="Orders Page" description="Monitor your orders list ." />
      {orders?.length == 0 && (
        <>
          <div className="flexcenter h-[50dvh] flex-col text-center">
            <Heading title="No Orders Found" description="" />
            <TbZoomCancel size={40} className=" mt-6" />
          </div>
        </>
      )}
      <ListingsGrid type="order" listings={orders} />
    </div>
  );
};

export default page;
