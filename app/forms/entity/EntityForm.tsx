"use client";

import { postEntitySchema } from "@/app/api/entity/validateEntity";
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
import { Entity } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import { useFormSubmissionError } from "../../hooks/useFormSubmissionError";

const FormSchema = postEntitySchema;

const EntityForm = ({ entity }: { entity?: Entity }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      entityName: entity?.entityName || "",
      entityNote: entity?.entityNote || "",
      contactName: entity?.contactName || "",
      contactEmail: entity?.contactEmail || "",
      contactPhone: entity?.contactPhone || "",
      address: entity?.address || "",
      city: entity?.city || "",
      state: entity?.state || "",
      zip: entity?.zip || "",
    },
  });

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setSubmitError, renderErrorAlert } = useFormSubmissionError();

  async function handleSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsSubmitting(true);
      if (entity) await axios.patch(`/api/entity/${entity.id}`, data);
      else await axios.post("/api/entity", data);
      toast.success("Entity saved successfully.");
      router.push("/");
      router.refresh();
    } catch (error: any) {
      console.log(error);
      toast.error(`Issue saving entity.`);
      error instanceof AxiosError
        ? setSubmitError(`${error.message}`, `${error.response?.data.message}`)
        : setSubmitError("Error", `Issue saving unit.`);
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
          Entity Form{" "}
        </h1>
        {renderErrorAlert()}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 ">
          <FormField
            control={form.control}
            name="entityName"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Entity Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Entity Name" {...field} />
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
            name="entityNote"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Entity Note</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Entity Note " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-4 p-4">
          {entity?.id && (
            <DeleteButton
              delete_type="entity"
              delete_name={entity?.entityName!}
              api_url={`/api/entity/${entity?.id}`}
              redirect_url={"/"}
              handleErrorMessage={setSubmitError}
            />
          )}
          <Button
            type="submit"
            className="max-w-xs col-start-3"
            disabled={isSubmitting}
          >
            {entity ? "Update Entity" : "Register Entity"}{" "}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EntityForm;
