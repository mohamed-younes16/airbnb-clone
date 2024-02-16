import { ThemeProvider } from "@/components/ui/theme-provider";
import { GeistSans } from "geist/font/sans";


import { ReactNode } from "react";
import "./globals.css";
import { Toaster } from "sonner";
import { GeistMono } from "geist/font/mono";

import CheckUser from "@/components/CheckUser";
import getCurrentUser from "@/actions/getCurrentUser";

export const metadata = {
  title: "airbnb-clone",
  description: "airbnb-clone by younes",
};
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cur = await getCurrentUser();

  return (

      <html
        suppressHydrationWarning
        lang="en"
        className={`${GeistSans.variable} ${GeistMono.variable} overflow-x-hidden`}
      >
        <body className=" overflow-x-hidden">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            storageKey="admin-theme"
          >
            <div
              className="  min-h-screen  transition-all 
          bg-cover bg-[url(/assets/bg-light.svg)] max-sm:pb-24  bg-white dark:bg-[url(/assets/dark-bg.svg)]   dark:bg-transparent bg-[#3e3e3efc]
            
          "
            >
              {cur && <CheckUser userData={cur} />}
              <Toaster richColors position="top-center" />
              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>

  );
}
