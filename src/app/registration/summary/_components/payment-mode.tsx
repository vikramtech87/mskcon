"use client";

import FormAction from "@/components/form-action";
import ListItem from "@/components/list-item";
import LoadingButton from "@/components/loading-button";
import { type PaymentMode } from "@/lib/payment-mode";
import { fetchPaymentLink } from "@/services/api";
import { useState } from "react";
import { usePaymentStateReducer } from "../_hooks/usePaymentState";
import { saveTransaction } from "@/services/transaction";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type PaymentModeSelectorProps = {
  isPostgraduate: boolean;
  isWorkshop: boolean;
  registerNumber: string;
  name: string;
  userId: string;
  workshopSeatsLeft: number;
};

const PaymentModeSelector = ({
  isPostgraduate,
  isWorkshop,
  registerNumber,
  name,
  userId,
  workshopSeatsLeft,
}: PaymentModeSelectorProps) => {
  const [paymentMode, setPaymentMode] = useState<PaymentMode | undefined>(
    undefined
  );
  const [buttonState, buttonDispatch] = usePaymentStateReducer();

  const handleSelection = (paymentMode: PaymentMode) => {
    if (buttonState.buttonText !== "Make Payment") {
      return;
    }
    buttonDispatch("MODE_SELECTED");
    setPaymentMode(paymentMode);
  };

  const handleClick = async () => {
    if (paymentMode === undefined) {
      return;
    }
    buttonDispatch("GET_LINK");

    const result = await fetchPaymentLink({
      isPostgraduate,
      isWorkshop,
      mode: paymentMode,
      name,
      registerNumber,
    });

    if (!result.ok) {
      return;
    }

    const { Registration, Transid, URL, Amount } = result.value;
    buttonDispatch("SAVE_DATA");
    console.table(result.value);

    // Save in firestore...
    const createResult = await saveTransaction({
      userId,
      amount: Amount,
      mode: paymentMode,
      transactionId: Transid,
      registrationNumber: Registration,
    });

    if (createResult.ok) {
      window.location.href = URL;
    }
  };

  return (
    <div>
      <h3 className="uppercase font-medium">Select payment mode</h3>
      <ul className="flex flex-col space-y-2 mt-4">
        <ListItem
          disabled={buttonState.buttonText !== "Make Payment"}
          isSelected={paymentMode === "HDFC"}
          onClick={() => handleSelection("HDFC")}
        >
          <div className="flex justify-between items-center mb-2">
            <div className="font-medium">HDFC</div>
          </div>
          <div className="text-sm text-muted-foreground">
            For credit / debit card
          </div>
        </ListItem>
        <ListItem
          disabled={buttonState.buttonText !== "Make Payment"}
          isSelected={paymentMode === "PAYU"}
          onClick={() => handleSelection("PAYU")}
        >
          <div className="flex justify-between items-center mb-2">
            <div className="font-medium">PAYU</div>
          </div>
          <div className="text-sm text-muted-foreground">For net banking</div>
        </ListItem>
      </ul>
      <FormAction>
        {workshopSeatsLeft > 0 && (
          <LoadingButton
            isLoading={buttonState.isLoading}
            disabled={true}
            onClick={handleClick}
          >
            {buttonState.buttonText}
          </LoadingButton>
        )}
        {workshopSeatsLeft < 1 && (
          <Link
            href="/registration/workshop"
            className={cn(
              buttonVariants({ variant: "default", size: "default" })
            )}
          >
            Change workshop selection
          </Link>
        )}
      </FormAction>
    </div>
  );
};

export default PaymentModeSelector;
