import { z } from "zod";

export const postBuildingSchema = z.object({
  propertyId: z.string().uuid("Property ID is required"),
  buildingNumber: z.string().min(1, "Property name is required"),
  buildingNote: z.string().optional().nullable(),
  active: z.boolean().optional(),
});
