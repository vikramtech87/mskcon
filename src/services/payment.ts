import { drill, replaceTokens } from "@/lib/utilfuncs";
import newPaymentRequestXml from "./templates/new-payment";
import { DateTime } from "luxon";
import { PaymentInvoiceResponse } from "@/schemas/paymentInvoiceResponse";
import { PaymentMode } from "@/lib/payment-mode";
import { SoapPaymentLinkSchema } from "@/schemas/soapPaymentLink";
import { ZodSchema } from "zod";
import { Result } from "@/lib/result";
import { SoapError } from "@/lib/errors/soapError";
import { XMLParser } from "fast-xml-parser";

export type NewPaymentRequest = {
  bankName: PaymentMode;
  registerNumber: string;
  candidateName: string;
  paymentAmount: number;
  towards: string;
};

export const getNewPaymentXml = ({
  bankName,
  registerNumber,
  candidateName,
  paymentAmount,
  towards,
}: NewPaymentRequest) => {
  const replacements = {
    BankName: bankName,
    RegisterNumber: registerNumber,
    CandidateName: candidateName,
    PaymentAmount: `${paymentAmount}`,
    Towards: towards,
  };

  const authorizedTemplate = getAuthorizedTemplate(newPaymentRequestXml);

  return replaceTokens(authorizedTemplate, replacements);
};

const getAuthorizedTemplate = (templateString: string) => {
  const {
    PaymentUsername: Username,
    PaymentPassword: Password,
    PaymentProgram: Program,
    PaymentConferenceCode: ConferenceCode,
  } = process.env;
  const replacements = {
    Username: Username!,
    Password: Password!,
    Program: Program!,
    ConferenceCode: ConferenceCode!,
  };
  return replaceTokens(templateString, replacements);
};

export const expectedPayment = (
  postgraduate: boolean,
  workshop: boolean
): PaymentInvoiceResponse => {
  const workshopAmount = workshop ? 2500 : 0;

  const earlyBirdDeadLine = DateTime.fromISO("2024-10-01");
  const now = DateTime.now();

  const isEarlyBird = now < earlyBirdDeadLine;

  let conferenceAmount = 2510;
  if (postgraduate) {
    if (!isEarlyBird) {
      conferenceAmount = 3690;
    }
  } else {
    conferenceAmount = isEarlyBird ? 3100 : 4280;
  }

  return {
    conference: conferenceAmount,
    isEarlyBird,
    workshop: workshopAmount,
  };
};

export type GetPaymentLinkOptions = {
  mode: PaymentMode;
  registerNumber: string;
  name: string;
  amount: number;
  isEarlyBird: boolean;
  isPostgraduate: boolean;
  isWorkshop: boolean;
};

export const getPaymentLink = async ({
  mode,
  registerNumber,
  name,
  amount,
  isEarlyBird,
  isPostgraduate,
  isWorkshop,
}: GetPaymentLinkOptions) => {
  let towards = isPostgraduate ? "PG Registration" : "Consultant Registration";
  if (isEarlyBird) {
    towards = `${towards} (Early)`;
  }

  if (isWorkshop) {
    towards = `${towards} and Workshop`;
  }

  const newPaymentRequest: NewPaymentRequest = {
    bankName: mode,
    candidateName: name,
    paymentAmount: amount,
    registerNumber,
    towards,
  };
  const xml = getNewPaymentXml(newPaymentRequest);

  return await sendSoap(xml, SoapPaymentLinkSchema);
};

export const sendSoap = async <T extends { ResultCode: string }>(
  xml: string,
  schema: ZodSchema<T>
): Promise<Result<T, SoapError>> => {
  const headers = new Headers();
  headers.append("Content-Type", "text/xml");
  headers.append("Accept", "text/xml");

  const url = process.env.PaymentServiceLink!;
  try {
    const response = await fetch(url, {
      method: "POST",
      body: xml,
      headers,
      cache: "no-store",
    });

    const responseText = await response.text();
    const parser = new XMLParser();
    const doc = parser.parse(responseText);
    const data = drill(doc, [
      "soap:Envelope",
      "soap:Body",
      "NEWCONFONLINEPAYSAVEResponse",
      "NEWCONFONLINEPAYSAVEResult",
      "diffgr:diffgram",
      "DocumentElement",
      "conferencepay",
    ]);
    const parseResult = schema.safeParse(data);
    if (!parseResult.success) {
      return {
        ok: false,
        error: new SoapError("soap-error/process-error"),
      };
    }

    if (parseResult.data.ResultCode !== "0") {
      return {
        ok: false,
        error: new SoapError("soap-error/response-error"),
      };
    }

    return {
      ok: true,
      value: parseResult.data,
    };
  } catch (error) {
    return {
      ok: false,
      error: new SoapError("soap-error/request-error"),
    };
  }
};
