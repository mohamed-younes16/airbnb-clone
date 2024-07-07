import React from "react";
import Heading from "./Heading";
import { ShieldAlert } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const LoginWarning = ({
    title="",
    description="",
  }: {
    title: string;
    description: string;
  }) => {
  return (
    <div className="flexcenter h-[50dvh] flex-col text-center">
      <Heading
        title={title}
        description={description}
      />
      <ShieldAlert size={40} className=" mt-6" />
      <Button className="mt-8" variant={"outline"}>
        <Link href={"/?redirected=true"}>Go to Login</Link>
      </Button>
    </div>
  );
};

export default LoginWarning;
