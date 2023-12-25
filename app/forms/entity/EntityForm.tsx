"use client";
import { postEntitySchema } from "@/app/api/entity/validateEntity";
import { DeleteButton } from "@/components/DeleteButton";
import { Button, Input, Label, Textarea } from "@/components/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { Entity } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import { useFormSubmissionError } from "../../hooks/useFormSubmissionError";

type EntityFormData = z.infer<typeof postEntitySchema>;

const EntityForm = ({ entity }: { entity?: Entity }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EntityFormData>({
    resolver: zodResolver(postEntitySchema),
  });

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setSubmitError, renderErrorAlert } = useFormSubmissionError();

  const onSubmit = handleSubmit(async (data) => {
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
        ? setSubmitError(`${error.code}`, "")
        : setSubmitError("Error", `Issue saving entity.`);
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
          Entity Form
        </h1>

        {renderErrorAlert()}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 ">
          <div>
            <Label>Entity Name</Label>
            <Input
              defaultValue={entity?.entityName}
              {...register("entityName")}
            />
            {errors && (
              <p className="text-center text-red-500 ">
                {errors.entityName?.message}
              </p>
            )}
          </div>

          <div>
            <Label>Contact Name</Label>
            <Input
              defaultValue={entity?.contactName || undefined}
              {...register("contactName")}
            />
            {errors.contactName && <p>{errors.contactName.message}</p>}
          </div>

          <div>
            <Label>Contact Email</Label>
            <Input
              defaultValue={entity?.contactEmail || ""}
              {...register("contactEmail")}
            />
            {errors.contactEmail && <p>{errors.contactEmail.message}</p>}
          </div>

          <div>
            <Label>Contact Phone</Label>
            <Input
              defaultValue={entity?.contactPhone || ""}
              {...register("contactPhone")}
            />
            {errors.contactPhone && <p>{errors.contactPhone.message}</p>}
          </div>

          <div>
            <Label>Address</Label>
            <Input
              defaultValue={entity?.address || ""}
              {...register("address")}
            />
            {errors.address && <p>{errors.address.message}</p>}
          </div>

          <div>
            <Label>City</Label>
            <Input defaultValue={entity?.city || ""} {...register("city")} />
            {errors.city && <p>{errors.city.message}</p>}
          </div>

          <div>
            <Label>State</Label>
            <Input defaultValue={entity?.state || ""} {...register("state")} />
            {errors.state && <p>{errors.state.message}</p>}
          </div>

          <div>
            <Label>Zip Code</Label>
            <Input defaultValue={entity?.zip || ""} {...register("zip")} />
            {errors.zip && <p>{errors.zip.message}</p>}
          </div>
        </div>

        <div className="gap-4 p-4">
          <Label>Entity Notes </Label>

          <Textarea
            defaultValue={entity?.entityNote || ""}
            {...register("entityNote")}
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
          <Button className="max-w-xs col-start-3" disabled={isSubmitting}>
            {entity ? "Update Entity" : "Register Entity"}{" "}
          </Button>
        </div>
      </form>
    </>
  );
};

export default EntityForm;
