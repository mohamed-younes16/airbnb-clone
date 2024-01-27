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
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion as m } from "framer-motion";
import { Listing } from "@prisma/client";
import Favourite from "./Favourite";

const ListingsGrid = ({
  listings,
}: {
  listings: FetchedListingType[];
}) => {
    
  return (
    <div className=" w-full">
      <div
        className="max-md:px-3 px-[40px] grid max-md:w-fit max-md:mx-auto 
      mt-6 gap-6 grid-cols-[repeat(auto-fill_,_minmax(300px_,1fr))] "
      >
        {listings.map((e, i) => (
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
            <Card className="w-[350px] overflow-hidden">
              <CardContent
                className="h-[250px] group  py-6 !px-0 mb-6
               rounded-xl overflow-hidden relative"
              >
                <Carousel className="w-[90%] relative overflow-hidden rounded-xl mx-auto">
                  <div className="absolute top-1 z-10 right-1">
                    <Favourite isFavour={e.isFavourated} listingId={e.id} />
                  </div>
                  <CarouselContent className=" rounded-xl">
                    {e.images.map((el) => (
                      <CarouselItem
                        className="ml-2 p-0 group rounded-xl overflow-hidden"
                        key={el}
                      >
                        <Image
                          alt={e.id}
                          className="object-cover group-hover:scale-110
                                  transition-all rounded-xl !w-full !h-full "
                          src={el}
                          height={50}
                          width={100}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-0  " />
                  <CarouselNext className="right-0  " />
                </Carousel>

                {/*                
                <div className="h-full rounded-xl w-full overflow-hidden">
                  <Image
                    alt={e.id}
                    className="object-cover group-hover:scale-110
                     transition-all rounded-xl !w-full !h-full"
                    src={e.images[0]}
                    height={50}
                    width={100}
                  />
                </div> */}
              </CardContent>
              <Link className="block px-6" href={`/listing/${e.id}`}>
                <div className="flex items-center justify-between w-full">
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
                  <div className="flexcenter gap-1">
                    <StarIcon className="fill-foreground  h-4 w-4" />
                    <span className="">
                      {Math.max(Math.random() * 5, 3).toFixed(2)}{" "}
                    </span>
                  </div>
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
                    {formatedPrice(e.price)}
                    <span className=" text-neutral-500   !font-normal">
                      per Night
                    </span>
                  </m.div>
                </div>
              </Link>
              <CardFooter className="flex-col items-start gap-2">
                <Link href={`/listing/${e.id}`}>
                  {" "}
                  <Button>Check it Out</Button>
                </Link>
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
                <span> Created At : </span>  {e.createdAt}
                </m.div>
              </CardFooter>
            </Card>
          </m.div>
        ))}
      </div>
    </div>
  );
};

export default ListingsGrid;
