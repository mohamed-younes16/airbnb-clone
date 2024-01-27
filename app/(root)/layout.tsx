import NavBar from "@/components/navbar/NavBar";
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
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
