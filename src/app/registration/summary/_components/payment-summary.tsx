import { toAmount } from "@/lib/utilfuncs";
import SummaryItem from "./summary-item";
import SummarySection from "./summary-section";

type PaymentSummaryProps = {
  conferenceAmount: number;
  workshopAmount: number;
  isEarlyBird: boolean;
};

const PaymentSummary = ({
  conferenceAmount,
  workshopAmount,
  isEarlyBird,
}: PaymentSummaryProps) => {
  const total = conferenceAmount + workshopAmount;

  return (
    <SummarySection heading="Payment Info">
      <SummaryItem prompt="Conference">
        <span>{toAmount(conferenceAmount)}</span>
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
