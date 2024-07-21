import { z } from "zod";

export const PaymentInvoiceResponseSchema = z.object({
  conference: z.number(),
  workshop: z.number(),
  isEarlyBird: z.boolean(),
});

export type PaymentInvoiceResponse = z.infer<
  typeof PaymentInvoiceResponseSchema
>;
