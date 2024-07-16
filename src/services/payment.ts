import { replaceTokens } from "@/lib/utilfuncs";
import newPaymentRequestXml from "./templates/new-payment";
import { DateTime } from "luxon";

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

export const expectedPayment = (
  postgraduate: boolean,
  workshop: boolean
): { workshop: number; isEarlyBird: boolean; conference: number } => {
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
