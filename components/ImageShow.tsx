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

  const ImagesShowComponent = React.memo(
    ({ isInDrawer }: { isInDrawer: boolean }) => {
      const imagesToshow = images?.slice(0, isInDrawer ? images.length : 5);
      return (
        <div
          className={`flex rounded-2xl max-md:flex-col ${
            isInDrawer
              ? "flex-col !h-full"
              : " max-lg:h-[30dvh] max-md:h-full max-xl:h-[40dvh]"
          } overflow-hidden w-full
         h-[55dvh] mx-auto max-w-7xl gap-2`}
        >
          {imagesToshow.map((e, i) => (
            <>
              {i === 0 ? (
                <div
                  key={e}
                  className={`md:basis-2/4  ${
                    isInDrawer && ""
                  }  relative transition-all hover:brightness-75`}
                >
                  <ImageContainer src={e} />
                </div>
              ) : (
                ((imagesToshow[i + (i - 1)] && imagesToshow[i * 2]) ||
                  imagesToshow[i + (i - 1)]) && (
                  <div
                    key={e}
                    className={`basis-1/4 h-full flex justify-start ${isInDrawer && "!flex-row"} md:flex-col gap-2`}
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
      );
    }
  );

  return (
    <CliComponent>
      <Drawer>
        <DrawerTrigger
          asChild
          className=" w-full cursor-pointer  relative  h-[55dvh] max-lg:h-[30dvh] max-xl:h-[40dvh] mx-auto rounded-xl overflow-hidden"
        >
          <div>
            {isBigScreen ? (
              <ImagesShowComponent isInDrawer={false} />
            ) : (
              <ImageContainer src={images[0]} />
            )}

            <Button
              variant={"secondary"}
              className="absolute bottom-2 right-2 rounded-full"
            >
              1/{images.length}
            </Button>
          </div>
        </DrawerTrigger>
        <DrawerContent className=" px-3 h-[90dvh]">
          <ScrollArea className=" overflow-auto">
            <DrawerHeader>
              <DrawerTitle>Images</DrawerTitle>
              <DrawerDescription>images gallery</DrawerDescription>
            </DrawerHeader>
            <ImagesShowComponent isInDrawer={true} />
          </ScrollArea>{" "}
        </DrawerContent>
      </Drawer>
    </CliComponent>
  );
};

export default ImagesShow;
