import Image from "next/image";
import Search from "./Search";
import { currentUserDb } from "@/actions";
import Categories from "./Categories";

const NavBar = async () => {
  
  const currentUserData = await currentUserDb();

  return (
    <>
      <div
        className="   sticky 
        transition-all w-full left-0  overflow-auto  z-20  rounded-b-md top-0 dark:bg-zinc-800 bg-white p-4 
    "
      >
        <div className="h-full">
          <div className="flex justify-between items-center">
            <div className="flex lg:flex-1 items-center gap-6 ">
              <Image
                alt=""
                height={30}
                className="w-[120px]  bg-cover  max-lg:hidden "
                width={100}
                src={"/assets/logo.png"}
              />
              <Image
                alt=""
                height={30}
                className="min-w-[40px] h-[40px] bg-cover lg:hidden"
                width={100}
                src={"/assets/icon.svg"}
              />
            </div>
            <Search userData={currentUserData!} />
          </div>
          <Categories />
        </div>
      </div>
    </>
  );
};

export default NavBar;
