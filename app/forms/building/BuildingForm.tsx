"use client";
import { postBuildingSchema } from "@/app/api/building/validateBuilding";
import { DeleteButton } from "@/components/DeleteButton";
import SelectProperty from "@/components/SelectProperty";
import { Button, Input, Label, Select, Textarea } from "@/components/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import { useFormSubmissionError } from "../../hooks/useFormSubmissionError";

type BuildingFormData = z.infer<typeof postBuildingSchema>;

const BuildingForm = ({ building }: { building?: Building }) => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<BuildingFormData>({
    resolver: zodResolver(postBuildingSchema),
    defaultValues: {
      propertyId: building?.propertyId,
      buildingNumber: building?.buildingNumber || "",
      buildingNote: building?.buildingNote,
    },
  });

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setSubmitError, renderErrorAlert } = useFormSubmissionError();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (building) await axios.patch(`/api/building/${building.id}`, data);
      else await axios.post("/api/building", data);
      toast.success("Building saved successfully.");
      router.push("/");
      router.refresh();
    } catch (error: any) {
      console.log(error);
      toast.error(`Issue saving building.`);
      error instanceof AxiosError
        ? setSubmitError(`${error.code}`, "")
        : setSubmitError("Error", `Issue saving building.`);
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
          Building Form
        </h1>

        {renderErrorAlert()}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 ">
          <div>
            <Label>Property</Label>
            <Controller
              name="propertyId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  onValueChange={(selectedValue) => {
                    field.onChange(selectedValue);
                  }}
                >
                  <SelectProperty />
                </Select>
              )}
            />

            {errors.propertyId && (
              <p className="text-center text-red-500 ">
                {errors.propertyId.message}
              </p>
            )}
          </div>

          <div>
            <Label>Building Number</Label>
            <Input
              defaultValue={building?.buildingNumber || ""}
              {...register("buildingNumber")}
            />
            {errors.buildingNumber && (
              <p className="text-center text-red-500 ">
                {errors.buildingNumber.message}
              </p>
            )}
          </div>
        </div>

        <div className="gap-4 p-4">
          <Label>Building Notes </Label>

          <Textarea
            defaultValue={building?.buildingNote || ""}
            {...register("buildingNote")}
          />
        </div>
        <div className="grid lg:grid-cols-3 gap-4 p-4">
          {building?.id && (
            <DeleteButton
              delete_type="buidling"
              delete_name={building?.buildingNumber!}
              api_url={`/api/building/${building?.id}`}
              redirect_url={"/"}
              handleErrorMessage={setSubmitError}
            />
          )}
          <Button className="max-w-xs col-start-3" disabled={isSubmitting}>
            {building ? "Update Building" : "Register Building"}{" "}
          </Button>
        </div>
      </form>
    </>
  );
};

export default BuildingForm;
