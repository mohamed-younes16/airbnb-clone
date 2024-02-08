"use client";
import { SignUp } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import MenuItem from "../navbar/MenuItem";
import { AuthenticationModalType } from "@/index";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

const RegisterModal = ({ open, setOpen }: AuthenticationModalType) => {
  const { theme } = useTheme();
  const themeOpts = theme == "light" ? {} : { baseTheme: dark };
  return (
    <Dialog
      open={open === "register"}
      onOpenChange={(e) => {
        e && setOpen("register");
        !e && setOpen("");
      }}
    >
      <DialogTrigger className=" text-start w-full">
        <MenuItem label="register" onclick={() => {}} />
      </DialogTrigger>
      <DialogContent>
        <div className="flexcenter mb-6 font-semibold text-xl">Register</div>
        <h1 className="text-3xl max-md:text-xl font-bold">
          Register to Airbnb
        </h1>
        <div className="text-foreground/80">Create an Account</div>

        <SignUp
          appearance={{
            elements: {
              card: { width: "100%", margin: 0 },
              rootBox: { width: "100%" },
              formField: { borderRadius: "10px" },
            },
            ...themeOpts,
          }}
        />
        <div className="flex gap-2">
          <p>Already have an account?</p>
          <div
            className="text-main cursor-pointer "
            onClick={() => setOpen("login")}
          >
            Login
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
