import getCurrentUser from "@/actions/getCurrentUser";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
export const metadata = {
  title: "airbnb-clone",
  description: "airbnb-clone by younes",
};
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <div>
      {user?.id ? (
        children
      ) : (
        <div className="flexcenter h-[50dvh] flex-col text-center">
          <Heading
            title="Not Logged In "
            description="try Logging in to  access content."
          />
          <ShieldAlert size={40} className=" mt-6" />
          <Button className="mt-8" variant={"outline"}>
                <Link href={"/?redirected=true"}>Go to Login</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
