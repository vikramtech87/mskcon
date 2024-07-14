import { replaceTokens } from "@/lib/utilfuncs";
import newPaymentRequestXml from "./templates/new-payment";

type Towards = "Registration" | "Registration, Workshop";
type PaymentOptions = "HDFC" | "PAYU";

type NewPaymentRequest = {
  bankName: PaymentOptions;
  registerNumber: string;
  candidateName: string;
  paymentAmount: number;
  towards: Towards;
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
