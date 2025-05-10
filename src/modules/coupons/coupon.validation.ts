import { z } from "zod";

export const createCouponSchema = z.object({
  id: z.string().optional(),
  code: z.string().min(3),
  status: z.enum(["active", "inactive"]),
  discount: z.number().positive(),
  startDate: z.date(),
  endDate: z.date(),
});

export const updateCouponSchema = createCouponSchema.deepPartial();
