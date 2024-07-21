import { z } from "zod";

export const SoapPaymentLinkSchema = z.object({
  Registration: z.coerce.string(),
  Transid: z.coerce.string(),
  ResultCode: z.coerce.string(),
  Result: z.string(),
  URL: z.string(),
});

export type SoapPaymentLink = z.infer<typeof SoapPaymentLinkSchema>;
