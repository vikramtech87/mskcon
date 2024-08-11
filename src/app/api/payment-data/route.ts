import { PaymentDataResponse } from "@/schemas/paymentDataResponse";

export async function GET() {
  const envWorkshop = parseInt(process.env.Workshop!);
  const envPostgraduate = parseInt(process.env.Postgraduate!);
  const envPostgraduateEarly = parseInt(process.env.PostgraduateEarly!);
  const envConsultant = parseInt(process.env.Consultant!);
  const envConsultantEarly = parseInt(process.env.ConsultantEarly!);
  const envEarlyBirdDate = process.env.EarlyBirdDate!;

  const data: PaymentDataResponse = {
    workshop: envWorkshop,
    postgraduate: envPostgraduate,
    postgraduateEarly: envPostgraduateEarly,
    consultant: envConsultant,
    consultantEarly: envConsultantEarly,
    earlyBirdDate: envEarlyBirdDate,
  };

  return new Response(JSON.stringify(data), { status: 200 });
}
