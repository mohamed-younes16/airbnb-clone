import { getListings } from "@/actions";
import Heading from "@/components/Heading";
import ProductsGrid from "@/components/ListingsGrid";

import { Button } from "@/components/ui/button";

import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    guests: string;
    continent: string;
    baths: string;
    category: string;
  };
}) {
  const fetchedData =
    (await getListings({
      bathsCount: +searchParams?.baths || 1,
      guestCount: +searchParams?.guests || 1,
      continent: searchParams.continent || "",
      category: searchParams.category || "",
    })) || [];

  return (
    <>
      <div className=" h-[150dvh] ">
        {fetchedData?.length == 0 && (
          <>
            <div className="flexcenter flex-col text-center">
              <Heading
                title="No Listing Found "
                description="try changing the filters "
              />
              <Button className="mt-8" variant={"outline"}>
                <Link href={"/"}>Remove all Filters</Link>
              </Button>
            </div>
          </>
        )}

        {fetchedData ? (
          <ProductsGrid type="listing" listings={fetchedData} />
        ) : null}
      </div>
    </>
  );
}
