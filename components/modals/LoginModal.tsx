"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import MenuItem from "../navbar/MenuItem";
import { AuthenticationModalType } from "@/index";
import { useStore } from "@/hooks/store";
import RegisterForm from "../forms/RegisterForm";
const LoginModal = ({ setOpen, open }: AuthenticationModalType) => {
  const { isLoginModalOpen } = useStore();
  return (
    <Dialog
      open={open === "login" || isLoginModalOpen}
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

      
         <RegisterForm type="login" />
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
