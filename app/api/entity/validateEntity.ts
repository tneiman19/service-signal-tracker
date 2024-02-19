import { z } from "zod";

export const postEntitySchema = z.object({
  entityName: z.string().min(1, "Entity name is required"),
  entityNote: z.string().optional(),
  contactName: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal("")),
  contactPhone: z.string().max(10).optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().toUpperCase().max(2).optional(),
  zip: z.string().max(5).optional(),
});
