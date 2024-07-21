import { parseRequestBody } from "@/lib/utilfuncs";
import { PaymentInvoiceResponseSchema } from "@/schemas/paymentInvoiceResponse";
import { PaymentLinkRequestSchema } from "@/schemas/paymentLinkRequest";
import { getPaymentLink } from "@/services/payment";

export async function POST(request: Request) {
  const result = await parseRequestBody(request, PaymentLinkRequestSchema);
  if (!result.ok) {
    return new Response(JSON.stringify({ error: result.error.code }), {
      status: 400,
    });
  }

  const { isPostgraduate, isWorkshop, mode, name, registerNumber } =
    result.value;

  const basepath = process.env.NEXT_PUBLIC_BaseUrl!;
  const response = await fetch(`${basepath}/api/payment-invoice`, {
    method: "POST",
    body: JSON.stringify({ isPostgraduate, isWorkshop }),
  });

  const invoiceResponse = await response.json();

  const parseResult = PaymentInvoiceResponseSchema.safeParse(invoiceResponse);
  if (!parseResult.success) {
    return new Response(
      JSON.stringify({
        error: "payment-link/failed-invoice" as PaymentLinkErrorCodes,
      })
    );
  }

  const { conference, isEarlyBird, workshop } = parseResult.data;

  const amount = conference + workshop;

  const soapResult = await getPaymentLink({
    mode,
    name,
    registerNumber,
    amount,
    isEarlyBird,
    isPostgraduate,
    isWorkshop,
  });

  if (!soapResult.ok) {
    return new Response(
      JSON.stringify({
        error: soapResult.error.code,
      }),
      { status: 400 }
    );
  }

  return new Response(JSON.stringify(soapResult.value), {
    status: 200,
  });
}
