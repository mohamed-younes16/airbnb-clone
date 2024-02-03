import NavBar from "@/components/navbar/NavBar";
import { ReactNode } from "react";

export const metadata = {
  title: "airbnb-clone",
  description: "airbnb-clone by younes",
};
export default async function RootLayout({
  searchParams,
  children,
}: {
  children: ReactNode;
  searchParams: {
    redirected: string;
  };
}) {

  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
