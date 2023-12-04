"use client";
import { postEntitySchema } from "@/app/api/entity/validateEntity";
import { zodResolver } from "@hookform/resolvers/zod";
import { Entity } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input, Checkbox, Button, Textarea } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";

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
      toast.success("Creared Entity " + data.entityName);
      router.push("/"); //redirect to entity page
      router.refresh();
    } catch (error: any) {
      setIsSubmitting(false);
      setError(error.message);
      toast.error("Error creating entity", error.message);
    }
  });

  return (
    <>
      <Toaster />

      <form className="container">
        <h1 className="flex justify-center ">Entity Form</h1>

        {error && (
          <p className="flex flex-wrap justify-center text-red-500 ">{error}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ">
          <div>
            <Input
              isRequired
              label="Entity Name"
              defaultValue={entity?.entityName}
              className=""
              {...register("entityName")}
            />
            {errors.entityName && (
              <p className="flex flex-wrap justify-center text-red-500 ">
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
          <Checkbox
            defaultSelected={
              entity?.active !== undefined ? entity.active : true
            }
            size="md"
            {...register("active")}
          >
            Active
          </Checkbox>

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
