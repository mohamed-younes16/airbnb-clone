"use client";
import {
  ActivityIcon,
  Album,
  Crown,
  Menu,
  PlaneTakeoff,
  SearchIcon,
  User as UserIcon,
} from "lucide-react";
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
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "../ui/separator";
import { FaAirbnb, FaPersonCircleQuestion } from "react-icons/fa6";
import Counter from "../inputs/Counter";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export const NavigationMenuDemo = () => {
  const router = useRouter();
  const params = useSearchParams();
  const currentGuests = +(params?.get("guests") || "1") || 1;
  console.log(currentGuests);
  const [value, setValue] = useState("");
  const [guestsCount, setGuests] = useState(currentGuests || 1);

  const onSearch = () => {
    const query = queryString.parse(params.toString());
    const newquery: any = {
      ...query,
      guests: guestsCount || 1,
    };

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: newquery,
      },
      { skipNull: true }
    );
    router.push(url);
  };
  return (
    <NavigationMenu
      value={value}
      onValueChange={(e) => e.length > 0 && setValue(e)}
    >
      <NavigationMenuList
        className="flexcenter max-lg:text-sm w-fit whitespace-nowrap 
          px-4 border-foreground/20 font-semibold border py-2 shadow-md
           transition-all hover:shadow-md cursor-pointer  rounded-full"
      >
        <NavigationMenuItem value="st" onClick={() => setValue("st")}>
          <NavigationMenuTrigger className="!p-0 ">
            {" "}
            <div className=" transition-all hover:text-main ">Anywhere</div>
          </NavigationMenuTrigger>
          <NavigationMenuContent
            onPointerDownOutside={(e) =>
              e.type == "dismissableLayer.pointerDownOutside" && setValue("")
            }
          >
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <ActivityIcon className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components that you can copy and
                      paste into your apps. Accessible. Customizable. Open
                      Source.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <Counter
                counter={guestsCount}
                title="Guests count"
                description="how many guests can your place have ?"
                icon={<FaPersonCircleQuestion size={25} />}
                max={30}
                onChange={(v) => setGuests(v)}
              />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem value="nd" onClick={() => setValue("nd")}>
          <NavigationMenuTrigger className="!p-0">
            {" "}
            <div className="border-x mx-3 transition-all hover:text-main px-4 border-foreground/30">
              Any week
            </div>
          </NavigationMenuTrigger>
          <NavigationMenuContent
            onPointerDownOutside={(e) =>
              e.type == "dismissableLayer.pointerDownOutside" && setValue("")
            }
          >
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem value="rd" onClick={() => setValue("rd")}>
          <NavigationMenuTrigger className="!p-0">
            <div className=" transition-all hover:text-main ">Add Guests</div>
          </NavigationMenuTrigger>
          <NavigationMenuContent
            onPointerDownOutside={(e) =>
              e.type == "dismissableLayer.pointerDownOutside" && setValue("")
            }
          >
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <div
          onClick={() => onSearch()}
          className="rounded-full p-2 text-sm text-white  ml-6 flexcenter bg-main"
        >
          <SearchIcon strokeWidth={3} className="h-6 w-6" />
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const Search = ({ userData }: { userData: User | null }) => {
  const [open, setOpen] = useState<"login" | "register" | "">("");
  const [popopen, setpopopen] = useState(false);
  const { setisRentModalOpen } = useStore();

  return (
    <>
      <div className="flexcenter lg:flex-1   gap-6">
        <div className="w-full flex items-center justify-between">
          <NavigationMenuDemo />
        </div>
      </div>
      <div className="flexcenter lg:flex-1 gap-4 min-w-[180px]">
        <SignedIn>
          <CliComponent>
            <RentModal />
          </CliComponent>
        </SignedIn>

        <div className="max-md:hidden">
          {" "}
          <ModeToggle />
        </div>
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
                  <Link className="w-full flex gap-2" href={"/profile"}>
                    <UserIcon /> Profile
                  </Link>
                </MenuItem>
                <MenuItem onclick={() => setisRentModalOpen(true)}>
                  <div className="w-full items-center flex gap-2">
                    <FaAirbnb size={25} /> AirBnb your Home
                  </div>
                </MenuItem>
                <MenuItem onclick={() => {}}>
                  <Link className="w-full flex gap-2" href={"/trips"}>
                    <PlaneTakeoff /> Trips
                  </Link>
                </MenuItem>
                <MenuItem onclick={() => {}}>
                  <Link className="w-full flex gap-2" href={"/reservations"}>
                    <Album /> Reservations
                  </Link>
                </MenuItem>
                <MenuItem onclick={() => {}}>
                  <Link className="w-full flex gap-2" href={"/favourites"}>
                    <Crown /> favourites
                  </Link>
                </MenuItem>

                <Separator className="my-4" />

                <MenuItem className="md:hidden">
                  <div className="flex gap-2 items-center">
                    {" "}
                    <ModeToggle>Theme</ModeToggle>
                  </div>
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
