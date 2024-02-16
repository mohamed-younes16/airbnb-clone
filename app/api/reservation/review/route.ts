
import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismabd";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) return new NextResponse("unauthorized", { status: 401 });
    const data: { message: string; stars: number; reservationId: string } =
      await req.json();

    const reservation = await prismadb.reservation.update({
      where: { id: data.reservationId, ownerId: user.id },
      data: {
        review: {
          upsert: {
            create: { message: data.message, stars: data.stars },
            update: { message: data.message, stars: data.stars },
            where: { reservationId: data.reservationId },
          },
        },
      },
    });

    return NextResponse.json(
      { message: "reviewed successfully ✅", reservation },
      { status: 200 }
    );
  } catch (error) {
    console.log(error, "##########review_create###############");
    return NextResponse.json({ message: "error in server" }, { status: 500 });
  }
}
