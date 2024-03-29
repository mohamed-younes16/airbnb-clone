import { getListingById } from "@/actions";
import Heading from "@/components/Heading";
import Favourite from "@/components/Favourite";

import { DatePickerWithRange } from "@/components/inputs/DatePickerWithRange";
import ListingShowCase from "@/components/ListingShowCase";
import ImagesShow from "@/components/ImageShow";
import getCurrentUser from "@/actions/getCurrentUser";

const page = async ({
  params: { favouriteId },
}: {
  params: { favouriteId: string };
}) => {
  const listing = await getListingById(favouriteId);
  const images = listing?.images;
  const user = await getCurrentUser();
  const fromDate =
    listing.reservations &&
    listing.reservations[0] &&
    listing?.reservations[0].endDate;

  return (
    <div className="px-10 max-md:px-4">
      {listing !== null && (
        <>
          <div className="flex mb-8 justify-between">
            <Heading
              title={listing.title || ""}
              description={listing.category || ""}
            />
            {user && (
              <Favourite
                isFavour={listing.isFavourated}
                listingId={favouriteId}
              />
            )}
          </div>
          <div className="  h-[55dvh] max-lg:h-[30dvh] max-xl:h-[40dvh]">
            <ImagesShow images={images || []} />
          </div>

          <div className="flex gap-2 mt-8 ">
            <ListingShowCase listing={listing} />
            <div>
              <DatePickerWithRange
                fromDate={fromDate}
                listingId={favouriteId}
                price={listing.price || 0}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default page;
