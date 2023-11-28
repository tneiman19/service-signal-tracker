"use client";
import { postEntitySchema } from "@/app/api/entity/validateEntity";
import { zodResolver } from "@hookform/resolvers/zod";
import { Entity } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
      router.push("/entity"); //redirect to entity page
      router.refresh();
    } catch (error: any) {
      setIsSubmitting(false);
      setError(error.message);
    }
  });

  return (
    <>
      <div className="artboard-1 w-full h-full bg-base-100">
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={onSubmit}>
          <input
            defaultValue={entity?.entityName}
            placeholder="Entity Name"
            {...register("entityName")}
          />
          {errors.entityName && <p>{errors.entityName.message}</p>}
          <input
            defaultValue={entity?.entityNote || undefined}
            placeholder="Entity Note"
            {...register("entityNote")}
          />
          {errors.entityNote && <p>{errors.entityNote.message}</p>}
          <div className="form-control w-full">
            <label className="label cursor-pointer flex justify-start items-center">
              <span className="label-text mr-2">Active</span>
              <input
                defaultChecked={
                  entity?.active !== undefined ? entity.active : true
                }
                type="checkbox"
                className="toggle toggle-success"
                {...register("active")}
              />
            </label>
          </div>

          <input
            defaultValue={entity?.contactName || undefined}
            placeholder="Contact Name"
            {...register("contactName")}
          />
          {errors.contactName && <p>{errors.contactName.message}</p>}

          <input
            defaultValue={entity?.contactEmail || undefined}
            placeholder="Contact Email"
            {...register("contactEmail")}
          />
          {errors.contactEmail && <p>{errors.contactEmail.message}</p>}
          <input
            defaultValue={entity?.contactPhone || undefined}
            placeholder="Contact Phone"
            {...register("contactPhone")}
          />
          {errors.contactPhone && <p>{errors.contactPhone.message}</p>}
          <input
            defaultValue={entity?.address || undefined}
            placeholder="Address"
            {...register("address")}
          />
          {errors.address && <p>{errors.address.message}</p>}

          <input
            defaultValue={entity?.city || undefined}
            placeholder="City"
            {...register("city")}
          />
          {errors.city && <p>{errors.city.message}</p>}
          <input
            defaultValue={entity?.state || undefined}
            placeholder="State"
            {...register("state")}
          />
          {errors.state && <p>{errors.state.message}</p>}
          <input
            defaultValue={entity?.zip || undefined}
            placeholder="Zip Code"
            maxLength={5}
            type="number"
            {...register("zip")}
          />
          {errors.zip && <p>{errors.zip.message}</p>}

          <button disabled={isSubmitting} className="btn btn-primary">
            {entity ? "Update Entity" : "Register Entity"}{" "}
            {isSubmitting && "Submitting..."}
          </button>
        </form>
      </div>
    </>
  );
};

export default EntityForm;
