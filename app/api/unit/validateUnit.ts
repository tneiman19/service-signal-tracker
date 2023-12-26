import { z } from "zod";

export const postUnitSchema = z.object({
  propertyId: z.string().uuid("Property ID is required"),
  buildingId: z.string().uuid("Building ID is required"),
  unitNumber: z.string().min(1, "Unit number is required"),
  unitNote: z.string().optional().nullable(),
  contactName: z.string().optional().nullable(),
  contactEmail: z.string().email().optional().nullable(),
  contactPhone: z.string().max(10).optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().toUpperCase().max(2).optional().nullable(),
  zip: z.string().max(5).optional().nullable(),
});
