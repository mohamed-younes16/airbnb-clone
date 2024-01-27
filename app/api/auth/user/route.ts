import prismadb from "@/lib/prismabd";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await currentUser();
    console.log(user);
    if (!user) return new NextResponse("unauthorized", { status: 401 });

    const userdata = await prismadb.user.findFirst({
      where: { id: user.id },
    });
    return NextResponse.json(
      { message: "user found ✅", user: userdata },
      { status: 200 }
    );
  } catch (error) {
    console.log(error, "##########user__###############");
    return NextResponse.json({ message: "error in server" }, { status: 500 });
  }
}