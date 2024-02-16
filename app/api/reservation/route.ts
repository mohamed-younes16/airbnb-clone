import getCurrentUser from "@/actions/getCurrentUser";
import { ReservationInputType } from "@/index";
import prismadb from "@/lib/prismabd";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) return new NextResponse("unauthorized", { status: 401 });
    const data: ReservationInputType = await req.json();

    const isUserListing = await prismadb.listing.findFirst({
      where: { ownerId: user.id },
    });
 
    if (!isUserListing) {
      const reservation = await prismadb.reservation.create({
        data: {
          ...data,
          ownerId: user.id,
        },
      });

      return NextResponse.json(
        { message: "reserved successfully ✅", reservation },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Reservation unauthorized ❌" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error, "##########reservation_create###############");
    return NextResponse.json({ message: "error in server" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) return new NextResponse("unauthorized", { status: 401 });
    const { id, userType }: { id: string; userType: "seller" | "buyer" } =
      await req.json();
    if (!(userType === "buyer" || userType === "seller"))
      return new NextResponse("unauthorized action", { status: 401 });
    const query =
      userType == "buyer"
        ? {
            ownerId: user.id,
          }
        : userType === "seller"
        ? {
            listing: { ownerId: user.id },
          }
        : null;
    const reservation = await prismadb.reservation.deleteMany({
      where: {
        id,
        ...query,
      },
    });

    return NextResponse.json(
      { message: "deleted successfully ✅", reservation },
      { status: 200 }
    );
  } catch (error) {
    console.log(error, "##########reservation_create###############");
    return NextResponse.json({ message: "error in server" }, { status: 500 });
  }
}
