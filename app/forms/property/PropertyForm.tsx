"use client";

import { postPropertySchema } from "@/app/api/property/validateProperty";
import { DeleteButton } from "@/components/DeleteButton";
import SelectEntity from "@/components/SelectEntity";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Property } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

type PropertyFormData = z.infer<typeof postPropertySchema>;

const EntityForm = ({ property }: { property?: Property }) => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(postPropertySchema),
    defaultValues: {
      propertyName: property?.propertyName,
      entityId: property?.entityId,
      contactName: property?.contactName,
      contactEmail: property?.contactEmail,
      contactPhone: property?.contactPhone,
      address: property?.address,
      city: property?.city,
      state: property?.state,
      zip: property?.zip,
      propertyNote: property?.propertyNote,
    },
  });

  const router = useRouter();

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (property) await axios.patch(`/api/property/${property.id}`, data);
      else await axios.post("/api/property", data);
      toast.success("Property saved successfully.");
      router.push("/");
      router.refresh();
    } catch (error: any) {
      setIsSubmitting(false);
      setError(error.response.data.errorMessage);
      toast.error(`Issue saving property.`);
    }
  });

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="p-4 mx-auto md:max-w-xl sm:max-w-sm border border-gray-300 rounded-lg shadow-sm"
      >
        <h1 className="text-center text-2xl font-semibold text-gray-700 mb-4">
          Property Form
        </h1>
        {error && <p className="text-center text-red-500 ">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 ">
          <div>
            <Label>Property Name</Label>
            <Input {...register("propertyName")} />
            {errors && (
              <p className="text-center text-red-500 ">
                {errors.propertyName?.message}
              </p>
            )}
          </div>

          <div>
            <Label>Entity</Label>
            <Controller
              name="entityId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  onValueChange={(selectedValue) => {
                    field.onChange(selectedValue);
                  }}
                >
                  <SelectEntity />
                </Select>
              )}
            />

            {errors.entityId && (
              <p className="text-center text-red-500 ">
                {errors.entityId.message}
              </p>
            )}
          </div>

          <div>
            <Label>Contact Name</Label>
            <Input {...register("contactName")} />
            {errors.contactName && <p>{errors.contactName.message}</p>}
          </div>

          <div>
            <Label>Contact Email</Label>
            <Input {...register("contactEmail")} />
            {errors.contactEmail && (
              <p className="text-center text-red-500 ">
                {errors.contactEmail.message}
              </p>
            )}
          </div>

          <div>
            <Label>Contact Phone</Label>
            <Input {...register("contactPhone")} />
            {errors.contactPhone && <p>{errors.contactPhone.message}</p>}
          </div>

          <div>
            <Label>Address</Label>
            <Input {...register("address")} />
            {errors.address && <p>{errors.address.message}</p>}
          </div>

          <div>
            <Label>City</Label>
            <Input {...register("city")} />
            {errors.city && <p>{errors.city.message}</p>}
          </div>

          <div>
            <Label>State</Label>
            <Input {...register("state")} />
            {errors.state && <p>{errors.state.message}</p>}
          </div>

          <div>
            <Label>Zip Code</Label>
            <Input {...register("zip")} />
            {errors.zip && <p>{errors.zip.message}</p>}
          </div>
        </div>

        <div className="gap-4 p-4">
          <Label>Property Notes </Label>
          <Textarea {...register("propertyNote")} />
        </div>

        <div className="grid lg:grid-cols-3 gap-4 p-4">
          {property?.id && (
            <DeleteButton
              delete_type="property"
              delete_name={property?.propertyName!}
              api_url={`/api/property/${property?.id}`}
              redirect_url={"/"}
            />
          )}
          <Button className="max-w-xs col-start-3" disabled={isSubmitting}>
            {property ? "Update Property" : "Register Property"}{" "}
          </Button>
        </div>
      </form>
    </>
  );
};

export default EntityForm;
