import { currentUserDb, getListings } from "@/actions";
import Heading from "@/components/Heading";
import ProductsGrid from "@/components/ListingsGrid";
import NavBar from "@/components/navbar/NavBar";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export default async function Home() {
  const fetchedData = (await getListings()) || [];
  const user = await currentUserDb();

  return (
    <>
      <NavBar />
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

        {fetchedData ? <ProductsGrid listings={fetchedData} /> : null}
      </div>
    </>
  );
}
