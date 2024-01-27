"use client";
import CliComponent from "@/components/CliComponent";
import ImageContainer from "@/components/ImageContainer";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { useMediaQuery } from "usehooks-ts";
const ImagesShow = ({ images }: { images: string[] }) => {
  const isBigScreen = useMediaQuery("(min-width: 768px)");

  const imagesToshow = images?.slice(0, isBigScreen ? 5 : images.length);

  const ImagesShowComponent = React.memo(() => (
    <div
      className="flex rounded-2xl max-md:flex-col overflow-hidden w-full
         h-[55dvh] max-lg:h-[30dvh] max-md:h-full max-xl:h-[40dvh] mx-auto max-w-7xl gap-2"
    >
      {imagesToshow.map((e, i) => (
        <>
          {i === 0 ? (
            <div
              key={e}
              className="md:basis-2/4 relative transition-all hover:brightness-75"
            >
              <ImageContainer src={e} />
            </div>
          ) : (
            ((imagesToshow[i + (i - 1)] && imagesToshow[i * 2]) ||
              imagesToshow[i + (i - 1)]) && (
              <div
                key={e}
                className="basis-1/4 h-full flex justify-start md:flex-col gap-2"
              >
                <div className="relative basis-1/2  h-1/2 transition-all  overflow-hidden  hover:brightness-75 w-full">
                  <ImageContainer src={imagesToshow[i + (i - 1)]} />
                </div>
                {imagesToshow[i * 2] && (
                  <div className="relative basis-1/2 transition-all h-1/2  overflow-hidden   hover:brightness-75  w-full">
                    <ImageContainer src={imagesToshow[i * 2]} />
                  </div>
                )}
              </div>
            )
          )}
        </>
      ))}
    </div>
  ));

  return (
    <CliComponent>
      {isBigScreen ? (
        <ImagesShowComponent />
      ) : (
        <div className=" md:hidden">
          <Drawer>
            <DrawerTrigger className=" w-full  relative  h-[55dvh] max-lg:h-[30dvh] max-xl:h-[40dvh] mx-auto rounded-xl overflow-hidden">
              <ImageContainer src={images[0]} />
              <Button
                variant={"secondary"}
                className="absolute bottom-2 right-2 rounded-full"
              >
                1/{images.length}
              </Button>
            </DrawerTrigger>
            <DrawerContent className=" px-3 h-[90dvh]">
              <ScrollArea>
                <DrawerHeader>
                  <DrawerTitle>Images</DrawerTitle>
                  <DrawerDescription>
                    This action cannot be undone.
                  </DrawerDescription>
                </DrawerHeader>
                <ImagesShowComponent />
              </ScrollArea>{" "}
            </DrawerContent>
          </Drawer>
        </div>
      )}
    </CliComponent>
  );
};

export default ImagesShow;
