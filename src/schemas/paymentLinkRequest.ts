import { PaymentMode } from "@/lib/payment-mode";
import { registerNumber } from "@/lib/utilfuncs";
import { z } from "zod";

const bankNames: PaymentMode[] = ["HDFC", "PAYU"] as const;

export const PaymentLinkRequestSchema = z.object({
  mode: z.enum(["HDFC", "PAYU"]),
  name: z.string().min(2),
  registerNumber: z.string().min(16),
  isPostgraduate: z.boolean(),
  isWorkshop: z.boolean(),
});

export type PaymentLinkRequest = z.infer<typeof PaymentLinkRequestSchema>;
