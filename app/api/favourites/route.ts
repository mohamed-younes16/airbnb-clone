import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismabd";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const  user = await getCurrentUser();
    if (!user?.id ) return new NextResponse("unauthorized", { status: 401 });
    const { listingId }: { listingId: string } = await req.json();
    const listingFavourite = await prismadb.user.update({
      data: {
        favourites: { connect: { id: listingId } },
      },
      where: { id: user?.id },
      include: { favourites: true },
    });

    return NextResponse.json(
      { message: "added to favourite  ✅", listingFavourite },
      { status: 200 }
    );
  } catch (error) {
    console.log(error, "##########listing_create###############");
    return NextResponse.json({ message: "error in server" }, { status: 500 });
  }
}
export async function DELETE(req: Request) {
  try {
    const  user = await getCurrentUser();
    if (!user?.id) return new NextResponse("unauthorized", { status: 401 });
    const { listingId }: { listingId: string } = await req.json();
    const listingFavourite = await prismadb.user.update({
      data: {
        favourites: { disconnect: { id: listingId } },
      },
      where: { id: user?.id },
      include: { favourites: true },
    });

    return NextResponse.json(
      { message: "deleted from favourite ✅", listingFavourite },
      { status: 200 }
    );
  } catch (error) {
    console.log(error, "##########listing_create###############");
    return NextResponse.json({ message: "error in server" }, { status: 500 });
  }
}
