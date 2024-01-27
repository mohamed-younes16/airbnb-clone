import { getListingById } from "@/actions";
import Heading from "@/components/Heading";
import React from "react";

const page = async ({
  params: { listingId },
}: {
  params: { listingId: string };
}) => {
  const listing = await getListingById(listingId);
  return (
    <div>
      {listing !== null && (
        <>
          <Heading
            title={listing.title || ""}
            description={listing.category || ""}
          />
        </>
      )}
    </div>
  );
};

export default page;
