import { z } from "zod";

export const postBuildingSchema = z.object({
  propertyId: z.string().uuid("Property ID is required"),
  buildingNumber: z.string().min(1, "Building number is required"),
  buildingNote: z.string().optional(),
  active: z.boolean().optional(),
});
