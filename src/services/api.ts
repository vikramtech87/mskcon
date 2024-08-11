import { ApiError } from "@/lib/errors/apiError";
import { TransactionError } from "@/lib/errors/transactionError";
import { PaymentMode } from "@/lib/payment-mode";
import { Result } from "@/lib/result";
import { ApiPaymentLinkSchema } from "@/schemas/apiPaymentLink";
import { PaymentInvoiceResponseSchema } from "@/schemas/paymentInvoiceResponse";
import { PaymentStatusResponse } from "@/schemas/paymentStatusResponse";
import { SoapPaymentTransactionStatusSchema } from "@/schemas/soapPaymentStatus";
import { ZodSchema } from "zod";
import { getTransactionDetails } from "./transaction";
import { PaymentDataResponseSchema } from "@/schemas/paymentDataResponse";

const basePath = process.env.NEXT_PUBLIC_BaseUrl!;
const apiPath = `${basePath}/api`;

export const fetchTransactionStatus = async (data: {
  registrationNumber: string;
  transactionId: string;
}): Promise<Result<PaymentStatusResponse, TransactionError>> => {
  const transactionDetailsResult = await getTransactionDetails(data);

  if (!transactionDetailsResult.ok) {
    return {
      ok: false,
      error: new TransactionError("transaction-data/fetch-error"),
    };
  }

  const { mode } = transactionDetailsResult.value;

  const transactionGatewayResult = await postApiRequest(
    "payment-status",
    { ...data, mode },
    SoapPaymentTransactionStatusSchema
  );

  if (!transactionGatewayResult.ok) {
    return {
      ok: false,
      error: new TransactionError("transaction-gateway/fetch-error"),
    };
  }

  const { Result, ResultCode, Authid, BankTransid } =
    transactionGatewayResult.value;

  return {
    ok: true,
    value: {
      authId: Authid ?? "",
      bankId: BankTransid ?? "",
      registrationNumber: data.registrationNumber,
      transactionId: data.transactionId,
      result: Result,
      resultCode: ResultCode,
      isSuccess: Result === "PAID",
    },
  };
};

export const fetchPaymentInfo = async (data: {
  isWorkshop: boolean;
  isPostgraduate: boolean;
}) =>
  await postApiRequest("payment-invoice", data, PaymentInvoiceResponseSchema);

export const fetchPaymentData = async () =>
  await getApiRequest("payment-data", PaymentDataResponseSchema);

export const fetchPaymentLink = async (data: {
  isPostgraduate: boolean;
  isWorkshop: boolean;
  mode: PaymentMode;
  name: string;
  registerNumber: string;
}) => await postApiRequest("payment-link", data, ApiPaymentLinkSchema);

const getApiRequest = async <TResponse>(
  segment: string,
  schema: ZodSchema<TResponse>
): Promise<Result<TResponse, ApiError>> => {
  const url = `${apiPath}/${segment}`;

  const promise = fetch(url);
  const result = await resolveFetch(promise, schema);
  return result;
};

const postApiRequest = async <T extends {}, U>(
  segment: string,
  body: T,
  schema: ZodSchema<U>
): Promise<Result<U, ApiError>> => {
  const url = `${apiPath}/${segment}`;
  const promise = fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });

  const result = await resolveFetch(promise, schema);
  return result;
};

const resolveFetch = async <TResponse>(
  responsePromise: Promise<Response>,
  schema: ZodSchema<TResponse>
): Promise<Result<TResponse, ApiError>> => {
  try {
    const response = await responsePromise;

    if (response.status !== 200) {
      return {
        ok: false,
        error: new ApiError("api-error/request-error"),
      };
    }

    const data = await response.json();
    const parseResult = schema.safeParse(data);
    if (!parseResult.success) {
      return {
        ok: false,
        error: new ApiError("api-error/parse-error"),
      };
    }

    return {
      ok: true,
      value: parseResult.data,
    };
  } catch (error) {
    return {
      ok: false,
      error: new ApiError("api-error/request-error"),
    };
  }
};
