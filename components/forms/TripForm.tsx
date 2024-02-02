"use client";

import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { productSchema } from "@/models/Schemas/Setup";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import axios from "axios";

import { ImagePlusIcon, Loader2, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import Heading from "../Heading";
import Image from "next/image";
import { UploadButton } from "@/utils/uploadthing";
import { Checkbox } from "@/components/ui/checkbox";
import _ from "lodash";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import "@uploadthing/react/styles.css";
import { ignoreKeys } from "@/actions";
import { Review } from "@prisma/client";

const TripForm = ({
  tripId,
  review,

}: {tripId:string,review?:Review}) => {

  const [isSub, setIsSub] = useState(false);
  const [begain, setBegain] = useState(false);
  const [start, setstart] = useState(0);
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
  
    },
  });

  const watchedFormData = form.watch();
  const keysToIgnore = ["createdAt", "updatedAt", "tripId", "id"];
  const initialProduct = {
    // ...ignoreKeys(review, keysToIgnore),

  };

  const isFormDataChanged = !_.isEqual(initialProduct, watchedFormData);

  async function onSubmit(values: z.infer<typeof productSchema>) {
    try {
      const data = {
        ...values,
        price: +values.price,
      };
   

      const adding =axios.post(`/api/trips/${tripId}/review`, data);

      adding
        .then((e) => {
          toast.dismiss();
          setIsSub(false);

          toast.success(e.data.message, { invert: true });

          window.location.assign(`/dashboard/${tripId}/products`);
        })
        .catch((e) => {
          toast.dismiss();
          setIsSub(false);

          toast.error(e.response.data.message || "Error Happend", {
            invert: true,
          });
          console.log(e);
        });
      setIsSub(false);
    } catch (error) {
      setIsSub(false);
      console.log(error);
    }
  }
  return (
    <>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-8">
          <div className="grid grid-cols-3 gap-6 justify-start  w-full ">
            {" "}
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem className=" flex gap-6 col-span-full items-start  flex-wrap ">
                  <FormLabel>image</FormLabel>

                  {field.value.length > 0 && (
                    <Carousel
                      opts={{ startIndex: start }}
                      className="w-full !m-0 max-h-[350px] max-w-lg"
                    >
                      <CarouselContent>
                        {field.value?.map((image) => (
                          <CarouselItem key={image}>
                            <div className="p-1">
                              <Card>
                                <CardContent className="flex max-[500px]:h-[250px] max-md:h-[300px] h-[350px]   items-center justify-center p-6">
                                  <>
                                    <FormLabel
                                      className="  relative 
                           w-full  m-0 h-full
                          bg-zinc-900 rounded-xl  flexcenter "
                                    >
                                      <Trash2
                                        onClick={() => {
                                          const filterd = field.value.filter(
                                            (e) => e !== image
                                          );
                                          field.onChange(filterd);
                                        }}
                                        className="absolute cursor-pointer transition-all  
                      hover:scale-105 bg-red-500 top-0 right-0
                      rounded-md  p-2 h-10 w-10 text-white z-50"
                                      />
                                      <Image
                                        src={image}
                                        className="object-cover rounded-lg"
                                        alt="image of you"
                                        fill
                                      />
                                    </FormLabel>
                                  </>
                                </CardContent>
                              </Card>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  )}

                  <div className="flex !m-0">
                    <UploadButton
                      content={{
                        button: (
                          <div className="flexcenter whitespace-nowrap text-foreground gap-6">
                            {!begain ? (
                              <>
                                <ImagePlusIcon className="" />
                                <p>Upload An Image</p>
                              </>
                            ) : (
                              <Loader2 className="relative z-50 animate-spin" />
                            )}
                          </div>
                        ),
                      }}
                      endpoint="imageUploader"
                      className="items-start"
                      appearance={{
                        button: `bg-border w-52 p-2  text-primary-foreground `,
                      }}
                      onUploadBegin={() => setBegain(true)}
                      onClientUploadComplete={(e) => {
                        setBegain(false);
                        field.onChange(field.value.concat(e?.[0].url!));
                        setstart(form.watch().images.length - 1);
                      }}
                    />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className=" flex flex-col w-full   ">
                  <FormLabel>Name of Product</FormLabel>

                  <FormControl>
                    <Input
                      className="account-form_input "
                      type="text"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={() => (
                <FormItem className=" flex flex-col w-full   ">
                  <FormLabel>Price of Product</FormLabel>

                  <FormControl className="flex items-center">
                    <>
                      {" "}
                      <Input
                        className="account-form_input "
                        type="number"
                        {...form.register("price", { valueAsNumber: true })}
                      />
                    </>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className=" flex flex-col w-full   ">
                  <FormLabel>description of Product</FormLabel>

                  <FormControl className="">
                    <Input
                      className="account-form_input "
                      type="text"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
        
           
          </div>
          {isFormDataChanged && (
            <div className="flex items-center gap-6 justify-start">
              <Button
                type="submit"
                disabled={isSub}
                className={`${
                  isSub ? " bg-foreground" : ""
                } flexcenter w-[100px] gap-6`}
              >
                {isSub && <Loader2 className="h-6 w-6 animate-spin " />}
                {isSub ? (
                  <Loader2 className="h-6 w-6 animate-spin " />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </>
  );
};

export default TripForm;
