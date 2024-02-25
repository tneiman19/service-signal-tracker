import { z } from "zod";

export const postBuildingSchema = z.object({
  propertyId: z
    .string()
    .min(1, "Property ID is required")
    .uuid({ message: "Invalid UUID" }),
  buildingNumber: z.string().min(1, "Building number is required"),
  buildingNote: z.string().optional(),
  active: z.boolean().optional(),
});
