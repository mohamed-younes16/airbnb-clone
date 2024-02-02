import { ReservationInputType } from "@/index";
import prismadb from "@/lib/prismabd";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) return new NextResponse("unauthorized", { status: 401 });
    const data: ReservationInputType = await req.json();
    console.log(data);
    const reservation = await prismadb.reservation.create({
      data: {
        ...data,
        ownerId: user.id,
      },
    });

    return NextResponse.json(
      { message: "reserved successfully ✅", reservation },
      { status: 200 }
    );
  } catch (error) {
    console.log(error, "##########reservation_create###############");
    return NextResponse.json({ message: "error in server" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await currentUser();

    if (!user) return new NextResponse("unauthorized", { status: 401 });
    const { id }: { id: string } = await req.json();

    const reservation = await prismadb.reservation.deleteMany({
      where: {
        id,
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
