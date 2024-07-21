import { z } from "zod";

export const PaymentInvoiceRequestSchema = z.object({
  isPostgraduate: z.boolean(),
  isWorkshop: z.boolean(),
});

export type PaymentInvoiceRequest = z.infer<typeof PaymentInvoiceRequestSchema>;
