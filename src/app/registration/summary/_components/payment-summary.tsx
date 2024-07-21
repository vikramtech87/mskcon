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
        <span>{toAmount(conference)}</span>
        <br />
        <span className="text-muted-foreground text-xs">
          <i>Inclusive of 18% GST and additional ₹150 for TNMC credit points</i>
        </span>
      </SummaryItem>
      <SummaryItem prompt="Workshop">
        <span>{toAmount(workshopAmount)}</span>
      </SummaryItem>
      <SummaryItem prompt="Total">
        <span className="font-bold">{toAmount(total)}</span>
        {isEarlyBird && (
          <>
            <br />
            <span className="text-red-600 text-xs">
              Early bird registration cost only valid till September 30, 2024.
            </span>
          </>
        )}
      </SummaryItem>
    </SummarySection>
  );
};

export default PaymentSummary;
