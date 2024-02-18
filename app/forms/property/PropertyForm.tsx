"use client";

import { postPropertySchema } from "@/app/api/property/validateProperty";
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
import { Property } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import { useFormSubmissionError } from "../../hooks/useFormSubmissionError";

const FormSchema = postPropertySchema;

const PropertyForm = ({ property }: { property?: Property }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      propertyName: property?.propertyName || "",
      entityId: property?.entityId || "",
      contactName: property?.contactName || "",
      contactEmail: property?.contactEmail || "",
      contactPhone: property?.contactPhone || "",
      address: property?.address || "",
      city: property?.city || "",
      state: property?.state || "",
      zip: property?.zip || "",
      propertyNote: property?.propertyNote || "",
    },
  });

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setSubmitError, renderErrorAlert } = useFormSubmissionError();

  async function handleSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsSubmitting(true);
      if (property) await axios.patch(`/api/property/${property.id}`, data);
      else await axios.post("/api/property", data);
      toast.success("Property saved successfully.");
      router.push("/");
      router.refresh();
    } catch (error: any) {
      toast.error(`Issue saving property.`);
      error instanceof AxiosError
        ? setSubmitError(`${error.message}`, `${error.response?.data.message}`)
        : setSubmitError("Error", `Issue saving property.`);
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
          Property Form{" "}
        </h1>
        {renderErrorAlert()}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 ">
          <FormField
            control={form.control}
            name="entityId"
            render={({ field }) => (
              <CustomSelect
                api="/api/select_option_list/entity"
                label="Entity"
                placeholder="Select an entity"
                field={field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="propertyName"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Property Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Property Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="contactName"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Contact Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Contact Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Contact Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Contact Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Contact Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Unit Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <CustomSelect
                api="/api/select_option_list/state"
                label="State"
                placeholder="Select a state"
                field={field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Zip Code" {...field} />
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
            name="propertyNote"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Property Note</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Property Note " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-4 p-4">
          {property?.id && (
            <DeleteButton
              delete_type="property"
              delete_name={property?.propertyName!}
              api_url={`/api/unit/${property?.id}`}
              redirect_url={"/"}
              handleErrorMessage={setSubmitError}
            />
          )}
          <Button
            type="submit"
            className="max-w-xs col-start-3"
            disabled={isSubmitting}
          >
            {property ? "Update property" : "Register property"}{" "}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PropertyForm;
