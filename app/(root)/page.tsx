import { getListings } from "@/actions";
import getCurrentUser from "@/actions/getCurrentUser";
import Heading from "@/components/Heading";
import ProductsGrid from "@/components/ListingsGrid";
import PaginationComponent from "@/components/Pagination";

import { Button } from "@/components/ui/button";
import prismadb from "@/lib/prismabd";

import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    guests: string;
    continent: string;
    baths: string;
    category: string;
    page: string;
  };
}) {
  const count = await prismadb.listing.count({
    skip: +searchParams.page  || 0,
  });

  const fetchedData =
    (await getListings({
      bathsCount: +searchParams?.baths || 1,
      guestCount: +searchParams?.guests || 1,
      continent: searchParams.continent || "",
      category: searchParams.category || "",
      start: +searchParams.page  || 0,
    })) || [];
  const user = await getCurrentUser();
  return (
    <>
      <div className=" min-h-[100dvh] max-md:pb-28 ">
        {fetchedData?.length == 0 ? (
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
        ) : (
          <div className="flex flex-col justify-between ">
            <ProductsGrid
              loggedIn={user?.onboarded || false}
              type="listing"
              listings={fetchedData}
            />
           
          </div>
        )}   <div className="mt-6">
                <PaginationComponent count={count} />
              </div>
      </div>
    </>
  );
}
