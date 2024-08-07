import { getListingById } from "@/actions";
import Heading from "@/components/Heading";
import Favourite from "@/components/Favourite";

import { DatePickerWithRange } from "@/components/inputs/DatePickerWithRange";
import ListingShowCase from "@/components/ListingShowCase";
import ImagesShow from "@/components/ImageShow";
import { Separator } from "@/components/ui/separator";
import getCurrentUser from "@/actions/getCurrentUser";
import LoginWarning from "@/components/LoginWarning";

const page = async ({
  params: { listingId },
}: {
  params: { listingId: string };
}) => {
  const listing = await getListingById(listingId);
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
                listingId={listingId}
              />
            )}
          </div>
          <div className="  h-[55dvh] max-lg:h-[30dvh] max-xl:h-[40dvh]">
            <ImagesShow images={images || []} />
          </div>
          <Separator className="my-4" />
          <div className="flex flex-wrap gap-2 mt-8 ">
            <div className="flex-1 text-nowrap">
              <ListingShowCase listing={listing} />
            </div>{" "}
            <div className="flex-1 flex h-fit justify-center">
              {!user?.id ? (
                <LoginWarning
                  title="Not Logged In"
                  description="try Logging in to reserve."
                />
              ) : listing.ownerId !== user?.id && !!user?.id ? (
                <DatePickerWithRange
                  fromDate={fromDate}
                  listingId={listingId}
                  price={listing.price || 0}
                />
              ) : null}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default page;
