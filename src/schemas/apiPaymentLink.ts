import { z } from "zod";
import { SoapPaymentLinkSchema } from "./soapPaymentLink";

export const ApiPaymentLinkSchema = SoapPaymentLinkSchema.extend({
  Amount: z.number(),
});

export type ApiPaymentLink = z.infer<typeof ApiPaymentLinkSchema>;
