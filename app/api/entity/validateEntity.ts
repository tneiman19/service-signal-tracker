import { z } from "zod";

export const postEntitySchema = z.object({
  entityName: z.string().min(1, "Entity name is required"),
  entityNote: z.string().optional().nullable(),
  active: z.boolean().default(true),
  contactName: z.string().optional().nullable(),
  contactEmail: z.string().optional().nullable(),
  contactPhone: z.string().max(10).optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().max(2).optional().nullable(),
  zip: z.string().max(5).optional().nullable(),
});
