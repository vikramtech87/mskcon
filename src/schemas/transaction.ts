import { PaymentMode } from "@/lib/payment-mode";
import { TransactionStatus } from "@/lib/transaction-status";
import { z } from "zod";

const modes = ["HDFC", "PAYU"] as const;
const transactionStatuses = ["INITIATED", "SUCCESS", "FAILURE"] as const;

export const TransactionSchema = z.object({
  transactionId: z.string(),
  userId: z.string(),
  mode: z.enum(modes),
  transactionStatus: z.enum(transactionStatuses),
  registrationNumber: z.string(),
  amount: z.number(),
});

export type Transaction = z.infer<typeof TransactionSchema>;
