"use client";
import { useForm, FieldValues } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import "@uploadthing/react/styles.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { categoriesList } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";

const CategoryForm = () => {

  return (
    <>
  
    
          {/* <div className=" gap-3 space-y-4 mb-10 items-center w-full ">
            {categoriesList.map((e) => (
              <CategoryInput
                onClick={() =>
                  setValue("category", e.label.toLocaleLowerCase())
                }
                description={e.description}
                selected={watch("category") === e.label}
                label={e.label}
                icon={e.icon}
              />
            ))}
       
          </div> */}
      
 
    </>
  );
};

export default CategoryForm;
