import { expectedPayment } from "@/services/payment";
import React from "react";
import SummarySection from "./summary-section";
import SummaryItem from "./summary-item";
import { toAmount } from "@/lib/utilfuncs";

type PaymentSummaryProps = {
  isPostgraduate: boolean;
  workshop: boolean;
};

const PaymentSummary = ({ isPostgraduate, workshop }: PaymentSummaryProps) => {
  const {
    conference,
    isEarlyBird,
    workshop: workshopAmount,
  } = expectedPayment(isPostgraduate, workshop);
  const total = conference + workshopAmount;

  return (
    <SummarySection heading="Payment Info">
      <SummaryItem prompt="Conference">
        <span className="font-mono">{toAmount(conference)}</span>
      </SummaryItem>
      <SummaryItem prompt="Workshop">
        <span className="font-mono">{toAmount(workshopAmount)}</span>
      </SummaryItem>
      <SummaryItem prompt="Total">
        <span className="font-bold font-mono">{toAmount(total)}</span>
        {isEarlyBird && (
          <>
            <br />
            <span className="text-red-600">
              Early bird registration cost till September 30, 2024.
            </span>
          </>
        )}
      </SummaryItem>
    </SummarySection>
  );
};

export default PaymentSummary;
