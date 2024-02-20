"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";

import "@uploadthing/react/styles.css";
import { useStore } from "@/hooks/store";
import { useMemo, useState } from "react";
import Heading from "../Heading";

import CategoryInput from "../inputs/CategoryInput";
import { toast } from "sonner";
import axios from "axios";
import { useForm } from "react-hook-form";
import "@uploadthing/react/styles.css";
import { useEffect } from "react";
import { ScrollArea } from "../ui/scroll-area";
import CountrySelect, { countrySelectValue } from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import { Bath } from "lucide-react";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ImagesInput from "../inputs/ImagesInput";
import { LatLngExpression } from "leaflet";
import { title } from "process";
import { zodResolver } from "@hookform/resolvers/zod";
import { RentSchema } from "@/models/Schemas/Setup";
import { categoriesList } from "../navbar/NavBar";
import CliComponent from "../CliComponent";
enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCWITHPRICE = 4,
}

const RentModal = () => {
  const form = useForm<z.infer<typeof RentSchema>>({
    resolver: zodResolver(RentSchema),
    reValidateMode: "onChange",
    mode: "all",
    defaultValues: {
      category: "",
      title: "",
      images: [],
      description: "",
      roomCount: 1,
      guestCount: 1,
      bathroomCount: 1,
      price: 0,
      locationValue: {},
    },
  });
  const [step, setSteps] = useState(STEPS.CATEGORY);
  const { isRentModalOpen, setisRentModalOpen } = useStore();
  const onBack = () => setSteps((s) => Math.max(s - 1, STEPS.CATEGORY));
  const onNext = () => setSteps((s) => Math.min(s + 1, STEPS.DESCWITHPRICE));
  const {
    setValue,
    formState: { isValid },
    watch,
  } = form;
  const filedsNumber = Object.entries(form.getValues()).length;
  const filedsKeys: any = Object.keys(form.getValues());
  const [cleared, setCleared] = useState(0);
  const { getFieldState } = form;
  const location = watch("locationValue");
  const category = watch("category");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const images: string[] = watch("images");
  const description = watch("description");
  const price: number = +watch("price");
  const [isStepCompleted, setIsStepCompleted] = useState(false);

  useEffect(() => {
    const stepCompleted =
      (step === STEPS.CATEGORY && category?.length > 0) ||
      (step === STEPS.LOCATION && location?.latlang?.length > 0) ||
      (step === STEPS.IMAGES && images?.length > 0) ||
      step === STEPS.INFO ||
      (step === STEPS.DESCWITHPRICE &&
        description?.length > 0 &&
        price > 0 &&
        title.length > 0 &&
        isValid);

    setIsStepCompleted(stepCompleted);
  }, [step, category, location, watch()]);

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );
  useEffect(() => {
    let cleared = filedsNumber;

    filedsKeys.forEach((e) => {
      const { invalid, isTouched, error } = getFieldState(e);

      if (error) return cleared--;
      if (invalid && isTouched) return cleared--;
      else if (!invalid && !isTouched) return cleared--;
    });

    const count = (cleared / filedsNumber) * 100;

    if (count === 0 && !form.formState.isValid) return setCleared(0);
    else setCleared(count >= 0 ? count : 0);
  }, [form.formState, form.watch()]);

  const actionLabel = useMemo(() => {
    return step === STEPS.DESCWITHPRICE ? "Create" : "Next";
  }, [step]);

  const content = () => {
    if (step === STEPS.CATEGORY) {
      return (
        <>
          <Heading
            title="Which of these best describes your place"
            description="Pick a category"
          />

          <ScrollArea className=" gap-3   overflow-auto  mt-6 w-full  ">
            <div className="grid gap-6 max-h-[50dvh]  grid-cols-2">
              {categoriesList.map((e) => (
                <CategoryInput
                  key={e.label}
                  active={true}
                  onClick={() =>
                    setValue("category", e.label.toLocaleLowerCase(), {
                      shouldTouch: true,
                    })
                  }
                  description={e.description}
                  selected={category === e.label.toLocaleLowerCase()}
                  label={e.label}
                  icon={e.icon}
                />
              ))}
            </div>
          </ScrollArea>
        </>
      );
    } else if (step === STEPS.LOCATION) {
      return (
        <>
          <Heading
            title="Where is your place located ?"
            description="Pick a Place"
          />
          <CountrySelect
            value={watch("locationValue")}
            onChange={(e: countrySelectValue) => {
              setValue("locationValue", e, { shouldTouch: true });
            }}
          />
          <CliComponent>
            <Map center={location?.latlang as LatLngExpression} />
          </CliComponent>

          <ScrollArea className=" gap-3   mt-6 w-full  "></ScrollArea>
        </>
      );
    } else if (step === STEPS.INFO) {
      return (
        <>
          <Heading
            title="Share some informations about your place"
            description="describe the place  "
          />
          <div className="space-y-6 mt-6 flex-1 gap-6 h-full flex flex-col justify-center">
            <Counter
              counter={guestCount}
              title="Guests count"
              description="how many guests can your place have ?"
              icon={<FaPersonCircleQuestion size={25} />}
              max={30}
              onChange={(v) => setValue("guestCount", v, { shouldTouch: true })}
            />
            <Counter
              counter={bathroomCount}
              title="bathrooms count"
              description="how many bathrooms your place have ?"
              icon={<Bath size={25} />}
              max={10}
              onChange={(v) =>
                setValue("bathroomCount", v, { shouldTouch: true })
              }
            />
            <Counter
              max={15}
              counter={roomCount}
              title="rooms count"
              description="how many rooms your place have ?"
              icon={<FaHome size={25} />}
              onChange={(v) => setValue("roomCount", v, { shouldTouch: true })}
            />
          </div>
        </>
      );
    } else if (step === STEPS.IMAGES) {
      return (
        <ScrollArea className="max-h-[60dvh]  overflow-auto">
          <div>
            <Heading
              title="Share some Images of your place"
              description="Show your  place  "
            />

            <ImagesInput
              images={images}
              onChange={(e: string[]) =>
                setValue("images", e, { shouldTouch: true })
              }
            />
          </div>
        </ScrollArea>
      );
    } else if (step === STEPS.DESCWITHPRICE) {
      return (
        <ScrollArea className="max-h-[60dvh]  overflow-auto">
          <div>
            <Heading
              title="Share with us the price you want and some description about you place"
              description="Describe your  place  "
            />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>title</FormLabel>
                      <FormControl>
                        <Input placeholder="title" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the title of your place.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>description</FormLabel>
                      <FormControl>
                        <Input placeholder="description" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the description of your place.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={() => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="price"
                          {...form.register("price", { valueAsNumber: true })}
                        />
                      </FormControl>
                      <FormDescription>
                        This is the title of your place's price .
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </ScrollArea>
      );
    }
  };
  async function onSubmit(values: z.infer<typeof RentSchema>) {
    try {
      const data = {
        ...values,
      };

      const adding = axios.post(`/api/listings/`, data);

      adding
        .then((e) => {
          toast.success(e.data.message, { invert: true });
          setTimeout(() => {
            window.location.reload();
          }, 500);
        })
        .catch((e) => {
          console.log(e);
          toast.error(e.response.data.message || "Error Happend", {
            invert: true,
          });
        });

      toast.dismiss();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog open={isRentModalOpen} onOpenChange={(e) =>{ setisRentModalOpen(e)}}>
      <DialogTrigger asChild className=" max-md:hidden text-start w-full">
        <div className="flexcenter">
          <Button className="rounded-full" variant={"ghost"}>
            Airbnb your home
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent
        className=" flex flex-col gap-2  
      max-w-none max-md:w-[100dvw] md:!w-[70dvw] !h-[90dvh]"
      >
        <div className="flex-1">
          <div className="flexcenter  font-semibold text-xl">Rent Yor home</div>
          <Heading title="Airbnb" description="Add your place airbnb" />

          <div
            className="h-2 bg-accent relative w-full rounded-full 
          overflow-hidden "
          >
            <div
              style={{ width: `${cleared}%` }}
              className={`absolute bg-main h-full transition-all top-0 left-0 ${
                cleared == 100
                  ? "!bg-green-500"
                  : cleared >= 50
                  ? "!bg-yellow-400"
                  : ""
              }`}
            ></div>
          </div>
          <div className="min-h-[50dvh] flex flex-col mt-8">{content()}</div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex self-end items-center gap-6 w-full">
              {step !== STEPS.CATEGORY ? (
                <Button
                  onClick={() => {
                    onBack();
                  }}
                  variant={"outline"}
                  className={` flexcenter w-full  gap-6`}
                >
                  Previous
                </Button>
              ) : null}

              {
                <Button
                  disabled={!isStepCompleted && !isValid}
                  onClick={() => {
                    onNext();
                  }}
                  type={actionLabel === "Create" ? "submit" : "button"}
                  className={` flexcenter w-full bg-main hover:bg-main/80 gap-6`}
                >
                  {actionLabel}
                </Button>
              }
            </div>
          </form>
        </Form>

        {/* <div className="flex gap-2">
          <p>New to AirBnb create an account!</p>
          <div
            className="text-main cursor-pointer "
          
          >
            Register
          </div>
        </div> */}
      </DialogContent>
    </Dialog>
  );
};

export default RentModal;
