"use client";
import axios from "axios";
import { Button } from "./ui/button";
import { Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import debounce from "lodash/debounce";
import { useRouter } from "next/navigation";
const Favourite = ({
  listingId,
  isFavour = false,
}: {
  listingId: string;
  isFavour: boolean;
}) => {
  const router = useRouter();
  const [isFavourated, setIsfavourated] = useState<boolean>(isFavour);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClick = debounce(async (action: "add" | "delete") => {
    const actionHandle = () =>
      action === "add" ? setIsfavourated(true) : setIsfavourated(false);

    const adding = isFavourated
      ? axios.delete("/api/favourites", { data: { listingId } })
      : axios.post("/api/favourites", { listingId });
    actionHandle();
    adding
      .then((e) => {
        toast.dismiss();
        actionHandle;
        toast.message(e.data.message);
        router.refresh();
      })
      .catch((e) => {
        toast.dismiss();
        action == "add" ? setIsfavourated(false) : setIsfavourated(true);
        toast.error(e.response.data.message || "Error Happend", {
          invert: true,
        });
        console.log(e);
      })
      .finally(() => setIsLoading(false));
  }, 400);
  return (
    <Button
      variant={"ghost"}
      onClick={() => {
        setIsLoading(true);

        handleClick(isFavourated ? "delete" : "add");
      }}
    >
      {isLoading ? (
        <Loader2 className=" w-6 h-6 animate-spin text-foreground" />
      ) : (
        <Heart
          className={` border-background w-6 h-6 ${
            isFavourated ? "fill-main" : "fill-zinc-700/80 "
          }`}
        />
      )}
    </Button>
  );
};

export default Favourite;
