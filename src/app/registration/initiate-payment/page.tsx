import { drill, registerNumber } from "@/lib/utilfuncs";
import { getNewPaymentXml } from "@/services/payment";
import { XMLParser } from "fast-xml-parser";
import React from "react";

const InitiatePaymentPage = async () => {
  const xml = getNewPaymentXml({
    bankName: "HDFC",
    candidateName: "Vikram Raj G",
    paymentAmount: 2700,
    registerNumber: registerNumber(),
    towards: "Registration",
  });

  const headers = new Headers();
  headers.append("Content-Type", "text/xml");
  headers.append("Accept", "text/xml");

  const url = process.env.PaymentServiceLink!;

  const response = await fetch(
    "https://clin.cmcvellore.ac.in/newconference/ConferencePay.asmx",
    {
      method: "POST",
      body: xml,
      headers,
      cache: "no-store",
    }
  );

  const responseText = await response.text();
  const parser = new XMLParser();
  const doc = parser.parse(responseText);
  const result = drill(doc, [
    "soap:Envelope",
    "soap:Body",
    "NEWCONFONLINEPAYSAVEResponse",
    "NEWCONFONLINEPAYSAVEResult",
    "diffgr:diffgram",
    "DocumentElement",
    "conferencepay",
  ]);
  return JSON.stringify(result);
};

export default InitiatePaymentPage;
