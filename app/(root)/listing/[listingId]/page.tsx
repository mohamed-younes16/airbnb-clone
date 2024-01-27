import { getListingById } from "@/actions";
import Heading from "@/components/Heading";
import { Loader, Star } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";
import { motion as m } from "framer-motion";
import ImageContainer from "@/components/ImageContainer";
import Link from "next/link";
import Favourite from "@/components/Favourite";
import ImagesShow from "./components/ImageShow";

import CategoryInput from "@/components/inputs/CategoryInput";
import { categoriesList } from "@/components/navbar/NavBar";
import Map from "@/components/Map";
import { LatLngExpression } from "leaflet";

const page = async ({
  params: { listingId },
}: {
  params: { listingId: string };
}) => {
  const listing = await getListingById(listingId);
  const images = listing?.images;
  const categorie = categoriesList.find(
    (e) => e.label.toLocaleLowerCase() === listing.category?.toLocaleLowerCase()
  );
  console.log(listing);

  return (
    <div className="px-10">
      {listing !== null && (
        <>
          <div className="flex mb-8 justify-between">
            <Heading
              title={listing.title || ""}
              description={listing.category || ""}
            />
            <Favourite isFavour={listing.isFavourated} listingId={listingId} />
          </div>
          <div className="  h-[55dvh] max-lg:h-[30dvh] max-xl:h-[40dvh]">
            <ImagesShow images={images || []} />
          </div>

          <div className="flex gap-2 mt-8 ">
            <div className=" space-y-2">
              <p className=" text-2xl font-semibold">{listing.title}</p>
              <div className="flex items-center text-lg gap-2">
                <span>Guests: {listing.guestCount}</span>
                <span>Rooms: {listing.roomCount}</span>
                <span>Bathrooms: {listing.bathroomCount}</span>
              </div>
              <div className="flex  items-center gap-2">
                <Star className=" fill-foreground " />
                <Link
                  className=" flexcenter font-semibold gap-1 underline"
                  href={`/listing/${listingId}/reviews`}
                >
                  <span>{listing.reviews} </span>
                  Review
                </Link>
              </div>
              <div className="border-y border-foreground/40 !my-10 py-6 flex items-center gap-6">
                <div className="rounded-full overflow-hidden w-10 h-10">
                  <ImageContainer src={listing.owner.imageUrl || ""} />
                </div>
                <div>
                  <p className="font-semibold text-xl">
                    Hosted By {listing.owner.username}
                  </p>
                </div>
              </div>
              <div className="">
                {categorie && (
                  <CategoryInput
                    icon={categorie?.icon}
                    active={false}
                    label={categorie.label}
                    description={categorie.description}
                  />
                )}
              </div>

              {listing.locationValue.latlang && (<>
              <Heading title="The place location  " description="Here where you will find it"/>
               <Map
                  center={listing.locationValue.latlang as LatLngExpression}
                />
              </>
               
              )}
            </div>
            <div></div>
          </div>
        </>
      )}
    </div>
  );
};

export default page;
