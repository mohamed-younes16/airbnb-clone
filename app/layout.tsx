import { ThemeProvider } from "@/components/ui/theme-provider";
import { GeistSans } from "geist/font/sans";
import { ClerkProvider, currentUser } from "@clerk/nextjs";
import "@radix-ui/themes/styles.css";
import { ReactNode } from "react";
import "./globals.css";
import { Toaster } from "sonner";
import { GeistMono } from "geist/font/mono";
import { currentUserDb } from "@/actions";
import CheckUser from "@/components/CheckUser";

export const metadata = {
  title: "airbnb-clone",
  description: "airbnb-clone by younes",
};
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const clerkUser = await currentUser();
  const user = await currentUserDb();

  return (
    <ClerkProvider >
      <html
        suppressHydrationWarning
        lang="en"
        className={`${GeistSans.variable} ${GeistMono.variable} overflow-x-hidden`}
      >
        <body className=" overflow-x-hidden">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            storageKey="admin-theme"
          >
            <div
              className="  min-h-screen  transition-all 
          bg-cover bg-[url(/assets/bg-light.svg)] max-sm:pb-24  bg-white dark:bg-[url(/assets/dark-bg.svg)]   dark:bg-transparent bg-[#3e3e3efc]
            
          "
            >
              {clerkUser ? <CheckUser userData={user} /> : null}
              <Toaster richColors position="top-center" />
              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
