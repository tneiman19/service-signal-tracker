"use client";
import { postEntitySchema } from "@/app/api/entity/validateEntity";
import { zodResolver } from "@hookform/resolvers/zod";
import { Entity } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input, Checkbox, Button } from "@nextui-org/react";
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
      {" "}
      <Toaster />
      <div className="flex justify-center items-center flex-col bg-gray-100 dark:bg-gray-800 pt-2">
        <h1 className="sm:text-2xl md:text-4xl font-bold mb-8">
          {entity ? `Updating Entity ${entity.entityName}` : "Creating Entity"}
        </h1>
        <form className="p-3 bg-white dark:bg-gray-700 shadow-lg rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              isRequired
              label="Entity Name"
              defaultValue={entity?.entityName}
              className="w-full"
              {...register("entityName")}
            />
            <Input
              label="Entity Note"
              defaultValue={entity?.entityNote || undefined}
              className="w-full"
              {...register("entityNote")}
            />
            <Input
              label="Contact Name"
              defaultValue={entity?.contactName || undefined}
              className="w-full"
              {...register("contactName")}
            />
            <Input
              label="Contact Email"
              defaultValue={entity?.contactEmail || undefined}
              className="w-full"
              {...register("contactEmail")}
            />
            <Input
              label="Contact Phone"
              defaultValue={entity?.contactPhone || undefined}
              className="w-full"
              {...register("contactPhone")}
            />
            <Input
              label="Address"
              defaultValue={entity?.address || undefined}
              className="w-full"
              {...register("address")}
            />

            <Input
              label="City"
              defaultValue={entity?.city || undefined}
              className="w-full"
              {...register("city")}
            />
            <Input
              label="State"
              defaultValue={entity?.state || undefined}
              className="w-full"
              {...register("state")}
            />
            <Input
              label="Zip Code"
              defaultValue={entity?.zip || undefined}
              className="w-full"
              {...register("zip")}
            />
          </div>

          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
            <Checkbox
              defaultSelected={
                entity?.active !== undefined ? entity.active : true
              }
              size="sm"
              {...register("active")}
            >
              Active
            </Checkbox>

            <Button
              onClick={onSubmit}
              color="primary"
              isLoading={isSubmitting}
              className="mt-2 sm:mt-0 w-full sm:w-auto dark:text-white"
            >
              {entity ? "Update Entity" : "Register Entity"}{" "}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EntityForm;
