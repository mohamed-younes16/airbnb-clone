import getCurrentUser from "@/actions/getCurrentUser";
import LoginWarning from "@/components/LoginWarning";
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
        <LoginWarning
          title="Not Logged In"
          description="try Logging in to access content."
        />
      )}
    </div>
  );
}
