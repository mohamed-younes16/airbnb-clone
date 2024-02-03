import "@uploadthing/react/styles.css";

import { HomeIcon, LucideLogOut } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import ProfileForm from "@/components/forms/ProfileForm";
import TooltipComp from "@/components/ui/TooltipComp";
import { currentUserDb } from "@/actions";
import SignOutButton from "@/components/inputs/SignOutButton";

const Page = async () => {
  const CurrentUserData = await currentUserDb();

  return (
    <>
      <div
        className="fixed inset-0  flexcenter left-0 top-0  text-black  
    dark:text-white
    min-h-screen dark:bg-[url(/assets/magicdark.svg)] transition-all 
    bg-cover"
      >
        <div className=" w-[80dvw]  p-4 rounded-2xl  mt-6 border-neutral-600 border backdrop-blur-md ">
          <div className="flex items-center  gap-6">
            <div className=" flexcenter  gap-4 ">
              <TooltipComp hoverText="Log-out">
             
                  <SignOutButton>
                    <LucideLogOut className="h-8 w-8 " />
                  </SignOutButton>
                
              </TooltipComp>
            </div>

            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger>
                  <Link href={"/"} aria-label="redirect to profile page ">
                    <HomeIcon className="h-10 w-10 " />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Main Page</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <ProfileForm userData={CurrentUserData! || null} />
        </div>
      </div>
    </>
  );
};

export default Page;
