import { z } from "zod";

export const postEquipmentSchema = z.object({
  unitId: z.string().uuid({ message: "Invalid UUID" }).optional(),
  equipmentTypeId: z
    .string()
    .min(1, "Equipment Type is required")
    .uuid({ message: "Invalid UUID" }),
  manufacturerId: z.string().optional(),
  purchaseDate: z.date().nullable().or(z.string().datetime()),
  purchasedFrom: z.string().optional(),
  modelNumber: z.string().optional(),
  serialNumber: z.string().optional(),
  warrantyDate: z.date().nullable().or(z.string().datetime()),
  active: z.boolean().default(true),
  equipmentStatusId: z.number().default(1),
  equipmentNote: z.string().nullable(),
});
