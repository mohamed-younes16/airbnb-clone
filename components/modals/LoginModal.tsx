"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import MenuItem from "../navbar/MenuItem";
import { SignIn } from "@clerk/nextjs";
import { AuthenticationModalType } from "@/index";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
const LoginModal = ({ setOpen, open }: AuthenticationModalType) => {
  const { theme } = useTheme();
  const themeOpts = theme == "light" ? {} : { baseTheme: dark };
  return (
    <Dialog
      open={open === "login"}
      onOpenChange={(e) => {
        e && setOpen("login");
        !e && setOpen("");
      }}
    >
      <DialogTrigger className=" text-start w-full">
        <MenuItem label="login" onclick={() => {}} />
      </DialogTrigger>
      <DialogContent className=" max-sm:px-4">
        <div className="flexcenter mb-6 font-semibold text-xl">Login</div>
        <h1 className="text-3xl max-md:text-xl font-bold">login to Airbnb</h1>
        <div className="text-foreground/80">login to Account</div>

        <SignIn
          appearance={{
            elements: {
              card: { width: "100%" },
              rootBox: { width: "100%" },
              formField: { borderRadius: "10px" },
            },
            ...themeOpts,
          }}
        />
        <div className="flex gap-2">
          <p>New to AirBnb create an account!</p>
          <div
            className="text-main cursor-pointer "
            onClick={() => setOpen("register")}
          >
            Register
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
