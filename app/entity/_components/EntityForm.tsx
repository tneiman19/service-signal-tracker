"use client";
import { postEntitySchema } from "@/app/api/entity/validateEntity";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Input, Textarea } from "@nextui-org/react";
import { Entity } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";

type EntityFormData = z.infer<typeof postEntitySchema>;

const EntityForm = ({ entity }: { entity?: Entity }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EntityFormData>({
    resolver: zodResolver(postEntitySchema),
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (entity) await axios.patch(`/api/entity/${entity.id}`, data);
      else await axios.post("/api/entity", data);
      toast.success("Entity saved successfully")
      // console.log(data)
      router.push("/entity"); //redirect to entity page
      router.refresh();
    } catch (error: any) {
      setIsSubmitting(false);
      setError(error.response.data.errorMessage);
      toast.error("Error saving entity");
      //console.log(data);
      console.log(error);
    }
  });

  return (
    <>
      <Toaster />
      <form className="p-4 mx-auto md:max-w-xl sm:max-w-sm border border-gray-300 rounded-lg">
        <h1 className="text-center text-2xl font-semibold text-gray-700 mb-4">
          Entity Form
        </h1>
        {error && <p className="text-center text-red-500 ">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 ">
          <div>
            <Input
              isRequired
              label="Entity Name"
              defaultValue={entity?.entityName}
              className=""
              {...register("entityName")}
            />
            {errors.entityName && (
              <p className="text-center text-red-500 ">
                {errors.entityName.message}
              </p>
            )}
          </div>
          <Input
            label="Contact Name"
            defaultValue={entity?.contactName || undefined}
            className=""
            {...register("contactName")}
          />
          <Input
            label="Contact Email"
            defaultValue={entity?.contactEmail || undefined}
            className=""
            {...register("contactEmail")}
          />
          <Input
            label="Contact Phone"
            defaultValue={entity?.contactPhone || undefined}
            className=""
            {...register("contactPhone")}
          />
          <Input
            label="Address"
            defaultValue={entity?.address || undefined}
            className=""
            {...register("address")}
          />

          <Input
            label="City"
            defaultValue={entity?.city || undefined}
            className=""
            {...register("city")}
          />
          <Input
            label="State"
            defaultValue={entity?.state || undefined}
            className=""
            {...register("state")}
          />
          <Input
            label="Zip Code"
            defaultValue={entity?.zip || undefined}
            className=""
            {...register("zip")}
          />
        </div>
        <Textarea
          label="Entity Notes"
          defaultValue={entity?.entityNote || undefined}
          className="gap-4 p-4"
          {...register("entityNote")}
        />
        <div className="grid lg:grid-cols-3 gap-4 p-4">
          <Button
            onClick={onSubmit}
            color="primary"
            isLoading={isSubmitting}
            className="max-w-xs col-start-3"
          >
            {entity ? "Update Entity" : "Register Entity"}{" "}
          </Button>
        </div>
      </form>
    </>
  );
};

export default EntityForm;
