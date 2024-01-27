import prismadb from "@/lib/prismabd";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    console.log();
    const user = await currentUser();
    if (!user) return new NextResponse("unauthorized", { status: 401 });

    const data: {
      name: string;
      username: string;
      bio: string;
      imageUrl: string;
    } = await req.json();
    if (!data) return new NextResponse("no Name Provided", { status: 401 });

    try {
      const userupsert = await prismadb.user.upsert({
        create: { id: user.id, ...data, onboarded: true ,},
        update: { id: user.id, ...data, onboarded: true },
        where: { id: user.id },
      });
      console.log(userupsert);
    } catch (error) {}
    return NextResponse.json({ message: "account is ready" }, { status: 200 });
  } catch (error) {
    console.log(error, "##########authorization###############");
    return NextResponse.json(
      { message: "error in server", },
      { status: 500 }
    );
  }
}
