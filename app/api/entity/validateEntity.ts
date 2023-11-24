import { z } from "zod";

export const postEntitySchema = z.object({
  entityName: z.string().min(1, "Entity name is required"),
  entityNote: z.string().optional().nullable(),
  contactName: z.string().optional().nullable(),
  contactEmail: z.string().optional().nullable(),
  contactPhone: z.string().min(10).max(10).optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().min(2).max(2).optional().nullable(),
  zip: z.string().min(5).max(5).optional().nullable(),
});
