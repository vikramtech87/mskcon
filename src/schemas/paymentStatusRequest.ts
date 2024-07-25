import { PaymentMode } from "@/lib/payment-mode";
import { z } from "zod";

const paymentModes = ["HDFC", "PAYU"] as const;

export const PaymentStatusRequestSchema = z.object({
  registrationNumber: z.string(),
  transactionId: z.string(),
  mode: z.enum(paymentModes),
});

export type PaymentStatusRequest = z.infer<typeof PaymentStatusRequestSchema>;
