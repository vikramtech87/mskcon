import { parseRequestBody } from "@/lib/utilfuncs";
import { PaymentStatusRequestSchema } from "@/schemas/paymentStatusRequest";
import { getTransactionStatus } from "@/services/payment";

export async function POST(request: Request) {
  const result = await parseRequestBody(request, PaymentStatusRequestSchema);

  if (!result.ok) {
    return new Response(JSON.stringify({ error: result.error.code }), {
      status: 400,
    });
  }

  const { mode, registrationNumber, transactionId } = result.value;

  const soapResult = await getTransactionStatus({
    registerNumber: registrationNumber,
    bankName: mode,
    transactionId,
  });

  if (!soapResult.ok) {
    return new Response(
      JSON.stringify({
        error: soapResult.error.code,
      }),
      { status: 400 }
    );
  }

  return new Response(JSON.stringify(soapResult.value));
}
