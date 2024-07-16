import ListItem from "@/components/list-item";
import React, { useState } from "react";
import { type PaymentMode } from "@/lib/payment-mode";
import FormAction from "@/components/form-action";
import LoadingButton from "@/components/loading-button";

const PaymentMode = () => {
  const [paymentMode, setPaymentMode] = useState<PaymentMode | undefined>(
    undefined
  );

  return (
    <div>
      <h3 className="uppercase font-medium">Select payment mode</h3>
      <ul className="flex flex-col space-y-2 mt-4">
        <ListItem
          disabled={false}
          isSelected={paymentMode === "HDFC"}
          onClick={() => setPaymentMode("HDFC")}
        >
          <div className="flex justify-between items-center mb-2">
            <div className="font-medium">HDFC</div>
          </div>
          <div className="text-sm text-muted-foreground">
            For credit / debit card
          </div>
        </ListItem>
        <ListItem
          disabled={false}
          isSelected={paymentMode === "PAYU"}
          onClick={() => setPaymentMode("PAYU")}
        >
          <div className="flex justify-between items-center mb-2">
            <div className="font-medium">PAYU</div>
          </div>
          <div className="text-sm text-muted-foreground">For net banking</div>
        </ListItem>
      </ul>
      <FormAction>
        <LoadingButton disabled={true}>Make Payment</LoadingButton>
      </FormAction>
    </div>
  );
};

export default PaymentMode;
