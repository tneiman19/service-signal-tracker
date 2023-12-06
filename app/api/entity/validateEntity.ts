import { z } from "zod";

export const postEntitySchema = z.object({
  entityName: z.string().min(1, "Entity name is required"),
  entityNote: z.string().optional().nullable(),
  contactName: z.string().optional().nullable(),
  contactEmail: z.string().email().optional().nullable(),
  contactPhone: z.string().max(10).optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().toUpperCase().max(2).optional().nullable(),
  zip: z.string().max(5).optional().nullable(),
  active: z.boolean().optional()
});
