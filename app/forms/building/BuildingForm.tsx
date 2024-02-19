"use client";

import { postBuildingSchema } from "@/app/api/building/validateBuilding";
import CustomSelect from "@/components/CustomSelect";
import { DeleteButton } from "@/components/DeleteButton";
import { Button, Input, Textarea } from "@/components/index";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import { useFormSubmissionError } from "../../hooks/useFormSubmissionError";

const FormSchema = postBuildingSchema;

const BuildingForm = ({ building }: { building?: Building }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      propertyId: building?.propertyId || "",
      buildingNumber: building?.buildingNumber || "",
      buildingNote: building?.buildingNote || "",
    },
  });

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setSubmitError, renderErrorAlert } = useFormSubmissionError();

  async function handleSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsSubmitting(true);
      if (building) await axios.patch(`/api/building/${building.id}`, data);
      else await axios.post("/api/building", data);
      toast.success("Building saved successfully.");
      router.push("/");
      router.refresh();
    } catch (error: any) {
      toast.error(`Issue saving building.`);
      error instanceof AxiosError
        ? setSubmitError(`${error.message}`, `${error.response?.data.message}`)
        : setSubmitError("Error", `Issue saving building.`);
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="p-4 mx-auto md:max-w-xl sm:max-w-sm border border-gray-300 rounded-lg shadow-sm"
      >
        <h1 className="text-center text-2xl font-semibold text-gray-700 mb-4">
          Building Form{" "}
        </h1>
        {renderErrorAlert()}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 ">
          <FormField
            control={form.control}
            name="propertyId"
            render={({ field }) => (
              <CustomSelect
                api="/api/select_option_list/property"
                label="Property"
                placeholder="Select a property"
                field={field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="buildingNumber"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Building</FormLabel>
                  <FormControl>
                    <Input placeholder="Building" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <div className="gap-4 p-4">
          <FormField
            control={form.control}
            name="buildingNote"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Building Note</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Building Note " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-4 p-4">
          {building?.id && (
            <DeleteButton
              delete_type="building"
              delete_name={building?.buildingNumber!}
              api_url={`/api/building/${building?.id}`}
              redirect_url={"/"}
              handleErrorMessage={setSubmitError}
            />
          )}
          <Button
            type="submit"
            className="max-w-xs col-start-3"
            disabled={isSubmitting}
          >
            {building ? "Update Building" : "Register Building"}{" "}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BuildingForm;
