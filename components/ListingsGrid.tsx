"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatedPrice } from "@/utils";
import { Loader2, StarIcon } from "lucide-react";
import Link from "next/link";
import { motion as m } from "framer-motion";
import Favourite from "./Favourite";
import ImageContainer from "./ImageContainer";
import React, { useState } from "react";
import { FetchedListingType, FetchedTripsType } from "..";
import { Badge } from "./ui/badge";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SignedIn } from "@clerk/nextjs";

const ListingsGrid = ({
  listings,
  type,
}:
  | {
      listings: FetchedListingType[];
      type: "listing";
    }
  | {
      listings: FetchedTripsType[];
      type: "trip" | "order";
    }) => {
  const router = useRouter();
  const [loading, setIsLoading] = useState("");
  const handleClick = async (id: string) => {
    setIsLoading(id);
    try {
      const adding = axios.delete(`/api/reservation`, {
        data: {
          id,
          userType: type == "order" ? "seller" : type === "trip" ? "buyer" : "",
        },
      });
      adding
        .then(({ data: { message } }: { data: { message: string } }) => {
          toast.dismiss();
          toast.message(message);
          router.refresh();
        })
        .catch((e) => {
          toast.dismiss();
          toast.error(e.response.data.message || "Error Happend");
          console.log(e);
        })
        .finally(() => setIsLoading(""));
      toast.dismiss();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" w-full">
      <div
        className="max-md:px-3 px-[40px] grid max-md:w-fit max-md:mx-auto 
      mt-6 gap-6 grid-cols-[repeat(auto-fill_,_minmax(300px_,1fr))] "
      >
        {listings.map((e, i: number) => (
          <m.div
            key={i}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.15,
              duration: 0.5,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            initial={{ opacity: 0, y: 50 }}
          >
            <Card className="w-[350px] ">
              <CardContent
                className=" group pb-8 py-6 !px-0 mb-2
               rounded-xl  relative"
              >
                <Carousel className="w-[90%] relative overflow-hidden rounded-xl mx-auto">
                  <SignedIn>
                    {type !== "order" && (
                      <div className="absolute top-1 z-10 right-1">
                        <Favourite isFavour={e.isFavourated} listingId={e.id} />
                      </div>
                    )}
                  </SignedIn>
                  <CarouselContent className=" rounded-2xl ">
                    {e.images.map((el) => (
                      <CarouselItem
                        className="ml-2 p-0 rounded-xl overflow-hidden group "
                        key={el}
                      >
                        <div
                          className="object-cover group-hover:scale-110 rounded-xl
                                  transition-all max-h-[230px] h-[230px]  overflow-hidden !w-full  "
                        >
                          <ImageContainer src={el} />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-0  " />
                  <CarouselNext className="right-0  " />
                </Carousel>
              </CardContent>
              <Link
                className="block px-6 "
                href={`/${
                  type == "listing"
                    ? "listing"
                    : type === "trip"
                    ? "trips"
                    : "reservations"
                }/${e.id}`}
              >
                <div className="flex items-center justify-between w*full">
                  <m.p
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.3 + 0.3,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    className="font-semibold"
                    initial={{ opacity: 0, x: 100 }}
                  >
                    {" "}
                    {e.title}
                  </m.p>
                  {type === "listing" && (
                    <div className="flexcenter gap-1">
                      <StarIcon className="fill-foreground  h-4 w-4" />
                      <span suppressHydrationWarning className="">
                        {(
                          e.reviews.reduce((a, b) => a + b, 0) /
                          e.reviews.length
                        ).toFixed(1)}{" "}
                      </span>
                    </div>
                  )}
                </div>
                <m.div
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.3 + 0.3,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  className=" text-neutral-500   flex gap-1"
                  initial={{ opacity: 0, x: -100 }}
                >
                  {e.category}
                </m.div>

                <div className="my-2">
                  <m.div
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.3 + 0.3,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    className="font-bold flex gap-1"
                    initial={{ opacity: 0, x: -100 }}
                  >
                    {type === "listing" ? (
                      <>
                        {formatedPrice(e.price)}
                        <span className=" text-neutral-500   !font-normal">
                          per Night
                        </span>
                      </>
                    ) : (
                      <>
                        <span>Total Price :</span>
                        {formatedPrice(e.totalPrice)}
                      </>
                    )}
                  </m.div>
                </div>
              </Link>

              <CardFooter className="flex-col items-start gap-2">
                {type === "listing" && (
                  <Link href={`/listing/${e.id}`}>
                    {" "}
                    <Button>Check it Out</Button>
                  </Link>
                )}
                <m.div
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.3 + 0.3,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  className=" text-neutral-500   flex gap-1"
                  initial={{ opacity: 0, x: -100 }}
                >
                  {type === "listing" ? (
                    <>
                      <span> Created At : </span> {e.createdAt}
                    </>
                  ) : type === "trip" || type === "order" ? (
                    <>
                      <span> Reserved At : </span> {e.createdAt.toDateString()}
                    </>
                  ) : null}
                </m.div>
                {type === "trip" || type === "order" ? (
                  <Button
                    disabled={loading.length > 0}
                    onClick={async () => {
                      handleClick(e.id);
                    }}
                    className="bg-main hover:text-background text-white w-full font-bold mt-8"
                  >
                    {loading === e.id ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Delete Trip"
                    )}
                  </Button>
                ) : null}
                {type === "trip" ||
                  (type === "order" && (
                    <>
                      {e.isActive ? (
                        <Badge className="bg-green-600">Trip in Progress</Badge>
                      ) : !e.isActive && !e.isEnded ? (
                        <Badge className=" bg-yellow-400">
                          Trip Not Started
                        </Badge>
                      ) : !e.isActive && e.isEnded ? (
                        <Badge className=" bg-orange-500">Trip ended</Badge>
                      ) : null}
                    </>
                  ))}
              </CardFooter>
            </Card>
          </m.div>
        ))}
      </div>
    </div>
  );
};

export default ListingsGrid;
