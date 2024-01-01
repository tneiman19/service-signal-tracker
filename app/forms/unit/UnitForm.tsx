"use client";
import { postUnitSchema } from "@/app/api/unit/validateUnit";
import { DeleteButton } from "@/components/DeleteButton";
import SelectTest from "@/components/SelectBuilding";
import { Button, Input, Label, Select, Textarea } from "@/components/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { Unit } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import { useFormSubmissionError } from "../../hooks/useFormSubmissionError";

type UnitFormData = z.infer<typeof postUnitSchema>;

const UnitForm = ({ unit }: { unit?: Unit }) => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UnitFormData>({
    resolver: zodResolver(postUnitSchema),
    defaultValues: {
      buildingId: unit?.buildingId || "",
      unitNumber: unit?.unitNumber || "",
      contactName: unit?.contactName,
      contactPhone: unit?.contactPhone,
      contactEmail: unit?.contactEmail,
      address: unit?.address,
      city: unit?.city,
      state: unit?.state,
      zip: unit?.zip,
      unitNote: unit?.unitNote,
    },
  });

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setSubmitError, renderErrorAlert } = useFormSubmissionError();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (unit) await axios.patch(`/api/unit/${unit.id}`, data);
      else await axios.post("/api/unit", data);
      toast.success("Unit saved successfully.");
      router.push("/");
      router.refresh();
    } catch (error: any) {
      console.log(error);
      toast.error(`Issue saving unit.`);
      error instanceof AxiosError
        ? setSubmitError(`${error.code}`, "")
        : setSubmitError("Error", `Issue saving unit.`);
      setIsSubmitting(false);
    }
  });

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="p-4 mx-auto md:max-w-xl sm:max-w-sm border border-gray-300 rounded-lg shadow-sm"
      >
        <h1 className="text-center text-2xl font-semibold text-gray-700 mb-4">
          Unit Form
        </h1>

        {renderErrorAlert()}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 ">
          <div>
            <Label>Building</Label>
            <Controller
              name="buildingId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  onValueChange={(selectedValue) => {
                    field.onChange(selectedValue);
                  }}
                >
                  <SelectTest />
                </Select>
              )}
            />

            {errors.buildingId && (
              <p className="text-center text-red-500 ">
                {errors.buildingId.message}
              </p>
            )}
          </div>

          <div>
            <Label>Unit Number</Label>
            <Input {...register("unitNumber")} />
            {errors.unitNumber && (
              <p className="text-center text-red-500 ">
                {errors.unitNumber.message}
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
          <Label>Unit Notes </Label>
          <Textarea {...register("unitNote")} />
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
          <Button className="max-w-xs col-start-3" disabled={isSubmitting}>
            {unit ? "Update Unit" : "Register Unit"}{" "}
          </Button>
        </div>
      </form>
    </>
  );
};

export default UnitForm;
