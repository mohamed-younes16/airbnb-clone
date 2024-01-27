import prismadb from "@/lib/prismabd";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("unauthorized", { status: 401 });
    const { listingId }: { listingId: string } = await req.json();
    const listingFavourite = await prismadb.user.update({
      data: {
        favourites: { connect: { id: listingId } },
      },
      where: { id: userId },
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
    const { userId } = auth();
    if (!userId) return new NextResponse("unauthorized", { status: 401 });
    const { listingId }: { listingId: string } = await req.json();
    const listingFavourite = await prismadb.user.update({
      data: {
        favourites: { disconnect: { id: listingId } },
      },
      where: { id: userId },
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
