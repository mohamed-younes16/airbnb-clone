"use client";
import { useClerk } from "@clerk/clerk-react";
import { SignedIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const SignOutButton = ({ children }: { children: ReactNode }) => {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <SignedIn>
      <button onClick={() => signOut(() => router.push("/"))}>
        {children}{" "}
      </button>
    </SignedIn>
  );
};

export default SignOutButton;
