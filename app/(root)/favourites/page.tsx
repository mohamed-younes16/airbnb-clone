import { getListings, getListingsFavourated } from "@/actions";
import Heading from "@/components/Heading";
import ProductsGrid from "@/components/ListingsGrid";
import { TbZoomCancel } from "react-icons/tb";

export default async function Home() {
  const fetchedData = (await getListingsFavourated()) || [];

  return (
    <>
      {fetchedData?.length == 0 && (
        <>
          <div className="flexcenter h-[50dvh] flex-col text-center">
            <Heading
              title="No Favourites Found"
              description="try Adding some favourites to your list later ."
            />
            <TbZoomCancel size={40}  className=" mt-6"/>
          </div>
        </>
      )}

      {fetchedData ? (
        <ProductsGrid type="listing" listings={fetchedData} />
      ) : null}
    </>
  );
}
