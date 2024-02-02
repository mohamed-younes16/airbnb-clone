import prismadb from "@/lib/prismabd";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) return new NextResponse("unauthorized", { status: 401 });
    const data: ListingType = await req.json();
    const listingCreation = await prismadb.listing.create({
      data: {
        ...data,
        ownerId: user.id,
        price: +data.price,
        locationValue: JSON.stringify(data.locationValue),
      },
    });

    return NextResponse.json(
      { message: "Listing  Create successfully ✅", listingCreation },
      { status: 200 }
    );
  } catch (error) {
    console.log(error, "##########listing_create###############");
    return NextResponse.json(
      { message: "error in server", },
      { status: 500 }
    );
  }
}
