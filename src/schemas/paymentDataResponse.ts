import { z } from "zod";

export const PaymentDataResponseSchema = z.object({
  workshop: z.number(),
  postgraduate: z.number(),
  postgraduateEarly: z.number(),
  consultant: z.number(),
  consultantEarly: z.number(),
  earlyBirdDate: z.string(),
});

export type PaymentDataResponse = z.infer<typeof PaymentDataResponseSchema>;
