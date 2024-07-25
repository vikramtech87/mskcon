import { z } from "zod";

export const PaymentStatusResponseSchema = z.object({
  registrationNumber: z.coerce.string(),
  transactionId: z.coerce.string(),
  bankId: z.coerce.string(),
  authId: z.coerce.string(),
  resultCode: z.coerce.string(),
  result: z.coerce.string(),
  isSuccess: z.boolean(),
});

export type PaymentStatusResponse = z.infer<typeof PaymentStatusResponseSchema>;
