import { Star } from "lucide-react";
import ImageContainer from "@/components/ImageContainer";
import CategoryInput from "@/components/inputs/CategoryInput";
import Map from "@/components/Map";
import { LatLngExpression } from "leaflet";
import Heading from "./Heading";
import { categoriesList } from "./navbar/NavBar";
import { ListingByIdType } from "..";
const ListingShowCase = ({ listing }: { listing: ListingByIdType }) => {
  const categorie = categoriesList.find(
    (e) => e.label.toLocaleLowerCase() === listing.category?.toLocaleLowerCase()
  );

  return (
    <div className=" space-y-2">
      <p className=" text-2xl font-semibold">{listing.title}</p>
      <div className="flex items-center text-lg gap-2">
        <span>Guests: {listing.guestCount}</span>
        <span>Rooms: {listing.roomCount}</span>
        <span>Bathrooms: {listing.bathroomCount}</span>
      </div>
      <div className="flex  items-center gap-2">
        <Star className=" fill-foreground " />
        <span suppressHydrationWarning className="">
                        {(
                          listing.reviews.reduce((a, b) => a + b, 0) /
                          listing.reviews.length
                        ).toFixed(1)}{" "}
                      </span>
        {/* <Link
          className=" flexcenter font-semibold gap-1 underline"
          href={`/listing/${listingId}/reviews`}
        >
          <span>{listing.reviews} </span>
          Review
        </Link> */}
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
      <div>
        {categorie && (
          <CategoryInput
            icon={categorie?.icon}
            active={false}
            label={categorie.label}
            description={categorie.description}
          />
        )}
      </div>

      {listing.locationValue.latlang && (
        <>
          <Heading
            title="The place location  "
            description="Here where you will find it"
          />
          <Map center={listing.locationValue.latlang as LatLngExpression} />
        </>
      )}
    </div>
  );
};

export default ListingShowCase;
