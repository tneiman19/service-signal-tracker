"use client";

import { postUnitSchema } from "@/app/api/unit/validateUnit";
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
import { Unit } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import { useFormSubmissionError } from "../../hooks/useFormSubmissionError";

const FormSchema = postUnitSchema;

const UnitForm = ({ unit }: { unit?: Unit }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      buildingId: unit?.buildingId || "",
      unitNumber: unit?.unitNumber || "",
      contactName: unit?.contactName || "",
      contactPhone: unit?.contactPhone || "",
      contactEmail: unit?.contactEmail || "",
      address: unit?.address || "",
      city: unit?.city || "",
      state: unit?.state || "",
      zip: unit?.zip || "",
      unitNote: unit?.unitNote || "",
    },
  });

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setSubmitError, renderErrorAlert } = useFormSubmissionError();

  async function handleSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsSubmitting(true);
      if (unit) await axios.patch(`/api/unit/${unit.id}`, data);
      else await axios.post("/api/unit", data);
      toast.success("Unit saved successfully.");
      router.push("/");
      router.refresh();
    } catch (error: any) {
      toast.error(`Issue saving unit.`);
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
          Unit Form{" "}
        </h1>
        {renderErrorAlert()}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 ">
          <FormField
            control={form.control}
            name="buildingId"
            render={({ field }) => (
              <CustomSelect
                api="/api/select_option_list/building"
                label="Building"
                placeholder="Select a building"
                field={field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="unitNumber"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <FormControl>
                    <Input placeholder="Unit" {...field} />
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
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
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
            name="unitNote"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Unit Note</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Unit Note " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-4 p-4">
          {unit?.id && (
            <DeleteButton
              delete_type="unit"
              delete_name={unit?.unitNumber!}
              api_url={`/api/unit/${unit?.id}`}
              redirect_url={"/"}
              handleErrorMessage={setSubmitError}
            />
          )}
          <Button
            type="submit"
            className="max-w-xs col-start-3"
            disabled={isSubmitting}
          >
            {unit ? "Update Unit" : "Register Unit"}{" "}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UnitForm;
