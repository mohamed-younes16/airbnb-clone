"use client";
import { Menu, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { ModeToggle } from "../ui/themeButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MenuItem from "./MenuItem";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { User } from "@prisma/client";
import Image from "next/image";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";
import RentModal from "../modals/RentModal";
import { useStore } from "@/hooks/store";
import CliComponent from "../CliComponent";

const Search = ({ userData }: { userData: User | null }) => {
  const [open, setOpen] = useState<"login" | "register" | "">("");
  const [popopen, setpopopen] = useState(false);
  const { setisRentModalOpen } = useStore();

  return (
    <>
      <div className="flexcenter lg:flex-1   gap-6">
        <div className="w-full flex items-center justify-between">
          <div className="flexcenter max-lg:text-sm w-fit whitespace-nowrap px-4 border-foreground/20 font-semibold border py-2 shadow-md transition-all hover:shadow-md cursor-pointer  rounded-full">
            <div className=" transition-all hover:text-main ">Anywhere</div>
            <div className="border-x mx-3 transition-all hover:text-main px-4 border-foreground/30">
              Any week
            </div>
            <div className=" transition-all hover:text-main] ">Add Guests</div>
            <div className="rounded-full p-2  text-sm text-white  ml-2 flexcenter bg-main">
              <SearchIcon strokeWidth={3} className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
      <div className="flexcenter lg:flex-1 gap-4 min-w-[180px]">
        <SignedIn>
          <CliComponent>
            <RentModal />
          </CliComponent>
        </SignedIn>

        <ModeToggle />
        <Popover
          open={popopen}
          onOpenChange={(e) => {
            e && setpopopen(true);
            !e && setpopopen(false);
          }}
        >
          <PopoverTrigger>
            <div
              className="flexcenter relative p-2 transition-all 
           border-foreground/20 font-semibold border   hover:shadow-md cursor-pointer  rounded-full py-2 gap-4"
            >
              <Menu />
          
              {userData ? (
                <Image
                  alt=""
                  src={userData.imageUrl}
                  className="rounded-full  min-h-[30px] min-w-[30px]  "
                  height={30}
                  width={30}
                />
              ) : (
                <Image
                  alt=""
                  src={"/assets/placeholder.jpg"}
                  className="rounded-full   "
                  height={30}
                  width={30}
                />
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="-translate-x-4  p-2">
            {!userData ? (
              <>
                <LoginModal setOpen={setOpen} open={open} />
                <RegisterModal setOpen={setOpen} open={open} />
              </>
            ) : (
              <>
                <MenuItem onclick={() => {}}>
                  <Link className="w-full flex" href={"/profile"}>
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onclick={() => setisRentModalOpen(true)}>
                  AirBnb your Home
                </MenuItem>
              </>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default Search;
