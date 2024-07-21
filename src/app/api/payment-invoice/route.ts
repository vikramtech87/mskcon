import { parseRequestBody } from "@/lib/utilfuncs";
import { PaymentInvoiceRequestSchema } from "@/schemas/paymentInvoiceRequest";
import { expectedPayment } from "@/services/payment";

export async function POST(request: Request) {
  const result = await parseRequestBody(request, PaymentInvoiceRequestSchema);
  if (!result.ok) {
    return new Response(JSON.stringify({ error: result.error.code }), {
      status: 400,
    });
  }

  const { isWorkshop, isPostgraduate } = result.value;

  const data = expectedPayment(isPostgraduate, isWorkshop);

  return new Response(JSON.stringify(data), { status: 200 });
}
